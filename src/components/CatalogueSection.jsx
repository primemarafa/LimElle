import { ArrowRight } from "lucide-react";
import CategoryFilter from "./CategoryFilter";
import ProductGrid from "./ProductGrid";

const CATEGORY_VISUALS = {
  "soins-visage": {
    title: "Soins visage",
    subtitle: "Prenez soin de vous",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=600&auto=format&fit=crop",
  },
  "soins-corps": {
    title: "Soins corps",
    subtitle: "Hydratez et sublimez",
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=600&auto=format&fit=crop",
  },
  parfums: {
    title: "Parfums",
    subtitle: "Laissez votre empreinte",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=600&auto=format&fit=crop",
  },
  accessoires: {
    title: "Accessoires",
    subtitle: "L'élégance dans les détails",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=600&auto=format&fit=crop",
  },
};

export default function CatalogueSection({
  categories,
  products,
  activeCategory,
  onCategoryChange,
  onAddToCart,
}) {
  const visualCategories = categories
    .filter((category) => CATEGORY_VISUALS[category.id])
    .slice(0, 4);

  return (
    <section id="catalogue" className="bg-[#FAF6F0] px-5 pt-16 md:pt-24">
      <div className="mx-auto max-w-7xl">
        {/* Categories Header */}
        <div id="categories" className="scroll-mt-24 text-center">
          <p className="text-xs font-bold uppercase tracking-[.22em] text-[#A0845C]">Nos catégories</p>
          <h2 className="mt-3 text-3xl font-medium tracking-tight text-[#2D2924] md:text-4xl">
            Trouvez ce qui vous sublime
          </h2>
        </div>

        {/* Category Cards — product images with dark overlay */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {visualCategories.map((category) => {
            const visual = CATEGORY_VISUALS[category.id];
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => onCategoryChange(category.id)}
                className="group relative overflow-hidden rounded-2xl transition hover:shadow-lg"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={visual.image}
                    alt={visual.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1B1712]/80 via-[#1B1712]/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <h3 className="text-lg font-semibold text-white">{visual.title}</h3>
                    <p className="mt-1 text-xs text-white/70">{visual.subtitle}</p>
                    <span className="mt-3 inline-flex items-center gap-1 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-medium text-white backdrop-blur-sm transition group-hover:bg-white/20">
                      Découvrir <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Products Header */}
        <div id="products" className="mt-20 scroll-mt-24">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.22em] text-[#A0845C]">Produits phares</p>
              <h2 className="mt-3 text-3xl font-medium tracking-tight text-[#2D2924] md:text-4xl">
                Nos coups de cœur
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onCategoryChange("all")}
              className="hidden items-center gap-1 text-sm font-medium text-[#A0845C] hover:text-[#8A7050] sm:flex"
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
                onAddToCart={onAddToCart}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
