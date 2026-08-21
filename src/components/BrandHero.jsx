import { Truck, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function BrandHero({ onCatalogue }) {
  return (
    <section
      aria-label="Bienvenue"
      className="relative overflow-hidden bg-gradient-to-br from-[#EDE4D4] via-[#E8DCC8] to-[#DDD0BA]"
    >
      <div className="mx-auto grid min-h-[480px] max-w-7xl items-center md:grid-cols-2 md:min-h-[560px] lg:min-h-[600px]">
        {/* Text */}
        <div className="relative z-10 flex flex-col gap-6 px-6 py-16 md:px-12 md:py-0">
          <h1 className="text-4xl font-medium leading-[1.1] tracking-tight text-[#2D2924] md:text-5xl lg:text-[3.4rem]">
            <span className="block font-serif italic text-[#A0845C]">Votre beauté,</span>
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
              <strong className="text-[#2D2924]">Livraison rapide</strong>
              Partout au Sénégal &amp; au Niger
            </span>
            <span className="flex items-center gap-1.5" aria-label="Expédié depuis Dakar et Niamey">
              <span aria-hidden="true">📍</span>
              <strong className="text-[#2D2924]">Expédié depuis</strong>
              Dakar · Niamey
            </span>
          </div>
        </div>

        {/* Portrait */}
        <div className="relative hidden h-full md:block">
          <img
            src="https://images.unsplash.com/photo-1611545579027-7bab82dba96b?q=80&w=800&auto=format&fit=crop"
            alt="Femme africaine sublimée par les produits Lim'Elle"
            className="h-full w-full object-cover"
            loading="eager"
          />
          {/* Floating tag */}
          <div
            className={cn(
              "absolute bottom-8 right-8 rounded-xl bg-white/90 px-5 py-3",
              "shadow-lg backdrop-blur-sm"
            )}
          >
            <p className="text-xs font-medium italic text-[#A0845C]">
              L'élégance au féminin,<br />naturellement.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
