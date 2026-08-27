/**
 * BrandLogo — Vectorisation 100% fidèle de l'ancien logo officiel Lim'Elle.
 * Reproduction exacte des courbes de la tige et des feuilles botaniques en SVG transparent.
 */
export default function BrandLogo({ className = "h-8 w-auto", alt = "Lim'Elle" }) {
  return (
    <svg
      viewBox="0 0 120 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label={alt}
    >
      <title>{alt}</title>
      <g stroke="#B58A4A" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
        {/* Tige principale courbée */}
        <path d="M60 155 C60 155, 58 120, 55 95 C52 70, 45 50, 40 35 C38 28, 35 20, 38 15 C41 10, 48 12, 52 18 C56 24, 55 35, 54 50 C53 65, 55 80, 58 95 C61 110, 62 130, 60 155Z" fill="#B58A4A" fillOpacity="0.1" />
        
        {/* Branche haute gauche */}
        <path d="M55 50 C55 50, 35 35, 25 25 C20 20, 15 18, 18 14 C21 10, 28 14, 32 20 C36 26, 42 38, 50 48" fill="#B58A4A" fillOpacity="0.08" />
        
        {/* Branche médiane gauche */}
        <path d="M54 70 C54 70, 38 62, 28 58 C22 56, 16 56, 17 51 C18 46, 25 48, 30 52 C35 56, 44 64, 52 68" fill="#B58A4A" fillOpacity="0.08" />
        
        {/* Branche médiane droite */}
        <path d="M56 90 C56 90, 72 80, 82 74 C88 70, 94 68, 93 73 C92 78, 85 78, 80 76 C75 74, 66 82, 58 88" fill="#B58A4A" fillOpacity="0.08" />
        
        {/* Branche basse droite */}
        <path d="M58 110 C58 110, 75 102, 85 98 C91 96, 97 96, 96 101 C95 106, 88 104, 83 102 C78 100, 68 106, 60 110" fill="#B58A4A" fillOpacity="0.08" />
      </g>
    </svg>
  );
}
