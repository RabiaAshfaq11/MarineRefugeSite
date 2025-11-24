import { useEffect, useRef, useState } from "react";

export function FollowCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseEnter = () => {
      setIsHovering(true);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    // Animate cursor position with lerp
    const animate = () => {
      const lerp = (start: number, end: number, factor: number) => {
        return start + (end - start) * factor;
      };

      const easeValue = 0.15; // Smooth following speed
      positionRef.current.x = lerp(
        positionRef.current.x,
        targetRef.current.x,
        easeValue
      );
      positionRef.current.y = lerp(
        positionRef.current.y,
        targetRef.current.y,
        easeValue
      );

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${positionRef.current.x - 6}px, ${positionRef.current.y - 6}px)`;
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Interactive elements that trigger scale effect
    const interactiveElements = document.querySelectorAll(
      "button, a, [role='button'], input[type='submit'], input[type='button'], label"
    );

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    window.addEventListener("mousemove", handleMouseMove);

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`follow-cursor ${isHovering ? "hover" : ""}`}
      data-testid="follow-cursor"
    />
  );
}
