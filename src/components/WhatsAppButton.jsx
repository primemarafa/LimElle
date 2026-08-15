import { buildWhatsAppLink } from "../utils/limelle";

function WhatsAppIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
      <path d="M16.02 3C9.4 3 4 8.4 4 15.02c0 2.22.6 4.3 1.64 6.1L4 29l8.06-1.6a12.9 12.9 0 0 0 3.96.62c6.62 0 12.02-5.4 12.02-12.02C28.04 8.4 22.64 3 16.02 3Zm0 21.9c-1.98 0-3.9-.53-5.56-1.53l-.4-.24-4.78.95.98-4.68-.26-.42a9.9 9.9 0 0 1-1.5-5.26c0-5.46 4.44-9.9 9.92-9.9 5.46 0 9.9 4.44 9.9 9.9 0 5.47-4.44 9.18-8.3 9.18Zm5.44-7.42c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.24-.46-2.36-1.46-.87-.78-1.46-1.74-1.63-2.04-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.87 1.22 3.07c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.35Z" />
    </svg>
  );
}

export default function WhatsAppButton({ children, message, className = "", iconSize = 18, ...rest }) {
  return (
    <a href={buildWhatsAppLink(message)} target="_blank" rel="noreferrer" className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 font-bold transition hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:scale-95 ${className}`} {...rest}>
      <WhatsAppIcon size={iconSize} />
      {children}
    </a>
  );
}
