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
      <button onClick={onBack} className="mb-6 inline-flex items-center gap-2 text-sm font-bold"><ArrowLeft size={17} /> Retour au catalogue</button>
      <div className="grid gap-8 md:grid-cols-2">
        <img src={product.img} alt={product.name} className="aspect-[3/4] w-full rounded-3xl object-cover" />
        <div>
          <div className="inline-flex rounded-full bg-[#EBE3D2] px-3 py-1 text-xs font-bold">{product.badge}</div>
          <h1 className="mt-4 text-4xl font-semibold">{product.name}</h1>
          <p className="mt-4 leading-7 text-[#5B5348]">{product.description ?? "Produit recherché à Dakar par Lim'Elle. Les détails sont confirmés avant paiement."}</p>
          <div className="mt-6 text-2xl font-extrabold text-[#A6512F]">À partir de {formatXof(totalEstimate)}</div>
          <p className="mt-1 text-xs leading-5 text-[#5B5348]">Prix indicatif incluant l'estimation du transport. Le montant final est confirmé après vérification.</p>

          {product.sizes?.length > 0 && <div className="mt-7"><label className="text-sm font-bold">Taille</label><div className="mt-2 flex flex-wrap gap-2">{product.sizes.map((item) => <button type="button" key={item} onClick={() => setSize(item)} className={`rounded-full border px-4 py-2 text-sm font-bold ${size === item ? "border-[#C1613F] bg-[#C1613F] text-white" : "border-black/10 bg-white"}`}>{item}</button>)}</div></div>}

          {product.colors?.length > 0 && <div className="mt-6"><label className="text-sm font-bold">Couleur</label><div className="mt-2 flex flex-wrap gap-2">{product.colors.map((item) => <button type="button" key={item} onClick={() => setColor(item)} className={`rounded-full border px-4 py-2 text-sm font-bold ${color === item ? "border-[#C1613F] bg-[#C1613F] text-white" : "border-black/10 bg-white"}`}>{item}</button>)}</div></div>}

          <div className="mt-6 flex items-center justify-between rounded-2xl bg-[#EBE3D2] p-3"><span className="text-sm font-bold">Quantité</span><div className="flex items-center gap-3"><button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="rounded-full bg-white p-2"><Minus size={16} /></button><strong>{quantity}</strong><button type="button" onClick={() => setQuantity(quantity + 1)} className="rounded-full bg-white p-2"><Plus size={16} /></button></div></div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2"><button type="button" onClick={handleAdd} className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C1613F] px-5 py-3 font-bold text-white"><ShoppingBag size={18} /> Ajouter au panier</button><WhatsAppButton message={message} className="bg-[#3FBF63] text-white">Vérifier et commander</WhatsAppButton></div>
        </div>
      </div>
    </section>
  );
}
