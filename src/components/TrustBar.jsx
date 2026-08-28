import { ShieldCheck, RotateCcw, CreditCard, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const TRUST_ITEMS = [
  {
    icon: RotateCcw,
    title: "Retours acceptés sous 7 jours",
    description: "Pour les articles non conformes",
  },
  {
    icon: ShieldCheck,
    title: "Garantie authenticité",
    description: "Articles 100% originaux & nobles",
  },
  {
    icon: CreditCard,
    title: "Paiement sécurisé",
    description: "Cash à la livraison / Nita / Wave",
  },
  {
    icon: MessageCircle,
    title: "Besoin d'aide ?",
    description: "Écrivez-nous sur WhatsApp 7j/7",
  },
];

export default function TrustBar() {
  const revealRef = useScrollReveal();

  return (
    <section
      aria-label="Confiance et sécurité"
      className="bg-[#FAFAF9] px-5 py-14"
      ref={revealRef}
    >
      <div className="reveal mx-auto grid max-w-6xl grid-cols-1 gap-6 rounded-[1.5rem] border border-[#E7E5E4] bg-white p-7 sm:grid-cols-2 lg:grid-cols-4 sm:p-9 shadow-sm">
        {TRUST_ITEMS.map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={i}
              className="flex flex-col items-center gap-3 text-center"
            >
              <div
                className={cn(
                  "flex h-11 w-11 items-center justify-center",
                  "rounded-xl bg-[#A16207]/10 text-[#A16207]"
                )}
                aria-hidden="true"
              >
                <Icon size={20} strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#1C1917]">{item.title}</h3>
                <p className="mt-0.5 text-xs text-[#57534E]">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
