import { useEffect, useRef, useMemo } from "react";
import { ShoppingBag, X, Minus, Plus, Trash2 } from "lucide-react";
import { formatXof, buildGlobalPrice } from "@/utils/limelle";
import { cartKey } from "@/utils/cart";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import WhatsAppButton from "./WhatsAppButton";

export default function CartDrawer({ items, onClose, onQuantityChange, onRemove, onCheckout }) {
  const asideRef = useRef(null);

  // Focus trap
  useEffect(() => {
    const el = asideRef.current;
    if (!el) return;
    const focusable = el.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    const handleKey = (e) => {
      if (e.key === "Escape") { onClose(); return; }
      if (e.key !== "Tab") return;
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
    };

    first?.focus();
    el.addEventListener("keydown", handleKey);
    return () => el.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const weight = items.reduce((sum, item) => sum + (item.product.weight || 0.5) * item.quantity, 0);
  const productTotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const total = buildGlobalPrice({ productPrice: productTotal, weightKg: weight });
  const reference = useMemo(
    () => `LE-${new Date().getFullYear()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
    []
  );

  const message = `Bonjour Lim'Elle 🌸\nJe souhaite vérifier cette commande :\n\nRéférence : ${reference}\n${items.map(
    (item) => `• ${item.product.name} x${item.quantity} | Taille : ${item.product.selectedSize ?? "Unique"} | Couleur : ${item.product.selectedColor ?? "Standard"}`
  ).join("\n")}\n\nPoids estimé : ${weight.toFixed(2)} kg\nPrix global indicatif : ${formatXof(total)}\n\nMerci de confirmer la disponibilité et le prix final.`;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40"
      onClick={onClose}
      aria-hidden="true"
    >
      <aside
        ref={asideRef}
        role="dialog"
        aria-label="Panier"
        className="ml-auto flex h-full w-full max-w-md flex-col bg-[#F8F3EA] p-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Ton panier</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Fermer le panier"
          >
            <X size={18} />
          </Button>
        </div>

        {!items.length ? (
          <div className="flex flex-1 flex-col items-center justify-center text-center text-[#5B5348]">
            <ShoppingBag size={42} aria-hidden="true" />
            <p className="mt-4">Ton panier est vide.</p>
          </div>
        ) : (
          <>
            {/* Items */}
            <div className="mt-6 flex-1 space-y-3 overflow-y-auto">
              {items.map((item) => {
                const key = cartKey(item.product);
                return (
                  <div key={key} className="rounded-2xl bg-white p-3">
                    <div className="flex gap-3">
                      <img
                        src={item.product.img}
                        alt={item.product.name}
                        className="h-20 w-16 rounded-xl object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="font-bold">{item.product.name}</div>
                        <div className="mt-1 text-xs text-[#5B5348]">
                          Taille : {item.product.selectedSize ?? "Unique"} · Couleur : {item.product.selectedColor ?? "Standard"}
                        </div>
                        <div className="mt-1 text-sm text-[#5B5348]">
                          {formatXof(item.product.price)}
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="secondary"
                              size="icon"
                              className="h-7 w-7 rounded-full"
                              onClick={() => onQuantityChange(key, Math.max(1, item.quantity - 1))}
                              aria-label={`Réduire la quantité de ${item.product.name}`}
                            >
                              <Minus size={14} />
                            </Button>
                            <span className="min-w-[1.5rem] text-center text-sm font-medium">
                              {item.quantity}
                            </span>
                            <Button
                              variant="secondary"
                              size="icon"
                              className="h-7 w-7 rounded-full"
                              onClick={() => onQuantityChange(key, item.quantity + 1)}
                              aria-label={`Augmenter la quantité de ${item.product.name}`}
                            >
                              <Plus size={14} />
                            </Button>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-[#A6512F] hover:text-[#C53030]"
                            onClick={() => onRemove(key)}
                            aria-label={`Supprimer ${item.product.name} du panier`}
                          >
                            <Trash2 size={17} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Summary */}
            <div className="mt-5 border-t border-black/10 pt-5">
              <div className="flex justify-between text-sm">
                <span>Poids estimé</span>
                <strong>{weight.toFixed(2)} kg</strong>
              </div>
              <div className="mt-2 flex justify-between text-lg font-extrabold">
                <span>Total indicatif</span>
                <strong>{formatXof(total)}</strong>
              </div>
              <p className="mt-2 text-xs leading-5 text-[#5B5348]">
                Le prix final et la disponibilité sont confirmés par Lim'Elle avant paiement.
              </p>
              <Button
                variant="gold"
                className="mt-4 w-full"
                size="lg"
                onClick={onCheckout}
              >
                Passer la commande
              </Button>
              <WhatsAppButton
                message={message}
                className="mt-3 w-full bg-[#3FBF63] text-white"
              >
                Vérifier sur WhatsApp
              </WhatsAppButton>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
