export default function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-0 focus:left-0 focus:z-[9999] focus:bg-[#173F34] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:no-underline"
    >
      Aller au contenu principal
    </a>
  );
}