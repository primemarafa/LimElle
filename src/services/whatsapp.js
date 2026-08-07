import { LIMELLE_CONFIG, WA_MESSAGES } from "../config/limelle";
import { buildWhatsAppLink, formatXof } from "../utils/limelle";

export function openWhatsApp(message = WA_MESSAGES.general) {
  if (typeof window === "undefined") return buildWhatsAppLink(message);
  window.open(buildWhatsAppLink(message), "_blank", "noopener,noreferrer");
  return buildWhatsAppLink(message);
}

export function buildOrderMessage({ reference = "À confirmer", productName, quantity = 1, globalPrice, city = "Niamey" }) {
  return [
    `Bonjour Lim'Elle 🌸`,
    "",
    `Commande : ${reference}`,
    `Produit : ${productName}`,
    `Quantité : ${quantity}`,
    globalPrice != null ? `Prix global : ${formatXof(globalPrice)}` : null,
    `Ville : ${city}`,
    "",
    "Merci.",
  ].filter(Boolean).join("\n");
}

export const whatsappNumber = LIMELLE_CONFIG.whatsappNumber;
