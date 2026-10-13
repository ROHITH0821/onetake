"use client";

import { AnimatePresence, motion, useMotionValue, useMotionValueEvent, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { vibes, type Vibe } from "@/lib/mock-data";
import { Words } from "../scroll-fx";
import { VibeCard } from "../vibe-card";

// The track holds still for the first and last 10% of the pin, so the
// first and last cards get their moment before the page moves on.
const HOLD = 0.1;
const SPAN = 1 - HOLD * 2;
const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

function VibeSlide({ vibe, index, progress }: { vibe: Vibe; index: number; progress: MotionValue<number> }) {
  const step = SPAN / (vibes.length - 1);
  const centre = HOLD + step * index;
  // Signed distance from centre stage: -1 (one card to the right) … 0 … 1 (one to the left).
  // Function-form transforms, because range-mapped ones need offsets inside 0–1.
  const offset = () => Math.min(1, Math.max(-1, (progress.get() - centre) / step));
  const scale = useTransform(() => 1 - Math.abs(offset()) * 0.26);
  const opacity = useTransform(() => 1 - Math.abs(offset()) * 0.65);
  const rotateY = useTransform(() => offset() * 32);
  const y = useTransform(() => Math.abs(offset()) * 36);

  return (
    <motion.li
      className="w-[62vw] max-w-72 shrink-0 motion-reduce:transform-none! motion-reduce:opacity-100! [@media(max-height:700px)]:max-w-48"
      style={{ scale, opacity, rotateY, y, transformPerspective: 1100 }}
    >
      <VibeCard vibe={vibe} />
    </motion.li>
  );
}

/**
 * Pinned coverflow: scrolling down brings each vibe to centre stage in turn.
 * Reduced-motion users get a normal swipeable row instead.
 */
export function VibeShowcase() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const startX = useMotionValue(0);
  const endX = useMotionValue(0);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });

  const x = useTransform(() => {
    const t = clamp01((scrollYProgress.get() - HOLD) / SPAN);
    return startX.get() + (endX.get() - startX.get()) * t;
  });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setActive(Math.round(clamp01((p - HOLD) / SPAN) * (vibes.length - 1)));
  });

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const measure = () => {
      const first = el.firstElementChild as HTMLElement | null;
      const last = el.lastElementChild as HTMLElement | null;
      if (!first || !last) return;
      const centreOf = (card: HTMLElement) => card.offsetLeft + card.offsetWidth / 2;
      startX.set(window.innerWidth / 2 - centreOf(first));
      endX.set(window.innerWidth / 2 - centreOf(last));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [startX, endX]);

  const current = vibes[active];

  return (
    <section ref={section} className="relative h-[420vh] motion-reduce:h-auto motion-reduce:py-20">
      <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden motion-reduce:static motion-reduce:h-auto">
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 size-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-[110px] transition-[background] duration-700 motion-reduce:hidden"
          style={{ background: current.scenes[0] }}
          aria-hidden
        />

        <div className="relative mx-auto w-full max-w-5xl px-4 sm:px-6">
          <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
            <Words text="Pick a vibe," accent="not a preset." />
          </h2>
          <div className="mt-3 flex h-8 items-center gap-3 text-lg motion-reduce:hidden" aria-live="polite">
            <span className="font-mono text-sm text-mist">
              0{active + 1} / 0{vibes.length}
            </span>
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={current.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="font-semibold">{current.name}</span> <span className="text-mist">· {current.tagline}</span>
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        <motion.ul
          ref={track}
          className="no-scrollbar relative mt-6 flex w-max items-center gap-2 py-6 motion-reduce:w-auto motion-reduce:transform-none! motion-reduce:gap-4 motion-reduce:overflow-x-auto motion-reduce:px-4 sm:gap-6"
          style={{ x }}
        >
          {vibes.map((v, i) => (
            <VibeSlide key={v.id} vibe={v} index={i} progress={scrollYProgress} />
          ))}
        </motion.ul>

        <div className="relative mt-2 flex justify-center gap-2 motion-reduce:hidden" aria-hidden>
          {vibes.map((v, i) => (
            <span key={v.id} className={`h-1.5 rounded-full transition-all duration-500 ${i === active ? "w-10 bg-brand" : "w-1.5 bg-white/25"}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
