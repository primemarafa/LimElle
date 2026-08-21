import ProductCard from "./ProductCard";
import { cn } from "@/lib/utils";

export default function ProductGrid({ products, onAddToCart }) {
  if (!products?.length) {
    return (
      <div className="py-16 text-center">
        <p className="text-sm text-[#6A5A4A]">Aucun produit ne correspond à cette catégorie.</p>
      </div>
    );
  }

  return (
    <div
      role="list"
      aria-label="Produits"
      className={cn(
        "grid gap-4 sm:gap-5",
        "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
      )}
    >
      {products.map((product) => (
        <div key={product.id || product.name} role="listitem">
          <ProductCard product={product} onAddToCart={onAddToCart} />
        </div>
      ))}
    </div>
  );
}
