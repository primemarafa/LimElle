import React, { useMemo, useState } from "react";
import { MessageCircle, Plane, Search, PackageCheck, ChevronDown } from "lucide-react";
import { LIMELLE_CONFIG } from "./config/limelle";
import { CATEGORIES, PRODUCTS, FAQS } from "./data/catalog";
import { buildWhatsAppLink, formatXof, calculateTransport, buildGlobalPrice } from "./utils/limelle";

const WA_TEXT = "Bonjour, je viens du site Lim'Elle 🌸";

function WaButton({ children, message = WA_TEXT, className = "" }) {
  return (
    <a
      href={buildWhatsAppLink(message)}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 font-bold ${className}`}
    >
      <MessageCircle size={18} />
      {children}
    </a>
  );
}

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
          <WaButton className="bg-[#3FBF63] text-white">WhatsApp</WaButton>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-5 pb-14 pt-16">
        <div className="max-w-3xl">
          <span className="inline-flex rounded-full bg-[#EBE3D2] px-4 py-2 text-xs font-bold">✈️ Dakar → Niamey</span>
          <h1 className="mt-5 text-5xl font-semibold leading-tight md:text-6xl">Tu cherches à Niamey. Lim'Elle trouve à Dakar.</h1>
          <p className="mt-5 max-w-2xl text-lg leading-7 text-[#5B5348]">
            Vêtements, chaussures et produits féminins recherchés à Dakar puis acheminés vers Niamey. Le prix global est confirmé avant ton paiement.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#catalogue" className="rounded-full bg-[#C1613F] px-6 py-3 font-bold text-white">Voir le catalogue</a>
            <WaButton message={WA_TEXT} className="bg-[#3FBF63] text-white">Parler à Lim'Elle</WaButton>
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

      <section id="catalogue" className="mx-auto max-w-5xl px-5 pb-16">
        <div className="mb-6">
          <span className="text-xs font-bold uppercase tracking-[.18em] text-[#5B5348]">Catalogue</span>
          <h2 className="mt-2 text-3xl font-semibold">Les produits recherchés à Dakar</h2>
        </div>

        <div className="mb-7 flex flex-wrap gap-2">
          <button onClick={() => setFilter("all")} className={`rounded-full px-4 py-2 text-sm font-bold ${filter === "all" ? "bg-[#C1613F] text-white" : "bg-[#EBE3D2]"}`}>Tout</button>
          {CATEGORIES.filter((category) => category.id !== "surmesure").map((category) => (
            <button key={category.id} onClick={() => setFilter(category.id)} className={`rounded-full px-4 py-2 text-sm font-bold ${filter === category.id ? "bg-[#C1613F] text-white" : "bg-[#EBE3D2]"}`}>
              {category.emoji} {category.label}
            </button>
          ))}
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => {
            const globalPrice = buildGlobalPrice({ productPrice: product.price, weightKg: product.weight });
            return (
              <article key={product.id} className="overflow-hidden rounded-3xl bg-white">
                <img src={product.img} alt={product.name} className="aspect-[3/4] w-full object-cover" loading="lazy" />
                <div className="p-5">
                  <div className="mb-2 inline-flex rounded-full bg-[#EBE3D2] px-3 py-1 text-xs font-bold">{product.badge}</div>
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="mt-2 text-sm text-[#5B5348]">Poids estimé : {product.weight} kg</p>
                  <p className="mt-3 text-lg font-extrabold text-[#A6512F]">À partir de {formatXof(globalPrice)}</p>
                  <p className="mt-1 text-xs leading-5 text-[#5B5348]">Prix indicatif. Le prix final est confirmé après vérification de la disponibilité.</p>
                  <WaButton className="mt-4 w-full bg-[#3FBF63] text-white" message={`Bonjour Lim'Elle 🌸\nJe suis intéressée par : ${product.name}\nPrix indicatif : ${formatXof(globalPrice)}\nPouvez-vous confirmer la disponibilité et le prix final ?`}>Vérifier ce produit</WaButton>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 pb-16">
        <div className="rounded-3xl bg-[#C1613F] p-7 text-white md:p-10">
          <span className="text-xs font-bold uppercase tracking-[.16em]">Estimation transport</span>
          <h2 className="mt-2 text-3xl font-semibold">Prépare ton budget d'envoi</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/90">Base de travail : {formatXof(LIMELLE_CONFIG.transport.ratePerKg)} par kg, avec un minimum de {LIMELLE_CONFIG.transport.minimumWeightKg} kg. Le montant exact est confirmé avant paiement.</p>
          <div className="mt-7 flex items-center justify-between gap-5">
            <label htmlFor="weight" className="font-bold">Poids estimé</label>
            <strong className="text-3xl">{kg.toFixed(1)} kg</strong>
          </div>
          <input id="weight" type="range" min={LIMELLE_CONFIG.transport.minimumWeightKg} max="10" step="0.1" value={kg} onChange={(event) => setKg(Number(event.target.value))} className="mt-4 w-full" />
          <div className="mt-6 rounded-2xl bg-white/15 p-5">
            <div className="text-sm text-white/80">Transport indicatif</div>
            <div className="mt-1 text-3xl font-semibold">{formatXof(transportEstimate)}</div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 pb-16">
        <div className="rounded-3xl bg-[#EBE3D2] p-7">
          <span className="text-xs font-bold uppercase tracking-[.16em] text-[#5B5348]">Sur-mesure</span>
          <h2 className="mt-2 text-3xl font-semibold">Tu cherches un produit précis ?</h2>
          <p className="mt-3 max-w-2xl text-[#5B5348]">Envoie une photo, une description, une taille, une couleur et ton budget. Lim'Elle vérifie la disponibilité à Dakar puis te propose un prix global.</p>
          <WaButton className="mt-6 bg-[#3FBF63] text-white" message="Bonjour Lim'Elle 🌸\nJ'ai une demande sur-mesure :\n\nProduit recherché :\nTaille :\nCouleur :\nBudget :">Faire une demande</WaButton>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 pb-16">
        <h2 className="text-3xl font-semibold">Questions fréquentes</h2>
        <div className="mt-5 divide-y divide-black/10 rounded-3xl bg-white px-5">
          {FAQS.map((item, index) => (
            <div key={item.q} className="py-5">
              <button className="flex w-full items-center justify-between gap-4 text-left font-bold" onClick={() => setFaq(faq === index ? -1 : index)}>
                {item.q}
                <ChevronDown size={18} className={faq === index ? "rotate-180" : ""} />
              </button>
              {faq === index && <p className="pt-3 text-sm leading-6 text-[#5B5348]">{item.a}</p>}
            </div>
          ))}
        </div>
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
