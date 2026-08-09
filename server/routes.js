import { randomBytes } from "node:crypto";

const DELIVERY_MODES = new Set(["point_retrait", "domicile"]);
const MAX_ITEM_QUANTITY = 20;
const MAX_ORDER_ITEMS = 50;
const MAX_IN_MEMORY_ORDERS = 5000;
const ORDER_TTL_MS = 24 * 60 * 60 * 1000;

function createReference(date = new Date()) {
  const stamp = date.toISOString().slice(0, 10).replaceAll("-", "");
  return `LE-${stamp}-${randomBytes(4).toString("hex")}`;
}

function createLookupToken() {
  return randomBytes(32).toString("hex");
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
  if (deliveryMode === "domicile" && (typeof deliveryAddress !== "string" || !deliveryAddress.trim())) {
    return "L'adresse de livraison est requise.";
  }
  for (const item of items) {
    if (!item || typeof item !== "object" || !item.product || typeof item.product.id !== "string") return "Un article de la commande est invalide.";
    if (!Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > MAX_ITEM_QUANTITY) {
      return `La quantité d'un article doit être comprise entre 1 et ${MAX_ITEM_QUANTITY}.`;
    }
  }
  return null;
}

export function registerRoutes(app, { products, productRepository, orderRepository, db = null, orders = new Map() }) {
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

  app.get("/api/products", async () => {
    if (productRepository) return { products: await productRepository.findAll() };
    return { products };
  });

  app.get("/api/products/:id", async (request, reply) => {
    const product = productRepository
      ? await productRepository.findById(String(request.params.id))
      : products.find((item) => String(item.id) === String(request.params.id));
    if (!product) return reply.code(404).send({ message: "Produit introuvable." });
    return product;
  });

  app.post("/api/orders", { config: { rateLimit: { max: 10, timeWindow: "1 minute" } } }, async (request, reply) => {
    const payload = request.body;
    const validationError = validateOrderPayload(payload);
    if (validationError) return reply.code(400).send({ message: validationError });

    const normalizedItems = [];
    for (const item of payload.items) {
      const product = productRepository
        ? await productRepository.findById(item.product.id)
        : products.find((entry) => entry.id === item.product.id);
      if (!product) return reply.code(400).send({ message: `Produit introuvable: ${item.product.id}.` });
      normalizedItems.push({
        product: { id: product.id, name: product.name, price: product.price, weight: product.weight },
        quantity: item.quantity,
      });
    }

    const productTotal = normalizedItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const weight = normalizedItems.reduce((sum, item) => sum + item.product.weight * item.quantity, 0);
    const transport = Math.max(1, Math.ceil(weight)) * 4000;
    const order = {
      reference: createReference(),
      lookupToken: createLookupToken(),
      status: "EN_ATTENTE",
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

  app.get("/api/orders/:lookupToken", { config: { rateLimit: { max: 30, timeWindow: "1 minute" } } }, async (request, reply) => {
    const token = String(request.params.lookupToken);
    if (!/^[a-f0-9]{64}$/.test(token)) return reply.code(404).send({ message: "Commande introuvable." });

    if (orderRepository) {
      const order = await orderRepository.findByLookupToken(token);
      if (!order) return reply.code(404).send({ message: "Commande introuvable." });
      return order;
    }

    cleanupOrders(orders);
    const order = orders.get(token);
    if (!order) return reply.code(404).send({ message: "Commande introuvable." });
    return order;
  });
}
