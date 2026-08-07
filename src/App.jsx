import React, { useMemo, useState } from "react";
import { MessageCircle, Plane, Search, PackageCheck } from "lucide-react";
import { LIMELLE_CONFIG } from "./config/limelle";
import { CATEGORIES, PRODUCTS, FAQS } from "./data/catalog";
import { calculateTransport } from "./utils/limelle";
import WhatsAppButton from "./components/WhatsAppButton";
import CatalogueSection from "./components/CatalogueSection";
import TransportEstimator from "./components/TransportEstimator";
import FaqList from "./components/FaqList";

const WA_TEXT = "Bonjour, je viens du site Lim'Elle 🌸";

export default function App() {
  const [filter, setFilter] = useState("all");
  const [kg, setKg] = useState(LIMELLE_CONFIG.transport.minimumWeightKg);
  const [faq, setFaq] = useState(0);

  const products = useMemo(
    () => filter === "all" ? PRODUCTS : PRODUCTS.filter((product) => product.cat === filter),
    [filter]
  );

  const transportEstimate = calculateTransport(kg);

  return (
    <main className="min-h-screen bg-[#F5F0E6] text-[#2B2620]">
      <header className="sticky top-0 z-40 border-b border-black/10 bg-[#F5F0E6]/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
          <div>
            <div className="text-2xl font-semibold">Lim'Elle</div>
            <div className="text-[10px] font-bold tracking-[.14em] text-[#5B5348]">SHOPPING DAKAR → NIAMEY</div>
          </div>
          <WhatsAppButton className="bg-[#3FBF63] text-white" message={WA_TEXT}>WhatsApp</WhatsAppButton>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-5 pb-14 pt-16">
        <div className="max-w-3xl">
          <span className="inline-flex rounded-full bg-[#EBE3D2] px-4 py-2 text-xs font-bold">✈️ Dakar → Niamey</span>
          <h1 className="mt-5 text-5xl font-semibold leading-tight md:text-6xl">Tu cherches à Niamey. Lim'Elle trouve à Dakar.</h1>
          <p className="mt-5 max-w-2xl text-lg leading-7 text-[#5B5348]">Vêtements, chaussures et produits féminins recherchés à Dakar puis acheminés vers Niamey. Le prix global est confirmé avant ton paiement.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#catalogue" className="rounded-full bg-[#C1613F] px-6 py-3 font-bold text-white">Voir le catalogue</a>
            <WhatsAppButton message={WA_TEXT} className="bg-[#3FBF63] text-white">Parler à Lim'Elle</WhatsAppButton>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-3 px-5 pb-14 md:grid-cols-4">
        {[
          [Search, "Tu recherches", "Choisis un article ou envoie une demande."],
          [MessageCircle, "On confirme", "Disponibilité et prix global avant paiement."],
          [PackageCheck, "On achète", "L'approvisionnement est effectué à Dakar."],
          [Plane, "On expédie", "Le colis rejoint Niamey par GP ou particulier."],
        ].map(([Icon, title, text]) => (
          <div key={title} className="rounded-3xl bg-[#EBE3D2] p-5">
            <Icon size={22} className="text-[#A6512F]" />
            <h2 className="mt-4 font-bold">{title}</h2>
            <p className="mt-2 text-sm leading-5 text-[#5B5348]">{text}</p>
          </div>
        ))}
      </section>

      <CatalogueSection categories={CATEGORIES} products={products} activeCategory={filter} onCategoryChange={setFilter} />
      <TransportEstimator config={LIMELLE_CONFIG} weight={kg} onWeightChange={setKg} />

      <section className="mx-auto max-w-5xl px-5 pb-16">
        <div className="rounded-3xl bg-[#EBE3D2] p-7">
          <span className="text-xs font-bold uppercase tracking-[.16em] text-[#5B5348]">Sur-mesure</span>
          <h2 className="mt-2 text-3xl font-semibold">Tu cherches un produit précis ?</h2>
          <p className="mt-3 max-w-2xl text-[#5B5348]">Envoie une photo, une description, une taille, une couleur et ton budget. Lim'Elle vérifie la disponibilité à Dakar puis te propose un prix global.</p>
          <WhatsAppButton className="mt-6 bg-[#3FBF63] text-white" message="Bonjour Lim'Elle 🌸\nJ'ai une demande sur-mesure :\n\nProduit recherché :\nTaille :\nCouleur :\nBudget :">Faire une demande</WhatsAppButton>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 pb-16">
        <h2 className="text-3xl font-semibold">Questions fréquentes</h2>
        <FaqList items={FAQS} activeIndex={faq} onToggle={setFaq} />
      </section>

      <footer className="bg-[#2B2620] px-5 py-10 text-white">
        <div className="mx-auto max-w-5xl">
          <div className="text-2xl font-semibold">Lim'Elle</div>
          <p className="mt-2 text-sm text-white/70">Ton shopping à Dakar, livré à Niamey.</p>
          <p className="mt-5 text-sm">WhatsApp : +227 99 20 57 39</p>
          <p className="mt-2 text-xs text-white/50">© 2026 Lim'Elle. Les prix affichés restent indicatifs jusqu'à confirmation de disponibilité.</p>
        </div>
      </footer>
    </main>
  );
}
