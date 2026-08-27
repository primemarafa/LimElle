import Fastify from "fastify";
import cors from "@fastify/cors";
import rateLimit from "@fastify/rate-limit";
import { products } from "./data/products.js";
import { registerRoutes } from "./routes.js";
import { registerSecurityHeaders } from "./securityHeaders.js";
import { createUserRepository } from "./repositories/userRepository.js";

export function buildApp({ productRepository = null, orderRepository = null, userRepository = null, db = null } = {}) {
  const app = Fastify({ logger: true });
  const orders = new Map();
  const resolvedUserRepo = userRepository || createUserRepository(db);

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

  app.register(cors, {
    origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(",") : ["http://localhost:5173"],
    strictPreflight: false,
  });

  registerSecurityHeaders(app);

  registerRoutes(app, { products, productRepository, orderRepository, userRepository: resolvedUserRepo, db, orders });
  return app;
}
