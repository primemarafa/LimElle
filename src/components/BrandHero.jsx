import { Truck, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function BrandHero({ onCatalogue }) {
  return (
    <section
      aria-label="Bienvenue"
      className="relative min-h-[520px] overflow-hidden md:min-h-[600px] lg:min-h-[650px]"
    >
      {/* Full-width background image */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-portrait.jpg"
          alt=""
          className="h-full w-full object-cover object-center"
          loading="eager"
          aria-hidden="true"
        />
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#F8F4EC]/80 via-[#F8F4EC]/40 to-transparent" />
      </div>

      {/* Content overlay */}
      <div className="relative z-10 mx-auto flex min-h-[520px] max-w-7xl items-center px-6 py-16 md:min-h-[600px] md:px-12 lg:min-h-[650px]">
        <div className="flex max-w-xl flex-col gap-6">
          <h1 className="text-4xl font-medium leading-[1.1] tracking-tight text-[#2B2620] md:text-5xl lg:text-[3.4rem]">
            <span className="block font-serif italic text-[#B58A4A]">Votre beauté,</span>
            <span className="block font-serif">notre priorité.</span>
          </h1>
          <p className="max-w-md text-[15px] leading-relaxed text-[#6A5A4A]">
            Découvrez des produits soigneusement sélectionnés pour sublimer votre éclat naturel chaque jour.
          </p>

          {/* CTA */}
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

          {/* Shipping info */}
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

        {/* Floating tag on the right side */}
        <div
          className={cn(
            "absolute bottom-8 right-8 rounded-xl bg-white/90 px-5 py-3",
            "shadow-lg backdrop-blur-sm hidden md:block"
          )}
        >
          <p className="text-xs font-medium italic text-[#B58A4A]">
            L'élégance au féminin,<br />naturellement.
          </p>
        </div>
      </div>
    </section>
  );
}
