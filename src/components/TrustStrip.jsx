import { Leaf, Diamond, Truck, Heart } from "lucide-react";

const FEATURES = [
  {
    Icon: Leaf,
    title: "Ingrédients naturels",
    text: "Sains et respectueux de votre peau",
  },
  {
    Icon: Diamond,
    title: "Qualité premium",
    text: "Sélection rigoureuse des meilleurs produits",
  },
  {
    Icon: Truck,
    title: "Livraison rapide",
    text: "Partout au Sénégal et au Niger",
  },
  {
    Icon: Heart,
    title: "Service attentionné",
    text: "À votre écoute tous les jours",
  },
];

export default function TrustStrip() {
  return (
    <section className="bg-[#1B3A2D] px-5 py-8">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 md:grid-cols-4">
        {FEATURES.map(({ Icon, title, text }) => (
          <div key={title} className="flex items-start gap-3 text-white">
            <div className="shrink-0 rounded-full bg-white/10 p-2.5">
              <Icon size={18} strokeWidth={1.5} className="text-[#D4A96A]" />
            </div>
            <div>
              <p className="text-sm font-semibold">{title}</p>
              <p className="mt-0.5 text-xs leading-5 text-white/70">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
