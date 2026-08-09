import { readFile, readdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { getDb, closeDb } from "./client.js";

const migrationsDir = fileURLToPath(new URL("./migrations/", import.meta.url));
const db = await getDb();

try {
  await db.query(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      version TEXT PRIMARY KEY,
      applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  const files = (await readdir(path.resolve(migrationsDir)))
    .filter((file) => /^\d+_.+\.sql$/.test(file))
    .sort();

  for (const file of files) {
    const version = file.replace(/\.sql$/, "");
    const { rows } = await db.query(
      "SELECT 1 FROM schema_migrations WHERE version = $1",
      [version],
    );
    if (rows.length > 0) continue;

    const sql = await readFile(path.resolve(migrationsDir, file), "utf8");
    const client = await db.connect();
    try {
      await client.query("BEGIN");
      await client.query(sql);
      await client.query(
        "INSERT INTO schema_migrations (version) VALUES ($1) ON CONFLICT (version) DO NOTHING",
        [version],
      );
      await client.query("COMMIT");
      console.log(`Database migration ${file} applied.`);
    } catch (error) {
      await client.query("ROLLBACK").catch(() => {});
      throw error;
    } finally {
      client.release();
    }
  }
} finally {
  await closeDb();
}
