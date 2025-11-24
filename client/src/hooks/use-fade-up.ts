import { useEffect, useRef } from 'react';

export function useFadeUp() {
  const elementsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement;
          element.classList.add('fade-up-visible');
          observer.unobserve(element);
        }
      });
    }, observerOptions);

    // Observe all elements with fade-up-trigger class
    const fadeUpElements = document.querySelectorAll('.fade-up-trigger');
    fadeUpElements.forEach((el) => {
      observer.observe(el);
      elementsRef.current.push(el as HTMLElement);
    });

    return () => {
      elementsRef.current.forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);
}
