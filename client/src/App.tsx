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
import { useEffect, useRef } from "react";

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
  const targetScrollRef = useRef(0);

  useEffect(() => {
    targetScrollRef.current = window.scrollY;
    let animationFrameId: number;
    let wheelTimeout: NodeJS.Timeout;
    const damping = 0.15; // Lower = slower follow (0.1 = very slow, 0.3 = faster)

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      targetScrollRef.current += e.deltaY;
      targetScrollRef.current = Math.max(0, Math.min(targetScrollRef.current, document.documentElement.scrollHeight - window.innerHeight));

      // Clear existing timeout
      clearTimeout(wheelTimeout);
      // Reset timeout on each wheel event
      wheelTimeout = setTimeout(() => {}, 100);
    };

    const animateScroll = () => {
      const currentScroll = window.scrollY;
      const diff = targetScrollRef.current - currentScroll;
      
      if (Math.abs(diff) > 0.1) {
        window.scrollTo(0, currentScroll + diff * damping);
        animationFrameId = requestAnimationFrame(animateScroll);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    animationFrameId = requestAnimationFrame(animateScroll);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(wheelTimeout);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
