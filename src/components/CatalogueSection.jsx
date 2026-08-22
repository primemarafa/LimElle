import { ArrowRight, Gem, Handbag, Shirt, Scissors, Sparkles, Footprints } from "lucide-react";
import ProductGrid from "./ProductGrid";

const CATEGORY_VISUALS = {
  vetements: {
    title: "Vêtements",
    subtitle: "Tenues et ensembles féminins",
    icon: Shirt,
    image: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?q=80&w=600&auto=format&fit=crop",
  },
  tissus: {
    title: "Tissus",
    subtitle: "Wax, bazin et imprimés",
    icon: Scissors,
    image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=600&auto=format&fit=crop",
  },
  leche: {
    title: "Lèche",
    subtitle: "Voiles légers et brodés",
    icon: Sparkles,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=600&auto=format&fit=crop",
  },
  bijoux: {
    title: "Bijoux",
    subtitle: "Les détails qui font la différence",
    icon: Gem,
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=600&auto=format&fit=crop",
  },
  chaussures: {
    title: "Chaussures",
    subtitle: "Pour tes sorties et cérémonies",
    icon: Footprints,
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=600&auto=format&fit=crop",
  },
  "sacs-a-main": {
    title: "Sacs à main",
    subtitle: "Sacs et pochettes élégantes",
    icon: Handbag,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600&auto=format&fit=crop",
  },
};

export default function CatalogueSection({ categories, products, activeCategory, onCategoryChange, onAddToCart }) {
  const visualCategories = categories.filter((category) => CATEGORY_VISUALS[category.id]);

  return (
    <section id="catalogue" className="bg-[#F8F4EC] px-5 pt-20 md:pt-28">
      <div className="mx-auto max-w-7xl">
        <div id="categories" className="scroll-mt-24 text-center">
          <p className="text-xs font-bold uppercase tracking-[.22em] text-[#B58A4A]">Nos catégories</p>
          <h2 className="mt-3 text-3xl font-medium tracking-tight text-[#2B2620] md:text-4xl">Mode, tissus et accessoires</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-[#8A7A6A]">Une sélection pensée pour les tenues du quotidien et les cérémonies.</p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visualCategories.map((category) => {
            const visual = CATEGORY_VISUALS[category.id];
            const Icon = visual.icon;
            const active = activeCategory === category.id;
            return (
              <button key={category.id} type="button" onClick={() => onCategoryChange(category.id)} aria-pressed={active} className={`group relative overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${active ? "ring-2 ring-[#B58A4A]" : ""}`}>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={visual.image} alt={visual.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1B1712]/85 via-[#1B1712]/25 to-transparent" />
                  <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                    <Icon size={18} className="text-white" strokeWidth={1.5} />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-5 text-left">
                    <h3 className="text-lg font-semibold text-white">{visual.title}</h3>
                    <p className="mt-1 text-xs text-white/75">{visual.subtitle}</p>
                    <span className="mt-3 inline-flex items-center gap-1 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-medium text-white backdrop-blur-sm">Découvrir <ArrowRight size={12} /></span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div id="products" className="mt-24 scroll-mt-24">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.22em] text-[#B58A4A]">Produits phares</p>
              <h2 className="mt-3 text-3xl font-medium tracking-tight text-[#2B2620] md:text-4xl">Nos coups de cœur</h2>
            </div>
            <button type="button" onClick={() => onCategoryChange("all")} className="hidden items-center gap-1 text-sm font-medium text-[#B58A4A] hover:text-[#9A7540] sm:flex">Voir tout <ArrowRight size={14} /></button>
          </div>
          <div className="mt-10"><ProductGrid products={products} onAddToCart={onAddToCart} /></div>
        </div>
      </div>
    </section>
  );
}
