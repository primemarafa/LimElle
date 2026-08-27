import { ShoppingBag } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
        "group relative overflow-hidden rounded-2xl border border-[#E8E0D4] bg-white cursor-pointer",
        "transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
      )}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-[#F4EFE6]">
        <img
          src={img || PLACEHOLDER_IMG}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-[#1B1712]/0 transition-colors duration-300 group-hover:bg-[#1B1712]/5" />
      </div>

      {/* Content */}
      <CardContent className="p-3.5">
        <h3 className="font-sans text-xs font-semibold text-[#2B2620] line-clamp-1 md:text-sm">
          {name}
        </h3>
        {description && (
          <p className="mt-0.5 text-[11px] text-[#8A7A6A] line-clamp-1">
            {description}
          </p>
        )}
        <div className="mt-2.5 flex items-center justify-between">
          <p className="text-xs font-bold text-[#2B2620] md:text-sm">
            {typeof price === "number" ? `${price.toLocaleString("fr-FR")} FCFA` : price}
          </p>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 rounded-full text-[#8A7A6A] hover:bg-[#F4EFE6] hover:text-[#1B3A2D]"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart?.(product);
            }}
            aria-label={`Ajouter ${name} au panier`}
          >
            <ShoppingBag size={14} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
