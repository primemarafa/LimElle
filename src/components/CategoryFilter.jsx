export default function CategoryFilter({ categories, activeCategory, onChange }) {
  return (
    <div className="mb-7 flex flex-wrap gap-2">
      <button onClick={() => onChange("all")} className={`rounded-full px-4 py-2 text-sm font-bold ${activeCategory === "all" ? "bg-[#B8753C] text-white" : "bg-[#EBE3D2]"}`}>
        Tout
      </button>
      {categories.filter((category) => category.id !== "surmesure").map((category) => (
        <button key={category.id} onClick={() => onChange(category.id)} className={`rounded-full px-4 py-2 text-sm font-bold ${activeCategory === category.id ? "bg-[#B8753C] text-white" : "bg-[#EBE3D2]"}`}>
          {category.emoji} {category.label}
        </button>
      ))}
    </div>
  );
}
