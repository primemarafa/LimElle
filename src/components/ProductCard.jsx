import { formatXof, buildGlobalPrice } from "../utils/limelle";

export default function ProductCard({ product, onSelect }) {
  const globalPrice = buildGlobalPrice({ productPrice: product.price, weightKg: product.weight });

  return (
    <button type="button" onClick={() => onSelect(product)} className="w-full overflow-hidden rounded-3xl bg-white text-left transition hover:-translate-y-1">
      <img src={product.img} alt={product.name} className="aspect-[3/4] w-full object-cover" loading="lazy" />
      <div className="p-5">
        <div className="mb-2 inline-flex rounded-full bg-[#EBE3D2] px-3 py-1 text-xs font-bold">{product.badge}</div>
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="mt-2 text-sm text-[#5B5348]">Poids estimé : {product.weight} kg</p>
        <p className="mt-3 text-lg font-extrabold text-[#A6512F]">À partir de {formatXof(globalPrice)}</p>
        <p className="mt-1 text-xs leading-5 text-[#5B5348]">Prix indicatif, confirmé avant paiement.</p>
      </div>
    </button>
  );
}
