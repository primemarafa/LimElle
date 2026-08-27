import { ShieldCheck, Sparkles, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const TRUST_ITEMS = [
  {
    icon: ShieldCheck,
    title: "Paiement sécurisé",
    description: "Transactions fiables et sécurisées",
  },
  {
    icon: Sparkles,
    title: "Authenticité garantie",
    description: "Produits 100% originaux et de qualité",
  },
  {
    icon: MessageCircle,
    title: "Besoin d'aide ?",
    description: "Écrivez-nous sur WhatsApp, réponse rapide.",
  },
];

export default function TrustBar() {
  return (
    <section
      aria-label="Confiance et sécurité"
      className="bg-[#F8F4EC] px-5 py-12"
    >
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 rounded-2xl border border-[#E8E0D4] bg-[#F3EDE2]/60 p-6 sm:grid-cols-3 sm:p-8">
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
