"use client";

import { motion } from "framer-motion";
import { Check, Clock, Sparkles } from "lucide-react";
import { problem } from "@/lib/content";
import { cn } from "@/lib/utils";
import { PriceBadge } from "../price-badge";
import { Reveal } from "../reveal";
import { Words } from "../scroll-fx";

type Step = { time: string; task: string };

/** A vertical timeline of an evening; the line draws as the steps appear. */
function Timeline({ steps, tone }: { steps: Step[]; tone: "diy" | "ours" }) {
  const diy = tone === "diy";
  return (
    <ol className="relative mt-6 space-y-5 pl-8">
      <motion.span
        className={cn("absolute bottom-2 left-[0.6rem] top-2 w-px origin-top", diy ? "bg-destructive/40" : "bg-mint/50")}
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, margin: "-15% 0px" }}
        transition={{ duration: diy ? 1.6 : 0.6, ease: [0.16, 1, 0.3, 1] }}
        aria-hidden
      />
      {steps.map((s, i) => (
        <motion.li
          key={s.time + s.task}
          className="relative"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ delay: i * (diy ? 0.18 : 0.12), duration: 0.4 }}
        >
          <span
            className={cn(
              "absolute -left-8 top-0.5 grid size-5 place-items-center rounded-full",
              diy ? "border border-destructive/60 bg-ink-2" : "bg-mint text-ink",
            )}
            aria-hidden
          >
            {diy ? <span className="size-1.5 rounded-full bg-destructive" /> : <Check className="size-3" strokeWidth={4} />}
          </span>
          <p className="font-mono text-xs text-mist">{s.time}</p>
          <p className={cn("mt-0.5 text-base leading-snug", diy ? "text-foreground/90" : "font-medium")}>{s.task}</p>
        </motion.li>
      ))}
    </ol>
  );
}

export function Problem() {
  const { diy, ours } = problem;

  return (
    <section id="problem" className="px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <h2 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">
          <Words text={problem.title} accent={problem.titleAccent} />
        </h2>

        <div className="mt-10 grid items-start gap-4 md:grid-cols-2 md:gap-6">
          <Reveal className="h-full">
            <article className="flex h-full flex-col rounded-3xl border border-white/10 bg-ink-2 p-6 sm:p-8">
              <h3 className="flex items-center gap-2.5 text-lg font-semibold">
                <span className="grid size-8 place-items-center rounded-lg bg-destructive/15 text-destructive">
                  <Clock className="size-4" />
                </span>
                {diy.label}
              </h3>
              <Timeline steps={diy.steps} tone="diy" />
              <p className="mt-auto border-t border-white/10 pt-5 font-heading text-2xl font-semibold text-destructive">{diy.total}</p>
            </article>
          </Reveal>

          <Reveal delay={0.15} className="md:sticky md:top-28">
            <article className="rounded-3xl bg-brand p-px glow">
              <div className="rounded-[calc(1.5rem-1px)] bg-ink-2 p-6 sm:p-8">
                <h3 className="flex items-center gap-2.5 text-lg font-semibold">
                  <span className="grid size-8 place-items-center rounded-lg bg-brand">
                    <Sparkles className="size-4" />
                  </span>
                  {ours.label}
                </h3>
                <Timeline steps={ours.steps} tone="ours" />
                <div className="mt-6 border-t border-white/10 pt-5">
                  <p className="flex flex-wrap items-center gap-2 font-heading text-2xl font-semibold text-price">
                    {ours.total} <PriceBadge size="md" />
                  </p>
                  <p className="mt-2 text-mist">{ours.note}</p>
                </div>
              </div>
            </article>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <p className="mt-10 font-heading text-2xl font-semibold sm:text-3xl">{problem.closing}</p>
        </Reveal>
      </div>
    </section>
  );
}
