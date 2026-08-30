import { useMemo, useState } from "react";
import { ArrowLeft, Minus, Plus, ShoppingBag, Package } from "lucide-react";
import { formatXof, buildGlobalPrice } from "../utils/limelle";
import WhatsAppButton from "./WhatsAppButton";

export default function ProductDetails({ product, onBack, onAddToCart }) {
  const [size, setSize] = useState(product.sizes?.[0] ?? "Unique");
  const [color, setColor] = useState(product.colors?.[0] ?? "Selon disponibilité");
  const [quantity, setQuantity] = useState(1);

  const totalWeight = useMemo(() => product.weight * quantity, [product.weight, quantity]);
  const totalEstimate = useMemo(() => buildGlobalPrice({ productPrice: product.price * quantity, weightKg: totalWeight }), [product.price, totalWeight]);
  const selectedProduct = { ...product, selectedSize: size, selectedColor: color };
  const message = `Bonjour Lim'Elle 🌸\nJe souhaite commander / vérifier ce produit :\n\n${product.name}\nQuantité : ${quantity}\nTaille : ${size}\nCouleur : ${color}\nPoids estimé : ${totalWeight.toFixed(2)} kg\nPrix global indicatif : ${formatXof(totalEstimate)}\n\nMerci de confirmer la disponibilité et le prix final.`;

  const handleAdd = () => onAddToCart?.(selectedProduct, quantity);

  return (
    <section className="view-transition mx-auto max-w-5xl px-5 pb-16 pt-8">
      <button onClick={onBack} className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#57534E] transition-colors duration-300 hover:text-[#1C1917]">
        <ArrowLeft size={17} /> Retour au catalogue
      </button>
      <div className="grid gap-10 md:grid-cols-2">
        <img src={product.img} alt={product.name} className="aspect-[3/4] w-full rounded-[1.5rem] object-cover shadow-sm bg-[#F5F3EF]" />
        <div>
          <div className="inline-flex rounded-lg bg-[#1C1917]/80 px-3 py-1.5 text-[10px] font-semibold text-white backdrop-blur-sm">{product.badge}</div>
          <h1 className="mt-4 font-serif text-3xl font-semibold tracking-tight text-[#1C1917] md:text-4xl">{product.name}</h1>
          <p className="mt-3 text-sm leading-relaxed text-[#57534E]">{product.description ?? "Article sélectionné avec soin par Lim'Elle. Les détails sont confirmés avant paiement."}</p>
          {/* Prix & Remise éventuelle */}
          <div className="mt-5 flex items-baseline gap-3">
            <div className="text-2xl font-bold text-[#1C1917] md:text-3xl">
              {formatXof(totalEstimate)}
            </div>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-base text-[#A8A29E] line-through">
                {formatXof(product.originalPrice * quantity)}
              </span>
            )}
            {product.discountPercent && (
              <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-bold text-red-800">
                -{product.discountPercent}%
              </span>
            )}
          </div>
          <p className="mt-1.5 flex items-center gap-1.5 text-xs text-[#78716C]">
            <Package size={12} className="text-[#A16207]" aria-hidden="true" />
            Sélectionné à <strong className="text-[#1C1917]">Dakar</strong>, expédié et livré à <strong className="text-[#1C1917]">Niamey</strong> (fret GP inclus).
          </p>

          {product.sizes?.length > 0 && (
            <div className="mt-6">
              <label className="text-xs font-bold uppercase tracking-wider text-[#1C1917]">Taille / Format</label>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.sizes.map((item) => (
                  <button type="button" key={item} onClick={() => setSize(item)} className={`rounded-xl border px-4 py-2 text-xs font-semibold transition-all duration-300 ${size === item ? "border-[#A16207] bg-[#A16207] text-white shadow-sm" : "border-[#E7E5E4] bg-white text-[#1C1917] hover:border-[#A16207]/40"}`}>{item}</button>
                ))}
              </div>
            </div>
          )}

          {product.colors?.length > 0 && (
            <div className="mt-5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#1C1917]">Variante</label>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.colors.map((item) => (
                  <button type="button" key={item} onClick={() => setColor(item)} className={`rounded-xl border px-4 py-2 text-xs font-semibold transition-all duration-300 ${color === item ? "border-[#A16207] bg-[#A16207] text-white shadow-sm" : "border-[#E7E5E4] bg-white text-[#1C1917] hover:border-[#A16207]/40"}`}>{item}</button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 flex items-center justify-between rounded-[1.25rem] bg-white border border-[#E7E5E4] p-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1C1917]">Quantité</span>
            <div className="flex items-center gap-3">
              <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="rounded-xl bg-[#F5F3EF] p-2 transition-colors duration-300 hover:bg-[#E7E5E4]"><Minus size={15} /></button>
              <strong className="min-w-6 text-center text-sm">{quantity}</strong>
              <button type="button" onClick={() => setQuantity(quantity + 1)} className="rounded-xl bg-[#F5F3EF] p-2 transition-colors duration-300 hover:bg-[#E7E5E4]"><Plus size={15} /></button>
            </div>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <button type="button" onClick={handleAdd} className="btn-shimmer inline-flex items-center justify-center gap-2 rounded-xl bg-[#1C1917] px-5 py-3.5 font-semibold text-white shadow-md transition-all duration-300 hover:bg-[#0C0A09] hover:shadow-lg">
              <ShoppingBag size={17} /> Ajouter au panier
            </button>
            <WhatsAppButton message={message} className="bg-[#25D366] text-white rounded-xl py-3.5 font-semibold shadow-md transition-all duration-300 hover:bg-[#20BA5A] hover:shadow-lg">
              Commander sur WhatsApp
            </WhatsAppButton>
          </div>
        </div>
      </div>
    </section>
  );
}
