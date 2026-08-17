import { Truck, MapPin } from "lucide-react";
import WhatsAppButton from "./WhatsAppButton";

const HERO_IMAGE = "/images/hero-portrait.jpg";

export default function BrandHero({ onCatalogue }) {
  return (
    <section className="bg-[#F8F3EA]">
      <div className="mx-auto grid max-w-7xl items-stretch md:min-h-[680px] md:grid-cols-[.85fr_1.15fr]">
        <div className="flex flex-col justify-center px-6 py-14 sm:px-10 md:px-14 lg:px-20">
          <p className="mb-5 text-xs font-bold uppercase tracking-[.22em] text-[#B8753C]">L'élégance au féminin</p>
          <h1 className="max-w-xl font-serif text-5xl leading-[.98] tracking-[-.04em] text-[#173F34] sm:text-6xl lg:text-[5.1rem]">
            Votre beauté,
            <span className="block text-[#B8753C]">notre priorité.</span>
          </h1>
          <p className="mt-7 max-w-md text-base leading-7 text-[#403A33] sm:text-lg">
            Découvrez des produits soigneusement sélectionnés pour sublimer votre éclat naturel chaque jour.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button onClick={onCatalogue} className="inline-flex items-center justify-center rounded-xl bg-[#173F34] px-7 py-4 text-sm font-bold text-white transition hover:-translate-y-0.5">
              Découvrir la boutique <span className="ml-3">→</span>
            </button>
            <WhatsAppButton message="Bonjour Lim'Elle 🌸\nJe souhaite passer commande." className="border border-[#173F34] bg-transparent px-7 text-[#173F34]">
              Commander sur WhatsApp
            </WhatsAppButton>
          </div>
          <div className="mt-9 grid max-w-md grid-cols-2 gap-5 text-xs text-[#403A33]">
            <div className="flex gap-3"><Truck size={20} strokeWidth={1.75} className="shrink-0 text-[#B8753C]" /><div><strong className="block">Livraison rapide</strong><span>Partout au Sénégal & au Niger</span></div></div>
            <div className="flex gap-3"><MapPin size={20} strokeWidth={1.75} className="shrink-0 text-[#B8753C]" /><div><strong className="block">Expédié depuis</strong><span>Dakar · Niamey</span></div></div>
          </div>
        </div>
        <div className="relative min-h-[420px] overflow-hidden md:min-h-0">
          <img src={HERO_IMAGE} alt="Portrait éditorial Lim'Elle" className="absolute inset-0 h-full w-full object-cover object-[50%_20%]" loading="eager" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#F8F3EA_0%,transparent_14%)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#173F34]/25 via-transparent to-transparent" />
          <div className="absolute right-6 top-8 flex h-24 w-24 items-center justify-center rounded-full border border-[#B8753C]/50 bg-[#173F34]/25 p-4 text-center font-serif text-[13px] leading-4 text-white/90 backdrop-blur-sm sm:right-10 sm:top-10 sm:h-28 sm:w-28 sm:text-sm sm:leading-5">
            L'élégance
            <br />au féminin,
            <br />naturellement.
          </div>
        </div>
      </div>
    </section>
  );
}
