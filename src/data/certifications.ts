import type { Certification } from "@/types";

/* Exactly the certifications listed on the CV, with the years stated there. */

export const certifications: Certification[] = [
  {
    id: "python-essentials",
    title: "Python Essentials 1 & 2",
    issuer: "Cisco Networking Academy",
    year: "2024",
    group: "Programming",
  },
  {
    id: "javascript-essentials",
    title: "JavaScript Essentials 1 & 2",
    issuer: "Cisco Networking Academy",
    year: "2024",
    group: "Programming",
  },
  {
    id: "python-web-data",
    title: "Using Python to Access Web Data",
    issuer: "University of Michigan",
    year: "2025",
    group: "Programming",
  },
  {
    id: "js-interactivity",
    title: "Interactivity with JavaScript",
    issuer: "University of Michigan",
    year: "2025",
    group: "Programming",
  },
  {
    id: "oop-cpp",
    title: "Introduction à la POO en C++",
    issuer: "EPFL / Coursera",
    year: "2025",
    group: "Engineering",
  },
  {
    id: "software-design",
    title: "Software Design & Project Management",
    issuer: "HKUST / Coursera",
    year: "2026",
    group: "Engineering",
  },
  {
    id: "unix-workbench",
    title: "The Unix Workbench",
    issuer: "Johns Hopkins University / Coursera",
    year: "2025",
    group: "Systems",
  },
  {
    id: "mos-expert",
    title: "MOS Word Expert & Excel Expert",
    issuer: "ITA",
    year: "2023",
    group: "Productivity",
  },
  {
    id: "francais-altissia",
    title: "Certificat de compétence en français",
    issuer: "Altissia",
    year: "—",
    group: "Productivity",
  },
];

export const certificationGroups = ["Programming", "Engineering", "Systems", "Productivity"] as const;
