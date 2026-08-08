import assert from "node:assert/strict";
import test from "node:test";
import { buildApp } from "./app.js";

test("GET /api/health returns API status", async () => {
  const app = buildApp();
  const response = await app.inject({ method: "GET", url: "/api/health" });

  assert.equal(response.statusCode, 200);
  assert.deepEqual(response.json(), { status: "ok", service: "limelle-api" });
  await app.close();
});

test("GET /api/products/:id returns 404 for an unknown product", async () => {
  const app = buildApp();
  const response = await app.inject({ method: "GET", url: "/api/products/unknown" });

  assert.equal(response.statusCode, 404);
  assert.equal(response.json().message, "Produit introuvable.");
  await app.close();
});

test("POST /api/orders recalculates totals on the server", async () => {
  const app = buildApp();
  const response = await app.inject({
    method: "POST",
    url: "/api/orders",
    payload: {
      customer: { fullName: "Awa Diallo", phone: "+22700000000", city: "Niamey" },
      items: [{ product: { id: "robe-001" }, quantity: 2 }],
      deliveryMode: "point_retrait",
      notes: "Test",
      totals: { productTotal: 1, transport: 1, total: 2 },
    },
  });

  assert.equal(response.statusCode, 201);
  const order = response.json();
  assert.match(order.reference, /^LE-\d{8}-\d{6}$/);
  assert.equal(order.status, "EN_ATTENTE");
  assert.deepEqual(order.totals, { productTotal: 70000, weight: 1.6, transport: 8000, total: 78000 });
  assert.equal(order.items[0].product.price, 35000);
  assert.equal(order.items[0].product.weight, 0.8);
  await app.close();
});

test("POST /api/orders rejects an unknown product", async () => {
  const app = buildApp();
  const response = await app.inject({
    method: "POST",
    url: "/api/orders",
    payload: {
      customer: { fullName: "Awa Diallo", phone: "+22700000000", city: "Niamey" },
      items: [{ product: { id: "unknown" }, quantity: 1 }],
      deliveryMode: "point_retrait",
    },
  });

  assert.equal(response.statusCode, 400);
  assert.match(response.json().message, /Produit introuvable/);
  await app.close();
});
