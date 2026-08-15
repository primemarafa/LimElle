import CategoryFilter from "./CategoryFilter";
import ProductGrid from "./ProductGrid";

const CATEGORY_VISUALS = {
  tenues: { title: "Tenues", subtitle: "Pièces féminines choisies à Dakar", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1000&auto=format&fit=crop" },
  sacs: { title: "Sacs", subtitle: "L'élégance dans les détails", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000&auto=format&fit=crop" },
  bijoux: { title: "Bijoux", subtitle: "Une touche précieuse au quotidien", image: "https://images.unsplash.com/photo-1611955167811-4711904bb9f8?q=80&w=1000&auto=format&fit=crop" },
  beaute: { title: "Beauté", subtitle: "Soins et cosmétiques sélectionnés", image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1000&auto=format&fit=crop" },
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
              <button key={category.id} type="button" onClick={() => onCategoryChange(category.id)} className="group relative aspect-[.88] overflow-hidden rounded-2xl text-left shadow-sm">
                <img src={visual.image} alt={visual.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <h3 className="font-serif text-2xl">{visual.title}</h3>
                  <p className="mt-1 text-xs text-white/85">{visual.subtitle}</p>
                  <span className="mt-4 inline-flex rounded-lg border border-white/70 px-3 py-2 text-xs font-bold">Découvrir</span>
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
