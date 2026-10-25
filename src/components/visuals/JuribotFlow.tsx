"use client";

import { motion, useReducedMotion } from "motion/react";

import { EASE_OUT_EXPO, viewportOnce } from "@/lib/motion";
import { juribotFlow } from "@/data/projects";

/**
 * The featured project's data path, from raw regulatory source to a decision
 * a business can act on. Each node is a real stage of the pipeline described
 * in the project — the diagram explains the architecture rather than decorating
 * it.
 */
export function JuribotFlow() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative">
      <div className="flex items-center gap-4">
        <span className="eyebrow text-[0.625rem] text-rose-400/80">Data path</span>
        <span aria-hidden="true" className="h-px flex-1 bg-gradient-to-r from-white/12 to-transparent" />
      </div>

      <ol className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-4 lg:grid-cols-7">
        {juribotFlow.map((stage, index) => (
          <motion.li
            key={stage.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.55, ease: EASE_OUT_EXPO, delay: index * 0.07 }}
            className="group/stage relative"
          >
            <div className="relative h-full rounded-lg border border-white/[0.08] bg-white/[0.02] p-3 transition-colors duration-500 hover:border-rose-400/30">
              {/* Travelling signal — a single pass per node, offset down the chain. */}
              {!prefersReducedMotion ? (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-px overflow-hidden"
                >
                  <motion.span
                    className="block h-px w-1/2 bg-gradient-to-r from-transparent via-rose-400 to-transparent"
                    animate={{ x: ["-100%", "300%"] }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      repeatDelay: 2.6,
                      ease: "easeInOut",
                      delay: index * 0.32,
                    }}
                  />
                </span>
              ) : null}

              <span className="eyebrow text-[0.575rem] text-mist-600">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="mt-1.5 text-[0.78rem] font-medium leading-snug tracking-tight text-mist-100">
                {stage.label}
              </p>
              <p className="mt-1 text-[0.68rem] leading-snug text-mist-500">{stage.detail}</p>
            </div>

            {/* Connector — only between nodes on the same row. */}
            {index < juribotFlow.length - 1 ? (
              <span
                aria-hidden="true"
                className="absolute -right-2.5 top-1/2 hidden w-2.5 -translate-y-1/2 items-center justify-center lg:flex"
              >
                <span className="h-px w-full bg-white/12" />
              </span>
            ) : null}
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
