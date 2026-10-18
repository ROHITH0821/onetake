import type { PostInput } from "./types";

// DRAFT COPY: written from the site's own product claims because the
// supplied article copy was missing. Replace with the final copy.
export const post: PostInput = {
  title: "How Do You Turn a Raw Phone Clip into a Reel Quickly?",
  seoTitle: "Turn a Raw Phone Clip into a Reel, Fast | OneTake Blog",
  slug: "turn-phone-clip-into-reel",
  description:
    "Turn a raw phone clip into a reel by opening on your best moment, cutting dead air, syncing cuts to the beat and adding readable captions. Here's how.",
  excerpt: "The four edits that make a clip feel like a reel, why they take so long by hand, and a faster way to get them done.",
  category: "Editing tips",
  author: "OneTake Team",
  publishedAt: "2026-10-18",
  coverImage: "/blog/reel-editing-workflow.webp",
  coverImageAlt: "Illustration of a phone turning a dull raw clip into a reel, with coloured clip blocks and a beat waveform on a timeline",
  coverCaption: "A raw clip becomes a reel through a few specific edits: hook, trims, beat-synced cuts and captions.",
  keywords: ["edit reel fast", "turn video into reel", "reel editing tips", "short video editing", "AI reel editor"],
  answer:
    "To turn a raw phone clip into a reel quickly, open on your strongest moment, cut out the pauses and fumbles, line your cuts up with the beat of the song, and add captions people can read with the sound off. Doing these steps by hand in an editing app can take hours. OneTake is built to do them for you: upload a clip under a minute, tap a vibe, and review the edit plan before you pay ₹99.",
  body: [
    { type: "h2", text: "What makes a clip feel like a reel?" },
    { type: "p", text: "A reel and a raw clip often contain the same footage. The difference is a handful of editing decisions that viewers notice in the first few seconds." },
    {
      type: "ul",
      items: [
        "**It opens on the best moment.** The strongest second goes first, not the setup.",
        "**There's no dead air.** Pauses, “umm”s and the fumbling at the start are gone.",
        "**Cuts land on the beat.** Each change of shot lines up with the music.",
        "**Captions are easy to read.** Short lines, timed to what's being said.",
      ],
    },
    { type: "h2", text: "Why does editing a short reel take so long?" },
    { type: "p", text: "Each of those decisions is small, but doing them by hand adds up. You scrub through the whole clip to find the hook, trim slow moments one by one, hunt for a song that fits, then nudge every cut until it sits on a beat." },
    { type: "p", text: "Captions are often the slowest part: typing every word, then timing each line to the speech. If you're new to editing apps, learning the tools takes time too. That's why so many clips stay in the gallery. We cover that in more detail in [why most phone clips never get posted](/blog/why-phone-clips-never-get-posted)." },
    { type: "h2", text: "How can you edit a reel faster by hand?" },
    { type: "p", text: "If you're editing yourself, a fixed order saves a lot of back-and-forth:" },
    {
      type: "ol",
      items: [
        "**Trim first.** Cut the obvious dead air before doing anything else.",
        "**Pick your hook.** Decide which moment opens the reel and move it to the start.",
        "**Choose the song before you cut.** It's much easier to cut to a beat you already have.",
        "**Cut on the beat.** Place shot changes on the strongest beats, not just anywhere.",
        "**Caption last.** Keep lines short, one to three words at a time, and check spellings.",
      ],
    },
    { type: "note", text: "Tip: keep your source clip short. A tight clip under a minute is far quicker to edit than a long recording." },
    { type: "h2", text: "How does OneTake help?" },
    { type: "p", text: "OneTake does the editing steps above for you. It's built for short clips under one minute and works in three taps:" },
    {
      type: "ol",
      items: [
        "**Upload** a clip straight from your phone.",
        "**Tap your vibe**, for example energetic, cinematic or emotional.",
        "**Review the edit plan**, then get your reel ready to post.",
      ],
    },
    { type: "h3", text: "What you still decide" },
    { type: "p", text: "You choose the vibe and approve the plan. The plan shows which moments are used, in what order, so you can check the edit before paying. Not happy with the plan? Don't pay. If you want changes after your reel is made, a re-edit of the same reel is ₹79. See [pricing](/#pricing) for details." },
    { type: "p", text: "OneTake is opening in early access. You can [join the list](/#early-access) and edit your first clip for ₹99 when your spot opens." },
  ],
  faqs: [
    { q: "How long can my clip be?", a: "OneTake works with clips under one minute. Short clips mean faster, sharper edits." },
    { q: "Do I need editing skills to use OneTake?", a: "No. You upload a clip, tap a vibe and review the edit plan. If you can tap, you can use OneTake." },
    { q: "What if I don't like the edit plan?", a: "You approve the edit plan before paying, so if it doesn't look right, you don't pay. After the reel is made, a re-edit of the same reel is ₹79." },
  ],
  relatedPosts: ["why-phone-clips-never-get-posted", "hindi-telugu-captions-for-reels"],
};
