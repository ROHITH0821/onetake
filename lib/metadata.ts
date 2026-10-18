import type { Metadata } from "next";
import { absoluteUrl, site } from "./site";

type PageMeta = {
  /** Full <title>; used as-is (no template) so every page's title is deliberate and unique. */
  title: string;
  description: string;
  /** Path for the canonical URL, e.g. "/blog/my-post". */
  path: string;
  image?: { url: string; width: number; height: number; alt: string };
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  keywords?: string[];
  /** Set false for pages that shouldn't be indexed. */
  index?: boolean;
};

/** Complete per-page metadata: canonical, Open Graph, X card and robots, all with absolute URLs. */
export function pageMetadata(p: PageMeta): Metadata {
  const url = absoluteUrl(p.path);
  const image = p.image ?? site.ogImage;
  const images = [{ ...image, url: absoluteUrl(image.url) }];
  const index = p.index ?? true;

  return {
    title: { absolute: p.title },
    description: p.description,
    keywords: p.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: p.type ?? "website",
      url,
      siteName: site.name,
      locale: site.locale,
      title: p.title,
      description: p.description,
      images,
      ...(p.type === "article"
        ? { publishedTime: p.publishedTime, modifiedTime: p.modifiedTime ?? p.publishedTime, authors: p.authors }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: p.title,
      description: p.description,
      images: images.map((i) => ({ url: i.url, alt: i.alt })),
    },
    robots: index
      ? { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } }
      : { index: false, follow: true },
  };
}
