"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { whatWeDo } from "@/lib/content";
import { lite } from "@/lib/mock-data";
import { EDITOR_PRICE_FROM } from "@/lib/pricing";
import { cn } from "@/lib/utils";
import { PriceBadge } from "../price-badge";
import { Reveal } from "../reveal";
import { FlipIn, Words } from "../scroll-fx";
import { icons } from "./icon-map";

const LOOP = 4;
const loop = (times: number[]) => ({ duration: LOOP, repeat: Infinity, times, ease: "easeInOut" as const });

/** A still frame from the sample clip. */
/**
 * A still frame from the sample clip, at 360p. Nothing is fetched until the
 * card is near the screen, so these don't compete with the hero on load.
 */
function Frame({ clip, at, className }: { clip: string; at: number; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setNear(true);
        observer.disconnect();
      },
      { rootMargin: "300px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={near ? `${lite(clip)}#t=${at}` : undefined}
      preload="metadata"
      muted
      playsInline
      className={cn("absolute inset-0 size-full object-cover", className)}
    />
  );
}

function Tag({ children, tone = "dark", className }: { children: React.ReactNode; tone?: "dark" | "price" | "bad"; className?: string }) {
  return (
    <span
      className={cn(
        "rounded-full px-2 py-0.5 text-[10px] font-bold",
        tone === "dark" && "bg-black/65 text-white",
        tone === "price" && "bg-price text-ink",
        tone === "bad" && "bg-destructive text-ink",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** The best moment slides from deep in the clip to the very first second. */
function HookDemo({ clip }: { clip: string }) {
  return (
    <>
      <div className="relative flex-1 overflow-hidden rounded-xl">
        <Frame clip={clip} at={3} />
        <motion.div className="absolute left-2 top-2" animate={{ opacity: [0, 0, 1, 1, 0] }} transition={loop([0, 0.45, 0.55, 0.92, 1])}>
          <Tag tone="price">HOOK · 0:00</Tag>
        </motion.div>
      </div>
      <div className="@container relative mt-2 h-6 rounded-md bg-white/10">
        <motion.span
          className="absolute inset-y-0 left-0 w-[18%] rounded-md bg-price shadow-[0_0_14px_var(--color-price)]"
          animate={{ x: ["450%", "450%", "0%", "0%", "450%"] }}
          transition={loop([0, 0.3, 0.5, 0.92, 1])}
        />
        <motion.span className="absolute right-1.5 top-1/2 -translate-y-1/2 text-[9px] text-mist" animate={{ opacity: [1, 1, 0, 0, 1] }} transition={loop([0, 0.3, 0.4, 0.92, 1])}>
          best moment at 0:22
        </motion.span>
      </div>
    </>
  );
}

const deadAir = [
  { w: 24, dead: true },
  { w: 16 },
  { w: 18, dead: true },
  { w: 20 },
  { w: 22, dead: true },
];

/** Red dead-air chunks collapse and the clip shrinks from 0:47 to 0:15. */
function DeadAirDemo({ clip }: { clip: string }) {
  return (
    <>
      <div className="relative flex-1 overflow-hidden rounded-xl">
        <Frame clip={clip} at={4} />
        <div className="absolute left-2 top-2 grid">
          <motion.span className="col-start-1 row-start-1" animate={{ opacity: [1, 1, 0, 0, 1] }} transition={loop([0, 0.35, 0.5, 0.92, 1])}>
            <Tag tone="bad">0:47 raw</Tag>
          </motion.span>
          <motion.span className="col-start-1 row-start-1" animate={{ opacity: [0, 0, 1, 1, 0] }} transition={loop([0, 0.35, 0.5, 0.92, 1])}>
            <Tag tone="price">0:15 reel</Tag>
          </motion.span>
        </div>
      </div>
      <div className="mt-2 flex h-6 gap-0.5 overflow-hidden rounded-md">
        {deadAir.map((s, i) =>
          s.dead ? (
            <motion.span
              key={i}
              className="h-full rounded-sm bg-[repeating-linear-gradient(45deg,rgb(251_113_133/0.7)_0_3px,rgb(251_113_133/0.25)_3px_6px)]"
              animate={{ width: [`${s.w}%`, `${s.w}%`, "0%", "0%", `${s.w}%`] }}
              transition={loop([0, 0.3, 0.5, 0.92, 1])}
            />
          ) : (
            <motion.span
              key={i}
              className="h-full rounded-sm bg-white/75"
              animate={{ width: [`${s.w}%`, `${s.w}%`, "50%", "50%", `${s.w}%`] }}
              transition={loop([0, 0.3, 0.5, 0.92, 1])}
            />
          ),
        )}
      </div>
    </>
  );
}

/** Opacity keyframes that show shot `i` of `n` for its slice of the loop, with hard cuts. */
const hardSwitch = (i: number, n: number) => {
  const start = i / n;
  const end = (i + 1) / n;
  const e = 0.001;
  const times = [0, Math.max(0, start - e), start, end - e, Math.min(1, end), 1];
  const values = [i === 0 ? 1 : 0, i === 0 ? 1 : 0, 1, 1, 0, 0];
  return { times, values };
};

const wave = Array.from({ length: 32 }, (_, i) => 25 + ((i * 37) % 75));

/** Three shots cutting on the beat markers under a waveform. */
function BeatDemo({ clip }: { clip: string }) {
  const shots = [1, 5, 9];
  return (
    <>
      <div className="relative flex-1 overflow-hidden rounded-xl">
        {shots.map((at, i) => (
          <motion.div
            key={at}
            className="absolute inset-0"
            animate={{ opacity: hardSwitch(i, shots.length).values, scale: [1, 1.08, 1] }}
            transition={{ opacity: { duration: 2.1, repeat: Infinity, times: hardSwitch(i, shots.length).times, ease: "linear" }, scale: { duration: 0.7, repeat: Infinity } }}
          >
            <Frame clip={clip} at={at} />
          </motion.div>
        ))}
        <motion.div className="absolute inset-0 bg-white" animate={{ opacity: [0.35, 0] }} transition={{ duration: 0.7, repeat: Infinity, ease: "easeOut" }} />
        <div className="absolute left-2 top-2">
          <Tag>cut · beat · cut · beat</Tag>
        </div>
      </div>
      <div className="relative mt-2 flex h-6 items-center gap-[2px] rounded-md bg-white/5 px-1">
        {wave.map((h, i) => (
          <span key={i} className={cn("flex-1 rounded-full", i % 8 === 0 ? "bg-orange" : "bg-mint/60")} style={{ height: `${h}%` }} />
        ))}
        {[0, 1, 2, 3].map((i) => (
          <motion.span
            key={i}
            className="absolute inset-y-0 w-0.5 bg-price"
            style={{ left: `${3 + i * 25}%` }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.7, repeatDelay: 2.1 }}
          />
        ))}
      </div>
    </>
  );
}

/** Captions typing in word by word, cycling Hindi → Telugu → English. */
function CaptionDemo({ clip }: { clip: string }) {
  const samples = whatWeDo.captionSamples;
  const span = 1 / samples.length;
  return (
    <>
      <div className="relative flex-1 overflow-hidden rounded-xl">
        <Frame clip={clip} at={2} />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/70 to-transparent" />
        {samples.map((s, i) => {
          const start = i * span;
          return (
            <motion.div
              key={s.lang}
              className="absolute inset-x-2 bottom-2 flex flex-wrap justify-center gap-1"
              animate={{ opacity: [0, 0, 1, 1, 0, 0] }}
              transition={{ duration: 7.2, repeat: Infinity, times: [0, start, start + 0.01, start + span - 0.01, start + span, 1] }}
            >
              {s.words.map((w, k) => (
                <motion.span
                  key={w}
                  className="rounded bg-white px-1.5 py-0.5 text-xs font-bold text-ink"
                  animate={{ opacity: [0, 0, 1, 1] }}
                  transition={{ duration: 7.2, repeat: Infinity, times: [0, start + (k * span) / 4, start + (k * span) / 4 + 0.01, 1] }}
                >
                  {w}
                </motion.span>
              ))}
            </motion.div>
          );
        })}
      </div>
      <div className="mt-2 flex h-6 items-center gap-1">
        {samples.map((s, i) => {
          const start = i * span;
          return (
            <motion.span
              key={s.lang}
              className="flex h-full flex-1 items-center justify-center rounded-md text-[10px] font-semibold"
              animate={{ backgroundColor: ["rgba(255,255,255,0.06)", "rgba(255,255,255,0.06)", "rgba(198,242,78,1)", "rgba(198,242,78,1)", "rgba(255,255,255,0.06)", "rgba(255,255,255,0.06)"], color: ["#a9a9bd", "#a9a9bd", "#0b0b0f", "#0b0b0f", "#a9a9bd", "#a9a9bd"] }}
              transition={{ duration: 7.2, repeat: Infinity, times: [0, start, start + 0.01, start + span - 0.01, start + span, 1] }}
            >
              {s.lang}
            </motion.span>
          );
        })}
      </div>
    </>
  );
}

const demos: Record<string, (props: { clip: string }) => React.ReactNode> = {
  hook: HookDemo,
  "dead-air": DeadAirDemo,
  beat: BeatDemo,
  captions: CaptionDemo,
};

export function WhatWeDo() {
  const totalMinutes = whatWeDo.items.reduce((sum, i) => sum + i.saves, 0);

  return (
    <section id="what-we-do" className="px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
          <Words text={whatWeDo.title} accent={whatWeDo.titleAccent} />
        </h2>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {whatWeDo.items.map((item, i) => {
            const Icon = icons[item.icon];
            const Demo = demos[item.id];
            return (
              <li key={item.id}>
                <FlipIn index={i} className="h-full">
                  <article className="glass flex h-full flex-col rounded-3xl p-3">
                    <div className="flex h-52 flex-col rounded-2xl bg-ink/70 p-2" aria-hidden>
                      <Demo clip={item.clip} />
                    </div>
                    <div className="flex flex-1 flex-col px-2 pb-2 pt-4">
                      <h3 className="flex items-center gap-2 text-lg font-semibold leading-tight">
                        <Icon className="size-5 shrink-0 text-pink" aria-hidden /> {item.name}
                      </h3>
                      <p className="mt-1 text-sm text-mist">{item.line}</p>
                      <p className="mt-auto pt-3">
                        <span className="inline-flex rounded-full bg-mint/15 px-2.5 py-1 text-xs font-semibold text-mint">Saves you ~{item.saves} min</span>
                      </p>
                    </div>
                  </article>
                </FlipIn>
              </li>
            );
          })}
        </ul>

        <Reveal delay={0.15}>
          <div className="mt-8 flex flex-col items-start gap-3 rounded-3xl border border-price/30 bg-price/[0.05] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <p className="font-heading text-2xl font-semibold leading-tight sm:text-3xl">
              ≈ {totalMinutes} min <span className="text-mist">{whatWeDo.valueLead}</span>
            </p>
            <div className="text-left sm:text-right">
              <p className="flex items-center gap-2 text-lg font-semibold sm:justify-end">
                {whatWeDo.valueTail} <PriceBadge size="md" />
              </p>
              <p className="mt-1 text-sm text-mist">
                {whatWeDo.editorNote} <span className="line-through decoration-destructive decoration-2">{EDITOR_PRICE_FROM}</span> {whatWeDo.editorNoteTail}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
