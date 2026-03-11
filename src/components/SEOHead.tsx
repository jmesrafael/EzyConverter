import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  schema?: object;
}

/**
 * Lightweight SEO head manager — sets document title, meta description,
 * and injects JSON-LD structured data.
 */
export const SEOHead = ({ title, description, schema }: SEOHeadProps) => {
  useEffect(() => {
    document.title = title;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", description);

    // JSON-LD
    let scriptEl = document.querySelector('script[data-seo="ld"]') as HTMLScriptElement | null;
    if (schema) {
      if (!scriptEl) {
        scriptEl = document.createElement("script");
        scriptEl.type = "application/ld+json";
        scriptEl.setAttribute("data-seo", "ld");
        document.head.appendChild(scriptEl);
      }
      scriptEl.textContent = JSON.stringify(schema);
    } else if (scriptEl) {
      scriptEl.remove();
    }

    return () => {
      if (scriptEl) scriptEl.remove();
    };
  }, [title, description, schema]);

  return null;
};
