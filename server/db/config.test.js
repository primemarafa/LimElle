import assert from "node:assert/strict";
import test from "node:test";
import { getDatabaseConfig } from "./config.js";

test("database config uses environment variables", () => {
  assert.deepEqual(
    getDatabaseConfig({ DATABASE_URL: "postgresql://db.example/limelle", DATABASE_SSL: "true" }),
    { url: "postgresql://db.example/limelle", ssl: true },
  );
});

test("database config has a local development default", () => {
  assert.deepEqual(getDatabaseConfig({}), {
    url: "postgresql://localhost:5432/limelle",
    ssl: false,
  });
});
