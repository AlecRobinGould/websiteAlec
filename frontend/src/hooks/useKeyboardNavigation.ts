import { useEffect } from 'react';

export const useKeyboardNavigation = () => {
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        const nextSection = Array.from(sections).find(
          (section) =>
            section.getBoundingClientRect().top > window.innerHeight / 2
        );
        if (nextSection) {
          nextSection.scrollIntoView({ behavior: 'smooth' });
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        const prevSection = Array.from(sections)
          .reverse()
          .find(
            (section) =>
              section.getBoundingClientRect().top < window.innerHeight / 2
          );
        if (prevSection) {
          prevSection.scrollIntoView({ behavior: 'smooth' });
        }
      } else if (e.key === 'Home') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (e.key === 'End') {
        e.preventDefault();
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
};
