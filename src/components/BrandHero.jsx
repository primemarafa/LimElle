import { ArrowRight, Leaf, Gem, Truck, HeartHandshake, MapPin, MessageCircle, Flower2, Sparkles } from "lucide-react";
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
    <section aria-label="Bienvenue sur Lim'Elle" className="relative w-full overflow-hidden bg-[#14261F]">
      {/* Full-Width Background Image & Atmospheric Gradients */}
      <div className="relative min-h-[560px] w-full sm:min-h-[620px] lg:min-h-[680px]">
        
        {/* Full Bleed Image */}
        <img
          src="/images/hero-portrait.jpg"
          alt="Femme élégante avec soins de beauté Lim'Elle"
          className="absolute inset-0 h-full w-full object-cover object-[center_25%] md:object-[right_center]"
          loading="eager"
        />

        {/* Sophisticated Dark Gradient Overlays for High-Contrast Luxury Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#14261F] via-[#14261F]/60 to-black/30 md:bg-gradient-to-r md:from-[#14261F]/95 md:via-[#14261F]/70 md:to-black/20" />
        <div className="absolute inset-0 bg-[#14261F]/20 backdrop-blur-[0.5px]" />

        {/* Content Container */}
        <div className="relative mx-auto flex h-full min-h-[560px] max-w-7xl flex-col justify-between px-5 py-12 sm:min-h-[620px] sm:px-8 lg:min-h-[680px] lg:py-16">
          
          <div className="my-auto max-w-2xl pt-6 sm:pt-8">
            
            {/* Tag / Category Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#C8B99A]/30 bg-white/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[.18em] text-[#C8B99A] backdrop-blur-md">
              <Sparkles size={13} className="text-[#C8B99A]" />
              <span>Cosmétiques &amp; Soins d'exception</span>
            </div>

            {/* Main Headline */}
            <h1 className="mt-5 font-serif text-4xl leading-[1.1] tracking-tight text-[#F8F4EC] sm:text-5xl lg:text-[3.8rem]">
              <span className="block font-light">Votre beauté,</span>
              <span className="block font-normal italic text-[#C8B99A]">notre priorité.</span>
            </h1>

            {/* Subtitle */}
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-[#E8E0D4] sm:text-base md:text-lg">
              Découvrez des produits soigneusement sélectionnés pour sublimer votre éclat naturel chaque jour au Sahel.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5 sm:gap-4">
              <button
                type="button"
                onClick={onCatalogue}
                className="inline-flex items-center gap-2 rounded-xl bg-[#B58A4A] px-7 py-3.5 text-xs font-semibold text-white shadow-lg transition hover:bg-[#A37839] hover:shadow-xl sm:text-sm"
              >
                Découvrir la boutique <ArrowRight size={16} aria-hidden="true" />
              </button>

              <a
                href={`https://wa.me/${LIMELLE_CONFIG.whatsappNumber}?text=${encodeURIComponent(WA_MESSAGES.general)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-6 py-3.5 text-xs font-semibold text-white shadow-md backdrop-blur-md transition hover:bg-white/20 sm:text-sm"
              >
                <MessageCircle size={16} className="text-[#C8B99A]" aria-hidden="true" />
                Commander sur WhatsApp
              </a>
            </div>

            {/* Mini Trust Badges */}
            <div className="mt-10 flex flex-wrap items-center gap-6 border-t border-white/15 pt-6 text-xs text-[#F8F4EC] sm:gap-10">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-[#C8B99A] backdrop-blur-xs">
                  <Truck size={18} strokeWidth={1.75} aria-hidden="true" />
                </div>
                <div>
                  <p className="font-semibold text-white">Livraison rapide</p>
                  <p className="text-[#C8B99A]">Partout au Sénégal &amp; au Niger</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-[#C8B99A] backdrop-blur-xs">
                  <MapPin size={18} strokeWidth={1.75} aria-hidden="true" />
                </div>
                <div>
                  <p className="font-semibold text-white">Expédié depuis</p>
                  <p className="text-[#C8B99A]">Dakar • Niamey</p>
                </div>
              </div>
            </div>

          </div>

          {/* Floating Luxury Tag (Desktop/Tablet) */}
          <div className="absolute top-12 right-8 hidden rounded-2xl border border-white/15 bg-black/40 p-5 text-center shadow-2xl backdrop-blur-md lg:block">
            <p className="font-serif text-sm font-light leading-snug text-[#F8F4EC]">
              L'élégance<br />
              au féminin,<br />
              <span className="italic text-[#C8B99A]">naturellement.</span>
            </p>
            <div className="mt-2 flex justify-center text-[#C8B99A]" aria-hidden="true">
              <Flower2 size={16} strokeWidth={1.5} />
            </div>
          </div>

        </div>
      </div>

      {/* 4 Pillars Trust Bar directly integrated into the Dark Green Theme */}
      <div className="border-t border-white/10 bg-[#0E1B15] px-5 py-6 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-6">
            {TRUST_FEATURES.map(({ icon: Icon, label, description }) => (
              <div key={label} className="flex items-start gap-3">
                <Icon size={22} strokeWidth={1.5} className="mt-0.5 shrink-0 text-[#C8B99A]" aria-hidden="true" />
                <div>
                  <p className="text-xs font-semibold text-white sm:text-sm">{label}</p>
                  <p className="mt-0.5 text-[11px] text-[#C8B99A]/80">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
