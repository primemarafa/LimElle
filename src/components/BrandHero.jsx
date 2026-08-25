import { ArrowRight, Gem, Handbag, MapPin, MessageCircle, Scissors, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LIMELLE_CONFIG, WA_MESSAGES } from "../config/limelle";

const categories = [
  ["Tissus", "Wax & bazin", Scissors],
  ["Lèche", "Voiles brodés", Sparkles],
  ["Bijoux", "Pièces choisies", Gem],
  ["Chaussures", "Sorties & cérémonies", Scissors],
  ["Sacs à main", "Sacs & pochettes", Handbag],
];

export default function BrandHero({ onCatalogue }) {
  const whatsappUrl = `https://wa.me/${LIMELLE_CONFIG.whatsappNumber}?text=${encodeURIComponent(WA_MESSAGES.general)}`;

  return (
    <section aria-label="Bienvenue chez Lim'Elle" className="relative isolate overflow-hidden bg-[#241F1A]">
      <div className="absolute inset-0">
        <img src="/images/hero-portrait.jpg" alt="Sélection mode et accessoires Lim'Elle" className="h-full min-h-[680px] w-full object-cover object-center" loading="eager" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(24,19,15,.96)_0%,rgba(24,19,15,.72)_43%,rgba(24,19,15,.12)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(24,19,15,.92)_0%,transparent_42%)]" />
      </div>

      <div className="relative mx-auto flex min-h-[680px] max-w-7xl items-center px-5 pb-36 pt-28 md:px-10 md:pb-40 lg:px-12">
        <div className="max-w-2xl text-white">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[.2em] text-[#E9D4B0] backdrop-blur-md">Sélection mode · Dakar → Niamey</div>
          <h1 className="font-serif text-5xl font-medium leading-[.98] tracking-[-.03em] md:text-7xl lg:text-[82px]">Ton style.<br /><em className="font-normal text-[#D9B57B]">Notre sélection.</em></h1>
          <p className="mt-7 max-w-xl text-base leading-7 text-white/78 md:text-lg">Tissus, lèche, bijoux, chaussures et sacs à main choisis à Dakar pour tes tenues du quotidien et tes cérémonies.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button variant="green" size="lg" onClick={onCatalogue} className="h-12 rounded-full bg-[#B8753C] px-6 font-semibold text-white shadow-lg shadow-black/15 hover:bg-[#A76632]">Voir la sélection <ArrowRight size={17} /></Button>
            <Button variant="outline" size="lg" asChild className="h-12 rounded-full border-white/35 bg-white/10 px-6 text-white backdrop-blur-sm hover:bg-white hover:text-[#241F1A]"><a href={whatsappUrl} target="_blank" rel="noopener noreferrer"><MessageCircle size={17} /> Nous écrire</a></Button>
          </div>
          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-xs text-white/65"><span className="inline-flex items-center gap-2"><MapPin size={14} /> Dakar → Niamey</span><span>Disponibilité vérifiée avant confirmation</span><span>Prix final confirmé avant paiement</span></div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 bg-[#211B17]/88 backdrop-blur-xl">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-white/10 md:grid-cols-5">
          {categories.map(([title, description, Icon]) => (
            <button key={title} type="button" onClick={onCatalogue} className="group flex items-center gap-3 px-4 py-4 text-left transition-colors hover:bg-white/5 md:px-5 md:py-5">
              <Icon size={17} className="shrink-0 text-[#D9B57B]" strokeWidth={1.5} />
              <span><strong className="block text-xs font-semibold text-white">{title}</strong><span className="mt-0.5 block text-[10px] text-white/50">{description}</span></span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
