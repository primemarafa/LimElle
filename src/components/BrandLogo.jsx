/**
 * BrandLogo — Logo officiel Lim'Elle (raster PNG detoure, fond transparent).
 * Remplace l'ancienne version SVG vectorisee qui se deformait dans certains
 * navigateurs (le viewBox n'etait pas toujours utilise pour calculer le
 * ratio intrinseque d'un <svg> inline sans width/height explicites).
 * Le PNG utilise object-contain pour toujours garder ses proportions.
 */
export default function BrandLogo({ className = "h-8 w-auto", alt = "Lim'Elle" }) {
  return (
    <img
      src="/brand/limelle-logo-mark.png"
      alt={alt}
      className={`${className} object-contain`}
    />
  );
}
