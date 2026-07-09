import type { BreadcrumbSchema,PersonSchema } from "@/types/seo";

export function getPersonSchema(): PersonSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: import.meta.env.VITE_SITE_NAME,
    title: "Senior .NET Engineer | Full-stack Developer",
    description: import.meta.env.VITE_SITE_DESCRIPTION,
    url: import.meta.env.VITE_SITE_URL,
    sameAs: [
      import.meta.env.VITE_GITHUB_URL,
      import.meta.env.VITE_LINKEDIN_URL,
      import.meta.env.VITE_TWITTER_URL,
    ],
    location: {
      "@type": "Place",
      name: "Kraków, Poland",
    },
  };
}

export function getProfessionalServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: import.meta.env.VITE_SITE_NAME,
    description: import.meta.env.VITE_SITE_DESCRIPTION,
    url: import.meta.env.VITE_SITE_URL,
    areaServed: "WW",
    serviceType: ["Software Development", "Cloud Architecture", "Consulting"],
  };
}

export function getBreadcrumbSchema(
  items: Array<{ name: string; item: string }>,
): BreadcrumbSchema {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  };
}
