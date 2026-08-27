/**
 * BrandLogo — Branche botanique officielle Lim'Elle (silhouette pure, gracieuse et dorée).
 * Sans cadre ni cercle, intégration transparente et fluide.
 */
export default function BrandLogo({ className = "h-8 w-auto", alt = "Lim'Elle" }) {
  return (
    <svg
      viewBox="0 0 100 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label={alt}
    >
      <title>{alt}</title>
      <g stroke="#B58A4A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        {/* Tige courbée fluide */}
        <path d="M18 102 C 34 82, 48 55, 62 12" />
        
        {/* Feuille sommitale */}
        <path d="M62 12 C 58 24, 60 38, 62 48 C 68 38, 70 24, 62 12 Z" fill="#B58A4A" fillOpacity="0.12" />
        
        {/* Feuille haute gauche */}
        <path d="M52 42 C 35 34, 32 20, 34 18 C 44 19, 52 28, 52 42 Z" fill="#B58A4A" fillOpacity="0.12" />
        
        {/* Feuille haute droite */}
        <path d="M58 35 C 72 26, 78 20, 78 20 C 78 30, 68 44, 58 35 Z" fill="#B58A4A" fillOpacity="0.12" />
        
        {/* Feuille médiane gauche */}
        <path d="M42 66 C 30 60, 28 50, 31 52 C 37 54, 42 58, 42 66 Z" fill="#B58A4A" fillOpacity="0.12" />
        
        {/* Feuille médiane droite */}
        <path d="M48 56 C 68 52, 74 60, 72 63 C 60 74, 46 72, 48 56 Z" fill="#B58A4A" fillOpacity="0.12" />
        
        {/* Petite perle d'accent */}
        <circle cx="43" cy="80" r="2.5" fill="#B58A4A" stroke="none" />
      </g>
    </svg>
  );
}
