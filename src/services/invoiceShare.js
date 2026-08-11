const siteBaseUrl = () => {
  if (typeof window !== "undefined" && window.location?.origin) return window.location.origin;
  return "";
};

export function getInvoiceUrl(lookupToken) {
  const token = encodeURIComponent(lookupToken);
  return `${siteBaseUrl()}/api/orders/${token}/invoice`;
}

export function buildInvoiceWhatsAppUrl({ phone, reference, total, invoiceUrl }) {
  const message = [
    "Bonjour,",
    `Votre facture Lim'Elle pour la commande ${reference} est disponible.`,
    `Total : ${total} FCFA.`,
    `Facture : ${invoiceUrl}`,
  ].join("\n");
  const normalizedPhone = String(phone || "").replace(/[^0-9]/g, "");
  return `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(message)}`;
}

export function buildInvoiceMailtoUrl({ email, reference, total, invoiceUrl }) {
  const subject = `Facture Lim'Elle ${reference}`;
  const body = [
    "Bonjour,",
    "Votre facture Lim'Elle est disponible.",
    `Commande : ${reference}`,
    `Total : ${total} FCFA`,
    `Facture : ${invoiceUrl}`,
  ].join("\n");
  return `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
