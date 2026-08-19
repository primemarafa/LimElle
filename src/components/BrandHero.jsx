import { Truck, MapPin } from "lucide-react";
import WhatsAppButton from "./WhatsAppButton";

const HERO_IMAGE = "/images/hero-portrait.jpg";

export default function BrandHero({ onCatalogue }) {
  return (
    <section className="relative isolate overflow-hidden bg-[#f7f2ea]">
      <div className="relative min-h-[680px]">
        <img src={HERO_IMAGE} alt="Portrait éditorial Lim'Elle" className="absolute inset-0 h-full w-full object-cover object-[30%_20%]" loading="eager" />
        <div className="absolute inset-0 bg-[linear-gradient(270deg,rgba(7,18,16,0.72)_0%,rgba(7,18,16,0.5)_26%,rgba(7,18,16,0.18)_52%,rgba(7,18,16,0.12)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(184,117,60,0.25),transparent_28%)]" />

        <div className="relative z-10 mx-auto flex min-h-[680px] max-w-7xl items-center justify-end px-6 py-16 sm:px-10 lg:px-20">
          <div className="max-w-xl rounded-[2rem] border border-white/15 bg-[#173F34]/18 p-6 text-right shadow-[0_24px_60px_rgba(10,19,17,0.25)] backdrop-blur-[1px] sm:p-8">
            <p className="mb-5 text-xs font-bold uppercase tracking-[.22em] text-[#f3d5ad]">Éclat naturel, style durable</p>
            <h1 className="font-serif text-5xl leading-[.92] tracking-[-.05em] text-white sm:text-6xl lg:text-[5.1rem]">
              La mode qui
              <span className="block text-[#f3d5ad]">met en valeur</span>
              <span className="block">votre présence.</span>
            </h1>
            <p className="ml-auto mt-7 max-w-md text-base leading-7 text-white/85 sm:text-lg">
              Des pièces sélectionnées à Dakar, avec une touche contemporaine et une commande simple, claire et rassurante avant paiement.
            </p>
            <div className="mt-8 flex flex-col-reverse justify-end gap-3 sm:flex-row">
              <WhatsAppButton message="Bonjour Lim'Elle 🌸\nJe souhaite passer commande." className="border border-white/30 bg-white/10 px-7 text-white backdrop-blur-sm">
                Commander sur WhatsApp
              </WhatsAppButton>
              <button onClick={onCatalogue} className="inline-flex items-center justify-center rounded-2xl bg-[#B8753C] px-7 py-4 text-sm font-bold text-white shadow-[0_18px_30px_rgba(184,117,60,0.28)] transition hover:-translate-y-0.5 hover:bg-[#c8854a]">
                Découvrir la boutique <span className="ml-3">→</span>
              </button>
            </div>
            <div className="mt-6 flex flex-wrap justify-end gap-2 text-[11px] font-semibold uppercase tracking-[.12em] text-white/90">
              <span className="rounded-full border border-white/15 bg-white/10 px-3 py-2">Prix confirmés avant paiement</span>
              <span className="rounded-full border border-white/15 bg-white/10 px-3 py-2">Dakar → Niamey</span>
            </div>
            <div className="mt-9 ml-auto grid max-w-md grid-cols-2 gap-5 text-xs text-white/90">
              <div className="flex gap-3 rounded-2xl border border-white/15 bg-white/10 p-3 text-left"><Truck size={20} strokeWidth={1.75} className="shrink-0 text-[#f3d5ad]" /><div><strong className="block">Livraison rapide</strong><span>Partout au Sénégal & au Niger</span></div></div>
              <div className="flex gap-3 rounded-2xl border border-white/15 bg-white/10 p-3 text-left"><MapPin size={20} strokeWidth={1.75} className="shrink-0 text-[#f3d5ad]" /><div><strong className="block">Expédié depuis</strong><span>Dakar · Niamey</span></div></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
