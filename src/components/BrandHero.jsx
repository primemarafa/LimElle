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
    <section aria-label="Bienvenue sur Lim'Elle" className="relative w-full overflow-hidden bg-[#F7F2EB] pt-6 sm:pt-10">
      {/* Top Hero Container with Integrated Photo & Soft Left Gradient */}
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="relative min-h-[500px] w-full overflow-hidden rounded-3xl sm:min-h-[560px] lg:min-h-[620px]">
          
          {/* Integrated Model Image on the right / full width with soft gradient transition */}
          <div className="absolute inset-0 z-0">
            <img
              src="/images/hero-portrait.jpg"
              alt="Femme élégante avec soins de beauté Lim'Elle"
              className="h-full w-full object-cover object-[70%_center] sm:object-[75%_center] lg:object-[85%_center]"
              loading="eager"
            />
            {/* Seamless Subtle Left Fade Gradient to let the model image shine vibrantly */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#F7F2EB] via-[#F7F2EB]/65 via-30% to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Floating Luxury Tag (Top Right) */}
          <div className="absolute top-6 right-6 z-20 hidden rounded-full border border-white/15 bg-[#1C1611]/85 px-6 py-4 text-center shadow-xl backdrop-blur-md sm:block">
            <p className="font-serif text-xs font-light leading-snug text-[#F8F4EC] sm:text-sm">
              L'élégance<br />
              au féminin,<br />
              <span className="italic text-[#C8B99A]">naturellement.</span>
            </p>
            <div className="mt-1.5 flex justify-center text-[#B58A4A]" aria-hidden="true">
              <Flower2 size={15} strokeWidth={1.5} />
            </div>
          </div>

          {/* Left Hero Content Block */}
          <div className="relative z-10 flex min-h-[500px] max-w-xl flex-col justify-center py-10 pl-2 sm:min-h-[560px] sm:py-14 sm:pl-6 lg:min-h-[620px] lg:max-w-2xl lg:pl-8">
            
            {/* Main Headline */}
            <h1 className="font-serif text-4xl leading-[1.12] tracking-tight text-[#1B3A2D] sm:text-5xl lg:text-[3.5rem] xl:text-[3.9rem]">
              <span className="block font-normal">Votre beauté,</span>
              <span className="block font-normal italic text-[#B58A4A]">notre priorité.</span>
            </h1>

            {/* Subtitle */}
            <p className="mt-5 max-w-md text-sm leading-relaxed text-[#5A4B3E] sm:text-base">
              Découvrez des produits soigneusement sélectionnés pour sublimer votre éclat naturel chaque jour.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5 sm:gap-4">
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
                className="inline-flex items-center gap-2 rounded-xl border border-[#2B2620]/20 bg-[#F5EFE6]/90 px-5 py-3.5 text-xs font-semibold text-[#2B2620] shadow-sm transition hover:bg-white sm:text-sm"
              >
                <MessageCircle size={16} className="text-[#B58A4A]" aria-hidden="true" />
                Commander sur WhatsApp
              </a>
            </div>

            {/* Mini Trust Badges */}
            <div className="mt-9 flex flex-wrap items-center gap-6 pt-2 text-xs sm:gap-8">
              <div className="flex items-center gap-3">
                <Truck size={22} strokeWidth={1.5} className="shrink-0 text-[#B58A4A]" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-[#2B2620]">Livraison rapide</p>
                  <p className="text-[#7A6A5A]">Partout au Sénégal &amp; au Niger</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MapPin size={22} strokeWidth={1.5} className="shrink-0 text-[#B58A4A]" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-[#2B2620]">Expédié depuis</p>
                  <p className="text-[#7A6A5A]">Dakar • Niamey</p>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Overlapping Rounded Dark Forest Green Trust Bar */}
        <div className="relative z-30 -mt-10 sm:-mt-12 lg:-mt-14 mb-4">
          <div className="rounded-2xl sm:rounded-3xl bg-[#14261F] px-6 py-6 sm:px-8 sm:py-7 text-white shadow-2xl">
            <div className="grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-6">
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

      </div>
    </section>
  );
}
