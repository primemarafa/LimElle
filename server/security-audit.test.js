import test from "node:test";
import assert from "node:assert/strict";
import Fastify from "fastify";
import { buildApp } from "./app.js";

async function setup() {
  const app = buildApp();
  await app.ready();
  return app;
}

test("CORS rejects a disallowed origin", async () => {
  const app = await setup();
  const response = await app.inject({
    method: "GET",
    url: "/api/health",
    headers: { origin: "https://evil.example" },
  });
  assert.notEqual(response.headers["access-control-allow-origin"], "https://evil.example");
  await app.close();
});

test("order lookup requires a 64 character hexadecimal token", async () => {
  const app = await setup();
  const response = await app.inject({ method: "GET", url: "/api/orders/not-a-token" });
  assert.equal(response.statusCode, 400);
  await app.close();
});

test("product lookup encodes the identifier", async () => {
  const app = await setup();
  const response = await app.inject({ method: "GET", url: "/api/products/a%2Fb" });
  assert.equal(response.statusCode, 404);
  await app.close();
});

test("unexpected order properties are rejected", async () => {
  const app = await setup();
  const response = await app.inject({
    method: "POST",
    url: "/api/orders",
    payload: {
      customer: { fullName: "Test", phone: "770000000", city: "Dakar" },
      items: [{ product: { id: "LE-001" }, quantity: 1 }],
      deliveryMode: "point_retrait",
      unexpected: "blocked",
    },
  });
  assert.equal(response.statusCode, 400);
  await app.close();
});

test("health endpoint exposes no sensitive configuration", async () => {
  const app = await setup();
  const response = await app.inject({ method: "GET", url: "/api/health" });
  assert.deepEqual(response.json(), { status: "ok", service: "limelle-api" });
  await app.close();
});
