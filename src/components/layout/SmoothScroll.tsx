"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "motion/react";

/**
 * Lenis-driven smooth scrolling, plus in-page anchor interception.
 *
 * Skipped entirely for reduced-motion users and on touch devices, where the
 * native momentum scroll is both better tuned and cheaper than emulating it.
 */
export function SmoothScroll() {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    if (prefersReducedMotion || coarsePointer) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = window.requestAnimationFrame(raf);
    };
    frame = window.requestAnimationFrame(raf);

    // Route same-page anchors through Lenis so the easing stays consistent.
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey) return;

      const anchor = (event.target as HTMLElement | null)?.closest("a");
      const href = anchor?.getAttribute("href");
      if (!anchor || !href || !href.startsWith("#") || href === "#") return;

      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -80, duration: 1.15 });
      history.replaceState(null, "", href);
    };

    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      window.cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [prefersReducedMotion]);

  return null;
}
