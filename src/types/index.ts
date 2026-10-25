/**
 * Shared domain types for the portfolio.
 *
 * Everything rendered on the page is derived from these shapes, so UI
 * components stay presentational and all content stays editable in `src/data`.
 */

/** A link that may not exist yet. `null` hides or disables the control. */
export type OptionalLink = string | null;

/**
 * Provenance of a project image. This drives the label shown on every visual so
 * a visitor always knows what they are looking at.
 *
 *  • `capture` — a real screenshot of the running application.
 *  • `report`  — a figure extracted from the project's own written report.
 *
 * There is deliberately no third value: nothing on this site presents an
 * invented interface as if it were real.
 */
export type ShotSource = "capture" | "report";

export interface ProjectShot {
  src: string;
  /** Descriptive alt text — never just the project name. */
  alt: string;
  /** Short caption shown under the frame in the gallery. */
  caption: string;
  source: ShotSource;
  /** Page number in the source report, when `source` is "report". */
  reportPage?: number;
}

export interface ProjectFeature {
  title: string;
  description: string;
}

export interface ArchitectureLayer {
  label: string;
  detail: string;
}

export interface Project {
  id: string;
  /** Two-digit index rendered in the monospace rail. */
  index: string;
  title: string;
  category: string;
  /** One-line positioning statement. */
  tagline: string;
  /** Card-level summary. */
  summary: string;
  /** The problem the project addresses. */
  problem: string;
  /** How it was solved. */
  solution: string;
  year: string;
  featured: boolean;
  stack: string[];
  /** Highlighted subset of `stack` shown on the compact card. */
  primaryStack: string[];
  features: ProjectFeature[];
  architecture: ArchitectureLayer[];
  /** Lead visual — the strongest real image of the project. */
  cover: ProjectShot;
  /** Remaining real images, shown in the case-study gallery. */
  gallery: ProjectShot[];
  /** Where this project's imagery came from, surfaced in the case study. */
  provenance: string;
  /** Accent pair driving gradients and glow for this project. */
  accent: readonly [string, string];
  links: {
    github: OptionalLink;
    demo: OptionalLink;
  };
}

export type SkillIcon =
  | "frontend"
  | "backend"
  | "database"
  | "ai"
  | "data"
  | "devops";

export interface SkillCategory {
  id: string;
  index: string;
  title: string;
  /** Short label used inside the orbit visual. */
  shortTitle: string;
  description: string;
  skills: string[];
  accent: string;
  /** Illustrates how the technologies chain together in practice. */
  chain: string[];
  icon: SkillIcon;
}

export interface JourneyStage {
  id: string;
  index: string;
  period: string;
  title: string;
  subtitle: string;
  description: string;
  markers: string[];
  state: "completed" | "current" | "next";
}

export interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  period: string;
  context: string;
  description: string;
  highlights: string[];
  stack: string[];
  current: boolean;
}

export interface EducationEntry {
  id: string;
  institution: string;
  fullName: string;
  program: string;
  period: string;
  description: string;
  current: boolean;
}

export type CertificationGroup = "Programming" | "Engineering" | "Systems" | "Productivity";

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  year: string;
  group: CertificationGroup;
}

export interface PipelineStage {
  id: string;
  index: string;
  label: string;
  title: string;
  description: string;
  tools: string[];
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export interface SocialLink {
  id: string;
  label: string;
  handle: string;
  href: OptionalLink;
  icon: "github" | "linkedin" | "mail";
}
