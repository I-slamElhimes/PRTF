import type { Project } from "@/types";

/* ────────────────────────────────────────────────────────────────────────────
 *  PROJECTS
 *
 *  Every image below is REAL: either a screenshot of the running application
 *  (`source: "capture"`) or a figure lifted from the project's own written
 *  report (`source: "report"`, with the page it came from). Nothing here is a
 *  reconstruction, and no invented interface is presented as real.
 *
 *  ▸ To enable the GitHub / Live demo buttons: replace `null` with the URL.
 *    While null, the button is not rendered at all — never a dead link.
 * ──────────────────────────────────────────────────────────────────────────── */

export const projects: Project[] = [
  {
    id: "juribot-sentinel",
    index: "01",
    title: "JuriBot Sentinel",
    category: "AI · SaaS · Regulatory Compliance",
    tagline: "Turning regulation into something a company can actually act on.",
    summary:
      "A multi-tenant SaaS platform that collects regulatory documents, builds a searchable knowledge base from them, and uses retrieval-augmented generation to assist compliance analysis of products and requirements.",
    problem:
      "Regulatory requirements are scattered across official portals, PDFs and scanned documents. Teams have to find the relevant text, interpret it, and map it onto a specific product — slow work that is difficult to keep current as regulation changes.",
    solution:
      "An end-to-end pipeline: scrapers collect regulatory sources, OCR extracts text from scanned documents, the content is chunked and embedded into a vector store, and a hybrid search layer feeds an LLM that produces grounded, source-linked compliance analysis inside a multi-tenant SaaS product.",
    year: "2026",
    featured: true,
    stack: [
      "Python",
      "FastAPI",
      "Angular",
      "PostgreSQL",
      "ChromaDB",
      "Redis",
      "MinIO",
      "Celery",
      "Docker",
      "RAG",
      "LLM",
      "OCR",
      "Web Scraping",
    ],
    primaryStack: ["FastAPI", "Angular", "PostgreSQL", "ChromaDB", "RAG", "LLM"],
    features: [
      {
        title: "Regulatory document collection",
        description:
          "Automated web scraping gathers regulatory sources and keeps the corpus current as texts are published or revised.",
      },
      {
        title: "OCR & document processing",
        description:
          "Scanned and image-based documents are passed through OCR, then normalised and chunked into a consistent internal format.",
      },
      {
        title: "Regulatory knowledge base",
        description:
          "Processed text is embedded into ChromaDB, forming a queryable knowledge base with document lineage preserved.",
      },
      {
        title: "Hybrid search",
        description:
          "Combines semantic vector similarity with keyword matching so exact legal terminology and conceptual queries both resolve well.",
      },
      {
        title: "RAG + LLM analysis",
        description:
          "Retrieved passages are supplied to the LLM as context, so generated analysis stays anchored to actual regulatory text.",
      },
      {
        title: "Compliance analysis",
        description:
          "Products and requirements are assessed against the retrieved regulatory context, with the supporting sources surfaced alongside.",
      },
      {
        title: "Multi-tenant SaaS architecture",
        description:
          "Tenant isolation across data and storage, with authentication and role-based permissions per organisation.",
      },
      {
        title: "Reports & notifications",
        description:
          "Analyses are exportable as reports, with long-running jobs handled asynchronously through Celery.",
      },
    ],
    architecture: [
      { label: "Client", detail: "Angular SPA · role-aware UI · streaming responses" },
      { label: "API", detail: "FastAPI · JWT auth · tenant scoping · SSE" },
      { label: "Workers", detail: "Celery · scraping, OCR, embedding, report jobs" },
      { label: "Retrieval", detail: "ChromaDB vectors + keyword search · hybrid ranking" },
      { label: "Data", detail: "PostgreSQL relational core · Redis cache & queue · MinIO objects" },
      { label: "Runtime", detail: "Docker Compose · isolated, reproducible services" },
    ],
    cover: {
      src: "/projects/juribot/landing.jpg",
      alt: "JuriBot Sentinel marketing site: an AI regulatory compliance platform, showing the six-step product flow from upload to regulatory monitoring.",
      caption: "Product landing — the compliance pipeline, end to end",
      source: "capture",
    },
    gallery: [
      {
        src: "/projects/juribot/dashboard-admin.jpg",
        alt: "Platform administrator dashboard with company statistics, an analyses-over-time chart, plan distribution and a service health panel.",
        caption: "Platform admin — tenants, usage and service health",
        source: "capture",
      },
      {
        src: "/projects/juribot/dashboard-company.jpg",
        alt: "Company director dashboard showing product compliance analyses and regulatory activity.",
        caption: "Company workspace — analyses per organisation",
        source: "capture",
      },
      {
        src: "/projects/juribot/login.jpg",
        alt: "JuriBot Sentinel sign-in screen.",
        caption: "Authentication",
        source: "capture",
      },
      {
        src: "/projects/juribot/register.jpg",
        alt: "JuriBot Sentinel account registration screen.",
        caption: "Tenant registration",
        source: "capture",
      },
    ],
    provenance: "Screenshots of the running application.",
    accent: ["#f4b942", "#c084fc"],
    links: { github: null, demo: null },
  },
  {
    id: "faceattend",
    index: "02",
    title: "FaceAttend",
    category: "AI · Computer Vision",
    tagline: "Attendance that resolves in the time it takes to walk past a camera.",
    summary:
      "An attendance management system built on facial recognition: a camera feed is processed to detect faces, embeddings are compared against enrolled identities, and matches are written to attendance records.",
    problem:
      "Manual attendance is slow, easy to falsify, and produces records that are tedious to aggregate into anything useful.",
    solution:
      "OpenCV handles capture and face detection, DeepFace with ArcFace embeddings performs recognition, and NumPy drives the similarity comparison against enrolled vectors stored in MongoDB — with results surfaced through a Flask interface for administrators, teachers and students.",
    year: "2025",
    featured: false,
    stack: ["Python", "Flask", "MongoDB", "DeepFace", "OpenCV", "ArcFace", "NumPy"],
    primaryStack: ["Python", "OpenCV", "DeepFace", "MongoDB"],
    features: [
      {
        title: "Face detection pipeline",
        description: "OpenCV captures frames and isolates face regions before recognition runs.",
      },
      {
        title: "ArcFace embeddings",
        description:
          "Each face is converted into a vector representation via DeepFace, enabling identity comparison without storing raw imagery as the matching key.",
      },
      {
        title: "Identity matching",
        description:
          "NumPy computes similarity between the live embedding and enrolled vectors, with a threshold controlling match confidence.",
      },
      {
        title: "Role-based spaces",
        description:
          "Separate interfaces for administration, teachers and students, each scoped to what that role needs.",
      },
      {
        title: "Session planning",
        description:
          "Daily sessions are generated and tracked, with subject, group, room, teacher and status per session.",
      },
      {
        title: "Absence justifications",
        description: "Students submit justifications for absences, which are reviewed and tracked.",
      },
    ],
    architecture: [
      { label: "Capture", detail: "OpenCV · frame acquisition & face detection" },
      { label: "Recognition", detail: "DeepFace · ArcFace embedding extraction" },
      { label: "Matching", detail: "NumPy · vector similarity against enrolled identities" },
      { label: "Persistence", detail: "MongoDB · identities, sessions, attendance records" },
      { label: "Interface", detail: "Flask · admin, teacher and student spaces" },
    ],
    cover: {
      src: "/projects/faceattend/landing.jpg",
      alt: "FaceAttend home page: a smart attendance system using real-time facial recognition, with a live scan panel and the headline \"La présence, intelligemment reconnue\".",
      caption: "Home — real-time facial recognition",
      source: "capture",
    },
    gallery: [
      {
        src: "/projects/faceattend/dashboard-admin.jpg",
        alt: "FaceAttend administration dashboard showing student, teacher and programme counts alongside the day's session planning table.",
        caption: "Administration — overview and daily planning",
        source: "capture",
      },
      {
        src: "/projects/faceattend/space-teacher.jpg",
        alt: "FaceAttend teacher space for running and monitoring attendance sessions.",
        caption: "Teacher space — running a session",
        source: "capture",
      },
      {
        src: "/projects/faceattend/space-student.jpg",
        alt: "FaceAttend student space showing personal attendance history.",
        caption: "Student space — personal attendance",
        source: "capture",
      },
      {
        src: "/projects/faceattend/justification.jpg",
        alt: "FaceAttend absence justification screen.",
        caption: "Absence justification",
        source: "capture",
      },
      {
        src: "/projects/faceattend/login.jpg",
        alt: "FaceAttend sign-in screen.",
        caption: "Authentication",
        source: "capture",
      },
    ],
    provenance: "Screenshots of the running application.",
    accent: ["#34d399", "#22d3ee"],
    links: { github: null, demo: null },
  },
  {
    id: "edt-collaboratif",
    index: "03",
    title: "EDT Collaboratif",
    category: "Web Application · AI Assistant",
    tagline: "A shared timetable you can simply ask questions to.",
    summary:
      "A collaborative timetable management application where groups coordinate schedules together, with an integrated AI assistant powered by Llama 3 through Groq that answers questions about the timetable in natural language.",
    problem:
      "Shared schedules change constantly, and the people affected usually find out last — or have to dig through a grid to work out what actually changed for them.",
    solution:
      "A Django + DRF backend exposes the timetable as an API consumed by both the collaborative interface and the assistant, so users can query their schedule conversationally instead of parsing a table.",
    year: "2025",
    featured: false,
    stack: ["Python", "Django", "Django REST Framework", "SQLite", "Groq", "Llama 3"],
    primaryStack: ["Django", "DRF", "Groq", "Llama 3"],
    features: [
      {
        title: "Collaborative scheduling",
        description: "Multiple users work against a shared timetable rather than isolated copies.",
      },
      {
        title: "Groups & invitations",
        description: "Schedules are organised by group, with invitations to join and a shared calendar per group.",
      },
      {
        title: "Integrated AI assistant",
        description:
          "An assistant backed by Llama 3 via Groq answers natural-language questions about sessions and availability.",
      },
      {
        title: "Calendar & events",
        description: "A week view with event creation, upcoming events and a shareable timetable.",
      },
      {
        title: "Notifications",
        description: "Users are informed when the shared schedule changes.",
      },
    ],
    architecture: [
      { label: "Interface", detail: "Collaborative calendar · assistant panel" },
      { label: "API", detail: "Django REST Framework · timetable & group resources" },
      { label: "Assistant", detail: "Groq · Llama 3 · schedule-aware prompting" },
      { label: "Core", detail: "Django ORM · sessions, groups, users" },
      { label: "Data", detail: "SQLite" },
    ],
    cover: {
      src: "/projects/edt/landing.jpg",
      alt: "EDT Collaboratif home page: a collaborative timetable for students powered by a Groq Llama 3 assistant, headlined \"Organisez. Collaborez. Avancez.\"",
      caption: "Home — collaborate, assisted by AI",
      source: "capture",
    },
    gallery: [
      {
        src: "/projects/edt/dashboard.jpg",
        alt: "EDT Collaboratif dashboard with the current-week calendar, upcoming events, group actions and an AI assistant entry point.",
        caption: "Dashboard — week view, groups and assistant",
        source: "capture",
      },
    ],
    provenance: "Screenshots of the running application.",
    accent: ["#a855f7", "#6366f1"],
    links: { github: null, demo: null },
  },
  {
    id: "travel-planner",
    index: "04",
    title: "Travel Planner",
    category: "Web Application",
    tagline: "Planning a trip against real conditions, not guesses.",
    summary:
      "A travel planning application where users search destinations, see live weather pulled from an external API, explore places to visit, and assemble a day-by-day itinerary behind secure authentication.",
    problem:
      "Trip planning is split across a search tool, a weather site and a notes app — and none of them know about each other.",
    solution:
      "A Laravel application that consolidates the three: destination search and exploration, a REST integration with a weather provider for real-time conditions, and per-user plans persisted in MySQL behind authenticated sessions.",
    year: "2025",
    featured: false,
    stack: ["PHP", "Laravel", "MySQL", "Tailwind CSS", "REST API"],
    primaryStack: ["Laravel", "MySQL", "REST API", "Tailwind CSS"],
    features: [
      {
        title: "Destination search",
        description: "Users search destinations from the home page and browse popular suggestions.",
      },
      {
        title: "Real-time weather",
        description: "An external weather API is consumed over REST to show live conditions for a destination.",
      },
      {
        title: "Places to explore",
        description: "Each destination surfaces tourist places to visit as part of planning.",
      },
      {
        title: "Travel plans",
        description: "Users create, edit and list their own plans, organised day by day.",
      },
      {
        title: "Accounts & profile",
        description: "Registration, login and profile management protect each user's saved plans.",
      },
    ],
    architecture: [
      { label: "Interface", detail: "Blade views · Tailwind CSS" },
      { label: "Application", detail: "Laravel · routing, auth, controllers" },
      { label: "Integration", detail: "REST client · external weather provider" },
      { label: "Data", detail: "MySQL · users, destinations, plans" },
    ],
    cover: {
      src: "/projects/travel-planner/fig-01-home-hero.jpg",
      alt: "Travel Planner home page with its hero banner and destination search bar.",
      caption: "Home page — hero banner and search",
      source: "report",
      reportPage: 17,
    },
    gallery: [
      {
        src: "/projects/travel-planner/fig-02-popular-destinations.jpg",
        alt: "Travel Planner home page section listing popular destinations.",
        caption: "Popular destinations",
        source: "report",
        reportPage: 18,
      },
      {
        src: "/projects/travel-planner/fig-03-destination-weather.jpg",
        alt: "Travel Planner destination details page showing live weather information.",
        caption: "Destination details — live weather",
        source: "report",
        reportPage: 18,
      },
      {
        src: "/projects/travel-planner/fig-04-places-explore.jpg",
        alt: "Travel Planner page for exploring a destination's tourist places.",
        caption: "Exploring places to visit",
        source: "report",
        reportPage: 19,
      },
      {
        src: "/projects/travel-planner/fig-07-planning-create.jpg",
        alt: "Travel Planner form for creating a new travel plan.",
        caption: "Creating a plan",
        source: "report",
        reportPage: 21,
      },
      {
        src: "/projects/travel-planner/fig-10-planning-details.jpg",
        alt: "Travel Planner plan details view with day-by-day organisation.",
        caption: "Plan details — day by day",
        source: "report",
        reportPage: 22,
      },
      {
        src: "/projects/travel-planner/fig-09-planning-list.jpg",
        alt: "Travel Planner list of a user's saved travel plans.",
        caption: "Saved plans",
        source: "report",
        reportPage: 22,
      },
      {
        src: "/projects/travel-planner/fig-11-profile.jpg",
        alt: "Travel Planner user profile and account management page.",
        caption: "Profile and account",
        source: "report",
        reportPage: 23,
      },
      {
        src: "/projects/travel-planner/fig-05-register.jpg",
        alt: "Travel Planner registration page.",
        caption: "Registration",
        source: "report",
        reportPage: 20,
      },
      {
        src: "/projects/travel-planner/fig-06-login.jpg",
        alt: "Travel Planner login page.",
        caption: "Login",
        source: "report",
        reportPage: 20,
      },
    ],
    provenance: "Figures extracted from the project's own written report.",
    accent: ["#38bdf8", "#a855f7"],
    links: { github: null, demo: null },
  },
];

export const featuredProject = projects.find((project) => project.featured) ?? projects[0]!;
export const secondaryProjects = projects.filter((project) => !project.featured);

/** Stages rendered in the featured project's animated data-flow diagram. */
export const juribotFlow = [
  { id: "documents", label: "Documents", detail: "Scraping · portals · PDFs" },
  { id: "ocr", label: "OCR", detail: "Extraction from scans" },
  { id: "processing", label: "Processing", detail: "Normalisation · chunking" },
  { id: "kb", label: "Knowledge base", detail: "Embeddings · ChromaDB" },
  { id: "rag", label: "RAG", detail: "Hybrid semantic + keyword retrieval" },
  { id: "llm", label: "LLM", detail: "Grounded generation over context" },
  { id: "analysis", label: "Compliance", detail: "Requirements mapped to sources" },
] as const;
