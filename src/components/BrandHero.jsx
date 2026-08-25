import { ArrowRight, MapPin, MessageCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LIMELLE_CONFIG, WA_MESSAGES } from "../config/limelle";

export default function BrandHero({ onCatalogue }) {
  const whatsappUrl = `https://wa.me/${LIMELLE_CONFIG.whatsappNumber}?text=${encodeURIComponent(WA_MESSAGES.general)}`;

  return (
    <section aria-label="Bienvenue chez Lim'Elle" className="relative isolate min-h-[650px] overflow-hidden bg-[#2B2620] lg:min-h-[720px]">
      <img src="/images/hero-portrait.jpg" alt="Sélection mode et accessoires Lim'Elle" className="absolute inset-0 h-full w-full object-cover object-center" loading="eager" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#1B1712]/90 via-[#1B1712]/55 to-[#1B1712]/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1B1712]/75 via-transparent to-transparent" />
      <div className="relative mx-auto flex min-h-[650px] max-w-7xl items-center px-5 py-24 md:px-10 lg:min-h-[720px] lg:px-12">
        <div className="max-w-2xl text-white">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[.18em] text-[#E8D5B3] backdrop-blur-sm"><Sparkles size={14} /> Mode &amp; accessoires</div>
          <h1 className="font-serif text-5xl font-medium leading-[1.02] tracking-tight md:text-6xl lg:text-7xl">Ton style.<br /><span className="italic text-[#D5B27A]">Notre sélection.</span></h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-white/80 md:text-lg">Tissus, lèche, bijoux, chaussures et sacs à main sélectionnés à Dakar pour tes tenues du quotidien et tes cérémonies.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="green" size="lg" onClick={onCatalogue} className="gap-2 bg-[#B8753C] hover:bg-[#A56632]">Voir la sélection <ArrowRight size={17} /></Button>
            <Button variant="outline" size="lg" asChild className="border-white/40 bg-white/10 text-white hover:bg-white hover:text-[#2B2620]"><a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="gap-2"><MessageCircle size={17} /> Nous écrire</a></Button>
          </div>
          <div className="mt-8 flex flex-wrap gap-x-7 gap-y-3 text-sm text-white/75"><span className="inline-flex items-center gap-2"><MapPin size={15} /> Dakar → Niamey</span><span>Prix final confirmé avant paiement</span></div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 bg-[#1B3A2D]/90 backdrop-blur-md">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-5 py-5 text-center md:grid-cols-4 md:py-6">
          {[['Tissus','Wax & bazin'],['Lèche','Voiles brodés'],['Bijoux','Détails choisis'],['Accessoires','Chaussures & sacs']].map(([title, description]) => <div key={title}><p className="text-sm font-semibold text-white">{title}</p><p className="mt-1 text-xs text-white/60">{description}</p></div>)}
        </div>
      </div>
    </section>
  );
}
