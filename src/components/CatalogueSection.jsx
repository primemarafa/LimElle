import { ArrowRight } from "lucide-react";
import ProductGrid from "./ProductGrid";

/**
 * Category images matching the mockup's luxury editorial aesthetic.
 * Warm earthy tones, beauty products, lifestyle shots.
 */
const CATEGORY_VISUALS = {
  "soins-visage": {
    title: "Soins visage",
    subtitle: "Prenez soin de vous",
    image:
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=600&auto=format&fit=crop",
  },
  "soins-corps": {
    title: "Soins corps",
    subtitle: "Hydratez et sublimez",
    image:
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=600&auto=format&fit=crop",
  },
  parfums: {
    title: "Parfums",
    subtitle: "Laissez votre empreinte",
    image:
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?q=80&w=600&auto=format&fit=crop",
  },
  accessoires: {
    title: "Accessoires",
    subtitle: "L'élégance dans les détails",
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600&auto=format&fit=crop",
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
    .filter((c) => CATEGORY_VISUALS[c.id])
    .slice(0, 4);

  return (
    <section id="catalogue" className="bg-[#FAF6F0] px-5 pt-16 md:pt-24">
      <div className="mx-auto max-w-7xl">
        {/* ── Categories ── */}
        <div id="categories" className="scroll-mt-24 text-center">
          <p className="text-xs font-bold uppercase tracking-[.22em] text-[#A0845C]">
            Nos catégories
          </p>
          <h2 className="mt-3 text-3xl font-medium tracking-tight text-[#2D2924] md:text-4xl">
            Trouvez ce qui vous sublime
          </h2>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {visualCategories.map((category) => {
            const v = CATEGORY_VISUALS[category.id];
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => onCategoryChange(category.id)}
                className="group relative overflow-hidden rounded-2xl transition hover:shadow-lg"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={v.image}
                    alt={v.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1B1712]/80 via-[#1B1712]/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <h3 className="text-lg font-semibold text-white">
                      {v.title}
                    </h3>
                    <p className="mt-1 text-xs text-white/70">{v.subtitle}</p>
                    <span className="mt-3 inline-flex items-center gap-1 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-medium text-white backdrop-blur-sm transition group-hover:bg-white/20">
                      Découvrir <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* ── Products ── */}
        <div id="products" className="mt-20 scroll-mt-24">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.22em] text-[#A0845C]">
                Produits phares
              </p>
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
            <ProductGrid products={products} onAddToCart={onAddToCart} />
          </div>
        </div>
      </div>
    </section>
  );
}
