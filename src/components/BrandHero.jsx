import { Truck, MapPin } from "lucide-react";
import WhatsAppButton from "./WhatsAppButton";

const HERO_IMAGE = "/images/hero-portrait.jpg";

export default function BrandHero({ onCatalogue }) {
  return (
    <section className="relative overflow-hidden">
      <div className="relative flex min-h-[640px] items-center md:min-h-[720px]">
        <img src={HERO_IMAGE} alt="Portrait éditorial Lim'Elle" className="absolute inset-0 h-full w-full object-cover object-[65%_20%]" loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#12241f]/70 via-[#12241f]/45 to-[#12241f]/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1a16]/60 via-transparent to-transparent" />

        <div className="relative mx-auto flex w-full max-w-7xl justify-end px-6 py-16 sm:px-10 md:px-14 lg:px-20">
          <div className="max-w-xl text-right">
            <p className="mb-5 text-xs font-bold uppercase tracking-[.22em] text-[#F4D8B5]">Éclat naturel, style durable</p>
            <h1 className="font-serif text-5xl leading-[.92] tracking-[-.05em] text-white sm:text-6xl lg:text-[4.6rem]">
              La mode qui
              <span className="block text-[#F4D8B5]">met en valeur</span>
              <span className="block">votre présence.</span>
            </h1>
            <p className="ml-auto mt-7 max-w-md text-base leading-7 text-white/85 sm:text-lg">
              Des pièces sélectionnées à Dakar, avec une touche contemporaine et une commande simple, claire et rassurante avant paiement.
            </p>
            <div className="mt-8 flex flex-col-reverse justify-end gap-3 sm:flex-row">
              <WhatsAppButton message="Bonjour Lim'Elle 🌸\nJe souhaite passer commande." className="border border-white/30 bg-white/10 text-white backdrop-blur-sm">
                Commander sur WhatsApp
              </WhatsAppButton>
              <button onClick={onCatalogue} className="inline-flex items-center justify-center rounded-2xl bg-[#B8753C] px-7 py-4 text-sm font-bold text-white shadow-[0_18px_30px_rgba(0,0,0,0.25)] transition hover:-translate-y-0.5 hover:bg-[#a6672f]">
                Découvrir la boutique <span className="ml-3">→</span>
              </button>
            </div>
            <div className="mt-6 flex flex-wrap justify-end gap-2 text-[11px] font-semibold uppercase tracking-[.12em] text-white">
              <span className="rounded-full border border-white/25 bg-white/10 px-3 py-2 backdrop-blur-sm">Prix confirmés avant paiement</span>
              <span className="rounded-full border border-white/25 bg-white/10 px-3 py-2 backdrop-blur-sm">Dakar → Niamey</span>
            </div>
            <div className="mt-9 ml-auto grid max-w-md grid-cols-2 gap-3 text-xs text-white">
              <div className="flex gap-3 rounded-2xl border border-white/20 bg-white/10 p-3 text-left backdrop-blur-sm"><Truck size={20} strokeWidth={1.75} className="shrink-0 text-[#F4D8B5]" /><div><strong className="block">Livraison rapide</strong><span className="text-white/80">Partout au Sénégal & au Niger</span></div></div>
              <div className="flex gap-3 rounded-2xl border border-white/20 bg-white/10 p-3 text-left backdrop-blur-sm"><MapPin size={20} strokeWidth={1.75} className="shrink-0 text-[#F4D8B5]" /><div><strong className="block">Expédié depuis</strong><span className="text-white/80">Dakar · Niamey</span></div></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
