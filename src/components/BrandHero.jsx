import { Leaf, Award, Truck, HeartHandshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LIMELLE_CONFIG, WA_MESSAGES } from "@/config/limelle";

const TRUST_FEATURES = [
  { icon: Leaf, label: "Ingrédients naturels", description: "Sains et respectueux de votre peau" },
  { icon: Award, label: "Qualité premium", description: "Sélection rigoureuse des meilleurs produits" },
  { icon: Truck, label: "Livraison rapide", description: "Partout au Sénégal et au Niger" },
  { icon: HeartHandshake, label: "Service attentionné", description: "À votre écoute tous les jours" },
];

export default function BrandHero({ onCatalogue }) {
  return (
    <section
      aria-label="Bienvenue"
      className="relative min-h-[560px] overflow-hidden pb-[96px] md:min-h-[640px] md:pb-[100px] lg:min-h-[700px]"
    >
      {/* Full-width background image */}
      <img
        src="/images/hero-portrait.jpg"
        alt="Lim'Elle beauté"
        className="absolute inset-0 h-full w-full object-cover object-right md:object-center"
        loading="eager"
        aria-hidden="true"
      />

      {/* Content overlay */}
      <div className="relative z-10 mx-auto flex min-h-[560px] max-w-7xl items-center px-6 py-20 md:min-h-[640px] md:px-12 lg:min-h-[700px]">
        {/* Text panel with subtle background */}
        <div className="flex max-w-xl flex-col gap-6 rounded-3xl bg-[#F8F4EC]/90 p-8 shadow-sm backdrop-blur-md md:bg-[#F8F4EC]/80 md:p-10">
          <h1 className="text-4xl font-normal leading-[1.12] tracking-tight text-[#2B2620] md:text-5xl lg:text-[3.6rem]">
            <span className="block font-serif italic text-[#B58A4A]">Votre beauté,</span>
            <span className="block font-serif font-medium text-[#2B2620]">notre priorité.</span>
          </h1>
          <p className="max-w-md text-[15px] leading-relaxed text-[#6A5A4A]">
            Découvrez des produits soigneusement sélectionnés pour sublimer votre éclat naturel chaque jour.
          </p>

          <div className="flex flex-wrap items-center gap-3.5 pt-1">
            <Button
              variant="green"
              size="lg"
              onClick={onCatalogue}
              className="rounded-xl bg-[#1B3A2D] px-7 py-6 text-sm font-semibold text-white shadow-md hover:bg-[#142D24]"
            >
              Découvrir la boutique <span aria-hidden="true" className="ml-1">→</span>
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => window.open(`https://wa.me/${LIMELLE_CONFIG.whatsappNumber}?text=${encodeURIComponent(WA_MESSAGES.general)}`, "_blank", "noopener,noreferrer")}
              className="rounded-xl border border-[#2B2620]/30 bg-transparent px-6 py-6 text-sm font-semibold text-[#2B2620] hover:bg-[#2B2620]/5"
            >
              <span aria-hidden="true" className="mr-1">💬</span> Commander sur WhatsApp
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-[#6A5A4A]">
            <span className="flex items-center gap-2" aria-label="Livraison rapide">
              <Truck size={16} className="text-[#B58A4A]" />
              <span>
                <strong className="block font-semibold text-[#2B2620]">Livraison rapide</strong>
                Partout au Sénégal &amp; au Niger
              </span>
            </span>
            <span className="flex items-center gap-2" aria-label="Expédié depuis">
              <Award size={16} className="text-[#B58A4A]" />
              <span>
                <strong className="block font-semibold text-[#2B2620]">Expédié depuis</strong>
                Dakar · Niamey
              </span>
            </span>
          </div>
        </div>

        {/* Floating tag top right */}
        <div
          className={cn(
            "absolute top-20 right-10 rounded-2xl bg-[#221B14]/85 px-6 py-5",
            "shadow-xl backdrop-blur-md hidden lg:block border border-white/10 text-center"
          )}
        >
          <p className="font-serif text-sm font-light italic leading-snug text-[#F8F4EC]">
            L'élégance<br />
            au féminin,<br />
            <span className="text-[#C8B99A]">naturellement.</span>
          </p>
        </div>
      </div>

      {/* Trust strip — glued to bottom of hero */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-[#1B3A2D]">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-5 py-5 md:grid-cols-4 md:gap-6 md:py-6">
          {TRUST_FEATURES.map(({ icon: Icon, label, description }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-2 text-center"
            >
              <div
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-[#C8B99A]"
                aria-hidden="true"
              >
                <Icon size={18} strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-xs font-semibold text-white md:text-sm">{label}</p>
                <p className="mt-0.5 text-[11px] text-white/75">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
