import { ShoppingBag } from "lucide-react";
import { formatXof, buildGlobalPrice } from "../utils/limelle";

export default function ProductCard({ product, onAddToCart }) {
  const price = product.price;

  return (
    <div className="group overflow-hidden rounded-2xl border border-[#E8E0D4] bg-white transition hover:shadow-md">
      <div className="relative aspect-square overflow-hidden bg-[#F0EBE3]">
        <img
          src={product.img}
          alt={product.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <button
          type="button"
          aria-label="Ajouter au panier"
          onClick={(e) => { e.stopPropagation(); onAddToCart?.(product); }}
          className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#1B3A2D] text-white shadow-sm opacity-0 transition group-hover:opacity-100"
        >
          <ShoppingBag size={14} />
        </button>
      </div>

      <div className="p-4">
        <h3 className="text-sm font-medium text-[#2D2924] line-clamp-1">{product.name}</h3>
        <p className="mt-1 text-xs text-[#8A7A6A] line-clamp-1">{product.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <p className="text-base font-bold text-[#2D2924]">{formatXof(price)}</p>
          <button
            type="button"
            onClick={() => onAddToCart?.(product)}
            className="rounded-full border border-[#E8E0D4] p-2 text-[#8A7A6A] transition hover:border-[#A0845C] hover:text-[#A0845C]"
            aria-label="Ajouter au panier"
          >
            <ShoppingBag size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
