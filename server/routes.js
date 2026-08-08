export function registerRoutes(app, { products }) {
  app.get("/api/health", async () => ({ status: "ok", service: "limelle-api" }));

  app.get("/api/products", async () => ({ products }));

  app.get("/api/products/:id", async (request, reply) => {
    const product = products.find((item) => String(item.id) === request.params.id);
    if (!product) return reply.code(404).send({ message: "Produit introuvable." });
    return product;
  });
}
