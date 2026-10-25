import { education, experiences } from "@/data/experience";
import { siteConfig } from "@/data/site";

/**
 * JSON-LD describing the person behind the site.
 *
 * Only facts that appear on the page are emitted — no invented employers,
 * links or credentials. Optional fields are omitted entirely when unknown
 * rather than filled with placeholders.
 */
export function StructuredData() {
  const sameAs = [siteConfig.github, siteConfig.linkedin].filter(
    (url): url is string => typeof url === "string" && url.length > 0,
  );

  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: siteConfig.url,
    email: `mailto:${siteConfig.email}`,
    jobTitle: siteConfig.role,
    description: siteConfig.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Tanger",
      addressCountry: "MA",
    },
    alumniOf: education.map((entry) => ({
      "@type": "EducationalOrganization",
      name: entry.fullName,
    })),
    worksFor: experiences
      .filter((entry) => entry.current)
      .map((entry) => ({ "@type": "Organization", name: entry.company })),
    knowsAbout: [
      "Full Stack Development",
      "Computer Engineering",
      "Artificial Intelligence",
      "Retrieval-Augmented Generation",
      "Data Science",
      "Machine Learning",
      "Python",
      "TypeScript",
    ],
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };

  return (
    <script
      type="application/ld+json"
      // Content is fully static and authored here, not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
