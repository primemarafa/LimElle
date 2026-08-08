import Fastify from "fastify";
import { products } from "./data/products.js";
import { registerRoutes } from "./routes.js";

export function buildApp() {
  const app = Fastify({ logger: true });
  const orders = new Map();

  app.addHook("onSend", async (_request, reply) => {
    const allowedOrigin = process.env.CORS_ORIGIN || "http://localhost:5173";
    reply.header("Access-Control-Allow-Origin", allowedOrigin);
    reply.header("Vary", "Origin");
    reply.header("Access-Control-Allow-Headers", "Content-Type");
    reply.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  });

  app.options("/*", async (_request, reply) => reply.code(204).send());
  registerRoutes(app, { products, orders });
  return app;
}
