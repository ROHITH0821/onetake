"use client";

import { motion, useMotionTemplate, useMotionValue, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { ChevronsLeftRight } from "lucide-react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

type BeforeAfterSliderProps = {
  before: React.ReactNode;
  after: React.ReactNode;
  /** Wipe automatically as the slider scrolls into view, until the user grabs it. */
  scrollWipe?: boolean;
  className?: string;
};

/**
 * Drag (or arrow-key) the handle to wipe between two layers.
 * Position lives in a motion value, so wiping never re-renders React.
 */
export function BeforeAfterSlider({ before, after, scrollWipe = false, className }: BeforeAfterSliderProps) {
  const start = scrollWipe ? 96 : 50;
  const pos = useMotionValue(start);
  const ref = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const touched = useRef(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "center 45%"] });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (!scrollWipe || touched.current) return;
    const next = 96 - v * 58;
    pos.set(next);
    if (input.current) input.current.value = String(Math.round(next));
  });

  const hidden = useTransform(pos, (v) => 100 - v);
  const clipPath = useMotionTemplate`inset(0 ${hidden}% 0 0)`;
  const handleX = useMotionTemplate`${pos}cqw`;
  const rawLabel = useTransform(pos, (v) => (v > 18 ? 1 : 0));
  const reelLabel = useTransform(pos, (v) => (v < 82 ? 1 : 0));

  return (
    <div ref={ref} className={cn("@container relative overflow-hidden rounded-3xl border border-white/10 select-none", className)}>
      <div className="absolute inset-0">{after}</div>
      <motion.div className="absolute inset-0" style={{ clipPath }}>
        {before}
      </motion.div>

      <motion.span className="absolute left-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium" style={{ opacity: rawLabel }}>
        Raw clip
      </motion.span>
      <motion.span className="absolute right-3 top-3 rounded-full bg-brand px-2.5 py-1 text-xs font-semibold" style={{ opacity: reelLabel }}>
        OneTake reel
      </motion.span>

      <motion.div className="pointer-events-none absolute inset-y-0 left-0 w-0.5 bg-white shadow-[0_0_20px_2px_var(--color-pink)]" style={{ x: handleX }}>
        <span className="absolute left-1/2 top-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-ink shadow-xl">
          <ChevronsLeftRight className="size-5" />
        </span>
      </motion.div>

      <input
        ref={input}
        type="range"
        min={0}
        max={100}
        defaultValue={start}
        onChange={(e) => {
          touched.current = true;
          pos.set(Number(e.target.value));
        }}
        aria-label="Reveal the edited reel"
        className="absolute inset-0 size-full cursor-ew-resize touch-pan-y opacity-0"
      />
    </div>
  );
}
