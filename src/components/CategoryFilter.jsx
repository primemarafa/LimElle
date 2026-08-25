import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function CategoryFilter({ categories, activeCategory, onCategoryChange }) {
  return (
    <div
      role="tablist"
      aria-label="Filtrer par catégorie"
      className="flex flex-wrap gap-2"
    >
      <Button
        variant={activeCategory === "all" ? "gold" : "outline"}
        size="sm"
        onClick={() => onCategoryChange("all")}
        role="tab"
        aria-selected={activeCategory === "all"}
      >
        Tout
      </Button>
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={activeCategory === category.id ? "gold" : "outline"}
          size="sm"
          onClick={() => onCategoryChange(category.id)}
          role="tab"
          aria-selected={activeCategory === category.id}
        >
          {category.label || category.name}
        </Button>
      ))}
    </div>
  );
}
