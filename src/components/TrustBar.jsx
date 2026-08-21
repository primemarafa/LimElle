import { ShieldCheck, Users, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const TRUST_ITEMS = [
  {
    icon: ShieldCheck,
    title: "Paiement sécurisé",
    description: "Vos transactions sont 100% sécurisées",
  },
  {
    icon: Users,
    title: "+500 clientes satisfaites",
    description: "Une note moyenne de ★★★★★",
  },
  {
    icon: MessageCircle,
    title: "Besoin d'aide ?",
    description: "Écrivez-nous sur WhatsApp, nous répondons rapidement.",
  },
];

export default function TrustBar() {
  return (
    <section
      aria-label="Confiance et sécurité"
      className="bg-[#1B3A2D] px-5 py-12"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-3">
        {TRUST_ITEMS.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="flex flex-col items-center gap-3 text-center"
          >
            <div
              className={cn(
                "flex h-11 w-11 items-center justify-center",
                "rounded-full bg-white/10 text-[#C8B99A]"
              )}
              aria-hidden="true"
            >
              <Icon size={20} strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">{title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-white/70">
                {description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
