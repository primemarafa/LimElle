export default function CategoryFilter({ categories, activeCategory, onChange }) {
  return (
    <div className="mb-7 flex flex-wrap gap-2">
      <button onClick={() => onChange("all")} className={`rounded-full px-4 py-2 text-sm font-bold ${activeCategory === "all" ? "bg-[#96654C] text-white" : "bg-[#F0DFD8]"}`}>
        Tout
      </button>
      {categories.filter((category) => category.id !== "surmesure").map((category) => (
        <button key={category.id} onClick={() => onChange(category.id)} className={`rounded-full px-4 py-2 text-sm font-bold ${activeCategory === category.id ? "bg-[#96654C] text-white" : "bg-[#F0DFD8]"}`}>
          {category.emoji} {category.label}
        </button>
      ))}
    </div>
  );
}
