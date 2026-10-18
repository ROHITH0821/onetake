// Typed schema.org JSON-LD builders. Keep them consistent with what is
// visible on each page; don't add claims (ratings, reviews, stock) that
// the page doesn't make.

import { absoluteUrl, site } from "./site";

export type JsonLdObject = { "@context"?: "https://schema.org"; "@type": string; [key: string]: unknown };

const orgId = absoluteUrl("/#organization");
const websiteId = absoluteUrl("/#website");

export function organizationSchema(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": orgId,
    name: site.name,
    url: absoluteUrl("/"),
    logo: absoluteUrl(site.logo),
    description: site.description,
    ...(site.socialProfiles.length ? { sameAs: site.socialProfiles } : {}),
    ...(site.contactEmail
      ? { contactPoint: { "@type": "ContactPoint", contactType: "customer support", email: site.contactEmail, url: absoluteUrl("/contact") } }
      : {}),
  };
}

export function websiteSchema(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    name: site.name,
    url: absoluteUrl("/"),
    description: site.description,
    inLanguage: site.language,
    publisher: { "@id": orgId },
  };
}

export type Crumb = { name: string; path: string };

export function breadcrumbSchema(crumbs: Crumb[]): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

export function blogSchema(opts: { path: string; name: string; description: string; posts: { title: string; path: string; publishedAt: string }[] }): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": absoluteUrl(`${opts.path}#blog`),
    url: absoluteUrl(opts.path),
    name: opts.name,
    description: opts.description,
    inLanguage: site.language,
    publisher: { "@id": orgId },
    blogPost: opts.posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: absoluteUrl(p.path),
      datePublished: p.publishedAt,
    })),
  };
}

export function blogPostingSchema(post: {
  path: string;
  title: string;
  description: string;
  image: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  keywords: string[];
}): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: absoluteUrl(post.image),
    url: absoluteUrl(post.path),
    mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(post.path) },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: { "@type": "Organization", name: post.author, url: absoluteUrl("/") },
    publisher: {
      "@type": "Organization",
      "@id": orgId,
      name: site.name,
      logo: { "@type": "ImageObject", url: absoluteUrl(site.logo) },
    },
    inLanguage: site.language,
    keywords: post.keywords.join(", "),
  };
}

export function faqSchema(faqs: { q: string; a: string }[]): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** Serialises JSON-LD safely for a <script> tag (no closing-tag injection). */
export const serializeJsonLd = (data: JsonLdObject | JsonLdObject[]) =>
  JSON.stringify(data).replace(/</g, "\\u003c").replace(/>/g, "\\u003e").replace(/&/g, "\\u0026");
