import Fastify from "fastify";
import { products } from "./data/products.js";
import { registerRoutes } from "./routes.js";

export function buildApp() {
  const app = Fastify({ logger: true });
  const orders = new Map();

  app.addHook("onSend", async (_request, reply) => {
    reply.header("Access-Control-Allow-Origin", "*");
    reply.header("Access-Control-Allow-Headers", "Content-Type");
    reply.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  });

  registerRoutes(app, { products, orders });
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
