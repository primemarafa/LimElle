import { ShieldCheck, Star, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const TRUST_ITEMS = [
  {
    icon: ShieldCheck,
    title: "Paiement sécurisé",
    description: "Vos transactions sont 100% sécurisées",
  },
  {
    type: "reviews",
    title: "+500 clientes satisfaites",
    avatars: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&auto=format&fit=crop",
    ],
  },
  {
    icon: MessageCircle,
    title: "Besoin d'aide ?",
    description: "Écrivez-nous sur WhatsApp, nous répondons rapidement.",
  },
];

function StarRating() {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={14} className="fill-[#B58A4A] text-[#B58A4A]" />
      ))}
    </div>
  );
}

function AvatarStack({ urls }) {
  return (
    <div className="flex -space-x-2">
      {urls.map((url, i) => (
        <img
          key={i}
          src={url}
          alt={`Cliente ${i + 1}`}
          className="h-8 w-8 rounded-full border-2 border-white object-cover shadow-xs"
          loading="lazy"
        />
      ))}
    </div>
  );
}

export default function TrustBar() {
  return (
    <section
      aria-label="Confiance et sécurité"
      className="bg-[#F8F4EC] px-5 py-12"
    >
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 rounded-2xl border border-[#E8E0D4] bg-[#F3EDE2]/60 p-6 sm:grid-cols-3 sm:p-8">
        {TRUST_ITEMS.map((item, i) => {
          if (item.type === "reviews") {
            return (
              <div
                key={i}
                className="flex flex-col items-center gap-2.5 text-center"
              >
                <AvatarStack urls={item.avatars} />
                <div>
                  <h3 className="text-sm font-semibold text-[#2B2620]">{item.title}</h3>
                  <div className="mt-1 flex justify-center">
                    <StarRating />
                  </div>
                </div>
              </div>
            );
          }

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
