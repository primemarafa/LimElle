import Fastify from "fastify";
import { products } from "./data/products.js";
import { registerRoutes } from "./routes.js";

export function buildApp() {
  const app = Fastify({ logger: true });
  registerRoutes(app, { products });
  return app;
}

if (process.env.NODE_ENV !== "test") {
  const app = buildApp();
  const port = Number(process.env.PORT || 3001);
  app.listen({ port, host: "0.0.0.0" }).catch((error) => {
    app.log.error(error);
    process.exit(1);
  });
}
