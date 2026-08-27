import { ArrowRight, Leaf, Gem, Truck, HeartHandshake, MapPin, MessageCircle, Flower2 } from "lucide-react";
import { LIMELLE_CONFIG, WA_MESSAGES } from "@/config/limelle";

const TRUST_FEATURES = [
  {
    icon: Leaf,
    label: "Ingrédients naturels",
    description: "Sains et respectueux de votre peau",
  },
  {
    icon: Gem,
    label: "Qualité premium",
    description: "Sélection rigoureuse des meilleurs produits",
  },
  {
    icon: Truck,
    label: "Livraison rapide",
    description: "Partout au Sénégal et au Niger",
  },
  {
    icon: HeartHandshake,
    label: "Service attentionné",
    description: "À votre écoute tous les jours",
  },
];

export default function BrandHero({ onCatalogue }) {
  return (
    <section aria-label="Bienvenue sur Lim'Elle" className="relative overflow-hidden bg-[#F7F2EB] pt-6 pb-10 md:pt-10 md:pb-14">
      {/* Main Hero Container */}
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-8">
          
          {/* Left Column: Typography & CTAs */}
          <div className="z-10 flex flex-col justify-center lg:col-span-6 xl:col-span-5">
            <h1 className="font-serif text-4xl leading-[1.12] tracking-tight text-[#1B3A2D] sm:text-5xl lg:text-[3.4rem] xl:text-[3.75rem]">
              <span className="block font-normal">Votre beauté,</span>
              <span className="block font-normal italic text-[#B58A4A]">notre priorité.</span>
            </h1>

            <p className="mt-5 max-w-md text-sm leading-relaxed text-[#6A5A4A] sm:text-base">
              Découvrez des produits soigneusement sélectionnés pour sublimer votre éclat naturel chaque jour.
            </p>

            {/* Action Buttons */}
            <div className="mt-7 flex flex-wrap items-center gap-3.5">
              <button
                type="button"
                onClick={onCatalogue}
                className="inline-flex items-center gap-2 rounded-xl bg-[#14261F] px-6 py-3.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#0E1B15] sm:text-sm"
              >
                Découvrir la boutique <ArrowRight size={15} aria-hidden="true" />
              </button>

              <a
                href={`https://wa.me/${LIMELLE_CONFIG.whatsappNumber}?text=${encodeURIComponent(WA_MESSAGES.general)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-[#2B2620]/20 bg-[#FDFBF7] px-5 py-3.5 text-xs font-semibold text-[#2B2620] shadow-sm transition hover:bg-white sm:text-sm"
              >
                <MessageCircle size={16} className="text-[#B58A4A]" aria-hidden="true" /> Commander sur WhatsApp
              </a>
            </div>

            {/* Mini Trust Badges */}
            <div className="mt-8 flex flex-wrap items-center gap-6 pt-2 text-xs sm:gap-8">
              <div className="flex items-center gap-3">
                <Truck size={22} strokeWidth={1.5} className="shrink-0 text-[#B58A4A]" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-[#2B2620]">Livraison rapide</p>
                  <p className="text-[#8A7A6A]">Partout au Sénégal &amp; au Niger</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MapPin size={22} strokeWidth={1.5} className="shrink-0 text-[#B58A4A]" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-[#2B2620]">Expédié depuis</p>
                  <p className="text-[#8A7A6A]">Dakar • Niamey</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual & Floating Tag */}
          <div className="relative lg:col-span-6 xl:col-span-7">
            <div className="relative mx-auto aspect-[4/3] w-full max-w-2xl overflow-hidden rounded-3xl sm:aspect-[16/11] lg:aspect-[16/11]">
              <img
                src="/images/hero-portrait.jpg"
                alt="Femme élégante avec soins de beauté Lim'Elle"
                className="h-full w-full object-cover object-center"
                loading="eager"
              />

              {/* Subtle warm overlay to harmonize with page background */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

              {/* Floating Badge (Top Right) */}
              <div className="absolute top-4 right-4 z-20 rounded-2xl bg-[#1C1611]/85 px-5 py-3.5 text-center shadow-lg backdrop-blur-md border border-white/10 sm:top-6 sm:right-6 sm:px-6 sm:py-4">
                <p className="font-serif text-xs font-light leading-snug text-[#F8F4EC] sm:text-sm">
                  L'élégance<br />
                  au féminin,<br />
                  <span className="italic text-[#C8B99A]">naturellement.</span>
                </p>
                <div className="mt-1.5 flex justify-center text-[#B58A4A]" aria-hidden="true">
                  <Flower2 size={15} strokeWidth={1.5} />
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Dark Forest Green Trust Strip */}
        <div className="mt-10 md:mt-14 rounded-2xl bg-[#14261F] px-6 py-6 text-white shadow-md">
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-4">
            {TRUST_FEATURES.map(({ icon: Icon, label, description }) => (
              <div key={label} className="flex items-start gap-3">
                <Icon size={22} strokeWidth={1.5} className="mt-0.5 shrink-0 text-[#C8B99A]" aria-hidden="true" />
                <div>
                  <p className="text-xs font-semibold text-white sm:text-sm">{label}</p>
                  <p className="mt-0.5 text-[11px] text-white/75">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

