import assert from "node:assert/strict";
import test from "node:test";
import { getDb, closeDb } from "../db/client.js";
import { createProductRepository } from "./productRepository.js";

const integrationEnabled = Boolean(process.env.DATABASE_URL);

async function withDatabase(run) {
  const db = await getDb();
  try {
    await db.query("SELECT 1");
    return await run(db, createProductRepository(db));
  } finally {
    await closeDb();
  }
}

test("product repository reads products with parameterized queries", async () => {
  const calls = [];
  const db = {
    async query(text, params = []) {
      calls.push({ text, params });
      return { rows: [{ id: "robe-001", name: "Robe", price: 35000 }], rowCount: 1 };
    },
  };

  const repository = createProductRepository(db);
  const product = await repository.findById("robe-001");

  assert.equal(product.id, "robe-001");
  assert.equal(calls.length, 1);
  assert.deepEqual(calls[0].params, ["robe-001"]);
  assert.match(calls[0].text, /WHERE id = \$1/);
});

test("product repository returns null when a product does not exist", async () => {
  const db = { async query() { return { rows: [], rowCount: 0 }; } };
  const repository = createProductRepository(db);
  assert.equal(await repository.findById("unknown"), null);
});

test("product repository reports whether delete affected a row", async () => {
  const db = { async query() { return { rows: [], rowCount: 1 }; } };
  const repository = createProductRepository(db);
  assert.equal(await repository.delete("robe-001"), true);
});

test("ProductRepository reads and writes PostgreSQL products", { skip: !integrationEnabled }, async () => {
  await withDatabase(async (db, repository) => {
    const id = `ci-product-${Date.now()}`;
    const product = {
      id,
      name: "Produit CI",
      description: "Produit de validation PostgreSQL",
      price: 42000,
      weight: 0.8,
      category: "soins-corps",
      size: "M",
      color: "Noir",
      stock: 7,
      availability: "DISPONIBLE",
      imageUrl: null,
    };

    try {
      const created = await repository.create(product);
      assert.equal(created.id, id);
      assert.equal(created.price, 42000);

      const found = await repository.findById(id);
      assert.deepEqual(found, created);

      const updated = await repository.update(id, { ...product, price: 45000, stock: 5 });
      assert.equal(updated.price, 45000);
      assert.equal(updated.stock, 5);

      const all = await repository.findAll();
      assert.ok(all.some((entry) => entry.id === id));

      assert.equal(await repository.delete(id), true);
      assert.equal(await repository.findById(id), null);
      assert.equal(await repository.delete(id), false);
    } finally {
      await db.query("DELETE FROM products WHERE id = $1", [id]);
    }
  });
});
