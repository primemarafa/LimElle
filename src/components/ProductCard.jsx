import { ShoppingBag } from "lucide-react";
import { formatXof, buildGlobalPrice } from "../utils/limelle";

export default function ProductCard({ product, onSelect }) {
  const globalPrice = buildGlobalPrice({ productPrice: product.price, weightKg: product.weight });
  const availability = product.availability === "sur_demande" ? "Sur demande" : product.stock > 0 ? "Disponible" : "À vérifier";

  return (
    <button type="button" onClick={() => onSelect(product)} className="group w-full overflow-hidden rounded-2xl border border-[#EBE3D2] bg-white text-left transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-[.86] overflow-hidden bg-[#EBE3D2]">
        <img src={product.img} alt={product.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]" loading="lazy" />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-bold text-[#173F34] backdrop-blur">{product.badge}</span>
      </div>
      <div className="p-4 sm:p-5">
        <h3 className="text-sm font-bold leading-5 text-[#173F34] sm:text-base">{product.name}</h3>
        <p className="mt-1.5 line-clamp-1 text-xs text-[#8A7765]">{product.description}</p>
        <div className="mt-4 flex items-end justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[.12em] text-[#B8753C]">{availability}</p>
            <p className="mt-1 text-base font-extrabold text-[#173F34]">{formatXof(globalPrice)}</p>
          </div>
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#B8753C]/50 text-[#B8753C] transition group-hover:bg-[#173F34] group-hover:text-white">
            <ShoppingBag size={17} />
          </span>
        </div>
      </div>
    </button>
  );
}
