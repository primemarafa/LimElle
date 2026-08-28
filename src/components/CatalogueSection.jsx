import { ArrowRight, Shirt, Footprints, Sparkles, ShoppingBag, Star, Zap } from "lucide-react";
import ProductGrid from "./ProductGrid";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function CatalogueSection({ categories, products, activeCategory, onCategoryChange, onAddToCart, onSelectProduct }) {
  const filterCategories = categories.filter((c) => c.id !== "all");
  const revealRef = useScrollReveal();

  return (
    <section id="products" aria-label="Boutique & Articles" className="bg-[#FAFAF9] px-5 py-20 md:py-28 scroll-mt-20">
      <div className="mx-auto max-w-7xl" ref={revealRef}>
        {/* Heading & Filters */}
        <div className="reveal flex flex-col gap-6 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[.28em] text-[#A16207]">Boutique & Prêt-à-porter</p>
            <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-[#1C1917] md:text-[2.5rem]">
              Nos Articles Sélectionnés
            </h2>
            <p className="mt-1.5 text-sm text-[#57534E]">
              Disponibilités en temps réel selon arrivages de Dakar à Niamey
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => onCategoryChange("all")}
              className={`rounded-xl px-4 py-2.5 text-xs font-semibold transition-all duration-300 cursor-pointer ${
                activeCategory === "all"
                  ? "bg-[#1C1917] text-white shadow-md"
                  : "bg-white border border-[#E7E5E4] text-[#57534E] hover:text-[#1C1917] hover:border-[#D6D3D1]"
              }`}
            >
              Tous ({products.length})
            </button>

            {filterCategories.map((cat) => {
              const active = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => onCategoryChange(cat.id)}
                  className={`rounded-xl px-4 py-2.5 text-xs font-semibold transition-all duration-300 cursor-pointer ${
                    active
                      ? "bg-[#A16207] text-white shadow-md"
                      : "bg-white border border-[#E7E5E4] text-[#57534E] hover:text-[#A16207] hover:border-[#A16207]/30"
                  }`}
                >
                  {cat.label || cat.name}
                </button>
              );
            })}

            <button
              type="button"
              onClick={() => onCategoryChange("bestsellers")}
              className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-semibold transition-all duration-300 cursor-pointer ${
                activeCategory === "bestsellers"
                  ? "bg-[#A16207] text-white shadow-md"
                  : "bg-white border border-[#E7E5E4] text-[#57534E] hover:text-[#A16207] hover:border-[#A16207]/30"
              }`}
            >
              <Star size={12} aria-hidden="true" /> Bestsellers
            </button>

            <button
              type="button"
              onClick={() => onCategoryChange("nouveautes")}
              className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-semibold transition-all duration-300 cursor-pointer ${
                activeCategory === "nouveautes"
                  ? "bg-[#1C1917] text-white shadow-md"
                  : "bg-white border border-[#E7E5E4] text-[#57534E] hover:text-[#1C1917] hover:border-[#D6D3D1]"
              }`}
            >
              <Zap size={12} aria-hidden="true" /> Nouveautés
            </button>
          </div>
        </div>

        {/* Separator */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#D6D3D1] to-transparent" />

        {/* Products Grid */}
        <div className="mt-10 reveal">
          <ProductGrid
            products={products}
            onAddToCart={onAddToCart}
            onSelectProduct={onSelectProduct}
          />
        </div>
      </div>
    </section>
  );
}
