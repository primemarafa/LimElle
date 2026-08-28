import { ArrowRight, Truck, MapPin, MessageCircle, Flower2 } from "lucide-react";
import { LIMELLE_CONFIG, WA_MESSAGES } from "@/config/limelle";

const TRUST_FEATURES = [
  {
    icon: Truck,
    label: "Fret GP Dakar ➔ Niamey",
    description: "Expédition sécurisée et livraison rapide",
  },
  {
    icon: MapPin,
    label: "Personal Shopping",
    description: "Service sur-mesure à votre écoute 7j/7",
  },
];

export default function BrandHero({ onCatalogue }) {
  return (
    <section aria-label="Bienvenue sur Lim'Elle" className="relative w-full overflow-hidden bg-[#F5F3EF] pt-6 sm:pt-10">
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="relative min-h-[520px] w-full overflow-hidden rounded-[2rem] sm:min-h-[580px] lg:min-h-[640px]">

          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src="/images/hero-portrait.jpg"
              alt="Femme élégante avec pagnes, bijoux et accessoires Lim'Elle"
              className="h-full w-full object-cover object-[70%_center] sm:object-[75%_center] lg:object-[85%_center]"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#F5F3EF] via-[#F5F3EF]/70 via-35% to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/8 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Floating Glass Tag (Top Right) */}
          <div className="absolute top-6 right-6 z-20 hidden rounded-2xl border border-white/20 bg-[#1C1917]/70 px-6 py-4 text-center shadow-2xl backdrop-blur-xl sm:block">
            <p className="font-serif text-sm font-light leading-snug text-[#FAFAF9]">
              L'élégance<br />
              au féminin,<br />
              <span className="italic text-[#D4A853]">Dakar ➔ Niamey.</span>
            </p>
            <div className="mt-2 flex justify-center text-[#A16207]" aria-hidden="true">
              <Flower2 size={14} strokeWidth={1.5} />
            </div>
          </div>

          {/* Left Hero Content */}
          <div className="relative z-10 flex min-h-[520px] max-w-xl flex-col justify-center py-12 pl-2 sm:min-h-[580px] sm:py-16 sm:pl-8 lg:min-h-[640px] lg:max-w-2xl lg:pl-10">

            <h1 className="animate-hero-up font-serif text-[2.75rem] leading-[1.08] tracking-tight text-[#1C1917] sm:text-5xl lg:text-[3.6rem] xl:text-[4.1rem]">
              <span className="block font-medium">L'élégance africaine,</span>
              <span className="block font-medium italic text-[#A16207]">de Dakar à Niamey.</span>
            </h1>

            <p className="animate-hero-up-delay-1 mt-6 max-w-md text-[15px] leading-relaxed text-[#44403C] sm:text-base">
              Pagnes &amp; Lèche nobles, chaussures d'exception, parures dorées et maroquinerie sélectionnés au Sénégal pour sublimer votre allure.
            </p>

            {/* Action Buttons */}
            <div className="animate-hero-up-delay-2 mt-9 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onCatalogue}
                className="btn-shimmer inline-flex items-center gap-2.5 rounded-2xl bg-[#1C1917] px-7 py-4 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:bg-[#0C0A09] hover:shadow-xl hover:-translate-y-0.5"
              >
                Découvrir la boutique <ArrowRight size={16} aria-hidden="true" />
              </button>

              <a
                href={`https://wa.me/${LIMELLE_CONFIG.whatsappNumber}?text=${encodeURIComponent(WA_MESSAGES.general)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-2xl border border-[#1C1917]/15 bg-white/80 px-6 py-4 text-sm font-semibold text-[#1C1917] shadow-sm backdrop-blur-sm transition-all duration-300 hover:bg-white hover:shadow-md hover:-translate-y-0.5"
              >
                <MessageCircle size={17} className="text-[#A16207]" aria-hidden="true" />
                Commander sur WhatsApp
              </a>
            </div>

            {/* Mini Trust Badges */}
            <div className="animate-hero-up-delay-3 mt-10 flex flex-wrap items-center gap-8 text-xs">
              {TRUST_FEATURES.map(({ icon: Icon, label, description }) => (
                <div key={label} className="flex items-center gap-3">
                  <Icon size={22} strokeWidth={1.5} className="shrink-0 text-[#A16207]" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-[#1C1917]">{label}</p>
                    <p className="text-[#78716C]">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trust Bar Glass */}
        <div className="relative z-30 -mt-10 sm:-mt-12 lg:-mt-14 mb-4">
          <div className="glass-dark rounded-[1.25rem] sm:rounded-[1.5rem] px-7 py-6 sm:px-9 sm:py-7 text-white shadow-2xl border border-white/10">
            <div className="grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-8">
              {[
                { icon: "✦", label: "Bazin & Pagnes Nobles", desc: "Getzner, Bazin Riche & Lèche authentique" },
                { icon: "✦", label: "Bijoux & Maroquinerie", desc: "Filigranes dorés et cuir d'atelier dakarois" },
                { icon: "✦", label: "Fret GP Dakar ➔ Niamey", desc: "Expédition sécurisée et livraison rapide" },
                { icon: "✦", label: "Personal Shopping", desc: "Service sur-mesure à votre écoute 7j/7" },
              ].map(({ label, desc }) => (
                <div key={label} className="flex items-start gap-3">
                  <span className="mt-0.5 text-[#D4A853] text-sm" aria-hidden="true">✦</span>
                  <div>
                    <p className="text-xs font-semibold text-white sm:text-sm">{label}</p>
                    <p className="mt-0.5 text-[11px] text-white/70">{desc}</p>
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
