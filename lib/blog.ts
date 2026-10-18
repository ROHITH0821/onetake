// Single source of published posts for the blog index, article pages,
// sitemap and llms.txt. Validates content at build time.

import { posts as allPosts } from "@/content/blog";
import type { Block, PostInput } from "@/content/blog/types";

export type Post = PostInput & {
  path: string;
  /** Minutes, rounded up. */
  readingTime: number;
};

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const WORDS_PER_MINUTE = 200;

const stripMarks = (s: string) => s.replace(/\*\*(.+?)\*\*/g, "$1").replace(/\[(.+?)\]\((.+?)\)/g, "$1");
const blockText = (b: Block) => ("items" in b ? b.items.join(" ") : b.text);

function readingTime(p: PostInput) {
  const text = [p.answer, ...p.body.map(blockText), ...p.faqs.flatMap((f) => [f.q, f.a])].map(stripMarks).join(" ");
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

function validate(list: PostInput[]) {
  const seen = new Set<string>();
  for (const p of list) {
    if (!SLUG.test(p.slug)) throw new Error(`Blog: invalid slug "${p.slug}"`);
    if (seen.has(p.slug)) throw new Error(`Blog: duplicate slug "${p.slug}"`);
    seen.add(p.slug);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(p.publishedAt)) throw new Error(`Blog: "${p.slug}" publishedAt must be YYYY-MM-DD`);
    if (p.updatedAt && p.updatedAt < p.publishedAt) throw new Error(`Blog: "${p.slug}" updatedAt is before publishedAt`);
    if (p.body.some((b) => b.type === "h3") && !p.body.some((b) => b.type === "h2")) throw new Error(`Blog: "${p.slug}" has h3 without h2`);
  }
  for (const p of list) {
    for (const r of p.relatedPosts) if (!seen.has(r)) throw new Error(`Blog: "${p.slug}" links to unknown related post "${r}"`);
  }
}

validate(allPosts);

const published: Post[] = allPosts
  .filter((p) => !p.draft)
  .map((p) => ({ ...p, path: `/blog/${p.slug}`, readingTime: readingTime(p) }))
  .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

export const getAllPosts = () => published;

export const getPost = (slug: string) => published.find((p) => p.slug === slug);

export function getRelatedPosts(post: Post, limit = 3) {
  const related = post.relatedPosts.map(getPost).filter((p): p is Post => Boolean(p));
  const fill = published.filter((p) => p.slug !== post.slug && !related.includes(p));
  return [...related, ...fill].slice(0, limit);
}

export const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export const BLOG = {
  path: "/blog",
  title: "Tips to Make Better Reels, Faster",
  metaTitle: "Reel Editing Tips: Make Better Reels, Faster | OneTake Blog",
  description:
    "Practical tips for turning short phone clips into reels people watch: hooks, cutting dead air, beat-synced edits and Hindi or Telugu captions.",
  intro:
    "Short, practical guides for turning everyday phone clips into reels worth posting. OneTake helps you get there with less editing: upload a clip under a minute, tap a vibe, and review the edit plan before you pay.",
};
