import assert from "node:assert/strict";
import test from "node:test";
import { createOrderRepository } from "./orderRepository.js";

function makeOrder() {
  return {
    reference: "LE-20260809-a1b2c3d4",
    lookupToken: "a".repeat(64),
    status: "EN_ATTENTE",
    customer: { fullName: "Awa Diallo", phone: "+221700000000", city: "Dakar" },
    items: [{ product: { id: "robe-001", name: "Robe", price: 35000, weight: 0.8 }, quantity: 2 }],
    deliveryMode: "domicile",
    deliveryAddress: "Dakar",
    notes: "Appeler avant livraison",
    totals: { productTotal: 70000, weight: 1.6, transport: 8000, total: 78000 },
    createdAt: "2026-08-09T12:00:00.000Z",
  };
}

test("order repository commits customer, order and items in one transaction", async () => {
  const calls = [];
  const client = {
    async query(text, params = []) {
      calls.push({ text, params });
      if (text.includes("INSERT INTO customers")) return { rows: [{ id: 42 }] };
      if (text.includes("INSERT INTO orders")) return { rows: [{ id: 7, reference: "LE-20260809-a1b2c3d4", lookupToken: "a".repeat(64), status: "EN_ATTENTE" }] };
      return { rows: [], rowCount: 1 };
    },
    release() {},
  };
  const db = { async connect() { return client; } };
  const repository = createOrderRepository(db);
  const saved = await repository.create(makeOrder());

  assert.equal(saved.id, 7);
  assert.equal(calls[0].text, "BEGIN");
  assert.ok(calls.some(({ text }) => text.includes("INSERT INTO customers")));
  assert.ok(calls.some(({ text }) => text.includes("INSERT INTO orders")));
  assert.ok(calls.some(({ text }) => text.includes("INSERT INTO order_items")));
  assert.equal(calls.at(-1).text, "COMMIT");
});

test("order repository rolls back when an item insert fails", async () => {
  const calls = [];
  const client = {
    async query(text) {
      calls.push(text);
      if (text.includes("INSERT INTO order_items")) throw new Error("item insert failed");
      if (text.includes("INSERT INTO customers")) return { rows: [{ id: 42 }] };
      if (text.includes("INSERT INTO orders")) return { rows: [{ id: 7 }] };
      return { rows: [] };
    },
    release() {},
  };
  const repository = createOrderRepository({ async connect() { return client; } });

  await assert.rejects(() => repository.create(makeOrder()), /item insert failed/);
  assert.equal(calls.at(-1), "ROLLBACK");
});
