import type { MetadataRoute } from "next";
import { absoluteUrl, site } from "@/lib/site";

// Everything public is crawlable, including by AI search crawlers. Only the
// sign-up API and the unfinished /create demo are kept out of indexes.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/create/"] }],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: site.url,
  };
}
