import WhatsAppButton from "./WhatsAppButton";

const HERO_IMAGE = "/images/hero-portrait.jpg";

export default function BrandHero({ onCatalogue }) {
  return (
    <section className="relative overflow-hidden bg-[#FAF6F0]">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 py-12 md:grid-cols-2 md:gap-12 md:py-20 lg:px-8">
        {/* Left — editorial copy */}
        <div className="relative z-10">
          <h1 className="text-4xl font-medium leading-[1.1] tracking-tight text-[#2D2924] sm:text-5xl lg:text-6xl">
            Votre beauté,{" "}
            <span className="italic text-[#A0845C]">notre priorité.</span>
          </h1>
          <p className="mt-5 max-w-md text-base leading-7 text-[#6A5A4A] sm:text-lg">
            Découvrez des produits soigneusement sélectionnés pour sublimer votre éclat naturel chaque jour.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={onCatalogue}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#1B3A2D] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#234a3a]"
            >
              Découvrir la boutique
              <span className="text-lg">→</span>
            </button>
            <WhatsAppButton
              message="Bonjour Lim'Elle 🌸\nJe souhaite passer commande."
              className="rounded-lg border border-[#2D2924]/15 bg-white px-6 py-3.5 text-sm font-bold text-[#2D2924] transition hover:bg-[#F0EBE3]"
              iconSize={16}
            >
              Commander sur WhatsApp
            </WhatsAppButton>
          </div>

          {/* Trust mini-badges */}
          <div className="mt-8 flex flex-wrap gap-5 text-xs text-[#6A5A4A]">
            <span className="flex items-center gap-1.5">
              <span className="text-base">🚚</span> Livraison rapide · Partout au Sénégal & au Niger
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-base">📍</span> Expédié depuis Dakar · Niamey
            </span>
          </div>
        </div>

        {/* Right — image */}
        <div className="relative hidden md:block">
          <div className="relative aspect-[3/4] overflow-hidden rounded-3xl">
            <img
              src={HERO_IMAGE}
              alt="Portrait éditorial Lim'Elle"
              className="h-full w-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1B1712]/30 via-transparent to-transparent" />
          </div>
          {/* Floating tag — right side like mockup */}
          <div className="absolute -right-2 top-8 rounded-2xl bg-[#F0EBE3]/90 backdrop-blur-sm px-5 py-3 shadow-md">
            <p className="text-xs font-semibold text-[#A0845C]">L'élégance</p>
            <p className="text-xs text-[#6A5A4A]">au féminin,</p>
            <p className="text-xs text-[#6A5A4A]">naturellement.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
