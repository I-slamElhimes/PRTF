"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";
import { EASE_OUT_EXPO, viewportOnce } from "@/lib/motion";
import { Reveal } from "@/components/ui/Reveal";
import { SparkleIcon } from "@/components/ui/Icons";

interface SectionHeadingProps {
  index: string;
  eyebrow: string;
  /** The title set in the light display face. */
  title: string;
  /**
   * A single trailing word (or short phrase) rendered in the script face, in
   * the accent gradient — the recurring signature from the reference. Exactly
   * one accent per heading; more than that and it stops being special.
   */
  accentWord?: string;
  description?: string;
  aside?: ReactNode;
  align?: "left" | "center";
  className?: string;
  id?: string;
}

/**
 * The recurring section header for every area of the world: an index, a rule
 * that draws itself in, and a two-face title where the last phrase is written
 * by hand. Repeating this exact structure is what keeps the sections feeling
 * like one continuous place.
 */
export function SectionHeading({
  index,
  eyebrow,
  title,
  accentWord,
  description,
  aside,
  align = "left",
  className,
  id,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div className={cn("relative", className)}>
      <Reveal className={cn("flex items-center gap-4", centered && "justify-center")} y={12}>
        <span className="flex items-center gap-2 text-[0.62rem] tracking-[0.24em] text-rose-400">
          <SparkleIcon className="h-2.5 w-2.5" />
          {index}
        </span>
        <motion.span
          aria-hidden="true"
          className="h-px origin-left bg-gradient-to-r from-white/20 to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 1.1, ease: EASE_OUT_EXPO, delay: 0.1 }}
          style={{ width: centered ? "4rem" : "5.5rem" }}
        />
        <span className="eyebrow">{eyebrow}</span>
      </Reveal>

      <div
        className={cn(
          "mt-7 flex flex-col gap-6 md:flex-row md:items-end md:justify-between",
          centered && "items-center md:flex-col md:items-center",
        )}
      >
        <h2
          id={id}
          className={cn(
            "max-w-3xl font-display text-[clamp(2.1rem,5.2vw,3.8rem)] font-extralight leading-[1.06] tracking-[-0.03em] text-mist-50",
            centered && "text-center",
          )}
        >
          <span className="sr-only">{accentWord ? `${title} ${accentWord}` : title}</span>

          <span aria-hidden="true" className="block overflow-hidden pb-[0.08em]">
            <motion.span
              className="block"
              initial={{ y: "108%" }}
              whileInView={{ y: "0%" }}
              viewport={viewportOnce}
              transition={{ duration: 0.95, ease: EASE_OUT_EXPO }}
            >
              {title}
            </motion.span>
          </span>

          {accentWord ? (
            <span aria-hidden="true" className="block overflow-hidden pb-[0.1em]">
              <motion.span
                className="script block text-[clamp(2.4rem,5.8vw,4.4rem)] leading-[1.12]"
                initial={{ y: "104%", opacity: 0 }}
                whileInView={{ y: "0%", opacity: 1 }}
                viewport={viewportOnce}
                transition={{ duration: 1.05, ease: EASE_OUT_EXPO, delay: 0.12 }}
              >
                {accentWord}
              </motion.span>
            </span>
          ) : null}
        </h2>

        {aside ? <div className="shrink-0">{aside}</div> : null}
      </div>

      {description ? (
        <Reveal delay={0.16}>
          <p
            className={cn(
              "mt-7 max-w-2xl text-[0.96rem] font-light leading-relaxed text-mist-400",
              centered && "mx-auto text-center",
            )}
          >
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
