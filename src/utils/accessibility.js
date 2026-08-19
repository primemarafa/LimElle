/**
 * Utility functions for accessibility enhancements
 */

/**
 * Trap focus within an element
 * Useful for modals, drawers, dropdowns
 */
export function focusTrap(element) {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];

  return {
    activate() {
      if (firstFocusable) firstFocusable.focus();

      element.addEventListener('keydown', handleKeyDown);
    },

    deactivate() {
      element.removeEventListener('keydown', handleKeyDown);
    }
  };

  function handleKeyDown(e) {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstFocusable) {
        e.preventDefault();
        lastFocusable.focus();
      }
    } else {
      // Tab
      if (document.activeElement === lastFocusable) {
        e.preventDefault();
        firstFocusable.focus();
      }
    }
  }
}

/**
 * Skip to main content link component
 * Visible only when focused
 */
export function createSkipLink() {
  // Check if skip link already exists
  if (document.querySelector('#skip-to-content')) {
    return document.querySelector('#skip-to-content');
  }

  const skipLink = document.createElement('a');
  skipLink.href = '#main-content';
  skipLink.id = 'skip-to-content';
  skipLink.className = 'skip-link';
  skipLink.textContent = 'Aller au contenu principal';

  // Style the skip link
  skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 0;
    background: var(--color-primary-500);
    color: var(--color-neutral-0);
    padding: 8px 16px;
    z-index: 10000;
    transition: top 0.3s ease-out;
    font-family: var(--font-family-sans);
    font-size: var(--text-sm);
    font-weight: var(--font-weight-semibold);
    text-decoration: none;
    border-radius: var(--radius);
    box-shadow: var(--shadow);
  `;

  // Show when focused
  skipLink.addEventListener('focus', () => {
    skipLink.style.top = '0px';
  });

  // Hide when blurred
  skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-40px';
  });

  document.body.insertBefore(skipLink, document.body.firstChild);

  return skipLink;
}

/**
 * Announce live region updates for screen readers
 * @param {string} message - Message to announce
 * @param {string} [politeness='polite'] - 'assertive' or 'polite'
 */
export function announce(message, politeness = 'polite') {
  // Check if live region already exists
  let liveRegion = document.querySelector('#sr-live-region');

  if (!liveRegion) {
    liveRegion = document.createElement('div');
    liveRegion.id = 'sr-live-region';
    liveRegion.setAttribute('aria-live', politeness);
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.style.cssText = `
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    `;
    document.body.appendChild(liveRegion);
  }

  // Clear previous announcement
  liveRegion.textContent = '';

  // Trigger screen reader announcement
  // Using setTimeout to ensure DOM update
  setTimeout(() => {
    liveRegion.textContent = message;
  }, 100);
}

/**
 * Check if element is visible in viewport
 * @param {Element} element - Element to check
 * @returns {boolean} - True if element is at least partially visible
 */
export function isElementInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
    rect.bottom >= 0 &&
    rect.left < (window.innerWidth || document.documentElement.clientWidth) &&
    rect.right >= 0
  );
}

/**
 * Get accessible name for an element
 * @param {Element} element - Element to check
 * @returns {string} - Accessible name
 */
export function getAccessibleName(element) {
  // Use aria-label if present
  if (element.hasAttribute('aria-label')) {
    return element.getAttribute('aria-label');
  }

  // Use aria-labelledby if present
  if (element.hasAttribute('aria-labelledby')) {
    const id = element.getAttribute('aria-labelledby');
    const labelledBy = document.getElementById(id);
    if (labelledBy) {
      return labelledBy.textContent.trim();
    }
  }

  // Use label element if associated
  if (element.matches('input, select, textarea')) {
    const id = element.id;
    if (id) {
      const label = document.querySelector(`label[for="${id}"]`);
      if (label) {
        return label.textContent.trim();
      }
    }
  }

  // Use inner text or alt text
  if (element.textContent.trim()) {
    return element.textContent.trim();
  }

  if (element.matches('img, area, input[type="image"]') && element.hasAttribute('alt')) {
    return element.getAttribute('alt').trim();
  }

  // Use title as fallback
  if (element.hasAttribute('title')) {
    return element.getAttribute('title').trim();
  }

  return '';
}

/**
 * Make an element focusable programmatically
 * @param {Element} element - Element to make focusable
 * @param {number} [tabindex=0] - Tabindex value
 */
export function makeFocusable(element, tabindex = 0) {
  element.setAttribute('tabindex', tabindex);
  element.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      element.click();
    }
  });
}

/**
 * Add keyboard shortcuts help
 * @param {Object} shortcuts - Mapping of key combinations to descriptions
 */
export function addKeyboardHelp(shortcuts) {
  // Create help modal trigger
  const helpButton = document.createElement('button');
  helpButton.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>';
  helpButton.setAttribute('aria-label', 'Aide sur les raccourcis clavier');
  helpButton.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 40px;
    height: 40px;
    background: var(--color-primary-500);
    color: var(--color-neutral-0);
    border: none;
    border-radius: var(--radius-full);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 1000;
    box-shadow: var(--shadow-md);
    transition: var(--transition-normal);
  `;

  helpButton.addEventListener('mouseenter', () => {
    helpButton.style.transform = 'scale(1.1)';
  });

  helpButton.addEventListener('mouseleave', () => {
    helpButton.style.transform = 'scale(1)';
  });

  // Create help modal
  const modal = document.createElement('div');
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 1001;
  `;

  const modalContent = document.createElement('div');
  modalContent.style.cssText = `
    background: var(--color-neutral-0);
    color: var(--color-neutral-900);
    padding: 24px;
    border-radius: var(--radius-lg);
    max-width: 80%;
    max-height: 80%;
    overflow-y: auto;
    box-shadow: var(--shadow-xl);
  `;

  const modalTitle = document.createElement('h2');
  modalTitle.textContent = 'Raccourcis clavier';
  modalTitle.style.cssText = `
    margin-top: 0;
    margin-bottom: 16px;
    color: var(--color-primary-800);
    font-family: var(--font-family-serif);
    font-size: var(--text-2xl);
  `;

  const shortcutsList = document.createElement('ul');
  shortcutsList.style.cssText = `
    list-style: none;
    padding: 0;
  `;

  Object.entries(shortcuts).forEach(([key, description]) => {
    const item = document.createElement('li');
    item.style.cssText = `
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      border-bottom: 1px solid var(--color-neutral-200);
    `;

    const keySpan = document.createElement('span');
    keySpan.textContent = key;
    keySpan.style.cssText = `
      font-family: var(--font-family-mono);
      background: var(--color-neutral-100);
      padding: 2px 6px;
      border-radius: var(--radius);
      font-size: var(--text-sm);
    `;

    const descSpan = document.createElement('span');
    descSpan.textContent = description;

    item.appendChild(keySpan);
    item.appendChild(descSpan);
    shortcutsList.appendChild(item);
  });

  const closeButton = document.createElement('button');
  closeButton.textContent = 'Fermer';
  closeButton.style.cssText = `
    margin-top: 24px;
    padding: 8px 16px;
    background: var(--color-primary-500);
    color: var(--color-neutral-0);
    border: none;
    border-radius: var(--radius);
    cursor: pointer;
    font-size: var(--text-sm);
    font-weight: var(--font-weight-medium);
  `;

  closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
    // Return focus to trigger element
    helpButton.focus();
  });

  modalContent.appendChild(modalTitle);
  modalContent.appendChild(shortcutsList);
  modalContent.appendChild(closeButton);
  modal.appendChild(modalContent);

  helpButton.addEventListener('click', () => {
    modal.style.display = 'flex';
    // Trap focus in modal
    const trap = focusTrap(modal);
    trap.activate();

    // Cleanup when modal closes
    const originalModalClose = () => {
      trap.deactivate();
      modal.removeEventListener('close', originalModalClose);
    };
    modal.addEventListener('close', originalModalClose);
  });

  document.body.appendChild(helpButton);
  document.body.appendChild(modal);
}

/**
 * Enhanced form validation with accessibility
 * @param {HTMLFormElement} form - Form element to validate
 * @returns {Object} - Validation result { isValid, errors }
 */
export function validateFormAccessibly(form) {
  const errors = [];
  const fields = form.elements;

  for (let i = 0; i < fields.length; i++) {
    const field = fields[i];

    // Skip disabled fields and fieldsets
    if (field.disabled || field.nodeName === 'FIELDSET') continue;

    // Check required fields
    if (field.hasAttribute('required') && !field.value.trim()) {
      errors.push({
        field,
        message: `Ce champ est requis`,
        type: 'missing'
      });

      // Add aria-invalid and describe error
      field.setAttribute('aria-invalid', 'true');

      // Create or update error message
      let errorId = `${field.id}-error`;
      let errorElement = document.getElementById(errorId);

      if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.id = errorId;
        errorElement.className = 'form-error';
        errorElement.setAttribute('role', 'alert');
        errorElement.style.cssText = `
          color: var(--color-error-500);
          font-size: var(--text-sm);
          margin-top: 4px;
          display: block;
        `;

        // Insert after field
        field.parentNode.insertBefore(errorElement, field.nextSibling);
      }

      errorElement.textContent = errors[errors.length-1].message;
      field.setAttribute('aria-describedby', errorId);
    } else {
      // Remove error state if field passes validation
      field.removeAttribute('aria-invalid');
      const errorId = `${field.id}-error`;
      const errorElement = document.getElementById(errorId);
      if (errorElement) {
        errorElement.remove();
      }
      field.removeAttribute('aria-describedby');
    }

    // Validate specific field types
    if (field.type === 'email' && field.value.trim()) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(field.value.trim())) {
        errors.push({
          field,
          message: `Veuillez entrer une adresse email valide`,
          type: 'invalid'
        });

        field.setAttribute('aria-invalid', 'true');

        let errorId = `${field.id}-error`;
        let errorElement = document.getElementById(errorId);

        if (!errorElement) {
          errorElement = document.createElement('div');
          errorElement.id = errorId;
          errorElement.className = 'form-error';
          errorElement.setAttribute('role', 'alert');
          errorElement.style.cssText = `
            color: var(--color-error-500);
            font-size: var(--text-sm);
            margin-top: 4px;
            display: block;
          `;

          field.parentNode.insertBefore(errorElement, field.nextSibling);
        }

        errorElement.textContent = errors[errors.length-1].message;
        field.setAttribute('aria-describedby', errorId);
      }
    }

    if (field.type === 'tel' && field.value.trim()) {
      // Basic phone validation (adjust as needed for your region)
      const phonePattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
      if (!phonePattern.test(field.value.trim())) {
        errors.push({
          field,
          message: `Veuillez entrer un numéro de téléphone valide`,
          type: 'invalid'
        });

        field.setAttribute('aria-invalid', 'true');

        let errorId = `${field.id}-error`;
        let errorElement = document.getElementById(errorId);

        if (!errorElement) {
          errorElement = document.createElement('div');
          errorElement.id = errorId;
          errorElement.className = 'form-error';
          errorElement.setAttribute('role', 'alert');
          errorElement.style.cssText = `
            color: var(--color-error-500);
            font-size: var(--text-sm);
            margin-top: 4px;
            display: block;
          `;

          field.parentNode.insertBefore(errorElement, field.nextSibling);
        }

        errorElement.textContent = errors[errors.length-1].message;
        field.setAttribute('aria-describedby', errorId);
      }
    }
  }

  // Focus first error if any
  if (errors.length > 0) {
    errors[0].field.focus();
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export default {
  focusTrap,
  createSkipLink,
  announce,
  isElementInViewport,
  getAccessibleName,
  makeFocusable,
  addKeyboardHelp,
  validateFormAccessibly
};