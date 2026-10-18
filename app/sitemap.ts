import type { MetadataRoute } from "next";
import { BLOG, getAllPosts } from "@/lib/blog";
import { LEGAL_UPDATED, legalPages } from "@/lib/legal";
import { absoluteUrl } from "@/lib/site";

// Same published-post source as the blog pages, so the two can't drift apart.
export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const latest = posts.map((p) => p.updatedAt ?? p.publishedAt).sort().at(-1);

  return [
    { url: absoluteUrl("/"), changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl(BLOG.path), ...(latest ? { lastModified: latest } : {}), changeFrequency: "weekly", priority: 0.8 },
    ...posts.map((p) => ({
      url: absoluteUrl(p.path),
      lastModified: p.updatedAt ?? p.publishedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      images: [absoluteUrl(p.coverImage)],
    })),
    ...legalPages.map((p) => ({ url: absoluteUrl(p.path), lastModified: LEGAL_UPDATED, changeFrequency: "yearly" as const, priority: 0.3 })),
  ];
}
