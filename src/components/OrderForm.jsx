import { useState } from "react";
import { ArrowLeft, MapPin, UserRound } from "lucide-react";
import { DELIVERY_MODES } from "../types/customer";
import { api } from "../services/api";
import { formatXof } from "../utils/limelle";

const MAX_NOTES_LENGTH = 500;

export default function OrderForm({ items, onBack, onComplete }) {
  const [form, setForm] = useState({ fullName: "", phone: "", city: "Niamey", deliveryMode: DELIVERY_MODES.PICKUP, deliveryAddress: "", notes: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const productTotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const weight = items.reduce((sum, item) => sum + item.product.weight * item.quantity, 0);
  const transport = Math.max(1, Math.ceil(weight)) * 4000;
  const total = productTotal + transport;
  const update = (field, value) => setForm((current) => ({ ...current, [field]: value }));

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    if (!form.fullName.trim() || !form.phone.trim() || !form.city.trim()) return setError("Renseigne ton nom, ton numéro et ta ville.");
    if (form.deliveryMode === DELIVERY_MODES.HOME && !form.deliveryAddress.trim()) return setError("Renseigne ton adresse pour la livraison à domicile.");
    if (form.notes.length > MAX_NOTES_LENGTH) return setError(`La note est limitée à ${MAX_NOTES_LENGTH} caractères.`);

    setSubmitting(true);
    try {
      const order = await api.createOrder({ items, customer: form, deliveryMode: form.deliveryMode, deliveryAddress: form.deliveryAddress, notes: form.notes });
      onComplete(order);
    } catch (requestError) {
      setError(requestError.message || "Impossible d'envoyer la commande.");
    } finally {
      setSubmitting(false);
    }
  };

  return <section className="mx-auto max-w-4xl px-5 pb-16 pt-8"><button type="button" onClick={onBack} className="mb-6 inline-flex items-center gap-2 text-sm font-bold"><ArrowLeft size={17}/> Retour au panier</button><div className="grid gap-6 md:grid-cols-[1.1fr_.9fr]"><form onSubmit={submit} className="rounded-3xl bg-white p-6"><div className="flex items-center gap-2"><UserRound size={20}/><h1 className="text-2xl font-semibold">Tes informations</h1></div><p className="mt-2 text-sm text-[#5B5348]">Ces informations servent à préparer ta commande. Le prix final sera confirmé avant paiement.</p><div className="mt-6 grid gap-4"><label className="text-sm font-bold">Nom complet<input required value={form.fullName} onChange={(e)=>update("fullName",e.target.value)} className="mt-2 w-full rounded-2xl border border-black/10 px-4 py-3 outline-none" placeholder="Prénom et nom"/></label><label className="text-sm font-bold">Téléphone WhatsApp<input required value={form.phone} onChange={(e)=>update("phone",e.target.value)} className="mt-2 w-full rounded-2xl border border-black/10 px-4 py-3 outline-none" placeholder="+227 ..."/></label><label className="text-sm font-bold">Ville<input required value={form.city} onChange={(e)=>update("city",e.target.value)} className="mt-2 w-full rounded-2xl border border-black/10 px-4 py-3 outline-none" placeholder="Niamey"/></label><div><span className="text-sm font-bold">Réception</span><div className="mt-2 grid gap-2 sm:grid-cols-2"><button type="button" onClick={()=>update("deliveryMode",DELIVERY_MODES.PICKUP)} className={`rounded-2xl border p-4 text-left ${form.deliveryMode===DELIVERY_MODES.PICKUP?"border-[#B8753C] bg-[#EBE3D2]":"border-black/10"}`}><MapPin size={18}/><strong className="mt-2 block">Point de retrait</strong><span className="text-xs text-[#5B5348]">Chez Lim’Elle à Niamey</span></button><button type="button" onClick={()=>update("deliveryMode",DELIVERY_MODES.HOME)} className={`rounded-2xl border p-4 text-left ${form.deliveryMode===DELIVERY_MODES.HOME?"border-[#B8753C] bg-[#EBE3D2]":"border-black/10"}`}><MapPin size={18}/><strong className="mt-2 block">À domicile</strong><span className="text-xs text-[#5B5348]">Selon disponibilité du service</span></button></div></div>{form.deliveryMode===DELIVERY_MODES.HOME&&<label className="text-sm font-bold">Adresse<input required value={form.deliveryAddress} onChange={(e)=>update("deliveryAddress",e.target.value)} className="mt-2 w-full rounded-2xl border border-black/10 px-4 py-3 outline-none" placeholder="Quartier, rue, repère"/></label>}<label className="text-sm font-bold">Note (facultatif)<textarea maxLength={MAX_NOTES_LENGTH} value={form.notes} onChange={(e)=>update("notes",e.target.value)} className="mt-2 min-h-24 w-full rounded-2xl border border-black/10 px-4 py-3 outline-none" placeholder="Précision sur la commande"/><span className="mt-1 block text-xs font-normal text-[#5B5348]">{form.notes.length}/{MAX_NOTES_LENGTH}</span></label>{error&&<p className="rounded-2xl bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p>}<button type="submit" disabled={submitting} className="rounded-full bg-[#B8753C] px-6 py-3 font-bold text-white disabled:cursor-not-allowed disabled:opacity-60">{submitting ? "Envoi en cours…" : "Envoyer la commande"}</button></div></form><aside className="h-fit rounded-3xl bg-[#EBE3D2] p-6"><h2 className="text-xl font-semibold">Résumé indicatif</h2><div className="mt-5 space-y-3">{items.map((item)=><div key={`${item.product.id}-${item.product.selectedSize}-${item.product.selectedColor}`} className="flex justify-between gap-4 text-sm"><span>{item.product.name} × {item.quantity}</span><strong>{formatXof(item.product.price*item.quantity)}</strong></div>)}</div><div className="mt-5 border-t border-black/10 pt-4 text-sm"><div className="flex justify-between"><span>Poids estimé</span><strong>{weight.toFixed(2)} kg</strong></div><div className="mt-2 flex justify-between"><span>Transport estimé</span><strong>{formatXof(transport)}</strong></div><div className="mt-3 flex justify-between text-lg font-extrabold"><span>Total indicatif</span><strong>{formatXof(total)}</strong></div></div><p className="mt-4 text-xs leading-5 text-[#5B5348]">Le serveur recalcule les produits, le transport et le total avant d'enregistrer la commande.</p></aside></div></section>;
}
