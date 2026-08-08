import http from "node:http";
import { products } from "./data/products.js";

const PORT = Number(process.env.PORT || 3001);

function sendJson(res, status, payload) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(payload));
}

function route(req) {
  return new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);
}

const server = http.createServer((req, res) => {
  const url = route(req);

  if (req.method === "GET" && url.pathname === "/api/health") {
    return sendJson(res, 200, { status: "ok", service: "limelle-api" });
  }

  if (req.method === "GET" && url.pathname === "/api/products") {
    return sendJson(res, 200, { products });
  }

  if (req.method === "GET" && url.pathname.startsWith("/api/products/")) {
    const id = decodeURIComponent(url.pathname.split("/").pop());
    const product = products.find((item) => String(item.id) === id);
    return product ? sendJson(res, 200, product) : sendJson(res, 404, { message: "Produit introuvable." });
  }

  return sendJson(res, 404, { message: "Route introuvable." });
});

server.listen(PORT, () => {
  console.log(`Lim'Elle API listening on port ${PORT}`);
});
