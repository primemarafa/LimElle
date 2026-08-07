export const ORDER_STATUSES = Object.freeze([
  "PENDING",
  "CONFIRMED",
  "PAID",
  "PURCHASING_DAKAR",
  "PREPARING",
  "SHIPPED",
  "ARRIVED_NIAMEY",
  "READY_FOR_PICKUP",
  "DELIVERED",
  "CANCELLED",
]);

export const PAYMENT_STATUSES = Object.freeze([
  "PENDING",
  "PAID",
  "FAILED",
  "REFUNDED",
]);

export const ROLES = Object.freeze([
  "ADMIN",
  "OPERATIONS_DAKAR",
  "CLIENTELE_NIAMEY",
]);

export function createOrderModel(overrides = {}) {
  return {
    id: null,
    reference: null,
    customerId: null,
    items: [],
    productTotal: 0,
    transportEstimated: 0,
    transportActual: null,
    margin: 0,
    globalPrice: 0,
    weightEstimatedKg: 0,
    weightActualKg: null,
    status: "PENDING",
    paymentStatus: "PENDING",
    destination: "Niamey",
    pickupMode: "PICKUP",
    notes: "",
    createdAt: null,
    updatedAt: null,
    ...overrides,
  };
}

export function createCustomRequestModel(overrides = {}) {
  return {
    id: null,
    customerId: null,
    description: "",
    imageUrl: null,
    size: "",
    color: "",
    budgetMax: null,
    status: "PENDING",
    proposedPrice: null,
    createdAt: null,
    updatedAt: null,
    ...overrides,
  };
}
