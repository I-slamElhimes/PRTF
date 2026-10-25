"use client";

import { motion } from "motion/react";

import { cn } from "@/lib/utils";
import { useTheme } from "@/components/layout/ThemeProvider";
import { MoonIcon, SunIcon } from "@/components/ui/Icons";

/**
 * Sliding sun/moon switch, matching the reference's top-right control.
 *
 * A real checkbox-style button: `role="switch"` + `aria-checked` so assistive
 * technology reports the state, rather than a div that only looks like a toggle.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggle, ready } = useTheme();
  const isLight = theme === "light";

  return (
    <button
      type="button"
      onClick={toggle}
      role="switch"
      aria-checked={isLight}
      aria-label={`Switch to ${isLight ? "dark" : "light"} theme`}
      className={cn(
        "group relative flex h-10 items-center gap-1 rounded-full border border-white/12 bg-void-900/70 px-1.5 backdrop-blur-xl transition-colors duration-500 hover:border-rose-400/45",
        className,
      )}
      style={{ opacity: ready ? 1 : 0 }}
    >
      <span
        aria-hidden="true"
        className="relative z-10 flex h-7 w-7 items-center justify-center rounded-full text-mist-400 transition-colors duration-500"
      >
        <SunIcon className={cn("h-3.5 w-3.5 transition-colors duration-500", isLight && "text-white")} />
      </span>

      {/* Travelling pill */}
      <motion.span
        aria-hidden="true"
        layout
        className="grad-accent absolute top-1.5 h-7 w-7 rounded-full shadow-[0_0_18px_-2px_var(--color-rose-500)]"
        animate={{ left: isLight ? 6 : 34 }}
        transition={{ type: "spring", stiffness: 420, damping: 32 }}
      />

      <span
        aria-hidden="true"
        className="relative z-10 flex h-7 w-7 items-center justify-center rounded-full text-mist-400 transition-colors duration-500"
      >
        <MoonIcon className={cn("h-3.5 w-3.5 transition-colors duration-500", !isLight && "text-white")} />
      </span>
    </button>
  );
}
