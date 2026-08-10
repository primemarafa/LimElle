import assert from "node:assert/strict";
import test from "node:test";
import { getDb, closeDb } from "../db/client.js";
import { createOrderRepository } from "./orderRepository.js";

const integrationEnabled = Boolean(process.env.DATABASE_URL);

test("OrderRepository persists and reads a real PostgreSQL order", { skip: !integrationEnabled }, async () => {
  const db = await getDb();
  const repository = createOrderRepository(db);
  const id = `ci-order-${Date.now()}`;
  const lookupToken = "b".repeat(64);

  const order = {
    reference: `LE-20260810-${String(Date.now()).slice(-8)}`,
    lookupToken,
    status: "EN_ATTENTE",
    customer: { fullName: "Awa Diallo", phone: "+227700000000", city: "Niamey" },
    items: [{ product: { id: "LE-001", name: "Robe", price: 35000, weight: 0.8 }, quantity: 1 }],
    deliveryMode: "point_retrait",
    deliveryAddress: null,
    notes: "CI integration",
    totals: { productTotal: 35000, weight: 0.8, transport: 4000, total: 39000 },
  };

  try {
    const saved = await repository.create(order);
    assert.equal(saved.reference, order.reference);
    assert.equal(saved.lookupToken, lookupToken);

    const found = await repository.findByLookupToken(lookupToken);
    assert.ok(found);
    assert.equal(found.reference, order.reference);
    assert.equal(found.customer.city, "Niamey");
    assert.equal(found.items.length, 1);
    assert.equal(found.items[0].product.id, "LE-001");
    assert.equal(found.items[0].quantity, 1);
    assert.equal(found.totals.total, 39000);
  } finally {
    await db.query("DELETE FROM orders WHERE reference = $1", [order.reference]);
    await db.query("DELETE FROM customers WHERE phone = $1", [order.customer.phone]);
    await closeDb();
  }
});
