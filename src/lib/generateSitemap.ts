// Generates sitemap XML string from all routes
import { getAllProgrammaticRoutes } from "./conversionData";

const BASE_URL = "https://ezyconverter.com";

const staticRoutes = [
  "/",
  "/length-converter",
  "/weight-converter",
  "/temperature-converter",
  "/time-converter",
  "/data-converter",
  "/speed-converter",
  "/area-converter",
  "/volume-converter",
  "/energy-converter",
  "/pressure-converter",
  "/image-converter",
  "/pdf-converter",
  "/math-converters",
  "/engineering-converters",
  "/guides",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
];

export function generateSitemapXML(): string {
  const dynamicRoutes = getAllProgrammaticRoutes().map((r) => r.path);
  const allRoutes = [...staticRoutes, ...dynamicRoutes];

  const urls = allRoutes
    .map(
      (path) =>
        `  <url>\n    <loc>${BASE_URL}${path}</loc>\n    <changefreq>${path === "/" ? "daily" : "weekly"}</changefreq>\n    <priority>${path === "/" ? "1.0" : "0.8"}</priority>\n  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
}

export function getTotalPageCount(): number {
  return staticRoutes.length + getAllProgrammaticRoutes().length;
}
