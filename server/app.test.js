import assert from "node:assert/strict";
import test from "node:test";
import { buildApp } from "./app.js";

async function withApp(run) {
  const app = buildApp();
  try {
    return await run(app);
  } finally {
    await app.close();
  }
}

test("GET /api/health returns API status", async () => {
  await withApp(async (app) => {
    const response = await app.inject({ method: "GET", url: "/api/health" });
    assert.equal(response.statusCode, 200);
    assert.deepEqual(response.json(), { status: "ok", service: "limelle-api" });
  });
});

test("GET /api/products returns the catalogue", async () => {
  await withApp(async (app) => {
    const response = await app.inject({ method: "GET", url: "/api/products" });
    assert.equal(response.statusCode, 200);
    assert.ok(Array.isArray(response.json().products));
  });
});

test("GET /api/products/:id returns 404 for an unknown product", async () => {
  await withApp(async (app) => {
    const response = await app.inject({ method: "GET", url: "/api/products/unknown" });
    assert.equal(response.statusCode, 404);
    assert.equal(response.json().message, "Produit introuvable.");
  });
});

test("POST /api/orders recalculates totals on the server", async () => {
  await withApp(async (app) => {
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
  });
});

test("GET /api/orders/:reference returns the created order", async () => {
  await withApp(async (app) => {
    const createResponse = await app.inject({
      method: "POST",
      url: "/api/orders",
      payload: {
        customer: { fullName: "Awa Diallo", phone: "+22700000000", city: "Niamey" },
        items: [{ product: { id: "robe-001" }, quantity: 1 }],
        deliveryMode: "point_retrait",
      },
    });
    const reference = createResponse.json().reference;
    const response = await app.inject({ method: "GET", url: `/api/orders/${reference}` });
    assert.equal(response.statusCode, 200);
    assert.equal(response.json().reference, reference);
  });
});

test("POST /api/orders rejects an unknown product", async () => {
  await withApp(async (app) => {
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
  });
});

test("POST /api/orders rejects an invalid delivery mode", async () => {
  await withApp(async (app) => {
    const response = await app.inject({
      method: "POST",
      url: "/api/orders",
      payload: {
        customer: { fullName: "Awa Diallo", phone: "+22700000000", city: "Niamey" },
        items: [{ product: { id: "robe-001" }, quantity: 1 }],
        deliveryMode: "unknown",
      },
    });
    assert.equal(response.statusCode, 400);
  });
});

test("OPTIONS supports the API CORS preflight", async () => {
  await withApp(async (app) => {
    const response = await app.inject({ method: "OPTIONS", url: "/api/products" });
    assert.equal(response.statusCode, 204);
    assert.ok(response.headers["access-control-allow-origin"]);
  });
});
