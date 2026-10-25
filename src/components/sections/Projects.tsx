"use client";

import { useCallback, useState } from "react";

import type { Project } from "@/types";
import { featuredProject, projects, secondaryProjects } from "@/data/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FeaturedProject } from "@/components/sections/FeaturedProject";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { ProjectModal } from "@/components/sections/ProjectModal";

export function Projects() {
  const [openProject, setOpenProject] = useState<Project | null>(null);

  const handleOpen = useCallback((project: Project) => setOpenProject(project), []);
  const handleClose = useCallback(() => setOpenProject(null), []);

  return (
    <section id="work" aria-labelledby="work-heading" className="section-y relative">
      <div className="shell">
        <SectionHeading
          id="work-heading"
          index="03"
          eyebrow="Selected work"
          title="Four worlds, built"
          accentWord="end to end"
          description={`${projects.length} projects, each solving a real problem. Every image here is a real screenshot or a figure from the project's own report — open any of them to step inside.`}
        />

        {/* Featured world */}
        <div className="mt-16 lg:mt-20">
          <FeaturedProject project={featuredProject} onOpen={handleOpen} />
        </div>

        {/* Divider */}
        <div className="mt-24 flex items-center gap-4 lg:mt-28">
          <span className="eyebrow text-[0.6rem]">More worlds</span>
          <span aria-hidden="true" className="h-px flex-1 bg-gradient-to-r from-white/12 to-transparent" />
          <span className="text-[0.62rem] tracking-[0.18em] text-mist-600">
            {String(secondaryProjects.length).padStart(2, "0")}
          </span>
        </div>

        {/* Grid */}
        <div className="mt-9 grid gap-5 sm:grid-cols-2 sm:gap-6">
          {secondaryProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} onOpen={handleOpen} />
          ))}
        </div>
      </div>

      <ProjectModal project={openProject} onClose={handleClose} />
    </section>
  );
}
