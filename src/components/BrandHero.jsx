import { Truck, MapPin } from "lucide-react";
import WhatsAppButton from "./WhatsAppButton";

const HERO_IMAGE = "/images/hero-portrait.jpg";

export default function BrandHero({ onCatalogue }) {
  return (
    <section className="bg-[#FAF5EE]">
      <div className="mx-auto grid max-w-7xl items-stretch md:grid-cols-[.9fr_1.1fr]">
        <div className="flex min-h-[560px] flex-col justify-center px-6 py-14 sm:px-10 md:px-14 lg:px-20">
          <p className="mb-5 text-xs font-bold uppercase tracking-[.22em] text-[#96654C]">L'élégance au féminin</p>
          <h1 className="max-w-xl font-serif text-5xl leading-[.98] tracking-[-.04em] text-[#3A2E28] sm:text-6xl lg:text-[5.1rem]">
            Votre beauté,
            <span className="block text-[#96654C]">notre priorité.</span>
          </h1>
          <p className="mt-7 max-w-md text-base leading-7 text-[#4A3D35] sm:text-lg">
            Découvrez des produits soigneusement sélectionnés pour sublimer votre éclat naturel chaque jour.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button onClick={onCatalogue} className="inline-flex items-center justify-center rounded-xl bg-[#3A2E28] px-7 py-4 text-sm font-bold text-white transition hover:-translate-y-0.5">
              Découvrir la boutique <span className="ml-3">→</span>
            </button>
            <WhatsAppButton message="Bonjour Lim'Elle 🌸\nJe souhaite passer commande." className="border border-[#3A2E28] bg-transparent px-7 text-[#3A2E28]">
              Commander sur WhatsApp
            </WhatsAppButton>
          </div>
          <div className="mt-9 grid max-w-md grid-cols-2 gap-5 text-xs text-[#4A3D35]">
            <div className="flex gap-3"><Truck size={20} strokeWidth={1.75} className="shrink-0 text-[#96654C]" /><div><strong className="block">Livraison rapide</strong><span>Partout au Sénégal & au Niger</span></div></div>
            <div className="flex gap-3"><MapPin size={20} strokeWidth={1.75} className="shrink-0 text-[#96654C]" /><div><strong className="block">Expédié depuis</strong><span>Dakar · Niamey</span></div></div>
          </div>
        </div>
        <div className="relative min-h-[520px] overflow-hidden md:min-h-[640px]">
          <img src={HERO_IMAGE} alt="Portrait éditorial Lim'Elle" className="absolute inset-0 h-full w-full object-cover object-[50%_20%]" loading="eager" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#FAF5EE_0%,transparent_14%)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#3A2E28]/25 via-transparent to-transparent" />
          <div className="absolute right-8 top-12 flex h-32 w-32 items-center justify-center rounded-full border border-[#96654C]/70 bg-[#FAF5EE]/10 p-5 text-center font-serif text-lg leading-6 text-white backdrop-blur-[2px] sm:right-12">
            L'élégance
            <br />au féminin,
            <br />naturellement.
          </div>
        </div>
      </div>
    </section>
  );
}
