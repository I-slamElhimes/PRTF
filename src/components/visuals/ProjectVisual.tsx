"use client";

import Image from "next/image";

import { cn } from "@/lib/utils";
import type { Project, ProjectShot } from "@/types";

interface ProjectVisualProps {
  shot: ProjectShot;
  accent: readonly [string, string];
  className?: string;
  priority?: boolean;
  sizes?: string;
}

/**
 * A real project image inside its frame.
 *
 * Every visual on this site is an actual capture or a figure from the project's
 * report — there is no synthetic fallback, so there is nothing here that could
 * misrepresent an interface.
 */
export function ProjectVisual({ shot, accent, className, priority = false, sizes }: ProjectVisualProps) {
  return (
    <div className={cn("relative h-full w-full overflow-hidden bg-void-900", className)}>
      <Image
        src={shot.src}
        alt={shot.alt}
        fill
        priority={priority}
        sizes={sizes ?? "(max-width: 1024px) 100vw, 60vw"}
        className="object-cover object-top"
      />

      {/* Accent bloom, lit on hover by the parent `group`. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{
          background: `radial-gradient(60% 60% at 25% 15%, ${accent[0]}1f, transparent 70%), radial-gradient(55% 55% at 82% 88%, ${accent[1]}1f, transparent 70%)`,
        }}
      />

      {/* Keeps the frame seated in the dark ground rather than floating. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_58%,rgba(7,4,14,0.55)_100%)]"
      />
    </div>
  );
}

/**
 * Provenance chip. States plainly whether a visual is a screenshot of the
 * running app or a figure lifted from the project's report.
 */
export function VisualLabel({ shot, className }: { shot: ProjectShot; className?: string }) {
  const isReport = shot.source === "report";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-white/14 bg-void-950/80 px-2.5 py-1 text-[0.58rem] uppercase tracking-[0.16em] text-mist-300 backdrop-blur-md",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="h-1 w-1 rounded-full"
        style={{ background: isReport ? "var(--color-violet-400)" : "var(--color-rose-400)" }}
      />
      {isReport ? `Report · fig. p.${shot.reportPage}` : "Screenshot"}
    </span>
  );
}

/** Convenience: every real image belonging to a project, cover first. */
export function allShots(project: Project): ProjectShot[] {
  return [project.cover, ...project.gallery];
}
