import { ArrowRight, Shirt, Footprints, Sparkles, ShoppingBag } from "lucide-react";
import ProductGrid from "./ProductGrid";

const CATEGORY_VISUALS = {
  "pagnes-leche": {
    id: "pagnes-leche",
    title: "Pagnes & Lèche",
    subtitle: "Bazin Riche, Getzner & Tissages Nobles",
    icon: Shirt,
    image: "/images/category-pagnes-leche.jpg",
  },
  "chaussures": {
    id: "chaussures",
    title: "Chaussures",
    subtitle: "Mules en cuir, Sandales & Talons d'Exception",
    icon: Footprints,
    image: "/images/category-chaussures.jpg",
  },
  "bijoux": {
    id: "bijoux",
    title: "Bijoux",
    subtitle: "Filigranes dorés & Parures Sahéliennes",
    icon: Sparkles,
    image: "/images/category-bijoux.jpg",
  },
  "sacs": {
    id: "sacs",
    title: "Sacs",
    subtitle: "Maroquinerie & Cabas d'Ateliers",
    icon: ShoppingBag,
    image: "/images/category-sacs.jpg",
  },
};

export default function CatalogueSection({ categories, products, activeCategory, onCategoryChange, onAddToCart, onSelectProduct }) {
  const filterCategories = categories.filter((c) => c.id !== "all");

  return (
    <section id="products" aria-label="Boutique & Articles" className="bg-[#F8F4EC] px-5 py-16 md:py-24 scroll-mt-20 border-t border-[#E8E0D4]/60">
      <div className="mx-auto max-w-7xl">
        {/* Boutique Heading & Filters */}
        <div className="flex flex-col gap-6 border-b border-[#E8E0D4]/70 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.24em] text-[#B58A4A]">Boutique &amp; Prêt-à-porter</p>
            <h2 className="mt-1.5 font-serif text-3xl font-normal tracking-tight text-[#2B2620] md:text-4xl">
              Nos Articles Sélectionnés
            </h2>
            <p className="mt-1 text-sm text-[#6A5A4A]">
              Disponibilités en temps réel selon arrivages de Dakar à Niamey
            </p>
          </div>

          {/* Quick Filter Tabs & Categories */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => onCategoryChange("all")}
              className={`rounded-xl px-4 py-2 text-xs font-semibold transition cursor-pointer ${
                activeCategory === "all"
                  ? "bg-[#14261F] text-white shadow-sm"
                  : "bg-white border border-[#E8E0D4] text-[#6A5A4A] hover:text-[#2B2620]"
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
                  className={`rounded-xl px-3.5 py-2 text-xs font-semibold transition cursor-pointer ${
                    active
                      ? "bg-[#B58A4A] text-white shadow-sm"
                      : "bg-white border border-[#E8E0D4] text-[#6A5A4A] hover:text-[#B58A4A]"
                  }`}
                >
                  {cat.label || cat.name}
                </button>
              );
            })}

            <button
              type="button"
              onClick={() => onCategoryChange("bestsellers")}
              className={`rounded-xl px-3.5 py-2 text-xs font-semibold transition cursor-pointer ${
                activeCategory === "bestsellers"
                  ? "bg-[#B58A4A] text-white shadow-sm"
                  : "bg-white border border-[#E8E0D4] text-[#6A5A4A] hover:text-[#B58A4A]"
              }`}
            >
              ⭐ Bestsellers
            </button>

            <button
              type="button"
              onClick={() => onCategoryChange("nouveautes")}
              className={`rounded-xl px-3.5 py-2 text-xs font-semibold transition cursor-pointer ${
                activeCategory === "nouveautes"
                  ? "bg-[#14261F] text-white shadow-sm"
                  : "bg-white border border-[#E8E0D4] text-[#6A5A4A] hover:text-[#2B2620]"
              }`}
            >
              ✨ Nouveautés
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="mt-10">
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
