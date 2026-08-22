import { Leaf, Award, Truck, HeartHandshake, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const TRUST_FEATURES = [
  {
    icon: Leaf,
    label: "Ingrédients naturels",
    description: "Sains et respectueux de votre peau",
  },
  {
    icon: Award,
    label: "Qualité premium",
    description: "Sélection rigoureuse des meilleurs produits",
  },
  {
    icon: Truck,
    label: "Livraison rapide",
    description: "Partout au Sénégal et au Niger",
  },
  {
    icon: HeartHandshake,
    label: "Service attentionné",
    description: "À votre écoute tous les jours",
  },
];

export default function PremiumHero({ onCatalogue, whatsappNumber }) {
  return (
    <section
      aria-label="Bienvenue"
      className="relative min-h-[720px] overflow-hidden bg-[#FDFBF7] md:min-h-[800px]"
    >
      {/* Image de fond avec dégradé */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-portrait.jpg"
          alt=""
          className="h-full w-full object-cover object-[center_20%]"
          loading="eager"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FDFBF7] via-[#FDFBF7]/90 to-transparent" />
      </div>

      {/* Contenu principal */}
      <div className="relative z-10 mx-auto flex min-h-[720px] max-w-7xl items-center px-6 py-20 md:min-h-[800px] md:px-12">
        <div className="w-full max-w-2xl pt-16 md:pt-0">
          {/* Tagline */}
          <p className="mb-6 text-xs font-bold uppercase tracking-[0.3em] text-[#B58A4A] animate-fade-up">
            L'élégance au féminin
          </p>

          {/* Titre principal */}
          <h1 className="mb-8 text-5xl font-medium leading-[1.05] tracking-tight text-[#2B2620] md:text-6xl lg:text-7xl animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <span className="block font-serif italic text-[#2B2620]">
              Votre beauté,
            </span>
            <span className="block font-serif text-[#B58A4A]">
              notre priorité.
            </span>
          </h1>

          {/* Description */}
          <p className="mb-10 max-w-lg text-base leading-relaxed text-[#6A5A4A] md:text-lg animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Découvrez des produits soigneusement sélectionnés pour sublimer
            votre éclat naturel chaque jour.
          </p>

          {/* Boutons CTA */}
          <div className="mb-12 flex flex-wrap items-center gap-4 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <button
              type="button"
              onClick={onCatalogue}
              className="group inline-flex items-center gap-2 rounded-full bg-[#1B3A2D] px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-[#1B3A2D]/20 transition-all duration-300 hover:bg-[#142D24] hover:shadow-xl hover:-translate-y-0.5"
            >
              Découvrir la boutique
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>

            <a
              href={`https://wa.me/${whatsappNumber}?text=Bonjour%2C%20je%20viens%20du%20site%20Lim%27Elle%20%F0%9F%8C%B8`}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border-2 border-[#1B3A2D]/30 bg-transparent px-8 py-4 text-sm font-semibold text-[#1B3A2D] transition-all duration-300 hover:border-[#1B3A2D] hover:bg-[#1B3A2D] hover:text-white hover:-translate-y-0.5"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Commander sur WhatsApp
            </a>
          </div>

          {/* Badges d'info rapide */}
          <div className="flex flex-wrap gap-6 text-sm animate-fade-up" style={{ animationDelay: "0.4s" }}>
            <div className="flex items-center gap-2 text-[#6A5A4A]">
              <Truck size={18} className="text-[#B58A4A]" strokeWidth={1.5} />
              <div>
                <span className="font-semibold text-[#2B2620]">Livraison rapide</span>
                <span className="mx-1 text-[#B58A4A]">·</span>
                <span>Sénégal & Niger</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-[#6A5A4A]">
              <Award size={18} className="text-[#B58A4A]" strokeWidth={1.5} />
              <div>
                <span className="font-semibold text-[#2B2620]">Expédié depuis</span>
                <span className="mx-1 text-[#B58A4A]">·</span>
                <span>Dakar · Niamey</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust strip en bas */}
      <div className="relative z-20 bg-[#1B3A2D] px-6 py-10 md:py-12">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
          {TRUST_FEATURES.map(({ icon: Icon, label, description }) => (
            <div
              key={label}
              className="group flex flex-col items-center gap-3 text-center"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-[#C8B99A] transition-all duration-300 group-hover:bg-white/20 group-hover:scale-110">
                <Icon size={22} strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{label}</p>
                <p className="mt-1 text-xs leading-relaxed text-white/70">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
