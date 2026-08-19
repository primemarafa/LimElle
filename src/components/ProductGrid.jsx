import ProductCard from "./ProductCard";

export default function ProductGrid({ products, onSelect, onAddToCart }) {
  if (!products.length) {
    return (
      <div className="rounded-xl bg-black/3 p-8 text-center text-black/50">
        Aucun produit ne correspond à cette catégorie.
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onSelect={onSelect}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}
