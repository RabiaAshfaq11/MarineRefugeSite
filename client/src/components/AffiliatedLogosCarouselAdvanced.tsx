// ADVANCED: Carousel with controls and smooth transitions

import React, { useState, useEffect, useRef } from "react";
import { Play, Pause } from "lucide-react";

interface LogoItem {
  id: string;
  src: string;
  alt: string;
  testId: string;
}

interface AffiliatedLogosCarouselAdvancedProps {
  logos: LogoItem[];
  duration?: number;
  showControls?: boolean;
  autoPlay?: boolean;
  direction?: "left" | "right";
}

export const AffiliatedLogosCarouselAdvanced: React.FC<
  AffiliatedLogosCarouselAdvancedProps
> = ({
  logos,
  duration = 30,
  showControls = false,
  autoPlay = true,
  direction = "left",
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (carouselRef.current) {
      carouselRef.current.style.animationPlayState = isPlaying
        ? "paused"
        : "running";
    }
  };

  const animationDirection =
    direction === "right"
      ? "seamlessScrollReverse"
      : "seamlessScroll";

  if (!isMounted) return null;

  return (
    <div className="flex-1 space-y-4">
      <div className="relative overflow-hidden rounded-lg bg-white/50 backdrop-blur-sm">
        {/* Gradient overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white via-white/20 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white via-white/20 to-transparent z-10 pointer-events-none" />

        {/* Carousel Track */}
        <div
          ref={carouselRef}
          className="flex gap-4 items-center py-6 px-4"
          style={{
            animation: `${animationDirection} ${duration}s linear ${
              isPlaying ? "running" : "paused"
            } infinite`,
            animationPlayState: isPlaying ? "running" : "paused",
            willChange: "transform",
            backfaceVisibility: "hidden",
            perspective: 1000,
          }}
          data-testid="logo-carousel-track-advanced"
        >
          {/* Generate three sets for seamless looping */}
          {[0, 1, 2].map((setIndex) => (
            <div
              key={setIndex}
              className="flex gap-4 items-center min-w-max"
            >
              {logos.map((logo) => (
                <div
                  key={`${setIndex}-${logo.id}`}
                  className="w-28 h-24 flex items-center justify-center flex-shrink-0 transition-all duration-300 hover:scale-110 hover:opacity-100 opacity-80 cursor-pointer"
                  data-testid={`${logo.testId}-set-${setIndex}`}
                  title={logo.alt}
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="h-20 object-contain drop-shadow-md"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      {showControls && (
        <div className="flex justify-center gap-4">
          <button
            onClick={togglePlayPause}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors"
            data-testid="carousel-play-pause-btn"
            aria-label={isPlaying ? "Pause carousel" : "Play carousel"}
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4" />
                Pause
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Play
              </>
            )}
          </button>

          {/* Indicator dots */}
          <div className="flex items-center gap-2">
            {logos.map((logo, idx) => (
              <div
                key={logo.id}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === 0
                    ? "bg-primary w-6"
                    : "bg-primary/30 hover:bg-primary/60"
                }`}
                data-testid={`carousel-indicator-${idx}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};