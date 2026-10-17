import { ArrowRight, Check } from "lucide-react";
import { pricing } from "@/lib/content";
import { CTA_LABEL, CTA_SHORT } from "@/lib/pricing";
import { cn } from "@/lib/utils";
import { PriceBadge } from "../price-badge";
import { Reveal } from "../reveal";
import { ScrollZoom, Words } from "../scroll-fx";
import { EarlyAccessButton } from "../early-access/early-access";

export function Pricing() {
  return (
    <section id="pricing" className="px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
          <Words text={pricing.title} accent={pricing.titleAccent} />
        </h2>

        <Reveal delay={0.1}>
          <div className="mt-10 grid grid-cols-3 gap-2 sm:gap-4">
            {pricing.comparison.map((row) => (
              <div key={row.option} className={cn("rounded-3xl p-px", row.highlight ? "bg-brand glow" : "bg-white/10")}>
                <div className={cn("flex h-full flex-col rounded-[calc(1.5rem-1px)] p-3 sm:p-6", row.highlight ? "bg-ink-2" : "bg-ink")}>
                  <h3 className={cn("text-xs font-semibold sm:text-base", row.highlight ? "text-foreground" : "text-mist")}>{row.option}</h3>
                  <p className="mt-3 font-heading text-base font-semibold leading-tight sm:text-2xl">
                    {row.highlight ? <PriceBadge size="sm" className="sm:h-9 sm:px-3.5 sm:text-lg" /> : row.cost}
                  </p>
                  <p className={cn("mt-2 text-xs sm:text-base", row.highlight ? "font-semibold" : "text-mist")}>{row.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <ScrollZoom className="mx-auto mt-8 max-w-md">
          <div className="rounded-[2rem] border border-price/40 bg-ink-2 p-6 shadow-[0_0_80px_-30px_var(--color-price)] sm:p-8">
            <div className="flex items-end gap-3">
              <PriceBadge size="xl" />
              <p className="pb-2 text-lg font-semibold">{pricing.card.per}</p>
            </div>
            <ul className="mt-6 space-y-3">
              {pricing.card.bullets.map((b) => (
                <li key={b} className="flex items-center gap-2.5">
                  <span className="grid size-5 shrink-0 place-items-center rounded-full bg-mint text-ink">
                    <Check className="size-3" strokeWidth={4} />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
            <EarlyAccessButton size="lg" className="mt-7 w-full">
              <span className="max-[359px]:hidden">{CTA_LABEL}</span>
              <span className="min-[360px]:hidden">{CTA_SHORT}</span>
              <ArrowRight />
            </EarlyAccessButton>
          </div>
        </ScrollZoom>
      </div>
    </section>
  );
}
