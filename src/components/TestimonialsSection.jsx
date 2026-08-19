import { Star, CheckCircle } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Amina B.",
    handle: "@amabauty",
    text: "Les soins visage sont incroyables ! Ma peau n'a jamais été aussi éclatante. Je recommande à 100%.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop",
    verified: true,
  },
  {
    name: "Fatima S.",
    handle: "@fatimastyle",
    text: "Les parfums sont sublimes et le service client est exceptionnel. Merci Lim'Elle !",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=100&auto=format&fit=crop",
    verified: true,
  },
  {
    name: "Khadija M.",
    handle: "@khadija_glow",
    text: "La qualité des produits est au rendez-vous. J'ai déjà recommandé à toutes mes amies.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop",
    verified: true,
  },
  {
    name: "Aïcha D.",
    handle: "@aicha_niamey",
    text: "Livraison rapide et produits conformes. C'est exactement ce que je cherchais pour ma routine beauté.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&auto=format&fit=crop",
    verified: true,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="px-5 pt-20 md:pt-32">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-3xl font-medium tracking-tight text-black md:text-4xl">
          Ce que disent nos clientes
        </h2>
        <p className="mt-4 text-center text-base text-black/50 max-w-md mx-auto">
          Découvrez pourquoi nos clientes nous font confiance pour leur routine beauté.
        </p>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="rounded-xl border border-black/10 p-4"
            >
              <div className="flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="h-11 w-11 rounded-full object-cover"
                  loading="lazy"
                />
                <div>
                  <h3 className="flex items-center gap-2 text-sm font-medium text-black">
                    {t.name}
                    {t.verified && (
                      <CheckCircle size={14} className="text-[#173F34]" fill="currentColor" stroke="white" />
                    )}
                  </h3>
                  <p className="text-xs text-black/50">{t.handle}</p>
                </div>
              </div>
              <div className="mt-3 flex gap-0.5 text-[#D4A03E]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <p className="mt-3 text-sm leading-6 text-black/60">{t.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
