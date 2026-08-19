import { ShieldCheck, Sparkles, MessageCircle } from "lucide-react";

const ITEMS = [
  {
    Icon: ShieldCheck,
    title: "Paiement après confirmation",
    text: "Aucun paiement avant que Lim'Elle confirme la disponibilité et le prix final.",
  },
  {
    Icon: Sparkles,
    title: "Sélection vérifiée à Dakar",
    text: "Chaque pièce est recherchée et vérifiée avant d'être proposée.",
  },
  {
    Icon: MessageCircle,
    title: "Réponse rapide sur WhatsApp",
    text: "Une question, une envie précise ? Lim'Elle répond directement.",
  },
];

export default function TrustStrip() {
  return (
    <section className="bg-[#F1E8DB] px-5 py-10">
      <div className="mx-auto grid max-w-7xl gap-5 sm:grid-cols-3">
        {ITEMS.map(({ Icon, title, text }) => (
          <div key={title} className="flex items-start gap-4 rounded-[1.5rem] border border-[#173F34]/10 bg-white/70 p-5 shadow-[0_18px_32px_rgba(23,63,52,0.04)] backdrop-blur-sm">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#173F34] text-[#f3d5ad] shadow-[0_12px_24px_rgba(23,63,52,0.12)]">
              <Icon size={20} strokeWidth={1.75} />
            </span>
            <div>
              <p className="text-sm font-bold text-[#173F34]">{title}</p>
              <p className="mt-1 text-xs leading-5 text-[#5B5348]">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
