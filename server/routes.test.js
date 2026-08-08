import assert from "node:assert/strict";
import test from "node:test";
import Fastify from "fastify";
import { registerRoutes } from "./routes.js";

const products = [
  { id: "robe-001", name: "Robe élégante", price: 35000, weight: 0.8, availability: "disponible" },
  { id: "chaussure-001", name: "Chaussures femme", price: 30000, weight: 1.2, availability: "a_verifier" },
];

function makeApp() {
  const app = Fastify();
  registerRoutes(app, { products, orders: new Map() });
  return app;
}

test("orders are retrievable by their random lookup token", async () => {
  const app = makeApp();
  const created = await app.inject({
    method: "POST",
    url: "/api/orders",
    payload: {
      customer: { fullName: "Awa Diallo", phone: "+22700000000", city: "Niamey" },
      items: [{ product: { id: "robe-001" }, quantity: 1 }],
      deliveryMode: "point_retrait",
    },
  });

  assert.equal(created.statusCode, 201);
  const body = created.json();
  assert.match(body.lookupToken, /^[a-f0-9]{64}$/);

  const fetched = await app.inject({ method: "GET", url: `/api/orders/${body.lookupToken}` });
  assert.equal(fetched.statusCode, 200);
  assert.equal(fetched.json().reference, body.reference);

  const predictableLookup = await app.inject({ method: "GET", url: `/api/orders/${body.reference}` });
  assert.equal(predictableLookup.statusCode, 404);
  await app.close();
});
