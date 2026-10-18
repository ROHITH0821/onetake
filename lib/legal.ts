// Copy for the privacy policy, terms and contact pages. Keep it true to how
// the site works today: the early-access form (name, WhatsApp number,
// optional email, role, optional Instagram) is emailed to the team via Resend
// and the site runs on Vercel. There are no analytics or advertising cookies,
// the /create demo keeps clips on the device, and no payments are taken yet.
// Update this file (and LEGAL_UPDATED) whenever any of that changes.

import type { Block } from "@/content/blog/types";
import { priceLabel, reeditLabel } from "./pricing";
import { CONTACT_HREF, EARLY_ACCESS_HREF, PRIVACY_HREF, site, TERMS_HREF } from "./site";

/** When these pages last changed (YYYY-MM-DD). */
export const LEGAL_UPDATED = "2026-10-18";

/** The contact email as an inline mark, or a visible placeholder until site.contactEmail is set. */
export const contactMark = site.contactEmail ? `[${site.contactEmail}](mailto:${site.contactEmail})` : "**[contact email]**";

export type LegalPage = {
  path: string;
  /** Visible H1 and breadcrumb label. */
  title: string;
  /** <title> tag. */
  metaTitle: string;
  description: string;
  intro: string;
  body: Block[];
};

const { name, operator } = site;

export const privacy: LegalPage = {
  path: PRIVACY_HREF,
  title: "Privacy Policy",
  metaTitle: `Privacy Policy | ${name}`,
  description: `How ${name} collects, uses and protects your details when you join early access or use the site, and how to see, correct or delete them.`,
  intro: `This policy explains what ${name} (run by ${operator}, "we") collects, why, and what you can ask us to do with it. The short version: we only collect what you type into the early-access form, we use it to contact you about ${name}, and we never sell it.`,
  body: [
    { type: "h2", text: "What we collect" },
    { type: "p", text: "**When you join early access**, we collect what you enter in the form:" },
    {
      type: "ul",
      items: [
        "Your name",
        "Your WhatsApp number",
        "Your email address, if you choose to give it",
        "Whether you're a creator, business, personal user or agency",
        "Your Instagram handle, if you choose to give it",
      ],
    },
    { type: "p", text: "We also record the time you signed up." },
    {
      type: "p",
      text: "**When you visit the site**, our hosting provider automatically processes technical data such as your IP address, browser type and the pages requested. This is needed to deliver the site and keep it secure. We don't use analytics, advertising or tracking cookies.",
    },
    {
      type: "p",
      text: `**When you try the demo editor**, the clip you pick stays on your device. It is not uploaded to our servers.`,
    },
    { type: "h2", text: "How we use it" },
    {
      type: "ul",
      items: [
        `To contact you on WhatsApp or email when your early-access spot opens, and with updates about ${name}.`,
        "To understand who is signing up, so we build the right features first.",
        "To keep the site running, secure and free of abuse.",
      ],
    },
    { type: "p", text: "We don't sell your details, rent them out or use them for advertising." },
    { type: "h2", text: "Who we share it with" },
    { type: "p", text: "Only with the service providers we need to run the site, and only for that purpose:" },
    {
      type: "ul",
      items: [
        "**Vercel**, which hosts the website.",
        "**Resend**, which delivers each sign-up to our team by email.",
        "Any tool we use to keep the early-access list, such as a spreadsheet.",
      ],
    },
    {
      type: "p",
      text: "These providers may store data on servers outside India. We may also disclose information if the law requires it.",
    },
    { type: "h2", text: "Your videos" },
    {
      type: "p",
      text: `The ${name} editor isn't open yet. Before we start accepting uploads, we'll update this policy to say exactly how clips are processed, stored and deleted. We'll only use your clips to make your reel.`,
    },
    { type: "h2", text: "Payments" },
    {
      type: "p",
      text: "We don't take payments yet. Before we do, we'll update this policy to name the payment provider we use. We won't store your card or UPI details ourselves.",
    },
    { type: "h2", text: "How long we keep it" },
    {
      type: "p",
      text: `We keep your early-access details until ${name} launches for you, or until you ask us to delete them, whichever comes first. After that we delete them unless the law requires us to keep them.`,
    },
    { type: "h2", text: "Your rights" },
    { type: "p", text: "Under India's Digital Personal Data Protection Act, 2023, you can:" },
    {
      type: "ul",
      items: [
        "Ask for a summary of the personal data we hold about you",
        "Ask us to correct or update it",
        "Ask us to delete it, or withdraw your consent to being contacted",
        "Raise a grievance with us, and if it isn't resolved, with the Data Protection Board of India",
        "Nominate someone to exercise these rights for you",
      ],
    },
    {
      type: "p",
      text: `To do any of this, email ${contactMark} from the address or with the WhatsApp number you signed up with, so we can confirm it's you.`,
    },
    { type: "h2", text: "Children" },
    {
      type: "p",
      text: `${name} is meant for people aged 18 and over. If you're under 18, please ask a parent or guardian before signing up. If we learn we've collected a child's details without that consent, we'll delete them.`,
    },
    { type: "h2", text: "Security" },
    {
      type: "p",
      text: "The site is served only over HTTPS, and only the people who need sign-up details to contact you can see them. No system is perfectly secure, but if a breach affects your data we'll tell you and the authorities as the law requires.",
    },
    { type: "h2", text: "Changes to this policy" },
    {
      type: "p",
      text: `If we change how we use your data, we'll update this page and the date at the top. For significant changes, we'll tell you on WhatsApp or by email before they apply. See also our [Terms of Use](${TERMS_HREF}).`,
    },
    { type: "h2", text: "Contact" },
    { type: "p", text: `Questions or requests about your data: ${contactMark}, or visit our [contact page](${CONTACT_HREF}).` },
  ],
};

export const terms: LegalPage = {
  path: TERMS_HREF,
  title: "Terms of Use",
  metaTitle: `Terms of Use | ${name}`,
  description: `The terms for using the ${name} website and early access, including pricing, approving the edit plan before you pay, your content and our responsibilities.`,
  intro: `These terms apply when you use the ${name} website or join early access. ${name} is run by ${operator} ("we", "us"). By using the site, you agree to them. If you don't agree, please don't use it.`,
  body: [
    { type: "h2", text: "Early access" },
    {
      type: "p",
      text: `${name} is still being built. Joining the [early-access list](${EARLY_ACCESS_HREF}) puts you in line for an invite; it doesn't guarantee access, a launch date or any particular feature. We let people in a few at a time and will contact you when it's your turn.`,
    },
    {
      type: "p",
      text: "The demo editor on this site is a preview of how the product will work.",
    },
    { type: "h2", text: "Pricing and payment" },
    {
      type: "ul",
      items: [
        `The advertised price is **${priceLabel} per video**. A re-edit of a reel you've already received is **${reeditLabel}**.`,
        "You see the edit plan before you pay. If you don't like the plan, you don't pay.",
        "The price shown when you approve your plan is the price you pay. We may change prices for future edits, but never for one you've already approved.",
        "We aren't taking payments yet. When we do, payments will go through a third-party payment provider and their terms will also apply.",
      ],
    },
    { type: "h2", text: "Your content" },
    {
      type: "p",
      text: "You keep all rights to the clips you give us and the reels we make from them. You give us permission to use your clips only to make, deliver and re-edit your reel.",
    },
    { type: "p", text: "By giving us a clip, you confirm that:" },
    {
      type: "ul",
      items: [
        "You own it or have permission to use it",
        "Everyone recognisable in it is okay with it being edited and posted",
        "It's legal, and doesn't harass, defame or exploit anyone",
      ],
    },
    { type: "p", text: "We may refuse or stop editing content that breaks these rules." },
    { type: "h2", text: "Using the site fairly" },
    { type: "p", text: "Please don't:" },
    {
      type: "ul",
      items: [
        "Sign up with someone else's details or false information",
        "Try to break, overload, scrape or get around the security of the site",
        "Copy or resell the site, its design or its content",
      ],
    },
    { type: "h2", text: "Our content" },
    {
      type: "p",
      text: `The ${name} name, logo, website design and blog articles belong to us. You're welcome to share links to them, but please don't copy them as your own.`,
    },
    { type: "h2", text: "No guarantees" },
    {
      type: "p",
      text: "We work hard to make great reels, but we can't promise a reel will get views, followers or sales, or that the site will always be available or error-free. The site and early access are provided as they are.",
    },
    { type: "h2", text: "Limit of our liability" },
    {
      type: "p",
      text: "To the extent the law allows, we aren't responsible for indirect losses such as lost profits or lost followers. If we are responsible for a loss, our total liability is limited to what you paid us for the edit concerned. Nothing in these terms limits rights you have under Indian consumer protection law.",
    },
    { type: "h2", text: "Ending access" },
    {
      type: "p",
      text: `You can leave the early-access list at any time by contacting us. We may remove anyone who breaks these terms.`,
    },
    { type: "h2", text: "Privacy" },
    { type: "p", text: `How we handle your details is explained in our [Privacy Policy](${PRIVACY_HREF}).` },
    { type: "h2", text: "Changes and governing law" },
    {
      type: "p",
      text: "We may update these terms as the product grows. We'll change the date at the top and, for significant changes, tell people on the early-access list. These terms are governed by the laws of India.",
    },
    { type: "h2", text: "Contact" },
    { type: "p", text: `Questions about these terms: ${contactMark}, or visit our [contact page](${CONTACT_HREF}).` },
  ],
};

export const contact: LegalPage = {
  path: CONTACT_HREF,
  title: `Contact ${name}`,
  metaTitle: `Contact | ${name}`,
  description: `Get in touch with the ${name} team about early access, your data, partnerships or press. Email us, or join the early-access list.`,
  intro: `${name} is run by ${operator}.`,
  body: [
    { type: "h2", text: "Email us" },
    { type: "p", text: `The best way to reach us is ${contactMark}. Write to us about:` },
    {
      type: "ul",
      items: [
        "Your early-access spot, or changing the details you signed up with",
        "Seeing, correcting or deleting your data",
        "Partnerships, agencies and press",
        "Anything that isn't working on the site",
      ],
    },
    {
      type: "p",
      text: "If you're writing about your sign-up, please include the WhatsApp number you used so we can find it.",
    },
    { type: "h2", text: "Want to try OneTake?" },
    {
      type: "p",
      text: `You don't need to email us. [Join the early-access list](${EARLY_ACCESS_HREF}) and we'll WhatsApp you when it's your turn to edit for ${priceLabel}.`,
    },
    { type: "h2", text: "Privacy and terms" },
    { type: "p", text: `Read our [Privacy Policy](${PRIVACY_HREF}) and [Terms of Use](${TERMS_HREF}).` },
  ],
};

export const legalPages = [privacy, terms, contact];
