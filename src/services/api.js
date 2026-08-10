const viteEnv = typeof import.meta.env === "object" && import.meta.env ? import.meta.env : {};
const nodeEnv = typeof process !== "undefined" && process.env ? process.env : {};
const API_BASE_URL = viteEnv.VITE_API_BASE_URL || nodeEnv.API_BASE_URL || "";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.message || "Une erreur est survenue.");
  }
  return payload;
}

export const api = {
  health: () => request("/api/health"),
  products: () => request("/api/products"),
  product: (id) => request(`/api/products/${encodeURIComponent(id)}`),
  createOrder: (order) => request("/api/orders", { method: "POST", body: JSON.stringify(order) }),
  order: (reference) => request(`/api/orders/${encodeURIComponent(reference)}`),
};
