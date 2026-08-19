import { useEffect } from 'react';
import { createSkipLink } from '../utils/accessibility';

export default function SkipLink() {
  useEffect(() => {
    // Create the skip link when component mounts
    createSkipLink();

    // Cleanup function (though skip link persists for the app lifetime)
    return () => {
      const skipLink = document.getElementById('skip-to-content');
      if (skipLink) {
        skipLink.remove();
      }
    };
  }, []);

  // This component doesn't render anything visible directly
  // The skip link is injected into the DOM by the utility function
  return null;
}