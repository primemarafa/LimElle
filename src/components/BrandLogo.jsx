/**
 * BrandLogo — Vectorisation fidèle du logo officiel Lim'Elle.
 * Branche botanique avec 5 feuilles, SVG transparent.
 * Tracé à partir de l'image officielle : tige courbée, petite boucle en bas,
 * 2 feuilles inférieures (gauche + droite) et 3 feuilles au sommet.
 * Couleur : currentColor pour s'adapter au contexte (or/brun par défaut).
 */
export default function BrandLogo({ className = "h-8 w-auto", alt = "Lim'Elle" }) {
  return (
    <svg
      viewBox="0 0 200 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label={alt}
    >
      <title>{alt}</title>
      <g
        stroke="currentColor"
        strokeWidth="5.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        {/* ── Tige principale : boucle en bas → monte en courbe vers le haut-droit ── */}
        <path d="
          M 82 268
          C 78 260, 72 256, 78 252
          C 84 248, 88 254, 86 258
        " />
        <path d="
          M 82 268
          C 84 240, 86 215, 82 190
          C 78 165, 72 140, 70 115
          C 68 90, 70 65, 80 45
          C 88 30, 98 20, 110 14
        " />

        {/* ── Feuille bas-gauche (petite, pointant vers le bas-gauche) ── */}
        <path d="
          M 78 188
          C 68 192, 52 198, 42 196
          C 32 194, 34 184, 44 180
          C 54 176, 70 180, 78 188
          Z
        " />

        {/* ── Feuille bas-droite (moyenne, pointant vers le bas-droite) ── */}
        <path d="
          M 74 142
          C 88 152, 110 166, 124 168
          C 138 170, 142 158, 132 148
          C 122 138, 96 134, 74 142
          Z
        " />

        {/* ── Feuille haute-gauche (grande, pointe vers le haut-gauche) ── */}
        <path d="
          M 74 100
          C 60 86, 38 62, 28 44
          C 20 30, 26 20, 38 26
          C 50 32, 64 56, 74 100
          Z
        " />

        {/* ── Feuille haute-centre (pointe vers le haut) ── */}
        <path d="
          M 80 68
          C 82 50, 88 28, 96 16
          C 102 8, 112 8, 112 18
          C 112 28, 100 48, 80 68
          Z
        " />

        {/* ── Feuille haute-droite (pointe vers la droite) ── */}
        <path d="
          M 86 56
          C 100 44, 122 28, 140 22
          C 154 18, 160 26, 152 36
          C 144 46, 116 52, 86 56
          Z
        " />
      </g>
    </svg>
  );
}
