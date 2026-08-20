export default function BrandLogo({ className = "h-10 w-auto", alt = "Lim'Elle" }) {
  return (
    <img
      src="/brand/limelle-leaf.svg"
      alt={alt}
      className={className}
      role="img"
      aria-label={alt}
    />
  );
}
