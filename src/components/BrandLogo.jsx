export default function BrandLogo({ className = "h-12 w-auto", alt = "Lim'Elle" }) {
  return (
    <svg viewBox="0 0 120 120" className={className} role="img" aria-label={alt}>
      <rect x="6" y="6" width="108" height="108" rx="28" fill="#173F34" />
      <path d="M36 32h18v40h30v18H36V32Z" fill="#F7F2EA" />
      <path d="M68 32h18c13.2 0 23 9.8 23 23S99.2 78 86 78H68V32Zm17 15h1.5c6.4 0 11 4.5 11 10.5S92.9 68 86.5 68H85V47Z" fill="#B8753C" />
    </svg>
  );
}
