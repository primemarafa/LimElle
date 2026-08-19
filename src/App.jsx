import React, { useEffect, useMemo, useState } from "react";
import { Menu, Search, ShoppingBag, X, User } from "lucide-react";
import { LIMELLE_CONFIG } from "./config/limelle";
import { CATEGORIES, FAQS } from "./data/catalog";
import { api } from "./services/api";
import { normalizeProduct } from "./utils/normalizeProduct";
import WhatsAppButton from "./components/WhatsAppButton";
import BrandHero from "./components/BrandHero";
import CatalogueSection from "./components/CatalogueSection";
import CatalogueSkeleton from "./components/CatalogueSkeleton";
import TrustStrip from "./components/TrustStrip";
import TestimonialsSection from "./components/TestimonialsSection";
import StatsSection from "./components/StatsSection";
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
    const ids = ["accueil", "categories", "products", "contact"];
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

  const navLinkClass = (id) => `text-sm font-medium transition ${activeSection === id ? "text-[#173F34] font-semibold" : "text-black/60 hover:text-black"}`;

  if (order) return <main className="min-h-screen bg-white text-black"><OrderConfirmation order={order} onDone={() => setOrder(null)} /></main>;
  if (checkout) return <main className="min-h-screen bg-white text-black"><OrderForm items={cart} onBack={() => setCheckout(false)} onComplete={completeOrder} /></main>;

  return (
    <main className="min-h-screen bg-white text-black">
      <SkipLink />

      <div className="bg-[#173F34] px-5 py-2.5 text-center text-xs font-medium text-white">
        Livraison offerte a Niamey pour toute commande de +50 000 FCFA
      </div>

      <header className="sticky top-0 z-50 border-b border-black/10 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
          <button onClick={() => scrollTo("accueil")} className="flex items-center gap-2">
            <BrandLogo className="h-8 w-auto" />
            <span className="text-xl font-semibold tracking-tight text-[#173F34]">Lim'Elle</span>
          </button>

          <nav className="hidden items-center gap-7 lg:flex">
            <button onClick={() => scrollTo("accueil")} className={navLinkClass("accueil")}>Accueil</button>
            <button onClick={openBoutique} className={navLinkClass("products")}>Boutique</button>
            <button onClick={openCategories} className={navLinkClass("categories")}>Categories</button>
            <button onClick={() => scrollTo("contact")} className={navLinkClass("contact")}>Contact</button>
          </nav>

          <div className="flex items-center gap-1">
            <button type="button" aria-label="Rechercher" onClick={() => setSearchOpen((o) => !o)} className="rounded-lg p-2.5 text-black/60 transition hover:bg-black/5 hover:text-black">
              <Search size={18} />
            </button>
            <button type="button" aria-label="Mon profil" className="hidden rounded-lg p-2.5 text-black/60 transition hover:bg-black/5 hover:text-black sm:flex">
              <User size={18} />
            </button>
            <button type="button" aria-label="Ouvrir le panier" onClick={() => setCartOpen(true)} className="relative rounded-lg p-2.5 text-black/60 transition hover:bg-black/5 hover:text-black">
              <ShoppingBag size={18} />
              {cartCount > 0 && <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#173F34] px-1 text-[10px] font-bold text-white">{cartCount}</span>}
            </button>
            <button type="button" aria-label="Ouvrir le menu" onClick={() => setMenuOpen(true)} className="rounded-lg p-2.5 text-black/60 transition hover:bg-black/5 hover:text-black lg:hidden">
              <Menu size={18} />
            </button>
          </div>
        </div>
      </header>

      {searchOpen && (
        <div className="border-b border-black/10 bg-white px-5 py-3">
          <div className="mx-auto flex max-w-7xl items-center gap-3">
            <Search size={16} className="text-black/40" />
            <input autoFocus type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") openBoutique(); }} placeholder="Rechercher un produit..." className="flex-1 bg-transparent text-sm text-black placeholder:text-black/40 focus:outline-none" />
            {searchTerm && <button type="button" onClick={() => setSearchTerm("")} className="text-xs font-bold text-black/40 hover:text-black">Effacer</button>}
          </div>
        </div>
      )}

      {menuOpen && (
        <div className="fixed inset-0 z-[70] bg-white p-6 lg:hidden">
          <div className="flex items-center justify-between">
            <span className="text-xl font-semibold text-[#173F34]">Lim'Elle</span>
            <button type="button" aria-label="Fermer" onClick={() => setMenuOpen(false)} className="rounded-lg p-2 hover:bg-black/5"><X size={20} /></button>
          </div>
          <nav className="mt-8 flex flex-col">
            {[{ id: "accueil", label: "Accueil" }, { id: "products", label: "Boutique" }, { id: "categories", label: "Categories" }, { id: "contact", label: "Contact" }].map(({ id, label }) => (
              <button key={id} onClick={() => id === "products" ? openBoutique() : id === "categories" ? openCategories() : scrollTo(id)} className={`border-b border-black/10 py-4 text-left text-lg font-medium ${activeSection === id ? "text-[#173F34]" : "text-black/60"}`}>{label}</button>
            ))}
          </nav>
        </div>
      )}

      {selectedProduct ? <ProductDetails product={selectedProduct} onBack={() => setSelectedProduct(null)} onAddToCart={addToCart} /> : <>
        <div id="accueil" className="scroll-mt-16"><BrandHero onCatalogue={openBoutique} /></div>

        <div id="catalogue-wrapper">
          {catalogLoading ? <CatalogueSkeleton /> : catalogError ? (
            <section className="mx-auto max-w-7xl px-5 py-12"><div className="rounded-xl bg-red-50 p-5 text-sm font-semibold text-red-700">{catalogError}<button type="button" onClick={loadCatalog} className="ml-4 inline-flex rounded-full bg-red-700 px-4 py-2 text-xs font-bold text-white transition hover:bg-red-800">Reessayer</button></div></section>
          ) : <CatalogueSection categories={CATEGORIES} products={filteredProducts} activeCategory={filter} onCategoryChange={setFilter} onProductSelect={setSelectedProduct} onAddToCart={addToCart} />}
        </div>

        <TrustStrip />
        <TestimonialsSection />
        <StatsSection />

        <section className="px-5 pt-20 md:pt-32">
          <div className="mx-auto max-w-md">
            <h2 className="text-center text-3xl font-medium tracking-tight text-black md:text-4xl">Offres exclusives</h2>
            <p className="mt-4 text-center text-base text-black/50">Inscrivez-vous pour recevoir nos offres speciales, acces anticipe et nouveautes.</p>
            <form className="mt-10 flex items-center gap-2" onSubmit={(e) => { e.preventDefault(); const btn = e.target.querySelector("button"); btn.textContent = "Inscrit !"; btn.classList.add("bg-[#27ae60]"); setTimeout(() => { btn.textContent = "S'inscrire"; btn.classList.remove("bg-[#27ae60]"); }, 2000); }}>
              <input type="email" required placeholder="Votre adresse email" className="flex-1 rounded-lg border border-black/10 bg-black/3 px-4 py-3.5 text-sm text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-black/10" />
              <button type="submit" className="whitespace-nowrap rounded-lg bg-[#173F34] px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-[#1e4d3f]">S'inscrire</button>
            </form>
          </div>
        </section>

        <section id="contact" className="scroll-mt-20 px-5 pt-20 md:pt-32">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-center text-3xl font-medium tracking-tight text-black md:text-4xl">Questions frequentes</h2>
            <p className="mt-4 text-center text-base text-black/50">Trouvez rapidement reponses a vos questions.</p>
            <div className="mt-10">
              <FaqList items={FAQS} activeIndex={faq} onToggle={setFaq} />
            </div>
            <div className="mt-10 text-center">
              <WhatsAppButton message={WA_TEXT} className="inline-flex rounded-lg bg-[#173F34] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#1e4d3f]">Besoin d'aide ? Contactez-nous</WhatsAppButton>
            </div>
          </div>
        </section>

        <section className="px-5 pt-20 pb-10 md:pt-32">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 rounded-2xl border border-black/10 p-10 md:flex-row md:p-16">
            <h2 className="max-w-lg text-center text-3xl font-medium tracking-tight text-black md:text-left md:text-4xl">Pret a sublimer votre beaute ?</h2>
            <WhatsAppButton message={WA_TEXT} className="whitespace-nowrap rounded-lg bg-[#173F34] px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-[#1e4d3f]">Commencer</WhatsAppButton>
          </div>
        </section>
      </>}

      <footer className="border-t border-black/10 px-5 py-14">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2"><BrandLogo className="h-8 w-auto" /><span className="text-xl font-semibold text-[#173F34]">Lim'Elle</span></div>
            <p className="mt-1 text-[10px] font-semibold uppercase tracking-[.12em] text-black/40">{LIMELLE_CONFIG.tagline}</p>
            <p className="mt-4 max-w-xs text-sm leading-6 text-black/50">Votre destination beaute de confiance au Sahel. Des produits naturels et de qualite pour sublimer votre beaute.</p>
            <div className="mt-5 flex gap-3">
              {LIMELLE_CONFIG.social.instagramHandle && <a href={LIMELLE_CONFIG.social.instagramUrl || "#"} target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full bg-black/5 text-xs font-bold text-black/50 transition hover:bg-[#173F34] hover:text-white">IG</a>}
              <a href={LIMELLE_CONFIG.social.facebookUrl || "#"} target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full bg-black/5 text-xs font-bold text-black/50 transition hover:bg-[#173F34] hover:text-white">FB</a>
            </div>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[.2em] text-black/40">Boutique</p>
            <nav className="mt-4 flex flex-col gap-2.5 text-sm text-black/60">
              <button onClick={() => { setFilter("soins-visage"); scrollTo("products"); }} className="text-left hover:text-black transition">Soins visage</button>
              <button onClick={() => { setFilter("soins-corps"); scrollTo("products"); }} className="text-left hover:text-black transition">Soins corps</button>
              <button onClick={() => { setFilter("parfums"); scrollTo("products"); }} className="text-left hover:text-black transition">Parfums</button>
              <button onClick={() => { setFilter("accessoires"); scrollTo("products"); }} className="text-left hover:text-black transition">Accessoires</button>
              <button onClick={openBoutique} className="text-left hover:text-black transition">Tous les produits</button>
            </nav>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[.2em] text-black/40">Informations</p>
            <nav className="mt-4 flex flex-col gap-2.5 text-sm text-black/60">
              <span className="text-left">Livraison & retours</span>
              <span className="text-left">Politique de confidentialite</span>
              <span className="text-left">Conditions generales</span>
            </nav>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[.2em] text-black/40">Contact</p>
            <div className="mt-4 flex flex-col gap-3 text-sm text-black/60">
              <p>Dakar, Senegal</p>
              <p>{LIMELLE_CONFIG.email}</p>
              <WhatsAppButton message={WA_TEXT} className="mt-2 w-fit rounded-lg bg-[#173F34] px-5 py-2.5 text-xs font-bold text-white">Nous ecrire sur WhatsApp</WhatsAppButton>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-10 flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-black/10 pt-6 text-xs text-black/40 sm:flex-row">
          <p>&copy; 2026 Lim'Elle. Tous droits reserves.</p>
          <div className="flex gap-3">
            <span className="rounded-md bg-black/5 px-3 py-1.5">Orange Money</span>
            <span className="rounded-md bg-black/5 px-3 py-1.5">MTN MoMo</span>
            <span className="rounded-md bg-black/5 px-3 py-1.5">Visa</span>
            <span className="rounded-md bg-black/5 px-3 py-1.5">Mastercard</span>
          </div>
        </div>
      </footer>

      <WhatsAppButton className="fixed bottom-5 right-5 z-40 h-14 w-14 rounded-full bg-[#3FBF63] p-0 text-white shadow-xl" message={WA_TEXT} iconSize={26} aria-label="Contacter Lim'Elle sur WhatsApp" />
      {cartOpen && <CartDrawer items={cart} onClose={() => setCartOpen(false)} onQuantityChange={updateQuantity} onRemove={removeFromCart} onCheckout={startCheckout} />}
    </main>
  );
}
