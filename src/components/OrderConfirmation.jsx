import { CheckCircle2, Copy, FileText, ArrowRight } from "lucide-react";
import { useState } from "react";
import { formatXof } from "../utils/limelle";
import { api } from "../services/api";
import WhatsAppButton from "./WhatsAppButton";

export default function OrderConfirmation({ order, onDone }) {
  const [copied, setCopied] = useState(false);
  const deliveryLabel = order.deliveryMode === "domicile" ? "À domicile" : "Point de retrait";
  const invoiceUrl = order.lookupToken ? api.invoiceUrl(order.lookupToken) : null;

  const message = `Bonjour Lim'Elle 🌸\n\nJe viens de préparer une commande.\nRéférence : ${order.reference}\nCliente : ${order.customer?.fullName || ""}\nTéléphone : ${order.customer?.phone || ""}\nVille : ${order.customer?.city || ""}\nRéception : ${deliveryLabel}\n\nArticles :\n${(order.items || []).map((item) => `• ${item.product.name} x${item.quantity}`).join("\n")}\n\nPoids estimé : ${(order.totals?.weight || 0).toFixed(2)} kg\nTotal indicatif : ${formatXof(order.totals?.total || 0)}\n\nMerci de confirmer la disponibilité et le prix final.`;

  const copyReference = async () => {
    await navigator.clipboard?.writeText(order.reference);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <section className="mx-auto max-w-3xl px-5 pb-16 pt-12">
      <div className="rounded-3xl bg-white p-7 text-center shadow-sm">
        <CheckCircle2 className="mx-auto text-[#3FBF63]" size={48} />
        <p className="mt-5 text-xs font-bold uppercase tracking-[.16em] text-[#5B5348]">
          Commande enregistrée
        </p>
        <h1 className="mt-2 text-3xl font-semibold">
          Merci {order.customer?.fullName?.split(" ")[0] || ""} 🌸
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-[#5B5348]">
          Ta demande est prête. Lim’Elle doit maintenant confirmer la disponibilité et le prix final avant ton paiement.
        </p>

        <button
          type="button"
          onClick={copyReference}
          className="mx-auto mt-6 inline-flex items-center gap-2 rounded-full bg-[#EBE3D2] px-5 py-3 font-bold transition hover:bg-[#dfd5c2]"
        >
          {copied ? "Référence copiée !" : order.reference}
          <Copy size={16} />
        </button>

        <div className="mt-6 rounded-2xl bg-[#F8F3EA] p-5 text-left">
          <div className="flex justify-between gap-4 text-sm">
            <span>Articles</span>
            <strong>{(order.items || []).reduce((sum, item) => sum + item.quantity, 0)}</strong>
          </div>
          <div className="mt-2 flex justify-between gap-4 text-sm">
            <span>Mode de réception</span>
            <strong>{deliveryLabel}</strong>
          </div>
          <div className="mt-2 flex justify-between gap-4 text-sm">
            <span>Poids estimé</span>
            <strong>{(order.totals?.weight || 0).toFixed(2)} kg</strong>
          </div>
          <div className="mt-2 flex justify-between gap-4 text-lg font-extrabold">
            <span>Total indicatif</span>
            <strong>{formatXof(order.totals?.total || 0)}</strong>
          </div>
        </div>

        {invoiceUrl && (
          <div className="mt-4">
            <a
              href={invoiceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#B58A4A] hover:underline"
            >
              <FileText size={16} />
              Voir / Imprimer la facture officielle
              <ArrowRight size={14} />
            </a>
          </div>
        )}

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <WhatsAppButton message={message} className="bg-[#3FBF63] text-white">
            Envoyer sur WhatsApp
          </WhatsAppButton>
          <button
            type="button"
            onClick={onDone}
            className="rounded-full border border-black/10 px-5 py-3 font-bold transition hover:bg-black/5"
          >
            Retour au catalogue
          </button>
        </div>
      </div>
    </section>
  );
}
