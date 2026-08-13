import test from "node:test";
import assert from "node:assert/strict";
import { buildApp } from "./app.js";

test("security headers are present on API responses", async () => {
  const app = buildApp();
  await app.ready();

  const response = await app.inject({ method: "GET", url: "/api/health" });

  assert.equal(response.statusCode, 200);
  assert.equal(response.headers["x-content-type-options"], "nosniff");
  assert.equal(response.headers["x-frame-options"], "DENY");
  assert.equal(response.headers["referrer-policy"], "strict-origin-when-cross-origin");
  assert.equal(response.headers["permissions-policy"], "camera=(), microphone=(), geolocation=()");

  await app.close();
});
