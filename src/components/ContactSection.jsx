import { MessageCircle, Mail, MapPin, Clock } from "lucide-react";
import { LIMELLE_CONFIG, WA_MESSAGES } from "@/config/limelle";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function ContactSection() {
  const revealRef = useScrollReveal();

  return (
    <section id="contact" aria-label="Contactez Lim'Elle" className="bg-[#FAFAF9] dark:bg-[#0F0E0D] px-5 py-20 md:py-28 scroll-mt-20 transition-colors duration-400">
      <div className="mx-auto max-w-5xl" ref={revealRef}>

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto reveal">
          <p className="text-[11px] font-semibold uppercase tracking-[.28em] text-[#A16207]">Conciergerie & Écoute</p>
          <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-[#1C1917] dark:text-[#FAFAF9] md:text-[2.5rem]">
            Contactez Notre Équipe
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#57534E] dark:text-[#A8A29E]">
            Une question sur un article, un conseil personnalisé ou un suivi de livraison ? Nous sommes directement à votre écoute.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="mt-14 grid gap-6 md:grid-cols-2 reveal-stagger">

          {/* WhatsApp Direct Card */}
          <a
            href={`https://wa.me/${LIMELLE_CONFIG.whatsappNumber}?text=${encodeURIComponent(WA_MESSAGES.general)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="reveal group flex flex-col justify-between rounded-[1.5rem] border border-[#E7E5E4] dark:border-[#292524] bg-white dark:bg-[#1C1917] p-8 shadow-sm transition-all duration-300 hover:border-[#25D366] hover:shadow-xl hover:-translate-y-1 cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#25D366]/12 text-[#25D366] transition-all duration-300 group-hover:bg-[#25D366] group-hover:text-white">
                  <MessageCircle size={26} />
                </div>
                <span className="inline-block rounded-full bg-emerald-100 dark:bg-emerald-950/50 px-3 py-1 text-[11px] font-bold text-emerald-800 dark:text-emerald-300">
                  Réponse directe en direct
                </span>
              </div>
              <h3 className="mt-6 font-serif text-2xl font-semibold text-[#1C1917] dark:text-[#FAFAF9]">
                WhatsApp Conciergerie
              </h3>
              <p className="mt-2 text-xs text-[#57534E] dark:text-[#A8A29E] leading-relaxed">
                Échangez directement avec nos conseillères style 7j/7. Photos réelles, vérification des tailles et disponibilité en direct des marchés de Dakar.
              </p>
            </div>
            <div className="mt-8 pt-5 border-t border-[#E7E5E4]/60 dark:border-[#292524]/60 flex items-center justify-between">
              <span className="font-mono text-sm font-bold text-[#1C1917] dark:text-[#FAFAF9] group-hover:text-[#25D366]">
                +{LIMELLE_CONFIG.whatsappNumber}
              </span>
              <span className="text-xs font-semibold text-[#25D366] group-hover:translate-x-1 transition-transform">
                Ouvrir la discussion →
              </span>
            </div>
          </a>

          {/* Email Support Card */}
          <a
            href={`mailto:${LIMELLE_CONFIG.email}`}
            className="reveal group flex flex-col justify-between rounded-[1.5rem] border border-[#E7E5E4] dark:border-[#292524] bg-white dark:bg-[#1C1917] p-8 shadow-sm transition-all duration-300 hover:border-[#A16207] hover:shadow-xl hover:-translate-y-1 cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#A16207]/12 text-[#A16207] transition-all duration-300 group-hover:bg-[#A16207] group-hover:text-white">
                  <Mail size={26} />
                </div>
                <span className="inline-block rounded-full bg-amber-100 dark:bg-amber-950/50 px-3 py-1 text-[11px] font-bold text-amber-800 dark:text-amber-300">
                  Partenariats & Facturation
                </span>
              </div>
              <h3 className="mt-6 font-serif text-2xl font-semibold text-[#1C1917] dark:text-[#FAFAF9]">
                Courrier Électronique
              </h3>
              <p className="mt-2 text-xs text-[#57534E] dark:text-[#A8A29E] leading-relaxed">
                Pour toute demande formelle, commande de gros pour cérémonies, suivi de factures ou partenariats avec nos ateliers.
              </p>
            </div>
            <div className="mt-8 pt-5 border-t border-[#E7E5E4]/60 dark:border-[#292524]/60 flex items-center justify-between">
              <span className="text-sm font-bold text-[#1C1917] dark:text-[#FAFAF9] group-hover:text-[#A16207]">
                {LIMELLE_CONFIG.email}
              </span>
              <span className="text-xs font-semibold text-[#A16207] group-hover:translate-x-1 transition-transform">
                Nous écrire →
              </span>
            </div>
          </a>

        </div>

        {/* Reassurance Bar (Hours & Shipping) */}
        <div className="mt-8 reveal rounded-[1.5rem] border border-[#E7E5E4] dark:border-[#292524] bg-[#F5F3EF] dark:bg-[#161412] p-6 text-xs text-[#57534E] dark:text-[#A8A29E]">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="flex items-start gap-3.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#A16207]/10 text-[#A16207]">
                <MapPin size={18} />
              </div>
              <div>
                <p className="font-semibold text-sm text-[#1C1917] dark:text-[#FAFAF9]">Axe Dakar (Sénégal) ➔ Niamey (Niger)</p>
                <p className="mt-0.5 text-xs text-[#78716C] dark:text-[#A8A29E]">Fret GP aérien sécurisé & livraison express à domicile.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#A16207]/10 text-[#A16207]">
                <Clock size={18} />
              </div>
              <div>
                <p className="font-semibold text-sm text-[#1C1917] dark:text-[#FAFAF9]">Disponibilité 7j / 7</p>
                <p className="mt-0.5 text-xs text-[#78716C] dark:text-[#A8A29E]">Lundi au Samedi : 08h–20h | Dimanche : 10h–18h.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
