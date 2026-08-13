import Fastify from "fastify";
import rateLimit from "@fastify/rate-limit";
import { products } from "./data/products.js";
import { registerRoutes } from "./routes.js";
import { registerSecurityHeaders } from "./securityHeaders.js";

export function buildApp({ productRepository = null, orderRepository = null, db = null } = {}) {
  const app = Fastify({ logger: true });
  const orders = new Map();

  app.register(rateLimit, {
    global: true,
    max: 60,
    timeWindow: "1 minute",
    errorResponseBuilder: (_request, context) => ({
      statusCode: 429,
      error: "Too Many Requests",
      message: `Trop de requêtes. Réessaie dans ${Math.ceil(context.ttl / 1000)} secondes.`,
    }),
  });

  app.addHook("onSend", async (_request, reply) => {
    const allowedOrigin = process.env.CORS_ORIGIN || "http://localhost:5173";
    reply.header("Access-Control-Allow-Origin", allowedOrigin);
    reply.header("Vary", "Origin");
    reply.header("Access-Control-Allow-Headers", "Content-Type");
    reply.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  });

  registerSecurityHeaders(app);

  app.options("/*", async (_request, reply) => reply.code(204).send());
  registerRoutes(app, { products, productRepository, orderRepository, db, orders });
  return app;
}
