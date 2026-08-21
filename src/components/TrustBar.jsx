import { Shield, MessageCircle } from "lucide-react";
import { LIMELLE_CONFIG } from "../config/limelle";

export default function TrustBar() {
  return (
    <section className="bg-[#1B3A2D] px-5 py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row md:gap-8">
        {/* Paiement sécurisé */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10">
            <Shield size={18} className="text-[#D4A96A]" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Paiement sécurisé</p>
            <p className="text-xs text-white/70">Vos transactions sont 100% sécurisées</p>
          </div>
        </div>

        {/* Clientes satisfaites */}
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {[
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=80&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=80&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=80&auto=format&fit=crop",
            ].map((src, i) => (
              <img
                key={i}
                src={src}
                alt=""
                className="h-9 w-9 rounded-full border-2 border-[#1B3A2D] object-cover"
                loading="lazy"
              />
            ))}
          </div>
          <div>
            <p className="text-sm font-semibold text-white">
              +{LIMELLE_CONFIG.stats.satisfiedClients} clientes satisfaites
            </p>
            <div className="mt-0.5 flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-[#D4A96A]">★</span>
              ))}
            </div>
          </div>
        </div>

        {/* WhatsApp */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#25D366]/20">
            <MessageCircle size={18} className="text-[#25D366]" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Besoin d'aide ?</p>
            <p className="text-xs text-white/70">
              Écrivez-nous sur WhatsApp, nous répondons rapidement.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
