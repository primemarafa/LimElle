import { LIMELLE_CONFIG } from "../config/limelle";

const STATS = [
  {
    value: `${LIMELLE_CONFIG.stats.satisfiedClients}+`,
    label: "Clientes satisfaites",
    description: "Des commandes suivies avec soin entre Dakar et Niamey.",
  },
  {
    value: "100%",
    label: "Sélection vérifiée",
    description: "Chaque pièce inspectée avant expédition.",
  },
  {
    value: `${LIMELLE_CONFIG.stats.rating} / 5`,
    label: "Note moyenne",
    description: "Un service de personal shopping plébiscité.",
  },
];

export default function StatsSection() {
  return (
    <section className="bg-[#F8F4EC] px-5 py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[.22em] text-[#B58A4A]">Nos engagements en chiffres</p>
          <h2 className="mt-3 text-3xl font-medium tracking-tight text-[#2B2620] md:text-4xl">
            Notre impact
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#8A7A6A]">
            Des chiffres qui reflètent la confiance de nos clientes au Niger et au Sénégal.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-[#E8E0D4] bg-white p-8 text-center shadow-sm transition-all duration-300 hover:shadow-md"
            >
              <h3 className="text-3xl font-bold text-[#B58A4A] md:text-4xl">{stat.value}</h3>
              <p className="mt-2 text-base font-semibold text-[#2B2620]">{stat.label}</p>
              <p className="mt-1 text-xs text-[#8A7A6A]">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
