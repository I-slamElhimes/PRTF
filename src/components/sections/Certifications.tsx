"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import { cn } from "@/lib/utils";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { certificationGroups, certifications } from "@/data/certifications";
import type { CertificationGroup } from "@/types";

type Filter = CertificationGroup | "All";

const FILTERS: Filter[] = ["All", ...certificationGroups];

export function Certifications() {
  const [filter, setFilter] = useState<Filter>("All");

  const visible = useMemo(
    () => (filter === "All" ? certifications : certifications.filter((item) => item.group === filter)),
    [filter],
  );

  return (
    <div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
        <h3 className="eyebrow text-[0.625rem]">Certifications</h3>
        <span aria-hidden="true" className="hidden h-px flex-1 bg-white/[0.07] sm:block" />

        {/* Filters */}
        <div role="group" aria-label="Filter certifications" className="flex flex-wrap gap-1.5">
          {FILTERS.map((item) => {
            const isActive = filter === item;
            return (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                aria-pressed={isActive}
                className={cn(
                  "relative rounded-full px-3 py-1.5 text-[0.66rem] uppercase tracking-[0.12em] transition-colors duration-300",
                  isActive ? "text-void-950" : "text-mist-500 hover:text-mist-200",
                )}
              >
                {isActive ? (
                  <motion.span
                    layoutId="cert-filter"
                    className="absolute inset-0 rounded-full bg-mist-100"
                    transition={{ type: "spring", stiffness: 400, damping: 34 }}
                  />
                ) : null}
                <span className="relative">{item}</span>
              </button>
            );
          })}
        </div>
      </div>

      <ul className="mt-7 border-t border-white/[0.08]">
        <AnimatePresence initial={false} mode="popLayout">
          {visible.map((certification, index) => (
            <motion.li
              key={certification.id}
              layout
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: EASE_OUT_EXPO, delay: index * 0.035 }}
              className="group relative border-b border-white/[0.08]"
            >
              <div className="flex flex-col gap-1.5 py-4 sm:flex-row sm:items-center sm:gap-6">
                <span className="eyebrow w-8 shrink-0 text-[0.62rem] text-mist-600">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <p className="flex-1 text-[0.95rem] font-medium tracking-tight text-mist-100 transition-colors duration-300 group-hover:text-white">
                  {certification.title}
                </p>

                <p className="text-[0.82rem] text-mist-500 sm:w-72 sm:shrink-0">
                  {certification.issuer}
                </p>

                <span className="eyebrow shrink-0 text-[0.62rem] text-mist-500 sm:w-12 sm:text-right">
                  {certification.year}
                </span>
              </div>

              {/* Underline sweep on hover */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-[-1px] left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-rose-400/70 via-violet-400/50 to-transparent transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
              />
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}
