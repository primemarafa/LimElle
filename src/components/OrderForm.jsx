import { useState } from "react";
import { ArrowLeft, MapPin, UserRound } from "lucide-react";
import { DELIVERY_MODES } from "../types/customer";
import { LIMELLE_CONFIG } from "../config/limelle";
import { api } from "../services/api";
import { formatXof } from "../utils/limelle";

const MAX_NOTES_LENGTH = 500;

export default function OrderForm({ items, onBack, onComplete }) {
  const homeDeliveryEnabled = Boolean(LIMELLE_CONFIG.transport.homeDeliveryEnabled);
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    city: "Niamey",
    deliveryMode: DELIVERY_MODES.PICKUP,
    deliveryAddress: "",
    notes: "",
  });
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const productTotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const weight = items.reduce((sum, item) => sum + item.product.weight * item.quantity, 0);
  const transport = Math.max(1, Math.ceil(weight)) * LIMELLE_CONFIG.transport.ratePerKg;
  const total = productTotal + transport;

  const update = (field, value) => setForm((current) => ({ ...current, [field]: value }));
  const clearFieldError = (field) => setFieldErrors((previous) => ({ ...previous, [field]: "" }));

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    setFieldErrors({});

    if (!form.fullName.trim()) return setFieldErrors({ fullName: "Veuillez entrer votre nom complet" });
    if (!form.phone.trim()) return setFieldErrors({ phone: "Veuillez entrer votre numéro de téléphone" });
    if (!form.city.trim()) return setFieldErrors({ city: "Veuillez entrer votre ville" });
    if (form.deliveryMode === DELIVERY_MODES.HOME && homeDeliveryEnabled && !form.deliveryAddress.trim()) {
      return setFieldErrors({ deliveryAddress: "Veuillez entrer votre adresse de livraison" });
    }
    if (form.notes.length > MAX_NOTES_LENGTH) return setFieldErrors({ notes: `La note est limitée à ${MAX_NOTES_LENGTH} caractères` });

    setSubmitting(true);
    try {
      const order = await api.createOrder({
        items,
        customer: form,
        deliveryMode: form.deliveryMode,
        deliveryAddress: form.deliveryMode === DELIVERY_MODES.HOME ? form.deliveryAddress : "",
        notes: form.notes,
      });
      onComplete(order);
    } catch (requestError) {
      setError(requestError.message || "Impossible d'envoyer la commande.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="mx-auto max-w-4xl px-5 pb-16 pt-8">
      <button type="button" onClick={onBack} className="mb-6 inline-flex items-center gap-2 text-sm font-bold">
        <ArrowLeft size={17} /> Retour au panier
      </button>

      <div className="grid gap-6 md:grid-cols-[1.1fr_.9fr]">
        <form onSubmit={submit} className="rounded-3xl bg-white p-6">
          <div className="flex items-center gap-2"><UserRound size={20} /><h1 className="text-2xl font-semibold">Tes informations</h1></div>
          <p className="mt-2 text-sm text-[#5B5348]">Ces informations servent à préparer ta commande. Le prix final sera confirmé avant paiement.</p>

          <div className="mt-6 grid gap-4">
            <Field id="fullName" label="Nom complet" value={form.fullName} error={fieldErrors.fullName} onChange={(value) => { update("fullName", value); clearFieldError("fullName"); }} placeholder="Prénom et nom" />
            <Field id="phone" label="Téléphone WhatsApp" value={form.phone} error={fieldErrors.phone} onChange={(value) => { update("phone", value); clearFieldError("phone"); }} placeholder="+227 ..." inputMode="tel" />
            <Field id="city" label="Ville" value={form.city} error={fieldErrors.city} onChange={(value) => { update("city", value); clearFieldError("city"); }} placeholder="Niamey" />

            <div>
              <label className="mb-1 block text-sm font-bold">Réception <span className="text-red-500">*</span></label>
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                <DeliveryOption selected={form.deliveryMode === DELIVERY_MODES.PICKUP} onClick={() => update("deliveryMode", DELIVERY_MODES.PICKUP)} title="Point de retrait" description="Chez Lim’Elle à Niamey" />
                {homeDeliveryEnabled && <DeliveryOption selected={form.deliveryMode === DELIVERY_MODES.HOME} onClick={() => update("deliveryMode", DELIVERY_MODES.HOME)} title="À domicile" description="Selon disponibilité du service" />}
              </div>
            </div>

            {homeDeliveryEnabled && form.deliveryMode === DELIVERY_MODES.HOME && (
              <Field id="deliveryAddress" label="Adresse" value={form.deliveryAddress} error={fieldErrors.deliveryAddress} onChange={(value) => { update("deliveryAddress", value); clearFieldError("deliveryAddress"); }} placeholder="Quartier, rue, repère" />
            )}

            <div>
              <label htmlFor="notes" className="mb-1 block text-sm font-bold">Note (facultatif)</label>
              <textarea id="notes" maxLength={MAX_NOTES_LENGTH} value={form.notes} onChange={(event) => { update("notes", event.target.value); clearFieldError("notes"); }} className="mt-2 min-h-24 w-full rounded-2xl border border-black/10 px-4 py-3 outline-none focus:ring-2 focus:ring-[#B8753C]" placeholder="Précision sur la commande" />
              <div className="mt-1 flex justify-between text-xs text-[#5B5348]"><span>{form.notes.length}/{MAX_NOTES_LENGTH}</span>{fieldErrors.notes && <span className="font-semibold text-red-600">{fieldErrors.notes}</span>}</div>
            </div>
          </div>

          {error && <p className="mt-4 rounded-2xl bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p>}

          <button type="submit" disabled={submitting} className="mt-5 flex w-full items-center justify-center rounded-full bg-[#B8753C] px-6 py-3 font-bold text-white transition-colors hover:bg-[#c8854a] disabled:cursor-not-allowed disabled:opacity-60">
            {submitting ? "Envoi en cours…" : "Envoyer la commande"}
          </button>
        </form>

        <aside className="h-fit rounded-3xl bg-[#EBE3D2] p-6">
          <h2 className="text-xl font-semibold">Résumé indicatif</h2>
          <div className="mt-5 space-y-3">
            {items.map((item) => <div key={`${item.product.id}-${item.product.selectedSize || ""}-${item.product.selectedColor || ""}`} className="flex justify-between gap-4 text-sm"><span>{item.product.name} × {item.quantity}</span><strong>{formatXof(item.product.price * item.quantity)}</strong></div>)}
          </div>
          <div className="mt-5 border-t border-black/10 pt-4 text-sm">
            <div className="flex justify-between"><span>Poids estimé</span><strong>{weight.toFixed(2)} kg</strong></div>
            <div className="mt-2 flex justify-between"><span>Transport estimé</span><strong>{formatXof(transport)}</strong></div>
            <div className="mt-3 flex justify-between text-lg font-extrabold"><span>Total indicatif</span><strong>{formatXof(total)}</strong></div>
          </div>
          <p className="mt-4 text-xs leading-5 text-[#5B5348]">Le serveur recalcule les produits, le transport et le total avant d'enregistrer la commande.</p>
        </aside>
      </div>
    </section>
  );
}

function Field({ id, label, value, error, onChange, placeholder, inputMode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-bold">{label} <span className="text-red-500">*</span></label>
      <input id={id} required value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 w-full rounded-2xl border border-black/10 px-4 py-3 outline-none focus:ring-2 focus:ring-[#B8753C]" placeholder={placeholder} inputMode={inputMode} aria-describedby={error ? `${id}-error` : undefined} />
      {error && <p id={`${id}-error`} className="mt-1 text-sm font-semibold text-red-600">{error}</p>}
    </div>
  );
}

function DeliveryOption({ selected, onClick, title, description }) {
  return (
    <button type="button" onClick={onClick} className={`rounded-2xl border p-4 text-left ${selected ? "border-[#B8753C] bg-[#EBE3D2]" : "border-black/10 hover:bg-[#F8F3EA]"}`} role="radio" aria-checked={selected}>
      <MapPin size={18} />
      <div className="flex flex-col items-start"><strong className="mt-2 block">{title}</strong><span className="text-xs text-[#5B5348]">{description}</span></div>
    </button>
  );
}
