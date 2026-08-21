import WhatsAppButton from "./WhatsAppButton";

/**
 * Hero portrait — African woman with headwrap and gold earrings,
 * warm earthy tones matching the approved mockup exactly.
 */
const HERO_IMAGE =
  "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=800&auto=format&fit=crop";

export default function BrandHero({ onCatalogue }) {
  return (
    <section className="relative overflow-hidden bg-[#EDE4D4]">
      {/* Warm textured background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#EDE4D4] via-[#E8DCC8] to-[#DDD0BA]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-0 px-5 pt-14 pb-0 md:grid-cols-[1fr_1fr] md:gap-8 md:pt-20 md:pb-0 lg:px-8">
        {/* Left — editorial copy */}
        <div className="relative z-10 pb-12 md:pb-20">
          <h1 className="text-[2.5rem] font-medium leading-[1.08] tracking-tight text-[#2D2924] sm:text-5xl lg:text-[3.5rem]">
            Votre beauté,{" "}
            <br className="hidden sm:block" />
            <span className="font-serif italic text-[#A0845C]">
              notre priorité.
            </span>
          </h1>

          <p className="mt-6 max-w-md text-[0.95rem] leading-relaxed text-[#6A5A4A]">
            Découvrez des produits soigneusement sélectionnés pour sublimer
            votre éclat naturel chaque jour.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={onCatalogue}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#1B3A2D] px-7 py-3.5 text-sm font-bold text-white transition hover:bg-[#234a3a]"
            >
              Découvrir la boutique
              <span className="text-base">→</span>
            </button>
            <WhatsAppButton
              message="Bonjour Lim'Elle 🌸\nJe souhaite passer commande."
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#2D2924]/15 bg-white px-7 py-3.5 text-sm font-bold text-[#2D2924] transition hover:bg-[#F0EBE3]"
              iconSize={16}
            >
              Commander sur WhatsApp
            </WhatsAppButton>
          </div>

          {/* Trust mini-badges */}
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs text-[#6A5A4A]">
            <span className="flex items-center gap-2">
              <span className="text-base">🚚</span>
              <span>
                <strong className="font-semibold text-[#2D2924]">
                  Livraison rapide
                </strong>
                <br />
                Partout au Sénégal &amp; au Niger
              </span>
            </span>
            <span className="flex items-center gap-2">
              <span className="text-base">📍</span>
              <span>
                <strong className="font-semibold text-[#2D2924]">
                  Expédié depuis
                </strong>
                <br />
                Dakar · Niamey
              </span>
            </span>
          </div>
        </div>

        {/* Right — portrait image */}
        <div className="relative hidden md:block">
          <div className="relative aspect-[3/4] overflow-hidden rounded-t-3xl">
            <img
              src={HERO_IMAGE}
              alt="Portrait éditorial Lim'Elle — femme africaine aux tons chauds"
              className="h-full w-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1B1712]/20 via-transparent to-transparent" />
          </div>

          {/* Floating tag — right side like mockup */}
          <div className="absolute -right-1 top-8 rounded-2xl bg-[#F0EBE3]/95 px-5 py-3 shadow-md backdrop-blur-sm">
            <p className="text-[11px] font-semibold leading-snug text-[#A0845C]">
              L'élégance
            </p>
            <p className="text-[11px] leading-snug text-[#6A5A4A]">
              au féminin,
            </p>
            <p className="text-[11px] leading-snug text-[#6A5A4A]">
              naturellement.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
