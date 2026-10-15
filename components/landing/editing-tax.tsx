"use client";

import { animate, motion, useInView, useMotionValue, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { AudioLines, Captions, Check, Crop, Film, LoaderCircle, Music2, Scissors, Sparkles, Type, Vibrate } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { songs, vibes } from "@/lib/mock-data";
import { EDITOR_PRICE } from "@/lib/pricing";
import { cn } from "@/lib/utils";
import { BeatBars } from "../beat-bars";
import { LazyVideo } from "../lazy-video";
import { PriceBadge } from "../price-badge";
import { Words } from "../scroll-fx";

const chores = [
  { icon: Sparkles, label: "Finding the best moment for the hook", minutes: 15 },
  { icon: Scissors, label: "Trimming dead air and bad takes", minutes: 10 },
  { icon: Vibrate, label: "Fixing shaky or tilted footage", minutes: 10 },
  { icon: Music2, label: "Finding a sound that isn't overused", minutes: 20 },
  { icon: AudioLines, label: "Syncing cuts to the beat", minutes: 25 },
  { icon: Captions, label: "Typing and timing captions", minutes: 30 },
  { icon: Crop, label: "Reframing to 9:16 without cropping faces", minutes: 10 },
];
const TOTAL = chores.reduce((sum, c) => sum + c.minutes, 0);

const formatMinutes = (m: number) => {
  if (m < 60) return `${m} min`;
  const h = Math.floor(m / 60);
  const rest = m % 60;
  return `${h} hr${h > 1 ? "s" : ""}${rest ? ` ${rest} min` : ""}`;
};

const vibe = vibes[0];
const sound = songs[0];
// Video track: good takes plus dead air that gets trimmed away.
const segments = [
  { w: 12, dead: true },
  { w: 16 },
  { w: 7, dead: true },
  { w: 20 },
  { w: 9, dead: true },
  { w: 14 },
  { w: 6, dead: true },
  { w: 16 },
];
const wave = Array.from({ length: 40 }, (_, i) => 25 + ((i * 37) % 75));

/** Tiny editor: a preview monitor and a timeline that fix themselves as chores tick off. */
function EditorWindow({ done }: { done: number }) {
  const hook = done >= 1;
  const trimmed = done >= 2;
  const stable = done >= 3;
  const hasSound = done >= 4;
  const synced = done >= 5;
  const captioned = done >= 6;
  const reframed = done >= 7;
  const active = chores[done];
  let clipIndex = 0;

  return (
    <div className="flex gap-3">
      {/* Preview monitor */}
      <div className="relative aspect-[9/16] w-24 shrink-0 overflow-hidden rounded-xl bg-black sm:w-32">
        <motion.div
          className="absolute inset-0"
          initial={false}
          animate={{ clipPath: reframed ? "inset(0% 0% 0% 0%)" : "inset(31% 0% 31% 0%)" }}
          transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
        >
          <div className={cn("size-full transition-transform duration-500", !stable && "animate-shake")}>
            <LazyVideo
              src={vibe.video}
              className="size-full object-cover transition-[filter] duration-700"
              style={{ filter: synced ? "none" : "saturate(0.35) brightness(0.65) contrast(0.85)" }}
            />
          </div>
        </motion.div>
        {!reframed && <span className="absolute inset-x-0 top-[22%] text-center font-mono text-[8px] text-white/40">16:9</span>}
        {hook && (
          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute left-1.5 top-1.5 rounded-full bg-price px-1.5 py-0.5 text-[8px] font-bold text-ink">
            HOOK
          </motion.span>
        )}
        {hasSound && (
          <motion.span initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="absolute right-1.5 top-1.5 max-w-[70%] truncate rounded-full bg-black/60 px-1.5 py-0.5 text-[8px]">
            ♪ {sound.title}
          </motion.span>
        )}
        {synced && <div className="absolute inset-0 animate-cut-flash bg-white opacity-0" />}
        {captioned && (
          <div className="absolute inset-x-0 bottom-[24%] grid place-items-center">
            {vibe.words.map((w, i) => (
              <span
                key={w}
                className="col-start-1 row-start-1 animate-caption-word rounded bg-white px-1.5 py-0.5 font-heading text-[11px] font-bold uppercase leading-none text-ink opacity-0"
                style={{ animationDelay: `${i * 0.6}s` }}
              >
                {w}
              </span>
            ))}
          </div>
        )}
        {synced && <BeatBars className="absolute bottom-1.5 left-1.5 h-2.5" />}
      </div>

      {/* Timeline */}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex h-8 items-center gap-1.5 text-[11px] font-medium" aria-live="polite">
          {active ? (
            <>
              <LoaderCircle className="size-3.5 shrink-0 animate-spin text-destructive" />
              <span className="truncate text-mist">By hand: {active.label.toLowerCase()}…</span>
            </>
          ) : (
            <>
              <Check className="size-3.5 shrink-0 text-mint" strokeWidth={3} />
              <span className="truncate text-mint">Ready to post</span>
            </>
          )}
        </div>

        <div className="@container relative mt-1 space-y-1.5">
          {/* Video */}
          <div className="flex h-7 items-center gap-1.5">
            <Film className="size-3 shrink-0 text-mist" />
            <div className="relative flex h-full flex-1 gap-[2px] overflow-hidden">
              {segments.map((s, i) => {
                const bg = s.dead ? undefined : vibe.scenes[clipIndex++ % vibe.scenes.length];
                return (
                  <motion.span
                    key={i}
                    className={cn("h-full shrink-0 rounded-[3px]", s.dead && "bg-[repeating-linear-gradient(45deg,rgb(251_113_133/0.55)_0_3px,transparent_3px_6px)] ring-1 ring-destructive/60")}
                    style={{ background: bg }}
                    initial={false}
                    animate={{ width: trimmed && s.dead ? "0%" : `${trimmed ? s.w * 1.47 : s.w}%`, opacity: trimmed && s.dead ? 0 : 1 }}
                    transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
                  />
                );
              })}
              {hook && <span className="absolute inset-y-0 left-0 w-1 rounded-full bg-price" />}
            </div>
          </div>

          {/* Audio */}
          <div className="flex h-7 items-center gap-1.5">
            <AudioLines className="size-3 shrink-0 text-mist" />
            <div className="relative flex h-full flex-1 items-center">
              {hasSound ? (
                <motion.div className="flex h-full w-full items-center gap-[2px]" initial={{ opacity: 0, scaleY: 0 }} animate={{ opacity: 1, scaleY: 1 }}>
                  {wave.map((h, i) => (
                    <span key={i} className={cn("flex-1 rounded-full", synced && i % 5 === 0 ? "bg-orange" : "bg-mint/70")} style={{ height: `${h}%` }} />
                  ))}
                </motion.div>
              ) : (
                <span className="flex h-full w-full items-center rounded-[3px] border border-dashed border-white/15 px-1.5 text-[9px] text-mist">No sound</span>
              )}
            </div>
          </div>

          {/* Captions */}
          <div className="flex h-7 items-center gap-1.5">
            <Type className="size-3 shrink-0 text-mist" />
            <div className="relative flex h-full flex-1 items-center gap-1">
              {captioned ? (
                vibe.words.map((w, i) => (
                  <motion.span
                    key={w}
                    className="flex h-full flex-1 items-center justify-center rounded-[3px] bg-violet/70 text-[8px] font-bold uppercase"
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    {w}
                  </motion.span>
                ))
              ) : (
                <span className="flex h-full w-full items-center rounded-[3px] border border-dashed border-white/15 px-1.5 text-[9px] text-mist">No captions</span>
              )}
            </div>
          </div>

          {/* Playhead: frantic scrubbing while you edit by hand. */}
          {active && (
            <motion.span
              className="pointer-events-none absolute -top-1 bottom-0 left-[1.1rem] w-0.5 rounded-full bg-white shadow-[0_0_8px_white]"
              animate={{ x: ["0cqw", "60cqw", "20cqw", "75cqw", "10cqw"] }}
              transition={{ duration: done === 0 ? 1.6 : 3.2, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * The problem, made concrete: editing chores with their time cost, next to a
 * little editor that shows the work. Scrolling ticks each chore off, the
 * editor fixes itself, and the time drops from ~2 hrs to about a minute.
 */
export function EditingTax() {
  const list = useRef<HTMLOListElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const seen = useInView(panelRef, { once: true, margin: "-20% 0px" });
  const [done, setDone] = useState(0);
  const { scrollYProgress } = useScroll({ target: list, offset: ["start 60%", "end 55%"] });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setDone(Math.min(chores.length, Math.max(0, Math.floor(p * chores.length + 0.15))));
  });

  const allDone = done === chores.length;
  const remaining = allDone ? 1 : TOTAL - chores.slice(0, done).reduce((s, c) => s + c.minutes, 0);
  const target = seen ? remaining : 0;

  const shown = useMotionValue(0);
  const text = useTransform(shown, (v) => formatMinutes(Math.max(0, Math.round(v))));
  const bar = useTransform(shown, (v) => Math.max(0, v) / TOTAL);

  useEffect(() => {
    const controls = animate(shown, target, { duration: target === TOTAL && shown.get() === 0 ? 1.6 : 0.6, ease: [0.16, 1, 0.3, 1] });
    return controls.stop;
  }, [target, shown]);

  return (
    <section className="px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <h2 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">
          <Words text="The editing" accent="tax." />
        </h2>
        <p className="mt-3 max-w-xl text-lg text-mist">This is what one reel costs you by hand. Scroll and let OneTake take each job off your plate.</p>

        <div className="mt-10 grid gap-6 md:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] md:gap-10">
          <div className="sticky top-3 z-10 self-start md:top-28">
            <div
              ref={panelRef}
              className={cn(
                "glass rounded-3xl p-3 transition-[box-shadow,border-color] duration-500 sm:p-4",
                allDone && "border-price/40 shadow-[0_0_50px_-20px_var(--color-price)]",
              )}
            >
              <div className="mb-3 flex items-center justify-between gap-2 px-1">
                <span className="truncate font-mono text-[11px] text-mist">{allDone ? "reel_onetake.mp4" : "reel_final_v7.proj"}</span>
                <span className={cn("shrink-0 font-heading text-lg font-semibold tabular-nums sm:text-xl", allDone ? "text-foreground" : "text-destructive")}>
                  ≈ <motion.span>{text}</motion.span>
                </span>
              </div>

              <EditorWindow done={done} />

              <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10">
                <motion.div className={cn("h-full origin-left rounded-full", allDone ? "bg-price" : "bg-destructive")} style={{ scaleX: bar }} />
              </div>
              <div className="mt-2.5 flex min-h-7 items-center px-1 text-xs text-mist">
                {allDone ? (
                  <span className="flex items-center gap-2">
                    Done in about a minute, for <PriceBadge size="sm" />
                  </span>
                ) : (
                  <span>Time left by hand, or {EDITOR_PRICE} to an editor</span>
                )}
              </div>
            </div>
          </div>

          <ol ref={list} className="space-y-3">
            {chores.map(({ icon: Icon, label, minutes }, i) => {
              const checked = i < done;
              const current = i === done;
              return (
                <li
                  key={label}
                  className={cn(
                    "flex items-center gap-3 rounded-2xl border p-3.5 transition-[background-color,border-color,opacity] duration-500 sm:gap-4 sm:p-4",
                    checked && "border-mint/25 bg-mint/[0.06]",
                    current && "border-destructive/40 bg-destructive/[0.06]",
                    !checked && !current && "border-white/10 bg-white/[0.03] opacity-70",
                  )}
                >
                  <span
                    className={cn(
                      "grid size-10 shrink-0 place-items-center rounded-xl transition-colors duration-500",
                      checked ? "bg-mint text-ink" : current ? "bg-destructive/20 text-destructive" : "bg-white/10 text-foreground",
                    )}
                  >
                    {checked ? <Check className="size-5" strokeWidth={3} /> : <Icon className="size-5" />}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className={cn("text-sm font-medium leading-snug sm:text-base", checked && "text-mist")}>{label}</p>
                    <p className={cn("mt-0.5 text-xs font-semibold", checked ? "text-mint" : current ? "text-destructive" : "text-transparent")}>
                      {checked ? "OneTake does this" : current ? "You, doing it by hand…" : "·"}
                    </p>
                  </div>
                  <span className={cn("shrink-0 text-sm font-semibold tabular-nums", checked ? "text-mist line-through" : "text-destructive")}>
                    ~{minutes} min
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
