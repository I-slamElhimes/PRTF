"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";

import { cn } from "@/lib/utils";
import { EASE_OUT_EXPO, viewportOnce } from "@/lib/motion";
import { journeyIntro, journeyStages } from "@/data/journey";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const stateStyles = {
  completed: {
    dot: "bg-mist-300",
    ring: "border-white/18",
    label: "Completed",
    labelClass: "text-mist-500",
  },
  current: {
    dot: "bg-rose-400",
    ring: "border-rose-400/50",
    label: "In progress",
    labelClass: "text-rose-300",
  },
  next: {
    dot: "bg-violet-400",
    ring: "border-violet-400/50",
    label: "Current direction",
    labelClass: "text-violet-300",
  },
} as const;

export function Journey() {
  const trackRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // The connecting line draws itself as the stages scroll past.
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 75%", "end 55%"],
  });
  const lineScale = useSpring(scrollYProgress, { stiffness: 90, damping: 26, restDelta: 0.001 });
  const lineOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  return (
    <section id="about" aria-labelledby="journey-heading" className="section-y relative">
      <div className="shell">
        <SectionHeading
          id="journey-heading"
          index="01"
          eyebrow="Behind the code"
          title="A trajectory,"
          accentWord="not a title"
        />

        <div className="mt-16 grid gap-14 lg:grid-cols-12 lg:gap-x-16">
          {/* ── Narrative — sticky on desktop so it frames the whole track ── */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <div className="space-y-5">
                {journeyIntro.paragraphs.map((paragraph, index) => (
                  <Reveal key={index} delay={index * 0.08}>
                    <p
                      className={cn(
                        "text-[0.95rem] leading-relaxed",
                        index === 0 ? "text-mist-200" : "text-mist-400",
                      )}
                    >
                      {paragraph}
                    </p>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={0.24} className="mt-9">
                <div className="panel relative rounded-xl p-5">
                  <p className="eyebrow text-[0.625rem] text-rose-400/80">Positioning</p>
                  <p className="mt-3 text-[0.9rem] leading-relaxed text-mist-300">
                    Full Stack Developer and Computer Engineering student, progressively
                    specializing in AI and Data Science — stated as a direction I am actively
                    working in, not a title I have already earned.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>

          {/* ── Progression track ─────────────────────────────────────────── */}
          <div ref={trackRef} className="relative lg:col-span-7">
            {/* Rail */}
            <div
              aria-hidden="true"
              className="absolute left-[15px] top-2 bottom-2 w-px bg-white/[0.08] sm:left-[19px]"
            />
            <motion.div
              aria-hidden="true"
              style={
                prefersReducedMotion
                  ? { scaleY: 1 }
                  : { scaleY: lineScale, opacity: lineOpacity }
              }
              className="absolute left-[15px] top-2 bottom-2 w-px origin-top bg-gradient-to-b from-rose-400 via-violet-500 to-violet-500 sm:left-[19px]"
            />

            <ol className="space-y-11">
              {journeyStages.map((stage, index) => {
                const style = stateStyles[stage.state];

                return (
                  <motion.li
                    key={stage.id}
                    initial={{ opacity: 0, y: 26 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={viewportOnce}
                    transition={{ duration: 0.75, ease: EASE_OUT_EXPO, delay: index * 0.06 }}
                    className="group relative pl-12 sm:pl-16"
                  >
                    {/* Node */}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full border bg-void-950 transition-colors duration-500 sm:h-[38px] sm:w-[38px]",
                        style.ring,
                      )}
                    >
                      <span className={cn("h-1.5 w-1.5 rounded-full", style.dot)} />
                      {stage.state === "current" && !prefersReducedMotion ? (
                        <span className="absolute inset-0 rounded-full border border-rose-400/40 [animation:pulse-ring_2.8s_ease-out_infinite]" />
                      ) : null}
                    </span>

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                      <span className="eyebrow text-[0.625rem]">{stage.index}</span>
                      <span className="eyebrow text-[0.625rem] text-mist-400">{stage.period}</span>
                      <span
                        className={cn(
                          "eyebrow text-[0.625rem] tracking-[0.18em]",
                          style.labelClass,
                        )}
                      >
                        {style.label}
                      </span>
                    </div>

                    <h3 className="mt-2.5 font-display text-[clamp(1.4rem,3vw,2rem)] leading-tight tracking-tight text-mist-50">
                      {stage.title}
                    </h3>
                    <p className="mt-1 text-[0.82rem] text-mist-500">{stage.subtitle}</p>
                    <p className="mt-3.5 max-w-xl text-[0.925rem] leading-relaxed text-mist-400">
                      {stage.description}
                    </p>

                    <ul className="mt-4 flex flex-wrap gap-1.5">
                      {stage.markers.map((marker) => (
                        <li
                          key={marker}
                          className="rounded-full border border-white/[0.09] bg-white/[0.02] px-2.5 py-1 text-[0.66rem] tracking-wide text-mist-400 transition-colors duration-300 group-hover:border-white/16 group-hover:text-mist-300"
                        >
                          {marker}
                        </li>
                      ))}
                    </ul>
                  </motion.li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
