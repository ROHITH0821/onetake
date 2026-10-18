import type { Block } from "@/content/blog/types";
import { BLOG, getAllPosts } from "@/lib/blog";
import { absoluteUrl, site } from "@/lib/site";

// Every published article as plain markdown in one file (companion to /llms.txt),
// so an AI agent can read the whole blog in a single request.
const plain = (s: string) => s.replace(/\[(.+?)\]\((.+?)\)/g, "$1");

const blockToMd = (b: Block) => {
  switch (b.type) {
    case "h2":
      return `## ${b.text}`;
    case "h3":
      return `### ${b.text}`;
    case "p":
      return plain(b.text);
    case "note":
      return `> ${plain(b.text)}`;
    case "ul":
      return b.items.map((i) => `- ${plain(i)}`).join("\n");
    case "ol":
      return b.items.map((i, n) => `${n + 1}. ${plain(i)}`).join("\n");
  }
};

export function GET() {
  const posts = getAllPosts()
    .map((p) =>
      [
        `# ${p.title}`,
        `URL: ${absoluteUrl(p.path)}`,
        `Author: ${p.author} | Published: ${p.publishedAt}${p.updatedAt ? ` | Updated: ${p.updatedAt}` : ""}`,
        p.answer,
        ...p.body.map(blockToMd),
        "## Frequently asked questions",
        ...p.faqs.map((f) => `### ${f.q}\n${f.a}`),
      ].join("\n\n"),
    )
    .join("\n\n---\n\n");

  const body = `# ${site.name}: full blog content

> ${site.description}

Blog: ${absoluteUrl(BLOG.path)}

---

${posts}
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
