import React, { useEffect, useMemo, useState } from "react";
import { Menu, Search, ShoppingBag, X, User, Leaf } from "lucide-react";
import { LIMELLE_CONFIG } from "./config/limelle";
import { CATEGORIES, FALLBACK_PRODUCTS } from "./data/catalog";
import { api } from "./services/api";
import { normalizeProduct } from "./utils/normalizeProduct";
import { cartKey } from "./utils/cart";
import WhatsAppButton from "./components/WhatsAppButton";
import BrandHero from "./components/BrandHero";
import CatalogueSection from "./components/CatalogueSection";
import TrustBar from "./components/TrustBar";

import ProductDetails from "./components/ProductDetails";
import CartDrawer from "./components/CartDrawer";
import BrandLogo from "./components/BrandLogo";
import OrderForm from "./components/OrderForm";
import OrderConfirmation from "./components/OrderConfirmation";
import SkipLink from "./components/SkipLink";
import { AuthProvider, useAuth } from "./context/AuthContext";
import AuthModal from "./components/AuthModal";
import UserProfileModal from "./components/UserProfileModal";
import BotanicalTreasuresSection from "./components/BotanicalTreasuresSection";
import BeautyRitualSection from "./components/BeautyRitualSection";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import CustomRequestSection from "./components/CustomRequestSection";
import FaqSection from "./components/FaqSection";
import AdminModal, { getCustomProducts } from "./components/AdminModal";

const WA_TEXT = "Bonjour, je viens du site Lim'Elle 🌸";

function InstagramIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function AppContent() {
  const { user, isAuthenticated } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
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
    const custom = getCustomProducts();
    const baseList = [...custom, ...FALLBACK_PRODUCTS.filter((fb) => !custom.some((c) => String(c.id) === String(fb.id)))];
    setProducts(baseList);

    let active = true;
    const attempt = (retriesLeft) => {
      api.products()
        .then((payload) => {
          if (active) {
            const apiProducts = Array.isArray(payload.products) ? payload.products.map(normalizeProduct) : [];
            if (apiProducts.length > 0) {
              const merged = [...custom, ...apiProducts.filter((ap) => !custom.some((c) => String(c.id) === String(ap.id)))];
              setProducts(merged);
            }
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

  useEffect(() => {
    const checkAdminHash = () => {
      const hash = window.location.hash.toLowerCase();
      const search = window.location.search.toLowerCase();
      if (hash === "#admin" || hash === "#webmaster" || search.includes("admin=true")) {
        setAdminModalOpen(true);
      }
    };
    checkAdminHash();
    window.addEventListener("hashchange", checkAdminHash);
    return () => window.removeEventListener("hashchange", checkAdminHash);
  }, []);

  useEffect(() => loadCatalog(), []);

  const filteredProducts = useMemo(() => {
    let list = products;
    if (filter === "bestsellers") {
      list = products.filter((p) => (p.badge?.toLowerCase().includes("bestseller") || p.badge?.toLowerCase().includes("coup de cœur") || p.price > 8000));
    } else if (filter === "nouveautes") {
      list = products.filter((p) => (p.badge?.toLowerCase().includes("nouveau") || p.badge?.toLowerCase().includes("exclusif") || p.badge?.toLowerCase().includes("naturel") || p.badge?.toLowerCase().includes("doux")));
    } else if (filter !== "all") {
      list = products.filter((product) => product.cat === filter || product.category === filter);
    }
    const term = searchTerm.trim().toLowerCase();
    if (!term) return list;
    return list.filter((product) => product.name?.toLowerCase().includes(term) || product.description?.toLowerCase().includes(term));
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

  const navLinkClass = (id) => `relative text-sm font-medium transition ${(navOverride || activeSection) === id ? "text-[#B58A4A]" : "text-[#6A5A4A] hover:text-[#2B2620]"}`;
  const navUnderline = (id) => (navOverride || activeSection) === id ? "after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-full after:rounded-full after:bg-[#B58A4A]" : "";

  if (order) return <main className="min-h-screen bg-[#F8F4EC] text-[#2B2620]"><OrderConfirmation order={order} onDone={() => setOrder(null)} /></main>;
  if (checkout) return <main className="min-h-screen bg-[#F8F4EC] text-[#2B2620]"><OrderForm items={cart} onBack={() => setCheckout(false)} onComplete={completeOrder} /></main>;

  return (
    <main id="main-content" className="min-h-screen bg-[#F8F4EC] text-[#2B2620]">
      <SkipLink />



      <header className="sticky top-0 z-50 border-b border-[#E8E0D4]/60 bg-[#F8F4EC]/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
          <button onClick={() => scrollTo("accueil")} className="flex items-center gap-2">
            <BrandLogo className="h-8 w-auto" />
            <div>
              <span className="text-lg font-semibold tracking-tight text-[#2B2620]">Lim'Elle</span>
              <span className="ml-1 hidden text-[10px] font-medium text-[#B58A4A] sm:inline">L'élégance au féminin</span>
            </div>
          </button>

          <nav className="hidden items-center gap-6 lg:flex">
            <button onClick={() => scrollTo("accueil")} className={`${navLinkClass("accueil")} ${navUnderline("accueil")}`}>Accueil</button>
            <button onClick={openCategories} className={`${navLinkClass("categories")} ${navUnderline("categories")}`}>Catégories</button>
            <button onClick={openBoutique} className={`${navLinkClass("products")} ${navUnderline("products")}`}>Boutique</button>
            <button onClick={() => scrollTo("sur-mesure")} className={`${navLinkClass("sur-mesure")} ${navUnderline("sur-mesure")}`}>Sur-Mesure</button>
            <button onClick={() => scrollTo("faq")} className={`${navLinkClass("faq")} ${navUnderline("faq")}`}>FAQ</button>
            <button onClick={() => scrollTo("apropos")} className={`${navLinkClass("apropos")} ${navUnderline("apropos")}`}>À propos</button>
            <button onClick={() => scrollTo("contact")} className={`${navLinkClass("contact")} ${navUnderline("contact")}`}>Contact</button>
          </nav>

          <div className="flex items-center gap-1">
            <button type="button" aria-label="Rechercher" onClick={() => setSearchOpen((o) => !o)} className="rounded-lg p-2.5 text-[#6A5A4A] transition hover:bg-[#E8E0D4]/50 hover:text-[#2B2620]">
              <Search size={18} />
            </button>
            <button
              type="button"
              aria-label={isAuthenticated ? "Mon profil client" : "Se connecter"}
              onClick={() => (isAuthenticated ? setProfileModalOpen(true) : setAuthModalOpen(true))}
              className="hidden items-center gap-1.5 rounded-lg p-2.5 text-[#6A5A4A] transition hover:bg-[#E8E0D4]/50 hover:text-[#2B2620] sm:flex"
            >
              <User size={18} className={isAuthenticated ? "text-[#B58A4A]" : ""} />
              {isAuthenticated && <span className="max-w-[90px] truncate text-xs font-semibold text-[#14261F]">{user?.fullName?.split(" ")[0]}</span>}
            </button>
            <button type="button" aria-label="Ouvrir le panier" onClick={() => setCartOpen(true)} className="relative rounded-lg p-2.5 text-[#6A5A4A] transition hover:bg-[#E8E0D4]/50 hover:text-[#2B2620]">
              <ShoppingBag size={18} />
              {cartCount > 0 && <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#1B3A2D] px-1 text-[10px] font-bold text-white">{cartCount}</span>}
            </button>
            <button type="button" aria-label="Ouvrir le menu" onClick={() => setMenuOpen(true)} className="rounded-lg p-2.5 text-[#6A5A4A] transition hover:bg-[#E8E0D4]/50 hover:text-[#2B2620] lg:hidden">
              <Menu size={18} />
            </button>
          </div>
        </div>
      </header>

      {searchOpen && (
        <div className="border-b border-[#E8E0D4] bg-[#F8F4EC] px-5 py-3">
          <div className="mx-auto flex max-w-7xl items-center gap-3">
            <Search size={16} className="text-[#8A7A6A]" />
            <input autoFocus type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") openBoutique(); }} placeholder="Rechercher un produit..." className="flex-1 bg-transparent text-sm text-[#2B2620] placeholder:text-[#8A7A6A] focus:outline-none" />
            {searchTerm && <button type="button" onClick={() => setSearchTerm("")} className="text-xs font-bold text-[#8A7A6A] hover:text-[#2B2620]">Effacer</button>}
          </div>
        </div>
      )}

      {menuOpen && (
        <div className="fixed inset-0 z-[70] bg-[#F8F4EC] p-6 lg:hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BrandLogo className="h-7 w-auto" />
              <span className="font-serif text-lg font-normal text-[#2B2620]">Lim'Elle</span>
            </div>
            <button type="button" aria-label="Fermer" onClick={() => setMenuOpen(false)} className="rounded-lg p-2 hover:bg-[#E8E0D4]/50"><X size={20} /></button>
          </div>
          <nav className="mt-8 flex flex-col">
            {[
              { id: "accueil", label: "Accueil" },
              { id: "categories", label: "Catégories" },
              { id: "products", label: "Boutique" },
              { id: "sur-mesure", label: "Demande Sur-Mesure" },
              { id: "faq", label: "FAQ & Questions" },
              { id: "apropos", label: "À propos" },
              { id: "contact", label: "Contact" },
            ].map(({ id, label }) => (
              <button
                key={id}
                onClick={() => {
                  setMenuOpen(false);
                  if (id === "products") openBoutique();
                  else if (id === "categories") openCategories();
                  else scrollTo(id);
                }}
                className={`border-b border-[#E8E0D4] py-4 text-left text-lg font-medium ${(navOverride || activeSection) === id ? "text-[#B58A4A]" : "text-[#6A5A4A]"}`}
              >
                {label}
              </button>
            ))}
          </nav>
          <div className="mt-8 pt-6 border-t border-[#E8E0D4]">
            {isAuthenticated ? (
              <button
                onClick={() => { setMenuOpen(false); setProfileModalOpen(true); }}
                className="flex w-full items-center justify-between rounded-xl bg-white border border-[#E8E0D4] p-4 text-sm font-semibold text-[#14261F]"
              >
                <span>Mon Compte ({user?.fullName})</span>
                <User size={18} className="text-[#B58A4A]" />
              </button>
            ) : (
              <button
                onClick={() => { setMenuOpen(false); setAuthModalOpen(true); }}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#14261F] py-3.5 text-xs font-semibold text-white shadow-sm"
              >
                <User size={16} /> Se connecter / S'inscrire
              </button>
            )}
          </div>
        </div>
      )}

      {selectedProduct ? <ProductDetails product={selectedProduct} onBack={() => setSelectedProduct(null)} onAddToCart={addToCart} /> : <>
        <div id="accueil" className="scroll-mt-16"><BrandHero onCatalogue={openBoutique} /></div>

        <div id="catalogue-wrapper">
          <CatalogueSection categories={CATEGORIES} products={filteredProducts} activeCategory={filter} onCategoryChange={setFilter} onAddToCart={addToCart} onSelectProduct={setSelectedProduct} />
        </div>

        {/* Section Demande Sur-Mesure (Personal Shopping Dakar -> Niamey) */}
        <CustomRequestSection />

        {/* Section Trésors Botaniques du Sahel */}
        <BotanicalTreasuresSection />

        {/* Section Rituel Beauté en 3 Étapes */}
        <BeautyRitualSection onDiscover={openBoutique} />

        {/* FAQ Déroulante Interactive */}
        <FaqSection />

        {/* Section À Propos & Vision de Marque */}
        <AboutSection />

        {/* Section Contact & Conciergerie */}
        <ContactSection />

        <TrustBar />

        {/* Bottom CTA banner */}
        <section className="bg-[#1B3A2D] px-5 py-9">
          <div className="mx-auto flex max-w-5xl flex-col items-center gap-5 text-center md:flex-row md:justify-between md:text-left">
            <div className="flex items-center gap-3.5">
              <Leaf size={24} className="text-[#C8B99A]" aria-hidden="true" />
              <p className="font-serif text-lg font-normal italic text-white md:text-xl">
                La beauté n'est pas un luxe, c'est votre droit.
              </p>
            </div>
            <button
              onClick={openBoutique}
              className="inline-flex items-center gap-2 rounded-xl bg-[#142D24] border border-white/20 px-6 py-3 text-xs font-bold text-white transition hover:bg-[#0E2019]"
            >
              Découvrir la boutique <span aria-hidden="true">→</span>
            </button>
          </div>
        </section>
      </>}

      <footer className="border-t border-[#E8E0D4] bg-[#F8F4EC] px-5 py-14">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2"><BrandLogo className="h-8 w-auto" /><span className="text-lg font-semibold text-[#2B2620]">Lim'Elle</span></div>
            <p className="mt-1 text-[10px] font-semibold uppercase tracking-[.12em] text-[#B58A4A]">{LIMELLE_CONFIG.tagline}</p>
            <p className="mt-4 max-w-xs text-sm leading-6 text-[#8A7A6A]">Votre destination beauté et élégance de confiance au Sahel. Des produits d'exception pour sublimer votre éclat naturel.</p>
            <div className="mt-5 flex items-center gap-3">
              {LIMELLE_CONFIG.social.instagramHandle && (
                <a
                  href={LIMELLE_CONFIG.social.instagramUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Suivez Lim'Elle sur Instagram"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-[#14261F] text-[#C8B99A] shadow-2xs transition hover:bg-[#B58A4A] hover:text-white"
                >
                  <InstagramIcon size={17} />
                </a>
              )}
              <a
                href={LIMELLE_CONFIG.social.facebookUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Suivez Lim'Elle sur Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#14261F] text-[#C8B99A] shadow-2xs transition hover:bg-[#B58A4A] hover:text-white"
              >
                <FacebookIcon size={17} />
              </a>
            </div>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[.2em] text-[#2B2620]">Boutique</p>
            <nav className="mt-4 flex flex-col gap-2.5 text-sm text-[#6A5A4A]">
              <button onClick={() => { setFilter("soins-visage"); scrollTo("products"); }} className="text-left hover:text-[#B58A4A] transition">Soins visage</button>
              <button onClick={() => { setFilter("soins-corps"); scrollTo("products"); }} className="text-left hover:text-[#B58A4A] transition">Soins corps</button>
              <button onClick={() => { setFilter("parfums"); scrollTo("products"); }} className="text-left hover:text-[#B58A4A] transition">Parfums</button>
              <button onClick={() => { setFilter("accessoires"); scrollTo("products"); }} className="text-left hover:text-[#B58A4A] transition">Accessoires</button>
              <button onClick={openBoutique} className="text-left font-semibold text-[#B58A4A] hover:underline transition">Tous les produits</button>
            </nav>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[.2em] text-[#2B2620]">Support</p>
            <nav className="mt-4 flex flex-col gap-2.5 text-sm text-[#6A5A4A]">
              <a href={`https://wa.me/${LIMELLE_CONFIG.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="hover:text-[#B58A4A] transition">Centre d'aide</a>
              <a href={`https://wa.me/${LIMELLE_CONFIG.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="hover:text-[#B58A4A] transition">Contactez-nous</a>
              <span className="text-left">Livraison & retours</span>
            </nav>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[.2em] text-[#2B2620]">Legal</p>
            <nav className="mt-4 flex flex-col gap-2.5 text-sm text-[#6A5A4A]">
              <span className="text-left">Politique de confidentialité</span>
              <span className="text-left">Conditions générales</span>
              <span className="text-left">Mentions légales</span>
            </nav>
          </div>
        </div>
        <div className="mx-auto mt-10 flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-[#E8E0D4] pt-6 text-xs text-[#8A7A6A] sm:flex-row">
          <p>&copy; 2026 Lim'Elle. Tous droits réservés.</p>
          <p className="text-[11px] text-[#8A7A6A]/80">Cosmétiques et Soins Naturels d'Exception • Sahel</p>
        </div>
      </footer>

      <WhatsAppButton className="fixed bottom-5 right-5 z-40 h-14 w-14 rounded-full bg-[#25D366] p-0 text-white shadow-xl" message={WA_TEXT} iconSize={26} aria-label="Contacter Lim'Elle sur WhatsApp" />
      {cartOpen && <CartDrawer items={cart} onClose={() => setCartOpen(false)} onQuantityChange={updateQuantity} onRemove={removeFromCart} onCheckout={startCheckout} />}
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
      <UserProfileModal isOpen={profileModalOpen} onClose={() => setProfileModalOpen(false)} />
      <AdminModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
        products={products}
        onRefreshProducts={loadCatalog}
      />
    </main>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

