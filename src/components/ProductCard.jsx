import { ShoppingBag } from "lucide-react";
import { formatXof, buildGlobalPrice } from "../utils/limelle";

export default function ProductCard({ product, onSelect }) {
  const globalPrice = buildGlobalPrice({ productPrice: product.price, weightKg: product.weight });
  const availability = product.availability === "sur_demande" ? "Sur demande" : product.stock > 0 ? "Disponible" : "À vérifier";

  return (
    <button type="button" onClick={() => onSelect(product)} className="group w-full overflow-hidden rounded-[1.5rem] border border-[#E8DCC7] bg-[#fffdf9] text-left shadow-[0_20px_38px_rgba(23,63,52,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_44px_rgba(23,63,52,0.12)]">
      <div className="relative aspect-[.82] overflow-hidden bg-[#efe4d3]">
        <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#173F34]/15 via-transparent to-white/10" />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.12em] text-[#173F34] backdrop-blur">{product.badge}</span>
      </div>
      <div className="p-4 sm:p-5">
        <h3 className="font-serif text-xl leading-6 text-[#173F34]">{product.name}</h3>
        <p className="mt-2 line-clamp-2 text-xs leading-5 text-[#7b685d]">{product.description}</p>
        <div className="mt-4 flex items-end justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[.12em] text-[#B8753C]">{availability}</p>
            <p className="mt-1 text-base font-extrabold text-[#173F34]">{formatXof(globalPrice)}</p>
          </div>
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#B8753C]/50 bg-[#f7efe7] text-[#B8753C] transition group-hover:bg-[#173F34] group-hover:text-white">
            <ShoppingBag size={17} />
          </span>
        </div>
      </div>
    </button>
  );
}
