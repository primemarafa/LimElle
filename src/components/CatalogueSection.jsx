import { ArrowRight } from "lucide-react";
import CategoryFilter from "./CategoryFilter";
import ProductGrid from "./ProductGrid";

const CATEGORY_VISUALS = {
  "soins-visage": {
    title: "Soins visage",
    subtitle: "Sérums, crèmes, nettoyants",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800&auto=format&fit=crop",
  },
  "soins-corps": {
    title: "Soins corps",
    subtitle: "Beurres, huiles, lotions",
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=800&auto=format&fit=crop",
  },
  parfums: {
    title: "Parfums",
    subtitle: "Eaux de toilette d'exception",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=800&auto=format&fit=crop",
  },
  accessoires: {
    title: "Accessoires",
    subtitle: "Pinceaux, éponges, coffrets",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=800&auto=format&fit=crop",
  },
};

export default function CatalogueSection({
  categories,
  products,
  activeCategory,
  onCategoryChange,
  onProductSelect,
  onAddToCart,
}) {
  const visualCategories = categories
    .filter((category) => CATEGORY_VISUALS[category.id])
    .slice(0, 4);

  return (
    <section id="catalogue" className="px-5 pt-20 md:pt-32">
      <div className="mx-auto max-w-7xl">
        {/* Categories Header */}
        <div id="categories" className="scroll-mt-28 text-center">
          <p className="text-xs font-bold uppercase tracking-[.22em] text-[#B8753C]">Nos catégories</p>
          <h2 className="mt-3 text-3xl font-medium tracking-tight text-black md:text-4xl">
            Trouvez ce qui vous sublime
          </h2>
        </div>

        {/* Category Cards */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {visualCategories.map((category) => {
            const visual = CATEGORY_VISUALS[category.id];
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => onCategoryChange(category.id)}
                className="group overflow-hidden rounded-xl border border-black/10 transition hover:shadow-lg"
              >
                <div className="relative aspect-[.85] overflow-hidden">
                  <img
                    src={visual.image}
                    alt={visual.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <h3 className="text-lg font-medium text-white">{visual.title}</h3>
                    <p className="mt-1 text-xs text-white/80">{visual.subtitle}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Products Header */}
        <div id="products" className="mt-24 scroll-mt-28">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.22em] text-[#B8753C]">Produits phares</p>
              <h2 className="mt-3 text-3xl font-medium tracking-tight text-black md:text-4xl">
                Nos coups de cœur
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onCategoryChange("all")}
              className="hidden items-center gap-1 text-sm font-medium text-black hover:text-[#B8753C] sm:flex"
            >
              Voir tout <ArrowRight size={14} />
            </button>
          </div>

          <div className="mt-8">
            <CategoryFilter
              categories={categories}
              activeCategory={activeCategory}
              onChange={onCategoryChange}
            />
            <div className="mt-7">
              <ProductGrid
                products={products}
                onSelect={onProductSelect}
                onAddToCart={onAddToCart}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
