import { ShoppingBag } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const PLACEHOLDER_IMG = "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=400&auto=format&fit=crop";

export default function ProductCard({ product, onAddToCart }) {
  const { name, description, price, image, category } = product;

  return (
    <Card className={cn(
      "group relative overflow-hidden border-[#E8E0D4]/60 bg-white",
      "transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
    )}>
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-[#F5F0E8]">
        <img
          src={image || PLACEHOLDER_IMG}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Hover overlay with cart button */}
        <div className="absolute inset-0 bg-[#1B1712]/0 transition-colors duration-300 group-hover:bg-[#1B1712]/20" />
        <Button
          variant="gold"
          size="icon"
          className={cn(
            "absolute bottom-3 right-3 h-9 w-9 rounded-full",
            "opacity-0 translate-y-2 transition-all duration-300",
            "group-hover:opacity-100 group-hover:translate-y-0",
            "shadow-lg"
          )}
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart?.(product);
          }}
          aria-label={`Ajouter ${name} au panier`}
        >
          <ShoppingBag size={15} />
        </Button>
      </div>

      {/* Content */}
      <CardContent className="p-4">
        <h3 className="font-sans text-sm font-semibold text-[#2D2924] line-clamp-1">
          {name}
        </h3>
        {description && (
          <p className="mt-1 text-xs text-[#6A5A4A] line-clamp-1">
            {description}
          </p>
        )}
        <div className="mt-3 flex items-center justify-between">
          <p className="text-sm font-bold text-[#A0845C]">
            {typeof price === "number" ? `${price.toLocaleString("fr-FR")} FCFA` : price}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
