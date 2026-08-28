import { ShoppingBag, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const PLACEHOLDER_IMG = "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=400&auto=format&fit=crop";

export default function ProductCard({ product, onAddToCart, onSelectProduct }) {
  const { name, description, price, img, category } = product;

  return (
    <Card
      onClick={() => onSelectProduct?.(product)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelectProduct?.(product);
        }
      }}
      className={cn(
        "group relative overflow-hidden rounded-[1.25rem] border border-[#E7E5E4] bg-white cursor-pointer",
        "transition-all duration-400 hover:shadow-lg hover:-translate-y-1"
      )}
    >
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[#F5F3EF]">
        {product.badge && (
          <span className="absolute top-3 left-3 z-10 rounded-lg bg-[#1C1917]/80 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-sm">
            {product.badge}
          </span>
        )}
        <img
          src={img || PLACEHOLDER_IMG}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
          loading="lazy"
        />
        {/* Hover overlay with quick-add */}
        <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-[#0C0A09]/50 via-transparent to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100">
          <button
            type="button"
            className="mb-4 inline-flex items-center gap-2 rounded-xl bg-white/95 px-5 py-2.5 text-xs font-semibold text-[#1C1917] shadow-lg backdrop-blur-sm transition-transform duration-300 hover:bg-white translate-y-4 group-hover:translate-y-0"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart?.(product);
            }}
            aria-label={`Ajouter ${name} au panier`}
          >
            <Plus size={14} /> Ajouter
          </button>
        </div>
      </div>

      {/* Content */}
      <CardContent className="p-4">
        <h3 className="font-sans text-sm font-semibold text-[#1C1917] line-clamp-1">
          {name}
        </h3>
        {description && (
          <p className="mt-1 text-xs text-[#78716C] line-clamp-1">
            {description}
          </p>
        )}
        <div className="mt-3 flex items-center justify-between">
          <p className="text-sm font-bold text-[#1C1917]">
            {typeof price === "number" ? `${price.toLocaleString("fr-FR")} FCFA` : price}
          </p>
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#F5F3EF] text-[#78716C] transition-all duration-300 hover:bg-[#A16207] hover:text-white"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart?.(product);
            }}
            aria-label={`Ajouter ${name} au panier`}
          >
            <ShoppingBag size={14} />
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
