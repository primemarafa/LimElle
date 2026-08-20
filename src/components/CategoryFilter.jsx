export default function CategoryFilter({ categories, activeCategory, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onChange("all")}
        className={`rounded-full px-4 py-2 text-sm font-medium transition ${
          activeCategory === "all"
            ? "bg-[#A0845C] text-white"
            : "border border-[#E8E0D4] bg-white text-[#6A5A4A] hover:border-[#A0845C] hover:text-[#A0845C]"
        }`}
      >
        Tout
      </button>
      {categories.filter((c) => c.id !== "surmesure").map((category) => (
        <button
          key={category.id}
          onClick={() => onChange(category.id)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
            activeCategory === category.id
              ? "bg-[#A0845C] text-white"
              : "border border-[#E8E0D4] bg-white text-[#6A5A4A] hover:border-[#A0845C] hover:text-[#A0845C]"
          }`}
        >
          {category.emoji} {category.label}
        </button>
      ))}
    </div>
  );
}
