import { Sparkles, Leaf, Droplets, Sun } from "lucide-react";

const INGREDIENTS = [
  {
    name: "Beurre de Karité Sauvage",
    origin: "Afrique de l'Ouest",
    role: "Nutrition & Régénération",
    description: "Riche en acides gras essentiels et vitamines A & E, il nourrit intensément, apaise les tiraillements et redonne souplesse aux peaux sèches.",
    image: "/images/ingredient-karite.jpg",
    tag: "100% Brut & Pur",
  },
  {
    name: "Huile Noble de Baobab",
    origin: "Arbre de Vie Sahélien",
    role: "Éclat & Bouclier Protecteur",
    description: "Pressée à froid, cette huile précieuse favorise le renouvellement cellulaire, préserve l'élasticité et offre un fini soyeux non gras.",
    image: "/images/ingredient-baobab.jpg",
    tag: "Pressée à Froid",
  },
  {
    name: "Fleur d'Hibiscus Sabdariffa",
    origin: "Terres Sahéliennes",
    role: "Anti-Taches & Éclat Vivifiant",
    description: "Surnommée 'la plante botox végétale', sa haute teneur en AHA naturels et antioxydants unifie le teint et illumine l'éclat de la peau.",
    image: "/images/ingredient-hibiscus.jpg",
    tag: "Acides de Fruits Naturels",
  },
];

export default function BotanicalTreasuresSection() {
  return (
    <section aria-label="Nos trésors botaniques" className="bg-[#F8F4EC] px-5 py-16 md:py-24 border-t border-[#E8E0D4]">
      <div className="mx-auto max-w-7xl">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[.24em] text-[#B58A4A]">L'âme de nos formules</p>
          <h2 className="mt-2.5 font-serif text-3xl font-normal tracking-tight text-[#2B2620] md:text-4xl">
            Nos Trésors Botaniques du Sahel
          </h2>
          <p className="mt-3.5 text-sm leading-relaxed text-[#6A5A4A]">
            Des actifs millénaires récoltés dans le respect de la nature et transformés en soins d'exception pour sublimer votre carnation.
          </p>
        </div>

        {/* 3 Botanical Cards Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {INGREDIENTS.map((item) => (
            <div
              key={item.name}
              className="group overflow-hidden rounded-3xl border border-[#E8E0D4] bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Card Image */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#F4EFE6]">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 rounded-full bg-[#14261F]/90 px-3 py-1 text-[11px] font-semibold text-[#C8B99A] backdrop-blur-xs">
                  {item.tag}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-3.5">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#B58A4A]">
                  {item.origin}
                </span>
                <h3 className="mt-1 font-serif text-lg font-medium text-[#2B2620]">
                  {item.name}
                </h3>
                <p className="mt-1 text-xs font-semibold text-[#14261F]">
                  {item.role}
                </p>
                <p className="mt-2.5 text-xs leading-relaxed text-[#6A5A4A]">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
