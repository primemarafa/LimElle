import { ChevronDown } from "lucide-react";

export default function FaqList({ items, activeIndex, onToggle }) {
  return (
    <div className="mt-5 divide-y divide-black/10 rounded-3xl bg-white px-5">
      {items.map((item, index) => (
        <div key={item.q} className="py-5">
          <button className="flex w-full items-center justify-between gap-4 text-left font-bold" onClick={() => onToggle(activeIndex === index ? -1 : index)}>
            {item.q}
            <ChevronDown size={18} className={activeIndex === index ? "rotate-180" : ""} />
          </button>
          {activeIndex === index && <p className="pt-3 text-sm leading-6 text-[#5B5348]">{item.a}</p>}
        </div>
      ))}
    </div>
  );
}
