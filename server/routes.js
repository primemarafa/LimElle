import { randomBytes, createHmac, timingSafeEqual } from "node:crypto";
import { lookupTokenParamsSchema, orderBodySchema, productIdParamsSchema, registerBodySchema, loginBodySchema } from "./schemas.js";
import { renderInvoice } from "./invoice.js";
import { verifyPassword } from "./repositories/userRepository.js";

const DELIVERY_MODES = new Set(["point_retrait", "domicile"]);
const MAX_ITEM_QUANTITY = 20;
const MAX_ORDER_ITEMS = 50;
const MAX_IN_MEMORY_ORDERS = 5000;
const ORDER_TTL_MS = 24 * 60 * 60 * 1000;
const AUTH_SECRET = process.env.AUTH_SECRET || "limelle-auth-secret-key-32chars-min!!";
const TOKEN_TTL_MS = 30 * 24 * 60 * 60 * 1000;

function createReference(date = new Date()) {
  const stamp = date.toISOString().slice(0, 10).replaceAll("-", "");
  return `LE-${stamp}-${randomBytes(4).toString("hex")}`;
}

function createLookupToken() {
  return randomBytes(32).toString("hex");
}

export function createAuthToken(userId) {
  const expiresAt = Date.now() + TOKEN_TTL_MS;
  const payload = `${userId}:${expiresAt}`;
  const signature = createHmac("sha256", AUTH_SECRET).update(payload).digest("hex");
  return `${payload}:${signature}`;
}

export function verifyAuthToken(token) {
  if (!token || typeof token !== "string") return null;
  const parts = token.split(":");
  if (parts.length !== 3) return null;
  const [userIdStr, expiresAtStr, signature] = parts;
  const expiresAt = Number(expiresAtStr);
  if (!expiresAt || Date.now() > expiresAt) return null;
  const payload = `${userIdStr}:${expiresAtStr}`;
  const expectedSignature = createHmac("sha256", AUTH_SECRET).update(payload).digest("hex");
  const sigBuf = Buffer.from(signature, "hex");
  const expBuf = Buffer.from(expectedSignature, "hex");
  if (sigBuf.length !== expBuf.length || !timingSafeEqual(sigBuf, expBuf)) return null;
  return userIdStr;
}

function extractBearerToken(authHeader) {
  if (!authHeader || typeof authHeader !== "string") return null;
  if (!authHeader.startsWith("Bearer ")) return null;
  return authHeader.slice(7).trim();
}

function cleanupOrders(orders, now = Date.now()) {
  for (const [token, order] of orders) {
    if (now - Date.parse(order.createdAt) > ORDER_TTL_MS) orders.delete(token);
  }
  while (orders.size >= MAX_IN_MEMORY_ORDERS) {
    const oldestToken = orders.keys().next().value;
    if (!oldestToken) break;
    orders.delete(oldestToken);
  }
}

function validateOrderPayload(payload) {
  if (!payload || typeof payload !== "object") return "Corps de requête invalide.";
  const { customer, items, deliveryMode, deliveryAddress } = payload;
  if (!customer || typeof customer !== "object") return "Les informations client sont requises.";
  for (const field of ["fullName", "phone", "city"]) {
    if (typeof customer[field] !== "string" || !customer[field].trim()) return `Le champ ${field} est requis.`;
  }
  if (!Array.isArray(items) || items.length === 0) return "La commande doit contenir au moins un produit.";
  if (items.length > MAX_ORDER_ITEMS) return `La commande est limitée à ${MAX_ORDER_ITEMS} articles.`;
  if (!DELIVERY_MODES.has(deliveryMode)) return "Mode de livraison invalide.";
  if (deliveryMode === "domicile" && (typeof deliveryAddress !== "string" || !deliveryAddress.trim())) return "L'adresse de livraison est requise.";
  for (const item of items) {
    if (!item || typeof item !== "object" || !item.product || typeof item.product.id !== "string") return "Un article de la commande est invalide.";
    if (!Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > MAX_ITEM_QUANTITY) return `La quantité d'un article doit être comprise entre 1 et ${MAX_ITEM_QUANTITY}.`;
  }
  return null;
}

async function findOrderByLookupToken({ token, orderRepository, orders }) {
  if (orderRepository) return orderRepository.findByLookupToken(token);
  cleanupOrders(orders);
  return orders.get(token) || null;
}

export function registerRoutes(app, { products, productRepository, orderRepository, userRepository = null, db = null, orders = new Map() }) {
  app.get("/api/health", async () => ({ status: "ok", service: "limelle-api" }));

  app.get("/api/health/db", async (_request, reply) => {
    if (!db) return reply.code(503).send({ status: "error", service: "limelle-api", database: "unconfigured" });
    try {
      await db.query("SELECT 1");
      return { status: "ok", service: "limelle-api", database: "ok" };
    } catch {
      return reply.code(503).send({ status: "error", service: "limelle-api", database: "unavailable" });
    }
  });

  app.get("/api/products", async () => ({ products: productRepository ? await productRepository.findAll() : products }));

  app.get("/api/products/:id", { schema: { params: productIdParamsSchema } }, async (request, reply) => {
    const product = productRepository ? await productRepository.findById(String(request.params.id)) : products.find((item) => String(item.id) === String(request.params.id));
    if (!product) return reply.code(404).send({ message: "Produit introuvable." });
    return product;
  });

  app.post("/api/products", async (request, reply) => {
    const payload = request.body;
    if (!payload || !payload.name || !payload.price) {
      return reply.code(400).send({ message: "Nom et prix sont requis." });
    }
    const newProduct = {
      id: payload.id || `le-${Date.now().toString(36)}`,
      name: String(payload.name).trim(),
      description: String(payload.description || "").trim(),
      price: Number(payload.price),
      weight: Number(payload.weight || 0.2),
      category: String(payload.category || "soins-visage"),
      badge: payload.badge ? String(payload.badge).trim() : null,
      imageUrl: payload.imageUrl || payload.img || "/images/product-serum-eclat.jpg",
      stock: Number(payload.stock ?? 10),
      availability: payload.availability || "DISPONIBLE",
    };

    if (productRepository) {
      const created = await productRepository.create(newProduct);
      return reply.code(201).send(created);
    }
    products.unshift(newProduct);
    return reply.code(201).send(newProduct);
  });

  app.put("/api/products/:id", async (request, reply) => {
    const id = String(request.params.id);
    const payload = request.body;
    if (!payload) return reply.code(400).send({ message: "Données requises." });

    if (productRepository) {
      const updated = await productRepository.update(id, payload);
      if (!updated) return reply.code(404).send({ message: "Produit introuvable." });
      return updated;
    }
    const index = products.findIndex((p) => String(p.id) === id);
    if (index === -1) return reply.code(404).send({ message: "Produit introuvable." });
    products[index] = { ...products[index], ...payload, id };
    return products[index];
  });

  app.delete("/api/products/:id", async (request, reply) => {
    const id = String(request.params.id);
    if (productRepository) {
      const deleted = await productRepository.delete(id);
      if (!deleted) return reply.code(404).send({ message: "Produit introuvable." });
      return { success: true };
    }
    const index = products.findIndex((p) => String(p.id) === id);
    if (index === -1) return reply.code(404).send({ message: "Produit introuvable." });
    products.splice(index, 1);
    return { success: true };
  });

  // Authentication endpoints
  app.post("/api/auth/register", { schema: { body: registerBodySchema }, config: { rateLimit: { max: 10, timeWindow: "1 minute" } } }, async (request, reply) => {
    if (!userRepository) return reply.code(503).send({ message: "Authentification indisponible." });
    const { email, password, fullName, phone, city } = request.body;
    try {
      const existing = await userRepository.findByEmail(email);
      if (existing) {
        return reply.code(400).send({ message: "Un compte existe déjà avec cette adresse email." });
      }
      const user = await userRepository.create({ email, password, fullName, phone: phone || "", city: city || "" });
      const token = createAuthToken(user.id);
      return reply.code(201).send({ token, user });
    } catch (error) {
      if (error.code === "23505") {
        return reply.code(400).send({ message: "Un compte existe déjà avec cette adresse email." });
      }
      request.log.error(error);
      return reply.code(500).send({ message: "Erreur lors de la création du compte." });
    }
  });

  app.post("/api/auth/login", { schema: { body: loginBodySchema }, config: { rateLimit: { max: 15, timeWindow: "1 minute" } } }, async (request, reply) => {
    if (!userRepository) return reply.code(503).send({ message: "Authentification indisponible." });
    const { email, password } = request.body;
    const user = await userRepository.findByEmail(email);
    if (!user) {
      return reply.code(401).send({ message: "Identifiants incorrects." });
    }
    const isValid = verifyPassword(password, user.salt, user.passwordHash);
    if (!isValid) {
      return reply.code(401).send({ message: "Identifiants incorrects." });
    }
    const token = createAuthToken(user.id);
    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        phone: user.phone,
        city: user.city,
        createdAt: user.createdAt,
      },
    };
  });

  app.get("/api/auth/me", async (request, reply) => {
    if (!userRepository) return reply.code(503).send({ message: "Authentification indisponible." });
    const token = extractBearerToken(request.headers.authorization);
    const userId = verifyAuthToken(token);
    if (!userId) {
      return reply.code(401).send({ message: "Non authentifié." });
    }
    const user = await userRepository.findById(userId);
    if (!user) {
      return reply.code(401).send({ message: "Utilisateur introuvable." });
    }
    const orders = await userRepository.findOrdersByUserId(userId);
    return { user, orders };
  });

  // Orders endpoints
  app.post("/api/orders", { schema: { body: orderBodySchema }, config: { rateLimit: { max: 10, timeWindow: "1 minute" } } }, async (request, reply) => {
    const payload = request.body;
    const validationError = validateOrderPayload(payload);
    if (validationError) return reply.code(400).send({ message: validationError });

    const token = extractBearerToken(request.headers.authorization);
    const userId = verifyAuthToken(token);

    const normalizedItems = [];
    for (const item of payload.items) {
      const product = productRepository ? await productRepository.findById(item.product.id) : products.find((entry) => entry.id === item.product.id);
      if (!product) return reply.code(400).send({ message: `Produit introuvable: ${item.product.id}.` });
      normalizedItems.push({ product: { id: product.id, name: product.name, price: product.price, weight: product.weight }, quantity: item.quantity });
    }

    const productTotal = normalizedItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const weight = normalizedItems.reduce((sum, item) => sum + item.product.weight * item.quantity, 0);
    const transport = Math.max(1, Math.ceil(weight)) * 4000;
    const order = {
      reference: createReference(),
      lookupToken: createLookupToken(),
      status: "EN_ATTENTE",
      userId: userId ? Number(userId) : null,
      customer: payload.customer,
      items: normalizedItems,
      deliveryMode: payload.deliveryMode,
      deliveryAddress: payload.deliveryAddress || "",
      notes: typeof payload.notes === "string" ? payload.notes : "",
      totals: { productTotal, weight, transport, total: productTotal + transport },
      createdAt: new Date().toISOString(),
    };

    if (orderRepository) return reply.code(201).send(await orderRepository.create(order));
    cleanupOrders(orders);
    orders.set(order.lookupToken, order);
    return reply.code(201).send(order);
  });

  app.get("/api/orders/:lookupToken", { schema: { params: lookupTokenParamsSchema }, config: { rateLimit: { max: 30, timeWindow: "1 minute" } } }, async (request, reply) => {
    const token = String(request.params.lookupToken);
    const order = await findOrderByLookupToken({ token, orderRepository, orders });
    if (!order) return reply.code(404).send({ message: "Commande introuvable." });
    return order;
  });

  app.get("/api/orders/:lookupToken/invoice", { schema: { params: lookupTokenParamsSchema }, config: { rateLimit: { max: 10, timeWindow: "1 minute" } } }, async (request, reply) => {
    const token = String(request.params.lookupToken);
    const order = await findOrderByLookupToken({ token, orderRepository, orders });
    if (!order) return reply.code(404).send({ message: "Commande introuvable." });
    return reply.type("text/html; charset=utf-8").header("Content-Disposition", `inline; filename="facture-${order.reference}.html"`).send(renderInvoice(order));
  });
}

