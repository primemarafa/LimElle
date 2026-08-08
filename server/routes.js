const DELIVERY_MODES = new Set(["point_retrait", "domicile"]);

function createReference(sequence, date = new Date()) {
  const stamp = date.toISOString().slice(0, 10).replaceAll("-", "");
  return `LE-${stamp}-${String(sequence).padStart(6, "0")}`;
}

function validateOrderPayload(payload) {
  if (!payload || typeof payload !== "object") return "Corps de requête invalide.";
  const { customer, items, deliveryMode, deliveryAddress } = payload;
  if (!customer || typeof customer !== "object") return "Les informations client sont requises.";
  for (const field of ["fullName", "phone", "city"]) {
    if (typeof customer[field] !== "string" || !customer[field].trim()) return `Le champ ${field} est requis.`;
  }
  if (!Array.isArray(items) || items.length === 0) return "La commande doit contenir au moins un produit.";
  if (!DELIVERY_MODES.has(deliveryMode)) return "Mode de livraison invalide.";
  if (deliveryMode === "domicile" && (typeof deliveryAddress !== "string" || !deliveryAddress.trim())) {
    return "L'adresse de livraison est requise.";
  }
  for (const item of items) {
    if (!item || typeof item !== "object" || !item.product || typeof item.product.id !== "string") return "Un article de la commande est invalide.";
    if (!Number.isInteger(item.quantity) || item.quantity < 1) return "La quantité d'un article est invalide.";
  }
  return null;
}

export function registerRoutes(app, { products, productRepository, orders = new Map() }) {
  let sequence = 1;
  app.get("/api/health", async () => ({ status: "ok", service: "limelle-api" }));

  app.get("/api/products", async (_request, reply) => {
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

  app.post("/api/orders", async (request, reply) => {
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
    const reference = createReference(sequence++);
    const order = {
      reference,
      status: "EN_ATTENTE",
      customer: payload.customer,
      items: normalizedItems,
      deliveryMode: payload.deliveryMode,
      deliveryAddress: payload.deliveryAddress || "",
      notes: typeof payload.notes === "string" ? payload.notes : "",
      totals: { productTotal, weight, transport, total: productTotal + transport },
      createdAt: new Date().toISOString(),
    };
    orders.set(reference, order);
    return reply.code(201).send(order);
  });

  app.get("/api/orders/:reference", async (request, reply) => {
    const order = orders.get(String(request.params.reference));
    if (!order) return reply.code(404).send({ message: "Commande introuvable." });
    return order;
  });
}
