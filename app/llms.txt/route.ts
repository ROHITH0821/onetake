import { BLOG, getAllPosts } from "@/lib/blog";
import { PRICE } from "@/lib/pricing";
import { absoluteUrl, PRICING_HREF, site } from "@/lib/site";

// Served at /llms.txt (llmstxt.org). Wording is OneTake's approved summary;
// the article list comes from the published posts so it stays in sync.
export function GET() {
  const body = `# ${site.name}

> ${site.name} is an AI video-editing app designed to simplify creating short-form videos. Users upload a clip, choose a vibe, and create a reel worth posting.

## Product

${site.name} serves creators, small businesses, and individuals who want to simplify short-video editing.

Tagline: ${site.tagline}

## Pricing

The advertised entry offer is ₹${PRICE} per video. Refer to the live pricing page for current availability, included features, and applicable terms.

## Main Pages

- Homepage: ${absoluteUrl("/")}
- Blog: ${absoluteUrl(BLOG.path)}
- Pricing: ${absoluteUrl(PRICING_HREF)}
- Pricing (plain text): ${absoluteUrl("/pricing.md")}
- Full blog text: ${absoluteUrl("/llms-full.txt")}

## Articles

${getAllPosts()
  .map((p) => `- ${absoluteUrl(p.path)}`)
  .join("\n")}

Product capabilities, supported languages, pricing, and availability must be verified against the current website.
`;

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
