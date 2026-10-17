"use client";

import { motion } from "framer-motion";
import { Check, Clock, X } from "lucide-react";
import { useState } from "react";
import { examples } from "@/lib/content";
import { BeforeAfterSlider } from "../before-after-slider";
import { Reel } from "../reel";
import { Reveal } from "../reveal";
import { ScrollZoom, Words } from "../scroll-fx";
import { CutReel } from "./cut-reel";

// Raw timeline: dead air (red) around the few seconds worth keeping.
const rawTimeline = [
  { w: 30, dead: true },
  { w: 10 },
  { w: 22, dead: true },
  { w: 12 },
  { w: 26, dead: true },
];

function RawOverlay({ duration }: { duration: string }) {
  return (
    <div className="pointer-events-none absolute inset-x-3 bottom-3" aria-hidden>
      <div className="flex flex-wrap gap-1">
        <span className="rounded-full bg-black/60 px-2 py-0.5 text-[10px]">No music</span>
        <span className="rounded-full bg-black/60 px-2 py-0.5 text-[10px]">No captions</span>
      </div>
      <div className="mt-1.5 flex h-2.5 gap-0.5 overflow-hidden rounded-full">
        {rawTimeline.map((s, i) => (
          <span key={i} className={s.dead ? "bg-destructive/80" : "bg-white/70"} style={{ width: `${s.w}%` }} />
        ))}
      </div>
      <div className="mt-1 flex justify-between text-[10px] text-white/80">
        <span>dead air in red</span>
        <span className="font-mono">{duration}</span>
      </div>
    </div>
  );
}

export function Examples() {
  const [active, setActive] = useState(examples.items[0].id);
  const current = examples.items.find((e) => e.id === active) ?? examples.items[0];

  return (
    <section id="examples" className="overflow-x-clip px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <div className="md:text-center">
          <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
            <Words text={examples.title} accent={examples.titleAccent} />
          </h2>
          <p className="mt-3 text-lg text-mist">{examples.hint}</p>
        </div>

        <Reveal delay={0.1}>
          <div role="tablist" aria-label="Examples" className="no-scrollbar -mx-4 mt-8 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:justify-center sm:px-0">
            {examples.items.map((e) => {
              const selected = e.id === active;
              return (
                <button
                  key={e.id}
                  type="button"
                  role="tab"
                  id={`example-tab-${e.id}`}
                  aria-selected={selected}
                  aria-controls="example-panel"
                  onClick={() => setActive(e.id)}
                  className="relative shrink-0 rounded-full border border-white/10 px-5 py-2.5 text-sm font-medium whitespace-nowrap transition-colors hover:bg-white/5"
                >
                  {selected && <motion.span layoutId="example-pill" className="absolute inset-0 rounded-full bg-brand" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
                  <span className="relative">{e.label}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <div
          id="example-panel"
          role="tabpanel"
          aria-labelledby={`example-tab-${current.id}`}
          className="mt-8 grid items-center gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,22rem)_minmax(0,1fr)]"
        >
          {/* Raw, as shot */}
          <motion.div key={`raw-${current.id}`} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} className="order-2 md:order-none">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
              <p className="flex items-center justify-between text-sm font-semibold text-mist">
                What you shot
                <span className="inline-flex items-center gap-1 font-mono">
                  <Clock className="size-3.5" /> {current.raw.duration}
                </span>
              </p>
              <ul className="mt-3 space-y-2 text-sm">
                {current.raw.issues.map((t) => (
                  <li key={t} className="flex items-start gap-2 text-mist">
                    <X className="mt-0.5 size-4 shrink-0 text-destructive" strokeWidth={3} /> {t}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <ScrollZoom className="order-1 md:order-none">
            <BeforeAfterSlider
              key={current.id}
              scrollWipe
              className="mx-auto aspect-[9/14] w-full max-w-sm glow"
              before={
                <>
                  <Reel variant="raw" video={current.media} time={current.raw.duration} />
                  <RawOverlay duration={current.raw.duration} />
                </>
              }
              after={<CutReel src={current.media} cuts={current.cuts} caption={current.caption} duration={current.reel.duration} />}
            />
          </ScrollZoom>

          {/* Reel, as posted */}
          <motion.div key={`reel-${current.id}`} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} className="order-3 md:order-none">
            <div className="rounded-3xl border border-mint/25 bg-mint/[0.05] p-5">
              <p className="flex items-center justify-between text-sm font-semibold">
                What you post
                <span className="inline-flex items-center gap-1 font-mono text-mint">
                  <Clock className="size-3.5" /> {current.reel.duration}
                </span>
              </p>
              <ul className="mt-3 space-y-2 text-sm">
                {current.reel.fixes.map((t) => (
                  <li key={t} className="flex items-start gap-2 font-medium">
                    <Check className="mt-0.5 size-4 shrink-0 text-mint" strokeWidth={3} /> {t}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
