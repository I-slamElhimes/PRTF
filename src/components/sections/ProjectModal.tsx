"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import { cn } from "@/lib/utils";
import { EASE_OUT_EXPO } from "@/lib/motion";
import type { Project, ProjectShot } from "@/types";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { ProjectVisual, VisualLabel, allShots } from "@/components/visuals/ProjectVisual";
import { JuribotFlow } from "@/components/visuals/JuribotFlow";
import {
  ArrowUpRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
  ExpandIcon,
  GithubIcon,
  SparkleIcon,
} from "@/components/ui/Icons";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const FOCUSABLE = 'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])';

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const open = project !== null;

  useLockBodyScroll(open);

  const shots = project ? allShots(project) : [];

  useEffect(() => {
    if (open) {
      restoreRef.current = document.activeElement as HTMLElement | null;
      const timer = window.setTimeout(() => closeRef.current?.focus(), 60);
      return () => window.clearTimeout(timer);
    }
    setLightbox(null);
    restoreRef.current?.focus?.();
    return undefined;
  }, [open]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!open) return;

      // The lightbox owns the keyboard while it is up.
      if (lightbox !== null) {
        if (event.key === "Escape") {
          event.preventDefault();
          setLightbox(null);
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          setLightbox((index) => ((index ?? 0) + 1) % shots.length);
        } else if (event.key === "ArrowLeft") {
          event.preventDefault();
          setLightbox((index) => ((index ?? 0) - 1 + shots.length) % shots.length);
        }
        return;
      }

      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (element) => element.offsetParent !== null,
      );
      if (focusable.length === 0) return;

      const first = focusable[0]!;
      const last = focusable[focusable.length - 1]!;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    },
    [open, onClose, lightbox, shots.length],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const activeShot: ProjectShot | undefined = lightbox !== null ? shots[lightbox] : undefined;

  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          className="fixed inset-0 z-[75] flex items-start justify-center overflow-y-auto overscroll-contain p-3 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.32 }}
        >
          <button
            type="button"
            aria-label="Close project details"
            onClick={onClose}
            tabIndex={-1}
            className="fixed inset-0 cursor-default bg-void-950/90 backdrop-blur-lg"
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            initial={{ opacity: 0, y: 30, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.99 }}
            transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
            className="relative my-4 w-full max-w-5xl overflow-hidden rounded-[1.75rem] border border-white/10 bg-void-900 shadow-[0_50px_140px_-40px_rgba(0,0,0,0.95)]"
          >
            {/* World tint */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-72 opacity-60"
              style={{
                background: `radial-gradient(60% 100% at 30% 0%, ${project.accent[0]}22, transparent 70%), radial-gradient(50% 100% at 85% 0%, ${project.accent[1]}22, transparent 70%)`,
              }}
            />

            {/* Header */}
            <div className="sticky top-0 z-20 flex items-start justify-between gap-4 border-b border-white/[0.07] bg-void-900/92 px-5 py-4 backdrop-blur-xl sm:px-8 sm:py-5">
              <div className="min-w-0">
                <p
                  className="flex items-center gap-2 text-[0.6rem] uppercase tracking-[0.2em]"
                  style={{ color: project.accent[0] }}
                >
                  <SparkleIcon className="h-2.5 w-2.5" />
                  {project.index} — {project.category}
                </p>
                <h2
                  id="project-modal-title"
                  className="mt-2 font-display text-[clamp(1.5rem,3.6vw,2.3rem)] font-extralight leading-tight tracking-tight text-mist-50"
                >
                  {project.title}
                </h2>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close project details"
                className="shrink-0 rounded-full border border-white/12 p-2.5 text-mist-300 transition-colors duration-300 hover:border-rose-400/50 hover:text-white"
              >
                <CloseIcon className="h-4 w-4" />
              </button>
            </div>

            <div className="relative px-5 pb-10 pt-6 sm:px-8">
              {/* Lead visual */}
              <button
                type="button"
                onClick={() => setLightbox(0)}
                aria-label={`View ${project.cover.caption} full size`}
                className="group relative block w-full overflow-hidden rounded-[1.3rem] border border-white/[0.08] p-2 transition-colors duration-500 hover:border-white/18"
              >
                <div className="overflow-hidden rounded-[0.95rem]">
                  <div className="aspect-[16/10]">
                    <ProjectVisual
                      shot={project.cover}
                      accent={project.accent}
                      sizes="(max-width: 1024px) 100vw, 64rem"
                    />
                  </div>
                </div>
                <VisualLabel shot={project.cover} className="absolute left-4 top-4" />
                <span className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/14 bg-void-950/80 text-mist-200 opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100">
                  <ExpandIcon className="h-3.5 w-3.5" />
                </span>
              </button>

              <p className="mt-7 max-w-3xl font-display text-[clamp(1.1rem,2.2vw,1.45rem)] font-extralight leading-snug tracking-tight text-mist-200">
                {project.tagline}
              </p>

              {/* Problem / Solution */}
              <div className="mt-9 grid gap-7 md:grid-cols-2">
                <div>
                  <p className="eyebrow text-[0.6rem]">The problem</p>
                  <p className="mt-3 text-[0.92rem] font-light leading-relaxed text-mist-400">{project.problem}</p>
                </div>
                <div>
                  <p className="eyebrow text-[0.6rem]">The solution</p>
                  <p className="mt-3 text-[0.92rem] font-light leading-relaxed text-mist-400">{project.solution}</p>
                </div>
              </div>

              {project.featured ? (
                <div className="mt-11">
                  <JuribotFlow />
                </div>
              ) : null}

              {/* Features */}
              <div className="mt-11">
                <div className="flex items-center gap-4">
                  <span className="eyebrow text-[0.6rem]">Key features</span>
                  <span aria-hidden="true" className="h-px flex-1 bg-white/[0.07]" />
                </div>
                <ul className="mt-6 grid gap-x-9 gap-y-5 sm:grid-cols-2">
                  {project.features.map((feature) => (
                    <li key={feature.title} className="flex gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full"
                        style={{ background: project.accent[0] }}
                      />
                      <div>
                        <p className="text-[0.88rem] tracking-tight text-mist-100">{feature.title}</p>
                        <p className="mt-1 text-[0.83rem] font-light leading-relaxed text-mist-500">
                          {feature.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Architecture */}
              <div className="mt-11">
                <div className="flex items-center gap-4">
                  <span className="eyebrow text-[0.6rem]">Architecture</span>
                  <span aria-hidden="true" className="h-px flex-1 bg-white/[0.07]" />
                </div>
                <ul className="mt-6 border-t border-white/[0.07]">
                  {project.architecture.map((layer) => (
                    <li
                      key={layer.label}
                      className="flex flex-col gap-1 border-b border-white/[0.07] py-3 sm:flex-row sm:items-baseline sm:gap-6"
                    >
                      <span className="w-24 shrink-0 text-[0.66rem] uppercase tracking-[0.16em] text-mist-500">
                        {layer.label}
                      </span>
                      <span className="text-[0.86rem] font-light text-mist-300">{layer.detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Gallery */}
              {project.gallery.length > 0 ? (
                <div className="mt-11">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <span className="eyebrow text-[0.6rem]">Gallery</span>
                    <span aria-hidden="true" className="h-px flex-1 bg-white/[0.07]" />
                    <span className="text-[0.66rem] font-light text-mist-600">{project.provenance}</span>
                  </div>

                  <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                    {project.gallery.map((shot, index) => (
                      <li key={shot.src}>
                        <button
                          type="button"
                          onClick={() => setLightbox(index + 1)}
                          aria-label={`View ${shot.caption} full size`}
                          className="group block w-full overflow-hidden rounded-[1.1rem] border border-white/[0.08] p-1.5 text-left transition-colors duration-500 hover:border-white/18"
                        >
                          <div className="relative overflow-hidden rounded-[0.8rem]">
                            <div className="aspect-[16/10] transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] motion-reduce:transform-none">
                              <ProjectVisual
                                shot={shot}
                                accent={project.accent}
                                sizes="(max-width: 640px) 100vw, 32rem"
                              />
                            </div>
                            <span className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full border border-white/14 bg-void-950/80 text-mist-200 opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100">
                              <ExpandIcon className="h-3 w-3" />
                            </span>
                          </div>
                          <p className="flex items-center gap-2 px-1.5 pb-0.5 pt-2.5 text-[0.74rem] font-light text-mist-500">
                            {shot.caption}
                            {shot.source === "report" ? (
                              <span className="text-[0.62rem] text-mist-600">· p.{shot.reportPage}</span>
                            ) : null}
                          </p>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {/* Stack */}
              <div className="mt-11">
                <div className="flex items-center gap-4">
                  <span className="eyebrow text-[0.6rem]">Technologies</span>
                  <span aria-hidden="true" className="h-px flex-1 bg-white/[0.07]" />
                </div>
                <ul className="mt-6 flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-full border border-white/[0.09] bg-white/[0.02] px-3 py-1.5 text-[0.7rem] text-mist-300"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Links — rendered only when a real URL exists */}
              {project.links.github || project.links.demo ? (
                <div className="mt-11 flex flex-wrap gap-3">
                  {project.links.github ? (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-11 items-center gap-2 rounded-full border border-white/14 px-5 text-sm text-mist-100 transition-colors duration-300 hover:border-rose-400/50 hover:text-white"
                    >
                      <GithubIcon className="h-4 w-4" />
                      View source
                    </a>
                  ) : null}
                  {project.links.demo ? (
                    <a
                      href={project.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="grad-accent inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm text-white"
                    >
                      Live demo
                      <ArrowUpRightIcon className="h-4 w-4" />
                    </a>
                  ) : null}
                </div>
              ) : null}
            </div>
          </motion.div>

          {/* Lightbox */}
          <AnimatePresence>
            {activeShot ? (
              <motion.div
                className="fixed inset-0 z-[85] flex flex-col items-center justify-center bg-void-950/97 p-4 backdrop-blur-xl sm:p-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                role="dialog"
                aria-modal="true"
                aria-label={activeShot.caption}
              >
                <button
                  type="button"
                  onClick={() => setLightbox(null)}
                  aria-label="Close full-size view"
                  className="absolute right-4 top-4 z-10 rounded-full border border-white/14 bg-void-900/80 p-3 text-mist-200 transition-colors duration-300 hover:border-rose-400/50 hover:text-white sm:right-8 sm:top-8"
                >
                  <CloseIcon className="h-4 w-4" />
                </button>

                <motion.div
                  key={activeShot.src}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
                  className="relative max-h-[76vh] w-full max-w-6xl overflow-hidden rounded-[1.2rem] border border-white/10"
                >
                  <div className="aspect-[16/10] max-h-[76vh]">
                    <ProjectVisual shot={activeShot} accent={project.accent} sizes="90vw" />
                  </div>
                </motion.div>

                <div className="mt-5 flex w-full max-w-6xl items-center justify-between gap-4">
                  <p className="text-[0.8rem] font-light text-mist-400">
                    {activeShot.caption}
                    <span className="ml-2 text-[0.7rem] text-mist-600">
                      {activeShot.source === "report"
                        ? `Report figure · page ${activeShot.reportPage}`
                        : "Application screenshot"}
                    </span>
                  </p>

                  {shots.length > 1 ? (
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setLightbox((index) => ((index ?? 0) - 1 + shots.length) % shots.length)}
                        aria-label="Previous image"
                        className="rounded-full border border-white/14 p-2.5 text-mist-300 transition-colors duration-300 hover:border-rose-400/50 hover:text-white"
                      >
                        <ChevronLeftIcon className="h-4 w-4" />
                      </button>
                      <span className="text-[0.7rem] tabular-nums text-mist-500">
                        {(lightbox ?? 0) + 1} / {shots.length}
                      </span>
                      <button
                        type="button"
                        onClick={() => setLightbox((index) => ((index ?? 0) + 1) % shots.length)}
                        aria-label="Next image"
                        className={cn(
                          "rounded-full border border-white/14 p-2.5 text-mist-300 transition-colors duration-300",
                          "hover:border-rose-400/50 hover:text-white",
                        )}
                      >
                        <ChevronRightIcon className="h-4 w-4" />
                      </button>
                    </div>
                  ) : null}
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
