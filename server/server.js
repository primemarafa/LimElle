import { buildApp } from "./app.js";
import { getDb, closeDb } from "./db/client.js";
import { createProductRepository } from "./repositories/productRepository.js";

const port = Number(process.env.PORT || 3001);
const host = process.env.HOST || "0.0.0.0";

let db;
let app;

try {
  db = await getDb();
  await db.query("SELECT 1");

  const productRepository = createProductRepository(db);
  app = buildApp({ productRepository });
  await app.listen({ port, host });

  const shutdown = async (signal) => {
    app.log.info({ signal }, "Shutting down API");
    await app.close();
    await closeDb();
    process.exit(0);
  };

  process.once("SIGINT", shutdown);
  process.once("SIGTERM", shutdown);
} catch (error) {
  if (app) await app.close().catch(() => {});
  await closeDb().catch(() => {});
  console.error(error);
  process.exit(1);
}
