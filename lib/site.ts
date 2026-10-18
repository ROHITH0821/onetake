// One place for site-wide identity used by metadata, structured data,
// the sitemap, robots.txt and llms.txt. Never point these at localhost.

const DEFAULT_URL = "https://onetake.webauraindia.com";

export const site = {
  name: "OneTake",
  /** Production origin, no trailing slash. Override with NEXT_PUBLIC_SITE_URL if the domain changes. */
  url: (process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_URL).replace(/\/+$/, ""),
  tagline: "Upload your clip. Tap your vibe. Get a reel worth posting.",
  description:
    "OneTake is an AI video editor for short clips under one minute. Upload your clip, tap your vibe, and get a reel ready to review and post. You see the edit plan before you pay ₹99.",
  locale: "en_IN",
  language: "en-IN",
  ogImage: { url: "/og.png", width: 1200, height: 630, alt: "OneTake: Shot a clip? We'll make it a reel." },
  logo: "/apple-icon.png",
  /** Add real profile URLs here once they exist; they feed Organization.sameAs. */
  socialProfiles: [] as string[],
} as const;

export const absoluteUrl = (path = "/") => new URL(path, `${site.url}/`).toString();

/** Where the "Edit my video for ₹99" CTA leads: the early-access form on the homepage. */
export const EARLY_ACCESS_HREF = "/#early-access";
export const PRICING_HREF = "/#pricing";
