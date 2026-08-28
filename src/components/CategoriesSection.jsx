import React from "react";
import { Shirt, Footprints, Sparkles, ShoppingBag, ArrowRight } from "lucide-react";

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
  return (
    <section id="categories" aria-label="Catégories" className="bg-[#F8F4EC] px-5 py-16 md:py-24 scroll-mt-20 border-t border-[#E8E0D4]/60">
      <div className="mx-auto max-w-7xl">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[.24em] text-[#B58A4A]">Univers & Collections</p>
          <h2 className="mt-2.5 font-serif text-3xl font-normal tracking-tight text-[#2B2620] md:text-4xl">
            Nos 4 Catégories Signatures
          </h2>
          <p className="mt-3 text-sm text-[#6A5A4A]">
            Directement sourcées auprès des maîtres artisans et boutiques réputées de Dakar.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FASHION_CATEGORIES.map((category) => {
            const Icon = category.icon;
            const active = activeCategory === category.id;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => onSelectCategory(category.id)}
                className={`group relative overflow-hidden rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl text-left cursor-pointer ${
                  active ? "ring-3 ring-[#B58A4A] shadow-xl" : "border border-[#E8E0D4]"
                }`}
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-[#2B2620]">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#14261F]/90 via-[#14261F]/35 to-transparent" />

                  {/* Frosted icon badge top left */}
                  <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-md">
                    <Icon size={18} className="text-white" strokeWidth={1.5} />
                  </div>

                  {/* Text bottom */}
                  <div className="absolute inset-x-0 bottom-0 p-5 text-left">
                    <h3 className="text-lg font-semibold text-white">{category.title}</h3>
                    <p className="mt-1 text-xs text-white/85 line-clamp-2">{category.subtitle}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-white/40 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur-sm transition group-hover:bg-[#B58A4A] group-hover:border-[#B58A4A]">
                      Explorer les articles <ArrowRight size={12} />
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
