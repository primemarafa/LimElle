import assert from "node:assert/strict";
import test from "node:test";
import { buildApp } from "./app.js";

async function withApp(run, options = {}) {
  const app = buildApp(options);
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

test("GET /api/products uses the injected repository", async () => {
  const repository = {
    findAll: async () => [{ id: "db-product-1", name: "Produit DB", price: 42000 }],
    findById: async () => null,
  };
  await withApp(async (app) => {
    const response = await app.inject({ method: "GET", url: "/api/products" });
    assert.equal(response.statusCode, 200);
    assert.deepEqual(response.json(), { products: [{ id: "db-product-1", name: "Produit DB", price: 42000 }] });
  }, { productRepository: repository });
});

test("GET /api/products/:id uses the injected repository", async () => {
  const repository = {
    findAll: async () => [],
    findById: async (id) => id === "db-product-1" ? { id, name: "Produit DB" } : null,
  };
  await withApp(async (app) => {
    const response = await app.inject({ method: "GET", url: "/api/products/db-product-1" });
    assert.equal(response.statusCode, 200);
    assert.deepEqual(response.json(), { id: "db-product-1", name: "Produit DB" });
  }, { productRepository: repository });
});

test("GET /api/products returns the catalogue without a repository", async () => {
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
    const response = await app.inject({ method: "POST", url: "/api/orders", payload: {
      customer: { fullName: "Awa Diallo", phone: "+22700000000", city: "Niamey" },
      items: [{ product: { id: "robe-001" }, quantity: 2 }], deliveryMode: "point_retrait", notes: "Test",
      totals: { productTotal: 1, transport: 1, total: 2 },
    }});
    assert.equal(response.statusCode, 201);
    const order = response.json();
    assert.match(order.reference, /^LE-\d{8}-\d{6}$/);
    assert.match(order.lookupToken, /^[a-f0-9]{64}$/);
    assert.equal(order.status, "EN_ATTENTE");
    assert.deepEqual(order.totals, { productTotal: 70000, weight: 1.6, transport: 8000, total: 78000 });
    assert.equal(order.items[0].product.price, 35000);
  });
});

test("GET /api/orders/:lookupToken returns the created order", async () => {
  await withApp(async (app) => {
    const createResponse = await app.inject({ method: "POST", url: "/api/orders", payload: {
      customer: { fullName: "Awa Diallo", phone: "+22700000000", city: "Niamey" },
      items: [{ product: { id: "robe-001" }, quantity: 1 }], deliveryMode: "point_retrait",
    }});
    const { lookupToken, reference } = createResponse.json();
    const response = await app.inject({ method: "GET", url: `/api/orders/${lookupToken}` });
    assert.equal(response.statusCode, 200);
    assert.equal(response.json().reference, reference);
  });
});

test("GET /api/orders/:lookupToken rejects a predictable reference", async () => {
  await withApp(async (app) => {
    const response = await app.inject({ method: "GET", url: "/api/orders/LE-20260808-000001" });
    assert.equal(response.statusCode, 404);
  });
});

test("POST /api/orders rejects an unknown product", async () => {
  await withApp(async (app) => {
    const response = await app.inject({ method: "POST", url: "/api/orders", payload: {
      customer: { fullName: "Awa Diallo", phone: "+22700000000", city: "Niamey" },
      items: [{ product: { id: "unknown" }, quantity: 1 }], deliveryMode: "point_retrait",
    }});
    assert.equal(response.statusCode, 400);
    assert.match(response.json().message, /Produit introuvable/);
  });
});

test("POST /api/orders rejects an invalid delivery mode", async () => {
  await withApp(async (app) => {
    const response = await app.inject({ method: "POST", url: "/api/orders", payload: {
      customer: { fullName: "Awa Diallo", phone: "+22700000000", city: "Niamey" },
      items: [{ product: { id: "robe-001" }, quantity: 1 }], deliveryMode: "unknown",
    }});
    assert.equal(response.statusCode, 400);
  });
});

test("POST /api/orders rejects a quantity above the safety limit", async () => {
  await withApp(async (app) => {
    const response = await app.inject({ method: "POST", url: "/api/orders", payload: {
      customer: { fullName: "Awa Diallo", phone: "+22700000000", city: "Niamey" },
      items: [{ product: { id: "robe-001" }, quantity: 21 }], deliveryMode: "point_retrait",
    }});
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
