import { MessageCircle } from "lucide-react";
import { buildWhatsAppLink } from "../utils/limelle";

export default function WhatsAppButton({ children, message, className = "" }) {
  return (
    <a href={buildWhatsAppLink(message)} target="_blank" rel="noreferrer" className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 font-bold ${className}`}>
      <MessageCircle size={18} />
      {children}
    </a>
  );
}
