import React, { useState } from "react";
import { ChevronDown, HelpCircle, ShieldCheck, Truck, CreditCard, Sparkles } from "lucide-react";

const FAQ_ITEMS = [
  {
    question: "Comment fonctionne le service Personal Shopping Dakar ➔ Niamey ?",
    answer: "Nous effectuons vos courses beauté et soins directement auprès de boutiques et formulateurs de confiance à Dakar (Sénégal). Les commandes sont soigneusement emballées puis expédiées à Niamey (Niger) par fret aérien / GP sécurisé, avec livraison directe à domicile ou en point de retrait.",
  },
  {
    question: "Quels sont les délais de livraison à Niamey ?",
    answer: "Après validation de votre commande avec notre équipe sur WhatsApp, le délai d'acheminement et de livraison à Niamey est généralement de 3 à 5 jours ouvrés.",
  },
  {
    question: "Quels sont les modes de paiement acceptés ?",
    answer: "Pour votre totale tranquillité, nous acceptons le paiement en Cash à la livraison à Niamey, ainsi que les transferts NITA, Wave ou Orange Money lors de la validation.",
  },
  {
    question: "Les produits cosmétiques sont-ils garantis 100% authentiques ?",
    answer: "Absolument. Nous sélectionnons exclusivement des produits originaux auprès de laboratoires réputés, de coopératives éco-certifiées et de distributeurs officiels au Sénégal.",
  },
  {
    question: "Que faire si un article ne me convient pas ou est non conforme ?",
    answer: "Nous acceptons les retours sous 7 jours pour tout article scellé, non utilisé ou présentant une non-conformité à la réception. Notre service client WhatsApp vous accompagne immédiatement.",
  },
  {
    question: "Puis-je commander un produit qui n'est pas affiché dans le catalogue ?",
    answer: "Oui ! C'est le cœur de notre métier de Personal Shopper. Utilisez notre section 'Demande Sur-Mesure' ou envoyez-nous simplement la photo de votre produit recherché sur WhatsApp.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0); // First item open by default

  const toggleItem = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" aria-label="Foire aux questions" className="bg-[#F8F4EC] px-5 py-16 md:py-24 border-t border-[#E8E0D4] scroll-mt-20">
      <div className="mx-auto max-w-4xl">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#B58A4A]/30 bg-[#F4EFE6] px-3.5 py-1 text-xs font-semibold uppercase tracking-[.18em] text-[#B58A4A]">
            <HelpCircle size={14} />
            <span>Vos Questions Fréquentes</span>
          </div>
          <h2 className="mt-4 font-serif text-3xl font-normal tracking-tight text-[#2B2620] md:text-4xl">
            Tout ce que vous devez savoir
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#6A5A4A]">
            Une transparence totale sur nos expéditions Dakar ➔ Niamey, la sécurité de vos achats et nos garanties.
          </p>
        </div>

        {/* Accordion list */}
        <div className="mt-12 space-y-3.5">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="overflow-hidden rounded-2xl border border-[#E8E0D4] bg-white transition-all shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => toggleItem(idx)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between p-5 text-left transition hover:bg-[#F8F4EC]/50"
                >
                  <span className="font-sans text-sm font-semibold text-[#2B2620] md:text-base">
                    {item.question}
                  </span>
                  <span
                    className={`ml-4 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#F4EFE6] text-[#B58A4A] transition-transform duration-300 ${
                      isOpen ? "rotate-180 bg-[#14261F] text-white" : ""
                    }`}
                  >
                    <ChevronDown size={16} />
                  </span>
                </button>

                {isOpen && (
                  <div className="border-t border-[#E8E0D4]/60 px-5 pb-5 pt-3.5 text-xs sm:text-sm leading-relaxed text-[#6A5A4A] animate-fade-up">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
