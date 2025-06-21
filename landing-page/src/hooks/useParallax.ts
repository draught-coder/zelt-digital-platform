
import { useEffect } from "react";

/**
 * Attaches a scroll parallax effect to elements with `[data-parallax-depth]`.
 * Each matching element moves at different speeds according to its depth value.
 */
const useParallax = () => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const parallaxEls = document.querySelectorAll<HTMLElement>("[data-parallax-depth]");
      parallaxEls.forEach((el) => {
        const depth = Number(el.dataset.parallaxDepth) || 0;
        // The larger the depth, the slower it moves
        const translateY = scrollY * (depth / 10);
        el.style.transform = `translateY(${translateY}px)`;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // initial scroll position
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      // Reset transforms when cleaning up
      const parallaxEls = document.querySelectorAll<HTMLElement>("[data-parallax-depth]");
      parallaxEls.forEach((el) => (el.style.transform = ""));
    };
  }, []);
};

export default useParallax;
