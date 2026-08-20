import { Heart, ShoppingBag, Star } from "lucide-react";
import { formatXof, buildGlobalPrice } from "../utils/limelle";

export default function ProductCard({ product, onAddToCart }) {
  const globalPrice = buildGlobalPrice({ productPrice: product.price, weightKg: product.weight });
  const availability = product.availability === "sur_demande" ? "Sur demande" : product.stock > 0 ? "Disponible" : "À vérifier";

  return (
    <div className="group overflow-hidden rounded-xl border border-black/10 bg-white">
      <div className="relative aspect-square overflow-hidden bg-[#efe4d3]">
        <img
          src={product.img}
          alt={product.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />

        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-black/80 px-3 py-1 text-[10px] font-bold uppercase tracking-[.12em] text-white backdrop-blur">
            {product.badge}
          </span>
        )}

        <button
          type="button"
          aria-label="Ajouter aux favoris"
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#403A33] shadow-sm backdrop-blur transition hover:bg-[#B8753C] hover:text-white"
        >
          <Heart size={15} />
        </button>

        <button
          type="button"
          aria-label="Ajouter au panier"
          onClick={(e) => { e.stopPropagation(); onAddToCart?.(product); }}
          className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-black/80 text-white shadow-sm backdrop-blur transition hover:bg-[#173F34]"
        >
          <ShoppingBag size={16} />
        </button>
      </div>

      <div className="p-4">
        <div className="flex items-center gap-1 text-[#D4A03E]">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={13} fill={i < 4 ? "currentColor" : "none"} strokeWidth={1.5} />
          ))}
          <span className="ml-1 text-xs text-black/50">(4)</span>
        </div>

        <h3 className="mt-2 text-base font-medium text-black line-clamp-1">{product.name}</h3>
        <p className="mt-1 text-sm text-black/50 line-clamp-1">{product.description}</p>

        <div className="mt-3 flex items-center justify-between">
          <p className="text-lg font-bold text-[#173F34]">{formatXof(globalPrice)}</p>
          <button
            type="button"
            onClick={() => onAddToCart?.(product)}
            className="rounded-lg bg-black px-4 py-2 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-[#173F34]"
          >
            Ajouter
          </button>
        </div>
      </div>
    </div>
  );
}
