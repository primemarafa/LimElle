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
      width={494}
      height={528}
      loading="eager"
      decoding="async"
      className={`${className} object-contain select-none dark:brightness-125 dark:contrast-105 transition-[filter] duration-300`}
    />
  );
}
