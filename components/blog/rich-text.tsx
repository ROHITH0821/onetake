import Link from "next/link";
import { Fragment } from "react";

const TOKEN = /\*\*(.+?)\*\*|\[(.+?)\]\((.+?)\)/g;

/** Renders the two inline marks used in post content: **bold** and [text](href). */
export function RichText({ text }: { text: string }) {
  const parts: React.ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(TOKEN)) {
    const i = m.index ?? 0;
    if (i > last) parts.push(text.slice(last, i));
    if (m[1]) {
      parts.push(<strong key={i} className="font-semibold text-foreground">{m[1]}</strong>);
    } else {
      const href = m[3];
      const cls = "font-medium text-foreground underline decoration-pink decoration-2 underline-offset-4 hover:text-pink";
      parts.push(
        href.startsWith("/") ? (
          <Link key={i} href={href} className={cls}>
            {m[2]}
          </Link>
        ) : href.startsWith("mailto:") ? (
          <a key={i} href={href} className={cls}>
            {m[2]}
          </a>
        ) : (
          <a key={i} href={href} className={cls} rel="noopener noreferrer" target="_blank">
            {m[2]}
          </a>
        ),
      );
    }
    last = i + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts.map((p, k) => <Fragment key={k}>{p}</Fragment>)}</>;
}
