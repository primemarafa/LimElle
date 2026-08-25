const DEFAULT_BADGE = "Sélection";

function splitList(value) {
  if (Array.isArray(value)) return value;
  if (typeof value !== "string") return [];
  return value.split(",").map((item) => item.trim()).filter(Boolean);
}

// L'API (server/routes.js, table `products`) et les composants d'affichage
// (ProductCard, ProductDetails, App.jsx) n'utilisent pas les mêmes noms de
// champs : ce mappage évite de dupliquer la traduction dans chaque composant.
//   imageUrl -> img | category -> cat | size/color (CSV) -> sizes/colors ([])
//   weight (string Postgres NUMERIC) -> number | availability -> minuscule
export function normalizeProduct(product) {
  if (!product || typeof product !== "object") return {};
  return {
    ...product,
    img: product.imageUrl || product.img || "",
    cat: product.category || product.cat || "vetements",
    sizes: splitList(product.size || product.sizes),
    colors: splitList(product.color || product.colors),
    availability: typeof product.availability === "string" ? product.availability.toLowerCase() : (product.availability ?? "en_stock"),
    weight: typeof product.weight === "string" ? parseFloat(product.weight) : (product.weight ?? 0.5),
    badge: product.badge ?? DEFAULT_BADGE,
  };
}
