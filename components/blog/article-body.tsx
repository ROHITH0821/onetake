import type { Block } from "@/content/blog/types";
import { RichText } from "./rich-text";

/** Turns a heading into a stable in-page anchor id. */
export const headingId = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

export function ArticleBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-5 text-lg leading-relaxed text-foreground/85">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "h2":
            return (
              <h2 key={i} id={headingId(b.text)} className="scroll-mt-28 pt-6 text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
                {b.text}
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} id={headingId(b.text)} className="scroll-mt-28 pt-2 text-2xl font-semibold leading-snug text-foreground">
                {b.text}
              </h3>
            );
          case "p":
            return (
              <p key={i}>
                <RichText text={b.text} />
              </p>
            );
          case "ul":
          case "ol": {
            const List = b.type;
            return (
              <List key={i} className={`space-y-2.5 pl-6 ${b.type === "ul" ? "list-disc marker:text-pink" : "list-decimal marker:font-semibold marker:text-pink"}`}>
                {b.items.map((item) => (
                  <li key={item} className="pl-1.5">
                    <RichText text={item} />
                  </li>
                ))}
              </List>
            );
          }
          case "note":
            return (
              <aside key={i} className="rounded-2xl border-l-4 border-price bg-white/[0.04] px-5 py-4 text-base text-foreground/90">
                <RichText text={b.text} />
              </aside>
            );
        }
      })}
    </div>
  );
}
