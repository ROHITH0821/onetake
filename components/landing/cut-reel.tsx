"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { BeatBars } from "../beat-bars";

type CutReelProps = {
  src: string;
  /** Seconds into the clip to jump to, one per beat. */
  cuts: number[];
  caption: string[];
  duration: string;
  /** Seconds per beat. */
  beat?: number;
};

/**
 * The "edited" side made visible: the same footage hard-cuts to a new moment
 * on every beat, with a punch-in zoom, a flash, reel progress segments and
 * word-by-word captions, so the edit reads as an edit and not just a grade.
 */
export function CutReel({ src, cuts, caption, duration, beat = 0.75 }: CutReelProps) {
  const video = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);
  const [cut, setCut] = useState(0);

  useEffect(() => {
    const el = video.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: "80px" });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = video.current;
    if (!el) return;
    if (!visible) {
      el.pause();
      return;
    }
    if (!el.src) el.src = src;
    el.play().catch(() => {});
    const timer = setInterval(() => setCut((c) => c + 1), beat * 1000);
    return () => clearInterval(timer);
  }, [visible, src, beat]);

  // Jump to the next moment on every beat.
  useEffect(() => {
    const el = video.current;
    if (el && el.readyState >= 1) el.currentTime = cuts[cut % cuts.length];
  }, [cut, cuts]);

  const step = cut % cuts.length;
  const word = cut % caption.length;
  const chunkStart = word - (word % 3);
  const chunk = caption.slice(chunkStart, chunkStart + 3);

  return (
    <div className="relative size-full overflow-hidden bg-ink" aria-hidden>
      <motion.div className="absolute inset-0" animate={{ scale: cut % 2 ? 1.14 : 1 }} transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}>
        <video ref={video} muted loop playsInline preload="auto" className="size-full object-cover saturate-[1.15] contrast-[1.08]" />
      </motion.div>

      {/* Flash on every cut. */}
      <AnimatePresence>
        <motion.div key={cut} className="absolute inset-0 bg-white" initial={{ opacity: 0.3 }} animate={{ opacity: 0 }} transition={{ duration: 0.22 }} />
      </AnimatePresence>

      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/70 to-transparent" />

      {/* Reel progress: one segment per cut. */}
      <div className="absolute inset-x-3 top-12 flex gap-1">
        {cuts.map((_, i) => (
          <span key={i} className={cn("h-1 flex-1 rounded-full transition-colors duration-200", i <= step ? "bg-white" : "bg-white/30")} />
        ))}
      </div>

      {step === 0 && (
        <span className="absolute left-3 top-16 rounded-full bg-price px-2 py-0.5 text-[10px] font-bold text-ink">HOOK · 0:00</span>
      )}

      {/* Captions, word by word. */}
      <div className="absolute inset-x-3 bottom-[18%] flex flex-wrap justify-center gap-1.5">
        {chunk.map((w, i) => (
          <span
            key={`${chunkStart}-${w}`}
            className={cn(
              "rounded-md px-1.5 py-0.5 font-heading text-[clamp(1rem,8cqw,1.6rem)] font-bold uppercase leading-none transition-[transform,background-color,color] duration-150",
              chunkStart + i === word ? "scale-110 bg-price text-ink" : "text-white [text-shadow:0_2px_8px_rgb(0_0_0/0.8)]",
            )}
          >
            {w}
          </span>
        ))}
      </div>

      <div className="absolute inset-x-3 bottom-3 flex items-center justify-between">
        <span className="flex items-center gap-1.5 rounded-full bg-black/60 px-2 py-1 text-[10px] font-medium">
          <BeatBars className="h-2.5" /> cut on beat {step + 1}
        </span>
        <span className="rounded-full bg-black/60 px-2 py-1 font-mono text-[10px]">{duration}</span>
      </div>
    </div>
  );
}
