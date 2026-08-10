import test from "node:test";
import assert from "node:assert/strict";
import { lookupTokenParamsSchema, orderBodySchema } from "./schemas.js";

test("order schema rejects unexpected top-level properties", () => {
  assert.equal(orderBodySchema.additionalProperties, false);
});

test("order schema limits notes to 500 characters", () => {
  assert.equal(orderBodySchema.properties.notes.maxLength, 500);
});

test("lookup token schema accepts only 64 lowercase hexadecimal characters", () => {
  const pattern = new RegExp(lookupTokenParamsSchema.properties.lookupToken.pattern);
  assert.match("a".repeat(64), pattern);
  assert.doesNotMatch("A".repeat(64), pattern);
  assert.doesNotMatch("a".repeat(63), pattern);
});
