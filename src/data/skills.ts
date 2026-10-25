import type { SkillCategory } from "@/types";

/* Six domains, mirroring the reference composition. Every technology listed
 * here appears on the CV — nothing is padded to fill a card. */

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    index: "01",
    title: "Frontend",
    shortTitle: "Frontend",
    description:
      "Interfaces that stay fast and legible under real data — component architecture, typed contracts and considered motion.",
    skills: ["Angular 18", "React.js", "TypeScript", "JavaScript", "HTML / CSS", "Tailwind CSS", "Bootstrap", "Blade"],
    chain: ["Component", "State", "API contract", "Interface"],
    accent: "#f472b6",
    icon: "frontend",
  },
  {
    id: "backend",
    index: "02",
    title: "Backend",
    shortTitle: "Backend",
    description:
      "The service layer: routing, authentication, background workers and the contracts every client depends on.",
    skills: ["Python", "FastAPI", "Django", "Flask", "Laravel", "PHP 8", "Node.js", "Celery", "REST API", "JWT", "SSE"],
    chain: ["Python", "FastAPI", "REST / SSE", "Client"],
    accent: "#c084fc",
    icon: "backend",
  },
  {
    id: "databases",
    index: "03",
    title: "Databases",
    shortTitle: "Data stores",
    description:
      "Choosing the right store per problem — relational cores with row-level isolation, document stores, vector indexes and caches.",
    skills: [
      "PostgreSQL",
      "Row-Level Security",
      "MySQL",
      "MongoDB",
      "ChromaDB",
      "Redis",
      "SQLAlchemy",
      "Eloquent ORM",
      "Alembic",
      "MCD / MPD / MLD",
    ],
    chain: ["Model", "PostgreSQL", "Redis cache", "Query"],
    accent: "#818cf8",
    icon: "database",
  },
  {
    id: "ai-rag",
    index: "04",
    title: "AI & RAG",
    shortTitle: "AI & RAG",
    description:
      "Retrieval-augmented systems that stay anchored to real sources — hybrid search, citation validation, and refusing to answer without one.",
    skills: [
      "RAG",
      "LLM (Anthropic / Groq)",
      "Llama 3",
      "Ollama",
      "bge-m3 embeddings",
      "Hybrid search",
      "BM25",
      "Reciprocal Rank Fusion",
      "Tesseract OCR",
    ],
    chain: ["Documents", "Embeddings", "Hybrid retrieval", "LLM", "Cited answer"],
    accent: "#a855f7",
    icon: "ai",
  },
  {
    id: "data-science",
    index: "05",
    title: "Data Science",
    shortTitle: "Data & ML",
    description:
      "The direction I am actively growing into: processing raw sources, analysing them, and applying vision models to real problems.",
    skills: [
      "Pandas",
      "NumPy",
      "Computer Vision",
      "DeepFace",
      "OpenCV",
      "ArcFace",
      "Web Scraping",
      "Data processing",
      "ReportLab",
    ],
    chain: ["Raw data", "Processing", "Analysis", "Model", "Application"],
    accent: "#e879f9",
    icon: "data",
  },
  {
    id: "devops",
    index: "06",
    title: "DevOps & Tools",
    shortTitle: "DevOps",
    description:
      "Keeping projects reproducible and provable — containers, orchestration, version control and a real test suite.",
    skills: ["Docker", "Docker Compose", "Git", "GitHub", "Linux / Unix", "Pytest", "Postman", "UML / Merise", "Agile / Scrum"],
    chain: ["Code", "Container", "Test", "Deploy"],
    accent: "#60a5fa",
    icon: "devops",
  },
];

/** Labels orbiting the central sphere in the hero. */
export const orbitNodes = [
  { id: "ai", label: "AI", caption: "Artificial Intelligence" },
  { id: "web", label: "WEB", caption: "Web Development" },
  { id: "api", label: "API", caption: "RESTful Services" },
  { id: "data", label: "DATA", caption: "Data Science" },
  { id: "code", label: "CODE", caption: "Clean Code" },
  { id: "db", label: "DB", caption: "Databases" },
] as const;
