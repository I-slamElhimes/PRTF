"use client";

import { motion } from "motion/react";

import { cn } from "@/lib/utils";
import { EASE_OUT_EXPO, viewportOnce } from "@/lib/motion";
import { experiences } from "@/data/experience";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-heading" className="section-y relative">
      <div className="shell">
        <SectionHeading
          id="experience-heading"
          index="05"
          eyebrow="Experience"
          title="Where the work was"
          accentWord="real"
        />

        <ol className="mt-16">
          {experiences.map((entry, index) => (
            <motion.li
              key={entry.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.75, ease: EASE_OUT_EXPO, delay: index * 0.08 }}
              className="group relative border-t border-white/[0.08] py-9 last:border-b lg:py-11"
            >
              {/* Hover wash — reinforces the row without a card border. */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 inset-y-px -z-10 bg-gradient-to-r from-white/[0.025] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />

              <div className="grid gap-6 lg:grid-cols-12 lg:gap-x-12">
                {/* Period */}
                <div className="lg:col-span-3">
                  <div className="flex items-center gap-2.5">
                    {entry.current ? (
                      <span className="relative flex h-1.5 w-1.5 shrink-0">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-rose-400 [animation:pulse-ring_2.4s_ease-out_infinite]" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-rose-400" />
                      </span>
                    ) : (
                      <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-mist-600" />
                    )}
                    <span
                      className={cn(
                        "eyebrow text-[0.66rem]",
                        entry.current ? "text-rose-300" : "text-mist-500",
                      )}
                    >
                      {entry.period}
                    </span>
                  </div>
                  <p className="mt-2 pl-4 text-[0.78rem] text-mist-600">{entry.context}</p>
                </div>

                {/* Role */}
                <div className="lg:col-span-9">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="font-display text-[clamp(1.4rem,3.2vw,2.1rem)] leading-tight tracking-tight text-mist-50">
                      {entry.company}
                    </h3>
                    <span aria-hidden="true" className="hidden h-4 w-px bg-white/12 sm:block" />
                    <p className="text-[0.9rem] text-mist-300">{entry.role}</p>
                  </div>

                  <p className="mt-4 max-w-2xl text-[0.925rem] leading-relaxed text-mist-400">
                    {entry.description}
                  </p>

                  <ul className="mt-5 space-y-2">
                    {entry.highlights.map((highlight) => (
                      <li key={highlight} className="flex gap-3 text-[0.875rem] leading-relaxed text-mist-400">
                        <span
                          aria-hidden="true"
                          className="mt-[0.5rem] h-1 w-1 shrink-0 rounded-full bg-mist-600 transition-colors duration-500 group-hover:bg-rose-400/70"
                        />
                        {highlight}
                      </li>
                    ))}
                  </ul>

                  <ul className="mt-6 flex flex-wrap gap-1.5">
                    {entry.stack.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-full border border-white/[0.09] bg-white/[0.02] px-2.5 py-1 text-[0.66rem] text-mist-400 transition-colors duration-500 group-hover:border-white/16 group-hover:text-mist-300"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
