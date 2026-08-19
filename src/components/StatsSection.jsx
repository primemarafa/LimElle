import { LIMELLE_CONFIG } from "../config/limelle";

const STATS = [
  {
    value: `${LIMELLE_CONFIG.stats.satisfiedClients}+`,
    label: "Clientes satisfaites",
    description: "Des centaines de clientes nous font confiance au quotidien.",
  },
  {
    value: "100+",
    label: "Produits vendus",
    description: "Des produits de qualité livrés avec soin.",
  },
  {
    value: `${LIMELLE_CONFIG.stats.rating}`,
    label: "Note moyenne",
    description: "Un service apprécié par nos clientes.",
  },
];

export default function StatsSection() {
  return (
    <section className="px-5 pt-20 md:pt-32">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-3xl font-medium tracking-tight text-black md:text-4xl">
          Notre impact
        </h2>
        <p className="mt-4 text-center text-base text-black/50 max-w-md mx-auto">
          Des chiffres qui reflètent la confiance de nos clientes.
        </p>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-black/10 p-14 text-center"
            >
              <h3 className="text-4xl font-medium text-black">{stat.value}</h3>
              <p className="mt-2 text-base font-medium text-black">{stat.label}</p>
              <p className="mt-2 text-sm text-black/50">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
