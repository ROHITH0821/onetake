// All landing page copy lives here, so text can be edited without touching
// components. Prices come from ./pricing; footage from ./mock-data.

import { sampleClips } from "./mock-data";
import { EDITOR_PRICE, priceLabel, reeditLabel } from "./pricing";

export const meta = {
  title: `OneTake — AI reel editor for ${priceLabel} | Hook, beat-sync, captions done for you`,
  description: `Shot a clip? We'll make it a reel. Pro-level editing in minutes for ${priceLabel}, and you see the plan before you pay.`,
};

// "#…" links are homepage sections; use navHref() so they work from other pages too.
export const nav = [
  { href: "#what-we-do", label: "What we do" },
  { href: "#examples", label: "Examples" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
  { href: "/blog", label: "Blog" },
];

/** Section anchors stay in-page on the homepage and point back to it elsewhere. */
export const navHref = (href: string, onHome: boolean) => (href.startsWith("#") && !onHome ? `/${href}` : href);

export const hero = {
  headline: "Shot a clip?",
  headlineAccent: "We'll make it a reel.",
  subtext: `Pro-level editing in minutes, for ${priceLabel}.`,
  note: "See the edit plan before you pay.",
};

// The same evening, two ways: editing a 15-second reel by hand vs with OneTake.
export const problem = {
  title: "A 15-second reel",
  titleAccent: "takes hours to edit.",
  diy: {
    label: "Editing it yourself",
    steps: [
      { time: "7:00 PM", task: "Scroll through all your footage" },
      { time: "7:25 PM", task: "Find a moment worth opening on" },
      { time: "7:45 PM", task: "Trim pauses and bad takes" },
      { time: "8:10 PM", task: "Hunt for a song that fits" },
      { time: "8:40 PM", task: "Line up every cut with the beat" },
      { time: "9:20 PM", task: "Type and time 60+ captions" },
      { time: "10:15 PM", task: "Export, spot a mistake, fix it, export again" },
    ],
    total: "About 3.5 hours gone",
  },
  ours: {
    label: "With OneTake",
    steps: [
      { time: "7:00 PM", task: "Upload your clip" },
      { time: "7:01 PM", task: "Tap your vibe" },
      { time: "7:02 PM", task: "Approve the edit plan" },
      { time: "7:05 PM", task: "Your reel is ready to post" },
    ],
    total: "A few minutes, for",
    note: "The rest of the evening is yours.",
  },
  closing: "That's why most clips never get posted.",
};

export const whatWeDo = {
  title: "We do the",
  titleAccent: "hard parts.",
  // `saves` is roughly how many minutes that job takes by hand.
  // TODO: replace placeholder stock clips with real before/after footage.
  items: [
    { id: "hook", icon: "sparkles", name: "Best moment first", line: "Finds your strongest second and opens on it.", saves: 15, clip: sampleClips.dance },
    { id: "dead-air", icon: "scissors", name: "Dead air, gone", line: "Pauses, “umm”s and fumbling, trimmed.", saves: 10, clip: sampleClips.ramen },
    { id: "beat", icon: "audio", name: "Cuts on the beat", line: "Every cut lands exactly on a beat.", saves: 25, clip: sampleClips.nightPortrait },
    { id: "captions", icon: "captions", name: "Captions in your language", line: "Hindi, Telugu or English, timed word by word.", saves: 30, clip: sampleClips.friends },
  ],
  // Shown under the cards: total time saved, then the price.
  valueLead: "of editing in every reel.",
  valueTail: "Done for you, for",
  editorNote: "An editor charges",
  editorNoteTail: "for the same work.",
  captionSamples: [
    { lang: "हिंदी", words: ["सबसे", "बढ़िया", "दिन"] },
    { lang: "తెలుగు", words: ["అద్భుతమైన", "రోజు"] },
    { lang: "English", words: ["best", "day", "ever"] },
  ],
};

// TODO: replace placeholder stock clips with real before/after footage for each example.
// `cuts` are the moments (seconds into the clip) the reel jumps between on each beat.
export const examples = {
  title: "Same clip.",
  titleAccent: "Different league.",
  hint: "Drag the handle. Left is what you shot, right is what you post.",
  items: [
    {
      id: "street-food",
      label: "Street food",
      media: sampleClips.ramen,
      cuts: [6.2, 1.4, 9.8, 3.6, 12.1, 7.9],
      caption: ["first", "bite", "is", "UNREAL", "no", "notes"],
      raw: { duration: "0:47", issues: ["22s before anything happens", "Shaky, tilted", "No music, no captions"] },
      reel: { duration: "0:15", fixes: ["Opens on the first bite", "14 cuts on the beat", "Hindi captions"] },
    },
    {
      id: "shop-promo",
      label: "Shop promo",
      media: sampleClips.coffee,
      cuts: [8.5, 2.2, 11.4, 5.1, 0.6, 12.8],
      caption: ["fresh", "chai", "every", "morning", "visit", "today"],
      raw: { duration: "0:38", issues: ["Long setup before the pour", "Product barely visible", "No offer on screen"] },
      reel: { duration: "0:12", fixes: ["Pour moment up front", "11 cuts on the beat", "English captions"] },
    },
    {
      id: "birthday",
      label: "Birthday",
      media: sampleClips.friends,
      cuts: [5.4, 1.2, 8.6, 3.1, 9.7, 6.8],
      caption: ["best", "day", "with", "my", "people", "ever"],
      raw: { duration: "3:02", issues: ["3 minutes of waiting around", "Shaky phone footage", "No music, no captions"] },
      reel: { duration: "0:30", fixes: ["Opens on the big moment", "9 cuts on the beat", "Telugu captions"] },
    },
  ],
};

export const pricing = {
  title: `${priceLabel} a reel.`,
  titleAccent: "That's it.",
  comparison: [
    { option: "Hire an editor", cost: EDITOR_PRICE, time: "1–3 days" },
    { option: "Do it yourself", cost: "“Free”", time: "2–4 hours" },
    { option: "OneTake", cost: priceLabel, time: "Minutes", highlight: true },
  ],
  card: {
    per: "per video",
    bullets: ["See the edit plan before you pay", "Not happy with the plan? Don't pay.", `Want a re-edit of your reel? ${reeditLabel}`],
  },
};

export const faq = {
  title: "Quick",
  titleAccent: "answers.",
  items: [
    { q: "What if I don't like the edit?", a: `You approve the edit plan before paying. Want changes after? A re-edit of the same reel is ${reeditLabel}.` },
    // TODO: fill in the real retention period.
    { q: "Is my video private?", a: "Your clips are only used to make your reel and are deleted after [X] days." },
    { q: "Why only clips under 1 minute?", a: "Short clips mean faster, sharper edits. Longer videos are coming soon." },
    { q: "Do I need editing skills?", a: "None. If you can tap, you can use OneTake." },
  ],
};

export const finalCta = {
  headline: "Your best clip is",
  headlineEnd: "waiting in your gallery.",
  subtext: "A few taps. See what it becomes.",
};

export const earlyAccess = {
  title: "Get early access",
  subtitle: `We're letting people in a few at a time. Join the list and we'll WhatsApp you when it's your turn to edit for ${priceLabel}.`,
  submit: "Join the early access list",
  privacy: "We'll only use this to contact you about OneTake.",
  successTitle: "You're on the list!",
  successBody: "We'll WhatsApp you as soon as your spot opens up.",
};

export const footer = {
  tagline: `Pro-level reels for ${priceLabel}. For everyone with a clip and a story.`,
};
