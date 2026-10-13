"use client";

import { useMotionValueEvent, useScroll } from "framer-motion";
import { ChevronsLeftRight } from "lucide-react";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

type BeforeAfterSliderProps = {
  before: React.ReactNode;
  after: React.ReactNode;
  /** Wipe automatically as the slider scrolls into view, until the user grabs it. */
  scrollWipe?: boolean;
  className?: string;
};

/** Drag (or arrow-key) the handle to wipe between two layers. */
export function BeforeAfterSlider({ before, after, scrollWipe = false, className }: BeforeAfterSliderProps) {
  const [pos, setPos] = useState(scrollWipe ? 96 : 50);
  const ref = useRef<HTMLDivElement>(null);
  const touched = useRef(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "center 45%"] });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (scrollWipe && !touched.current) setPos(96 - v * 58);
  });

  return (
    <div ref={ref} className={cn("@container relative overflow-hidden rounded-3xl border border-white/10 select-none", className)}>
      <div className="absolute inset-0">{after}</div>
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        {before}
      </div>

      <span className="absolute left-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium" style={{ opacity: pos > 18 ? 1 : 0 }}>
        Raw clip
      </span>
      <span className="absolute right-3 top-3 rounded-full bg-brand px-2.5 py-1 text-xs font-semibold" style={{ opacity: pos < 82 ? 1 : 0 }}>
        OneTake reel
      </span>

      <div className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_20px_2px_var(--color-pink)]" style={{ left: `${pos}%` }}>
        <span className="absolute left-1/2 top-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-ink shadow-xl">
          <ChevronsLeftRight className="size-5" />
        </span>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        value={Math.round(pos)}
        onChange={(e) => {
          touched.current = true;
          setPos(Number(e.target.value));
        }}
        aria-label="Reveal the edited reel"
        className="absolute inset-0 size-full cursor-ew-resize touch-pan-y opacity-0"
      />
    </div>
  );
}
