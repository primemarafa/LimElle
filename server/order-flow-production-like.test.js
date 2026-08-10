import test from "node:test";
import assert from "node:assert/strict";
import { buildApp } from "./app.js";

test("order API rejects malformed JSON payloads safely", async () => {
  const app = buildApp();
  await app.ready();
  const response = await app.inject({
    method: "POST",
    url: "/api/orders",
    headers: { "content-type": "application/json" },
    payload: "{invalid-json",
  });
  assert.equal(response.statusCode, 400);
  await app.close();
});

test("order API does not expose internal errors", async () => {
  const app = buildApp();
  await app.ready();
  const response = await app.inject({
    method: "POST",
    url: "/api/orders",
    payload: {},
  });
  assert.equal(response.statusCode, 400);
  const body = response.body.toLowerCase();
  assert.equal(body.includes("stack"), false);
  assert.equal(body.includes("node_modules"), false);
  await app.close();
});
