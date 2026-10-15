"use client";

import { motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { togglePreview, usePlayingId } from "@/lib/beat-player";
import { songs } from "@/lib/mock-data";
import { BeatBars } from "../beat-bars";
import { ScrollMarquee, Words } from "../scroll-fx";
import { SongCard } from "../song-card";
import { priceLabel } from "@/lib/pricing";

const BARS = 28;
/** Repeating height pattern so the backdrop reads as an equaliser, not noise. */
const barHeight = (i: number) => 25 + ((i * 37) % 75);

// The row waits for the first and last 12% of the pin before and after it travels.
const HOLD = 0.12;
const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

/**
 * Pinned section: the page stops here, scrolling runs the song row past,
 * then the page carries on. Reduced-motion users get a swipeable row.
 */
export function SoundsStrip() {
  const playingId = usePlayingId();
  const section = useRef<HTMLElement>(null);
  const row = useRef<HTMLUListElement>(null);
  const travel = useMotionValue(0);
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });

  const run = useTransform(() => clamp01((scrollYProgress.get() - HOLD) / (1 - HOLD * 2)));
  const x = useTransform(() => -run.get() * travel.get());

  useEffect(() => {
    const el = row.current;
    if (!el) return;
    const measure = () => travel.set(Math.max(0, el.scrollWidth - window.innerWidth));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [travel]);

  return (
    <section ref={section} className="relative h-[260vh] motion-reduce:h-auto motion-reduce:py-20">
      <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden motion-reduce:static motion-reduce:h-auto">
        <ScrollMarquee text="On the beat" progress={scrollYProgress} className="absolute inset-x-0 top-[8%] opacity-60 motion-reduce:hidden" />

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 flex h-24 items-end justify-between gap-1.5 px-2 opacity-15 motion-reduce:hidden"
          aria-hidden
        >
          {Array.from({ length: BARS }, (_, i) => (
            <span
              key={i}
              className="flex-1 origin-bottom animate-beat rounded-t-full bg-brand"
              style={{ height: `${barHeight(i)}%`, animationDelay: `${(i % 7) * 0.09}s`, animationDuration: playingId ? "0.35s" : "0.8s" }}
            />
          ))}
        </div>

        <div className="relative mx-auto w-full max-w-5xl px-4 sm:px-6">
          <p className="inline-flex items-center gap-2 rounded-full bg-brand px-3 py-1.5 text-sm font-semibold">
            <BeatBars className="h-3.5" /> Cuts synced to the beat
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">
            <Words text="Trending sounds," accent="built in." />
          </h2>
          <p className="mt-3 max-w-lg text-lg text-mist">Tap play for a 15-second preview. Every sound is included in {priceLabel}.</p>
        </div>

        <div className="no-scrollbar relative mt-10 motion-reduce:overflow-x-auto">
          <motion.ul
            ref={row}
            className="flex w-max gap-4 px-4 py-4 will-change-transform motion-reduce:transform-none! sm:gap-5 sm:px-[max(1.5rem,calc((100vw-64rem)/2+1.5rem))]"
            style={{ x }}
          >
            {songs.map((s) => (
              <li key={s.id} className="shrink-0">
                <SongCard song={s} playing={playingId === s.id} onToggle={togglePreview} className="w-72 bg-ink-2/85 p-4 sm:w-80" />
              </li>
            ))}
          </motion.ul>
        </div>

        <div className="relative mx-auto mt-6 w-full max-w-5xl px-4 sm:px-6">
          <div className="h-0.5 overflow-hidden rounded-full bg-white/10 motion-reduce:hidden" aria-hidden>
            <motion.div className="h-full origin-left bg-brand" style={{ scaleX: run }} />
          </div>
          <p className="mt-4 text-xs text-mist">Demo sounds are synthesised placeholders, not licensed tracks.</p>
        </div>
      </div>
    </section>
  );
}
