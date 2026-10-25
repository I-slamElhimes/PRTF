"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";
import { EASE_OUT_EXPO, viewportOnce } from "@/lib/motion";
import { focusAreas, intelligenceIntro, pipelineStages } from "@/data/pipeline";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Intelligence() {
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const active = pipelineStages[activeIndex] ?? pipelineStages[0]!;

  return (
    <section id="intelligence" aria-labelledby="intelligence-heading" className="section-y relative">
      <div className="shell">
        <SectionHeading
          id="intelligence-heading"
          index="04"
          eyebrow={intelligenceIntro.eyebrow}
          title="Building toward"
          accentWord="intelligent systems"
        />

        {/* Honest positioning, stated plainly. */}
        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:gap-x-14">
          <Reveal className="lg:col-span-6">
            <p className="font-display text-[clamp(1.15rem,2.4vw,1.6rem)] leading-snug tracking-tight text-mist-100">
              {intelligenceIntro.lead}
            </p>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-6">
            <p className="text-[0.95rem] leading-relaxed text-mist-400">{intelligenceIntro.body}</p>
          </Reveal>
        </div>

        {/* ── Interactive pipeline ─────────────────────────────────────── */}
        <div className="mt-16">
          <div className="flex items-center gap-4">
            <span className="eyebrow text-[0.625rem] text-violet-400/80">The pipeline</span>
            <span aria-hidden="true" className="h-px flex-1 bg-gradient-to-r from-white/12 to-transparent" />
            <span className="eyebrow hidden text-[0.625rem] text-mist-600 sm:block">
              Select a stage
            </span>
          </div>

          {/* Stepper */}
          <ol className="mt-8 flex flex-col gap-2 lg:flex-row lg:items-stretch lg:gap-0">
            {pipelineStages.map((stage, index) => {
              const isActive = index === activeIndex;
              const isPast = index < activeIndex;

              return (
                <li key={stage.id} className="relative flex-1">
                  <button
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    onFocus={() => setActiveIndex(index)}
                    aria-current={isActive ? "step" : undefined}
                    aria-controls="pipeline-detail"
                    className="group flex w-full items-center gap-3 py-2.5 text-left lg:flex-col lg:items-start lg:gap-0 lg:py-0 lg:pr-4"
                  >
                    {/* Rail + node */}
                    <span className="relative flex items-center lg:mb-4 lg:w-full">
                      <span
                        aria-hidden="true"
                        className={cn(
                          "relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border bg-void-950 text-[0.62rem] transition-all duration-500",
                          isActive
                            ? "border-violet-400/60 text-violet-200"
                            : isPast
                              ? "border-white/20 text-mist-400"
                              : "border-white/10 text-mist-600 group-hover:border-white/22",
                        )}
                      >
                        {stage.index}
                        {isActive && !prefersReducedMotion ? (
                          <span className="absolute inset-0 rounded-full border border-violet-400/40 [animation:pulse-ring_2.6s_ease-out_infinite]" />
                        ) : null}
                      </span>

                      {/* Connector to the next stage */}
                      {index < pipelineStages.length - 1 ? (
                        <span
                          aria-hidden="true"
                          className="ml-2 hidden h-px flex-1 bg-white/[0.09] lg:block"
                        >
                          <motion.span
                            className="block h-px origin-left bg-gradient-to-r from-violet-400/70 to-rose-400/50"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: isPast ? 1 : 0 }}
                            transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
                          />
                        </span>
                      ) : null}
                    </span>

                    <span className="min-w-0 lg:w-full">
                      <span
                        className={cn(
                          "block text-[0.68rem] uppercase tracking-[0.16em] transition-colors duration-500",
                          isActive ? "text-mist-50" : "text-mist-500 group-hover:text-mist-300",
                        )}
                      >
                        {stage.label}
                      </span>
                      <span
                        className={cn(
                          "mt-1 hidden text-[0.72rem] leading-snug transition-colors duration-500 lg:block",
                          isActive ? "text-mist-400" : "text-mist-600",
                        )}
                      >
                        {stage.title}
                      </span>
                    </span>

                    {/* Mobile: vertical connector */}
                    {index < pipelineStages.length - 1 ? (
                      <span
                        aria-hidden="true"
                        className="absolute left-4 top-[2.75rem] h-[calc(100%-1.5rem)] w-px bg-white/[0.08] lg:hidden"
                      />
                    ) : null}
                  </button>
                </li>
              );
            })}
          </ol>

          {/* Detail */}
          <div
            id="pipeline-detail"
            aria-live="polite"
            className="panel relative mt-8 overflow-hidden rounded-2xl p-6 sm:p-8"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.38, ease: EASE_OUT_EXPO }}
                className="grid gap-6 md:grid-cols-12 md:gap-x-10"
              >
                <div className="md:col-span-7">
                  <p className="eyebrow text-[0.625rem] text-violet-400/80">
                    {active.index} — {active.label}
                  </p>
                  <h3 className="mt-3 font-display text-[clamp(1.4rem,3vw,2rem)] leading-tight tracking-tight text-mist-50">
                    {active.title}
                  </h3>
                  <p className="mt-4 max-w-xl text-[0.95rem] leading-relaxed text-mist-400">
                    {active.description}
                  </p>
                </div>

                <div className="md:col-span-5">
                  <p className="eyebrow text-[0.625rem]">In practice</p>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {active.tools.map((tool, index) => (
                      <motion.li
                        key={tool}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: 0.06 + index * 0.05 }}
                        className="rounded-full border border-white/[0.09] bg-white/[0.02] px-3 py-1.5 text-[0.7rem] text-mist-300"
                      >
                        {tool}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ── Focus areas ──────────────────────────────────────────────── */}
        <div className="mt-16">
          <div className="flex items-center gap-4">
            <span className="eyebrow text-[0.625rem]">Where I am building depth</span>
            <span aria-hidden="true" className="h-px flex-1 bg-white/[0.07]" />
          </div>

          <ul className="mt-8 grid gap-px overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.06] sm:grid-cols-2 lg:grid-cols-3">
            {focusAreas.map((area, index) => (
              <motion.li
                key={area.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={viewportOnce}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group relative bg-void-950 p-6 transition-colors duration-500 hover:bg-void-900"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-violet-400/60 to-transparent transition-transform duration-700 group-hover:scale-x-100"
                />
                <p className="font-display text-[1.05rem] tracking-tight text-mist-100">{area.title}</p>
                <p className="mt-2 text-[0.85rem] leading-relaxed text-mist-500">{area.description}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
