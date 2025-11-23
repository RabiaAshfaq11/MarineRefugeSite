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
import { useEffect } from "react";

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
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        window.scrollBy({
          top: e.deltaY > 0 ? 100 : -100,
          behavior: 'smooth'
        });
      }, 1000);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', ' '].includes(e.key)) {
        e.preventDefault();
        
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          let scrollAmount = 100;
          if (e.key === 'PageUp' || e.key === 'PageDown') scrollAmount = window.innerHeight - 100;
          
          window.scrollBy({
            top: (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') ? scrollAmount : -scrollAmount,
            behavior: 'smooth'
          });
        }, 1000);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(scrollTimeout);
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
