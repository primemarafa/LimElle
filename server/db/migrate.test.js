import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const migrationPath = fileURLToPath(new URL("./migrations/001_initial.sql", import.meta.url));

test("initial migration contains the Lim'Elle domain tables", async () => {
  const sql = await readFile(migrationPath, "utf8");
  for (const table of ["products", "customers", "orders", "order_items", "schema_migrations"]) {
    assert.match(sql, new RegExp(`CREATE TABLE IF NOT EXISTS ${table}`));
  }
});

test("initial migration protects order totals and item quantities", async () => {
  const sql = await readFile(migrationPath, "utf8");
  assert.match(sql, /product_total INTEGER NOT NULL CHECK \(product_total >= 0\)/);
  assert.match(sql, /quantity INTEGER NOT NULL CHECK \(quantity >= 1\)/);
  assert.match(sql, /unit_price INTEGER NOT NULL CHECK \(unit_price >= 0\)/);
});
