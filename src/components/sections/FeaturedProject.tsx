"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

import { EASE_OUT_EXPO, viewportOnce } from "@/lib/motion";
import type { Project } from "@/types";
import { ProjectVisual, VisualLabel } from "@/components/visuals/ProjectVisual";
import { JuribotFlow } from "@/components/visuals/JuribotFlow";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ArrowRightIcon, GithubIcon, SparkleIcon } from "@/components/ui/Icons";

interface FeaturedProjectProps {
  project: Project;
  onOpen: (project: Project) => void;
}

/**
 * The flagship world.
 *
 * Not a card — it spans the full measure, leads with the real product visual,
 * and carries the animated data path so the project reads as a living system.
 */
export function FeaturedProject({ project, onOpen }: FeaturedProjectProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const visualY = useTransform(scrollYProgress, [0, 1], ["3.5%", "-3.5%"]);

  const [first, second] = project.gallery;

  return (
    <div ref={ref} className="relative">
      {/* Header */}
      <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <Reveal className="flex flex-wrap items-center gap-3" y={10}>
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.6rem] uppercase tracking-[0.2em]"
              style={{
                color: project.accent[0],
                background: `${project.accent[0]}14`,
                border: `1px solid ${project.accent[0]}3d`,
              }}
            >
              <SparkleIcon className="h-2.5 w-2.5" />
              Featured world
            </span>
            <span className="text-[0.62rem] uppercase tracking-[0.18em] text-mist-500">{project.category}</span>
            <span className="text-[0.62rem] tracking-[0.18em] text-mist-600">{project.year}</span>
          </Reveal>

          <Reveal delay={0.05}>
            <h3 className="mt-5 font-display text-[clamp(2.4rem,6vw,4.4rem)] font-extralight leading-[1.02] tracking-[-0.035em] text-mist-50">
              JuriBot <span className="script text-[clamp(2.6rem,6.4vw,4.8rem)]">Sentinel</span>
            </h3>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-5 max-w-xl text-[1rem] font-light leading-relaxed text-mist-300">{project.summary}</p>
          </Reveal>
        </div>

        <Reveal delay={0.18} className="shrink-0">
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => onOpen(project)} icon={<ArrowRightIcon className="h-4 w-4" />}>
              Open case study
            </Button>
            {project.links.github ? (
              <Button href={project.links.github} variant="outline" icon={<GithubIcon className="h-4 w-4" />}>
                Source
              </Button>
            ) : null}
          </div>
        </Reveal>
      </div>

      {/* Lead visual */}
      <motion.div
        initial={{ opacity: 0, y: 44 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.95, ease: EASE_OUT_EXPO }}
        className="group relative mt-11"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-x-8 -bottom-10 -top-6 opacity-70 blur-[70px] transition-opacity duration-700 group-hover:opacity-100"
          style={{
            background: `radial-gradient(48% 44% at 22% 28%, ${project.accent[0]}26, transparent 70%), radial-gradient(44% 44% at 80% 74%, ${project.accent[1]}26, transparent 70%)`,
          }}
        />

        <button
          type="button"
          onClick={() => onOpen(project)}
          aria-label={`Open the ${project.title} case study`}
          className="relative block w-full overflow-hidden rounded-[1.8rem] border border-white/[0.09] bg-void-900 p-2.5 text-left transition-colors duration-500 hover:border-white/18"
        >
          <div className="overflow-hidden rounded-[1.35rem]">
            <motion.div
              className="aspect-[16/10] w-full sm:aspect-[16/9] lg:aspect-[2.15/1]"
              style={prefersReducedMotion ? undefined : { y: visualY, scale: 1.05 }}
            >
              <ProjectVisual
                shot={project.cover}
                accent={project.accent}
                priority
                sizes="(max-width: 1280px) 100vw, 78rem"
              />
            </motion.div>
          </div>

          <VisualLabel shot={project.cover} className="absolute left-5 top-5" />

          <span className="absolute bottom-5 right-5 flex items-center gap-2.5 rounded-full border border-white/14 bg-void-950/80 px-4 py-2.5 text-[0.66rem] uppercase tracking-[0.18em] text-mist-300 backdrop-blur-md transition-all duration-500 group-hover:border-rose-400/50 group-hover:text-white">
            Enter
            <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-0.5" />
          </span>
        </button>
      </motion.div>

      {/* Two supporting captures, offset for rhythm */}
      {first && second ? (
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {[first, second].map((shot, index) => (
            <motion.div
              key={shot.src}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: index * 0.09 }}
              className={index === 1 ? "sm:mt-8" : undefined}
            >
              <button
                type="button"
                onClick={() => onOpen(project)}
                aria-label={`Open the ${project.title} case study — ${shot.caption}`}
                className="group relative block w-full overflow-hidden rounded-[1.3rem] border border-white/[0.08] bg-void-900 p-2 text-left transition-colors duration-500 hover:border-white/16"
              >
                <div className="overflow-hidden rounded-[0.95rem]">
                  <div className="aspect-[16/10] transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] motion-reduce:transform-none">
                    <ProjectVisual
                      shot={shot}
                      accent={project.accent}
                      sizes="(max-width: 640px) 100vw, 40vw"
                    />
                  </div>
                </div>
                <p className="px-2 pb-1 pt-3 text-[0.75rem] font-light text-mist-500">{shot.caption}</p>
              </button>
            </motion.div>
          ))}
        </div>
      ) : null}

      {/* Data path */}
      <div className="mt-16">
        <JuribotFlow />
      </div>

      {/* Problem / solution / stack */}
      <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-x-14">
        <Reveal className="lg:col-span-4">
          <p className="eyebrow text-[0.6rem]">The problem</p>
          <p className="mt-3.5 text-[0.92rem] font-light leading-relaxed text-mist-400">{project.problem}</p>
        </Reveal>

        <Reveal delay={0.08} className="lg:col-span-4">
          <p className="eyebrow text-[0.6rem]">The solution</p>
          <p className="mt-3.5 text-[0.92rem] font-light leading-relaxed text-mist-400">{project.solution}</p>
        </Reveal>

        <Reveal delay={0.16} className="lg:col-span-4">
          <p className="eyebrow text-[0.6rem]">Built with</p>
          <ul className="mt-3.5 flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-white/[0.09] bg-white/[0.02] px-2.5 py-1 text-[0.68rem] text-mist-400"
              >
                {tech}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </div>
  );
}
