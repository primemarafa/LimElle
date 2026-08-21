import { Leaf, Award, Truck, HeartHandshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
      className="relative min-h-[540px] overflow-hidden pb-[100px] md:min-h-[620px] md:pb-[110px] lg:min-h-[680px]"
    >
      {/* Full-width background image */}
      <img
        src="/images/hero-portrait.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-center"
        loading="eager"
        aria-hidden="true"
      />

      {/* Content overlay */}
      <div className="relative z-10 mx-auto flex min-h-[540px] max-w-7xl items-center px-6 py-20 md:min-h-[620px] md:px-12 lg:min-h-[680px]">
        {/* Text panel with subtle background */}
        <div className="flex max-w-xl flex-col gap-6 rounded-2xl bg-[#F8F4EC]/85 p-8 backdrop-blur-sm md:bg-[#F8F4EC]/70 md:backdrop-blur-none">
          <h1 className="text-4xl font-medium leading-[1.1] tracking-tight text-[#2B2620] md:text-5xl lg:text-[3.4rem]">
            <span className="block font-serif italic text-[#B58A4A]">Votre beauté,</span>
            <span className="block font-serif">notre priorité.</span>
          </h1>
          <p className="max-w-md text-[15px] leading-relaxed text-[#6A5A4A]">
            Découvrez des produits soigneusement sélectionnés pour sublimer votre éclat naturel chaque jour.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Button variant="green" size="lg" onClick={onCatalogue}>
              Découvrir la boutique <span aria-hidden="true">→</span>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a
                href="https://wa.me/22796000000?text=Bonjour%2C%20je%20viens%20du%20site%20Lim%27Elle%20%F0%9F%8C%B8"
                target="_blank"
                rel="noopener noreferrer"
                className="border-[#1B3A2D]/20 text-[#1B3A2D] hover:bg-[#1B3A2D] hover:text-white"
              >
                Commander sur WhatsApp
              </a>
            </Button>
          </div>

          <div className="flex flex-wrap gap-5 text-xs text-[#6A5A4A]">
            <span className="flex items-center gap-1.5" aria-label="Livraison rapide">
              <span aria-hidden="true">🚚</span>
              <strong className="text-[#2B2620]">Livraison rapide</strong>
              Partout au Sénégal &amp; au Niger
            </span>
            <span className="flex items-center gap-1.5" aria-label="Expédié depuis Dakar et Niamey">
              <span aria-hidden="true">📍</span>
              <strong className="text-[#2B2620]">Expédié depuis</strong>
              Dakar · Niamey
            </span>
          </div>
        </div>

        {/* Floating tag */}
        <div
          className={cn(
            "absolute bottom-24 right-8 rounded-xl bg-white/90 px-5 py-3",
            "shadow-lg backdrop-blur-sm hidden md:block"
          )}
        >
          <p className="text-xs font-medium italic text-[#B58A4A]">
            L'élégance au féminin,<br />naturellement.
          </p>
        </div>
      </div>

      {/* Trust strip — glued to bottom of hero */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-[#1B3A2D]">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-5 py-6 md:grid-cols-4 md:gap-6 md:py-8">
          {TRUST_FEATURES.map(({ icon: Icon, label, description }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-2 text-center"
            >
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-[#C8B99A]"
                aria-hidden="true"
              >
                <Icon size={20} strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{label}</p>
                <p className="mt-0.5 text-xs text-white/70">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
