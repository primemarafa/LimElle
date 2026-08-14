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
      <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-3">
        {ITEMS.map(({ Icon, title, text }) => (
          <div key={title} className="flex items-start gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#B8753C]">
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
