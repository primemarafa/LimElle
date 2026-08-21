import { Leaf, Award, Truck, HeartHandshake } from "lucide-react";
import { cn } from "@/lib/utils";

const FEATURES = [
  { icon: Leaf, label: "Ingrédients naturels", description: "Sains et respectueux de votre peau" },
  { icon: Award, label: "Qualité premium", description: "Sélection rigoureuse des meilleurs produits" },
  { icon: Truck, label: "Livraison rapide", description: "Partout au Sénégal et au Niger" },
  { icon: HeartHandshake, label: "Service attentionné", description: "À votre écoute tous les jours" },
];

export default function TrustStrip() {
  return (
    <section
      aria-label="Nos engagements"
      className="bg-[#1B3A2D] px-5 py-10"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 md:grid-cols-4">
        {FEATURES.map(({ icon: Icon, label, description }) => (
          <div
            key={label}
            className="flex flex-col items-center gap-3 text-center"
          >
            <div
              className={cn(
                "flex h-12 w-12 items-center justify-center",
                "rounded-full bg-white/10 text-[#C8B99A]"
              )}
              aria-hidden="true"
            >
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
