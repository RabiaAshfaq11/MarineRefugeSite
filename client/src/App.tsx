import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import LearnMore from "@/pages/learn-more";
import AwardFics from "@/pages/award-fics";
import AwardHult from "@/pages/award-hult";
import NotFound from "@/pages/not-found";
import { useEffect, useRef, useState } from "react";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/learn-more" component={LearnMore} />
      <Route path="/awards/fics-24" component={AwardFics} />
      <Route path="/awards/hult-prize" component={AwardHult} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const scrollStateRef = useRef({
    current: 0,
    target: 0,
    max: 0,
  });
  const [, setScroll] = useState(0);

  useEffect(() => {
    // Update max scroll height
    const updateMaxScroll = () => {
      if (wrapperRef.current) {
        scrollStateRef.current.max =
          wrapperRef.current.scrollHeight - window.innerHeight;
      }
    };

    updateMaxScroll();
    window.addEventListener("resize", updateMaxScroll);

    // Lerp scroll handler
    let animationFrameId: number;
    const easeValue = 0.08; // Cuberto-style: lower = slower/heavier (0.05-0.1 range)

    const animate = () => {
      const state = scrollStateRef.current;

      // Lerp: current += (target - current) * ease
      state.current += (state.target - state.current) * easeValue;

      // Apply transform to wrapper
      if (wrapperRef.current) {
        wrapperRef.current.style.transform = `translateY(-${state.current}px)`;
      }

      setScroll(state.current);
      animationFrameId = requestAnimationFrame(animate);
    };

    // Wheel event listener
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      scrollStateRef.current.target += e.deltaY;
      scrollStateRef.current.target = Math.max(
        0,
        Math.min(scrollStateRef.current.target, scrollStateRef.current.max)
      );
    };

    // Touch events for mobile
    let touchStart = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStart = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const touchEnd = e.touches[0].clientY;
      const delta = touchStart - touchEnd;
      scrollStateRef.current.target += delta;
      scrollStateRef.current.target = Math.max(
        0,
        Math.min(scrollStateRef.current.target, scrollStateRef.current.max)
      );
      touchStart = touchEnd;
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("resize", updateMaxScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div
          ref={wrapperRef}
          className="scroll-wrapper"
          style={{
            width: "100%",
            transformOrigin: "top",
          }}
        >
          <Toaster />
          <Router />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
