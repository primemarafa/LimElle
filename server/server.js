import { buildApp } from "./app.js";
import { getDb, closeDb } from "./db/client.js";
import { createProductRepository } from "./repositories/productRepository.js";
import { createOrderRepository } from "./repositories/orderRepository.js";
import { createUserRepository } from "./repositories/userRepository.js";

const port = Number(process.env.PORT || 3001);
const host = process.env.HOST || "0.0.0.0";

let db;
let app;
let shuttingDown = false;

const shutdown = async (signal) => {
  if (shuttingDown) return;
  shuttingDown = true;
  app?.log.info({ signal }, "Shutting down API");
  await app?.close().catch(() => {});
  await closeDb().catch(() => {});
  process.exit(0);
};

try {
  db = await getDb();
  await db.query("SELECT 1");

  const productRepository = createProductRepository(db);
  const orderRepository = createOrderRepository(db);
  const userRepository = createUserRepository(db);
  app = buildApp({ productRepository, orderRepository, userRepository, db });
  process.once("SIGINT", () => shutdown("SIGINT"));
  process.once("SIGTERM", () => shutdown("SIGTERM"));
  await app.listen({ port, host });
} catch (error) {
  await app?.close().catch(() => {});
  await closeDb().catch(() => {});
  console.error(error);
  process.exit(1);
}
