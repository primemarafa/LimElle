const viteEnv = typeof import.meta.env === "object" && import.meta.env ? import.meta.env : {};
const nodeEnv = typeof process !== "undefined" && process.env ? process.env : {};
const API_BASE_URL = viteEnv.VITE_API_BASE_URL || nodeEnv.API_BASE_URL || "";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
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
  createOrder: (order, token = null) =>
    request("/api/orders", {
      method: "POST",
      body: JSON.stringify(order),
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    }),
  order: (lookupToken) => request(`/api/orders/${encodeURIComponent(lookupToken)}`),
  invoiceUrl: (lookupToken) => `${API_BASE_URL}/api/orders/${encodeURIComponent(lookupToken)}/invoice`,
  register: (data) => request("/api/auth/register", { method: "POST", body: JSON.stringify(data) }),
  login: (credentials) => request("/api/auth/login", { method: "POST", body: JSON.stringify(credentials) }),
  me: (token) => request("/api/auth/me", { headers: { Authorization: `Bearer ${token}` } }),
};

