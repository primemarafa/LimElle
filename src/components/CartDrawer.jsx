import { ShoppingBag, X, Minus, Plus, Trash2 } from "lucide-react";
import { formatXof, buildGlobalPrice } from "../utils/limelle";
import WhatsAppButton from "./WhatsAppButton";

export default function CartDrawer({ items, onClose, onQuantityChange, onRemove }) {
  const weight = items.reduce((sum, item) => sum + item.product.weight * item.quantity, 0);
  const productTotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const total = buildGlobalPrice({ productPrice: productTotal, weightKg: weight });
  const reference = `LE-${new Date().getFullYear()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
  const message = `Bonjour Lim'Elle 🌸\nJe souhaite vérifier cette commande :\n\nRéférence : ${reference}\n${items.map((item) => `• ${item.product.name} x${item.quantity}`).join("\n")}\n\nPoids estimé : ${weight.toFixed(2)} kg\nPrix global indicatif : ${formatXof(total)}\n\nMerci de confirmer la disponibilité et le prix final.`;

  return (
    <div className="fixed inset-0 z-50 bg-black/40" onClick={onClose}>
      <aside className="ml-auto flex h-full w-full max-w-md flex-col bg-[#F5F0E6] p-5" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-center justify-between"><h2 className="text-2xl font-semibold">Ton panier</h2><button onClick={onClose} className="rounded-full bg-white p-2"><X size={18} /></button></div>
        {!items.length ? <div className="flex flex-1 flex-col items-center justify-center text-center text-[#5B5348]"><ShoppingBag size={42} /><p className="mt-4">Ton panier est vide.</p></div> : <>
          <div className="mt-6 flex-1 space-y-3 overflow-y-auto">{items.map((item) => <div key={item.product.id} className="rounded-2xl bg-white p-3"><div className="flex gap-3"><img src={item.product.img} alt="" className="h-20 w-16 rounded-xl object-cover" /><div className="min-w-0 flex-1"><div className="font-bold">{item.product.name}</div><div className="mt-1 text-sm text-[#5B5348]">{formatXof(item.product.price)}</div><div className="mt-2 flex items-center justify-between"><div className="flex items-center gap-2"><button onClick={() => onQuantityChange(item.product.id, Math.max(1, item.quantity - 1))} className="rounded-full bg-[#EBE3D2] p-1"><Minus size={14} /></button><span>{item.quantity}</span><button onClick={() => onQuantityChange(item.product.id, item.quantity + 1)} className="rounded-full bg-[#EBE3D2] p-1"><Plus size={14} /></button></div><button onClick={() => onRemove(item.product.id)} className="text-[#A6512F]"><Trash2 size={17} /></button></div></div></div></div>)}</div>
          <div className="mt-5 border-t border-black/10 pt-5"><div className="flex justify-between text-sm"><span>Poids estimé</span><strong>{weight.toFixed(2)} kg</strong></div><div className="mt-2 flex justify-between text-lg font-extrabold"><span>Total indicatif</span><strong>{formatXof(total)}</strong></div><p className="mt-2 text-xs leading-5 text-[#5B5348]">Le prix final et la disponibilité sont confirmés par Lim'Elle avant paiement.</p><WhatsAppButton message={message} className="mt-4 w-full bg-[#3FBF63] text-white">Vérifier la commande</WhatsAppButton></div>
        </>}
      </aside>
    </div>
  );
}
