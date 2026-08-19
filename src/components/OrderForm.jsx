import { useState } from "react";
import { ArrowLeft, MapPin, UserRound } from "lucide-react";
import { DELIVERY_MODES } from "../types/customer";
import { api } from "../services/api";
import { formatXof } from "../utils/limelle";

const MAX_NOTES_LENGTH = 500;

export default function OrderForm({ items, onBack, onComplete }) {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    city: "Niamey",
    deliveryMode: DELIVERY_MODES.PICKUP,
    deliveryAddress: "",
    notes: ""
  });
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const productTotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const weight = items.reduce((sum, item) => sum + item.product.weight * item.quantity, 0);
  const transport = Math.max(1, Math.ceil(weight)) * 4000;
  const total = productTotal + transport;

  const update = (field, value) => setForm((current) => ({ ...current, [field]: value }));

  // Clear field error when user starts typing
  const clearFieldError = (field) => {
    setFieldErrors(prev => ({ ...prev, [field]: "" }));
  };

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    setFieldErrors({});

    // Validation
    if (!form.fullName.trim()) {
      setFieldErrors(prev => ({ ...prev, fullName: "Veuillez entrer votre nom complet" }));
      return;
    }

    if (!form.phone.trim()) {
      setFieldErrors(prev => ({ ...prev, phone: "Veuillez entrer votre numéro de téléphone" }));
      return;
    }

    if (!form.city.trim()) {
      setFieldErrors(prev => ({ ...prev, city: "Veuillez entrer votre ville" }));
      return;
    }

    if (form.deliveryMode === DELIVERY_MODES.HOME && !form.deliveryAddress.trim()) {
      setFieldErrors(prev => ({ ...prev, deliveryAddress: "Veuillez entrer votre adresse de livraison" }));
      return;
    }

    if (form.notes.length > MAX_NOTES_LENGTH) {
      setFieldErrors(prev => ({ ...prev, notes: `La note est limitée à ${MAX_NOTES_LENGTH} caractères` }));
      return;
    }

    setSubmitting(true);
    try {
      const order = await api.createOrder({
        items,
        customer: form,
        deliveryMode: form.deliveryMode,
        deliveryAddress: form.deliveryAddress,
        notes: form.notes
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
        <ArrowLeft size={17}/>
        Retour au panier
      </button>

      <div className="grid gap-6 md:grid-cols-[1.1fr_.9fr]">
        <form onSubmit={submit} className="rounded-3xl bg-white p-6">
          <div className="flex items-center gap-2">
            <UserRound size={20}/>
            <h1 className="text-2xl font-semibold">Tes informations</h1>
          </div>
          <p className="mt-2 text-sm text-[#5B5348]">
            Ces informations servent à préparer ta commande. Le prix final sera confirmé avant paiement.
          </p>

          <div className="mt-6 grid gap-4">
            {/* Full Name field */}
            <div>
              <label htmlFor="fullName" className="text-sm font-bold block mb-1">
                Nom complet <span className="text-red-500">*</span>
              </label>
              <input
                id="fullName"
                required
                value={form.fullName}
                onChange={(e) => {
                  update("fullName", e.target.value);
                  clearFieldError("fullName");
                }}
                className="mt-2 w-full rounded-2xl border border-black/10 px-4 py-3 outline-none focus:ring-2 focus:ring-[#B8753C]"
                placeholder="Prénom et nom"
                aria-describedby={fieldErrors.fullName ? "fullName-error" : undefined}
              />
              {fieldErrors.fullName && (
                <p id="fullName-error" className="mt-1 text-sm font-semibold text-red-600">
                  {fieldErrors.fullName}
                </p>
              )}
            </div>

            {/* Phone field */}
            <div>
              <label htmlFor="phone" className="text-sm font-bold block mb-1">
                Téléphone WhatsApp <span className="text-red-500">*</span>
              </label>
              <input
                id="phone"
                required
                value={form.phone}
                onChange={(e) => {
                  update("phone", e.target.value);
                  clearFieldError("phone");
                }}
                className="mt-2 w-full rounded-2xl border border-black/10 px-4 py-3 outline-none focus:ring-2 focus:ring-[#B8753C]"
                placeholder="+227 ..."
                inputMode="tel"
                aria-describedby={fieldErrors.phone ? "phone-error" : undefined}
              />
              {fieldErrors.phone && (
                <p id="phone-error" className="mt-1 text-sm font-semibold text-red-600">
                  {fieldErrors.phone}
                </p>
              )}
            </div>

            {/* City field */}
            <div>
              <label htmlFor="city" className="text-sm font-bold block mb-1">
                Ville <span className="text-red-500">*</span>
              </label>
              <input
                id="city"
                required
                value={form.city}
                onChange={(e) => {
                  update("city", e.target.value);
                  clearFieldError("city");
                }}
                className="mt-2 w-full rounded-2xl border border-black/10 px-4 py-3 outline-none focus:ring-2 focus:ring-[#B8753C]"
                placeholder="Niamey"
                aria-describedby={fieldErrors.city ? "city-error" : undefined}
              />
              {fieldErrors.city && (
                <p id="city-error" className="mt-1 text-sm font-semibold text-red-600">
                  {fieldErrors.city}
                </p>
              )}
            </div>

            {/* Delivery Mode */}
            <div>
              <label className="text-sm font-bold block mb-1">
                Réception <span className="text-red-500">*</span>
              </label>
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => update("deliveryMode", DELIVERY_MODES.PICKUP)}
                  className={`rounded-2xl border p-4 text-left ${
                    form.deliveryMode === DELIVERY_MODES.PICKUP
                      ? "border-[#B8753C] bg-[#EBE3D2]"
                      : "border-black/10 hover:bg-[#F8F3EA]"
                  }`}
                  role="radio"
                  aria-checked={form.deliveryMode === DELIVERY_MODES.PICKUP}
                >
                  <MapPin size={18}/>
                  <div className="flex flex-col items-start">
                    <strong className="mt-2 block">Point de retrait</strong>
                    <span className="text-xs text-[#5B5348]">Chez Lim’Elle à Niamey</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => update("deliveryMode", DELIVERY_MODES.HOME)}
                  className={`rounded-2xl border p-4 text-left ${
                    form.deliveryMode === DELIVERY_MODES.HOME
                      ? "border-[#B8753C] bg-[#EBE3D2]"
                      : "border-black/10 hover:bg-[#F8F3EA]"
                  }`}
                  role="radio"
                  aria-checked={form.deliveryMode === DELIVERY_MODES.HOME}
                >
                  <MapPin size={18}/>
                  <div className="flex flex-col items-start">
                    <strong className="mt-2 block">À domicile</strong>
                    <span className="text-xs text-[#5B5348]">Selon disponibilité du service</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Delivery Address (conditional) */}
            {form.deliveryMode === DELIVERY_MODES.HOME && (
              <div>
                <label htmlFor="deliveryAddress" className="text-sm font-bold block mb-1">
                  Adresse <span className="text-red-500">*</span>
                </label>
                <input
                  id="deliveryAddress"
                  required
                  value={form.deliveryAddress}
                  onChange={(e) => {
                    update("deliveryAddress", e.target.value);
                    clearFieldError("deliveryAddress");
                  }}
                  className="mt-2 w-full rounded-2xl border border-black/10 px-4 py-3 outline-none focus:ring-2 focus:ring-[#B8753C]"
                  placeholder="Quartier, rue, repère"
                  aria-describedby={fieldErrors.deliveryAddress ? "deliveryAddress-error" : undefined}
                />
                {fieldErrors.deliveryAddress && (
                  <p id="deliveryAddress-error" className="mt-1 text-sm font-semibold text-red-600">
                    {fieldErrors.deliveryAddress}
                  </p>
                )}
              </div>
            )}

            {/* Notes field */}
            <div>
              <label htmlFor="notes" className="text-sm font-bold block mb-1">
                Note (facultatif)
              </label>
              <textarea
                id="notes"
                maxLength={MAX_NOTES_LENGTH}
                value={form.notes}
                onChange={(e) => {
                  update("notes", e.target.value);
                  clearFieldError("notes");
                }}
                className="mt-2 min-h-24 w-full rounded-2xl border border-black/10 px-4 py-3 outline-none focus:ring-2 focus:ring-[#B8753C]"
                placeholder="Précision sur la commande"
              />
              <div className="flex justify-between mt-1">
                <span className="block text-xs font-normal text-[#5B5348]">
                  {form.notes.length}/{MAX_NOTES_LENGTH}
                </span>
                {fieldErrors.notes && (
                  <span className="mt-1 block text-xs font-semibold text-red-600">
                    {fieldErrors.notes}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Global error */}
          {error && (
            <p className="rounded-2xl bg-red-50 p-3 text-sm font-semibold text-red-700 mt-4">
              {error}
            </p>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={submitting}
            className="rounded-full w-full bg-[#B8753C] px-6 py-3 font-bold text-white disabled:cursor-not-allowed disabled:opacity-60 hover:bg-[#c8854a] transition-colors"
          >
            {submitting ? (
              <>
                Envoi en cours…
                <svg className="ml-2 h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                </svg>
              </>
            ) : (
              "Envoyer la commande"
            )}
          </button>
          </form>
        </div>

        <aside className="h-fit rounded-3xl bg-[#EBE3D2] p-6">
          <h2 className="text-xl font-semibold">Résumé indicatif</h2>
          <div className="mt-5 space-y-3">
            {items.map(
              (item) =>
                <div key={`${item.product.id}-${item.product.selectedSize}-${item.product.selectedColor}`}
                     className="flex justify-between gap-4 text-sm">
                  <span>{item.product.name} × {item.quantity}</span>
                  <strong>{formatXof(item.product.price * item.quantity)}</strong>
                </div>
            )}
          </div>
          <div className="mt-5 border-t border-black/10 pt-4 text-sm">
            <div className="flex justify-between">
              <span>Poids estimé</span>
              <strong>{weight.toFixed(2)} kg</strong>
            </div>
            <div className="mt-2 flex justify-between">
              <span>Transport estimé</span>
              <strong>{formatXof(transport)}</strong>
            </div>
            <div className="mt-3 flex justify-between text-lg font-extrabold">
              <span>Total indicatif</span>
              <strong>{formatXof(total)}</strong>
            </div>
          </div>
          <p className="mt-4 text-xs leading-5 text-[#5B5348]">
            Le serveur recalcule les produits, le transport et le total avant d'enregistrer la commande.
          </p>
        </aside>
      </div>
    </section>
  );
}