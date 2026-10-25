"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";

import { EASE_OUT_EXPO } from "@/lib/motion";
import { orbitNodes } from "@/data/skills";
import { useHasFinePointer } from "@/hooks/useMediaQuery";

/**
 * The hero's centrepiece: a liquid-glass sphere carrying the monogram, ringed
 * by the six domains this portfolio is about, each wired back to the core.
 *
 * Everything is CSS gradients + SVG — no WebGL, no texture downloads — so it
 * costs a few hundred bytes and composites on the GPU.
 */

/** Node placement as a percentage of the stage, laid out like the reference. */
const PLACEMENT: Record<string, { x: number; y: number }> = {
  ai: { x: 24, y: 11 },
  web: { x: 84, y: 15 },
  data: { x: 8, y: 42 },
  api: { x: 92, y: 46 },
  code: { x: 22, y: 78 },
  db: { x: 82, y: 79 },
};

const CORE = { x: 54, y: 45 };

export function OrbitalCore() {
  const stageRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const finePointer = useHasFinePointer();
  const interactive = finePointer && !prefersReducedMotion;

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 60, damping: 18, mass: 0.7 });
  const py = useSpring(my, { stiffness: 60, damping: 18, mass: 0.7 });

  const coreX = useTransform(px, [-1, 1], [-14, 14]);
  const coreY = useTransform(py, [-1, 1], [-10, 10]);
  const nodeX = useTransform(px, [-1, 1], [10, -10]);
  const nodeY = useTransform(py, [-1, 1], [7, -7]);
  const sheenX = useTransform(px, [-1, 1], ["38%", "62%"]);
  const sheenY = useTransform(py, [-1, 1], ["34%", "58%"]);

  useEffect(() => {
    if (!interactive) return;
    const onMove = (event: PointerEvent) => {
      const rect = stageRef.current?.getBoundingClientRect();
      if (!rect) return;
      // Normalise against the stage, not the viewport, so the core reacts to
      // the cursor's position relative to itself.
      mx.set(((event.clientX - rect.left) / rect.width) * 2 - 1);
      my.set(((event.clientY - rect.top) / rect.height) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [interactive, mx, my]);

  return (
    <div ref={stageRef} className="relative aspect-square w-full select-none">
      {/* ── Connectors ─────────────────────────────────────────────────── */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="absolute inset-0 hidden h-full w-full sm:block"
      >
        <defs>
          <linearGradient id="core-wire" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--color-rose-400)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="var(--color-violet-400)" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {orbitNodes.map((node, index) => {
          const p = PLACEMENT[node.id]!;
          // Elbow routing: out horizontally, then into the core. Reads as a
          // circuit trace rather than a spider's web of diagonals.
          const midX = p.x < CORE.x ? p.x + (CORE.x - p.x) * 0.42 : p.x - (p.x - CORE.x) * 0.42;
          const d = `M ${p.x} ${p.y} H ${midX} V ${CORE.y} H ${CORE.x}`;

          return (
            <g key={node.id}>
              <motion.path
                d={d}
                fill="none"
                stroke="url(#core-wire)"
                strokeWidth="0.35"
                vectorEffect="non-scaling-stroke"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.2, ease: EASE_OUT_EXPO, delay: 0.9 + index * 0.1 }}
              />
              {/* Signal travelling inward along the trace */}
              {!prefersReducedMotion ? (
                <motion.circle
                  r="0.7"
                  fill="var(--color-rose-300)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 1, 0] }}
                  transition={{
                    duration: 2.6,
                    repeat: Infinity,
                    repeatDelay: 1.8,
                    delay: 1.6 + index * 0.45,
                    times: [0, 0.15, 0.85, 1],
                  }}
                  style={{ offsetPath: `path("${d}")`, offsetRotate: "0deg" }}
                  className="[offset-distance:0%] motion-safe:[animation:offset-travel_2.6s_ease-in-out_infinite]"
                />
              ) : null}
            </g>
          );
        })}
      </svg>

      {/* ── Core ───────────────────────────────────────────────────────── */}
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2"
        style={{
          left: `${CORE.x}%`,
          top: `${CORE.y}%`,
          ...(interactive ? { x: coreX, y: coreY } : {}),
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: EASE_OUT_EXPO, delay: 0.35 }}
      >
        <div className="relative h-[13rem] w-[13rem] sm:h-[15rem] sm:w-[15rem] lg:h-[17rem] lg:w-[17rem]">
          {/* Outer bloom */}
          <div
            aria-hidden="true"
            className="absolute -inset-10 rounded-full opacity-70 blur-[46px]"
            style={{
              background:
                "radial-gradient(circle, color-mix(in oklab, var(--color-violet-500) 55%, transparent), transparent 68%)",
            }}
          />

          {/* Glass shell */}
          <div
            className="absolute inset-0 rounded-full border border-white/25 shadow-[inset_0_2px_30px_rgba(255,255,255,0.28),0_30px_80px_-30px_rgba(120,40,220,0.9)]"
            style={{
              background:
                "radial-gradient(circle at 34% 30%, rgba(255,255,255,0.5), rgba(196,132,252,0.3) 34%, rgba(109,40,217,0.5) 62%, rgba(35,10,70,0.72) 100%)",
              backdropFilter: "blur(2px)",
            }}
          />

          {/* Liquid interior — two counter-rotating veils */}
          <div className="absolute inset-[6%] overflow-hidden rounded-full">
            <div
              aria-hidden="true"
              className="absolute inset-[-30%] opacity-80 mix-blend-screen motion-safe:[animation:spin-slow_22s_linear_infinite]"
              style={{
                background:
                  "conic-gradient(from 0deg, transparent, rgba(244,114,182,0.55), transparent 38%, rgba(129,140,248,0.5), transparent 72%)",
                filter: "blur(12px)",
              }}
            />
            <div
              aria-hidden="true"
              className="absolute inset-[-20%] opacity-70 mix-blend-screen motion-safe:[animation:spin-slow_34s_linear_infinite_reverse]"
              style={{
                background:
                  "conic-gradient(from 140deg, transparent, rgba(216,180,254,0.6), transparent 45%, rgba(236,72,153,0.4), transparent 80%)",
                filter: "blur(16px)",
              }}
            />
          </div>

          {/* Specular highlight that tracks the cursor */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-full"
            style={{
              background: `radial-gradient(circle at ${interactive ? "var(--sx)" : "40%"} ${
                interactive ? "var(--sy)" : "32%"
              }, rgba(255,255,255,0.55), transparent 42%)`,
              ...(interactive ? ({ "--sx": sheenX, "--sy": sheenY } as never) : {}),
            }}
          />

          {/* Monogram */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="serif text-[4.5rem] leading-none text-white/90 sm:text-[5.2rem] lg:text-[6rem]"
              style={{ textShadow: "0 0 28px rgba(255,255,255,0.55), 0 0 60px rgba(196,132,252,0.7)" }}
            >
              I
            </span>
          </div>

          {/* Orbit ring */}
          <div
            aria-hidden="true"
            className="absolute -inset-5 rounded-full border border-white/10 motion-safe:[animation:spin-slow_44s_linear_infinite]"
            style={{ borderStyle: "dashed" }}
          />
        </div>
      </motion.div>

      {/* ── Nodes ──────────────────────────────────────────────────────── */}
      <motion.div className="absolute inset-0 hidden sm:block" style={interactive ? { x: nodeX, y: nodeY } : undefined}>
        {orbitNodes.map((node, index) => {
          const p = PLACEMENT[node.id]!;
          return (
            <motion.div
              key={node.id}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
              initial={{ opacity: 0, scale: 0.85, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 1 + index * 0.09 }}
            >
              <div className="glass-node group relative min-w-[5.2rem] rounded-2xl px-3.5 py-2.5 text-center lg:min-w-[6rem] lg:px-4 lg:py-3">
                <span className="block font-display text-[1.05rem] font-light tracking-[0.08em] text-mist-50 lg:text-[1.2rem]">
                  {node.label}
                </span>
                <span className="mt-0.5 block text-[0.55rem] leading-tight tracking-wide text-mist-400 lg:text-[0.6rem]">
                  {node.caption}
                </span>
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ boxShadow: "0 0 0 1px var(--color-rose-400), 0 0 34px -6px var(--color-rose-500)" }}
                />
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Compact fallback under `sm`, where the wired layout cannot breathe */}
      <ul className="absolute inset-x-0 bottom-0 flex flex-wrap justify-center gap-1.5 sm:hidden">
        {orbitNodes.map((node) => (
          <li key={node.id} className="glass-node rounded-full px-3 py-1.5 text-[0.65rem] tracking-[0.14em] text-mist-200">
            {node.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
