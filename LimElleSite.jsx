import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Menu, X, Instagram, Facebook, MessageCircle, Search, CreditCard,
  PackageCheck, Plane, ShieldCheck, Sparkles, ChevronDown, Scale
} from "lucide-react";

// ═══════════════════════════════════════════════════════════════════════
// 👉 CONFIG À REMPLIR — tes vrais liens/numéro, un seul endroit à éditer
// ═══════════════════════════════════════════════════════════════════════
const SOCIAL = {
  instagramUrl: "https://instagram.com/TON_COMPTE",     // ex: https://instagram.com/limelle_dkr
  instagramHandle: "@limelle",                            // affiché en clair si besoin
  facebookUrl: "https://facebook.com/TA_PAGE",           // ex: https://facebook.com/limelle.dakar
  whatsappNumber: "22700000000",                          // format international SANS le +
};
const EASE = "cubic-bezier(.16,1,.3,1)"; // easing "expo-out" utilisé partout pour la fluidité

const waLink = (text) => `https://wa.me/${SOCIAL.whatsappNumber}?text=${encodeURIComponent(text)}`;

// ---------------------------------------------------------------------------
// DESIGN TOKENS
// ---------------------------------------------------------------------------
const COLORS = {
  cream: "#F5F0E6",
  creamDeep: "#EBE3D2",
  ink: "#2B2620",
  inkSoft: "#5B5348",
  terracotta: "#C1613F",
  terracottaDeep: "#A6512F",
  sage: "#6E7A63",
  whatsapp: "#3FBF63",
  line: "rgba(43,38,32,0.12)",
};

// ---------------------------------------------------------------------------
// CONTENT
// ---------------------------------------------------------------------------
const CATEGORIES = [
  { id: "tenues", label: "Tenues", emoji: "👗", desc: "Robes, ensembles, must-have du moment",
    img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop" },
  { id: "accessoires", label: "Accessoires", emoji: "👜", desc: "Sacs, bijoux, la touche qui change tout",
    img: "https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=800&auto=format&fit=crop" },
  { id: "beaute", label: "Beauté", emoji: "💄", desc: "Soins & cosmétiques tendance",
    img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop" },
  { id: "surmesure", label: "Sur-mesure", emoji: "✨", desc: "Une envie précise ? On vous la trouve à Dakar",
    img: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=800&auto=format&fit=crop" },
];

const PRODUCTS = [
  { id: 1, cat: "tenues", name: "Boubou Bazin rhapsodie terracotta", price: 35000, weight: "0,8", badge: "Nouveau",
    img: "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?q=80&w=700&auto=format&fit=crop" },
  { id: 2, cat: "tenues", name: "Ensemble wax & pagne tissé main", price: 30000, weight: "0,9", badge: "1 seul exemplaire",
    img: "https://images.unsplash.com/photo-1554412933-514a83d2f3c8?q=80&w=700&auto=format&fit=crop" },
  { id: 3, cat: "accessoires", name: "Sac cuir tanné & fermoir doré", price: 24000, weight: "1,1", badge: "Coup de cœur",
    img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=700&auto=format&fit=crop" },
  { id: 4, cat: "accessoires", name: "Parure Touareg argent & corail", price: 17000, weight: "0,3", badge: "Artisan Niger",
    img: "https://images.unsplash.com/photo-1611955167811-4711904bb9f8?q=80&w=700&auto=format&fit=crop" },
  { id: 5, cat: "beaute", name: "Beurre de karité & sérum éclat", price: 12000, weight: "0,4", badge: "100% naturel",
    img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=700&auto=format&fit=crop" },
  { id: 6, cat: "accessoires", name: "Foulard Fouta djenné teinture naturelle", price: 13000, weight: "0,2", badge: "1 seul exemplaire",
    img: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=700&auto=format&fit=crop" },
];

const STEPS = [
  { icon: Search, num: "ÉTAPE 1", title: "Parcourez", text: "Choisissez vos articles préférés sur le catalogue." },
  { icon: MessageCircle, num: "ÉTAPE 2", title: "Contactez", text: "Cliquez sur WhatsApp, on confirme la dispo et le prix total." },
  { icon: CreditCard, num: "ÉTAPE 3", title: "Payez", text: "Réglez en toute confiance avant l'envoi." },
  { icon: PackageCheck, num: "ÉTAPE 4", title: "Recevez", text: "Votre colis prend l'avion et arrive chez vous au Niger." },
];

const FAQS = [
  { q: "Comment est calculé le prix du transport ?",
    a: "Le tarif est calculé au poids réel du colis (kg) et communiqué avant tout paiement. Vous savez exactement combien vous coûte l'envoi avant de confirmer." },
  { q: "Combien de temps pour recevoir ma commande ?",
    a: "Comptez en moyenne 5 à 9 jours après l'expédition depuis Dakar, avec un suivi tenu à jour sur WhatsApp." },
  { q: "Puis-je grouper plusieurs articles pour économiser sur le transport ?",
    a: "Oui, c'est même vivement conseillé ! Grouper vos articles dans un même envoi permet de mutualiser le poids et donc de réduire le coût du fret par article." },
];

const TESTIMONIALS = [
  { quote: "Tout est arrivé nickel, bien emballé. J'ai adoré la communication sur WhatsApp, rassurante à chaque étape 💛", name: "Aïssatou", city: "Niamey" },
  { quote: "Robe sublime et fidèle à la photo. Le délai a été respecté. Je recommande les yeux fermés !", name: "Mariama", city: "Zinder" },
  { quote: "Le sur-mesure a été parfait : j'ai décrit ce que je voulais et elles ont trouvé exactement ça. Bravo !", name: "Fadima", city: "Maradi" },
];

// ---------------------------------------------------------------------------
// HOOKS & MICRO-COMPONENTS
// ---------------------------------------------------------------------------

// Reveal on scroll — fade + slide, expo-out
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}
function Reveal({ children, delay = 0, className = "" }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(22px)",
      transition: `opacity .8s ${EASE} ${delay}ms, transform .8s ${EASE} ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

// Blur-up image: soft focus + scale while loading, snaps crisp on load
function FadeImage({ src, alt, style = {} }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <img
      src={src} alt={alt} onLoad={() => setLoaded(true)}
      style={{
        position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
        filter: loaded ? "blur(0px)" : "blur(14px)",
        transform: loaded ? "scale(1)" : "scale(1.08)",
        opacity: loaded ? 1 : 0.7,
        transition: `filter .7s ${EASE}, transform .9s ${EASE}, opacity .5s ${EASE}`,
        ...style,
      }}
    />
  );
}

// Count-up number — smooth interpolation on value change (ease-out cubic)
function useCountUp(target, duration = 500) {
  const [display, setDisplay] = useState(target);
  const prevRef = useRef(target);
  useEffect(() => {
    const start = prevRef.current;
    const startTime = performance.now();
    let raf;
    function tick(now) {
      const t = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(start + (target - start) * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
      else prevRef.current = target;
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return display;
}

// Magnetic button — gently follows the cursor within its bounds, springs back
function Magnetic({ as = "button", children, className, style, strength = 0.3, ...props }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [tracking, setTracking] = useState(false);
  const Tag = as;
  const onMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    setTracking(true);
    setPos({ x: (e.clientX - rect.left - rect.width / 2) * strength, y: (e.clientY - rect.top - rect.height / 2) * strength });
  };
  const onLeave = () => { setTracking(false); setPos({ x: 0, y: 0 }); };
  return (
    <Tag
      ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} onTouchStart={onLeave}
      className={className}
      style={{
        ...style,
        transform: `translate(${pos.x}px, ${pos.y}px) ${style?.baseTransform || ""}`,
        transition: tracking ? "transform .15s linear" : `transform .55s ${EASE}`,
      }}
      {...props}
    >
      {children}
    </Tag>
  );
}

const WaIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2m4.5 12.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.9 1-.3.2-.6.1a6.6 6.6 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3.1-.2 0-.4 0-.5s-.6-1.5-.8-2-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-1 2.3c0 1.3 1 2.6 1.1 2.8.1.2 2 3 4.7 4.2a13 13 0 0 0 1.6.6 3.8 3.8 0 0 0 1.8.1c.5-.1 1.5-.6 1.8-1.2s.3-1.1.2-1.2-.2-.2-.4-.3" />
  </svg>
);

// ---------------------------------------------------------------------------
// MAIN COMPONENT
// ---------------------------------------------------------------------------
export default function LimElleSite() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [headerHidden, setHeaderHidden] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [fading, setFading] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [kg, setKg] = useState(1);

  const lastY = useRef(0);
  const sectionRefs = {
    hero: useRef(null), catalogue: useRef(null), produits: useRef(null),
    livraison: useRef(null), surmesure: useRef(null),
  };

  // Scroll tracking — drives header hide/show, progress bar, parallax, all in one listener
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrollY(y);
      if (y > lastY.current + 4 && y > 120) setHeaderHidden(true);
      else if (y < lastY.current - 4 || y < 120) setHeaderHidden(false);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const docProgress = (() => {
    if (typeof window === "undefined") return 0;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    return max > 0 ? Math.min(1, scrollY / max) : 0;
  })();

  const scrollTo = useCallback((key) => {
    sectionRefs[key]?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const goToCategory = (catId) => {
    setMenuOpen(false);
    setFading(true);
    setTimeout(() => { setActiveFilter(catId); setFading(false); }, 200);
    setTimeout(() => scrollTo("produits"), 80);
  };
  const setFilter = (f) => {
    setFading(true);
    setTimeout(() => { setActiveFilter(f); setFading(false); }, 200);
  };

  const filteredProducts = activeFilter === "all" ? PRODUCTS : PRODUCTS.filter(p => p.cat === activeFilter);
  const rawPrice = Math.round((kg * 3500) / 100) * 100;
  const animatedPrice = useCountUp(rawPrice);
  const animatedKg = useCountUp(kg, 250);

  return (
    <div style={{ background: COLORS.cream, color: COLORS.ink, fontFamily: "'Manrope', sans-serif" }} className="min-h-screen overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,500;0,9..144,600;1,9..144,500&family=Manrope:wght@400;500;600;700;800&display=swap');
        html { scroll-behavior: smooth; }
        .serif { font-family: 'Fraunces', serif; letter-spacing: -0.01em; }
        .faq-panel { display: grid; grid-template-rows: 0fr; transition: grid-template-rows .4s ${EASE}; }
        .faq-panel.open { grid-template-rows: 1fr; }
        .faq-inner { overflow: hidden; }
        @keyframes pulseRing {
          0% { box-shadow: 0 0 0 0 rgba(63,191,99,0.55); }
          70% { box-shadow: 0 0 0 16px rgba(63,191,99,0); }
          100% { box-shadow: 0 0 0 0 rgba(63,191,99,0); }
        }
        @keyframes floatY { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
        .pulse-wa { animation: pulseRing 2.4s infinite, floatY 3.2s ease-in-out infinite; }
        .chip-btn { transition: background .3s ${EASE}, color .3s ${EASE}, transform .3s ${EASE}; }
        .chip-btn.active { transform: scale(1.05); box-shadow: 0 8px 18px -6px rgba(193,97,63,0.5); }
        .chip-btn:active { transform: scale(0.94); }
        .cat-card { transition: transform .45s ${EASE}, box-shadow .45s ${EASE}; }
        .cat-card:hover { transform: translateY(-6px); box-shadow: 0 20px 34px -14px rgba(43,38,32,0.35); }
        .cat-card:hover .cat-img-inner { transform: scale(1.08); }
        .cat-img-inner { transition: transform .6s ${EASE}; }
        .btn-press { transition: transform .35s ${EASE}, box-shadow .35s ${EASE}; }
        .btn-press:active { transform: scale(0.95) !important; }
        .link-underline { position: relative; }
        .link-underline::after {
          content: ''; position: absolute; left: 0; bottom: -2px; width: 0; height: 2px;
          background: currentColor; transition: width .4s ${EASE};
        }
        .link-underline:hover::after { width: 100%; }
      `}</style>

      {/* ================= SCROLL PROGRESS ================= */}
      <div style={{
        position: "fixed", top: 0, left: 0, height: 3, zIndex: 90,
        width: `${docProgress * 100}%`,
        background: `linear-gradient(90deg, ${COLORS.terracotta}, #E8C382)`,
        transition: "width .08s linear",
      }} />

      {/* ================= HEADER ================= */}
      <header
        style={{
          position: "sticky", top: 0, zIndex: 50,
          background: "rgba(245,240,230,0.92)", backdropFilter: "blur(10px)",
          borderBottom: `1px solid ${COLORS.line}`,
          transform: headerHidden ? "translateY(-100%)" : "translateY(0)",
          transition: `transform .45s ${EASE}, padding .3s ${EASE}`,
        }}
      >
        <div className="max-w-xl mx-auto flex items-center justify-between px-6" style={{ paddingTop: scrollY > 40 ? 10 : 16, paddingBottom: scrollY > 40 ? 10 : 16 }}>
          <button onClick={() => scrollTo("hero")} className="text-left btn-press">
            <div className="serif font-semibold" style={{ fontSize: scrollY > 40 ? 20 : 24, transition: `font-size .3s ${EASE}` }}>Lim'Elle</div>
            <div style={{ fontSize: 10.5, letterSpacing: "0.14em", color: COLORS.inkSoft, fontWeight: 700 }}>MODE · BEAUTÉ · DAKAR → NIGER</div>
          </button>
          <button onClick={() => setMenuOpen(true)} aria-label="Menu" className="w-11 h-11 rounded-full flex items-center justify-center btn-press" style={{ background: COLORS.creamDeep }}>
            <Menu size={20} />
          </button>
        </div>
      </header>

      {/* ================= MENU OVERLAY ================= */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 60, background: COLORS.cream,
        transform: menuOpen ? "translateY(0)" : "translateY(-100%)",
        transition: `transform .5s ${EASE}`, overflowY: "auto",
      }}>
        <div className="max-w-xl mx-auto flex items-center justify-between px-6 py-4" style={{ borderBottom: `1px solid ${COLORS.line}` }}>
          <div>
            <div className="serif font-semibold text-2xl">Lim'Elle</div>
            <div style={{ fontSize: 10.5, letterSpacing: "0.14em", color: COLORS.inkSoft, fontWeight: 700 }}>MODE · BEAUTÉ · DAKAR → NIGER</div>
          </div>
          <button onClick={() => setMenuOpen(false)} className="w-11 h-11 rounded-full flex items-center justify-center btn-press" style={{ background: COLORS.creamDeep }}>
            <X size={20} />
          </button>
        </div>
        <nav className="max-w-xl mx-auto px-6 pt-2 pb-6">
          {["hero-Accueil"].map((_, i) => null)}
          <button onClick={() => { setMenuOpen(false); scrollTo("hero"); }} className="w-full text-left serif text-2xl py-4 btn-press" style={{ borderBottom: `1px solid ${COLORS.line}` }}>Accueil</button>
          {CATEGORIES.map((c, i) => (
            <button key={c.id} onClick={() => goToCategory(c.id)} className="w-full text-left serif text-2xl py-4 btn-press"
              style={{
                borderBottom: `1px solid ${COLORS.line}`,
                opacity: menuOpen ? 1 : 0, transform: menuOpen ? "translateX(0)" : "translateX(-14px)",
                transition: `opacity .5s ${EASE} ${120 + i * 60}ms, transform .5s ${EASE} ${120 + i * 60}ms`,
              }}>
              {c.label}
            </button>
          ))}
          <button onClick={() => { setMenuOpen(false); scrollTo("livraison"); }} className="w-full text-left serif text-2xl py-4 btn-press">Livraison</button>
        </nav>
        <div className="max-w-xl mx-auto flex gap-3 px-6 pb-8">
          <a href={SOCIAL.instagramUrl} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full flex items-center justify-center btn-press" style={{ background: COLORS.creamDeep }}><Instagram size={18} /></a>
          <a href={SOCIAL.facebookUrl} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full flex items-center justify-center btn-press" style={{ background: COLORS.creamDeep }}><Facebook size={18} /></a>
          <a href={waLink("Bonjour, je viens du site Lim'Elle 🌸")} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full flex items-center justify-center btn-press" style={{ background: COLORS.whatsapp, color: "#fff" }}><WaIcon width={18} height={18} /></a>
        </div>
      </div>

      {/* ================= HERO (parallax) ================= */}
      <section ref={sectionRefs.hero} style={{ position: "relative", minHeight: "88vh", display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{
          position: "absolute", inset: -60,
          transform: `translateY(${Math.min(scrollY * 0.35, 160)}px) scale(1.08)`,
          transition: "transform .05s linear",
          background: `linear-gradient(180deg, rgba(30,22,15,0.05) 0%, rgba(20,14,8,0.35) 55%, rgba(15,10,6,0.62) 100%), url('https://images.unsplash.com/photo-1594736797933-d0c6b6f5bcf5?q=80&w=1400&auto=format&fit=crop') center 20%/cover no-repeat`,
        }} />
        <div className="max-w-xl mx-auto px-6 relative z-10" style={{ marginTop: "auto", paddingBottom: 28, color: "#fff" }}>
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-bold mb-4" style={{ background: "rgba(255,255,255,0.14)", border: "1px solid rgba(255,255,255,0.3)", backdropFilter: "blur(6px)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
              ✈️ Dakar → Niamey · Fret aérien
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="serif" style={{ fontSize: 42, color: "#fff", lineHeight: 1.08 }}>
              La mode et la beauté de <span style={{ color: "#E8C382", fontStyle: "italic" }}>Dakar</span>, livrées chez vous au <span style={{ color: "#E8C382", fontStyle: "italic" }}>Niger</span> ✈️
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-4" style={{ fontSize: 16, lineHeight: 1.55, maxWidth: "36ch", color: "rgba(255,255,255,0.92)" }}>
              Parcourez le catalogue, choisissez vos coups de cœur — on gère la commande et l'envoi par avion jusqu'à vous. Sublime, simple, sans stress 🌸
            </p>
          </Reveal>
          <Reveal delay={300}>
            <div className="mt-6 flex flex-col gap-3">
              <Magnetic as="button" onClick={() => scrollTo("catalogue")} strength={0.25} className="w-full py-4 rounded-full font-bold flex items-center justify-center gap-2 btn-press" style={{ background: COLORS.creamDeep, color: COLORS.ink }}>
                Découvrir le catalogue <ChevronDown size={18} />
              </Magnetic>
              <Magnetic as="a" href={waLink("Bonjour, je viens du site Lim'Elle et je souhaite passer commande 🌸")} target="_blank" rel="noreferrer" strength={0.25}
                className="w-full py-4 rounded-full font-bold flex items-center justify-center gap-2 btn-press"
                style={{ background: COLORS.whatsapp, color: "#fff", boxShadow: "0 10px 24px -8px rgba(63,191,99,0.55)" }}>
                <WaIcon width={20} height={20} /> Commander sur WhatsApp
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= REASSURANCE ================= */}
      <div className="max-w-xl mx-auto grid grid-cols-2 px-6 py-5">
        {[
          { icon: Plane, text: "Livraison par fret aérien" },
          { icon: MessageCircle, text: "Commande simple sur WhatsApp" },
          { icon: Sparkles, text: "Produits sélectionnés à Dakar" },
          { icon: ShieldCheck, text: "Paiement sécurisé à la commande" },
        ].map((item, i) => (
          <Reveal key={i} delay={i * 70} className="flex items-center gap-3.5 py-5">
            <div style={{ width: 52, height: 52, borderRadius: "50%", background: COLORS.creamDeep, color: COLORS.terracottaDeep, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <item.icon size={22} />
            </div>
            <span className="text-sm font-semibold" style={{ lineHeight: 1.3 }}>{item.text}</span>
          </Reveal>
        ))}
      </div>

      {/* ================= CATEGORIES ================= */}
      <section ref={sectionRefs.catalogue} className="pt-14">
        <Reveal className="max-w-xl mx-auto px-6 pb-6">
          <span className="text-xs font-bold uppercase" style={{ letterSpacing: "0.18em", color: COLORS.inkSoft }}>Le catalogue</span>
          <h2 className="serif mt-2" style={{ fontSize: 32 }}>Que cherchez-vous aujourd'hui ? 🌸</h2>
        </Reveal>
        <div className="max-w-xl mx-auto grid grid-cols-2 gap-3.5 px-6">
          {CATEGORIES.map((c, i) => (
            <Reveal key={c.id} delay={i * 90}>
              <button onClick={() => goToCategory(c.id)} className="cat-card relative w-full rounded-3xl overflow-hidden text-left" style={{ aspectRatio: "3/4" }}>
                <div className="cat-img-inner" style={{ position: "absolute", inset: 0 }}>
                  <FadeImage src={c.img} alt={c.label} />
                </div>
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.55) 100%)" }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 16, color: "#fff" }}>
                  <div className="serif" style={{ fontSize: 22 }}>{c.label}</div>
                  <p className="mt-1" style={{ fontSize: 12, opacity: 0.9, lineHeight: 1.35 }}>{c.desc}</p>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================= PRODUITS ================= */}
      <section ref={sectionRefs.produits} className="pt-14">
        <Reveal className="max-w-xl mx-auto px-6 pb-6">
          <span className="text-xs font-bold uppercase" style={{ letterSpacing: "0.18em", color: COLORS.inkSoft }}>Fraîchement arrivées de Dakar</span>
          <h2 className="serif mt-2" style={{ fontSize: 32 }}>Les nouveautés du moment 🌸</h2>
        </Reveal>

        <div className="max-w-xl mx-auto flex flex-wrap gap-2.5 px-6 pb-7">
          <button onClick={() => setFilter("all")} className={`chip-btn px-4.5 py-3 rounded-full text-sm font-bold ${activeFilter === "all" ? "active" : ""}`} style={{ background: activeFilter === "all" ? COLORS.terracotta : COLORS.creamDeep, color: activeFilter === "all" ? "#fff" : COLORS.ink }}>
            Tout voir
          </button>
          {CATEGORIES.filter(c => c.id !== "surmesure").map(c => (
            <button key={c.id} onClick={() => setFilter(c.id)} className={`chip-btn px-4.5 py-3 rounded-full text-sm font-bold flex items-center gap-1.5 ${activeFilter === c.id ? "active" : ""}`} style={{ background: activeFilter === c.id ? COLORS.terracotta : COLORS.creamDeep, color: activeFilter === c.id ? "#fff" : COLORS.ink }}>
              {c.emoji} {c.label}
            </button>
          ))}
        </div>

        <div className="max-w-xl mx-auto grid grid-cols-2 gap-4 px-6">
          {filteredProducts.map((p, i) => (
            <div key={p.id} className="flex flex-col" style={{
              opacity: fading ? 0 : 1,
              transform: fading ? "translateY(16px) scale(0.97)" : "translateY(0) scale(1)",
              transition: `opacity .5s ${EASE} ${fading ? 0 : i * 55}ms, transform .55s ${EASE} ${fading ? 0 : i * 55}ms`,
            }}>
              <div className="relative rounded-2xl overflow-hidden mb-3" style={{ aspectRatio: "3/4" }}>
                <span className="absolute top-2.5 left-2.5 text-white text-[10.5px] font-bold px-2.5 py-1.5 rounded-full" style={{ background: COLORS.sage, zIndex: 2 }}>{p.badge}</span>
                <span className="absolute top-2.5 right-2.5 text-[10.5px] font-bold px-2.5 py-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.92)", color: COLORS.ink, zIndex: 2 }}>≈ {p.weight} kg</span>
                <FadeImage src={p.img} alt={p.name} />
              </div>
              <div className="serif mb-1.5" style={{ fontSize: 17, lineHeight: 1.25 }}>{p.name}</div>
              <div className="font-extrabold mb-1.5" style={{ fontSize: 16, color: COLORS.terracottaDeep }}>
                {p.price.toLocaleString("fr-FR")} <span className="text-xs font-bold" style={{ color: COLORS.inkSoft }}>FCFA</span>
              </div>
              <p className="mb-3" style={{ fontSize: 11.5, color: COLORS.inkSoft, lineHeight: 1.4 }}>
                Prix article uniquement — frais de transport calculés selon le poids, communiqués sur WhatsApp avant paiement.
              </p>
              <a href={waLink(`Bonjour, je suis intéressée par ${p.name} à ${p.price.toLocaleString("fr-FR")} FCFA. Est-il disponible ?`)} target="_blank" rel="noreferrer"
                 className="btn-press flex items-center justify-center gap-1.5 rounded-full py-3 text-sm font-bold text-white" style={{ background: COLORS.whatsapp }}>
                <WaIcon width={15} height={15} /> Commander
              </a>
            </div>
          ))}
          {filteredProducts.length === 0 && (
            <div className="col-span-2 text-center py-10" style={{ color: COLORS.inkSoft }}>Aucun article dans cette catégorie pour le moment.</div>
          )}
        </div>
      </section>

      {/* ================= COMMENT ÇA MARCHE ================= */}
      <section className="pt-14">
        <Reveal className="max-w-xl mx-auto px-6 pb-6">
          <span className="text-xs font-bold uppercase" style={{ letterSpacing: "0.18em", color: COLORS.inkSoft }}>Étape 1 → 4</span>
          <h2 className="serif mt-2" style={{ fontSize: 32 }}>Commander, c'est tout simple 💛</h2>
        </Reveal>
        <div className="max-w-xl mx-auto px-6">
          {STEPS.map((s, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="flex gap-5 py-6" style={{ borderBottom: i < STEPS.length - 1 ? `1px solid ${COLORS.line}` : "none" }}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", background: COLORS.creamDeep, color: COLORS.terracottaDeep, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <s.icon size={24} />
                </div>
                <div>
                  <div className="text-xs font-bold" style={{ letterSpacing: "0.14em", color: COLORS.inkSoft }}>{s.num}</div>
                  <h3 className="serif" style={{ fontSize: 21, margin: "4px 0 6px" }}>{s.title}</h3>
                  <p style={{ fontSize: 14.5, color: COLORS.inkSoft, lineHeight: 1.4 }}>{s.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================= LIVRAISON ================= */}
      <section ref={sectionRefs.livraison} className="pt-14">
        <Reveal className="max-w-xl mx-auto px-6">
          <div className="rounded-3xl p-7 text-white" style={{ background: `linear-gradient(160deg, ${COLORS.terracotta} 0%, ${COLORS.terracottaDeep} 100%)` }}>
            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-bold mb-4" style={{ background: "rgba(255,255,255,0.16)", letterSpacing: "0.1em" }}>✈️ FRET AÉRIEN DAKAR → NIGER</div>
            <h2 className="serif mb-3.5" style={{ fontSize: 26, color: "#fff" }}>✈️ Livraison par fret aérien — simple et rapide</h2>
            <p style={{ fontSize: 14.5, lineHeight: 1.6, color: "rgba(255,255,255,0.92)" }}>
              Vos articles s'envolent de Dakar directement vers le Niger. Le tarif d'envoi est calculé au kilo, selon le poids réel de votre commande — on vous communique le montant exact avant toute confirmation, sans surprise.
            </p>
            <p className="mt-4" style={{ fontSize: 14.5 }}><b>Délai moyen : 5 à 9 jours</b> après expédition. Vous êtes tenue informée à chaque étape, directement sur WhatsApp.</p>
          </div>
        </Reveal>

        <div className="max-w-xl mx-auto px-6 mt-2">
          {FAQS.map((f, i) => (
            <div key={i} className="py-5" style={{ borderBottom: `1px solid ${COLORS.line}` }}>
              <button onClick={() => setOpenFaq(openFaq === i ? -1 : i)} className="w-full flex items-center justify-between gap-3 text-left font-bold" style={{ fontSize: 15.5 }}>
                {f.q}
                <ChevronDown size={18} style={{ transform: openFaq === i ? "rotate(180deg)" : "rotate(0deg)", transition: `transform .4s ${EASE}`, flexShrink: 0 }} />
              </button>
              <div className={`faq-panel ${openFaq === i ? "open" : ""}`}>
                <div className="faq-inner">
                  <p className="pt-3.5" style={{ fontSize: 14.5, color: COLORS.inkSoft, lineHeight: 1.55 }}>{f.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Reveal className="max-w-xl mx-auto px-6 mt-7">
          <div className="rounded-3xl p-7 text-white" style={{ background: `linear-gradient(160deg, ${COLORS.terracotta} 0%, ${COLORS.terracottaDeep} 100%)` }}>
            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-bold mb-4" style={{ background: "rgba(255,255,255,0.16)", letterSpacing: "0.1em" }}>
              <Scale size={13} /> ESTIMATION INDICATIVE
            </div>
            <h2 className="serif mb-2.5" style={{ fontSize: 24, color: "#fff" }}>Estimez votre envoi</h2>
            <p className="mb-6" style={{ fontSize: 14, color: "rgba(255,255,255,0.9)", lineHeight: 1.55 }}>
              Bougez le curseur pour estimer le coût du transport selon le poids total de votre commande.
            </p>
            <div className="flex justify-between items-baseline mb-2.5">
              <span style={{ fontSize: 15 }}>Poids estimé</span>
              <span className="serif" style={{ fontSize: 32 }}>{animatedKg.toFixed(1).replace(".0","")} kg</span>
            </div>
            <input type="range" min="0.2" max="10" step="0.1" value={kg} onChange={(e) => setKg(parseFloat(e.target.value))} className="w-full" style={{ accentColor: "#fff" }} />
            <div className="rounded-2xl p-5 mt-6" style={{ background: "rgba(255,255,255,0.14)" }}>
              <div style={{ fontSize: 13, opacity: 0.85, marginBottom: 4 }}>Tarif indicatif d'envoi</div>
              <div className="serif" style={{ fontSize: 34 }}>{Math.round(animatedPrice).toLocaleString("fr-FR")} <span style={{ fontFamily: "'Manrope'", fontSize: 13, fontWeight: 700 }}>FCFA</span></div>
              <div style={{ fontSize: 12, opacity: 0.85, marginTop: 10, lineHeight: 1.5 }}>
                Estimation non contractuelle, communiquée pour vous aider à anticiper. Le montant exact vous sera confirmé sur WhatsApp avant paiement.
              </div>
            </div>
            <Magnetic as="a" href={waLink(`Bonjour, je souhaite connaître le tarif exact de livraison pour environ ${kg} kg.`)} target="_blank" rel="noreferrer" strength={0.2}
              className="btn-press mt-5 w-full py-4 rounded-full font-bold flex items-center justify-center" style={{ background: "#fff", color: COLORS.terracottaDeep }}>
              Demander le tarif exact
            </Magnetic>
          </div>
        </Reveal>
      </section>

      {/* ================= SUR-MESURE ================= */}
      <section ref={sectionRefs.surmesure} className="pt-14">
        <Reveal className="max-w-xl mx-auto px-6">
          <div className="relative rounded-3xl overflow-hidden mb-6" style={{ aspectRatio: "4/3" }}>
            <FadeImage src="https://images.unsplash.com/photo-1584285405429-136bf988c1a8?q=80&w=900&auto=format&fit=crop" alt="Sur-mesure atelier" />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold mb-3.5" style={{ background: COLORS.creamDeep }}>✨ Sur-mesure</div>
          <h2 className="serif mb-3.5" style={{ fontSize: 27 }}>Vous avez une idée précise en tête ?</h2>
          <p className="mb-5" style={{ fontSize: 14.5, color: COLORS.inkSoft, lineHeight: 1.6 }}>
            Décrivez-nous l'article que vous recherchez — tenue, sac, produit de beauté — on vous propose une sélection depuis Dakar.
          </p>
          <Magnetic as="a" href={waLink("Bonjour, j'ai une demande sur-mesure : ")} target="_blank" rel="noreferrer" strength={0.2}
            className="btn-press w-full py-4 rounded-full font-bold flex items-center justify-center gap-2 text-white" style={{ background: COLORS.whatsapp }}>
            <WaIcon width={20} height={20} /> Faire une demande sur WhatsApp
          </Magnetic>
        </Reveal>
      </section>

      {/* ================= TÉMOIGNAGES ================= */}
      <section className="pt-14">
        <Reveal className="max-w-xl mx-auto px-6 pb-6">
          <h2 className="serif" style={{ fontSize: 30 }}>Elles nous font confiance 💬</h2>
        </Reveal>
        <div className="max-w-xl mx-auto px-6">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="bg-white rounded-3xl p-6 mb-4" style={{ border: `1px solid ${COLORS.line}` }}>
                <span className="serif block mb-3" style={{ fontSize: 40, color: "#E3B79A", lineHeight: 0.5 }}>"</span>
                <p className="mb-5" style={{ fontSize: 15.5, lineHeight: 1.5 }}>{t.quote}</p>
                <div className="flex items-center gap-3">
                  <div className="serif rounded-full flex items-center justify-center" style={{ width: 44, height: 44, background: COLORS.creamDeep, color: COLORS.terracottaDeep, fontSize: 17 }}>{t.name[0]}</div>
                  <div>
                    <div className="font-extrabold" style={{ fontSize: 14.5 }}>{t.name}</div>
                    <div style={{ fontSize: 12.5, color: COLORS.inkSoft }}>{t.city}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================= SOCIAL CTA ================= */}
      <section className="pt-6">
        <Reveal className="max-w-xl mx-auto px-6">
          <h2 className="serif mb-3" style={{ fontSize: 28 }}>Ne manquez aucune nouveauté</h2>
          <p className="mb-5" style={{ fontSize: 14.5, color: COLORS.inkSoft, lineHeight: 1.6 }}>
            Le catalogue est mis à jour régulièrement, mais les vraies pépites arrivent d'abord sur Instagram et Facebook 🌸
          </p>
          <div className="flex flex-col gap-3">
            <a href={SOCIAL.instagramUrl} target="_blank" rel="noreferrer" className="btn-press flex items-center gap-2.5 pl-5 py-4 rounded-full font-bold" style={{ background: COLORS.creamDeep }}>
              <Instagram size={20} /> Suivre sur Instagram
            </a>
            <a href={SOCIAL.facebookUrl} target="_blank" rel="noreferrer" className="btn-press flex items-center gap-2.5 pl-5 py-4 rounded-full font-bold" style={{ background: COLORS.creamDeep }}>
              <Facebook size={20} /> Suivre sur Facebook
            </a>
            <a href={waLink("Bonjour, je viens du site Lim'Elle 🌸")} target="_blank" rel="noreferrer" className="btn-press flex items-center gap-2.5 pl-5 py-4 rounded-full font-bold text-white" style={{ background: COLORS.whatsapp }}>
              <WaIcon width={20} height={20} /> WhatsApp
            </a>
          </div>
        </Reveal>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="mt-14" style={{ background: COLORS.ink, color: "rgba(255,255,255,0.85)" }}>
        <div className="max-w-xl mx-auto px-6 pt-11 pb-8">
          <div className="serif" style={{ fontSize: 26, color: "#fff" }}>Lim'Elle</div>
          <div className="mb-4.5" style={{ fontSize: 11, letterSpacing: "0.14em", color: "rgba(255,255,255,0.55)", fontWeight: 700 }}>MODE · BEAUTÉ · DAKAR → NIGER</div>
          <div className="flex items-center gap-2 mb-8" style={{ fontSize: 14 }}>✈️ Basée à Dakar 🇸🇳 — Livraison partout au Niger 🇳🇪</div>

          <div className="grid grid-cols-2 gap-5 mb-7">
            <div>
              <div className="mb-3.5 text-xs font-bold" style={{ letterSpacing: "0.14em", color: "rgba(255,255,255,0.45)" }}>LIENS RAPIDES</div>
              {CATEGORIES.map(c => (
                <button key={c.id} onClick={() => goToCategory(c.id)} className="link-underline block text-left py-1.5" style={{ fontSize: 15 }}>{c.label}</button>
              ))}
            </div>
            <div className="pt-6">
              <button onClick={() => scrollTo("livraison")} className="link-underline block text-left py-1.5" style={{ fontSize: 15 }}>Livraison</button>
            </div>
          </div>

          <div className="text-xs font-bold mb-3.5" style={{ letterSpacing: "0.14em", color: "rgba(255,255,255,0.45)" }}>CONTACT</div>
          <div className="flex gap-3 mb-3.5">
            <a href={SOCIAL.instagramUrl} target="_blank" rel="noreferrer" className="btn-press w-11 h-11 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.1)" }}><Instagram size={18} color="#fff" /></a>
            <a href={SOCIAL.facebookUrl} target="_blank" rel="noreferrer" className="btn-press w-11 h-11 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.1)" }}><Facebook size={18} color="#fff" /></a>
            <a href={waLink("Bonjour, je viens du site Lim'Elle 🌸")} target="_blank" rel="noreferrer" className="btn-press w-11 h-11 rounded-full flex items-center justify-center" style={{ background: COLORS.whatsapp }}><WaIcon width={18} height={18} color="#fff" /></a>
          </div>
          <div style={{ fontSize: 14, color: "rgba(255,255,255,0.7)" }}>WhatsApp : +227 00 00 00 00</div>
        </div>
        <div className="text-center px-6 py-5" style={{ borderTop: "1px solid rgba(255,255,255,0.12)", fontSize: 12.5, color: "rgba(255,255,255,0.5)", lineHeight: 1.8, paddingBottom: 110 }}>
          © 2026 Lim'Elle. Tous droits réservés.<br />Paiement sécurisé à la commande · Sans surprise 🌸
        </div>
      </footer>

      {/* ================= FLOATING WHATSAPP ================= */}
      <Magnetic as="a" href={waLink("Bonjour, je viens du site Lim'Elle et je souhaite passer commande 🌸")} target="_blank" rel="noreferrer" strength={0.35}
        className="pulse-wa btn-press"
        style={{
          position: "fixed", bottom: 22, right: 20, zIndex: 70,
          width: 58, height: 58, borderRadius: "50%", background: COLORS.whatsapp,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
        <WaIcon width={28} height={28} color="#fff" />
      </Magnetic>
    </div>
  );
}
