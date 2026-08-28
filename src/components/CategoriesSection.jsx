import { Shirt, Footprints, Sparkles, ShoppingBag, ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export const FASHION_CATEGORIES = [
  {
    id: "pagnes-leche",
    title: "Pagnes & Lèche",
    subtitle: "Bazin Riche, Getzner & Tissages Nobles",
    icon: Shirt,
    image: "/images/category-pagnes-leche.jpg",
  },
  {
    id: "chaussures",
    title: "Chaussures",
    subtitle: "Mules en cuir, Sandales & Talons d'Exception",
    icon: Footprints,
    image: "/images/category-chaussures.jpg",
  },
  {
    id: "bijoux",
    title: "Bijoux",
    subtitle: "Filigranes dorés & Parures Sahéliennes",
    icon: Sparkles,
    image: "/images/category-bijoux.jpg",
  },
  {
    id: "sacs",
    title: "Sacs",
    subtitle: "Maroquinerie & Cabas d'Ateliers",
    icon: ShoppingBag,
    image: "/images/category-sacs.jpg",
  },
];

export default function CategoriesSection({ activeCategory, onSelectCategory }) {
  const revealRef = useScrollReveal();

  return (
    <section id="categories" aria-label="Catégories" className="bg-[#FAFAF9] px-5 py-20 md:py-28 scroll-mt-20">
      <div className="mx-auto max-w-7xl" ref={revealRef}>

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto reveal">
          <p className="text-[11px] font-semibold uppercase tracking-[.28em] text-[#A16207]">Univers & Collections</p>
          <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-[#1C1917] md:text-[2.5rem]">
            Nos Catégories Signatures
          </h2>
          <p className="mt-3 text-sm text-[#57534E] leading-relaxed">
            Directement sourcées auprès des maîtres artisans et boutiques réputées de Dakar.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 reveal-stagger">
          {FASHION_CATEGORIES.map((category) => {
            const Icon = category.icon;
            const active = activeCategory === category.id;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => onSelectCategory(category.id)}
                className={`reveal group relative overflow-hidden rounded-[1.5rem] transition-all duration-500 text-left cursor-pointer ${
                  active
                    ? "ring-2 ring-[#A16207] shadow-xl scale-[1.02]"
                    : "border border-[#E7E5E4] hover:-translate-y-1.5 hover:shadow-2xl"
                }`}
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-[#1C1917]">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C0A09]/85 via-[#0C0A09]/25 to-transparent transition-opacity duration-500" />

                  {/* Glass icon badge */}
                  <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 backdrop-blur-lg border border-white/20 transition-transform duration-300 group-hover:scale-110">
                    <Icon size={18} className="text-white" strokeWidth={1.5} />
                  </div>

                  {/* Text bottom */}
                  <div className="absolute inset-x-0 bottom-0 p-5 transition-transform duration-500 group-hover:-translate-y-1">
                    <h3 className="font-serif text-xl font-semibold text-white">{category.title}</h3>
                    <p className="mt-1.5 text-xs text-white/80 line-clamp-2">{category.subtitle}</p>
                    <span className="mt-4 inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur-sm transition-all duration-300 group-hover:bg-[#A16207] group-hover:border-[#A16207] group-hover:shadow-lg">
                      Explorer <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
