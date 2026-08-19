import { Shirt, ShoppingBag, Gem, Sparkles } from "lucide-react";
import CategoryFilter from "./CategoryFilter";
import ProductGrid from "./ProductGrid";

const CATEGORY_VISUALS = {
  tenues: { title: "Tenues", subtitle: "Pièces féminines choisies à Dakar", image: "/images/category-tenues.jpg", Icon: Shirt },
  sacs: { title: "Sacs", subtitle: "L'élégance dans les détails", image: "/images/category-sacs.jpg", Icon: ShoppingBag },
  bijoux: { title: "Bijoux", subtitle: "Une touche précieuse au quotidien", image: "/images/category-sacs.jpg", Icon: Gem },
  beaute: { title: "Beauté", subtitle: "Soins et cosmétiques sélectionnés", image: "/images/category-beaute.jpg", Icon: Sparkles },
};

export default function CatalogueSection({ categories, products, activeCategory, onCategoryChange, onProductSelect }) {
  const visualCategories = categories.filter((category) => CATEGORY_VISUALS[category.id]).slice(0, 4);

  return (
    <section id="catalogue" className="bg-[#F8F3EA] px-5 pb-20 pt-16 md:pt-24">
      <div className="mx-auto max-w-7xl">
        <div id="categories" className="scroll-mt-28 text-center">
          <p className="text-xs font-bold uppercase tracking-[.24em] text-[#B8753C]">Nos catégories</p>
          <h2 className="mt-3 font-serif text-4xl tracking-[-.03em] text-[#173F34] md:text-5xl">Trouvez ce qui vous sublime</h2>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {visualCategories.map((category) => {
            const visual = CATEGORY_VISUALS[category.id];
            return (
              <button key={category.id} type="button" onClick={() => onCategoryChange(category.id)} className="group relative aspect-[.88] overflow-hidden rounded-[1.75rem] text-left shadow-[0_18px_36px_rgba(23,63,52,0.08)] ring-1 ring-[#173F34]/10">
                <img src={visual.image} alt={visual.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" loading="lazy" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1B1712]/80 via-[#1B1712]/16 to-transparent" />
                <span className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/85 text-[#173F34] backdrop-blur-sm"><visual.Icon size={18} strokeWidth={1.75} /></span>
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <h3 className="font-serif text-2xl">{visual.title}</h3>
                  <p className="mt-1 text-xs text-white/85">{visual.subtitle}</p>
                          <span className="mt-4 inline-flex rounded-xl border border-white/70 bg-white/10 px-3 py-2 text-xs font-bold backdrop-blur-sm">Découvrir</span>
                </div>
              </button>
            );
          })}
        </div>
        <div id="products" className="mt-24 scroll-mt-28">
          <div className="flex items-end justify-between gap-4">
            <div><p className="text-xs font-bold uppercase tracking-[.22em] text-[#B8753C]">Produits phares</p><h2 className="mt-3 font-serif text-4xl tracking-[-.03em] text-[#173F34] md:text-5xl">Nos coups de cœur</h2></div>
            <button type="button" onClick={() => onCategoryChange("all")} className="hidden rounded-lg px-2 py-2 text-sm font-bold text-[#173F34] hover:bg-white sm:block">Voir tout <span className="ml-2">→</span></button>
          </div>
          <div className="mt-8"><CategoryFilter categories={categories} activeCategory={activeCategory} onChange={onCategoryChange} /><div className="mt-7"><ProductGrid products={products} onSelect={onProductSelect} /></div></div>
        </div>
      </div>
    </section>
  );
}
