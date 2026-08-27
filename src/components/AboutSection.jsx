import { Heart, Sparkles, ShieldCheck, MapPin, Award } from "lucide-react";
import BrandLogo from "./BrandLogo";

export default function AboutSection() {
  return (
    <section id="apropos" aria-label="À propos de Lim'Elle" className="bg-[#F8F4EC] px-5 py-16 md:py-24 border-t border-[#E8E0D4] scroll-mt-20">
      <div className="mx-auto max-w-7xl">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[.24em] text-[#B58A4A]">Notre Histoire &amp; Vision</p>
          <h2 className="mt-2.5 font-serif text-3xl font-normal tracking-tight text-[#2B2620] md:text-4xl">
            L'Élégance au Féminin, Naturellement
          </h2>
          <div className="mx-auto mt-4 flex justify-center">
            <BrandLogo className="h-10 w-auto" />
          </div>
        </div>

        {/* 2-Column Story */}
        <div className="mt-12 grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          
          {/* Left Visual Banner */}
          <div className="relative lg:col-span-6">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl sm:aspect-[16/11]">
              <img
                src="/images/category-soins-corps.jpg"
                alt="Femme africaine moderne rayonnante avec Lim'Elle"
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#14261F]/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="rounded-full bg-[#B58A4A] px-3 py-1 text-[11px] font-semibold">
                  Maison Sahélienne de Beauté
                </span>
                <p className="mt-2 font-serif text-lg font-normal">
                  Célébrer la beauté authentique et l'éclat unique de chaque femme.
                </p>
              </div>
            </div>
          </div>

          {/* Right Text & Values */}
          <div className="space-y-6 text-[#6A5A4A] text-sm leading-relaxed lg:col-span-6">
            <h3 className="font-serif text-2xl font-normal text-[#2B2620]">
              Une marque née de la passion pour le précieux patrimoine végétal du Sahel.
            </h3>
            
            <p>
              Fondée avec la conviction que la beauté n'est pas un luxe inaccessible mais une célébration de soi, <strong className="text-[#14261F]">Lim'Elle</strong> propose des soins cosmétiques purs, des huiles précieuses et des fragrances d'exception rigoureusement sélectionnées.
            </p>
            
            <p>
              Du Sénégal au Niger, nous travaillons main dans la main avec des coopératives locales et des formulateurs passionnés pour extraire le meilleur du beurre de karité sauvage, des graines de baobab et des fleurs d'hibiscus dans le respect absolu de la nature et de votre peau.
            </p>

            {/* 3 Pillars */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#E8E0D4]">
              <div className="rounded-2xl bg-white p-4 border border-[#E8E0D4]/80 shadow-2xs">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#14261F] text-[#B58A4A]">
                  <Sparkles size={16} />
                </div>
                <h4 className="mt-3 font-semibold text-xs text-[#2B2620]">Formules Pures</h4>
                <p className="mt-1 text-[11px] text-[#8A7A6A]">100% actifs naturels et éco-responsables.</p>
              </div>

              <div className="rounded-2xl bg-white p-4 border border-[#E8E0D4]/80 shadow-2xs">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#14261F] text-[#B58A4A]">
                  <MapPin size={16} />
                </div>
                <h4 className="mt-3 font-semibold text-xs text-[#2B2620]">Ancrage Sahélien</h4>
                <p className="mt-1 text-[11px] text-[#8A7A6A]">Expédié avec amour depuis Dakar &amp; Niamey.</p>
              </div>

              <div className="rounded-2xl bg-white p-4 border border-[#E8E0D4]/80 shadow-2xs">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#14261F] text-[#B58A4A]">
                  <Award size={16} />
                </div>
                <h4 className="mt-3 font-semibold text-xs text-[#2B2620]">Excellence</h4>
                <p className="mt-1 text-[11px] text-[#8A7A6A]">Standards de qualité et finitions luxe.</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
