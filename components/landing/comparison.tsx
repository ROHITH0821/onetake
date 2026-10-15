import { Check, Clock, Smartphone, UserRound, X } from "lucide-react";
import { EDITOR_PRICE } from "@/lib/pricing";
import { cn } from "@/lib/utils";
import { PriceBadge } from "../price-badge";
import { FlipIn, Words } from "../scroll-fx";

const options = [
  {
    name: "Hire an editor",
    icon: UserRound,
    price: EDITOR_PRICE,
    priceNote: "per reel",
    points: [
      { ok: false, text: "1–2 days wait" },
      { ok: false, text: "Back-and-forth on revisions" },
      { ok: true, text: "Pro result" },
    ],
  },
  {
    name: "DIY in an editing app",
    icon: Smartphone,
    price: "Free",
    priceNote: "but costs you hours",
    points: [
      { ok: false, text: "About 2 hours per reel" },
      { ok: false, text: "Learning curve" },
      { ok: false, text: "Easy to overuse the same sounds" },
    ],
  },
  {
    name: "OneTake",
    icon: Clock,
    best: true,
    points: [
      { ok: true, text: "About a minute" },
      { ok: true, text: "See the plan before you pay" },
      { ok: true, text: "Captions, sound, beat sync included" },
    ],
  },
];

export function Comparison() {
  return (
    <section className="px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <h2 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">
          <Words text="The obvious" accent="choice." />
        </h2>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {options.map((o, i) => (
            <FlipIn key={o.name} index={i} className="h-full">
              <article
                className={cn(
                  "relative flex h-full flex-col rounded-3xl border p-6",
                  o.best ? "border-price/50 bg-price/[0.06] shadow-[0_0_60px_-25px_var(--color-price)]" : "border-white/10 bg-white/[0.03]",
                )}
              >
                {o.best && (
                  <span className="absolute -top-3 left-6 rounded-full bg-price px-3 py-1 text-xs font-bold uppercase tracking-wide text-ink">Best value</span>
                )}
                <div className="flex items-center gap-2 text-mist">
                  <o.icon className="size-4" />
                  <h3 className={cn("text-base font-semibold", o.best ? "text-foreground" : "text-mist")}>{o.name}</h3>
                </div>
                <div className="mt-4 flex min-h-14 flex-wrap items-baseline gap-2">
                  {o.best ? (
                    <PriceBadge size="lg" suffix="/ reel" />
                  ) : (
                    <>
                      <span className="font-heading text-3xl font-semibold">{o.price}</span>
                      <span className="text-sm text-mist">{o.priceNote}</span>
                    </>
                  )}
                </div>
                <ul className="mt-5 space-y-2.5 text-sm">
                  {o.points.map((p) => (
                    <li key={p.text} className="flex items-center gap-2.5">
                      {p.ok ? <Check className="size-4 shrink-0 text-mint" strokeWidth={3} /> : <X className="size-4 shrink-0 text-destructive" strokeWidth={3} />}
                      <span className={p.ok ? "" : "text-mist"}>{p.text}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </FlipIn>
          ))}
        </div>
      </div>
    </section>
  );
}
