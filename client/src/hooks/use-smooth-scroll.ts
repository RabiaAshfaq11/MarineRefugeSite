export function useSmoothScroll() {
  const scrollToElement = (
    element: HTMLElement,
    options?: {
      offset?: number;
      duration?: number;
      easing?: string;
    }
  ) => {
    const { offset = 0, duration = 800, easing = "easeInOutCubic" } = options || {};
    
    const targetPosition = element.getBoundingClientRect().top + window.scrollY - offset;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    let start: number | null = null;

    const easeInOutCubic = (t: number) => {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    };

    const animation = (currentTime: number) => {
      if (start === null) start = currentTime;
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = easing === "easeInOutCubic" ? easeInOutCubic(progress) : progress;

      window.scrollTo(0, startPosition + distance * ease);

      if (progress < 1) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  const scrollToTop = (options?: {
    duration?: number;
    easing?: string;
  }) => {
    const { duration = 800, easing = "easeInOutCubic" } = options || {};
    const startPosition = window.scrollY;
    let start: number | null = null;

    const easeInOutCubic = (t: number) => {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    };

    const animation = (currentTime: number) => {
      if (start === null) start = currentTime;
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = easing === "easeInOutCubic" ? easeInOutCubic(progress) : progress;

      window.scrollTo(0, startPosition * (1 - ease));

      if (progress < 1) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  return { scrollToElement, scrollToTop };
}