import { useMemo, useState } from "react";
import { ArrowLeft, Minus, Plus, ShoppingBag } from "lucide-react";
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
      <button onClick={onBack} className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#6A5A4A] hover:text-[#2B2620]">
        <ArrowLeft size={17} /> Retour au catalogue
      </button>
      <div className="grid gap-8 md:grid-cols-2">
        <img src={product.img} alt={product.name} className="aspect-[3/4] w-full rounded-3xl object-cover shadow-sm bg-[#F4EFE6]" />
        <div>
          <div className="inline-flex rounded-full bg-[#F4EFE6] px-3.5 py-1 text-xs font-bold text-[#B58A4A]">{product.badge}</div>
          <h1 className="mt-4 font-serif text-3xl font-medium text-[#2B2620] md:text-4xl">{product.name}</h1>
          <p className="mt-3 text-sm leading-relaxed text-[#6A5A4A]">{product.description ?? "Produit sélectionné avec soin par Lim'Elle. Les détails sont confirmés avant paiement."}</p>
          {/* Prix & Remise éventuelle */}
          <div className="mt-5 flex items-baseline gap-3">
            <div className="text-2xl font-bold text-[#14261F] md:text-3xl">
              {formatXof(totalEstimate)}
            </div>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-base text-[#8A7A6A] line-through">
                {formatXof(product.originalPrice * quantity)}
              </span>
            )}
            {product.discountPercent && (
              <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-bold text-red-800">
                -{product.discountPercent}%
              </span>
            )}
          </div>
          <p className="mt-1 text-xs text-[#8A7A6A]">
            📦 Sélectionné à <strong>Dakar</strong>, expédié et livré à <strong>Niamey</strong> (fret GP inclus).
          </p>

          {product.sizes?.length > 0 && <div className="mt-6"><label className="text-xs font-bold uppercase tracking-wider text-[#2B2620]">Contenance / Format</label><div className="mt-2 flex flex-wrap gap-2">{product.sizes.map((item) => <button type="button" key={item} onClick={() => setSize(item)} className={`rounded-xl border px-4 py-2 text-xs font-bold transition ${size === item ? "border-[#B58A4A] bg-[#B58A4A] text-white" : "border-[#E8E0D4] bg-white text-[#2B2620]"}`}>{item}</button>)}</div></div>}

          {product.colors?.length > 0 && <div className="mt-5"><label className="text-xs font-bold uppercase tracking-wider text-[#2B2620]">Variante</label><div className="mt-2 flex flex-wrap gap-2">{product.colors.map((item) => <button type="button" key={item} onClick={() => setColor(item)} className={`rounded-xl border px-4 py-2 text-xs font-bold transition ${color === item ? "border-[#B58A4A] bg-[#B58A4A] text-white" : "border-[#E8E0D4] bg-white text-[#2B2620]"}`}>{item}</button>)}</div></div>}

          <div className="mt-6 flex items-center justify-between rounded-2xl bg-white border border-[#E8E0D4] p-3.5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2B2620]">Quantité</span>
            <div className="flex items-center gap-3">
              <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="rounded-lg bg-[#F4EFE6] p-2 hover:bg-[#EAE4D8]"><Minus size={15} /></button>
              <strong className="min-w-6 text-center text-sm">{quantity}</strong>
              <button type="button" onClick={() => setQuantity(quantity + 1)} className="rounded-lg bg-[#F4EFE6] p-2 hover:bg-[#EAE4D8]"><Plus size={15} /></button>
            </div>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <button type="button" onClick={handleAdd} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#14261F] px-5 py-3.5 font-bold text-white shadow-sm transition hover:bg-[#0E1B15]">
              <ShoppingBag size={17} /> Ajouter au panier
            </button>
            <WhatsAppButton message={message} className="bg-[#25D366] text-white rounded-xl py-3.5 font-bold shadow-md hover:bg-[#20BA5A]">
              Commander en 1 clic sur WhatsApp
            </WhatsAppButton>
          </div>
        </div>
      </div>
    </section>
  );
}
