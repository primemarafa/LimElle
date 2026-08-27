import assert from "node:assert/strict";
import test from "node:test";
import { buildApp } from "./app.js";

async function withApp(testFn, options = {}) {
  const app = buildApp(options);
  try {
    await app.ready();
    await testFn(app);
  } finally {
    await app.close();
  }
}

test("POST /api/auth/register creates a user and returns a token", async () => {
  await withApp(async (app) => {
    const response = await app.inject({
      method: "POST",
      url: "/api/auth/register",
      payload: {
        email: "awa.diallo@example.com",
        password: "securePassword123",
        fullName: "Awa Diallo",
        phone: "+22790000000",
        city: "Niamey",
      },
    });

    assert.equal(response.statusCode, 201);
    const body = response.json();
    assert.ok(body.token);
    assert.equal(body.user.email, "awa.diallo@example.com");
    assert.equal(body.user.fullName, "Awa Diallo");
    assert.equal(body.user.passwordHash, undefined);
    assert.equal(body.user.salt, undefined);
  });
});

test("POST /api/auth/register rejects duplicate email", async () => {
  await withApp(async (app) => {
    const payload = {
      email: "duplicate@example.com",
      password: "securePassword123",
      fullName: "Duplicate User",
    };

    const first = await app.inject({ method: "POST", url: "/api/auth/register", payload });
    assert.equal(first.statusCode, 201);

    const second = await app.inject({ method: "POST", url: "/api/auth/register", payload });
    assert.equal(second.statusCode, 400);
    assert.match(second.json().message, /existe déjà/i);
  });
});

test("POST /api/auth/register rejects password shorter than 6 characters", async () => {
  await withApp(async (app) => {
    const response = await app.inject({
      method: "POST",
      url: "/api/auth/register",
      payload: {
        email: "short@example.com",
        password: "123",
        fullName: "Short Password",
      },
    });

    assert.equal(response.statusCode, 400);
  });
});

test("POST /api/auth/login authenticates with valid credentials and rejects bad ones", async () => {
  await withApp(async (app) => {
    await app.inject({
      method: "POST",
      url: "/api/auth/register",
      payload: {
        email: "login.test@example.com",
        password: "correctPassword123",
        fullName: "Login Test",
      },
    });

    const successResponse = await app.inject({
      method: "POST",
      url: "/api/auth/login",
      payload: {
        email: "login.test@example.com",
        password: "correctPassword123",
      },
    });

    assert.equal(successResponse.statusCode, 200);
    const successBody = successResponse.json();
    assert.ok(successBody.token);
    assert.equal(successBody.user.email, "login.test@example.com");

    const failedResponse = await app.inject({
      method: "POST",
      url: "/api/auth/login",
      payload: {
        email: "login.test@example.com",
        password: "wrongPassword",
      },
    });

    assert.equal(failedResponse.statusCode, 401);
  });
});

test("GET /api/auth/me returns current user and rejects invalid token", async () => {
  await withApp(async (app) => {
    const registerResponse = await app.inject({
      method: "POST",
      url: "/api/auth/register",
      payload: {
        email: "me.test@example.com",
        password: "password123",
        fullName: "Me Test",
      },
    });

    const { token } = registerResponse.json();

    const meResponse = await app.inject({
      method: "GET",
      url: "/api/auth/me",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    assert.equal(meResponse.statusCode, 200);
    assert.equal(meResponse.json().user.email, "me.test@example.com");

    const unauthResponse = await app.inject({
      method: "GET",
      url: "/api/auth/me",
      headers: {
        authorization: "Bearer invalid:123456:badsignature",
      },
    });

    assert.equal(unauthResponse.statusCode, 401);
  });
});

test("POST /api/orders attaches userId when authenticated and succeeds without token", async () => {
  await withApp(async (app) => {
    const registerResponse = await app.inject({
      method: "POST",
      url: "/api/auth/register",
      payload: {
        email: "order.auth@example.com",
        password: "password123",
        fullName: "Order Auth User",
      },
    });
    const { token, user } = registerResponse.json();

    const authOrderResponse = await app.inject({
      method: "POST",
      url: "/api/orders",
      headers: {
        authorization: `Bearer ${token}`,
      },
      payload: {
        customer: { fullName: "Order Auth User", phone: "+22790000000", city: "Niamey" },
        items: [{ product: { id: "le-001" }, quantity: 1 }],
        deliveryMode: "point_retrait",
      },
    });

    assert.equal(authOrderResponse.statusCode, 201);
    assert.equal(authOrderResponse.json().userId, user.id);

    const guestOrderResponse = await app.inject({
      method: "POST",
      url: "/api/orders",
      payload: {
        customer: { fullName: "Guest User", phone: "+22790000000", city: "Niamey" },
        items: [{ product: { id: "le-001" }, quantity: 1 }],
        deliveryMode: "point_retrait",
      },
    });

    assert.equal(guestOrderResponse.statusCode, 201);
    assert.equal(guestOrderResponse.json().userId, null);
  });
});
