"use client";

import { useEffect } from "react";

import { sectionIds } from "@/data/site";
import { useActiveSection } from "@/hooks/useActiveSection";
import { MagicCanvas } from "@/components/visuals/MagicCanvas";

/**
 * The world every section sits inside.
 *
 * Fixed behind the whole document, so scrolling moves *through* the universe
 * rather than past a series of separately-decorated blocks — this is what makes
 * the sections read as one continuous place with no hard boundaries.
 *
 * The three aurora blooms are tinted from `--world-a|b|c`, custom properties
 * registered with `@property` so the browser can interpolate them as colours.
 * Scrolling into a new section swaps those values and the whole atmosphere
 * *flows* from one climate to the next over ~1.6s, instead of cutting.
 */
export function WorldBackdrop() {
  const active = useActiveSection(sectionIds);

  // Publish the current climate on <html> so the CSS can drive the morph.
  // Doing it here (rather than per-section) keeps a single source of truth.
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-world", active || "hero");
    return () => root.removeAttribute("data-world");
  }, [active]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-void-950" />

      {/* Aurora — three slow, offset blooms that drift and re-tint per section. */}
      <div
        className="absolute -left-[15%] top-[-10%] h-[52rem] w-[52rem] rounded-full opacity-70 blur-[90px] [animation:float-soft_16s_ease-in-out_infinite]"
        style={{ background: "radial-gradient(circle, var(--world-a), transparent 66%)" }}
      />
      <div
        className="absolute right-[-12%] top-[22%] h-[46rem] w-[46rem] rounded-full opacity-70 blur-[90px] [animation:float-soft_21s_ease-in-out_infinite_reverse]"
        style={{ background: "radial-gradient(circle, var(--world-b), transparent 66%)" }}
      />
      <div
        className="absolute left-[30%] top-[62%] h-[56rem] w-[56rem] rounded-full opacity-60 blur-[100px] [animation:float-soft_26s_ease-in-out_infinite]"
        style={{ background: "radial-gradient(circle, var(--world-c), transparent 68%)" }}
      />

      {/* A fourth, very slow veil that never quite repeats — keeps the field
          from settling into an obvious loop. */}
      <div
        className="absolute left-[8%] top-[30%] h-[64rem] w-[64rem] rounded-full opacity-40 blur-[120px] [animation:drift-wide_47s_ease-in-out_infinite]"
        style={{ background: "radial-gradient(circle, var(--world-b), transparent 70%)" }}
      />

      {/* Butterflies, constellation and stardust. */}
      <MagicCanvas className="absolute inset-0 h-full w-full" />

      {/* Vignette keeps long-form text legible over the brightest blooms. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, transparent 25%, color-mix(in srgb, var(--color-void-950) 62%, transparent) 100%)",
        }}
      />
    </div>
  );
}
