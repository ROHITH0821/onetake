import type { PostInput } from "./types";

// DRAFT COPY: written from the site's own product claims because the
// supplied article copy was missing. Replace with the final copy.
export const post: PostInput = {
  title: "Why Do Most Phone Clips Never Get Posted?",
  slug: "why-phone-clips-never-get-posted",
  description:
    "Most phone clips never get posted because editing them takes more time and skill than shooting did. Here's what gets in the way and how to fix it.",
  excerpt: "The gap between shooting a clip and posting it is mostly editing. Here's what stops people and how to make posting a habit.",
  category: "Posting habits",
  author: "OneTake Team",
  publishedAt: "2026-10-17",
  coverImage: "/blog/video-posting-workflow.webp",
  coverImageAlt: "Illustration of a phone gallery full of unposted clips, with a Post button at the bottom",
  coverCaption: "Most clips stop at the gallery. The step that's missing is usually the edit.",
  keywords: ["why I don't post reels", "post more reels", "phone video gallery", "content consistency", "reel workflow"],
  answer:
    "Most phone clips never get posted because the step between shooting and posting is editing, and editing even a short reel takes time and skill most people don't have on a busy day. Raw footage looks unfinished next to edited reels, so the clip waits in the gallery for a free evening that never comes. Making the edit faster is usually what gets clips posted.",
  body: [
    { type: "h2", text: "What stops people from posting their clips?" },
    { type: "p", text: "Shooting takes seconds. Everything after that is where clips get stuck:" },
    {
      type: "ul",
      items: [
        "**Time.** Trimming, finding a song, syncing cuts and typing captions can take a whole evening.",
        "**Skill.** Editing apps have a learning curve, and the results rarely match the reels you scroll past.",
        "**Perfectionism.** A raw clip feels “not ready”, so it gets saved for later.",
        "**Too many clips.** The longer the backlog, the harder it is to start.",
      ],
    },
    { type: "h2", text: "Is a raw clip ever good enough to post?" },
    { type: "p", text: "Sometimes. A genuinely funny or surprising moment can work as it is. But most raw clips have a slow start, a few seconds of fumbling and no captions, which makes people scroll past before the good part arrives." },
    { type: "p", text: "Small edits fix most of that: open on the best moment, cut the dead air and add captions. Our guide to [turning a raw phone clip into a reel](/blog/turn-phone-clip-into-reel) walks through each one." },
    { type: "h2", text: "How do you build a simple posting habit?" },
    {
      type: "ol",
      items: [
        "**Shoot short.** Clips under a minute are easier to edit and easier to watch.",
        "**Edit the same day.** The longer a clip waits, the less likely it gets posted.",
        "**Use a repeatable style.** Pick a vibe you like and reuse it, so you're not starting from scratch.",
        "**Post at a pace you can keep.** Consistency matters more than a perfect reel.",
      ],
    },
    { type: "h2", text: "Where does OneTake fit?" },
    { type: "p", text: "OneTake shortens the step between shooting and posting. You upload a clip under a minute, tap your vibe, and see the edit plan before you pay ₹99. OneTake opens on your best moment, cuts the dead air, lines cuts up with the beat and adds captions in Hindi, Telugu or English." },
    { type: "note", text: "OneTake gives you a finished reel to review and post yourself. It doesn't post to your accounts for you." },
    { type: "p", text: "OneTake is opening in early access. [Join the list](/#early-access) to get your spot, or read more about [how pricing works](/#pricing)." },
  ],
  faqs: [
    { q: "Should I post raw, unedited clips?", a: "You can, but most raw clips have a slow start and no captions, so viewers scroll past. Opening on the best moment, cutting dead air and adding captions makes a big difference." },
    { q: "How often should I post reels?", a: "Post at a pace you can keep. A steady habit is easier to maintain than bursts of activity, and editing faster makes any pace easier." },
    { q: "Does OneTake post reels for me?", a: "No. OneTake makes the reel and you review it, download it and post it yourself." },
  ],
  relatedPosts: ["turn-phone-clip-into-reel", "hindi-telugu-captions-for-reels"],
};
