"use client";

import { motion } from "motion/react";

import { cn } from "@/lib/utils";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { railItems, sectionIds } from "@/data/site";
import { useActiveSection } from "@/hooks/useActiveSection";
import {
  AwardIcon,
  BriefcaseIcon,
  ButterflyIcon,
  FolderIcon,
  HomeIcon,
  LayersIcon,
  MailIcon,
  UserIcon,
} from "@/components/ui/Icons";

const ICONS = {
  home: HomeIcon,
  user: UserIcon,
  layers: LayersIcon,
  folder: FolderIcon,
  briefcase: BriefcaseIcon,
  award: AwardIcon,
  mail: MailIcon,
} as const;

/**
 * The fixed instrument rail from the reference composition.
 *
 * Icon-only navigation plus a live section counter. Shown only from `xl` up,
 * where there is genuinely spare horizontal room — below that the top bar and
 * the mobile menu carry navigation instead.
 */
export function SideRail() {
  const active = useActiveSection(sectionIds);
  const index = Math.max(
    0,
    railItems.findIndex((item) => item.id === active),
  );
  const current = railItems[index] ?? railItems[0]!;

  return (
    <motion.aside
      initial={{ opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.4 }}
      className="fixed left-6 top-1/2 z-50 hidden -translate-y-1/2 xl:block"
      aria-label="Section navigation"
    >
      <div className="panel flex flex-col items-center gap-5 rounded-full px-2.5 py-6">
        {/* Live section counter */}
        <div className="flex flex-col items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-rose-400 [animation:pulse-ring_2.6s_ease-out_infinite]" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-400" />
          </span>
          <span className="font-display text-[0.6rem] tracking-[0.14em] text-mist-300">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span
            className="text-[0.5rem] uppercase tracking-[0.18em] text-mist-500"
            style={{ writingMode: "vertical-rl" }}
          >
            {current.label}
          </span>
        </div>

        <span aria-hidden="true" className="h-8 w-px bg-white/12" />

        {/* Icon navigation */}
        <nav aria-label="Section rail">
          <ul className="flex flex-col items-center gap-1">
            {railItems.map((item) => {
              const Icon = ICONS[item.icon];
              const isActive = item.id === active;

              return (
                <li key={item.id}>
                  <a
                    href={item.href}
                    aria-label={item.label}
                    aria-current={isActive ? "true" : undefined}
                    className="group relative flex h-10 w-10 items-center justify-center rounded-full"
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="rail-active"
                        className="grad-accent absolute inset-0 rounded-full opacity-90"
                        transition={{ type: "spring", stiffness: 340, damping: 30 }}
                      />
                    ) : null}
                    <Icon
                      className={cn(
                        "relative h-[1.05rem] w-[1.05rem] transition-colors duration-300",
                        isActive ? "text-white" : "text-mist-500 group-hover:text-mist-200",
                      )}
                    />

                    {/* Tooltip */}
                    <span className="pointer-events-none absolute left-[calc(100%+0.85rem)] whitespace-nowrap rounded-full border border-white/10 bg-void-900/95 px-3 py-1.5 text-[0.7rem] tracking-wide text-mist-200 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 -translate-x-1">
                      {item.label}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <span aria-hidden="true" className="h-8 w-px bg-white/12" />

        <ButterflyIcon className="h-4 w-4 text-violet-400/70 [animation:float-soft_5s_ease-in-out_infinite]" />
      </div>
    </motion.aside>
  );
}
