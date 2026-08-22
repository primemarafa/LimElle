import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";

const source = await fs.readFile(new URL("../src/App.jsx", import.meta.url), "utf8");
const apiClient = await fs.readFile(new URL("../src/services/api.js", import.meta.url), "utf8");

test("frontend does not use dangerous HTML injection primitives", () => {
  assert.equal(/dangerouslySetInnerHTML|\.innerHTML\s*=|document\.write\s*\(/.test(source), false);
});

test("frontend does not persist order data in browser storage", () => {
  assert.equal(/sessionStorage|document\.cookie/.test(source), false);
});

test("frontend API client does not use dynamic code execution", () => {
  assert.equal(/eval\s*\(|new Function\s*\(/.test(apiClient), false);
});

test("frontend API client encodes order lookup tokens", () => {
  assert.match(apiClient, /encodeURIComponent\(lookupToken\)/);
});

test("frontend API client uses JSON content type", () => {
  assert.match(apiClient, /"Content-Type":\s*"application\/json"/);
});
