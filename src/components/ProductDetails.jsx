import { useMemo, useState } from "react";
import { ArrowLeft, Minus, Plus, ShoppingBag, Package } from "lucide-react";
import { formatXof, buildGlobalPrice } from "../utils/limelle";
import WhatsAppButton from "./WhatsAppButton";

export default function ProductDetails({ product, onBack, onAddToCart }) {
  const images = useMemo(() => {
    if (product.images && product.images.length > 0) return product.images;
    return [product.img];
  }, [product]);

  const [activeImage, setActiveImage] = useState(images[0] || product.img);
  const [size, setSize] = useState(product.sizes?.[0] ?? "Unique");
  const [color, setColor] = useState(product.colors?.[0] ?? "Selon disponibilité");
  const [quantity, setQuantity] = useState(1);

  const totalWeight = useMemo(() => product.weight * quantity, [product.weight, quantity]);
  const totalEstimate = useMemo(
    () => buildGlobalPrice({ productPrice: product.price * quantity, weightKg: totalWeight }),
    [product.price, totalWeight]
  );
  const selectedProduct = { ...product, selectedSize: size, selectedColor: color, img: activeImage };
  const message = `Bonjour Lim'Elle 🌸\nJe souhaite commander / vérifier ce produit :\n\n${product.name}\nQuantité : ${quantity}\nTaille : ${size}\nCouleur : ${color}\nPoids estimé : ${totalWeight.toFixed(2)} kg\nPrix global indicatif : ${formatXof(totalEstimate)}\n\nMerci de confirmer la disponibilité et le prix final.`;

  const handleAdd = () => onAddToCart?.(selectedProduct, quantity);

  return (
    <section className="view-transition mx-auto max-w-5xl px-5 pb-16 pt-8">
      <button
        onClick={onBack}
        className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#57534E] dark:text-[#A8A29E] transition-colors duration-300 hover:text-[#1C1917] dark:hover:text-[#FAFAF9]"
      >
        <ArrowLeft size={17} /> Retour au catalogue
      </button>

      <div className="grid gap-10 md:grid-cols-2">
        {/* Gallery column */}
        <div className="flex flex-col gap-4">
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[1.5rem] bg-[#F5F3EF] dark:bg-[#292524] shadow-sm">
            <img
              src={activeImage}
              alt={product.name}
              className="h-full w-full object-cover transition-all duration-500"
            />
            {product.badge && (
              <span className="absolute top-4 left-4 z-10 rounded-lg bg-[#1C1917]/85 dark:bg-black/75 px-3 py-1.5 text-[10px] font-semibold text-white backdrop-blur-sm">
                {product.badge}
              </span>
            )}
          </div>

          {/* Thumbnails if multiple images */}
          {images.length > 1 && (
            <div className="flex items-center gap-3">
              {images.map((imgUrl, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveImage(imgUrl)}
                  className={`relative aspect-[3/4] w-16 overflow-hidden rounded-xl border-2 transition-all cursor-pointer ${
                    activeImage === imgUrl
                      ? "border-[#A16207] shadow-md scale-105"
                      : "border-[#E7E5E4] dark:border-[#292524] opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={imgUrl} alt={`${product.name} vue ${i + 1}`} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product details column */}
        <div>
          <div className="inline-flex rounded-lg bg-[#1C1917]/80 dark:bg-white/10 px-3 py-1.5 text-[10px] font-semibold text-white backdrop-blur-sm">
            {product.badge || "Sélection Exclusivité"}
          </div>

          <h1 className="mt-4 font-serif text-3xl font-semibold tracking-tight text-[#1C1917] dark:text-[#FAFAF9] md:text-4xl">
            {product.name}
          </h1>

          <p className="mt-3 text-sm leading-relaxed text-[#57534E] dark:text-[#A8A29E]">
            {product.description ?? "Article sélectionné avec soin par Lim'Elle. Les détails sont confirmés avant paiement."}
          </p>

          {/* Price & estimate */}
          <div className="mt-5 flex items-baseline gap-3">
            <div className="text-2xl font-bold text-[#1C1917] dark:text-[#FAFAF9] md:text-3xl">
              {formatXof(totalEstimate)}
            </div>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-base text-[#A8A29E] line-through">
                {formatXof(product.originalPrice * quantity)}
              </span>
            )}
            {product.discountPercent && (
              <span className="rounded-full bg-red-100 dark:bg-red-950/50 px-2.5 py-0.5 text-xs font-bold text-red-800 dark:text-red-300">
                -{product.discountPercent}%
              </span>
            )}
          </div>

          <p className="mt-1.5 flex items-center gap-1.5 text-xs text-[#78716C] dark:text-[#A8A29E]">
            <Package size={12} className="text-[#A16207]" aria-hidden="true" />
            Sélectionné à <strong className="text-[#1C1917] dark:text-[#FAFAF9]">Dakar</strong>, expédié et livré à <strong className="text-[#1C1917] dark:text-[#FAFAF9]">Niamey</strong> (fret GP inclus).
          </p>

          {/* Sizes */}
          {product.sizes?.length > 0 && (
            <div className="mt-6">
              <label className="text-xs font-bold uppercase tracking-wider text-[#1C1917] dark:text-[#FAFAF9]">Taille / Format</label>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.sizes.map((item) => (
                  <button
                    type="button"
                    key={item}
                    onClick={() => setSize(item)}
                    className={`rounded-xl border px-4 py-2 text-xs font-semibold transition-all duration-300 cursor-pointer ${
                      size === item
                        ? "border-[#A16207] bg-[#A16207] text-white shadow-sm"
                        : "border-[#E7E5E4] dark:border-[#292524] bg-white dark:bg-[#1C1917] text-[#1C1917] dark:text-[#FAFAF9] hover:border-[#A16207]/40"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Colors */}
          {product.colors?.length > 0 && (
            <div className="mt-5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#1C1917] dark:text-[#FAFAF9]">Variante</label>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.colors.map((item) => (
                  <button
                    type="button"
                    key={item}
                    onClick={() => setColor(item)}
                    className={`rounded-xl border px-4 py-2 text-xs font-semibold transition-all duration-300 cursor-pointer ${
                      color === item
                        ? "border-[#A16207] bg-[#A16207] text-white shadow-sm"
                        : "border-[#E7E5E4] dark:border-[#292524] bg-white dark:bg-[#1C1917] text-[#1C1917] dark:text-[#FAFAF9] hover:border-[#A16207]/40"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mt-6 flex items-center justify-between rounded-[1.25rem] bg-white dark:bg-[#1C1917] border border-[#E7E5E4] dark:border-[#292524] p-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1C1917] dark:text-[#FAFAF9]">Quantité</span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="rounded-xl bg-[#F5F3EF] dark:bg-[#292524] p-2 transition-colors duration-300 hover:bg-[#E7E5E4] dark:hover:bg-[#3D3835] text-[#1C1917] dark:text-[#FAFAF9]"
              >
                <Minus size={15} />
              </button>
              <strong className="min-w-6 text-center text-sm text-[#1C1917] dark:text-[#FAFAF9]">{quantity}</strong>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="rounded-xl bg-[#F5F3EF] dark:bg-[#292524] p-2 transition-colors duration-300 hover:bg-[#E7E5E4] dark:hover:bg-[#3D3835] text-[#1C1917] dark:text-[#FAFAF9]"
              >
                <Plus size={15} />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={handleAdd}
              className="btn-shimmer inline-flex items-center justify-center gap-2 rounded-xl bg-[#1C1917] dark:bg-[#A16207] px-5 py-3.5 font-semibold text-white shadow-md transition-all duration-300 hover:bg-[#0C0A09] dark:hover:bg-[#8A5306] hover:shadow-lg cursor-pointer"
            >
              <ShoppingBag size={17} /> Ajouter au panier
            </button>
            <WhatsAppButton
              message={message}
              className="bg-[#25D366] text-white rounded-xl py-3.5 font-semibold shadow-md transition-all duration-300 hover:bg-[#20BA5A] hover:shadow-lg"
            >
              Commander sur WhatsApp
            </WhatsAppButton>
          </div>
        </div>
      </div>
    </section>
  );
}
