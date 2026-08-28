import { MessageCircle, Mail, MapPin, Clock, Send } from "lucide-react";
import { LIMELLE_CONFIG, WA_MESSAGES } from "@/config/limelle";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function ContactSection() {
  const revealRef = useScrollReveal();

  return (
    <section id="contact" aria-label="Contactez Lim'Elle" className="bg-[#FAFAF9] px-5 py-20 md:py-28 scroll-mt-20">
      <div className="mx-auto max-w-7xl" ref={revealRef}>

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto reveal">
          <p className="text-[11px] font-semibold uppercase tracking-[.28em] text-[#A16207]">Nous Écrire</p>
          <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-[#1C1917] md:text-[2.5rem]">
            Contact & Conciergerie Mode
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#57534E]">
            Une question sur un article, un conseil personnalisé ou un suivi de commande ? Notre équipe vous répond avec attention.
          </p>
        </div>

        {/* 2-Column */}
        <div className="mt-14 grid gap-8 lg:grid-cols-12">

          {/* Left Cards */}
          <div className="space-y-4 lg:col-span-5 reveal">
            {/* WhatsApp Card */}
            <a
              href={`https://wa.me/${LIMELLE_CONFIG.whatsappNumber}?text=${encodeURIComponent(WA_MESSAGES.general)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-4 rounded-[1.25rem] border border-[#E7E5E4] bg-white p-6 shadow-sm transition-all duration-300 hover:border-[#25D366] hover:shadow-lg hover:-translate-y-0.5"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#25D366]/12 text-[#25D366] transition-all duration-300 group-hover:bg-[#25D366] group-hover:text-white">
                <MessageCircle size={22} />
              </div>
              <div>
                <span className="inline-block rounded-lg bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                  Réponse Rapide (Direct)
                </span>
                <h3 className="mt-1.5 text-sm font-semibold text-[#1C1917]">Conseil & Commande WhatsApp</h3>
                <p className="mt-1 text-xs text-[#57534E]">
                  Discutez en direct avec nos conseillères style tous les jours de 8h à 20h.
                </p>
                <p className="mt-2 font-mono text-xs font-bold text-[#1C1917] underline group-hover:text-[#25D366]">
                  +{LIMELLE_CONFIG.whatsappNumber}
                </p>
              </div>
            </a>

            {/* Email Card */}
            <a
              href={`mailto:${LIMELLE_CONFIG.email}`}
              className="group flex items-start gap-4 rounded-[1.25rem] border border-[#E7E5E4] bg-white p-6 shadow-sm transition-all duration-300 hover:border-[#A16207] hover:shadow-lg hover:-translate-y-0.5"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#A16207]/12 text-[#A16207] transition-all duration-300 group-hover:bg-[#A16207] group-hover:text-white">
                <Mail size={22} />
              </div>
              <div>
                <span className="inline-block rounded-lg bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800">
                  Support Client & Partenariats
                </span>
                <h3 className="mt-1.5 text-sm font-semibold text-[#1C1917]">Courrier Électronique</h3>
                <p className="mt-1 text-xs text-[#57534E]">
                  Pour toute demande de collaboration, suivi de facture ou question générale.
                </p>
                <p className="mt-2 text-xs font-bold text-[#1C1917] underline group-hover:text-[#A16207]">
                  {LIMELLE_CONFIG.email}
                </p>
              </div>
            </a>

            {/* Location & Hours */}
            <div className="rounded-[1.25rem] border border-[#E7E5E4] bg-[#F5F3EF] p-6 text-xs text-[#57534E]">
              <div className="flex items-center gap-2 font-semibold text-[#1C1917]">
                <MapPin size={16} className="text-[#A16207]" />
                <span>Points d'expédition & Retrait</span>
              </div>
              <p className="mt-1.5 pl-6">Dakar (Sénégal) & Niamey (Niger) • Livraison express à domicile</p>

              <div className="mt-4 flex items-center gap-2 font-semibold text-[#1C1917]">
                <Clock size={16} className="text-[#A16207]" />
                <span>Horaires du Service Client</span>
              </div>
              <p className="mt-1.5 pl-6">Lundi au Samedi : 08h00 – 20h00 | Dimanche : 10h00 – 18h00</p>
            </div>
          </div>

          {/* Right: Message Form */}
          <div className="reveal rounded-[1.5rem] border border-[#E7E5E4] bg-white p-7 sm:p-9 shadow-sm lg:col-span-7">
            <h3 className="font-serif text-xl font-semibold text-[#1C1917]">
              Envoyez-nous un message
            </h3>
            <p className="mt-1.5 text-xs text-[#57534E]">
              Remplissez ce formulaire, nous vous répondrons sous 24h par email ou WhatsApp.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Merci pour votre message ! Notre équipe vous contactera très rapidement.");
              }}
              className="mt-7 space-y-5 text-sm"
            >
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="block font-medium text-[#1C1917] text-xs">Votre nom complet *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Awa Diallo"
                    className="mt-1.5 w-full rounded-xl border border-[#E7E5E4] bg-[#FAFAF9] p-3.5 text-sm text-[#1C1917] placeholder:text-[#A8A29E] focus:border-[#A16207] focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-medium text-[#1C1917] text-xs">Votre adresse email *</label>
                  <input
                    type="email"
                    required
                    placeholder="awa@exemple.com"
                    className="mt-1.5 w-full rounded-xl border border-[#E7E5E4] bg-[#FAFAF9] p-3.5 text-sm text-[#1C1917] placeholder:text-[#A8A29E] focus:border-[#A16207] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-[#1C1917] text-xs">Numéro de téléphone / WhatsApp</label>
                <input
                  type="tel"
                  placeholder="+227 90 00 00 00 ou +221 77 000 00 00"
                  className="mt-1.5 w-full rounded-xl border border-[#E7E5E4] bg-[#FAFAF9] p-3.5 text-sm text-[#1C1917] placeholder:text-[#A8A29E] focus:border-[#A16207] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block font-medium text-[#1C1917] text-xs">Votre message *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Bonjour, je souhaite commander un ensemble Bazin..."
                  className="mt-1.5 w-full rounded-xl border border-[#E7E5E4] bg-[#FAFAF9] p-3.5 text-sm text-[#1C1917] placeholder:text-[#A8A29E] focus:border-[#A16207] focus:outline-none transition-colors"
                />
              </div>

              <button
                type="submit"
                className="btn-shimmer inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#1C1917] py-4 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-[#0C0A09] hover:shadow-lg"
              >
                <Send size={15} /> Envoyer mon message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
