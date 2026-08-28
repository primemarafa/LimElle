import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const FAQ_ITEMS = [
  {
    question: "Comment fonctionne le service Personal Shopping Dakar ➔ Niamey ?",
    answer: "Nous sélectionnons vos articles de mode (pagnes, bijoux, chaussures, sacs) directement auprès d'artisans et marchands de confiance à Dakar (Sénégal). Les commandes sont soigneusement vérifiées, emballées puis expédiées à Niamey (Niger) par fret aérien / GP sécurisé, avec livraison directe à domicile ou en point de retrait.",
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
    question: "Les articles sont-ils garantis 100% authentiques ?",
    answer: "Absolument. Nous sélectionnons exclusivement des articles originaux auprès d'artisans réputés, d'ateliers de confection certifiés et de boutiques officielles au Sénégal. Chaque pièce est vérifiée avant expédition.",
  },
  {
    question: "Que faire si un article ne me convient pas ou est non conforme ?",
    answer: "Nous acceptons les retours sous 7 jours pour tout article scellé, non porté ou présentant une non-conformité à la réception. Notre service client WhatsApp vous accompagne immédiatement.",
  },
  {
    question: "Puis-je commander un article qui n'est pas affiché dans le catalogue ?",
    answer: "Oui ! C'est le cœur de notre métier de Personal Shopper. Utilisez notre section 'Demande Sur-Mesure' ou envoyez-nous simplement la photo de l'article recherché sur WhatsApp.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);
  const revealRef = useScrollReveal();

  const toggleItem = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" aria-label="Foire aux questions" className="bg-[#F5F3EF] px-5 py-20 md:py-28 scroll-mt-20">
      <div className="mx-auto max-w-4xl" ref={revealRef}>

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto reveal">
          <div className="inline-flex items-center gap-2 rounded-xl border border-[#A16207]/25 bg-[#A16207]/8 px-4 py-1.5 text-xs font-semibold uppercase tracking-[.18em] text-[#A16207]">
            <HelpCircle size={13} />
            <span>Vos Questions Fréquentes</span>
          </div>
          <h2 className="mt-5 font-serif text-3xl font-semibold tracking-tight text-[#1C1917] md:text-[2.5rem]">
            Tout ce que vous devez savoir
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#57534E]">
            Une transparence totale sur nos expéditions Dakar ➔ Niamey, la sécurité de vos achats et nos garanties.
          </p>
        </div>

        {/* Accordion */}
        <div className="mt-14 space-y-3">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="overflow-hidden rounded-[1.25rem] border border-[#E7E5E4] bg-white transition-shadow duration-300 shadow-sm hover:shadow-md"
              >
                <button
                  type="button"
                  onClick={() => toggleItem(idx)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between p-5 sm:p-6 text-left transition-colors hover:bg-[#FAFAF9]"
                >
                  <span className="font-sans text-sm font-semibold text-[#1C1917] sm:text-base pr-4">
                    {item.question}
                  </span>
                  <span
                    className={`ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition-all duration-400 ${
                      isOpen
                        ? "rotate-180 bg-[#1C1917] text-white"
                        : "bg-[#F5F3EF] text-[#A16207]"
                    }`}
                  >
                    <ChevronDown size={16} />
                  </span>
                </button>

                <div
                  className="accordion-content"
                  data-open={isOpen ? "true" : "false"}
                >
                  <div>
                    <div className="border-t border-[#E7E5E4]/60 px-5 sm:px-6 pb-5 sm:pb-6 pt-4 text-sm leading-relaxed text-[#57534E]">
                      {item.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
