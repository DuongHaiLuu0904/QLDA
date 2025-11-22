import { useEffect, useRef } from 'react';

/**
 * Custom hook for managing focus
 * @param {boolean} shouldFocus - Whether to focus the element
 */
export const useFocusManagement = (shouldFocus = false) => {
  const elementRef = useRef(null);

  useEffect(() => {
    if (shouldFocus && elementRef.current) {
      elementRef.current.focus();
    }
  }, [shouldFocus]);

  return elementRef;
};

/**
 * Custom hook for keyboard navigation
 * @param {Function} onEnter - Callback for Enter key
 * @param {Function} onEscape - Callback for Escape key
 */
export const useKeyboardNavigation = (onEnter, onEscape) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter' && onEnter) {
        onEnter(event);
      } else if (event.key === 'Escape' && onEscape) {
        onEscape(event);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onEnter, onEscape]);
};

/**
 * Custom hook for managing document title for accessibility
 * @param {string} title - Page title
 */
export const usePageTitle = (title) => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title ? `${title} - Job Portal` : 'Job Portal';
    
    return () => {
      document.title = prevTitle;
    };
  }, [title]);
};

/**
 * Custom hook for announcing content to screen readers
 * @param {string} message - Message to announce
 * @param {string} priority - 'polite' or 'assertive'
 */
export const useAnnouncement = (message, priority = 'polite') => {
  useEffect(() => {
    if (!message) return;

    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;

    document.body.appendChild(announcement);

    const timer = setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);

    return () => {
      clearTimeout(timer);
      if (document.body.contains(announcement)) {
        document.body.removeChild(announcement);
      }
    };
  }, [message, priority]);
};

/**
 * Custom hook for trapping focus within a modal/dialog
 * @param {React.RefObject} containerRef - Ref to the container element
 * @param {boolean} isActive - Whether focus trap is active
 */
export const useFocusTrap = (containerRef, isActive = true) => {
  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement?.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement?.focus();
          e.preventDefault();
        }
      }
    };

    container.addEventListener('keydown', handleTabKey);
    firstElement?.focus();

    return () => {
      container.removeEventListener('keydown', handleTabKey);
    };
  }, [containerRef, isActive]);
};

/**
 * Skip to main content link component
 */
export const SkipToMain = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg focus:shadow-lg"
    >
      Chuyển đến nội dung chính
    </a>
  );
};

export default {
  useFocusManagement,
  useKeyboardNavigation,
  usePageTitle,
  useAnnouncement,
  useFocusTrap,
  SkipToMain
};
