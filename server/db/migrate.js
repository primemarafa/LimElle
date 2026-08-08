import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { getDb, closeDb } from "./client.js";

const migrationPath = fileURLToPath(new URL("./migrations/001_initial.sql", import.meta.url));

const sql = await readFile(path.resolve(migrationPath), "utf8");
const db = await getDb();

try {
  await db.query(sql);
  console.log("Database migration 001_initial applied.");
} finally {
  await closeDb();
}
