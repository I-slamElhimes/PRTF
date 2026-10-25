import type { NavItem, SocialLink } from "@/types";

/* ────────────────────────────────────────────────────────────────────────────
 *  EDIT ME
 *  The only file you need to touch to plug in your real links.
 *  Anything left `null` is never rendered as a dead link — the UI adapts.
 * ──────────────────────────────────────────────────────────────────────────── */

export const siteConfig = {
  name: "Islam El Himes",
  firstName: "Islam",
  lastName: "El Himes",
  initials: "IEH",
  role: "Full Stack Developer",
  secondaryRole: "Computer Engineering Student",
  focus: "AI & Data Science",
  location: "Tanger, Morocco",
  school: "EMSI Tanger",

  title: "Islam El Himes — Full Stack Developer & Computer Engineering Student",
  description:
    "Full Stack Developer with a Digital Development diploma, now a Computer Engineering student at EMSI Tanger specializing in AI and Data Science. Building intelligent web platforms with RAG, computer vision and modern web stacks.",

  /** Used for canonical URLs, sitemap and Open Graph. Update after deploying. */
  url: "https://islamelhimes.vercel.app",

  email: "islamelhimes14@gmail.com",
  phone: "+212 644 386 854",

  /** ▸ REPLACE with your real profile URLs. `null` keeps the entry disabled. */
  github: null as string | null,
  linkedin: null as string | null,

  /**
   * CV download. To publish a new version, overwrite the file at `href`
   * (see public/cv/README.md). Set this to `null` and every CV button
   * disappears rather than turning into a dead link.
   */
  cv: {
    href: "/cv/CV-Islam-El-Himes.pdf",
    filename: "Islam-El-Himes-CV.pdf",
    updated: "2026-08",
  } as { href: string; filename: string; updated: string } | null,

  keywords: [
    "Islam El Himes",
    "Full Stack Developer",
    "Computer Engineering",
    "EMSI Tanger",
    "AI Developer",
    "Data Science",
    "RAG",
    "LLM",
    "Computer Vision",
    "Python",
    "FastAPI",
    "Angular",
    "React",
    "Laravel",
    "Machine Learning",
    "Morocco",
  ],
} as const;

export const navItems: NavItem[] = [
  { id: "hero", label: "Home", href: "#hero" },
  { id: "about", label: "About", href: "#about" },
  { id: "skills", label: "Skills", href: "#skills" },
  { id: "work", label: "Projects", href: "#work" },
  { id: "intelligence", label: "Intelligence", href: "#intelligence" },
  { id: "experience", label: "Experience", href: "#experience" },
  { id: "contact", label: "Contact", href: "#contact" },
];

/** Rail entries — icon-only navigation shown on very wide screens. */
export const railItems = [
  { id: "hero", label: "Home", href: "#hero", icon: "home" },
  { id: "about", label: "About", href: "#about", icon: "user" },
  { id: "skills", label: "Skills", href: "#skills", icon: "layers" },
  { id: "work", label: "Projects", href: "#work", icon: "folder" },
  { id: "experience", label: "Experience", href: "#experience", icon: "briefcase" },
  { id: "credentials", label: "Certifications", href: "#credentials", icon: "award" },
  { id: "contact", label: "Contact", href: "#contact", icon: "mail" },
] as const;

/** Section ids observed by the scroll-spy, in document order. */
export const sectionIds = [
  "hero",
  "about",
  "skills",
  "work",
  "intelligence",
  "experience",
  "credentials",
  "contact",
] as const;

export const socialLinks: SocialLink[] = [
  {
    id: "email",
    label: "Email",
    handle: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    icon: "mail",
  },
  {
    id: "github",
    label: "GitHub",
    handle: "Repositories",
    href: siteConfig.github,
    icon: "github",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    handle: "Professional profile",
    href: siteConfig.linkedin,
    icon: "linkedin",
  },
];
