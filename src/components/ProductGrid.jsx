import ProductCard from "./ProductCard";

export default function ProductGrid({ products, onSelect }) {
  if (!products.length) {
    return <div className="rounded-3xl bg-white p-8 text-center text-[#6B5E54]">Aucun produit ne correspond à cette catégorie.</div>;
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => <ProductCard key={product.id} product={product} onSelect={onSelect} />)}
    </div>
  );
}
