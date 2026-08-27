import React, { useState } from "react";
import { Sparkles, MessageCircle, Send, ShoppingBag, ArrowRight, Camera, CheckCircle2 } from "lucide-react";
import { LIMELLE_CONFIG } from "@/config/limelle";

export default function CustomRequestSection() {
  const [productTitle, setProductTitle] = useState("");
  const [details, setDetails] = useState("");
  const [budget, setBudget] = useState("");
  const [customerCity, setCustomerCity] = useState("Niamey");

  const buildWhatsAppUrl = () => {
    const text = `Bonjour Lim'Elle 🌸\n\nJ'ai une *DEMANDE SUR-MESURE* (Personal Shopping Dakar ➔ Niamey) :\n\n✨ *Produit recherché :* ${productTitle || "Article particulier"}\n📝 *Détails / Marque / Référence :* ${details || "Voir description"}\n💰 *Budget souhaité :* ${budget ? `${budget} FCFA` : "À étudier"}\n📍 *Ville de livraison :* ${customerCity}\n\nPourriez-vous vérifier la disponibilité à Dakar et me proposer un devis avec livraison ? Merci !`;
    return `https://wa.me/${LIMELLE_CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="sur-mesure" aria-label="Demande sur-mesure" className="bg-[#14261F] px-5 py-16 md:py-24 text-white scroll-mt-20">
      <div className="mx-auto max-w-6xl">
        
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          
          {/* Left Column : Storytelling */}
          <div className="lg:col-span-5 space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#C8B99A]/30 bg-white/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[.18em] text-[#C8B99A] backdrop-blur-xs">
              <Sparkles size={13} />
              <span>Service Personal Shopping</span>
            </div>

            <h2 className="font-serif text-3xl font-normal tracking-tight text-[#F8F4EC] md:text-4xl">
              Vous cherchez un produit précis à Dakar ?
            </h2>

            <p className="text-sm leading-relaxed text-[#E8E0D4]">
              Vous avez repéré un sérum rare, un parfum de niche, une marque spécifique ou un coffret beauté à Dakar non disponible à Niamey ?
            </p>

            <div className="space-y-3 pt-2 text-xs text-[#E8E0D4]/90">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-[#C8B99A] shrink-0 mt-0.5" />
                <span>Nous recherchons et vérifions l'authenticité de l'article à Dakar.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-[#C8B99A] shrink-0 mt-0.5" />
                <span>Nous vous envoyons photos réelles et prix tout compris (fret inclus).</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-[#C8B99A] shrink-0 mt-0.5" />
                <span>Expédition express sécurisée vers Niamey avec paiement à l'arrivée.</span>
              </div>
            </div>
          </div>

          {/* Right Column : Interactive Request Card */}
          <div className="rounded-3xl border border-white/15 bg-white/10 p-6 sm:p-8 backdrop-blur-md lg:col-span-7">
            <h3 className="font-serif text-xl font-medium text-white">
              Transmettre ma demande sur-mesure
            </h3>
            <p className="mt-1 text-xs text-[#C8B99A]">
              Remplissez les détails ci-dessous pour démarrer l'échange directement sur WhatsApp :
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                window.open(buildWhatsAppUrl(), "_blank");
              }}
              className="mt-6 space-y-4 text-xs"
            >
              <div>
                <label className="block font-medium text-white">Nom du produit ou marque recherchée *</label>
                <input
                  type="text"
                  required
                  value={productTitle}
                  onChange={(e) => setProductTitle(e.target.value)}
                  placeholder="Ex: Gamme éclat au Curcuma / Parfum Maison d'Orient..."
                  className="mt-1 w-full rounded-xl border border-white/20 bg-white/10 p-3 text-xs text-white placeholder:text-white/50 focus:border-[#C8B99A] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block font-medium text-white">Votre budget indicatif (FCFA)</label>
                  <input
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="Ex: 15000"
                    className="mt-1 w-full rounded-xl border border-white/20 bg-white/10 p-3 text-xs text-white placeholder:text-white/50 focus:border-[#C8B99A] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-medium text-white">Ville de réception</label>
                  <select
                    value={customerCity}
                    onChange={(e) => setCustomerCity(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-white/20 bg-[#1B3A2D] p-3 text-xs text-white focus:border-[#C8B99A] focus:outline-none"
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
                <label className="block font-medium text-white">Détails, teinte, contenance ou référence</label>
                <textarea
                  rows={2}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Précisez la teinte, la texture, le format ou collez un lien..."
                  className="mt-1 w-full rounded-xl border border-white/20 bg-white/10 p-3 text-xs text-white placeholder:text-white/50 focus:border-[#C8B99A] focus:outline-none"
                />
              </div>

              {/* Encadré d'aide photo */}
              <div className="flex items-center gap-3 rounded-xl border border-[#C8B99A]/30 bg-[#C8B99A]/10 p-3 text-xs text-[#E8E0D4]">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#C8B99A]/20 text-[#C8B99A]">
                  <Camera size={16} />
                </div>
                <p className="leading-snug">
                  <strong className="text-white">Vous avez une photo ou capture d'écran ?</strong> Vous pourrez la joindre directement dans la discussion WhatsApp en 1 clic !
                </p>
              </div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3.5 text-xs font-bold text-white shadow-lg transition hover:bg-[#20BA5A] sm:text-sm"
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
