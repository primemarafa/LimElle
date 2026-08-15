import React, { useEffect, useMemo, useState, useRef } from "react";
import { HeartHandshake, Menu, Search, ShoppingBag, ShieldCheck, Truck, X, Gem, MessageCircle } from "lucide-react";
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
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSection, setActiveSection] = useState("accueil");

  const loadCatalog = () => {
    setCatalogError("");
    let active = true;
    const attempt = (retriesLeft) => {
      api.products()
        .then((payload) => { if (active) setProducts(Array.isArray(payload.products) ? payload.products.map(normalizeProduct) : []); })
        .catch((error) => {
          if (!active) return;
          // L'API (tier gratuit Render) peut être en veille et mettre 30-50s à répondre :
          // on retente automatiquement avant d'afficher une erreur définitive.
          if (retriesLeft > 0) { setTimeout(() => active && attempt(retriesLeft - 1), 4000); return; }
          setCatalogError(error.message || "Impossible de charger le catalogue.");
        });
    };
    attempt(3);
    return () => { active = false; };
  };

  useEffect(() => loadCatalog(), []);

  const filteredProducts = useMemo(() => {
    const byCategory = filter === "all" ? products : products.filter((product) => product.cat === filter);
    const term = searchTerm.trim().toLowerCase();
    if (!term) return byCategory;
    return byCategory.filter((product) => product.name?.toLowerCase().includes(term) || product.description?.toLowerCase().includes(term));
  }, [filter, products, searchTerm]);
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
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const openCategories = () => { setFilter("all"); scrollTo("categories"); };
  const openBoutique = () => { setFilter("all"); scrollTo("products"); };

  useEffect(() => {
    const ids = ["accueil", "categories", "products", "a-propos", "services", "contact"];
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (sections.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveSection(visible[0].target.id);
      },
      { rootMargin: "-84px 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [products]);

  const navLinkClass = (id) => `text-sm font-semibold transition ${activeSection === id ? "border-b-2 border-[#B8753C] pb-1 text-[#173F34]" : "text-[#403A33] hover:text-[#173F34]"}`;

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
            <button onClick={() => scrollTo("accueil")} className={navLinkClass("accueil")}>Accueil</button>
            <button onClick={openBoutique} className={navLinkClass("products")}>Boutique</button>
            <button onClick={openCategories} className={navLinkClass("categories")}>Catégories</button>
            <button onClick={() => scrollTo("a-propos")} className={navLinkClass("a-propos")}>À propos</button>
            <button onClick={() => scrollTo("services")} className={navLinkClass("services")}>Services</button>
            <button onClick={() => scrollTo("contact")} className={navLinkClass("contact")}>Contact</button>
          </nav>
          <div className="flex items-center gap-1.5">
            <button type="button" aria-label="Rechercher un produit" onClick={() => setSearchOpen((open) => !open)} className={`hidden rounded-full p-2.5 sm:block ${searchOpen ? "bg-white text-[#B8753C]" : "text-[#173F34] hover:bg-white"}`}><Search size={20} /></button>
            <button type="button" aria-label="Ouvrir le panier" onClick={() => setCartOpen(true)} className="relative rounded-full p-2.5 text-[#173F34] hover:bg-white">
              <ShoppingBag size={21} />
              {cartCount > 0 && <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#B8753C] px-1 text-[10px] font-bold text-white">{cartCount}</span>}
            </button>
            <button type="button" aria-label="Menu" onClick={() => setMenuOpen(true)} className="rounded-full bg-white p-2.5 text-[#173F34] lg:hidden"><Menu size={21} /></button>
          </div>
        </div>
      </header>

      {searchOpen && (
        <div className="border-b border-[#173F34]/10 bg-[#F8F3EA] px-5 py-3">
          <div className="mx-auto flex max-w-7xl items-center gap-3">
            <Search size={18} className="text-[#8A7765]" />
            <input
              autoFocus
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              onKeyDown={(event) => { if (event.key === "Enter") openBoutique(); }}
              placeholder="Rechercher un produit (nom, description...)"
              className="flex-1 bg-transparent text-sm text-[#173F34] placeholder:text-[#8A7765] focus:outline-none"
            />
            {searchTerm && <button type="button" onClick={() => setSearchTerm("")} className="text-xs font-bold text-[#8A7765]">Effacer</button>}
          </div>
        </div>
      )}

      {menuOpen && (
        <div className="fixed inset-0 z-[70] bg-[#F8F3EA] p-6 lg:hidden">
          <div className="flex items-center justify-between"><div className="font-serif text-3xl text-[#173F34]">Lim'Elle</div><button type="button" onClick={() => setMenuOpen(false)} className="rounded-full bg-white p-3"><X size={20} /></button></div>
          <nav className="mt-10 flex flex-col">
            <button onClick={() => scrollTo("accueil")} className={`border-b border-[#173F34]/10 py-5 text-left font-serif text-2xl ${activeSection === "accueil" ? "text-[#B8753C]" : "text-[#173F34]"}`}>Accueil</button>
            <button onClick={openBoutique} className={`border-b border-[#173F34]/10 py-5 text-left font-serif text-2xl ${activeSection === "products" ? "text-[#B8753C]" : "text-[#173F34]"}`}>Boutique</button>
            <button onClick={openCategories} className={`border-b border-[#173F34]/10 py-5 text-left font-serif text-2xl ${activeSection === "categories" ? "text-[#B8753C]" : "text-[#173F34]"}`}>Catégories</button>
            <button onClick={() => scrollTo("a-propos")} className={`border-b border-[#173F34]/10 py-5 text-left font-serif text-2xl ${activeSection === "a-propos" ? "text-[#B8753C]" : "text-[#173F34]"}`}>À propos</button>
            <button onClick={() => scrollTo("services")} className={`border-b border-[#173F34]/10 py-5 text-left font-serif text-2xl ${activeSection === "services" ? "text-[#B8753C]" : "text-[#173F34]"}`}>Services</button>
            <button onClick={() => scrollTo("contact")} className={`border-b border-[#173F34]/10 py-5 text-left font-serif text-2xl ${activeSection === "contact" ? "text-[#B8753C]" : "text-[#173F34]"}`}>Contact</button>
          </nav>
        </div>
      )}

      {selectedProduct ? <ProductDetails product={selectedProduct} onBack={() => setSelectedProduct(null)} onAddToCart={addToCart} /> : <>
        <div id="accueil"><BrandHero onCatalogue={openBoutique} /></div>
        <section className="bg-[#123D32] text-white">
          <div className="mx-auto grid max-w-7xl divide-y divide-white/10 px-5 py-5 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4 lg:px-8">
            {[[HeartHandshake,"Ingrédients naturels","Sains et respectueux de votre peau"],[Gem,"Qualité premium","Sélection rigoureuse des meilleures pièces"],[Truck,"Livraison rapide","Partout au Sénégal et au Niger"],[MessageCircle,"Service attentionné","À votre écoute tous les jours"]].map(([Icon,title,text]) => <div key={title} className="flex items-center gap-4 px-4 py-4 lg:px-7"><Icon size={28} strokeWidth={1.5} className="shrink-0 text-[#C8894E]"/><div><p className="text-sm font-bold">{title}</p><p className="mt-1 text-xs leading-5 text-white/75">{text}</p></div></div>)}
          </div>
        </section>
        <div id="catalogue-wrapper">
          {catalogError ? <section className="mx-auto max-w-7xl px-5 py-12"><div className="rounded-3xl bg-red-50 p-5 text-sm font-semibold text-red-700">{catalogError}<button type="button" onClick={loadCatalog} className="ml-4 inline-flex rounded-full bg-red-700 px-4 py-2 text-xs font-bold text-white transition hover:bg-red-800 active:scale-95">Réessayer</button></div></section> : <CatalogueSection categories={CATEGORIES} products={filteredProducts} activeCategory={filter} onCategoryChange={setFilter} onProductSelect={setSelectedProduct}/>} 
        </div>
        <TrustStrip />
        <section id="a-propos" className="bg-[#F8F3EA] px-5 py-20">
          <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.1fr_.9fr] md:items-center">
            <div><p className="text-xs font-bold uppercase tracking-[.22em] text-[#B8753C]">Lim'Elle</p><h2 className="mt-4 max-w-2xl font-serif text-4xl leading-tight text-[#173F34] md:text-5xl">Une sélection pensée entre Dakar et Niamey</h2><p className="mt-6 max-w-xl leading-7 text-[#403A33]">Une sélection féminine pensée entre Dakar et Niamey, avec une attention particulière portée au style, à la qualité et à la relation client.</p></div>
            <div className="grid grid-cols-2 gap-4"><div className="rounded-2xl bg-white p-6"><ShieldCheck className="text-[#B8753C]"/><p className="mt-5 font-bold text-[#173F34]">Paiement sécurisé</p><p className="mt-2 text-xs leading-5 text-[#8A7765]">Transactions confirmées avant expédition.</p></div><div className="rounded-2xl bg-white p-6"><Truck className="text-[#B8753C]"/><p className="mt-5 font-bold text-[#173F34]">Dakar → Niamey</p><p className="mt-2 text-xs leading-5 text-[#8A7765]">Expédition organisée selon la disponibilité.</p></div></div>
          </div>
        </section>
        <section id="services" className="bg-[#F1E8DB] px-5 py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 text-center"><p className="text-xs font-bold uppercase tracking-[.22em] text-[#B8753C]">Nos services</p><h2 className="mt-3 font-serif text-4xl text-[#173F34] md:text-5xl">Un accompagnement pensé pour vous</h2></div>
            <TransportEstimator config={LIMELLE_CONFIG} weight={kg} onWeightChange={setKg}/>
            <div className="mt-10 rounded-[2rem] bg-[#173F34] p-8 text-white md:p-12"><p className="text-xs font-bold uppercase tracking-[.2em] text-[#C8894E]">Sur-mesure</p><h3 className="mt-4 font-serif text-3xl md:text-4xl">Une pièce précise en tête ?</h3><p className="mt-5 max-w-2xl leading-7 text-white/75">Envoie une photo, une taille, une couleur et ton budget. Lim'Elle recherche la pièce à Dakar puis confirme le prix global.</p><WhatsAppButton className="mt-8 bg-white text-[#173F34]" message="Bonjour Lim'Elle 🌸\nJ'ai une demande sur-mesure :\n\nProduit recherché :\nTaille :\nCouleur :\nBudget :">Faire une demande</WhatsAppButton></div>
          </div>
        </section>
        <section id="contact" className="bg-[#F8F3EA] px-5 py-20">
          <div className="mx-auto max-w-7xl"><div className="mb-8"><p className="text-xs font-bold uppercase tracking-[.22em] text-[#B8753C]">Besoin d'aide ?</p><h2 className="mt-3 font-serif text-4xl text-[#173F34] md:text-5xl">Questions fréquentes</h2></div><FaqList items={FAQS} activeIndex={faq} onToggle={setFaq}/></div>
        </section>
      </>}

      <footer className="bg-[#123D32] px-5 py-12 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-center md:justify-between"><div><div className="font-serif text-3xl">Lim'Elle</div><p className="mt-2 text-sm text-white/70">L'élégance au féminin, naturellement.</p></div><div className="flex flex-col gap-3 sm:flex-row"><WhatsAppButton message={WA_TEXT} className="border border-white/40 bg-transparent text-white">Nous écrire sur WhatsApp</WhatsAppButton><button onClick={openBoutique} className="rounded-xl border border-[#C8894E] px-6 py-3 text-sm font-bold text-white">Découvrir la boutique <span className="ml-2">→</span></button></div></div>
        <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 pt-5 text-xs text-white/50">© 2026 Lim'Elle. Tous droits réservés.</div>
      </footer>
      <WhatsAppButton className="fixed bottom-5 right-5 z-40 h-14 w-14 rounded-full bg-[#3FBF63] p-0 text-white shadow-xl" message={WA_TEXT} aria-label="WhatsApp"><MessageCircle size={25}/></WhatsAppButton>
      {cartOpen && <CartDrawer items={cart} onClose={() => setCartOpen(false)} onQuantityChange={updateQuantity} onRemove={removeFromCart} onCheckout={startCheckout}/>} 
    </main>
  );
}
