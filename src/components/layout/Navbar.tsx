"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";

import { cn } from "@/lib/utils";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { navItems, sectionIds, siteConfig } from "@/data/site";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { ArrowUpRightIcon, ButterflyIcon, CloseIcon, MenuIcon, SparkleIcon } from "@/components/ui/Icons";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { UploadCvButton } from "@/components/ui/UploadCvButton";

/** Signature-style wordmark, matching the reference's handwritten logo. */
function Wordmark() {
  return (
    <a href="#hero" className="group relative flex flex-col leading-none" aria-label={`${siteConfig.name} — back to top`}>
      <span className="script text-[1.75rem] leading-[1.1] sm:text-[2rem]">Islam</span>
      <span className="mt-0.5 pl-1 text-[0.55rem] uppercase tracking-[0.42em] text-mist-400 transition-colors duration-300 group-hover:text-mist-200">
        El Himes
      </span>
      <SparkleIcon className="absolute -right-3 -top-1 h-2.5 w-2.5 text-rose-400 opacity-80 transition-transform duration-500 group-hover:scale-125" />
    </a>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const active = useActiveSection(sectionIds);

  useMotionValueEvent(scrollY, "change", (value) => setScrolled(value > 30));
  useLockBodyScroll(menuOpen);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[95] focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:rounded-full focus:bg-mist-50 focus:px-5 focus:py-2.5 focus:text-sm focus:text-void-950"
      >
        Skip to content
      </a>

      <motion.header
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.2 }}
        className="fixed inset-x-0 top-0 z-[60]"
      >
        <div
          className={cn(
            "absolute inset-0 transition-all duration-500",
            scrolled
              ? "border-b border-white/[0.07] bg-void-950/70 backdrop-blur-xl"
              : "border-b border-transparent",
          )}
        />

        <nav
          aria-label="Primary"
          className="relative mx-auto flex h-[5.5rem] w-full max-w-[90rem] items-center justify-between gap-6 px-5 md:px-10 xl:px-14"
        >
          <Wordmark />

          {/* Desktop links */}
          <ul className="hidden items-center gap-0.5 lg:flex">
            {navItems.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={item.href}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "group relative flex items-center gap-1.5 px-3.5 py-2 text-[0.68rem] uppercase tracking-[0.16em] transition-colors duration-300 xl:px-4",
                      isActive ? "text-mist-50" : "text-mist-400 hover:text-mist-100",
                    )}
                  >
                    {isActive ? (
                      <motion.span layoutId="nav-dot" transition={{ type: "spring", stiffness: 380, damping: 30 }}>
                        <SparkleIcon className="h-2 w-2 text-rose-400" />
                      </motion.span>
                    ) : null}
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <UploadCvButton className="hidden sm:block" />

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-void-900/70 text-mist-100 transition-colors duration-300 hover:border-rose-400/45 lg:hidden"
            >
              {menuOpen ? <CloseIcon className="h-4 w-4" /> : <MenuIcon className="h-4 w-4" />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu — its own composition, not a squeezed desktop nav. */}
      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
            className="fixed inset-0 z-[55] lg:hidden"
          >
            <div className="absolute inset-0 bg-void-950/96 backdrop-blur-2xl" />
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-0 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full opacity-70 blur-[80px]"
              style={{ background: "radial-gradient(circle, rgba(168,85,247,0.22), transparent 68%)" }}
            />

            <motion.nav
              aria-label="Mobile"
              className="relative flex h-full flex-col justify-center px-7 pb-14 pt-24"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05, delayChildren: 0.06 } } }}
            >
              <ul>
                {navItems.map((item, index) => (
                  <motion.li
                    key={item.id}
                    variants={{
                      hidden: { opacity: 0, y: 24 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_OUT_EXPO } },
                    }}
                  >
                    <a
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="group flex items-baseline gap-4 border-b border-white/[0.07] py-3.5"
                    >
                      <span className="w-7 text-[0.6rem] tracking-[0.2em] text-rose-400/80">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={cn(
                          "font-display text-[1.85rem] font-extralight tracking-tight transition-colors duration-300",
                          active === item.id ? "text-accent" : "text-mist-100",
                        )}
                      >
                        {item.label}
                      </span>
                      <ArrowUpRightIcon className="ml-auto h-5 w-5 self-center text-mist-600 transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 18 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_OUT_EXPO } },
                }}
                className="mt-9 flex items-end justify-between gap-4"
              >
                <div>
                  <p className="eyebrow">Direct</p>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="mt-2 block break-all text-[0.9rem] text-mist-200 underline decoration-white/20 underline-offset-4 transition-colors hover:text-rose-300"
                  >
                    {siteConfig.email}
                  </a>
                </div>
                <ButterflyIcon className="h-7 w-7 shrink-0 text-violet-400/60 [animation:float-soft_4s_ease-in-out_infinite]" />
              </motion.div>
            </motion.nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
