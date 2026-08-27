/**
 * BrandLogo — Emblème haute joaillerie vectoriel original pour Lim'Elle.
 * Combine la silhouette d'une branche de karité/baobab dorée et un médaillon prestige.
 */
export default function BrandLogo({ className = "h-9 w-auto", alt = "Lim'Elle" }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label={alt}
    >
      <title>{alt}</title>
      <defs>
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#DFC386" />
          <stop offset="50%" stopColor="#B58A4A" />
          <stop offset="100%" stopColor="#8E672B" />
        </linearGradient>
        <linearGradient id="softGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#B58A4A" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#B58A4A" stopOpacity="0.04" />
        </linearGradient>
      </defs>

      {/* Cercle médaillon extérieur fin */}
      <circle cx="60" cy="60" r="54" stroke="url(#goldGradient)" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
      <circle cx="60" cy="60" r="48" stroke="url(#goldGradient)" strokeWidth="1.2" />

      {/* Branche botanique élégante centrale */}
      <g stroke="url(#goldGradient)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        {/* Tige courbée */}
        <path d="M42 92 C 50 75, 58 52, 68 28" />
        
        {/* Feuilles stylisées organiques avec remplissage délicat */}
        {/* Feuille sommitale */}
        <path d="M68 28 C 64 36, 65 44, 68 50 C 73 44, 75 36, 68 28 Z" fill="url(#softGold)" />
        
        {/* Feuille haute gauche */}
        <path d="M61 46 C 47 40, 44 30, 46 28 C 53 30, 60 36, 61 46 Z" fill="url(#softGold)" />
        
        {/* Feuille haute droite */}
        <path d="M65 42 C 77 34, 84 30, 85 32 C 84 40, 75 49, 65 42 Z" fill="url(#softGold)" />
        
        {/* Feuille médiane gauche */}
        <path d="M54 64 C 42 58, 38 48, 41 46 C 48 48, 54 54, 54 64 Z" fill="url(#softGold)" />
        
        {/* Feuille médiane droite */}
        <path d="M58 58 C 74 54, 80 60, 79 63 C 70 71, 58 68, 58 58 Z" fill="url(#softGold)" />

        {/* Goutte d'essence précieuse au sommet */}
        <circle cx="68" cy="24" r="2.2" fill="url(#goldGradient)" stroke="none" />
      </g>
    </svg>
  );
}
