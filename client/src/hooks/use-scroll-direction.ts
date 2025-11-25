import { useEffect, useRef, useState } from "react";
import { useScroll } from "@/contexts/scroll-context";

export function useScrollDirection() {
  const { scroll } = useScroll();
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const lastScrollRef = useRef(0);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const direction = scroll > lastScrollRef.current ? "down" : "up";
    
    if (direction === "down") {
      setIsScrollingDown(true);
    } else if (scroll > 20) {
      // Only show navbar if scrolling up and past threshold
      setIsScrollingDown(false);
    }
    
    lastScrollRef.current = scroll;

    // Show that we're scrolling
    setIsScrolling(true);
    
    // Clear existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    // Hide navbar after scroll stops for 500ms
    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
      setIsScrollingDown(false);
    }, 500);

    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [scroll]);

  return {
    isScrollingDown,
    isScrolling,
    shouldShowNav: scroll <= 20 || isScrolling && !isScrollingDown,
  };
}
