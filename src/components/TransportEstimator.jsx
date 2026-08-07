import { formatXof, calculateTransport } from "../utils/limelle";

export default function TransportEstimator({ config, weight, onWeightChange }) {
  const transportEstimate = calculateTransport(weight);

  return (
    <section className="mx-auto max-w-5xl px-5 pb-16">
      <div className="rounded-3xl bg-[#C1613F] p-7 text-white md:p-10">
        <span className="text-xs font-bold uppercase tracking-[.16em]">Estimation transport</span>
        <h2 className="mt-2 text-3xl font-semibold">Prépare ton budget d'envoi</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-white/90">Base de travail : {formatXof(config.transport.ratePerKg)} par kg, avec un minimum de {config.transport.minimumWeightKg} kg. Le montant exact est confirmé avant paiement.</p>
        <div className="mt-7 flex items-center justify-between gap-5">
          <label htmlFor="weight" className="font-bold">Poids estimé</label>
          <strong className="text-3xl">{weight.toFixed(1)} kg</strong>
        </div>
        <input id="weight" type="range" min={config.transport.minimumWeightKg} max="10" step="0.1" value={weight} onChange={(event) => onWeightChange(Number(event.target.value))} className="mt-4 w-full" />
        <div className="mt-6 rounded-2xl bg-white/15 p-5">
          <div className="text-sm text-white/80">Transport indicatif</div>
          <div className="mt-1 text-3xl font-semibold">{formatXof(transportEstimate)}</div>
        </div>
      </div>
    </section>
  );
}
