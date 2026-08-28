import { ShieldCheck, MapPin, Award } from "lucide-react";
import BrandLogo from "./BrandLogo";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function AboutSection() {
  const revealRef = useScrollReveal();

  return (
    <section id="apropos" aria-label="À propos de Lim'Elle" className="bg-[#FAFAF9] px-5 py-20 md:py-28 scroll-mt-20">
      <div className="mx-auto max-w-7xl" ref={revealRef}>

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto reveal">
          <p className="text-[11px] font-semibold uppercase tracking-[.28em] text-[#A16207]">Notre Histoire & Vision</p>
          <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-[#1C1917] md:text-[2.5rem]">
            L'Élégance au Féminin, Naturellement
          </h2>
          <div className="mx-auto mt-5 flex justify-center">
            <BrandLogo className="h-10 w-auto" />
          </div>
        </div>

        {/* 2-Column Story */}
        <div className="mt-14 grid items-center gap-12 lg:grid-cols-12 lg:gap-16">

          {/* Left Visual */}
          <div className="relative lg:col-span-6 reveal">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.5rem] sm:aspect-[16/11]">
              <img
                src="/images/category-pagnes-leche.jpg"
                alt="Femme africaine moderne avec pagnes et accessoires Lim'Elle"
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C0A09]/75 via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="rounded-lg bg-[#A16207] px-3 py-1.5 text-[11px] font-semibold">
                  Personal Shopping Dakar ➔ Niamey
                </span>
                <p className="mt-2.5 font-serif text-lg font-medium">
                  L'élégance du Bazin, la noblesse du Lèche et le raffinement des parures.
                </p>
              </div>
            </div>
          </div>

          {/* Right Text & Values */}
          <div className="space-y-6 text-[#57534E] text-sm leading-relaxed lg:col-span-6 reveal">
            <h3 className="font-serif text-2xl font-semibold text-[#1C1917]">
              Une passerelle d'exception entre les marchés de Dakar et les femmes de Niamey.
            </h3>

            <p>
              Fondée avec la passion du beau et de l'élégance africaine, <strong className="text-[#1C1917]">Lim'Elle</strong> déniche pour vous les plus beaux tissus (Bazin Getzner brodé, Lèche traditionnel tissé main), des chaussures d'ateliers en cuir véritable, des bijoux filigranes dorés et une maroquinerie d'exception.
            </p>

            <p>
              Directement sourcés auprès des meilleurs artisans et marchands de Dakar, vos articles sont vérifiés, soigneusement emballés et acheminés à Niamey en fret sécurisé avec un suivi personnalisé.
            </p>

            {/* 3 Pillars */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-[#E7E5E4]">
              <div className="rounded-[1.25rem] bg-white p-5 border border-[#E7E5E4] shadow-sm">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1C1917] text-[#D4A853]">
                  <ShieldCheck size={16} />
                </div>
                <h4 className="mt-3.5 font-semibold text-xs text-[#1C1917]">Authenticité</h4>
                <p className="mt-1 text-[11px] text-[#78716C]">Textiles et accessoires vérifiés et sourcés en direct.</p>
              </div>

              <div className="rounded-[1.25rem] bg-white p-5 border border-[#E7E5E4] shadow-sm">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1C1917] text-[#D4A853]">
                  <MapPin size={16} />
                </div>
                <h4 className="mt-3.5 font-semibold text-xs text-[#1C1917]">Ancrage Sahélien</h4>
                <p className="mt-1 text-[11px] text-[#78716C]">Expédié avec soin depuis Dakar & Niamey.</p>
              </div>

              <div className="rounded-[1.25rem] bg-white p-5 border border-[#E7E5E4] shadow-sm">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1C1917] text-[#D4A853]">
                  <Award size={16} />
                </div>
                <h4 className="mt-3.5 font-semibold text-xs text-[#1C1917]">Excellence</h4>
                <p className="mt-1 text-[11px] text-[#78716C]">Standards de qualité artisanale et finitions luxe.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
