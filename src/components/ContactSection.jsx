import { MessageCircle, Mail, MapPin, Clock, Send, Sparkles } from "lucide-react";
import { LIMELLE_CONFIG, WA_MESSAGES } from "@/config/limelle";

export default function ContactSection() {
  return (
    <section id="contact" aria-label="Contactez Lim'Elle" className="bg-[#F8F4EC] px-5 py-16 md:py-24 border-t border-[#E8E0D4] scroll-mt-20">
      <div className="mx-auto max-w-7xl">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[.24em] text-[#B58A4A]">Nous Écrire</p>
          <h2 className="mt-2.5 font-serif text-3xl font-normal tracking-tight text-[#2B2620] md:text-4xl">
            Contact &amp; Conciergerie Beauté
          </h2>
          <p className="mt-3.5 text-sm leading-relaxed text-[#6A5A4A]">
            Une question sur un produit, un conseil personnalisé ou un suivi de commande ? Notre équipe vous répond avec attention.
          </p>
        </div>

        {/* 2-Column Contact Cards & Info */}
        <div className="mt-12 grid gap-8 lg:grid-cols-12">
          
          {/* Left Cards: Channels */}
          <div className="space-y-4 lg:col-span-5">
            
            {/* WhatsApp Card */}
            <a
              href={`https://wa.me/${LIMELLE_CONFIG.whatsappNumber}?text=${encodeURIComponent(WA_MESSAGES.general)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-4 rounded-3xl border border-[#E8E0D4] bg-white p-6 shadow-xs transition hover:border-[#25D366] hover:shadow-md"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#25D366]/15 text-[#25D366] transition group-hover:bg-[#25D366] group-hover:text-white">
                <MessageCircle size={22} />
              </div>
              <div>
                <span className="inline-block rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                  Réponse Rapide (Direct)
                </span>
                <h3 className="mt-1 text-sm font-semibold text-[#2B2620]">Conseil &amp; Commande WhatsApp</h3>
                <p className="mt-1 text-xs text-[#6A5A4A]">
                  Discutez en direct avec nos conseillères beauté tous les jours de 8h à 20h.
                </p>
                <p className="mt-2 font-mono text-xs font-bold text-[#14261F] underline group-hover:text-[#25D366]">
                  +{LIMELLE_CONFIG.whatsappNumber}
                </p>
              </div>
            </a>

            {/* Email Card */}
            <a
              href="mailto:contact@limelle-beaute.com"
              className="group flex items-start gap-4 rounded-3xl border border-[#E8E0D4] bg-white p-6 shadow-xs transition hover:border-[#B58A4A] hover:shadow-md"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#B58A4A]/15 text-[#B58A4A] transition group-hover:bg-[#B58A4A] group-hover:text-white">
                <Mail size={22} />
              </div>
              <div>
                <span className="inline-block rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800">
                  Support Client &amp; Partenariats
                </span>
                <h3 className="mt-1 text-sm font-semibold text-[#2B2620]">Courrier Électronique</h3>
                <p className="mt-1 text-xs text-[#6A5A4A]">
                  Pour toute demande de collaboration, suivi de facture ou question générale.
                </p>
                <p className="mt-2 text-xs font-bold text-[#14261F] underline group-hover:text-[#B58A4A]">
                  contact@limelle-beaute.com
                </p>
              </div>
            </a>

            {/* Location & Hours Card */}
            <div className="rounded-3xl border border-[#E8E0D4] bg-[#F4EFE6]/60 p-6 text-xs text-[#6A5A4A]">
              <div className="flex items-center gap-2 font-semibold text-[#2B2620]">
                <MapPin size={16} className="text-[#B58A4A]" />
                <span>Points d'expédition &amp; Retrait</span>
              </div>
              <p className="mt-1.5 pl-6">Dakar (Sénégal) &amp; Niamey (Niger) • Livraison express à domicile</p>
              
              <div className="mt-4 flex items-center gap-2 font-semibold text-[#2B2620]">
                <Clock size={16} className="text-[#B58A4A]" />
                <span>Horaires du Service Client</span>
              </div>
              <p className="mt-1.5 pl-6">Lundi au Samedi : 08h00 – 20h00 | Dimanche : 10h00 – 18h00</p>
            </div>

          </div>

          {/* Right: Message Form */}
          <div className="rounded-3xl border border-[#E8E0D4] bg-white p-6 sm:p-8 shadow-sm lg:col-span-7">
            <h3 className="font-serif text-xl font-normal text-[#2B2620]">
              Envoyez-nous un message
            </h3>
            <p className="mt-1 text-xs text-[#6A5A4A]">
              Remplissez ce formulaire, nous vous répondrons sous 24h par email ou WhatsApp.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Merci pour votre message ! Notre équipe vous contactera très rapidement.");
              }}
              className="mt-6 space-y-4 text-xs"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block font-medium text-[#2B2620]">Votre nom complet *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Awa Diallo"
                    className="mt-1 w-full rounded-xl border border-[#E8E0D4] bg-[#F8F4EC]/40 p-3 text-xs text-[#2B2620] placeholder:text-[#8A7A6A]/60 focus:border-[#B58A4A] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-medium text-[#2B2620]">Votre adresse email *</label>
                  <input
                    type="email"
                    required
                    placeholder="awa@exemple.com"
                    className="mt-1 w-full rounded-xl border border-[#E8E0D4] bg-[#F8F4EC]/40 p-3 text-xs text-[#2B2620] placeholder:text-[#8A7A6A]/60 focus:border-[#B58A4A] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-[#2B2620]">Numéro de téléphone / WhatsApp</label>
                <input
                  type="tel"
                  placeholder="+227 90 00 00 00 ou +221 77 000 00 00"
                  className="mt-1 w-full rounded-xl border border-[#E8E0D4] bg-[#F8F4EC]/40 p-3 text-xs text-[#2B2620] placeholder:text-[#8A7A6A]/60 focus:border-[#B58A4A] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-medium text-[#2B2620]">Votre message *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Bonjour, je souhaite avoir des conseils sur la routine anti-taches..."
                  className="mt-1 w-full rounded-xl border border-[#E8E0D4] bg-[#F8F4EC]/40 p-3 text-xs text-[#2B2620] placeholder:text-[#8A7A6A]/60 focus:border-[#B58A4A] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#14261F] py-3.5 text-xs font-semibold text-white shadow-md transition hover:bg-[#0E1B15]"
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
