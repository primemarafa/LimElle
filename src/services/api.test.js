import test from "node:test";
import assert from "node:assert/strict";
import { api } from "./api.js";

const originalFetch = globalThis.fetch;

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

test("createOrder sends a JSON POST to the orders API", async () => {
  let request;

  globalThis.fetch = async (url, options) => {
    request = { url, options };
    return new Response(JSON.stringify({ lookupToken: "secure-token" }), {
      status: 201,
      headers: { "content-type": "application/json" },
    });
  };

  const order = {
    items: [{ productId: "LE-001", quantity: 2 }],
    customer: { fullName: "Awa Diop", phone: "+221700000000", city: "Dakar" },
    deliveryMode: "point_retrait",
    deliveryAddress: "",
    notes: "Appeler à l'arrivée",
  };

  const result = await api.createOrder(order);

  assert.equal(result.lookupToken, "secure-token");
  assert.ok(request.url.endsWith("/api/orders"));
  assert.equal(request.options.method, "POST");
  assert.equal(request.options.headers["Content-Type"], "application/json");
  assert.deepEqual(JSON.parse(request.options.body), order);
});

test("API errors are exposed to the frontend", async () => {
  globalThis.fetch = async () => new Response(JSON.stringify({ message: "Commande invalide" }), {
    status: 400,
    headers: { "content-type": "application/json" },
  });

  await assert.rejects(() => api.createOrder({}), /Commande invalide/);
});

test("order lookup encodes the lookup token", async () => {
  let requestedUrl = "";

  globalThis.fetch = async (url) => {
    requestedUrl = url;
    return new Response(JSON.stringify({ lookupToken: "token/with spaces" }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  };

  await api.order("token/with spaces");
  assert.ok(requestedUrl.endsWith("/api/orders/token%2Fwith%20spaces"));
});
