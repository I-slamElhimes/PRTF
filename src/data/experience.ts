import type { EducationEntry, ExperienceEntry } from "@/types";

/* Straight from the CV. The figures below (lines of code, API routes, tables,
 * policies, tests) are the ones stated there — none are estimated or rounded up. */

export const experiences: ExperienceEntry[] = [
  {
    id: "smart-automation-technologies",
    company: "Smart Automation Technologies",
    role: "Full Stack & AI Developer — Internship",
    period: "25 June — 1 August 2026",
    context: "JuriBot Sentinel · Tanger",
    description:
      "Built JuriBot Sentinel, a multi-tenant compliance SaaS for the Moroccan agri-food sector: 55,000 lines of code, 102 API routes and 35 tables, delivered as a monorepo of 12 Docker Compose services.",
    highlights: [
      "Monorepo architecture: FastAPI API, Celery worker across 4 queues, Angular 18 interface, PostgreSQL 16, ChromaDB, Redis and MinIO — 12 services orchestrated by Docker Compose",
      "Multi-tenant isolation through PostgreSQL Row-Level Security: 27 policies under a NOBYPASSRLS role, with JWT auth, refresh-token rotation and 45 unit permissions",
      "Automated collection chain in 11 stages: YAML-driven scraping of official sources, Tesseract OCR (fr/ar/en), normalisation, sector classification, chunking, vectorisation and indexing",
      "Wrote the technical documentation and validated the work with 518 unit and integration tests against the real API and database",
    ],
    stack: [
      "Python",
      "FastAPI",
      "Celery",
      "Angular 18",
      "TypeScript",
      "PostgreSQL 16 (RLS)",
      "ChromaDB",
      "Redis",
      "MinIO",
      "Docker",
      "Alembic",
      "Pytest",
    ],
    current: true,
  },
  {
    id: "radeeta",
    company: "RADEETA",
    role: "Full Stack Developer — Internship",
    period: "28 April — 28 May 2025",
    context: "Internal services platform · Taza",
    description:
      "Developed an internal web application for managing company services, with multi-role authentication across Admin, Department Head and Employee.",
    highlights: [
      "Multi-role authentication and access control for Admin, Department Head and Employee",
      "Modules for employees, absences, attendance, tasks and internal messaging",
      "Database modelling with MCD/MPD, delivered under a Scrum process",
    ],
    stack: ["React.js", "Laravel", "PHP 8", "MySQL", "REST API", "JWT", "Bootstrap"],
    current: false,
  },
];

export const education: EducationEntry[] = [
  {
    id: "emsi",
    institution: "EMSI",
    fullName: "École Marocaine des Sciences de l'Ingénieur — Tanger",
    program: "State Engineering Degree — Computer Engineering & Networks (IIR)",
    period: "2025 — 2026",
    description:
      "Engineering programme in Computer Science & Networks: systems, architecture, algorithms and software design.",
    current: true,
  },
  {
    id: "ista",
    institution: "ISTA",
    fullName: "Institut Spécialisé de Technologie Appliquée — Taza",
    program: "Specialised Technician Diploma — Digital Development",
    period: "2024 — 2025",
    description: "The full stack foundation the rest of the work is built on.",
    current: false,
  },
  {
    id: "lycee",
    institution: "Lycée Al Khawarizmi",
    fullName: "Lycée Al Khawarizmi — Tanger",
    program: "Baccalauréat — Physical Sciences",
    period: "2021 — 2022",
    description: "Scientific baccalaureate.",
    current: false,
  },
];

export const languages = [
  { id: "ar", label: "Arabic", level: "Native" },
  { id: "fr", label: "French", level: "Advanced" },
  { id: "en", label: "English", level: "Intermediate" },
] as const;
