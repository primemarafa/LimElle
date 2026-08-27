const DEFAULT_BADGE = "Sélection";

const FASHION_FALLBACKS_BY_KEY = {
  "le-001": { id: "le-001", name: "Bazin Riche Royal Brodé Or", description: "Bazin Getzner 100% coton brodé fil d'or - 5m", price: 35000, weight: 0.8, cat: "pagnes-leche", img: "/images/product-bazin-riche.jpg", badge: "Bestseller" },
  "le-002": { id: "le-002", name: "Lèche Sahélien Tissé Main", description: "Pagne traditionnel coton motifs géométriques", price: 28000, weight: 0.9, cat: "pagnes-leche", img: "/images/product-leche-sahelien.jpg", badge: "Authentique" },
  "le-003": { id: "le-003", name: "Mules Cuir & Cauris Dakar", description: "Mules d'atelier cuir véritable et laiton doré", price: 24000, weight: 0.6, cat: "chaussures", img: "/images/product-mules-cuir.jpg", badge: "Coup de cœur" },
  "le-004": { id: "le-004", name: "Collier Plastron Filigrane & Boucles", description: "Parure d'exception dorée à l'or fin", price: 45000, weight: 0.3, cat: "bijoux", img: "/images/product-collier-filigrane.jpg", badge: "Exclusif" },
  "le-005": { id: "le-005", name: "Cabas Cuir & Bande Tissée", description: "Sac à main structuré cuir pleine fleur camel", price: 38000, weight: 0.7, cat: "sacs", img: "/images/product-sac-cuir.jpg", badge: "Bestseller" },
};

function splitList(value) {
  if (Array.isArray(value)) return value;
  if (typeof value !== "string") return [];
  return value.split(",").map((item) => item.trim()).filter(Boolean);
}

export function normalizeProduct(product) {
  if (!product || typeof product !== "object") return {};
  
  const rawId = String(product.id || "").toLowerCase();
  const fallback = FASHION_FALLBACKS_BY_KEY[rawId];

  const rawImg = String(product.imageUrl || product.img || "");

  return {
    ...product,
    id: rawId || product.id,
    name: product.name || fallback?.name || "Article Lim'Elle",
    description: product.description || fallback?.description || "Sélection exclusive Dakar ➔ Niamey",
    price: typeof product.price === "number" ? product.price : parseFloat(product.price) || (fallback?.price ?? 25000),
    img: (!rawImg || rawImg.includes("wikimedia"))
      ? (fallback?.img || "/images/product-bazin-riche.jpg")
      : rawImg,
    cat: product.category || product.cat || fallback?.cat || "pagnes-leche",
    sizes: splitList(product.size || product.sizes || fallback?.sizes || "Unique"),
    colors: splitList(product.color || product.colors || fallback?.colors || "Selon disponibilité"),
    availability: typeof product.availability === "string" ? product.availability.toLowerCase() : (product.availability ?? "en_stock"),
    weight: typeof product.weight === "string" ? parseFloat(product.weight) : (product.weight ?? 0.6),
    badge: product.badge ?? fallback?.badge ?? DEFAULT_BADGE,
  };
}
