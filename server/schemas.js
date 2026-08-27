export const orderBodySchema = {
  type: "object",
  required: ["customer", "items", "deliveryMode"],
  properties: {
    customer: { type: "object", required: ["fullName", "phone", "city"], properties: { fullName: { type: "string", minLength: 1, maxLength: 120 }, phone: { type: "string", minLength: 3, maxLength: 30 }, city: { type: "string", minLength: 1, maxLength: 100 } }, additionalProperties: false },
    items: { type: "array", minItems: 1, maxItems: 50, items: { type: "object", required: ["product", "quantity"], properties: { product: { type: "object", required: ["id"], properties: { id: { type: "string", minLength: 1, maxLength: 100 } }, additionalProperties: false }, quantity: { type: "integer", minimum: 1, maximum: 20 } }, additionalProperties: false } },
    deliveryMode: { type: "string", enum: ["point_retrait", "domicile"] },
    deliveryAddress: { type: "string", maxLength: 300 },
    notes: { type: "string", maxLength: 500 },
  },
  additionalProperties: false,
};

export const lookupTokenParamsSchema = { type: "object", required: ["lookupToken"], properties: { lookupToken: { type: "string", pattern: "^[a-f0-9]{64}$" } }, additionalProperties: false };
export const productIdParamsSchema = { type: "object", required: ["id"], properties: { id: { type: "string", minLength: 1, maxLength: 100 } }, additionalProperties: false };

export const registerBodySchema = {
  type: "object",
  required: ["email", "password", "fullName"],
  properties: {
    email: { type: "string", minLength: 5, maxLength: 254 },
    password: { type: "string", minLength: 6, maxLength: 128 },
    fullName: { type: "string", minLength: 2, maxLength: 120 },
    phone: { type: "string", maxLength: 30 },
    city: { type: "string", maxLength: 100 },
  },
  additionalProperties: false,
};

export const loginBodySchema = {
  type: "object",
  required: ["email", "password"],
  properties: {
    email: { type: "string", minLength: 5, maxLength: 254 },
    password: { type: "string", minLength: 1, maxLength: 128 },
  },
  additionalProperties: false,
};
