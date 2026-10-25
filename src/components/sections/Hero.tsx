"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";

import { EASE_OUT_EXPO } from "@/lib/motion";
import { siteConfig } from "@/data/site";
import { useHasFinePointer } from "@/hooks/useMediaQuery";
import { Button } from "@/components/ui/Button";
import { CvButton } from "@/components/ui/CvButton";
import { OrbitalCore } from "@/components/visuals/OrbitalCore";
import { ArrowDownIcon, ArrowRightIcon, MailIcon } from "@/components/ui/Icons";

const ROLES = [
  "Full Stack Developer",
  "Computer Engineering Student",
  "AI & Data Science Journey",
] as const;

const MAIN_STACK = ["Python", "TypeScript", "Angular", "React", "FastAPI", "Laravel", "PostgreSQL", "Docker"] as const;

const DIRECTION = ["Machine Learning", "RAG & LLM", "Data Analysis", "Computer Vision"] as const;

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const finePointer = useHasFinePointer();
  const parallax = finePointer && !prefersReducedMotion;

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 80, damping: 20, mass: 0.6 });
  const py = useSpring(my, { stiffness: 80, damping: 20, mass: 0.6 });

  const copyX = useTransform(px, [-1, 1], [-8, 8]);
  const copyY = useTransform(py, [-1, 1], [-5, 5]);
  const artX = useTransform(px, [-1, 1], [22, -22]);
  const artY = useTransform(py, [-1, 1], [14, -14]);
  const panelX = useTransform(px, [-1, 1], [-16, 16]);
  const panelY = useTransform(py, [-1, 1], [-10, 10]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const veilOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const veilY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);

  useEffect(() => {
    if (!parallax) return;
    const onMove = (event: PointerEvent) => {
      mx.set((event.clientX / window.innerWidth) * 2 - 1);
      my.set((event.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [parallax, mx, my]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-labelledby="hero-heading"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pb-14 pt-28 lg:min-h-screen lg:pt-24"
    >
      {/* ── The reference artwork, bleeding in from the right ───────────── */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-full lg:w-[62%]"
        style={parallax ? { x: artX, y: artY } : undefined}
      >
        {/* The plate is MASKED rather than veiled with overlays: an overlay
            still has a rectangle behind it, which is what produced the visible
            seam. Masking removes the pixels themselves, so the portrait simply
            stops existing where it meets the copy — no edge to see. */}
        <div className="hero-portrait relative h-full w-full">
          <Image
            src="/reference/hero-bg.jpg"
            alt=""
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 62vw"
            className="object-cover object-[62%_center]"
          />
        </div>

        {/* A single soft ground-tinted breath under the plate, keeping the
            bottom edge seated in the world without drawing a boundary. */}
        <div
          className="absolute inset-x-0 bottom-0 h-1/3"
          style={{
            background:
              "linear-gradient(0deg, var(--color-void-950) 0%, color-mix(in srgb, var(--color-void-950) 40%, transparent) 45%, transparent 100%)",
          }}
        />
      </motion.div>

      <motion.div
        className="shell relative w-full"
        style={prefersReducedMotion ? undefined : { opacity: veilOpacity, y: veilY }}
      >
        <div className="grid grid-cols-1 items-center gap-y-12 lg:grid-cols-12 lg:gap-x-8">
          {/* ── Statement ─────────────────────────────────────────────── */}
          <motion.div className="lg:col-span-7 xl:col-span-6" style={parallax ? { x: copyX, y: copyY } : undefined}>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.45 }}
              className="flex items-center gap-4"
            >
              <span className="eyebrow text-rose-400">Islam El Himes</span>
              <span aria-hidden="true" className="h-px w-14 bg-gradient-to-r from-rose-400/70 to-transparent" />
            </motion.div>

            <h1 id="hero-heading" className="mt-6">
              <span className="sr-only">
                {siteConfig.name} — Full Stack Developer, Computer Engineering student, on an AI and Data Science journey.
              </span>
              <span
                aria-hidden="true"
                className="block font-display text-[clamp(2.6rem,6.6vw,5.2rem)] font-extralight leading-[1.02] tracking-[-0.035em] text-mist-50"
              >
                {["I build", "intelligent"].map((line, lineIndex) => (
                  <span key={line} className="block overflow-hidden">
                    <motion.span
                      className="block"
                      initial={{ y: "108%" }}
                      animate={{ y: "0%" }}
                      transition={{ duration: 1, ease: EASE_OUT_EXPO, delay: 0.5 + lineIndex * 0.09 }}
                    >
                      {line}
                    </motion.span>
                  </span>
                ))}
                <span className="block overflow-hidden">
                  <motion.span
                    className="script block text-[clamp(3rem,7.6vw,6rem)]"
                    initial={{ y: "104%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    transition={{ duration: 1.1, ease: EASE_OUT_EXPO, delay: 0.72 }}
                  >
                    experiences
                  </motion.span>
                </span>
              </span>
            </h1>

            {/* Roles */}
            <motion.ul
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 1 }}
              className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2"
            >
              {ROLES.map((role, index) => (
                <li key={role} className="flex items-center gap-3">
                  {index > 0 ? (
                    <span aria-hidden="true" className="h-1 w-1 rounded-full bg-violet-400/60" />
                  ) : null}
                  <span className="text-[0.8rem] uppercase tracking-[0.14em] text-mist-300">{role}</span>
                </li>
              ))}
            </motion.ul>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 1.12 }}
              className="mt-5 max-w-lg text-[0.98rem] font-light leading-relaxed text-mist-300"
            >
              A diploma in Full Stack Web Development, an engineering degree in progress at EMSI
              Tanger, and a specialization taking shape in AI &amp; Data Science — where technology
              meets creativity.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 1.24 }}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Button href="#work" size="lg" icon={<ArrowRightIcon className="h-4 w-4" />}>
                View my projects
              </Button>
              {siteConfig.cv ? (
                <CvButton size="lg" />
              ) : (
                <Button href="#contact" variant="outline" size="lg" icon={<MailIcon className="h-4 w-4" />}>
                  Let&rsquo;s work together
                </Button>
              )}
            </motion.div>

            {/* Main stack */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 1.38 }}
              className="mt-12"
            >
              <p className="eyebrow text-[0.6rem]">Main stack</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {MAIN_STACK.map((tech, index) => (
                  <motion.li
                    key={tech}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: EASE_OUT_EXPO, delay: 1.45 + index * 0.05 }}
                    className="group flex items-center gap-2 rounded-full border border-white/[0.09] bg-white/[0.03] px-3 py-1.5 backdrop-blur-sm transition-colors duration-300 hover:border-rose-400/40"
                  >
                    <span
                      aria-hidden="true"
                      className="h-1 w-1 rounded-full bg-violet-400/70 transition-colors duration-300 group-hover:bg-rose-400"
                    />
                    <span className="text-[0.72rem] tracking-wide text-mist-300 transition-colors duration-300 group-hover:text-mist-100">
                      {tech}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* ── Orbital core ──────────────────────────────────────────── */}
          <motion.div
            className="relative lg:col-span-5 lg:col-start-8"
            style={parallax ? { x: panelX, y: panelY } : undefined}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: EASE_OUT_EXPO, delay: 0.3 }}
          >
            <OrbitalCore />

            {/* Direction summary, folded under the core */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 1.5 }}
              className="mt-2 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-2"
            >
              <span className="eyebrow text-[0.58rem]">Specializing in</span>
              {DIRECTION.map((item, index) => (
                <span key={item} className="flex items-center gap-2.5">
                  {index > 0 ? (
                    <span aria-hidden="true" className="h-0.5 w-0.5 rounded-full bg-mist-600" />
                  ) : null}
                  <span className="text-[0.72rem] font-light text-mist-300">{item}</span>
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* ── Code fragment, as in the reference ─────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE_OUT_EXPO, delay: 1.7 }}
          className="mt-10 hidden lg:block"
        >
          <div className="glass-node mx-auto max-w-3xl rounded-2xl px-7 py-5">
            <pre className="overflow-x-auto text-[0.72rem] leading-[1.85] no-scrollbar">
              <code>
                <span className="text-mist-500">const</span>{" "}
                <span className="text-rose-300">future</span>{" "}
                <span className="text-mist-500">= {"{"}</span>
                {"\n"}
                {"  "}
                <span className="text-violet-300">learn</span>
                <span className="text-mist-500">:</span> <span className="text-mist-200">true</span>
                <span className="text-mist-500">,</span>
                {"   "}
                <span className="text-mist-500">function</span>{" "}
                <span className="text-rose-300">createImpact</span>
                <span className="text-mist-500">() {"{"}</span>
                {"\n"}
                {"  "}
                <span className="text-violet-300">build</span>
                <span className="text-mist-500">:</span> <span className="text-mist-200">true</span>
                <span className="text-mist-500">,</span>
                {"   "}
                {"  "}
                <span className="text-mist-500">return</span>{" "}
                <span className="text-mist-200">innovation</span>
                <span className="text-mist-500">;</span>
                {"\n"}
                {"  "}
                <span className="text-violet-300">inspire</span>
                <span className="text-mist-500">:</span> <span className="text-mist-200">true</span>
                {"   "}
                <span className="text-mist-500">{"}"}</span>
                {"\n"}
                <span className="text-mist-500">{"};"}</span>
              </code>
            </pre>
          </div>
        </motion.div>
      </motion.div>

      {/* ── Scroll cue ───────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.9 }}
        className="shell pointer-events-none absolute inset-x-0 bottom-5 hidden items-end justify-between sm:flex"
      >
        <a
          href="#about"
          className="group pointer-events-auto flex items-center gap-3 text-mist-500 transition-colors duration-300 hover:text-mist-200"
          aria-label="Scroll to the about section"
        >
          <span className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/12 transition-colors duration-300 group-hover:border-rose-400/45">
            <motion.span
              animate={prefersReducedMotion ? undefined : { y: [0, 3, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowDownIcon className="h-3.5 w-3.5" />
            </motion.span>
          </span>
          <span className="eyebrow text-[0.6rem]">Scroll</span>
        </a>
        <span className="eyebrow hidden text-[0.6rem] text-mist-600 lg:block">{siteConfig.location}</span>
      </motion.div>
    </section>
  );
}
