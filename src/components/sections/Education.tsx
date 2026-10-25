"use client";

import { motion } from "motion/react";

import { EASE_OUT_EXPO, viewportOnce } from "@/lib/motion";
import { education } from "@/data/experience";

export function Education() {
  return (
    <div>
      <div className="flex items-center gap-4">
        <h3 className="eyebrow text-[0.625rem]">Education</h3>
        <span aria-hidden="true" className="h-px flex-1 bg-white/[0.07]" />
      </div>

      <ul className="mt-7 grid gap-4 sm:grid-cols-2">
        {education.map((entry, index) => (
          <motion.li
            key={entry.id}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.65, ease: EASE_OUT_EXPO, delay: index * 0.08 }}
            className="group panel relative rounded-xl p-6 transition-colors duration-500 hover:border-white/16"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h4 className="font-display text-[1.5rem] leading-none tracking-tight text-mist-50">
                  {entry.institution}
                </h4>
                <p className="mt-2 text-[0.78rem] leading-snug text-mist-600">{entry.fullName}</p>
              </div>
              <span className="eyebrow shrink-0 text-[0.625rem] text-mist-500">{entry.period}</span>
            </div>

            <p className="mt-5 text-[0.9rem] font-medium tracking-tight text-mist-200">{entry.program}</p>
            <p className="mt-2 text-[0.85rem] leading-relaxed text-mist-500">{entry.description}</p>

            {entry.current ? (
              <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-rose-400/30 bg-rose-400/[0.07] px-2.5 py-1 text-[0.62rem] uppercase tracking-[0.16em] text-rose-300">
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-rose-400" />
                In progress
              </span>
            ) : (
              <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 px-2.5 py-1 text-[0.62rem] uppercase tracking-[0.16em] text-mist-500">
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-mist-600" />
                Completed
              </span>
            )}
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
