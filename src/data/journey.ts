import type { JourneyStage } from "@/types";

export const journeyIntro = {
  eyebrow: "About",
  title: "A trajectory, not a title.",
  paragraphs: [
    "I started with the craft: shipping full stack web applications end to end, from the database schema to the interface a real person actually clicks. That foundation came from a Digital Development diploma at ISTA, and it is still the part of engineering I am fastest at.",
    "I am now a Computer Engineering student at EMSI Tanger, specializing in Computer Science & Networks — deepening the systems layer underneath the applications I already know how to build.",
    "The direction I am actively moving in is AI and Data Science. Not as a label I have earned yet, but as the work I am doing: retrieval-augmented systems, LLM integration, computer vision, and data processing pipelines inside real projects.",
  ],
} as const;

export const journeyStages: JourneyStage[] = [
  {
    id: "digital-development",
    index: "01",
    period: "2024 — 2025",
    title: "Digital Development",
    subtitle: "ISTA · Diploma",
    description:
      "Formal grounding in web development: programming fundamentals, relational databases, and the discipline of turning a specification into working software.",
    markers: ["HTML / CSS / JS", "PHP", "SQL", "Git"],
    state: "completed",
  },
  {
    id: "full-stack",
    index: "02",
    period: "2024 — Present",
    title: "Full Stack Development",
    subtitle: "Applied practice",
    description:
      "Building complete applications across the stack — REST APIs, authentication, data modelling, deployment — with Laravel, Django, Flask, FastAPI, Angular and React.",
    markers: ["FastAPI", "Django", "Angular", "React", "PostgreSQL"],
    state: "completed",
  },
  {
    id: "computer-engineering",
    index: "03",
    period: "2025 — Present",
    title: "Computer Engineering",
    subtitle: "EMSI Tanger · Computer Science & Networks",
    description:
      "Engineering-level study of systems: networks, architecture, algorithms and software design — the layer that separates code that runs from systems that hold up.",
    markers: ["Networks", "Systems", "Algorithms", "Software design"],
    state: "current",
  },
  {
    id: "ai-data-science",
    index: "04",
    period: "In progress",
    title: "AI & Data Science",
    subtitle: "Current specialization",
    description:
      "Where I am deliberately heading. Machine Learning, data analysis, RAG architectures, LLM integration and computer vision — learned by building them into production-shaped projects.",
    markers: ["RAG", "LLM", "Machine Learning", "Computer Vision", "Pandas"],
    state: "next",
  },
];
