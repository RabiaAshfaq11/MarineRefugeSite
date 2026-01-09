// NEW: Unified hook for section navigation with active link tracking
import { useEffect, useRef } from "react";
import { useSmoothScroll } from "./use-smooth-scroll";

interface ScrollSection {
  id: string;
  navSelector: string;
  offset?: number;
}

export function useScrollToSection(sections: ScrollSection[]) {
  const { scrollToElement, scrollToTop } = useSmoothScroll();
  const activeRef = useRef<string>("");

  // Handle navigation link clicks
  useEffect(() => {
    const handleNavClick = (section: ScrollSection) => {
      const element = document.getElementById(section.id);
      if (element) {
        scrollToElement(element, {
          offset: section.offset || 80,
          duration: 800,
          easing: "easeInOutCubic",
        });
        updateActiveLink(section.id);
      }
    };

    sections.forEach((section) => {
      const navLink = document.querySelector(
        section.navSelector
      ) as HTMLElement | null;

      if (navLink) {
        navLink.addEventListener("click", (e) => {
          e.preventDefault();
          handleNavClick(section);
        });
      }
    });

    return () => {
      sections.forEach((section) => {
        const navLink = document.querySelector(
          section.navSelector
        ) as HTMLElement | null;
        if (navLink) {
          navLink.removeEventListener("click", () => {});
        }
      });
    };
  }, [sections, scrollToElement]);

  // Update active link on scroll
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateActiveLinks();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const updateActiveLink = (sectionId: string) => {
    activeRef.current = sectionId;
    updateActiveLinkUI(sectionId);
  };

  const updateActiveLinks = () => {
    const scrollPosition = window.scrollY + 100;

    let currentSection = "";
    for (const section of sections) {
      const element = document.getElementById(section.id);
      if (element && element.offsetTop <= scrollPosition) {
        currentSection = section.id;
      }
    }

    if (currentSection && currentSection !== activeRef.current) {
      updateActiveLink(currentSection);
    }
  };

  const updateActiveLinkUI = (sectionId: string) => {
    // Remove active from all links
    sections.forEach((section) => {
      const navLink = document.querySelector(
        section.navSelector
      ) as HTMLElement | null;
      if (navLink) {
        navLink.classList.remove("active");
        navLink.setAttribute("aria-current", "false");
      }
    });

    // Add active to current section
    const currentSection = sections.find((s) => s.id === sectionId);
    if (currentSection) {
      const navLink = document.querySelector(
        currentSection.navSelector
      ) as HTMLElement | null;
      if (navLink) {
        navLink.classList.add("active");
        navLink.setAttribute("aria-current", "page");
      }
    }
  };

  return {
    scrollToElement,
    scrollToTop,
    updateActiveLink,
  };
}