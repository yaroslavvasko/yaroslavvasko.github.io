export interface PageMeta {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  structuredData?: Record<string, any>;
}

export interface PersonSchema {
  "@context": string;
  "@type": string;
  name: string;
  title: string;
  description: string;
  image?: string;
  url: string;
  sameAs: string[];
  location: {
    "@type": string;
    name: string;
  };
}

export interface BreadcrumbSchema {
  "@context": string;
  "@type": string;
  itemListElement: Array<{
    "@type": string;
    position: number;
    name: string;
    item: string;
  }>;
}
