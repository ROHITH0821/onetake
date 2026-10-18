import { CTA_LABEL, priceLabel, reeditLabel } from "@/lib/pricing";
import { absoluteUrl, EARLY_ACCESS_HREF, PRICING_HREF, site } from "@/lib/site";

// Plain-markdown pricing for AI agents comparing tools. Built from lib/pricing
// so it always matches the pricing section on the homepage.
export function GET() {
  const body = `# Pricing: ${site.name}

${site.tagline}

## Per video
- Price: ${priceLabel} per video
- How it works: upload a short clip, choose a vibe, review the edit plan, then pay
- If you're not happy with the edit plan, you don't pay

## Re-edit
- Price: ${reeditLabel} for a re-edit of the same reel

## Availability
- ${site.name} is opening in early access. Join the list: ${absoluteUrl(EARLY_ACCESS_HREF)}
- Call to action on the site: "${CTA_LABEL}"

## Source
- Live pricing: ${absoluteUrl(PRICING_HREF)}
- The website is the source of truth for current pricing and terms.
`;
  return new Response(body, { headers: { "Content-Type": "text/markdown; charset=utf-8" } });
}
