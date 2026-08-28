import React, { useState } from "react";
import { Sparkles, MessageCircle, Camera, CheckCircle2 } from "lucide-react";
import { LIMELLE_CONFIG } from "@/config/limelle";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function CustomRequestSection() {
  const [productTitle, setProductTitle] = useState("");
  const [details, setDetails] = useState("");
  const [budget, setBudget] = useState("");
  const [customerCity, setCustomerCity] = useState("Niamey");
  const revealRef = useScrollReveal();

  const buildWhatsAppUrl = () => {
    const text = `Bonjour Lim'Elle 🌸\n\nJ'ai une *DEMANDE SUR-MESURE* (Personal Shopping Dakar ➔ Niamey) :\n\n✨ *Article recherché :* ${productTitle || "Article particulier"}\n📝 *Détails / Référence :* ${details || "Voir description"}\n💰 *Budget souhaité :* ${budget ? `${budget} FCFA` : "À étudier"}\n📍 *Ville de livraison :* ${customerCity}\n\nPourriez-vous vérifier la disponibilité à Dakar et me proposer un devis avec livraison ? Merci !`;
    return `https://wa.me/${LIMELLE_CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="sur-mesure" aria-label="Demande sur-mesure" className="bg-[#1C1917] px-5 py-20 md:py-28 text-white scroll-mt-20">
      <div className="mx-auto max-w-6xl" ref={revealRef}>
        <div className="grid gap-14 lg:grid-cols-12 lg:items-center">

          {/* Left Column : Storytelling */}
          <div className="lg:col-span-5 space-y-6 reveal">
            <div className="inline-flex items-center gap-2 rounded-xl border border-[#D4A853]/30 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[.18em] text-[#D4A853] backdrop-blur-sm">
              <Sparkles size={13} />
              <span>Service Personal Shopping</span>
            </div>

            <h2 className="font-serif text-3xl font-semibold tracking-tight text-[#FAFAF9] md:text-[2.5rem] leading-tight">
              Vous cherchez un article précis à Dakar ?
            </h2>

            <p className="text-sm leading-relaxed text-[#D6D3D1]">
              Un Bazin Getzner brodé or, un sac en cuir d'atelier, des chaussures introuvables à Niamey ou des bijoux filigranes spécifiques ?
            </p>

            <div className="space-y-3.5 pt-2 text-sm text-[#D6D3D1]/90">
              {[
                "Nous recherchons et vérifions l'authenticité de l'article à Dakar.",
                "Nous vous envoyons photos réelles et prix tout compris (fret inclus).",
                "Expédition express sécurisée vers Niamey avec paiement à l'arrivée.",
              ].map((text, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 size={16} className="text-[#D4A853] shrink-0 mt-0.5" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column : Request Card */}
          <div className="reveal rounded-[1.5rem] border border-white/10 bg-white/8 p-7 sm:p-9 backdrop-blur-xl lg:col-span-7">
            <h3 className="font-serif text-xl font-medium text-white">
              Transmettre ma demande sur-mesure
            </h3>
            <p className="mt-1.5 text-xs text-[#D4A853]">
              Remplissez les détails ci-dessous pour démarrer l'échange directement sur WhatsApp :
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                window.open(buildWhatsAppUrl(), "_blank");
              }}
              className="mt-7 space-y-5 text-sm"
            >
              <div>
                <label className="block font-medium text-white text-xs">Article ou marque recherché(e) *</label>
                <input
                  type="text"
                  required
                  value={productTitle}
                  onChange={(e) => setProductTitle(e.target.value)}
                  placeholder="Ex: Bazin Getzner brodé or / Sac cuir d'atelier..."
                  className="mt-1.5 w-full rounded-xl border border-white/15 bg-white/8 p-3.5 text-sm text-white placeholder:text-white/40 focus:border-[#D4A853] focus:outline-none transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="block font-medium text-white text-xs">Budget indicatif (FCFA)</label>
                  <input
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="Ex: 25000"
                    className="mt-1.5 w-full rounded-xl border border-white/15 bg-white/8 p-3.5 text-sm text-white placeholder:text-white/40 focus:border-[#D4A853] focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-medium text-white text-xs">Ville de réception</label>
                  <select
                    value={customerCity}
                    onChange={(e) => setCustomerCity(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-white/15 bg-[#292524] p-3.5 text-sm text-white focus:border-[#D4A853] focus:outline-none transition-colors"
                  >
                    <option value="Niamey">Niamey (Niger)</option>
                    <option value="Dakar">Dakar (Sénégal)</option>
                    <option value="Maradi">Maradi (Niger)</option>
                    <option value="Zinder">Zinder (Niger)</option>
                    <option value="Autre ville">Autre destination</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-medium text-white text-xs">Détails, teinte, taille ou référence</label>
                <textarea
                  rows={2}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Précisez la taille, la couleur, le motif ou collez un lien..."
                  className="mt-1.5 w-full rounded-xl border border-white/15 bg-white/8 p-3.5 text-sm text-white placeholder:text-white/40 focus:border-[#D4A853] focus:outline-none transition-colors"
                />
              </div>

              {/* Photo help */}
              <div className="flex items-center gap-3.5 rounded-xl border border-[#D4A853]/25 bg-[#D4A853]/8 p-4 text-xs text-[#D6D3D1]">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#D4A853]/15 text-[#D4A853]">
                  <Camera size={16} />
                </div>
                <p className="leading-snug">
                  <strong className="text-white">Vous avez une photo ou capture d'écran ?</strong> Vous pourrez la joindre directement dans la discussion WhatsApp en 1 clic !
                </p>
              </div>

              <button
                type="submit"
                className="btn-shimmer inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#25D366] py-4 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:bg-[#20BA5A] hover:shadow-xl"
              >
                <MessageCircle size={18} />
                Envoyer ma demande sur WhatsApp
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
