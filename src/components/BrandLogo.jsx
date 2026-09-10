/**
 * BrandLogo — Logo officiel Lim'Elle (branche botanique).
 * Utilise l'image PNG du logo réel avec intégration fluide :
 * - mix-blend-mode pour fusion naturelle avec le fond
 * - Filtre d'inversion douce pour le dark mode
 * - Transition CSS pour les changements de thème
 */
export default function BrandLogo({ className = "h-8 w-auto", alt = "Lim'Elle" }) {
  return (
    <img
      src="/images/limelle-logo.png"
      alt={alt}
      className={`${className} object-contain select-none
        mix-blend-multiply dark:mix-blend-screen
        dark:brightness-[1.6] dark:contrast-[0.85] dark:sepia dark:hue-rotate-[15deg]
        transition-[filter] duration-400`}
      draggable={false}
      loading="eager"
      decoding="async"
    />
  );
}
