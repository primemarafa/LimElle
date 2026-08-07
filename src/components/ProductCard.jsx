import { formatXof, buildGlobalPrice } from "../utils/limelle";
import WhatsAppButton from "./WhatsAppButton";

export default function ProductCard({ product }) {
  const globalPrice = buildGlobalPrice({ productPrice: product.price, weightKg: product.weight });

  const message = `Bonjour Lim'Elle 🌸\nJe suis intéressée par : ${product.name}\nPrix indicatif : ${formatXof(globalPrice)}\nPouvez-vous confirmer la disponibilité et le prix final ?`;

  return (
    <article className="overflow-hidden rounded-3xl bg-white">
      <img src={product.img} alt={product.name} className="aspect-[3/4] w-full object-cover" loading="lazy" />
      <div className="p-5">
        <div className="mb-2 inline-flex rounded-full bg-[#EBE3D2] px-3 py-1 text-xs font-bold">{product.badge}</div>
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="mt-2 text-sm text-[#5B5348]">Poids estimé : {product.weight} kg</p>
        <p className="mt-3 text-lg font-extrabold text-[#A6512F]">À partir de {formatXof(globalPrice)}</p>
        <p className="mt-1 text-xs leading-5 text-[#5B5348]">Prix indicatif. Le prix final est confirmé après vérification de la disponibilité.</p>
        <WhatsAppButton className="mt-4 w-full bg-[#3FBF63] text-white" message={message}>Vérifier ce produit</WhatsAppButton>
      </div>
    </article>
  );
}
