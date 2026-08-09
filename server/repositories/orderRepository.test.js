import assert from "node:assert/strict";
import test from "node:test";
import { createOrderRepository } from "./orderRepository.js";

function makeOrder() {
  return {
    reference: "LE-20260809-a1b2c3d4",
    lookupToken: "a".repeat(64),
    status: "EN_ATTENTE",
    customer: { fullName: "Awa Diallo", phone: "+221700000000", city: "Dakar" },
    items: [{ product: { id: "LE-001", name: "Robe", price: 35000, weight: 0.8 }, quantity: 1 }],
    deliveryMode: "point_retrait",
    totals: { productTotal: 35000, weight: 0.8, transport: 4000, total: 39000 },
  };
}

function fakeDb({ failItems = false } = {}) {
  const events = [];
  const client = {
    async query(sql) {
      events.push(sql);
      if (sql.includes("INSERT INTO customers")) return { rows: [{ id: 7 }] };
      if (sql.includes("INSERT INTO orders")) return { rows: [{ id: 9, reference: "LE-20260809-a1b2c3d4", lookupToken: "a".repeat(64), status: "EN_ATTENTE" }] };
      if (failItems && sql.includes("INSERT INTO order_items")) throw new Error("item insert failed");
      return { rows: [] };
    },
    release() { events.push("RELEASE"); },
  };
  return { events, connect: async () => client };
}

test("order repository commits customer, order and items in one transaction", async () => {
  const db = fakeDb();
  const saved = await createOrderRepository(db).create(makeOrder());
  assert.equal(saved.id, 9);
  assert.equal(db.events[0], "BEGIN");
  assert.ok(db.events.some((sql) => sql.includes("INSERT INTO customers")));
  assert.ok(db.events.some((sql) => sql.includes("INSERT INTO orders")));
  assert.ok(db.events.some((sql) => sql.includes("INSERT INTO order_items")));
  assert.equal(db.events.at(-2), "COMMIT");
  assert.equal(db.events.at(-1), "RELEASE");
});

test("order repository rolls back and releases the client after an item failure", async () => {
  const db = fakeDb({ failItems: true });
  await assert.rejects(() => createOrderRepository(db).create(makeOrder()), /item insert failed/);
  assert.ok(db.events.includes("ROLLBACK"));
  assert.equal(db.events.at(-1), "RELEASE");
  assert.equal(db.events.includes("COMMIT"), false);
});
