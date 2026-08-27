const DEFAULT_BADGE = "Sélection";

const BEAUTY_FALLBACKS_BY_KEY = {
  "le-001": { id: "le-001", name: "Sérum éclat naturel", description: "Anti-taches - 30ml", price: 9500, weight: 0.2, cat: "soins-visage", img: "/images/product-serum-eclat.jpg", badge: "Bestseller" },
  "le-002": { id: "le-002", name: "Beurre de karité pur", description: "Hydratation intense - 200g", price: 6000, weight: 0.3, cat: "soins-corps", img: "/images/product-beurre-karite.jpg", badge: "Naturel" },
  "le-003": { id: "le-003", name: "Parfum Élégance", description: "Eau de parfum - 50ml", price: 12500, weight: 0.35, cat: "parfums", img: "/images/product-parfum-elegance.jpg", badge: "Exclusif" },
  "le-004": { id: "le-004", name: "Savon clarifiant", description: "Éclat naturel - 100g", price: 2500, weight: 0.15, cat: "soins-visage", img: "/images/product-savon-clarifiant.jpg", badge: "Doux" },
  "le-005": { id: "le-005", name: "Huile précieuse", description: "Nourrissante - 50ml", price: 8500, weight: 0.25, cat: "soins-corps", img: "/images/product-huile-precieuse.jpg", badge: "Coup de cœur" },
};

function splitList(value) {
  if (Array.isArray(value)) return value;
  if (typeof value !== "string") return [];
  return value.split(",").map((item) => item.trim()).filter(Boolean);
}

export function normalizeProduct(product) {
  if (!product || typeof product !== "object") return {};
  
  const rawId = String(product.id || "").toLowerCase();
  const fallback = BEAUTY_FALLBACKS_BY_KEY[rawId];

  // If the product is an old fashion item (Boubou, Tenue, etc.) or uses an old image, map it to the modern beauty product
  const rawName = String(product.name || "").toLowerCase();
  const rawImg = String(product.imageUrl || product.img || "");
  const isLegacyFashion = rawName.includes("boubou") || rawName.includes("peulh") || rawName.includes("bazin") || rawName.includes("parure") || rawImg.includes("category-tenues") || rawImg.includes("category-sacs") || rawImg.includes("wikimedia");

  if (isLegacyFashion && fallback) {
    return {
      ...fallback,
      sizes: splitList(fallback.sizes || "Unique"),
      colors: splitList(fallback.colors || "Standard"),
      availability: "disponible",
    };
  }

  return {
    ...product,
    id: rawId || product.id,
    name: isLegacyFashion && fallback ? fallback.name : product.name,
    description: isLegacyFashion && fallback ? fallback.description : product.description,
    price: isLegacyFashion && fallback ? fallback.price : (typeof product.price === "number" ? product.price : parseFloat(product.price) || 9500),
    img: (isLegacyFashion || !rawImg || rawImg.includes("wikimedia") || rawImg.includes("category-tenues") || rawImg.includes("category-sacs"))
      ? (fallback?.img || "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=700&auto=format&fit=crop")
      : rawImg,
    cat: product.category || product.cat || fallback?.cat || "soins-visage",
    sizes: splitList(product.size || product.sizes),
    colors: splitList(product.color || product.colors),
    availability: typeof product.availability === "string" ? product.availability.toLowerCase() : (product.availability ?? "en_stock"),
    weight: typeof product.weight === "string" ? parseFloat(product.weight) : (product.weight ?? 0.5),
    badge: product.badge ?? fallback?.badge ?? DEFAULT_BADGE,
  };
}
