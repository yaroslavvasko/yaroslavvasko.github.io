import { useEffect } from "react";

interface PageMetaOptions {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
  ogUrl?: string;
  structuredData?: Record<string, any>;
}

export function usePageMeta(options: PageMetaOptions) {
  useEffect(() => {
    const fullTitle = `Yaroslav Vasko | ${options.title}`;
    document.title = fullTitle;

    // Update meta description
    const descTag = document.querySelector('meta[name="description"]');
    if (descTag) {
      descTag.setAttribute("content", options.description);
    }

    const siteUrl = import.meta.env.VITE_SITE_URL;
    const canonicalPath = options.path || "/";
    const canonicalUrl = `${siteUrl}${canonicalPath}`;

    let canonicalLink = document.querySelector(
      'link[rel="canonical"]',
    ) as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.rel = "canonical";
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = canonicalUrl;

    // Update Open Graph tags
    const updateOrCreateMetaTag = (property: string, content: string) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("property", property);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    updateOrCreateMetaTag("og:title", fullTitle);
    updateOrCreateMetaTag("og:description", options.description);
    updateOrCreateMetaTag("og:url", canonicalUrl);
    updateOrCreateMetaTag("og:type", "website");

    if (options.ogImage) {
      updateOrCreateMetaTag("og:image", options.ogImage);
    }

    // Update Twitter Card tags
    const updateOrCreateTwitterTag = (name: string, content: string) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", name);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    updateOrCreateTwitterTag("twitter:card", "summary_large_image");
    updateOrCreateTwitterTag("twitter:title", fullTitle);
    updateOrCreateTwitterTag("twitter:description", options.description);

    if (options.ogImage) {
      updateOrCreateTwitterTag("twitter:image", options.ogImage);
    }

    // Add structured data (JSON-LD)
    if (options.structuredData) {
      let scriptTag = document.querySelector(
        'script[type="application/ld+json"]',
      ) as HTMLScriptElement | null;
      if (!scriptTag) {
        scriptTag = document.createElement("script");
        scriptTag.type = "application/ld+json";
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(options.structuredData);
    }
  }, [options]);
}
