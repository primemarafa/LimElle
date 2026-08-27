import { ShieldCheck, Sparkles, RotateCcw, CreditCard, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const TRUST_ITEMS = [
  {
    icon: RotateCcw,
    title: "Retours acceptés sous 7 jours",
    description: "Pour les articles non conformes",
  },
  {
    icon: Sparkles,
    title: "Garantie authenticité",
    description: "Produits 100% originaux & nobles",
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
  return (
    <section
      aria-label="Confiance et sécurité"
      className="bg-[#F8F4EC] px-5 py-12"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 rounded-2xl border border-[#E8E0D4] bg-[#F3EDE2]/60 p-6 sm:grid-cols-2 lg:grid-cols-4 sm:p-8">
        {TRUST_ITEMS.map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={i}
              className="flex flex-col items-center gap-2.5 text-center"
            >
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center",
                  "rounded-full bg-[#B58A4A]/15 text-[#B58A4A]"
                )}
                aria-hidden="true"
              >
                <Icon size={20} strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#2B2620]">{item.title}</h3>
                <p className="mt-0.5 text-xs text-[#6A5A4A]">
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
