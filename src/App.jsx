import React, { useEffect, useMemo, useState } from "react";
import { HeartHandshake, Menu, Search, ShoppingBag, ShieldCheck, Truck, UserRound, X, Gem, MessageCircle } from "lucide-react";
import { LIMELLE_CONFIG } from "./config/limelle";
import { CATEGORIES, FAQS } from "./data/catalog";
import { api } from "./services/api";
import { normalizeProduct } from "./utils/normalizeProduct";
import WhatsAppButton from "./components/WhatsAppButton";
import BrandHero from "./components/BrandHero";
import CatalogueSection from "./components/CatalogueSection";
import TrustStrip from "./components/TrustStrip";
import TransportEstimator from "./components/TransportEstimator";
import FaqList from "./components/FaqList";
import ProductDetails from "./components/ProductDetails";
import CartDrawer from "./components/CartDrawer";
import OrderForm from "./components/OrderForm";
import OrderConfirmation from "./components/OrderConfirmation";

const WA_TEXT = "Bonjour, je viens du site Lim'Elle 🌸";
const cartKey = (product) => `${product.id}::${product.selectedSize ?? "Unique"}::${product.selectedColor ?? "Standard"}`;

export default function App() {
  const [filter, setFilter] = useState("all");
  const [kg, setKg] = useState(LIMELLE_CONFIG.transport.minimumWeightKg);
  const [faq, setFaq] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [catalogError, setCatalogError] = useState("");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const [order, setOrder] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let active = true;
    api.products()
      .then((payload) => { if (active) setProducts(Array.isArray(payload.products) ? payload.products.map(normalizeProduct) : []); })
      .catch((error) => { if (active) setCatalogError(error.message || "Impossible de charger le catalogue."); });
    return () => { active = false; };
  }, []);

  const filteredProducts = useMemo(() => filter === "all" ? products : products.filter((product) => product.cat === filter), [filter, products]);
  const addToCart = (product, quantity = 1) => {
    setCart((current) => {
      const key = cartKey(product);
      const existing = current.find((item) => cartKey(item.product) === key);
      if (existing) return current.map((item) => cartKey(item.product) === key ? { ...item, quantity: item.quantity + quantity } : item);
      return [...current, { product, quantity }];
    });
    setCartOpen(true);
    setSelectedProduct(null);
  };
  const updateQuantity = (key, quantity) => setCart((current) => current.map((item) => cartKey(item.product) === key ? { ...item, quantity } : item));
  const removeFromCart = (key) => setCart((current) => current.filter((item) => cartKey(item.product) !== key));
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const startCheckout = () => { setCartOpen(false); setCheckout(true); };
  const completeOrder = (nextOrder) => { setOrder(nextOrder); setCheckout(false); setCart([]); };
  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  if (order) return <main className="min-h-screen bg-[#F8F3EA] text-[#2B2620]"><OrderConfirmation order={order} onDone={() => setOrder(null)} /></main>;
  if (checkout) return <main className="min-h-screen bg-[#F8F3EA] text-[#2B2620]"><OrderForm items={cart} onBack={() => setCheckout(false)} onComplete={completeOrder}/></main>;

  return (
    <main className="min-h-screen bg-[#F8F3EA] text-[#2B2620]">
      <header className="sticky top-0 z-50 border-b border-[#173F34]/10 bg-[#F8F3EA]/95 backdrop-blur">
        <div className="mx-auto flex h-[78px] max-w-7xl items-center justify-between px-5 lg:px-8">
          <button onClick={() => scrollTo("accueil")} className="text-left">
            <div className="font-serif text-3xl leading-none tracking-[-.04em] text-[#173F34]">Lim'Elle <span className="font-normal text-[#B8753C]">♢</span></div>
            <div className="mt-1 text-[9px] font-semibold tracking-[.12em] text-[#403A33]">L'ÉLÉGANCE AU FÉMININ</div>
          </button>

          <nav className="hidden items-center gap-8 lg:flex">
            <button onClick={() => scrollTo("accueil")} className="border-b-2 border-[#B8753C] pb-1 text-sm font-semibold text-[#173F34]">Accueil</button>
            <button onClick={() => scrollTo("catalogue")} className="text-sm font-semibold text-[#403A33] hover:text-[#173F34]">Boutique</button>
            <button onClick={() => scrollTo("catalogue")} className="text-sm font-semibold text-[#403A33] hover:text-[#173F34]">Catégories</button>
            <button onClick={() => scrollTo("a-propos")} className="text-sm font-semibold text-[#403A33] hover:text-[#173F34]">À propos</button>
            <button onClick={() => scrollTo("journal")} className="text-sm font-semibold text-[#403A33] hover:text-[#173F34]">Journal</button>
            <button onClick={() => scrollTo("contact")} className="text-sm font-semibold text-[#403A33] hover:text-[#173F34]">Contact</button>
          </nav>

          <div className="flex items-center gap-1.5">
            <button type="button" aria-label="Rechercher" onClick={() => scrollTo("catalogue")} className="hidden rounded-full p-2.5 text-[#173F34] hover:bg-white sm:block"><Search size={20} /></button>
            <button type="button" aria-label="Compte" onClick={() => scrollTo("contact")} className="hidden rounded-full p-2.5 text-[#173F34] hover:bg-white sm:block"><UserRound size={20} /></button>
            <button type="button" aria-label="Ouvrir le panier" onClick={() => setCartOpen(true)} className="relative rounded-full p-2.5 text-[#173F34] hover:bg-white">
              <ShoppingBag size={21} />
              {cartCount > 0 && <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#B8753C] px-1 text-[10px] font-bold text-white">{cartCount}</span>}
            </button>
            <button type="button" aria-label="Menu" onClick={() => setMenuOpen(true)} className="rounded-full bg-white p-2.5 text-[#173F34] lg:hidden"><Menu size={21} /></button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-[70] bg-[#F8F3EA] p-6 lg:hidden">
          <div className="flex items-center justify-between">
            <div className="font-serif text-3xl text-[#173F34]">Lim'Elle</div>
            <button type="button" onClick={() => setMenuOpen(false)} className="rounded-full bg-white p-3"><X size={20} /></button>
          </div>
          <nav className="mt-10 flex flex-col">
            {[['Accueil','accueil'],['Boutique','catalogue'],['Catégories','catalogue'],['À propos','a-propos'],['Journal','journal'],['Contact','contact']].map(([label,id]) => (
              <button key={`${label}-${id}`} onClick={() => scrollTo(id)} className="border-b border-[#173F34]/10 py-5 text-left font-serif text-2xl text-[#173F34]">{label}</button>
            ))}
          </nav>
        </div>
      )}

      {selectedProduct ? <ProductDetails product={selectedProduct} onBack={() => setSelectedProduct(null)} onAddToCart={addToCart} /> : <>
        <div id="accueil"><BrandHero onCatalogue={() => scrollTo("catalogue")} /></div>

        <section className="bg-[#123D32] text-white">
          <div className="mx-auto grid max-w-7xl divide-y divide-white/10 px-5 py-5 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4 lg:px-8">
            {[
              [HeartHandshake, "Ingrédients naturels", "Sains et respectueux de votre peau"],
              [Gem, "Qualité premium", "Sélection rigoureuse des meilleures pièces"],
              [Truck, "Livraison rapide", "Partout au Sénégal et au Niger"],
              [MessageCircle, "Service attentionné", "À votre écoute tous les jours"],
            ].map(([Icon, title, text]) => (
              <div key={title} className="flex items-center gap-4 px-4 py-4 lg:px-7">
                <Icon size={28} strokeWidth={1.5} className="shrink-0 text-[#C8894E]" />
                <div><p className="text-sm font-bold">{title}</p><p className="mt-1 text-xs leading-5 text-white/75">{text}</p></div>
              </div>
            ))}
          </div>
        </section>

        <div id="catalogue">
          {catalogError ? <section className="mx-auto max-w-7xl px-5 py-12"><div className="rounded-3xl bg-red-50 p-5 text-sm font-semibold text-red-700">{catalogError}</div></section> : <CatalogueSection categories={CATEGORIES} products={filteredProducts} activeCategory={filter} onCategoryChange={setFilter} onProductSelect={setSelectedProduct}/>} 
        </div>

        <TrustStrip />

        <section id="a-propos" className="bg-[#F8F3EA] px-5 py-14">
          <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1.1fr_.9fr] md:items-center">
            <div><p className="text-xs font-bold uppercase tracking-[.22em] text-[#B8753C]">Lim'Elle</p><h2 className="mt-3 font-serif text-4xl text-[#173F34]">Une sélection pensée entre Dakar et Niamey</h2><p className="mt-4 max-w-xl leading-7 text-[#403A33]">Une sélection féminine pensée entre Dakar et Niamey, avec une attention particulière portée au style, à la qualité et à la relation client.</p></div>
            <div className="grid grid-cols-2 gap-3"><div className="rounded-2xl bg-white p-5"><ShieldCheck className="text-[#B8753C]"/><p className="mt-4 font-bold text-[#173F34]">Paiement sécurisé</p><p className="mt-1 text-xs text-[#8A7765]">Transactions confirmées avant expédition.</p></div><div className="rounded-2xl bg-white p-5"><Truck className="text-[#B8753C]"/><p className="mt-4 font-bold text-[#173F34]">Dakar → Niamey</p><p className="mt-1 text-xs text-[#8A7765]">Expédition organisée selon la disponibilité.</p></div></div>
          </div>
        </section>

        <section id="journal" className="bg-[#F8F3EA] px-5 py-14">
          <div className="mx-auto max-w-7xl">
            <p className="text-center text-xs font-bold uppercase tracking-[.22em] text-[#B8753C]">Nos services</p>
            <h2 className="mt-2 text-center font-serif text-4xl text-[#173F34]">Un accompagnement pensé pour vous</h2>
            <TransportEstimator config={LIMELLE_CONFIG} weight={kg} onWeightChange={setKg}/>
            <div className="mt-8 rounded-[2rem] bg-[#173F34] p-7 text-white md:p-10">
              <p className="text-xs font-bold uppercase tracking-[.2em] text-[#C8894E]">Sur-mesure</p>
              <h3 className="mt-3 font-serif text-3xl md:text-4xl">Une pièce précise en tête ?</h3>
              <p className="mt-4 max-w-2xl leading-7 text-white/75">Envoie une photo, une taille, une couleur et ton budget. Lim'Elle recherche la pièce à Dakar puis confirme le prix global.</p>
              <WhatsAppButton className="mt-7 bg-white text-[#173F34]" message="Bonjour Lim'Elle 🌸\nJ'ai une demande sur-mesure :\n\nProduit recherché :\nTaille :\nCouleur :\nBudget :">Faire une demande</WhatsAppButton>
            </div>
          </div>
        </section>

        <section id="contact" className="bg-[#F8F3EA] px-5 pb-16">
          <div className="mx-auto max-w-7xl"><p className="text-xs font-bold uppercase tracking-[.22em] text-[#B8753C]">Besoin d'aide ?</p><h2 className="mt-2 font-serif text-4xl text-[#173F34]">Questions fréquentes</h2><FaqList items={FAQS} activeIndex={faq} onToggle={setFaq}/></div>
        </section>
      </>}

      <section className="bg-[#123D32] px-5 py-8 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 sm:flex-row">
          <p className="font-serif text-xl sm:text-2xl">La beauté n'est pas un luxe, c'est votre droit.</p>
          <button onClick={() => scrollTo("catalogue")} className="shrink-0 rounded-xl border border-[#C8894E] px-6 py-3 text-sm font-bold text-white">Découvrir la boutique <span className="ml-2">→</span></button>
        </div>
      </section>

      <footer className="bg-[#123D32] px-5 py-10 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-7 md:flex-row md:items-center md:justify-between">
          <div><div className="font-serif text-3xl">Lim'Elle</div><p className="mt-2 text-sm text-white/70">L'élégance au féminin, naturellement.</p></div>
          <div className="flex flex-col gap-3 sm:flex-row"><WhatsAppButton message={WA_TEXT} className="border border-white/40 bg-transparent text-white">Nous écrire sur WhatsApp</WhatsAppButton><button onClick={() => scrollTo("catalogue")} className="rounded-xl border border-[#C8894E] px-6 py-3 text-sm font-bold text-white">Découvrir la boutique <span className="ml-2">→</span></button></div>
        </div>
        <div className="mx-auto mt-8 max-w-7xl border-t border-white/10 pt-5 text-xs text-white/50">© 2026 Lim'Elle. Tous droits réservés.</div>
      </footer>

      <WhatsAppButton className="fixed bottom-5 right-5 z-40 h-14 w-14 rounded-full bg-[#3FBF63] p-0 text-white shadow-xl" message={WA_TEXT} aria-label="WhatsApp"><MessageCircle size={25}/></WhatsAppButton>
      {cartOpen && <CartDrawer items={cart} onClose={() => setCartOpen(false)} onQuantityChange={updateQuantity} onRemove={removeFromCart} onCheckout={startCheckout}/>} 
    </main>
  );
}
