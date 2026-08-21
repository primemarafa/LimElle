/**
 * BrandLogo — displays the official Lim'Elle leaf logo.
 * The image is a warm gold branch on a light background,
 * matching the mockup's aesthetic.
 */
export default function BrandLogo({ className = "h-10 w-auto", alt = "Lim'Elle" }) {
  return (
    <img
      src="/brand/limelle-logo-official.jpg"
      alt={alt}
      className={className}
      role="img"
      aria-label={alt}
    />
  );
}
