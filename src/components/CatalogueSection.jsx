import CategoryFilter from "./CategoryFilter";
import ProductGrid from "./ProductGrid";

export default function CatalogueSection({ categories, products, activeCategory, onCategoryChange, onProductSelect }) {
  return (
    <section id="catalogue" className="mx-auto max-w-5xl px-5 pb-16">
      <div className="mb-6">
        <span className="text-xs font-bold uppercase tracking-[.18em] text-[#5B5348]">Catalogue</span>
        <h2 className="mt-2 text-3xl font-semibold">Les produits recherchés à Dakar</h2>
      </div>
      <CategoryFilter categories={categories} activeCategory={activeCategory} onChange={onCategoryChange} />
      <ProductGrid products={products} onSelect={onProductSelect} />
    </section>
  );
}
