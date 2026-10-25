"use client";

import type { ElementType, ReactNode } from "react";
import { motion, type Variants } from "motion/react";

import { cn } from "@/lib/utils";
import { EASE_OUT_EXPO, viewportOnce } from "@/lib/motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Travel distance in pixels. */
  y?: number;
  as?: ElementType;
}

/**
 * Scroll-triggered entrance. Fires once so nothing re-animates on scroll-back —
 * repeated motion on already-read content is the fastest way to make a page
 * feel restless.
 */
export function Reveal({ children, className, delay = 0, y = 22, as = "div" }: RevealProps) {
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.75, ease: EASE_OUT_EXPO, delay }}
    >
      {children}
    </MotionTag>
  );
}

const wordVariants: Variants = {
  hidden: { y: "115%" },
  visible: { y: "0%", transition: { duration: 0.85, ease: EASE_OUT_EXPO } },
};

interface TextRevealProps {
  text: string;
  className?: string;
  /** Per-word delay increment. */
  stagger?: number;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  id?: string;
}

/**
 * Word-by-word mask reveal.
 *
 * The full string stays in the accessibility tree via `aria-label` while the
 * animated word spans are hidden from it — screen readers get one clean
 * sentence instead of a stream of fragments.
 */
export function TextReveal({
  text,
  className,
  stagger = 0.045,
  delay = 0,
  as: Tag = "h2",
  id,
}: TextRevealProps) {
  const words = text.split(" ");

  return (
    <Tag id={id} className={cn("inline-block", className)} aria-label={text}>
      <motion.span
        aria-hidden="true"
        className="inline"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        transition={{ staggerChildren: stagger, delayChildren: delay }}
      >
        {words.map((word, index) => (
          <span
            key={`${word}-${index}`}
            className="inline-flex overflow-hidden pb-[0.12em] align-bottom"
          >
            <motion.span variants={wordVariants} className="inline-block">
              {word}
            </motion.span>
            {index < words.length - 1 ? <span className="inline-block">&nbsp;</span> : null}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
