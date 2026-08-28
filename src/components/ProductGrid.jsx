import ProductCard from "./ProductCard";
import { cn } from "@/lib/utils";

export default function ProductGrid({ products, onAddToCart, onSelectProduct }) {
  if (!products?.length) {
    return (
      <div className="py-20 text-center">
        <p className="text-sm text-[#57534E]">Aucun produit ne correspond à cette catégorie.</p>
      </div>
    );
  }

  return (
    <div
      role="list"
      aria-label="Produits"
      className={cn(
        "grid gap-5",
        "grid-cols-2 sm:grid-cols-2 lg:grid-cols-4"
      )}
    >
      {products.map((product) => (
        <div key={product.id || product.name} role="listitem">
          <ProductCard product={product} onAddToCart={onAddToCart} onSelectProduct={onSelectProduct} />
        </div>
      ))}
    </div>
  );
}
