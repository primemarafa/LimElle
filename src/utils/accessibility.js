/**
 * Focus trap for modals and drawers.
 * Returns activate/deactivate methods.
 */
export function focusTrap(element) {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];

  function handleKeyDown(e) {
    if (e.key !== "Tab") return;

    if (e.shiftKey) {
      if (document.activeElement === firstFocusable) {
        e.preventDefault();
        lastFocusable.focus();
      }
    } else {
      if (document.activeElement === lastFocusable) {
        e.preventDefault();
        firstFocusable.focus();
      }
    }
  }

  return {
    activate() {
      if (firstFocusable) firstFocusable.focus();
      element.addEventListener("keydown", handleKeyDown);
    },
    deactivate() {
      element.removeEventListener("keydown", handleKeyDown);
    },
  };
}

/**
 * Create a skip-to-content link for keyboard navigation.
 * Injected once into the DOM on first call.
 */
export function createSkipLink() {
  if (document.querySelector("#skip-to-content")) {
    return document.querySelector("#skip-to-content");
  }

  const skipLink = document.createElement("a");
  skipLink.href = "#main-content";
  skipLink.id = "skip-to-content";
  skipLink.textContent = "Aller au contenu principal";
  skipLink.className =
    "fixed top-0 left-0 z-[9999] -translate-y-full bg-[#173F34] px-4 py-2 text-sm font-semibold text-white no-underline transition-transform duration-200 focus:translate-y-0";

  document.body.insertBefore(skipLink, document.body.firstChild);
  return skipLink;
}
