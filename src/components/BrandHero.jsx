import WhatsAppButton from "./WhatsAppButton";

const HERO_IMAGE = "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1200&auto=format&fit=crop";

export default function BrandHero({ onCatalogue }) {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-16 pt-8 md:pt-12">
      <div className="grid overflow-hidden rounded-[2rem] bg-[#E9DFCE] shadow-sm md:grid-cols-[1.05fr_.95fr]">
        <div className="flex flex-col justify-center p-7 md:p-12 lg:p-14">
          <div className="mb-6 flex items-center gap-3 text-xs font-bold uppercase tracking-[.18em] text-[#6A5A4A]">
            <span className="h-px w-8 bg-[#A6512F]" /> Dakar → Niamey
          </div>
          <h1 className="max-w-xl text-5xl font-semibold leading-[1.02] tracking-[-.035em] md:text-6xl lg:text-7xl">
            Le style africain, choisi à Dakar.
          </h1>
          <p className="mt-6 max-w-lg text-base leading-7 text-[#5B5348] md:text-lg">
            Lim'Elle sélectionne des pièces féminines élégantes à Dakar et les achemine vers Niamey. Tu confirmes le prix global avant paiement.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button onClick={onCatalogue} className="rounded-full bg-[#A6512F] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#8F4529]">
              Voir la sélection
            </button>
            <WhatsAppButton message="Bonjour Lim'Elle 🌸\nJe cherche une pièce précise." className="bg-[#3FBF63] px-6 text-white">
              Demander une pièce
            </WhatsAppButton>
          </div>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs font-semibold text-[#6A5A4A]">
            <span>✓ Sélection à Dakar</span>
            <span>✓ Prix confirmé</span>
            <span>✓ Livraison Niamey</span>
          </div>
        </div>
        <div className="relative min-h-[430px] overflow-hidden md:min-h-[560px]">
          <img src={HERO_IMAGE} alt="Sélection mode féminine Lim'Elle" className="absolute inset-0 h-full w-full object-cover" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2B2620]/35 via-transparent to-transparent" />
          <div className="absolute bottom-5 left-5 rounded-2xl bg-white/90 px-4 py-3 backdrop-blur md:bottom-7 md:left-7">
            <p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#6A5A4A]">Édition Dakar</p>
            <p className="mt-1 text-sm font-semibold">Élégance contemporaine</p>
          </div>
        </div>
      </div>
    </section>
  );
}
