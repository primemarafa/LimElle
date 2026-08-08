import assert from "node:assert/strict";
import test from "node:test";
import { createProductRepository } from "./productRepository.js";

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
