import { getDatabaseConfig } from "./config.js";

let pool;

export async function getDb() {
  if (!pool) {
    const { default: pg } = await import("pg");
    const config = getDatabaseConfig();
    pool = new pg.Pool({ connectionString: config.url, ssl: config.ssl ? { rejectUnauthorized: false } : undefined });
  }
  return pool;
}

export async function closeDb() {
  if (pool) {
    await pool.end();
    pool = undefined;
  }
}
