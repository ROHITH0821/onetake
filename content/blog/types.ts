// Shape of a blog post. Body text supports two inline marks:
// **bold** and [link text](/path).

export type Block =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  /** A short highlighted note, rendered as an <aside>. */
  | { type: "note"; text: string };

export type Faq = { q: string; a: string };

export type PostInput = {
  title: string;
  /** Shorter <title> for search results (keep under ~60 chars). Defaults to "title | OneTake Blog". */
  seoTitle?: string;
  slug: string;
  /** Meta description, ~150 characters. */
  description: string;
  /** Shown on blog cards. */
  excerpt: string;
  category: string;
  author: string;
  /** ISO dates (YYYY-MM-DD). */
  publishedAt: string;
  updatedAt?: string;
  coverImage: string;
  coverImageAlt: string;
  coverCaption: string;
  keywords: string[];
  /** Answer-first opening: 2–3 sentences that answer the title on their own. */
  answer: string;
  body: Block[];
  faqs: Faq[];
  /** Slugs of related posts, in display order. */
  relatedPosts: string[];
  /** Drafts are excluded from the blog, sitemap and llms.txt. */
  draft?: boolean;
};
