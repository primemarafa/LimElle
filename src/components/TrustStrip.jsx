import { Leaf, Award, Truck, HeartHandshake } from "lucide-react";
import { cn } from "@/lib/utils";

const FEATURES = [
  { icon: Leaf, label: "Sélection soignée", description: "Chaque pièce choisie à la main à Dakar" },
  { icon: Award, label: "Qualité premium", description: "Tissus, confection et finitions vérifiés" },
  { icon: Truck, label: "Livraison Dakar → Niamey", description: "Expédition rapide et sécurisée" },
  { icon: HeartHandshake, label: "Service attentionné", description: "Personal shopping à votre écoute" },
];

export default function TrustStrip() {
  return (
    <section aria-label="Nos engagements" className="bg-[#1B3A2D] px-5 py-10">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 md:grid-cols-4">
        {FEATURES.map(({ icon: Icon, label, description }) => (
          <div key={label} className="flex flex-col items-center gap-3 text-center">
            <div className={cn("flex h-12 w-12 items-center justify-center", "rounded-full bg-white/10 text-[#C8B99A]")} aria-hidden="true">
              <Icon size={22} strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{label}</p>
              <p className="mt-1 text-xs text-white/70">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
