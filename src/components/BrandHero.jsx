import { ArrowRight } from "lucide-react";
import WhatsAppButton from "./WhatsAppButton";

const HERO_IMAGE = "/images/hero-portrait.jpg";

export default function BrandHero({ onCatalogue }) {
  return (
    <section className="relative overflow-hidden bg-[#f7f2ea]">
      <div className="relative min-h-[520px] md:min-h-[640px]">
        <img
          src={HERO_IMAGE}
          alt="Portrait éditorial Lim'Elle"
          className="absolute inset-0 h-full w-full object-cover object-center"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-[#1B1712]/80 via-[#1B1712]/50 to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[520px] md:min-h-[640px] max-w-7xl items-center justify-end px-6 py-16 sm:px-10 lg:px-16">
          <div className="max-w-xl text-right">
            <p className="text-xs font-bold uppercase tracking-[.22em] text-[#f3d5ad]">Nouvelle collection</p>
            <h1 className="mt-5 text-4xl leading-[1.1] tracking-[-.04em] text-white sm:text-5xl md:text-6xl">
              La beauté naturelle au service de la femme africaine.
            </h1>
            <p className="ml-auto mt-5 max-w-md text-base leading-7 text-white/80 sm:text-lg">
              Découvrez nos sélections de produits soigneusement élaborés pour sublimer votre beauté naturelle.
            </p>

            <div className="mt-8 flex flex-col-reverse justify-end gap-3 sm:flex-row">
              <WhatsAppButton
                message="Bonjour Lim'Elle 🌸\nJe souhaite passer commande."
                className="rounded-lg border border-white/30 bg-white/10 px-6 py-3.5 text-white backdrop-blur-sm"
                iconSize={18}
              >
                Commander sur WhatsApp
              </WhatsAppButton>
              <button
                onClick={onCatalogue}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#173F34] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#1e4d3f]"
              >
                Découvrir la boutique
                <ArrowRight size={16} />
              </button>
            </div>

            <div className="mt-6 flex flex-wrap justify-end gap-2 text-[11px] font-semibold uppercase tracking-[.12em] text-white/80">
              <span className="rounded-full border border-white/20 bg-white/10 px-3 py-2">Ingrédients naturels</span>
              <span className="rounded-full border border-white/20 bg-white/10 px-3 py-2">Qualité premium</span>
              <span className="rounded-full border border-white/20 bg-white/10 px-3 py-2">Expédié depuis Dakar</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
