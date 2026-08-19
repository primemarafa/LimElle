import { Trophy, Truck, ShieldCheck, RotateCcw } from "lucide-react";

const FEATURES = [
  {
    Icon: Trophy,
    title: "Qualité premium",
    text: "Sélection rigoureuse des meilleurs produits naturels et de qualité.",
  },
  {
    Icon: Truck,
    title: "Livraison rapide",
    text: "Expédition en 24-48h depuis Dakar vers Niamey et alentours.",
  },
  {
    Icon: ShieldCheck,
    title: "Paiement sécurisé",
    text: "Transactions 100% sécurisées via Orange Money, MTN MoMo et carte bancaire.",
  },
  {
    Icon: RotateCcw,
    title: "Retours faciles",
    text: "Politique de retour simple sous 7 jours sans complication.",
  },
];

export default function TrustStrip() {
  return (
    <section className="px-5 pt-20 md:pt-32">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-center text-3xl font-medium tracking-tight text-black md:text-4xl">
          Pourquoi nous choisir
        </h2>
        <p className="mt-4 text-center text-base text-black/50 max-w-md mx-auto">
          Des produits de qualité premium, soigneusement sélectionnés pour vous.
        </p>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {FEATURES.map(({ Icon, title, text }) => (
            <div
              key={title}
              className="flex items-start gap-4 rounded-xl border border-black/10 p-5"
            >
              <div className="shrink-0 rounded-lg bg-black/5 p-3">
                <Icon size={24} strokeWidth={1.5} className="text-[#173F34]" />
              </div>
              <div>
                <h3 className="text-base font-medium text-black">{title}</h3>
                <p className="mt-1 text-sm text-black/50 line-clamp-2">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
