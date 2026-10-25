"use client";

import { useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";

import { cn } from "@/lib/utils";
import { EASE_OUT_EXPO, viewportOnce } from "@/lib/motion";
import { skillCategories } from "@/data/skills";
import type { SkillCategory } from "@/types";
import { useHasFinePointer } from "@/hooks/useMediaQuery";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { skillIconMap } from "@/components/ui/Icons";

/**
 * One domain card.
 *
 * Tracks the cursor to move a specular highlight across the glass and to tilt
 * the surface a couple of degrees. The "liquid" read comes from the light
 * moving rather than the panel wobbling, so the text stays perfectly legible.
 */
function SkillCard({ category, index }: { category: SkillCategory; index: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const finePointer = useHasFinePointer();
  const interactive = finePointer && !prefersReducedMotion;
  const [hovered, setHovered] = useState(false);

  const Icon = skillIconMap[category.icon];

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 200, damping: 26 });
  const sy = useSpring(my, { stiffness: 200, damping: 26 });

  const rotateY = useTransform(sx, [0, 1], [3.5, -3.5]);
  const rotateX = useTransform(sy, [0, 1], [-3.5, 3.5]);
  const glowX = useTransform(sx, (v) => `${v * 100}%`);
  const glowY = useTransform(sy, (v) => `${v * 100}%`);
  const sheen = useMotionTemplate`radial-gradient(circle at ${glowX} ${glowY}, ${category.accent}3d, transparent 58%)`;

  const onMove = (event: React.MouseEvent<HTMLLIElement>) => {
    if (!interactive || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set((event.clientX - rect.left) / rect.width);
    my.set((event.clientY - rect.top) / rect.height);
  };

  const reset = () => {
    mx.set(0.5);
    my.set(0.5);
    setHovered(false);
  };

  return (
    <motion.li
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={reset}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.75, ease: EASE_OUT_EXPO, delay: (index % 3) * 0.08 }}
      style={{ perspective: 900 }}
      className="group h-full"
    >
      <motion.article
        style={interactive ? { rotateX, rotateY, transformStyle: "preserve-3d" } : undefined}
        className="glass-node relative flex h-full flex-col overflow-hidden rounded-[1.5rem] p-6"
      >
        {/* Cursor-tracked specular sweep */}
        {interactive ? (
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: sheen }}
          />
        ) : null}

        {/* Accent rim on hover */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[1.5rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ boxShadow: `inset 0 0 0 1px ${category.accent}66, 0 26px 60px -34px ${category.accent}` }}
        />

        <div className="relative flex items-center gap-3.5">
          <span
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-transform duration-500 group-hover:scale-105"
            style={{
              background: `linear-gradient(145deg, ${category.accent}33, ${category.accent}0d)`,
              border: `1px solid ${category.accent}4d`,
              color: category.accent,
            }}
          >
            <Icon className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <span className="block text-[0.55rem] uppercase tracking-[0.22em] text-mist-500">{category.index}</span>
            <h3 className="font-display text-[1.15rem] font-light tracking-tight text-mist-50">{category.title}</h3>
          </div>
        </div>

        <p className="relative mt-4 text-[0.82rem] font-light leading-relaxed text-mist-400">
          {category.description}
        </p>

        <ul className="relative mt-5 space-y-2">
          {category.skills.map((skill, skillIndex) => (
            <motion.li
              key={skill}
              initial={false}
              animate={hovered ? { x: 3 } : { x: 0 }}
              transition={{ duration: 0.4, ease: EASE_OUT_EXPO, delay: hovered ? skillIndex * 0.025 : 0 }}
              className="flex items-center gap-2.5 text-[0.8rem] font-light text-mist-300"
            >
              <span
                aria-hidden="true"
                className="h-1 w-1 shrink-0 rotate-45 transition-colors duration-500"
                style={{ background: hovered ? category.accent : "var(--color-mist-600)" }}
              />
              {skill}
            </motion.li>
          ))}
        </ul>

        {/* How the pieces chain together in a real build */}
        <div className="relative mt-auto pt-5">
          <div
            className={cn(
              "flex flex-wrap items-center gap-x-1.5 gap-y-1 border-t border-white/[0.07] pt-4 text-[0.62rem] transition-opacity duration-500",
              hovered ? "opacity-100" : "opacity-45",
            )}
          >
            {category.chain.map((step, stepIndex) => (
              <span key={step} className="flex items-center gap-1.5">
                <span className="text-mist-400">{step}</span>
                {stepIndex < category.chain.length - 1 ? (
                  <span aria-hidden="true" style={{ color: category.accent }}>
                    &rarr;
                  </span>
                ) : null}
              </span>
            ))}
          </div>
        </div>
      </motion.article>
    </motion.li>
  );
}

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="section-y relative">
      <div className="shell">
        <SectionHeading
          id="skills-heading"
          index="02"
          eyebrow="My skills"
          title="My technology"
          accentWord="universe"
          description="Six domains that connect into working systems. Every technology listed here is one I have shipped with — hover a card to see how the pieces chain together."
        />

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, index) => (
            <SkillCard key={category.id} category={category} index={index} />
          ))}
        </ul>
      </div>
    </section>
  );
}
