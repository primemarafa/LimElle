import { ArrowRight, Sparkles, Droplets, Gem, ShoppingBag } from "lucide-react";
import ProductGrid from "./ProductGrid";

const CATEGORY_VISUALS = {
  "soins-visage": {
    title: "Soins visage",
    subtitle: "Prenez soin de vous",
    icon: Droplets,
    image: "/images/category-soins-visage.jpg",
  },
  "soins-corps": {
    title: "Soins corps",
    subtitle: "Hydratez et sublimez",
    icon: Sparkles,
    image: "/images/category-soins-corps.jpg",
  },
  parfums: {
    title: "Parfums",
    subtitle: "Laissez votre empreinte",
    icon: Gem,
    image: "/images/category-parfums.jpg",
  },
  accessoires: {
    title: "Accessoires",
    subtitle: "L'élégance dans les détails",
    icon: ShoppingBag,
    image: "/images/category-accessoires.jpg",
  },
};

export default function CatalogueSection({ categories, products, activeCategory, onCategoryChange, onAddToCart, onSelectProduct }) {
  const visualCategories = categories.filter((category) => CATEGORY_VISUALS[category.id]);

  return (
    <section id="catalogue" className="bg-[#F8F4EC] px-5 pt-16 md:pt-24">
      <div className="mx-auto max-w-7xl">
        {/* Categories Heading */}
        <div id="categories" className="scroll-mt-24 text-center">
          <p className="text-xs font-bold uppercase tracking-[.24em] text-[#B58A4A]">Nos catégories</p>
          <h2 className="mt-2.5 font-serif text-3xl font-normal tracking-tight text-[#2B2620] md:text-4xl">
            Trouvez ce qui vous sublime
          </h2>
        </div>

        {/* 4 Cards Grid */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {visualCategories.map((category) => {
            const visual = CATEGORY_VISUALS[category.id];
            const Icon = visual.icon;
            const active = activeCategory === category.id;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => onCategoryChange(category.id)}
                aria-pressed={active}
                className={`group relative overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  active ? "ring-2 ring-[#B58A4A]" : ""
                }`}
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-[#2B2620]">
                  <img
                    src={visual.image}
                    alt={visual.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1B1712]/90 via-[#1B1712]/30 to-transparent" />
                  
                  {/* Frosted icon badge top left */}
                  <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-md">
                    <Icon size={18} className="text-white" strokeWidth={1.5} />
                  </div>

                  {/* Text bottom */}
                  <div className="absolute inset-x-0 bottom-0 p-5 text-left">
                    <h3 className="text-lg font-semibold text-white">{visual.title}</h3>
                    <p className="mt-1 text-xs text-white/80">{visual.subtitle}</p>
                    <span className="mt-3.5 inline-flex items-center gap-1.5 rounded-full border border-white/40 bg-white/10 px-4 py-1 text-xs font-medium text-white backdrop-blur-sm transition group-hover:bg-white/20">
                      Découvrir
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Featured Products Heading & Filter Tabs */}
        <div id="products" className="mt-20 scroll-mt-24 md:mt-24">
          <div className="flex flex-col gap-4 border-b border-[#E8E0D4]/70 pb-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.24em] text-[#B58A4A]">Sélection Lim'Elle</p>
              <h2 className="mt-1.5 font-serif text-2xl font-normal tracking-tight text-[#2B2620] md:text-3xl">
                Nos coups de cœur
              </h2>
            </div>

            {/* Quick Filter Tabs : Tous | Meilleures Ventes | Nouveautés */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => onCategoryChange("all")}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition ${
                  activeCategory === "all"
                    ? "bg-[#14261F] text-white shadow-xs"
                    : "bg-white border border-[#E8E0D4] text-[#6A5A4A] hover:text-[#2B2620]"
                }`}
              >
                Tous les produits
              </button>

              <button
                type="button"
                onClick={() => onCategoryChange("bestsellers")}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition ${
                  activeCategory === "bestsellers"
                    ? "bg-[#B58A4A] text-white shadow-xs"
                    : "bg-white border border-[#E8E0D4] text-[#6A5A4A] hover:text-[#B58A4A]"
                }`}
              >
                ⭐ Meilleures Ventes
              </button>

              <button
                type="button"
                onClick={() => onCategoryChange("nouveautes")}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition ${
                  activeCategory === "nouveautes"
                    ? "bg-[#14261F] text-white shadow-xs"
                    : "bg-white border border-[#E8E0D4] text-[#6A5A4A] hover:text-[#2B2620]"
                }`}
              >
                ✨ Nouveautés
              </button>
            </div>
          </div>

          <div className="mt-8">
            <ProductGrid
              products={products}
              onAddToCart={onAddToCart}
              onSelectProduct={onSelectProduct}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
