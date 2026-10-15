"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { useState } from "react";
import { audiences, vibeById } from "@/lib/mock-data";
import { PhoneFrame } from "../phone-frame";
import { PriceBadge } from "../price-badge";
import { Reel } from "../reel";
import { Reveal } from "../reveal";
import { ScrollZoom, Words } from "../scroll-fx";

export function AudienceTabs() {
  const [active, setActive] = useState(audiences[0].id);
  const current = audiences.find((a) => a.id === active) ?? audiences[0];
  const vibe = vibeById(current.vibe);

  return (
    <section className="px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
            <Words text="Whatever you shoot," accent="sorted." />
          </h2>
          <div role="tablist" aria-label="Who it's for" className="no-scrollbar -mx-4 mt-8 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0">
            {audiences.map((a) => {
              const selected = a.id === active;
              return (
                <button
                  key={a.id}
                  type="button"
                  role="tab"
                  id={`tab-${a.id}`}
                  aria-selected={selected}
                  aria-controls="audience-panel"
                  onClick={() => setActive(a.id)}
                  className="relative shrink-0 rounded-full border border-white/10 px-5 py-2.5 text-sm font-medium whitespace-nowrap transition-colors hover:bg-white/5"
                >
                  {selected && <motion.span layoutId="audience-pill" className="absolute inset-0 rounded-full bg-brand" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
                  <span className="relative">{a.label}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <ScrollZoom>
          <div id="audience-panel" role="tabpanel" aria-labelledby={`tab-${current.id}`} className="glass mt-6 overflow-hidden rounded-3xl p-5 sm:p-10">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current.id}
                className="grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,15rem)]"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <div>
                  <h3 className="text-3xl font-semibold tracking-tight sm:text-4xl">{current.headline}</h3>
                  <p className="mt-3 max-w-md text-lg text-mist">{current.pain}</p>
                  <ul className="mt-6 space-y-3">
                    {current.points.map((p) => (
                      <li key={p} className="flex items-center gap-3">
                        <span className="grid size-6 shrink-0 place-items-center rounded-full bg-brand">
                          <Check className="size-3.5" strokeWidth={3} />
                        </span>
                        {p}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 inline-flex flex-wrap items-center gap-2 rounded-2xl bg-white/5 px-4 py-3 text-sm font-medium">
                    <PriceBadge size="sm" /> {current.math}
                  </p>
                </div>
                <div className="mx-auto w-[min(60vw,15rem)]">
                  <PhoneFrame>
                    <Reel scenes={vibe.scenes} video={current.video} words={current.words} />
                  </PhoneFrame>
                  <p className="mt-3 text-center text-sm text-mist">Sample edit · {current.sample}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </ScrollZoom>
      </div>
    </section>
  );
}
