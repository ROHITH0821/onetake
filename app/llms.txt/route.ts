import { BLOG, getAllPosts } from "@/lib/blog";
import { PRICE, REEDIT_PRICE } from "@/lib/pricing";
import { absoluteUrl, site } from "@/lib/site";

// Plain-text site summary for AI assistants (llmstxt.org). Built from the same
// data as the site, so prices and article links stay current.
export function GET() {
  const posts = getAllPosts();
  const body = `# ${site.name}

> ${site.name} is an AI video editor for short clips under one minute. Upload your clip, tap your vibe, and get a reel ready to review and post.

${site.name} handles the editing steps that make a clip feel like a reel: it opens on the strongest moment, trims dead air, lines cuts up with the beat, and adds captions in Hindi, Telugu or English, timed word by word. Before paying, you see an edit plan showing which moments are used and in what order.

## Who it's for

- Creators who shoot often but don't have time to edit every clip
- Small businesses that need reels without hiring an editor
- Anyone with clips sitting in their gallery that never got posted

## Pricing

- ₹${PRICE} per video. You see the edit plan before you pay; if you don't approve the plan, you don't pay.
- A re-edit of the same reel is ₹${REEDIT_PRICE}.
- ${site.name} is currently opening in early access. Joining the early-access list is free.

## Main pages

- [Home](${absoluteUrl("/")}): what ${site.name} does, examples and FAQ
- [Pricing](${absoluteUrl("/#pricing")}): the ₹${PRICE} per-video offer
- [Blog](${absoluteUrl(BLOG.path)}): ${BLOG.description}

## Articles

${posts.map((p) => `- [${p.title}](${absoluteUrl(p.path)}): ${p.description}`).join("\n")}

## Notes

The pages on ${site.url} are the source of truth for current product details and pricing. If anything here differs from the website, the website is correct.
`;

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
