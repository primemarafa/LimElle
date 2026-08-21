import React, { useEffect, useMemo, useState } from "react";
import { Menu, Search, ShoppingBag, X, User } from "lucide-react";
import { LIMELLE_CONFIG } from "./config/limelle";
import { CATEGORIES, FALLBACK_PRODUCTS } from "./data/catalog";
import { api } from "./services/api";
import { normalizeProduct } from "./utils/normalizeProduct";
import { cartKey } from "./utils/cart";
import WhatsAppButton from "./components/WhatsAppButton";
import BrandHero from "./components/BrandHero";
import CatalogueSection from "./components/CatalogueSection";
import TrustStrip from "./components/TrustStrip";
import TrustBar from "./components/TrustBar";

import ProductDetails from "./components/ProductDetails";
import CartDrawer from "./components/CartDrawer";
import BrandLogo from "./components/BrandLogo";
import OrderForm from "./components/OrderForm";
import OrderConfirmation from "./components/OrderConfirmation";
import SkipLink from "./components/SkipLink";

const WA_TEXT = "Bonjour, je viens du site Lim'Elle 🌸";

export default function App() {
  const [filter, setFilter] = useState("all");
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
  const [navOverride, setNavOverride] = useState(null);

  const loadCatalog = () => {
    setCatalogError("");
    setProducts(FALLBACK_PRODUCTS);
    let active = true;
    const attempt = (retriesLeft) => {
      api.products()
        .then((payload) => {
          if (active) {
            const apiProducts = Array.isArray(payload.products) ? payload.products.map(normalizeProduct) : [];
            if (apiProducts.length > 0) setProducts(apiProducts);
          }
        })
        .catch(() => {
          if (!active || retriesLeft <= 0) return;
          setTimeout(() => active && attempt(retriesLeft - 1), 4000);
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
    const el = document.getElementById(id);
    if (el) {
      setNavOverride(id);
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      // Reset override after scroll settles so scroll spy takes back over
      setTimeout(() => setNavOverride(null), 2000);
    }
  };

  const openCategories = () => { setFilter("all"); scrollTo("categories"); };
  const openBoutique = () => { setFilter("all"); scrollTo("products"); };

  useEffect(() => {
    const ids = ["accueil", "categories", "products"];
    const getSections = () => ids.map((id) => document.getElementById(id)).filter(Boolean);
    let sections = getSections();

    const updateActiveSection = () => {
      if (navOverride) return; // Don't fight with manual nav click
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
  }, [products, navOverride]);

  const navLinkClass = (id) => `text-sm font-medium transition ${(navOverride || activeSection) === id ? "text-[#A0845C] font-semibold" : "text-[#6A5A4A] hover:text-[#2D2924]"}`;

  if (order) return <main className="min-h-screen bg-[#FAF6F0] text-[#2D2924]"><OrderConfirmation order={order} onDone={() => setOrder(null)} /></main>;
  if (checkout) return <main className="min-h-screen bg-[#FAF6F0] text-[#2D2924]"><OrderForm items={cart} onBack={() => setCheckout(false)} onComplete={completeOrder} /></main>;

  return (
    <main id="main-content" className="min-h-screen bg-[#FAF6F0] text-[#2D2924]">
      <SkipLink />



      <header className="sticky top-0 z-50 border-b border-[#E8E0D4]/60 bg-[#FAF6F0]/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
          <button onClick={() => scrollTo("accueil")} className="flex items-center gap-2">
            <BrandLogo className="h-8 w-auto" />
            <div>
              <span className="text-lg font-semibold tracking-tight text-[#2D2924]">Lim'Elle</span>
              <span className="ml-1 hidden text-[10px] font-medium text-[#A0845C] sm:inline">L'elegance au feminin</span>
            </div>
          </button>

          <nav className="hidden items-center gap-7 lg:flex">
            <button onClick={() => scrollTo("accueil")} className={navLinkClass("accueil")}>Accueil</button>
            <button onClick={openBoutique} className={navLinkClass("products")}>Boutique</button>
            <button onClick={openCategories} className={navLinkClass("categories")}>Catégories</button>
            <span className="cursor-default text-sm font-medium text-[#8A7A6A]/60">À propos</span>
            <span className="cursor-default text-sm font-medium text-[#8A7A6A]/60">Journal</span>
            <span className="cursor-default text-sm font-medium text-[#8A7A6A]/60">Contact</span>
          </nav>

          <div className="flex items-center gap-1">
            <button type="button" aria-label="Rechercher" onClick={() => setSearchOpen((o) => !o)} className="rounded-lg p-2.5 text-[#6A5A4A] transition hover:bg-[#E8E0D4]/50 hover:text-[#2D2924]">
              <Search size={18} />
            </button>
            <button type="button" aria-label="Mon profil" className="hidden rounded-lg p-2.5 text-[#6A5A4A] transition hover:bg-[#E8E0D4]/50 hover:text-[#2D2924] sm:flex">
              <User size={18} />
            </button>
            <button type="button" aria-label="Ouvrir le panier" onClick={() => setCartOpen(true)} className="relative rounded-lg p-2.5 text-[#6A5A4A] transition hover:bg-[#E8E0D4]/50 hover:text-[#2D2924]">
              <ShoppingBag size={18} />
              {cartCount > 0 && <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#1B3A2D] px-1 text-[10px] font-bold text-white">{cartCount}</span>}
            </button>
            <button type="button" aria-label="Ouvrir le menu" onClick={() => setMenuOpen(true)} className="rounded-lg p-2.5 text-[#6A5A4A] transition hover:bg-[#E8E0D4]/50 hover:text-[#2D2924] lg:hidden">
              <Menu size={18} />
            </button>
          </div>
        </div>
      </header>

      {searchOpen && (
        <div className="border-b border-[#E8E0D4] bg-[#FAF6F0] px-5 py-3">
          <div className="mx-auto flex max-w-7xl items-center gap-3">
            <Search size={16} className="text-[#8A7A6A]" />
            <input autoFocus type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") openBoutique(); }} placeholder="Rechercher un produit..." className="flex-1 bg-transparent text-sm text-[#2D2924] placeholder:text-[#8A7A6A] focus:outline-none" />
            {searchTerm && <button type="button" onClick={() => setSearchTerm("")} className="text-xs font-bold text-[#8A7A6A] hover:text-[#2D2924]">Effacer</button>}
          </div>
        </div>
      )}

      {menuOpen && (
        <div className="fixed inset-0 z-[70] bg-[#FAF6F0] p-6 lg:hidden">
          <div className="flex items-center justify-between">
            <BrandLogo className="h-7 w-auto" />
            <button type="button" aria-label="Fermer" onClick={() => setMenuOpen(false)} className="rounded-lg p-2 hover:bg-[#E8E0D4]/50"><X size={20} /></button>
          </div>
          <nav className="mt-8 flex flex-col">
            {[{ id: "accueil", label: "Accueil" }, { id: "categories", label: "Catégories" }, { id: "products", label: "Boutique" }, { id: "apropos", label: "À propos", disabled: true }, { id: "journal", label: "Journal", disabled: true }, { id: "contact", label: "Contact", disabled: true }].map(({ id, label, disabled }) => (
              disabled
                ? <span key={id} className="border-b border-[#E8E0D4] py-4 text-left text-lg font-medium text-[#8A7A6A]/50">{label}</span>
                : <button key={id} onClick={() => id === "products" ? openBoutique() : id === "categories" ? openCategories() : scrollTo(id)} className={`border-b border-[#E8E0D4] py-4 text-left text-lg font-medium ${(navOverride || activeSection) === id ? "text-[#A0845C]" : "text-[#6A5A4A]"}`}>{label}</button>
            ))}
          </nav>
        </div>
      )}

      {selectedProduct ? <ProductDetails product={selectedProduct} onBack={() => setSelectedProduct(null)} onAddToCart={addToCart} /> : <>
        <div id="accueil" className="scroll-mt-16"><BrandHero onCatalogue={openBoutique} /></div>
        <TrustStrip />

        <div id="catalogue-wrapper">
          <CatalogueSection categories={CATEGORIES} products={filteredProducts} activeCategory={filter} onCategoryChange={setFilter} onAddToCart={addToCart} />
        </div>

        <TrustBar />

        {/* Bottom CTA banner */}
        <section className="bg-[#1B3A2D] px-5 py-10">
          <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
            <p className="text-xl font-medium italic text-white md:text-2xl">La beauté n'est pas un luxe, c'est votre droit.</p>
            <button onClick={openBoutique} className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-bold text-[#1B3A2D] transition hover:bg-[#F0EBE3]">
              Découvrir la boutique <span>→</span>
            </button>
          </div>
        </section>
      </>}

      <footer className="border-t border-[#E8E0D4] bg-[#FAF6F0] px-5 py-14">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2"><BrandLogo className="h-8 w-auto" /><span className="text-lg font-semibold text-[#2D2924]">Lim'Elle</span></div>
            <p className="mt-1 text-[10px] font-semibold uppercase tracking-[.12em] text-[#A0845C]">{LIMELLE_CONFIG.tagline}</p>
            <p className="mt-4 max-w-xs text-sm leading-6 text-[#8A7A6A]">Votre destination beaute de confiance au Sahel. Des produits naturels et de qualite pour sublimer votre beaute.</p>
            <div className="mt-5 flex gap-3">
              {LIMELLE_CONFIG.social.instagramHandle && <a href={LIMELLE_CONFIG.social.instagramUrl || "#"} target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full bg-black/5 text-xs font-bold text-black/50 transition hover:bg-[#173F34] hover:text-white">IG</a>}
              <a href={LIMELLE_CONFIG.social.facebookUrl || "#"} target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full bg-black/5 text-xs font-bold text-black/50 transition hover:bg-[#173F34] hover:text-white">FB</a>
            </div>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[.2em] text-[#2D2924]">Boutique</p>
            <nav className="mt-4 flex flex-col gap-2.5 text-sm text-[#6A5A4A]">
              <button onClick={() => { setFilter("soins-visage"); scrollTo("products"); }} className="text-left hover:text-[#A0845C] transition">Soins visage</button>
              <button onClick={() => { setFilter("soins-corps"); scrollTo("products"); }} className="text-left hover:text-[#A0845C] transition">Soins corps</button>
              <button onClick={() => { setFilter("parfums"); scrollTo("products"); }} className="text-left hover:text-[#A0845C] transition">Parfums</button>
              <button onClick={() => { setFilter("accessoires"); scrollTo("products"); }} className="text-left hover:text-[#A0845C] transition">Accessoires</button>
              <button onClick={openBoutique} className="text-left hover:text-[#A0845C] transition">Tous les produits</button>
            </nav>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[.2em] text-[#2D2924]">Support</p>
            <nav className="mt-4 flex flex-col gap-2.5 text-sm text-[#6A5A4A]">
              <a href={`https://wa.me/${LIMELLE_CONFIG.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="hover:text-[#A0845C] transition">Centre d'aide</a>
              <a href={`https://wa.me/${LIMELLE_CONFIG.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="hover:text-[#A0845C] transition">Contactez-nous</a>
              <span className="text-left">Livraison & retours</span>
            </nav>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[.2em] text-[#2D2924]">Legal</p>
            <nav className="mt-4 flex flex-col gap-2.5 text-sm text-[#6A5A4A]">
              <span className="text-left">Politique de confidentialite</span>
              <span className="text-left">Conditions generales</span>
              <span className="text-left">Mentions legales</span>
            </nav>
          </div>
        </div>
        <div className="mx-auto mt-10 flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-[#E8E0D4] pt-6 text-xs text-[#8A7A6A] sm:flex-row">
          <p>&copy; 2026 Lim'Elle. Tous droits reserves.</p>
          <div className="flex gap-3">
            <span className="rounded-md bg-black/5 px-3 py-1.5">Orange Money</span>
            <span className="rounded-md bg-black/5 px-3 py-1.5">MTN MoMo</span>
            <span className="rounded-md bg-black/5 px-3 py-1.5">Visa</span>
            <span className="rounded-md bg-black/5 px-3 py-1.5">Mastercard</span>
          </div>
        </div>
      </footer>

      <WhatsAppButton className="fixed bottom-5 right-5 z-40 h-14 w-14 rounded-full bg-[#25D366] p-0 text-white shadow-xl" message={WA_TEXT} iconSize={26} aria-label="Contacter Lim'Elle sur WhatsApp" />
      {cartOpen && <CartDrawer items={cart} onClose={() => setCartOpen(false)} onQuantityChange={updateQuantity} onRemove={removeFromCart} onCheckout={startCheckout} />}
    </main>
  );
}
