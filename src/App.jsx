import React, { useEffect, useMemo, useState } from "react";
import { MessageCircle, Plane, Search, PackageCheck, ShoppingBag } from "lucide-react";
import { LIMELLE_CONFIG } from "./config/limelle";
import { CATEGORIES, FAQS } from "./data/catalog";
import { api } from "./services/api";
import WhatsAppButton from "./components/WhatsAppButton";
import BrandHero from "./components/BrandHero";
import CatalogueSection from "./components/CatalogueSection";
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

  useEffect(() => {
    let active = true;
    api.products()
      .then((payload) => { if (active) setProducts(Array.isArray(payload.products) ? payload.products : []); })
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
  const scrollToCatalogue = () => document.getElementById("catalogue")?.scrollIntoView({ behavior: "smooth" });

  if (order) return <main className="min-h-screen bg-[#F5F0E6] text-[#2B2620]"><OrderConfirmation order={order} onDone={() => setOrder(null)} /></main>;
  if (checkout) return <main className="min-h-screen bg-[#F5F0E6] text-[#2B2620]"><OrderForm items={cart} onBack={() => setCheckout(false)} onComplete={completeOrder}/></main>;

  return <main className="min-h-screen bg-[#F8F4EC] text-[#2B2620]">
    <header className="sticky top-0 z-40 border-b border-black/10 bg-[#F8F4EC]/95 backdrop-blur"><div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4"><div><div className="text-2xl font-semibold tracking-[-.03em]">Lim'Elle</div><div className="text-[10px] font-bold tracking-[.16em] text-[#6A5A4A]">DAKAR → NIAMEY</div></div><div className="flex items-center gap-2"><button onClick={() => setCartOpen(true)} className="relative rounded-full bg-white p-3 shadow-sm" aria-label="Ouvrir le panier"><ShoppingBag size={18} />{cartCount > 0 && <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#A6512F] px-1 text-[10px] font-bold text-white">{cartCount}</span>}</button><WhatsAppButton className="bg-[#3FBF63] text-white" message={WA_TEXT}>WhatsApp</WhatsAppButton></div></div></header>
    {selectedProduct ? <ProductDetails product={selectedProduct} onBack={() => setSelectedProduct(null)} onAddToCart={addToCart} /> : <>
      <BrandHero onCatalogue={scrollToCatalogue} />
      <section className="mx-auto max-w-6xl px-5 pb-14"><div className="mb-7 flex items-end justify-between gap-5"><div><p className="text-xs font-bold uppercase tracking-[.18em] text-[#6A5A4A]">L'expérience Lim'Elle</p><h2 className="mt-2 text-3xl font-semibold tracking-[-.025em] md:text-4xl">De Dakar à Niamey, avec simplicité.</h2></div><p className="hidden max-w-sm text-right text-sm leading-6 text-[#6A5A4A] md:block">Une sélection pensée pour une clientèle qui aime le style, la qualité et les belles pièces africaines contemporaines.</p></div><div className="grid gap-3 md:grid-cols-4">{[[Search,"Tu recherches","Choisis une pièce ou envoie une demande précise."],[MessageCircle,"On confirme","Disponibilité et prix global avant paiement."],[PackageCheck,"On achète","L'approvisionnement est effectué à Dakar."],[Plane,"On expédie","Ton colis rejoint Niamey par GP ou particulier."]].map(([Icon,title,text])=><div key={title} className="rounded-[1.5rem] border border-black/5 bg-white p-5 shadow-sm"><Icon size={21} className="text-[#A6512F]"/><h3 className="mt-5 font-bold">{title}</h3><p className="mt-2 text-sm leading-5 text-[#6A5A4A]">{text}</p></div>)}</div></section>
      <div id="catalogue">{catalogError ? <section className="mx-auto max-w-6xl px-5 pb-14"><div className="rounded-3xl bg-red-50 p-5 text-sm font-semibold text-red-700">{catalogError}</div></section> : <CatalogueSection categories={CATEGORIES} products={filteredProducts} activeCategory={filter} onCategoryChange={setFilter} onProductSelect={setSelectedProduct}/>}</div>
      <TransportEstimator config={LIMELLE_CONFIG} weight={kg} onWeightChange={setKg}/>
      <section className="mx-auto max-w-6xl px-5 pb-16"><div className="overflow-hidden rounded-[2rem] bg-[#2B2620] p-7 text-white md:p-10"><div className="max-w-2xl"><span className="text-xs font-bold uppercase tracking-[.18em] text-white/60">Sur-mesure</span><h2 className="mt-3 text-3xl font-semibold tracking-[-.025em] md:text-4xl">Une pièce précise en tête ?</h2><p className="mt-4 leading-7 text-white/70">Envoie une photo, une description, une taille, une couleur et ton budget. Lim'Elle recherche la pièce à Dakar puis te propose un prix global.</p><WhatsAppButton className="mt-7 bg-[#3FBF63] text-white" message="Bonjour Lim'Elle 🌸\nJ'ai une demande sur-mesure :\n\nProduit recherché :\nTaille :\nCouleur :\nBudget :">Faire une demande</WhatsAppButton></div></div></section>
      <section className="mx-auto max-w-6xl px-5 pb-16"><p className="text-xs font-bold uppercase tracking-[.18em] text-[#6A5A4A]">Besoin d'aide</p><h2 className="mt-2 text-3xl font-semibold tracking-[-.025em]">Questions fréquentes</h2><FaqList items={FAQS} activeIndex={faq} onToggle={setFaq}/></section>
    </>}
    <footer className="bg-[#2B2620] px-5 py-10 text-white"><div className="mx-auto max-w-6xl"><div className="text-2xl font-semibold">Lim'Elle</div><p className="mt-2 text-sm text-white/70">Ton shopping à Dakar, livré à Niamey.</p><p className="mt-5 text-sm">WhatsApp : +227 99 20 57 39</p><p className="mt-2 text-xs text-white/50">© 2026 Lim'Elle. Les prix affichés restent indicatifs jusqu'à confirmation de disponibilité.</p></div></footer>
    {cartOpen && <CartDrawer items={cart} onClose={() => setCartOpen(false)} onQuantityChange={updateQuantity} onRemove={removeFromCart} onCheckout={startCheckout}/>} 
  </main>;
}
