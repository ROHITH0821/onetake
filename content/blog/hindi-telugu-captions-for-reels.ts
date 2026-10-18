import type { PostInput } from "./types";

// DRAFT COPY: written from the site's own product claims because the
// supplied article copy was missing. Replace with the final copy.
export const post: PostInput = {
  title: "How Do You Add Hindi or Telugu Captions to a Reel?",
  seoTitle: "How to Add Hindi or Telugu Captions to Reels | OneTake",
  slug: "hindi-telugu-captions-for-reels",
  description:
    "Add Hindi or Telugu captions to a reel: transcribe the speech, time short lines to each word and keep them easy to read. By hand or with OneTake.",
  excerpt: "How to caption reels in Hindi or Telugu so they're easy to read, the mistakes to avoid, and a faster way to get word-by-word captions.",
  category: "Captions",
  author: "OneTake Team",
  publishedAt: "2026-10-16",
  coverImage: "/blog/hindi-telugu-captions.webp",
  coverImageAlt: "Illustration of a phone showing a person on screen with caption labels for Hindi, Telugu and English",
  coverCaption: "Captions in the language your audience reads, timed word by word.",
  keywords: ["Hindi captions for reels", "Telugu captions for reels", "add subtitles to reels", "regional language captions", "Indian language reels"],
  answer:
    "To add Hindi or Telugu captions to a reel, transcribe what's said, split it into short lines of one to three words, and time each line to the speech so it appears as the words are spoken. Use the script your audience reads most and check every spelling before posting. OneTake does this for you, creating captions in Hindi, Telugu or English timed word by word.",
  body: [
    { type: "h2", text: "Why do captions matter on reels?" },
    { type: "p", text: "Plenty of people scroll with the sound off, in public or late at night. Without captions, a reel that depends on speech loses them in the first second. Captions also help viewers follow fast talk, mixed languages and noisy backgrounds." },
    { type: "h2", text: "Should captions be in Hindi or Telugu script, or in English letters?" },
    { type: "p", text: "Match how your audience reads. Many viewers are comfortable with the native script, for example **सबसे बढ़िया दिन** in Hindi or **అద్భుతమైన రోజు** in Telugu. Others read Hindi or Telugu written in English letters more easily. If you're not sure, look at how your audience writes in your comments and follow that." },
    { type: "note", text: "Whichever you choose, stay consistent within a reel. Switching scripts mid-reel makes captions harder to follow." },
    { type: "h2", text: "How do you add Hindi or Telugu captions by hand?" },
    {
      type: "ol",
      items: [
        "**Transcribe the speech.** Write out exactly what's said, in the language and script you've chosen.",
        "**Split into short lines.** One to three words per caption is easiest to read on a phone.",
        "**Time each line.** Make each caption appear as the words are spoken, not before.",
        "**Check the font.** Make sure the font you use supports Devanagari or Telugu script, so letters don't break or show as boxes.",
        "**Proofread.** Read every caption once with the sound on and once with it off.",
      ],
    },
    { type: "h2", text: "What are the most common caption mistakes?" },
    {
      type: "ul",
      items: [
        "Long sentences that cover half the screen.",
        "Captions that run ahead of or behind the speech.",
        "Fonts that don't support the script, showing broken letters.",
        "Spelling mistakes, which are easy to make when typing Indian scripts on a phone.",
        "Captions placed over faces or important action.",
      ],
    },
    { type: "h2", text: "How does OneTake handle captions?" },
    { type: "p", text: "OneTake creates captions in Hindi, Telugu or English, timed word by word, as part of the edit. You choose the caption language while picking your vibe, then see the edit plan before you pay ₹99. The same edit also opens on your best moment, cuts the dead air and lines cuts up with the beat. Read more in [how to turn a raw phone clip into a reel](/blog/turn-phone-clip-into-reel)." },
    { type: "p", text: "OneTake is opening in early access. [Join the list](/#early-access) to caption your first reel, or see [pricing](/#pricing)." },
  ],
  faqs: [
    { q: "Which caption languages does OneTake support?", a: "OneTake creates captions in Hindi, Telugu or English, timed word by word." },
    { q: "How many words should one caption show?", a: "One to three words at a time is easiest to read on a phone, especially for fast speech." },
    { q: "Do captions cost extra on OneTake?", a: "Captions are part of the edit OneTake makes. The price is ₹99 per video, and you see the edit plan before you pay." },
  ],
  relatedPosts: ["turn-phone-clip-into-reel", "why-phone-clips-never-get-posted"],
};
