import { ShieldCheck, Star, MessageCircle } from "lucide-react";
import { LIMELLE_CONFIG } from "../config/limelle";

const ITEMS = [
  {
    Icon: ShieldCheck,
    title: "Paiement sécurisé",
    text: "Transactions 100% sécurisées via Orange Money, MTN MoMo et carte bancaire.",
  },
  {
    Icon: Star,
    title: `${LIMELLE_CONFIG.stats.satisfiedClients}+ clientes satisfaites`,
    text: `Notée ${LIMELLE_CONFIG.stats.rating}/5 sur nos produits. Votre confiance est notre fierté.`,
    stars: true,
  },
  {
    Icon: MessageCircle,
    title: "Besoin d'aide ?",
    text: "Notre équipe est disponible pour vous conseiller et répondre à vos questions.",
    cta: true,
  },
];

export default function TrustStrip() {
  return (
    <section className="bg-[#F1E8DB] px-5 py-10">
      <div className="mx-auto grid max-w-7xl gap-5 sm:grid-cols-3">
        {ITEMS.map(({ Icon, title, text, stars, cta }) => (
          <div key={title} className="flex flex-col items-center gap-4 rounded-[1.5rem] border border-[#173F34]/10 bg-white/70 p-7 text-center shadow-[0_18px_32px_rgba(23,63,52,0.04)] backdrop-blur-sm">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#173F34] text-[#f3d5ad] shadow-[0_12px_24px_rgba(23,63,52,0.12)]">
              <Icon size={22} strokeWidth={1.75} />
            </span>
            <div>
              <p className="text-sm font-bold text-[#173F34]">{title}</p>
              {stars && (
                <div className="my-2 flex justify-center gap-1 text-[#D4A03E]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill={i < 4 ? "currentColor" : "none"} strokeWidth={1.5} />
                  ))}
                </div>
              )}
              <p className="mt-1 text-xs leading-5 text-[#5B5348]">{text}</p>
              {cta && (
                <a
                  href={`https://wa.me/${LIMELLE_CONFIG.whatsappNumber}?text=${encodeURIComponent("Bonjour, je viens du site Lim'Elle 🌸")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#3FBF63] px-5 py-2.5 text-xs font-bold text-white transition hover:bg-[#2da84f]"
                >
                  <MessageCircle size={14} />
                  Nous écrire
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
