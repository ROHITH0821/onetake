"use client";

import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { AudioLines, Check, Diamond, Film, RotateCcw, Type } from "lucide-react";
import { useEffect, useState } from "react";
import { vibes } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

// Deterministic pseudo-random layout, so server and client markup match.
const rand = (n: number) => {
  const v = Math.sin(n * 91.345) * 47453.5453;
  return v - Math.floor(v);
};

const palette = vibes.flatMap((v) => v.scenes);
// Rounded so server and client print identical style strings.
const r2 = (n: number) => Math.round(n * 100) / 100;

const clips = (() => {
  const out: { left: number; width: number; bg: string }[] = [];
  let left = 0;
  for (let i = 0; left < 100; i++) {
    const width = 3 + rand(i) * 9;
    out.push({ left: r2(left), width: r2(Math.min(width, 100 - left)), bg: palette[i % palette.length] });
    left += width + 0.6;
  }
  return out;
})();
const keyframes = Array.from({ length: 22 }, (_, i) => r2(2 + rand(i + 40) * 94));
const captions = Array.from({ length: 9 }, (_, i) => ({ left: r2(i * 11 + rand(i + 80) * 4), width: r2(6 + rand(i + 90) * 4) }));
const wave = Array.from({ length: 64 }, (_, i) => r2(18 + rand(i + 120) * 82));

const rows = [
  { icon: Film, label: "Video" },
  { icon: Diamond, label: "Keyframes" },
  { icon: Type, label: "Captions" },
  { icon: AudioLines, label: "Audio" },
];

type Phase = "mess" | "collapse" | "done";

/** Seconds of "editing" the fake clock runs up to: 2 hours. */
const EDIT_SECONDS = 2 * 60 * 60;

const clock = (s: number) => {
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = Math.floor(s % 60);
  return `${h}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
};

/**
 * Hero visual: a cluttered editing timeline that collapses into one clean,
 * finished reel, right above the CTA. Plays once, with a replay button.
 */
export function TimelineCollapse({ delay = 0, className }: { delay?: number; className?: string }) {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("mess");
  const [run, setRun] = useState(0);
  const seconds = useMotionValue(0);
  const time = useTransform(seconds, (s) => clock(s));

  useEffect(() => {
    const start = run === 0 ? delay : 0;
    if (reduced) {
      const t = setTimeout(() => setPhase("done"), 0);
      return () => clearTimeout(t);
    }
    seconds.set(0);
    const ticking = animate(seconds, EDIT_SECONDS - 1, { duration: 2.6, delay: start, ease: [0.3, 0, 0.7, 1] });
    const t1 = setTimeout(() => setPhase("mess"), 0);
    const t2 = setTimeout(() => setPhase("collapse"), (start + 2.8) * 1000);
    const t3 = setTimeout(() => setPhase("done"), (start + 3.6) * 1000);
    return () => {
      ticking.stop();
      [t1, t2, t3].forEach(clearTimeout);
    };
  }, [run, delay, reduced, seconds]);

  const collapsing = phase !== "mess";
  // Every piece flies to the centre and shrinks away.
  const fly = (centre: number, row: number, i: number) =>
    collapsing
      ? { x: `${50 - centre}cqw`, y: (1.5 - row) * 26, scale: 0.1, opacity: 0, transition: { duration: 0.55, delay: (i % 12) * 0.02, ease: [0.65, 0, 0.35, 1] as const } }
      : { x: 0, y: 0, scale: 1, opacity: 1, transition: { duration: 0.3 } };

  return (
    <div className={cn("glass relative h-48 w-full max-w-xl overflow-hidden rounded-2xl p-3 text-left sm:h-52", className)} aria-hidden>
      <div className="flex items-center justify-between gap-3 text-[11px]">
        <span className="truncate font-mono text-mist">reel_final_FINAL_v7.proj</span>
        <motion.span className="shrink-0 font-mono tabular-nums text-destructive" animate={{ opacity: collapsing ? 0 : 1 }}>
          ⏱ <motion.span>{time}</motion.span>
        </motion.span>
      </div>

      <div className="mt-2 space-y-1.5">
        {rows.map(({ icon: Icon, label }, row) => (
          <div key={label} className="flex h-7 items-center gap-2 sm:h-8">
            <motion.span className="grid size-6 shrink-0 place-items-center rounded-md bg-white/5 text-mist" animate={{ opacity: collapsing ? 0 : 1 }}>
              <Icon className="size-3.5" />
            </motion.span>
            <div className="@container relative h-full flex-1">
              {row === 0 &&
                clips.map((c, i) => (
                  <motion.span
                    key={i}
                    className="absolute inset-y-0 rounded-[3px] border border-black/30"
                    style={{ left: `${c.left}%`, width: `${c.width}%`, background: c.bg }}
                    animate={fly(c.left + c.width / 2, row, i)}
                  />
                ))}
              {row === 1 &&
                keyframes.map((k, i) => (
                  <motion.span
                    key={i}
                    className="absolute top-1/2 -mt-1 size-2 rotate-45 bg-orange"
                    style={{ left: `${k}%` }}
                    animate={fly(k, row, i)}
                  />
                ))}
              {row === 2 &&
                captions.map((c, i) => (
                  <motion.span
                    key={i}
                    className="absolute inset-y-1 rounded-sm bg-violet/70 px-1 text-[8px] leading-[1.1rem] text-white"
                    style={{ left: `${c.left}%`, width: `${c.width}%` }}
                    animate={fly(c.left + c.width / 2, row, i)}
                  >
                    T
                  </motion.span>
                ))}
              {row === 3 && (
                <div className="absolute inset-0 flex items-center gap-[2px]">
                  {wave.map((h, i) => (
                    <motion.span
                      key={i}
                      className="flex-1 rounded-full bg-mint/70"
                      style={{ height: `${h}%` }}
                      animate={fly((i / wave.length) * 100, row, i)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Playhead scrubbing back and forth while you "edit". */}
      <div className="@container pointer-events-none absolute inset-y-9 left-11 right-3">
        <motion.span
          className="absolute inset-y-0 left-0 w-0.5 bg-white shadow-[0_0_10px_white]"
          animate={collapsing ? { opacity: 0 } : { x: ["0cqw", "70cqw", "35cqw", "95cqw"], opacity: 1 }}
          transition={collapsing ? { duration: 0.2 } : { duration: 2.6, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        />
      </div>

      {/* The finished result. */}
      <motion.div
        className="absolute inset-0 grid place-items-center"
        initial={false}
        animate={phase === "done" ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <div className="flex items-center gap-3 rounded-full border border-white/10 bg-ink/80 py-2 pl-2 pr-4">
          <span className="grid size-9 place-items-center rounded-full bg-mint text-ink">
            <Check className="size-5" strokeWidth={3} />
          </span>
          <span className="text-left">
            <span className="block text-sm font-semibold text-foreground">One clean reel. Done.</span>
            <span className="block text-xs text-mist">About a minute, not 2 hours</span>
          </span>
        </div>
      </motion.div>

      {phase === "done" && !reduced && (
        <button
          type="button"
          onClick={() => setRun((r) => r + 1)}
          className="absolute bottom-2 right-2 inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] text-mist transition-colors hover:bg-white/10 hover:text-foreground"
          aria-hidden={false}
          aria-label="Replay the timeline animation"
        >
          <RotateCcw className="size-3" /> Replay
        </button>
      )}
    </div>
  );
}
