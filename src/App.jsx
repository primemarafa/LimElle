import React, { useEffect, useMemo, useState } from "react";
import { HeartHandshake, Menu, Search, ShoppingBag, Truck, X, Gem, MessageCircle } from "lucide-react";
import { LIMELLE_CONFIG } from "./config/limelle";
import { CATEGORIES, FAQS } from "./data/catalog";
import { api } from "./services/api";
import { normalizeProduct } from "./utils/normalizeProduct";
import WhatsAppButton from "./components/WhatsAppButton";
import BrandHero from "./components/BrandHero";
import CatalogueSection from "./components/CatalogueSection";
import CatalogueSkeleton from "./components/CatalogueSkeleton";
import TrustStrip from "./components/TrustStrip";
import FaqList from "./components/FaqList";
import ProductDetails from "./components/ProductDetails";
import CartDrawer from "./components/CartDrawer";
import BrandLogo from "./components/BrandLogo";
import OrderForm from "./components/OrderForm";
import OrderConfirmation from "./components/OrderConfirmation";
import SkipLink from "./components/SkipLink";

const WA_TEXT = "Bonjour, je viens du site Lim'Elle 🌸";
const cartKey = (product) => `${product.id}::${product.selectedSize ?? "Unique"}::${product.selectedColor ?? "Standard"}`;

export default function App() {
  const [filter, setFilter] = useState("all");
  const [faq, setFaq] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [catalogError, setCatalogError] = useState("");
  const [cart, setCart] = useState(() => {
    try {
      const saved = window.localStorage.getItem("limelle-cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [cartOpen, setCartOpen] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const [order, setOrder] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSection, setActiveSection] = useState("accueil");
  const [catalogLoading, setCatalogLoading] = useState(true);

  const loadCatalog = () => {
    setCatalogError("");
    setCatalogLoading(true);
    let active = true;
    const attempt = (retriesLeft) => {
      api.products()
        .then((payload) => {
          if (active) {
            setProducts(Array.isArray(payload.products) ? payload.products.map(normalizeProduct) : []);
            setCatalogLoading(false);
          }
        })
        .catch((error) => {
          if (!active) return;
          if (retriesLeft > 0) {
            setTimeout(() => active && attempt(retriesLeft - 1), 4000);
            return;
          }
          setCatalogError(error.message || "Impossible de charger le catalogue.");
          setCatalogLoading(false);
        });
    };
    attempt(3);
    return () => { active = false; };
  };

  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" }); }, [selectedProduct]);

  useEffect(() => {
    try { window.localStorage.setItem("limelle-cart", JSON.stringify(cart)); } catch { /* stockage indisponible */ }
  }, [cart]);

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
    const ids = ["accueil", "categories", "products", "a-propos", "sur-mesure", "contact"];
    const getSections = () => ids.map((id) => document.getElementById(id)).filter(Boolean);
    let sections = getSections();

    const updateActiveSection = () => {
      const referenceLine = 96;
      let current = sections[0]?.id;
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= referenceLine) current = section.id;
      }
      if (current) setActiveSection(current);
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { updateActiveSection(); ticking = false; });
    };

    sections = getSections();
    updateActiveSection();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, [products]);

  const navLinkClass = (id) => `text-sm font-semibold transition ${activeSection === id ? "border-b-2 border-[#B8753C] pb-1 text-[#173F34]" : "text-[#403A33] hover:text-[#173F34]"}`;

  const trustHighlights = [
    { title: "Sélection vérifiée à Dakar", text: "Chaque pièce est choisie avec soin pour sa qualité, son style et sa finition." },
    { title: "Paiement après validation", text: "Nous confirmons la disponibilité et le prix global avant toute transaction." },
    { title: "Commande simple et rapide", text: "Une conversation claire, un panier transparent et un suivi sur WhatsApp." },
  ];

  const processSteps = [
    { number: "1", title: "Choisissez votre sélection", text: "Parcourez les catégories et ajoutez les pièces que vous aimez." },
    { number: "2", title: "Validez votre panier", text: "Nous confirmons le prix final, le transport et la disponibilité." },
    { number: "3", title: "Recevez votre commande", text: "Votre achat est préparé puis envoyé vers votre ville au Niger." },
  ];

  const featuredProducts = products.slice(0, 3);

  if (order) return <main className="min-h-screen bg-[#F8F3EA] text-[#173F34]"><OrderConfirmation order={order} onDone={() => setOrder(null)} /></main>;
  if (checkout) return <main className="min-h-screen bg-[#F8F3EA] text-[#173F34]"><OrderForm items={cart} onBack={() => setCheckout(false)} onComplete={completeOrder}/></main>;

  return (
    <main className="min-h-screen bg-[#F8F3EA] text-[#173F34]">
      {/* Skip to main content link for accessibility */}
      <SkipLink />

      <header className="sticky top-0 z-50 border-b border-[#173F34]/10 bg-[#F8F3EA]/95 backdrop-blur">
        <div className="mx-auto flex h-[78px] max-w-7xl items-center justify-between px-5 lg:px-8">
          <button onClick={() => scrollTo("accueil")} className="flex items-center gap-2 text-left">
            <BrandLogo className="h-9 w-auto" />
            <div><div className="font-serif text-3xl leading-none tracking-[-.04em] text-[#173F34]">Lim'Elle</div><div className="mt-1 text-[9px] font-semibold tracking-[.12em] text-[#403A33]">L'ÉLÉGANCE AU FÉMININ</div></div>
          </button>
          <nav className="hidden items-center gap-8 lg:flex">
            <button onClick={() => scrollTo("accueil")} className={navLinkClass("accueil")}>Accueil</button>
            <button onClick={openCategories} className={navLinkClass("categories")}>Catégories</button>
            <button onClick={openBoutique} className={navLinkClass("products")}>Boutique</button>
            <button onClick={() => scrollTo("a-propos")} className={navLinkClass("a-propos")}>À propos</button>
            <button onClick={() => scrollTo("sur-mesure")} className={navLinkClass("sur-mesure")}>Sur-mesure</button>
            <button onClick={() => scrollTo("contact")} className={navLinkClass("contact")}>Contact</button>
          </nav>
          <div className="flex items-center gap-1.5">
            <button type="button" aria-label="Rechercher un produit" onClick={() => setSearchOpen((open) => !open)} className={`hidden rounded-full p-2.5 sm:block ${searchOpen ? "bg-white text-[#B8753C]" : "text-[#173F34] hover:bg-white"} `} style={{ minWidth: '44px', minHeight: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Search size={20} />
            </button>
            <button type="button" aria-label="Ouvrir le panier" onClick={() => setCartOpen(true)} className="relative rounded-full p-2.5 text-[#173F34] hover:bg-white" style={{ minWidth: '44px', minHeight: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShoppingBag size={21} />
              {cartCount > 0 && <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#B8753C] px-1 text-[10px] font-bold text-white">{cartCount}</span>}
            </button>
            <button type="button" aria-label="Ouvrir le menu" onClick={() => setMenuOpen(true)} className="rounded-full bg-white p-2.5 text-[#173F34] lg:hidden" style={{ minWidth: '44px', minHeight: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Menu size={21} />
            </button>
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
        <div className="drawer-backdrop fixed inset-0 z-[70] bg-[#F8F3EA] p-6 lg:hidden">
          <div className="flex items-center justify-between"><div className="flex items-center gap-2 font-serif text-3xl text-[#173F34]"><BrandLogo className="h-8 w-auto" />Lim'Elle</div><button type="button" aria-label="Fermer le menu" onClick={() => setMenuOpen(false)} className="rounded-full bg-white p-3"><X size={20} /></button></div>
          <nav className="mt-10 flex flex-col">
            <button onClick={() => scrollTo("accueil")} className={`border-b border-[#173F34]/10 py-5 text-left font-serif text-2xl ${activeSection === "accueil" ? "text-[#B8753C]" : "text-[#173F34]"}`}>Accueil</button>
            <button onClick={openCategories} className={`border-b border-[#173F34]/10 py-5 text-left font-serif text-2xl ${activeSection === "categories" ? "text-[#B8753C]" : "text-[#173F34]"}`}>Catégories</button>
            <button onClick={openBoutique} className={`border-b border-[#173F34]/10 py-5 text-left font-serif text-2xl ${activeSection === "products" ? "text-[#B8753C]" : "text-[#173F34]"}`}>Boutique</button>
            <button onClick={() => scrollTo("a-propos")} className={`border-b border-[#173F34]/10 py-5 text-left font-serif text-2xl ${activeSection === "a-propos" ? "text-[#B8753C]" : "text-[#173F34]"}`}>À propos</button>
            <button onClick={() => scrollTo("sur-mesure")} className={`border-b border-[#173F34]/10 py-5 text-left font-serif text-2xl ${activeSection === "sur-mesure" ? "text-[#B8753C]" : "text-[#173F34]"}`}>Sur-mesure</button>
            <button onClick={() => scrollTo("contact")} className={`border-b border-[#173F34]/10 py-5 text-left font-serif text-2xl ${activeSection === "contact" ? "text-[#B8753C]" : "text-[#173F34]"}`}>Contact</button>
          </nav>
        </div>
      )}

      {selectedProduct ? <ProductDetails product={selectedProduct} onBack={() => setSelectedProduct(null)} onAddToCart={addToCart} /> : <>
        <div id="accueil" className="scroll-mt-20"><BrandHero onCatalogue={openBoutique} /></div>
        <section className="bg-[#173F34] text-white">
          <div className="mx-auto grid max-w-7xl divide-y divide-white/10 px-5 py-5 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4 lg:px-8">
            {[[HeartHandshake,"Ingrédients naturels","Sains et respectueux de votre peau"],[Gem,"Qualité premium","Sélection rigoureuse des meilleures pièces"],[Truck,"Livraison rapide","Partout au Sénégal et au Niger"],[MessageCircle,"Service attentionné","À votre écoute tous les jours"]].map(([Icon,title,text]) => <div key={title} className="flex items-center gap-4 px-4 py-4 lg:px-7"><Icon size={28} strokeWidth={1.5} className="shrink-0 text-[#B8753C]"/><div><p className="text-sm font-bold">{title}</p><p className="mt-1 text-xs leading-5 text-white/75">{text}</p></div></div>)}
          </div>
        </section>
        <section className="bg-[#F1E8DB] px-5 py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 text-center">
              <p className="text-xs font-bold uppercase tracking-[.22em] text-[#B8753C]">Pourquoi Lim'Elle</p>
              <h2 className="mt-3 font-serif text-4xl text-[#173F34] md:text-5xl">Une boutique pensée pour votre confiance</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {trustHighlights.map(({ title, text }) => (
                <div key={title} className="rounded-[1.75rem] border border-[#173F34]/10 bg-white p-7 shadow-[0_18px_40px_rgba(23,63,52,0.06)]">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#173F34] text-lg font-bold text-white">✓</div>
                  <h3 className="font-serif text-2xl text-[#173F34]">{title}</h3>
                  <p className="mt-3 leading-6 text-[#403A33]">{text}</p>
                </div>
              ))}
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {featuredProducts.map((product) => (
                <button key={product.id} type="button" onClick={() => setSelectedProduct(product)} className="group overflow-hidden rounded-[1.75rem] border border-[#173F34]/10 bg-white text-left shadow-[0_18px_40px_rgba(23,63,52,0.06)] transition hover:-translate-y-1">
                  <img src={product.image || "/images/hero-portrait.jpg"} alt={product.name} className="h-64 w-full object-cover transition duration-300 group-hover:scale-105" loading="lazy" />
                  <div className="p-5">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[11px] font-bold uppercase tracking-[.18em] text-[#B8753C]">{product.cat}</span>
                      <span className="text-sm font-bold text-[#173F34]">{product.price ? `${product.price.toLocaleString("fr-FR")} FCFA` : "Prix sur demande"}</span>
                    </div>
                    <h3 className="mt-4 font-serif text-2xl text-[#173F34]">{product.name}</h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#403A33]">{product.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        <div id="catalogue-wrapper">
          {catalogLoading ? <CatalogueSkeleton /> : catalogError ? <section className="mx-auto max-w-7xl px-5 py-12"><div className="rounded-3xl bg-red-50 p-5 text-sm font-semibold text-red-700">{catalogError}<button type="button" onClick={loadCatalog} className="ml-4 inline-flex rounded-full bg-red-700 px-4 py-2 text-xs font-bold text-white transition hover:bg-red-800 active:scale-95">Réessayer</button></div></section> : <CatalogueSection categories={CATEGORIES} products={filteredProducts} activeCategory={filter} onCategoryChange={setFilter} onProductSelect={setSelectedProduct}/>}
        </div>
        <TrustStrip />
        <section className="bg-white px-5 py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[.22em] text-[#B8753C]">Comment ça marche</p>
              <h2 className="mt-3 font-serif text-4xl text-[#173F34] md:text-5xl">Une commande simple, claire et rassurante</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {processSteps.map(({ number, title, text }) => (
                <div key={number} className="rounded-[1.75rem] bg-[#F8F3EA] p-7">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#B8753C] font-serif text-2xl text-white">{number}</div>
                  <h3 className="font-serif text-2xl text-[#173F34]">{title}</h3>
                  <p className="mt-3 leading-6 text-[#403A33]">{text}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 rounded-[2rem] bg-[#173F34] p-8 text-white md:flex md:items-center md:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[.18em] text-[#E7C49D]">Demande rapide</p>
                <h3 className="mt-3 font-serif text-3xl">Besoin d’un avis avant de commander ?</h3>
              </div>
              <WhatsAppButton message={`Bonjour Lim'Elle 🌸\nJe souhaite recevoir un conseil avant une commande.`} className="mt-5 border border-white/40 bg-transparent text-white md:mt-0">Parler avec Lim'Elle</WhatsAppButton>
            </div>
          </div>
        </section>
        <section id="a-propos" className="scroll-mt-24 bg-[#173F34] px-5 py-24 text-white">
          <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[1fr_1fr] md:items-center">
            <div className="overflow-hidden rounded-[2rem]"><img src="/images/hero-portrait.jpg" alt="L'univers Lim'Elle" className="h-full max-h-[420px] w-full object-cover object-[50%_20%]" loading="lazy" /></div>
            <div><p className="text-xs font-bold uppercase tracking-[.22em] text-[#C8894E]">Notre histoire</p><h2 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">Une sélection pensée entre Dakar et Niamey</h2><p className="mt-6 max-w-xl leading-7 text-white/75">Lim'Elle est née d'une envie simple : rendre accessible, depuis Niamey, une mode féminine que l'on trouve d'ordinaire à Dakar. Chaque pièce est choisie à la main, pas produite en série.</p></div>
          </div>
        </section>
        <section className="scroll-mt-24 bg-[#F1E8DB] px-5 py-20" id="sur-mesure">
          <div className="mx-auto max-w-7xl rounded-[2rem] bg-white p-8 md:p-14"><p className="text-xs font-bold uppercase tracking-[.2em] text-[#B8753C]">Sur-mesure</p><h3 className="mt-4 font-serif text-3xl text-[#173F34] md:text-4xl">Une pièce précise en tête ?</h3><p className="mt-5 max-w-2xl leading-7 text-[#403A33]">Envoie une photo, une taille, une couleur et ton budget. Lim'Elle recherche la pièce à Dakar puis confirme le prix global.</p><WhatsAppButton className="mt-8 bg-[#173F34] text-white" message="Bonjour Lim'Elle 🌸\nJ'ai une demande sur-mesure :\n\nProduit recherché :\nTaille :\nCouleur :\nBudget :">Faire une demande</WhatsAppButton></div>
        </section>
        <section id="contact" className="scroll-mt-24 bg-[#F8F3EA] px-5 py-20">
          <div className="mx-auto max-w-7xl"><div className="mb-8"><p className="text-xs font-bold uppercase tracking-[.22em] text-[#B8753C]">Besoin d'aide ?</p><h2 className="mt-3 font-serif text-4xl text-[#173F34] md:text-5xl">Questions fréquentes</h2></div><FaqList items={FAQS} activeIndex={faq} onToggle={setFaq}/></div>
        </section>
      </>}

      <footer className="bg-[#173F34] px-5 py-12 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2 font-serif text-3xl"><BrandLogo className="h-9 w-auto" />Lim'Elle</div>
            <p className="mt-2 max-w-xs text-sm text-white/70">L'élégance au féminin, naturellement. Personal shopping entre Dakar et Niamey.</p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[.2em] text-white/50">Navigation</p>
            <nav className="mt-4 flex flex-col gap-2 text-sm text-white/80">
              <button onClick={openCategories} className="text-left hover:text-white">Catégories</button>
              <button onClick={openBoutique} className="text-left hover:text-white">Boutique</button>
              <button onClick={() => scrollTo("a-propos")} className="text-left hover:text-white">À propos</button>
              <button onClick={() => scrollTo("sur-mesure")} className="text-left hover:text-white">Sur-mesure</button>
            </nav>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[.2em] text-white/50">Contact</p>
            <div className="mt-4 flex flex-col gap-3 text-sm text-white/80">
              <WhatsAppButton message={WA_TEXT} className="w-fit border border-white/40 bg-transparent text-white">Nous écrire sur WhatsApp</WhatsAppButton>
              <button onClick={openBoutique} className="w-fit rounded-xl border border-white/40 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10">Découvrir la boutique <span className="ml-2">→</span></button>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 pt-5 text-xs text-white/50">© 2026 Lim'Elle. Tous droits réservés.</div>
      </footer>
      <WhatsAppButton className="fixed bottom-5 right-5 z-40 h-14 w-14 rounded-full bg-[#3FBF63] p-0 text-white shadow-xl" message={WA_TEXT} iconSize={26} aria-label="Contacter Lim'Elle sur WhatsApp" />
      {cartOpen && <CartDrawer items={cart} onClose={() => setCartOpen(false)} onQuantityChange={updateQuantity} onRemove={removeFromCart} onCheckout={startCheckout}/>}
    </main>
  );
}