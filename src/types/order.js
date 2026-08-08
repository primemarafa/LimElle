export const ORDER_STATUSES = [
  "EN_ATTENTE",
  "CONFIRMÉE",
  "PAYÉE",
  "EN_PRÉPARATION",
  "EXPÉDIÉE",
  "EN_TRANSIT",
  "ARRIVÉE",
  "LIVRÉE",
  "ANNULÉE",
];

export function createOrderReference(date = new Date()) {
  const stamp = date.toISOString().slice(0, 10).replaceAll("-", "");
  const suffix = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `LE-${stamp}-${suffix}`;
}

export function createOrder({ items, customer, totals, requestType = "catalogue" }) {
  return {
    reference: createOrderReference(),
    status: "EN_ATTENTE",
    requestType,
    customer,
    items,
    totals,
    createdAt: new Date().toISOString(),
  };
}
