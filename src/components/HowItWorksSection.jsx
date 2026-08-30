import { Compass, FileCheck, ShieldCheck, PlaneTakeoff } from "lucide-react";
import { STEPS } from "@/data/catalog";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const STEP_ICONS = [Compass, FileCheck, ShieldCheck, PlaneTakeoff];

export default function HowItWorksSection({ onExplore }) {
  const revealRef = useScrollReveal();

  return (
    <section
      id="comment-ca-marche"
      aria-label="Comment ça marche"
      className="bg-[#FAFAF9] dark:bg-[#12100E] px-5 py-20 md:py-28 transition-colors duration-500 border-t border-[#E7E5E4] dark:border-[#292524]"
    >
      <div className="mx-auto max-w-7xl" ref={revealRef}>
        <div className="text-center max-w-2xl mx-auto reveal">
          <p className="text-[11px] font-semibold uppercase tracking-[.28em] text-[#A16207]">
            Simple & Transparent
          </p>
          <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-[#1C1917] dark:text-[#FAFAF9] md:text-[2.5rem]">
            Comment ça marche ?
          </h2>
          <p className="mt-3 text-sm text-[#57534E] dark:text-[#A8A29E] leading-relaxed">
            De la sélection personnalisée dans les ateliers dakarois jusqu'à votre porte à Niamey.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 reveal-stagger">
          {STEPS.map((step, index) => {
            const Icon = STEP_ICONS[index] || Compass;
            return (
              <div
                key={step.key}
                className="reveal group relative flex flex-col justify-between rounded-[1.5rem] border border-[#E7E5E4] dark:border-[#292524] bg-white dark:bg-[#1C1917] p-7 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#A16207]/10 dark:bg-[#A16207]/20 text-[#A16207]">
                      <Icon size={22} strokeWidth={1.5} />
                    </div>
                    <span className="font-mono text-2xl font-bold text-[#E7E5E4] dark:text-[#292524] group-hover:text-[#A16207]/40 transition-colors">
                      {step.num}
                    </span>
                  </div>

                  <h3 className="mt-6 font-serif text-xl font-semibold text-[#1C1917] dark:text-[#FAFAF9]">
                    {step.title}
                  </h3>

                  <p className="mt-2.5 text-xs text-[#57534E] dark:text-[#A8A29E] leading-relaxed">
                    {step.text}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E7E5E4]/60 dark:border-[#292524]/60 flex items-center justify-between text-[11px] text-[#A16207] font-semibold">
                  <span>Étape {index + 1} / 4</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">✦</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
