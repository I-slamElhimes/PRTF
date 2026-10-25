"use client";

import { motion } from "motion/react";

import { EASE_OUT_EXPO, viewportOnce } from "@/lib/motion";
import type { Project } from "@/types";
import { Tilt } from "@/components/ui/Tilt";
import { ProjectVisual, VisualLabel } from "@/components/visuals/ProjectVisual";
import { ArrowUpRightIcon, SparkleIcon } from "@/components/ui/Icons";

interface ProjectCardProps {
  project: Project;
  index: number;
  onOpen: (project: Project) => void;
}

/**
 * A portal into one project's world.
 *
 * Deliberately not a flat card: the frame is inset, the cover image drifts on
 * hover, and the accent bloom is tinted per project so each one reads as its
 * own place rather than another row in a grid.
 */
export function ProjectCard({ project, index, onOpen }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.75, ease: EASE_OUT_EXPO, delay: (index % 2) * 0.08 }}
    >
      <Tilt className="h-full" intensity={4}>
        <button
          type="button"
          onClick={() => onOpen(project)}
          aria-label={`Open the ${project.title} case study`}
          className="group relative flex h-full w-full flex-col overflow-hidden rounded-[1.6rem] border border-white/[0.08] bg-void-900/50 text-left backdrop-blur-sm transition-colors duration-500 hover:border-white/16"
        >
          {/* Accent rim that lights on hover */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[1.6rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{ boxShadow: `inset 0 0 0 1px ${project.accent[0]}47, 0 30px 80px -40px ${project.accent[0]}80` }}
          />

          {/* Cover */}
          <div className="relative m-2.5 overflow-hidden rounded-[1.15rem] border border-white/[0.07]">
            <div className="aspect-[16/10] transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05] motion-reduce:transform-none">
              <ProjectVisual
                shot={project.cover}
                accent={project.accent}
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 40vw"
              />
            </div>
            <VisualLabel shot={project.cover} className="absolute left-3 top-3" />

            <span className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/14 bg-void-950/80 text-mist-200 opacity-0 backdrop-blur-md transition-all duration-500 group-hover:opacity-100">
              <ArrowUpRightIcon className="h-4 w-4" />
            </span>
          </div>

          {/* Content */}
          <div className="flex flex-1 flex-col px-6 pb-7 pt-3">
            <div className="flex items-center gap-2.5">
              <SparkleIcon className="h-2.5 w-2.5 shrink-0" style={{ color: project.accent[0] }} />
              <span
                className="text-[0.6rem] uppercase tracking-[0.18em]"
                style={{ color: project.accent[0] }}
              >
                {project.category}
              </span>
              <span className="ml-auto text-[0.6rem] tracking-[0.18em] text-mist-600">{project.index}</span>
            </div>

            <h3 className="mt-3 font-display text-[1.7rem] font-extralight leading-tight tracking-tight text-mist-50 sm:text-[2rem]">
              {project.title}
            </h3>

            <p className="mt-3 text-[0.88rem] font-light leading-relaxed text-mist-400">{project.summary}</p>

            <ul className="mt-6 flex flex-wrap gap-1.5">
              {project.primaryStack.map((tech, techIndex) => (
                <li
                  key={tech}
                  className="rounded-full border border-white/[0.09] bg-white/[0.02] px-2.5 py-1 text-[0.66rem] tracking-wide text-mist-400 transition-all duration-500 group-hover:border-white/16 group-hover:text-mist-200 motion-reduce:transition-none"
                  style={{ transitionDelay: `${techIndex * 50}ms` }}
                >
                  {tech}
                </li>
              ))}
            </ul>

            <span className="mt-6 flex items-center gap-2 text-[0.78rem] text-mist-500 transition-colors duration-500 group-hover:text-rose-300">
              Enter the case study
              <ArrowUpRightIcon className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </button>
      </Tilt>
    </motion.article>
  );
}
