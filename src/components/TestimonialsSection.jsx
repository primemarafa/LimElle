import { Star, CheckCircle } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Amina B.",
    handle: "Niamey, Plateau",
    text: "Le voile lèche brodé et l'ensemble commandés à Dakar sont magnifiques ! Finitions impeccables et livraison reçue à temps pour mon mariage.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop",
    verified: true,
  },
  {
    name: "Fatima S.",
    handle: "Niamey, Koira Kano",
    text: "Le service de personal shopping est au top. J'ai envoyé ma recherche de tissu Wax, Lim'Elle a trouvé exactement le motif que je voulais à Dakar.",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=100&auto=format&fit=crop",
    verified: true,
  },
  {
    name: "Khadija M.",
    handle: "Niamey, Yantala",
    text: "Sandales et pochette de cérémonie conformes aux photos. Tarif transport clair et équipe WhatsApp très réactive.",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=100&auto=format&fit=crop",
    verified: true,
  },
  {
    name: "Aïcha D.",
    handle: "Niamey, Recasement",
    text: "Deuxième commande chez Lim'Elle et toujours aussi satisfaite. C'est rassurant de pouvoir confirmer le prix avant de payer.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&auto=format&fit=crop",
    verified: true,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="px-5 py-20 md:py-28 bg-[#F8F4EC]">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[.22em] text-[#B58A4A]">Témoignages</p>
          <h2 className="mt-3 text-3xl font-medium tracking-tight text-[#2B2620] md:text-4xl">
            Ce que disent nos clientes
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-[#8A7A6A]">
            Découvrez les retours de nos clientes à Niamey après leurs commandes à Dakar.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="rounded-2xl border border-[#E8E0D4] bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="h-11 w-11 rounded-full object-cover border border-[#E8E0D4]"
                  loading="lazy"
                />
                <div>
                  <h3 className="flex items-center gap-1.5 text-sm font-semibold text-[#2B2620]">
                    {t.name}
                    {t.verified && (
                      <CheckCircle size={14} className="text-[#1B3A2D]" fill="#1B3A2D" stroke="white" />
                    )}
                  </h3>
                  <p className="text-xs text-[#8A7A6A]">{t.handle}</p>
                </div>
              </div>
              <div className="mt-3 flex gap-0.5 text-[#B58A4A]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={13} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <p className="mt-3 text-xs leading-relaxed text-[#6A5A4A]">{t.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
