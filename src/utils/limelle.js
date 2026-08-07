import { LIMELLE_CONFIG } from "../config/limelle";

export function formatXof(value) {
  return `${Math.round(value).toLocaleString("fr-FR")} FCFA`;
}

export function buildWhatsAppLink(message) {
  return `https://wa.me/${LIMELLE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function calculateTransport(weightKg, config = LIMELLE_CONFIG.transport) {
  const weight = Math.max(Number(weightKg) || 0, config.minimumWeightKg);
  return Math.ceil(weight * config.ratePerKg);
}

export function buildGlobalPrice({ productPrice, weightKg, margin = 0 }) {
  const transport = calculateTransport(weightKg);
  return Math.max(0, Number(productPrice) || 0) + transport + (Number(margin) || 0);
}

export function normalizeWeight(value) {
  const weight = Number(value);
  return Number.isFinite(weight) && weight >= 0 ? weight : 0;
}
