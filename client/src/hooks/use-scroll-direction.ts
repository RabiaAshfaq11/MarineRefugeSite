import { useEffect, useRef, useState } from "react";
import { useScroll } from "@/contexts/scroll-context";

export function useScrollDirection() {
  const { scroll } = useScroll();
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const lastScrollRef = useRef(0);

  useEffect(() => {
    const delta = scroll - lastScrollRef.current;
    
    // Update state based on scroll direction
    // Keep navbar visible when scrolling down
    if (delta > 0) {
      setIsScrollingDown(true);
    } else if (delta < 0) {
      // Hide when scrolling up
      setIsScrollingDown(false);
    }

    lastScrollRef.current = scroll;
  }, [scroll]);

  return {
    isScrollingDown,
    // Show navbar at top OR when scrolling down
    shouldShowNav: true,
  };
}
