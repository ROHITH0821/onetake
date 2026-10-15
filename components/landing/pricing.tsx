import { ArrowRight, Check, ShieldCheck } from "lucide-react";
import { EDITOR_PRICE_FROM, MAKE_LABEL, priceLabel } from "@/lib/pricing";
import { GradientButton } from "../gradient-button";
import { PriceBadge } from "../price-badge";
import { ScrollZoom, Words } from "../scroll-fx";

const included = [
  "AI edit of your clip",
  "Cuts synced to the beat",
  "Captions in your language",
  "Trending sounds",
  "All five vibes",
  "9:16 export",
  "AI quality check",
];

export function Pricing() {
  return (
    <section id="pricing" className="px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-4xl font-semibold tracking-tight sm:text-6xl">
          <Words text="One price." accent="No subscription." />
        </h2>

        <ScrollZoom className="mx-auto mt-10 max-w-xl">
          <div className="relative overflow-hidden rounded-[2rem] border border-price/40 bg-ink-2 p-6 shadow-[0_0_80px_-30px_var(--color-price)] sm:p-10">
            <div className="flex flex-wrap items-end gap-x-4 gap-y-2">
              <PriceBadge size="xl" />
              <div className="pb-2">
                <p className="text-xl font-semibold">per reel</p>
                <p className="text-sm text-mist">
                  Editors charge <span className="line-through decoration-destructive decoration-2">{EDITOR_PRICE_FROM}</span>
                </p>
              </div>
            </div>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {included.map((item) => (
                <li key={item} className="flex items-center gap-2.5">
                  <span className="grid size-5 shrink-0 place-items-center rounded-full bg-mint text-ink">
                    <Check className="size-3" strokeWidth={4} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <p className="mt-8 flex items-start gap-3 rounded-2xl bg-white/5 p-4 font-medium">
              <ShieldCheck className="mt-0.5 size-5 shrink-0 text-mint" />
              <span>See the storyboard first. You only pay {priceLabel} if you approve it.</span>
            </p>

            <GradientButton href="/create/upload" size="lg" className="mt-6 w-full max-[359px]:text-base">
              {MAKE_LABEL} <ArrowRight />
            </GradientButton>
          </div>
        </ScrollZoom>
      </div>
    </section>
  );
}
