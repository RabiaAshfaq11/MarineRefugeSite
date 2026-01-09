import { useEffect, useRef, useState } from "react";
import { useScroll } from "@/contexts/scroll-context";

export function useScrollDirection() {
  const { scroll } = useScroll();
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const lastScrollRef = useRef(0);

  useEffect(() => {
    const delta = scroll - lastScrollRef.current;

    if (Math.abs(delta) > 5) {
      setIsScrollingDown(delta > 0);
      lastScrollRef.current = scroll;
    }
  }, [scroll]);

  return {
    isScrollingDown,
    shouldShowNav: scroll < 100 || !isScrollingDown,
    currentScroll: scroll,
  };
}
