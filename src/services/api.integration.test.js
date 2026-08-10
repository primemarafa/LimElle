import test from "node:test";
import assert from "node:assert/strict";

const baseUrl = process.env.API_BASE_URL || "http://127.0.0.1:3001";

const orderPayload = {
  items: [{ product: { id: "LE-001" }, quantity: 1 }],
  customer: {
    fullName: "Test Integration",
    phone: "+22790000000",
    city: "Niamey",
    deliveryMode: "point_retrait",
    deliveryAddress: "",
    notes: "CI integration test",
  },
  deliveryMode: "point_retrait",
  deliveryAddress: "",
  notes: "CI integration test",
};

test("frontend API client completes a real order flow", async () => {
  const { api } = await import(`./api.js?integration=${Date.now()}`);
  const health = await api.health();
  assert.equal(health.status, "ok");

  const productsResponse = await api.products();
  assert.ok(Array.isArray(productsResponse.products));
  assert.ok(productsResponse.products.some((product) => product.id === "LE-001"));

  const order = await api.createOrder(orderPayload);
  assert.ok(order.lookupToken);

  const storedOrder = await api.order(order.lookupToken);
  assert.equal(storedOrder.lookupToken, order.lookupToken);
  assert.equal(storedOrder.customer.fullName, orderPayload.customer.fullName);
  assert.equal(storedOrder.items[0].product.id, "LE-001");
  assert.equal(storedOrder.deliveryMode, "point_retrait");
});
