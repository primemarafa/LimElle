import ProductCard from "./ProductCard";

export default function ProductGrid({ products, onAddToCart }) {
  if (!products.length) {
    return (
      <div className="rounded-xl bg-[#F0EBE3]/50 p-10 text-center text-sm text-[#8A7A6A]">
        Aucun produit ne correspond à cette catégorie.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}
