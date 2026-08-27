import test from "node:test";
import assert from "node:assert/strict";
import { buildApp } from "./app.js";

async function setup() {
  const app = buildApp();
  await app.ready();
  return app;
}

test("malformed JSON is rejected without leaking internals", async () => {
  const app = await setup();
  const response = await app.inject({ method: "POST", url: "/api/orders", headers: { "content-type": "application/json" }, payload: "{invalid-json" });
  assert.equal(response.statusCode, 400);
  assert.doesNotMatch(response.body, /stack|node_modules|postgres|DATABASE_URL/i);
  await app.close();
});

test("oversized notes are rejected", async () => {
  const app = await setup();
  const response = await app.inject({ method: "POST", url: "/api/orders", payload: { customer: { fullName: "Test", phone: "770000000", city: "Dakar" }, items: [{ product: { id: "le-001" }, quantity: 1 }], deliveryMode: "point_retrait", notes: "x".repeat(501) } });
  assert.equal(response.statusCode, 400);
  await app.close();
});

test("health response does not expose environment variables", async () => {
  const app = await setup();
  const response = await app.inject({ method: "GET", url: "/api/health" });
  assert.deepEqual(Object.keys(response.json()).sort(), ["service", "status"]);
  await app.close();
});
