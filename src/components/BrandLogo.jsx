/**
 * BrandLogo — Crisp, transparent vector SVG rendition of the official Lim'Elle botanical branch.
 * Matches the warm gold/terracotta palette without rectangular JPEG border artifacts.
 */
export default function BrandLogo({ className = "h-9 w-auto", alt = "Lim'Elle" }) {
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
      <g stroke="#B58A4A" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
        {/* Main curved central stem */}
        <path d="M18 102 C 34 82, 48 55, 62 12" />
        
        {/* Top-most central leaf */}
        <path d="M62 12 C 58 24, 60 38, 62 48 C 68 38, 70 24, 62 12 Z" fill="#B58A4A" fillOpacity="0.08" />
        
        {/* Top-left leaf */}
        <path d="M52 42 C 35 34, 32 20, 34 18 C 44 19, 52 28, 52 42 Z" fill="#B58A4A" fillOpacity="0.08" />
        
        {/* Top-right leaf */}
        <path d="M58 35 C 72 26, 78 20, 78 20 C 78 30, 68 44, 58 35 Z" fill="#B58A4A" fillOpacity="0.08" />
        
        {/* Mid-left leaf */}
        <path d="M42 66 C 30 60, 28 50, 31 52 C 37 54, 42 58, 42 66 Z" fill="#B58A4A" fillOpacity="0.08" />
        
        {/* Mid-right large leaf */}
        <path d="M48 56 C 68 52, 74 60, 72 63 C 60 74, 46 72, 48 56 Z" fill="#B58A4A" fillOpacity="0.08" />
        
        {/* Bottom small accent leaf / seed */}
        <path d="M43 80 C 47 84, 53 84, 52 82 C 48 78, 44 78, 43 80 Z" fill="#B58A4A" />
      </g>
    </svg>
  );
}
