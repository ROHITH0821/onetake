import { formatINR, PRICE, priceLabel } from "./pricing";

// Mock data only — no backend yet. Swap these for API responses later.

// Stock footage: free clips from mixkit.co (Mixkit Stock Video Free License),
// streamed from their CDN. Replace with your own sample reels before launch.
const clip = (id: number) => `https://assets.mixkit.co/videos/${id}/${id}-720.mp4`;

/** Same clip at 360p (~1 MB instead of 3–6 MB): for thumbnails and the deliberately dull "raw" takes. */
export const lite = (url: string) => url.replace(/-720\.mp4$/, "-360.mp4");

export const sampleClips = {
  dance: clip(42324),
  nightPortrait: clip(1231),
  beachSunset: clip(1214),
  foodPose: clip(51252),
  flowers: clip(1186),
  ramen: clip(51257),
  friends: clip(51258),
  coffee: "https://assets.mixkit.co/active_storage/video_items/100343/1723061803/100343-video-720.mp4",
};

export type VibeId = "energetic" | "cinematic" | "emotional" | "funny" | "aesthetic";

export type Vibe = {
  id: VibeId;
  name: string;
  tagline: string;
  /** Gradients shown while the clip loads, and used for storyboard placeholders. */
  scenes: string[];
  /** Sample footage for this vibe. */
  video: string;
  words: [string, string, string, string];
  /** CSS filter used to grade an uploaded clip in the mock reveal. */
  grade: string;
};

export const vibes: Vibe[] = [
  {
    id: "energetic",
    name: "Energetic",
    tagline: "Fast cuts, big drops",
    scenes: [
      "linear-gradient(160deg,#f97316,#ec4899 60%,#7c3aed)",
      "linear-gradient(200deg,#facc15,#f97316 55%,#be123c)",
      "linear-gradient(140deg,#ec4899,#8b5cf6 60%,#1d4ed8)",
      "linear-gradient(180deg,#fb7185,#f97316 50%,#7c2d12)",
    ],
    video: sampleClips.dance,
    words: ["LET'S", "GO", "RIGHT", "NOW"],
    grade: "saturate(1.5) contrast(1.15)",
  },
  {
    id: "cinematic",
    name: "Cinematic",
    tagline: "Slow push-ins, moody grade",
    scenes: [
      "linear-gradient(180deg,#0f766e,#134e4a 45%,#0b0b0f)",
      "linear-gradient(170deg,#f59e0b,#9a3412 50%,#111827)",
      "linear-gradient(190deg,#1e3a8a,#0f172a 60%,#0b0b0f)",
      "linear-gradient(160deg,#fb923c,#0f766e 70%,#042f2e)",
    ],
    video: sampleClips.nightPortrait,
    words: ["city", "after", "dark", "hits"],
    grade: "saturate(0.9) contrast(1.25) sepia(0.2)",
  },
  {
    id: "emotional",
    name: "Emotional",
    tagline: "Soft light, slow fades",
    scenes: [
      "linear-gradient(170deg,#fda4af,#c084fc 60%,#4c1d95)",
      "linear-gradient(190deg,#fecaca,#fb7185 55%,#881337)",
      "linear-gradient(150deg,#ddd6fe,#a78bfa 60%,#312e81)",
      "linear-gradient(180deg,#fed7aa,#f472b6 60%,#6b21a8)",
    ],
    video: sampleClips.beachSunset,
    words: ["this", "moment", "stays", "forever"],
    grade: "saturate(1.1) brightness(1.08) sepia(0.12)",
  },
  {
    id: "funny",
    name: "Funny",
    tagline: "Zooms, freeze-frames, memes",
    scenes: [
      "linear-gradient(150deg,#fde047,#fb923c 60%,#ea580c)",
      "linear-gradient(200deg,#a3e635,#22d3ee 60%,#2563eb)",
      "linear-gradient(170deg,#f472b6,#fde047 65%,#f97316)",
      "linear-gradient(190deg,#22d3ee,#a78bfa 60%,#db2777)",
    ],
    video: sampleClips.foodPose,
    words: ["wait", "for", "it", "LOL"],
    grade: "saturate(1.7) contrast(1.1) hue-rotate(-6deg)",
  },
  {
    id: "aesthetic",
    name: "Aesthetic",
    tagline: "Clean, minimal, dreamy",
    scenes: [
      "linear-gradient(180deg,#e9d5ff,#c4b5fd 55%,#6d28d9)",
      "linear-gradient(160deg,#fbcfe8,#fda4af 55%,#9d174d)",
      "linear-gradient(200deg,#bae6fd,#a5b4fc 60%,#4338ca)",
      "linear-gradient(170deg,#fef3c7,#fbcfe8 55%,#a855f7)",
    ],
    video: sampleClips.flowers,
    words: ["soft", "sunday", "slow", "living"],
    grade: "saturate(0.85) brightness(1.12) contrast(0.95)",
  },
];

export const vibeById = (id: VibeId | null | undefined) =>
  vibes.find((v) => v.id === id) ?? vibes[0];

export type Song = {
  id: string;
  title: string;
  tag: string;
  bpm: number;
  /** Root note in Hz for the synthesised preview. */
  root: number;
  wave: OscillatorType;
  cover: string;
};

// Placeholder sounds — previews are synthesised in the browser, not real tracks.
export const songs: Song[] = [
  { id: "neon-bazaar", title: "Neon Bazaar", tag: "Desi trap", bpm: 140, root: 55, wave: "sawtooth", cover: "linear-gradient(135deg,#8b5cf6,#ec4899)" },
  { id: "monsoon-drive", title: "Monsoon Drive", tag: "Lo-fi", bpm: 84, root: 65.4, wave: "triangle", cover: "linear-gradient(135deg,#0ea5e9,#8b5cf6)" },
  { id: "shaadi-season", title: "Shaadi Season", tag: "Dhol bounce", bpm: 104, root: 73.4, wave: "square", cover: "linear-gradient(135deg,#f97316,#facc15)" },
  { id: "midnight-rickshaw", title: "Midnight Rickshaw", tag: "House", bpm: 124, root: 49, wave: "sawtooth", cover: "linear-gradient(135deg,#ec4899,#f97316)" },
  { id: "chai-break", title: "Chai Break", tag: "Acoustic pop", bpm: 96, root: 82.4, wave: "triangle", cover: "linear-gradient(135deg,#34d399,#0ea5e9)" },
  { id: "slow-sunday", title: "Slow Sunday", tag: "Dreamy", bpm: 72, root: 61.7, wave: "sine", cover: "linear-gradient(135deg,#f472b6,#c4b5fd)" },
  { id: "gully-anthem", title: "Gully Anthem", tag: "Hip-hop", bpm: 92, root: 46.2, wave: "square", cover: "linear-gradient(135deg,#7c3aed,#0b0b0f)" },
];

export type ClipType = "reel" | "business" | "personal" | "client";

export const clipTypes: { id: ClipType; name: string; blurb: string }[] = [
  { id: "reel", name: "Reel / Short", blurb: "Hook-first edits built for the feed" },
  { id: "business", name: "Business promo", blurb: "Show the product, land the offer" },
  { id: "personal", name: "Personal", blurb: "Birthdays, trips, family moments" },
  { id: "client", name: "Client work", blurb: "Clean, on-brief, ready to send" },
];

export const captionStyles = ["Bold pop-up", "Minimal", "Karaoke"] as const;
export const languages = ["Hindi", "Telugu", "English"] as const;
export const lengths = ["15s", "30s", "Full"] as const;
export const formats = ["9:16", "1:1", "16:9"] as const;

export const suggestionChips = [
  "Focus on the best moment",
  "Make it funny",
  "Add a strong hook",
  "Keep my voice clear",
  "End on a call to action",
  "No text on faces",
];

export const tweakChips = ["Faster cuts", "Bigger captions", "Try another sound", "Make it shorter", "Stronger hook"];

export type Shot = {
  /** Position in the final reel, 0–1. */
  at: number;
  title: string;
  note: string;
};

export const editPlans: Record<ClipType, Shot[]> = {
  reel: [
    { at: 0, title: "Hook", note: "Best reaction, punched in" },
    { at: 0.14, title: "Beat drop", note: "Three quick cuts on the beat" },
    { at: 0.38, title: "The moment", note: "Slow-mo on the peak" },
    { at: 0.66, title: "Caption hit", note: "Pop-up text on the punchline" },
    { at: 0.86, title: "Loop out", note: "Ends where it starts" },
  ],
  business: [
    { at: 0, title: "Hook", note: "Product in the first second" },
    { at: 0.16, title: "The problem", note: "One line, big caption" },
    { at: 0.4, title: "In action", note: "Close-ups cut to the beat" },
    { at: 0.68, title: "The offer", note: "Price or perk on screen" },
    { at: 0.88, title: "Call to action", note: "Visit, order or DM" },
  ],
  personal: [
    { at: 0, title: "Hook", note: "Cake cutting" },
    { at: 0.15, title: "Everyone arrives", note: "Quick smiles montage" },
    { at: 0.4, title: "The big moment", note: "Candles out, slow-mo" },
    { at: 0.65, title: "Reactions", note: "Laughs synced to the beat" },
    { at: 0.87, title: "Last frame", note: "Group hug, soft fade" },
  ],
  client: [
    { at: 0, title: "Hook", note: "Strongest brand shot" },
    { at: 0.15, title: "Set-up", note: "Context in one caption" },
    { at: 0.4, title: "Hero sequence", note: "Clean cuts, on-brand grade" },
    { at: 0.68, title: "Proof", note: "Detail shots, no clutter" },
    { at: 0.88, title: "End card", note: "Logo-safe space left clear" },
  ],
};

export const editingSteps = [
  "Finding your best moments…",
  "Syncing cuts to the beat…",
  "Adding captions…",
  "Checking the final edit…",
];

// Each tab leads with the problem, then how OneTake fixes it.
export const audiences = [
  {
    id: "creators",
    label: "Creators",
    headline: "Post daily without burning out.",
    pain: "Editing eats the hours you meant to spend shooting.",
    points: ["Hook in the first second, every time", "Trending sound, cuts on the beat", "Captions in Hindi, Telugu, Tamil or English"],
    math: `${priceLabel} a reel. Cheaper than a coffee run.`,
    vibe: "energetic" as VibeId,
    sample: "Street food vlog → 15s reel",
    video: sampleClips.ramen,
    words: ["first", "bite", "is", "UNREAL"],
  },
  {
    id: "businesses",
    label: "Businesses",
    headline: "No editor on payroll. Still look pro.",
    pain: "You know your product. You don't have time to learn editing.",
    points: ["Product first, offer on screen", "Clean captions customers can read", "Square and wide versions too"],
    math: `One reel, ${priceLabel}. No retainer, no monthly fee.`,
    vibe: "cinematic" as VibeId,
    // TODO: swap for a real chai stall / shop clip.
    sample: "Chai stall morning rush → promo",
    video: sampleClips.coffee,
    words: ["fresh", "chai", "every", "morning"],
  },
  {
    id: "agencies",
    label: "Agencies",
    headline: "50 client reels a week, same quality.",
    pain: "First cuts pile up and your editors become the bottleneck.",
    points: ["Storyboard to send before every render", "Revisions with one tap", "Same look across every client reel"],
    math: `50 reels × ${priceLabel} = ${formatINR(PRICE * 50)} a week.`,
    vibe: "aesthetic" as VibeId,
    sample: "Brand shoot → client cut",
    video: sampleClips.nightPortrait,
    words: ["new", "drop", "out", "now"],
  },
  {
    id: "personal",
    label: "Personal",
    headline: "Your trip clips, finally posted.",
    pain: "Hundreds of clips sit in your gallery because editing feels like work.",
    points: ["Finds the best moment for you", "Soft grade, the right song", "Ready for Instagram or WhatsApp status"],
    math: `${priceLabel} to turn a memory into a post.`,
    vibe: "emotional" as VibeId,
    sample: "Goa trip → 30s memory",
    video: sampleClips.beachSunset,
    words: ["best", "trip", "of", "2026"],
  },
];

export type DemoShot = { label: string; caption: string; clip: string; at: number };

/**
 * Pre-made storyboards for the "try it with a sample clip" demo.
 * TODO: replace placeholder stock clips with real Indian sample footage
 * (wedding, chai stall) once those assets exist.
 */
export const demoStoryboards: Record<VibeId, { title: string; shots: DemoShot[]; reel: string; words: [string, string, string, string] }> = {
  energetic: {
    title: "Street food vlog",
    shots: [
      { label: "Hook", caption: "First bite is UNREAL", clip: sampleClips.ramen, at: 2 },
      { label: "Build-up", caption: "Straight off the tawa", clip: sampleClips.foodPose, at: 1 },
      { label: "Big moment", caption: "Wait for it…", clip: sampleClips.ramen, at: 6 },
      { label: "Reactions", caption: "10/10, no notes", clip: sampleClips.friends, at: 3 },
    ],
    reel: sampleClips.ramen,
    words: ["first", "bite", "is", "UNREAL"],
  },
  cinematic: {
    title: "City at night",
    shots: [
      { label: "Hook", caption: "The city wakes up at night", clip: sampleClips.nightPortrait, at: 1 },
      { label: "Build-up", caption: "Neon, noise, no plans", clip: sampleClips.nightPortrait, at: 4 },
      { label: "Big moment", caption: "Then the beat drops", clip: sampleClips.dance, at: 3 },
      { label: "Reactions", caption: "Same time tomorrow?", clip: sampleClips.friends, at: 5 },
    ],
    reel: sampleClips.nightPortrait,
    words: ["city", "after", "dark", "hits"],
  },
  emotional: {
    title: "Wedding day", // TODO: real wedding footage
    shots: [
      { label: "Hook", caption: "The moment she turned around", clip: sampleClips.beachSunset, at: 2 },
      { label: "Build-up", caption: "Everyone we love, one place", clip: sampleClips.friends, at: 2 },
      { label: "Big moment", caption: "Forever starts here", clip: sampleClips.beachSunset, at: 6 },
      { label: "Reactions", caption: "Nani couldn't stop smiling", clip: sampleClips.foodPose, at: 4 },
    ],
    reel: sampleClips.beachSunset,
    words: ["this", "moment", "stays", "forever"],
  },
  funny: {
    title: "Chai stall banter", // TODO: real chai stall footage
    shots: [
      { label: "Hook", caption: "Bhaiya, one cutting chai", clip: sampleClips.foodPose, at: 1 },
      { label: "Build-up", caption: "The pour. The drama.", clip: sampleClips.coffee, at: 3 },
      { label: "Big moment", caption: "Wait for it…", clip: sampleClips.foodPose, at: 5 },
      { label: "Reactions", caption: "Okay that was too good", clip: sampleClips.friends, at: 6 },
    ],
    reel: sampleClips.foodPose,
    words: ["wait", "for", "it", "LOL"],
  },
  aesthetic: {
    title: "Slow Sunday at home",
    shots: [
      { label: "Hook", caption: "Sunday, but make it slow", clip: sampleClips.flowers, at: 1 },
      { label: "Build-up", caption: "Filter coffee first", clip: sampleClips.coffee, at: 2 },
      { label: "Big moment", caption: "Golden hour on the balcony", clip: sampleClips.flowers, at: 5 },
      { label: "Reactions", caption: "Do nothing. Repeat.", clip: sampleClips.beachSunset, at: 3 },
    ],
    reel: sampleClips.flowers,
    words: ["soft", "sunday", "slow", "living"],
  },
};
