import { ArrowRight, Sparkles, Droplets, Sun, Moon } from "lucide-react";

const STEPS = [
  {
    step: "01",
    title: "Nettoyer & Clarifier",
    productName: "Savon Clarifiant à l'Hibiscus",
    description: "Élimine en douceur les impuretés et la pollution sans assécher, tout en unifiant le grain de peau dès la première application.",
    tip: "Matin & Soir sur peau humidifiée",
    badge: "Étape 1",
  },
  {
    step: "02",
    title: "Traiter & Éclairer",
    productName: "Sérum Éclat Naturel & Vitamine C",
    description: "Cible les taches pigmentaires, resserre les pores et illumine le teint grâce aux polyphénols et antioxydants sahéliens.",
    tip: "3 à 4 gouttes en tapotant délicatement",
    badge: "Étape 2",
  },
  {
    step: "03",
    title: "Nourrir & Sceller",
    productName: "Beurre Pur de Karité & Huile Précieuse",
    description: "Scelle l'hydratation, protège contre les agressions extérieures et laisse un toucher soyeux et un éclat satiné irrésistible.",
    tip: "Chauffer une noisette entre les paumes",
    badge: "Étape 3",
  },
];

export default function BeautyRitualSection({ onDiscover }) {
  return (
    <section aria-label="Rituel beauté Lim'Elle" className="bg-[#14261F] px-5 py-16 md:py-24 text-white">
      <div className="mx-auto max-w-7xl">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#C8B99A]/30 bg-white/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[.18em] text-[#C8B99A] backdrop-blur-xs">
            <Sparkles size={13} className="text-[#C8B99A]" />
            <span>Routine Quotidienne</span>
          </div>
          <h2 className="mt-4 font-serif text-3xl font-normal tracking-tight text-[#F8F4EC] md:text-4xl">
            Le Rituel Éclat en 3 Gestes
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#E8E0D4]">
            Une routine simple, hautement concentrée et spécialement pensée pour révéler l'éclat des peaux noires et métissées.
          </p>
        </div>

        {/* 3 Step Cards Grid */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {STEPS.map((item) => (
            <div
              key={item.step}
              className="relative flex flex-col justify-between rounded-3xl border border-white/15 bg-white/5 p-6 backdrop-blur-md transition-all duration-300 hover:border-[#C8B99A]/50 hover:bg-white/10"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-serif text-3xl font-light text-[#C8B99A]">{item.step}</span>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold text-[#C8B99A]">
                    {item.badge}
                  </span>
                </div>

                <h3 className="mt-4 font-serif text-xl font-medium text-white">
                  {item.title}
                </h3>
                <p className="mt-1 text-xs font-semibold text-[#C8B99A]">
                  {item.productName}
                </p>
                <p className="mt-3 text-xs leading-relaxed text-[#E8E0D4]/90">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 border-t border-white/10 pt-4 text-[11px] text-[#C8B99A]">
                💡 <span className="font-medium text-white/90">Conseil :</span> {item.tip}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={onDiscover}
            className="inline-flex items-center gap-2 rounded-xl bg-[#B58A4A] px-7 py-3.5 text-xs font-semibold text-white shadow-lg transition hover:bg-[#A37839] sm:text-sm"
          >
            Adopter la routine complète <ArrowRight size={16} aria-hidden="true" />
          </button>
        </div>

      </div>
    </section>
  );
}
