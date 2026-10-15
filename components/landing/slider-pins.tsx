"use client";

import { motion, type MotionValue, useTransform } from "framer-motion";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type SliderPin = { x: number; y: number; problem: string; fix: string };

/**
 * One annotation on the before/after slider. While the raw side covers the
 * pin it shows the problem; once the handle passes, it flips to the fix.
 */
function Pin({ pin, pos }: { pin: SliderPin; pos: MotionValue<number> }) {
  const showProblem = useTransform(pos, (v) => (v > pin.x ? 1 : 0));
  const showFix = useTransform(pos, (v) => (v > pin.x ? 0 : 1));
  const rotateProblem = useTransform(pos, (v) => (v > pin.x ? 0 : 90));
  const rotateFix = useTransform(pos, (v) => (v > pin.x ? -90 : 0));
  const leftSide = pin.x < 50;

  const chip = "absolute top-1/2 flex -translate-y-1/2 items-center gap-1 rounded-full px-2 py-1 text-[10px] font-semibold whitespace-nowrap shadow-lg transition-[opacity,transform] duration-300 sm:text-[11px]";

  return (
    <div className="absolute" style={{ left: `${pin.x}%`, top: `${pin.y}%` }}>
      <span className="absolute -left-1.5 -top-1.5 size-3 rounded-full bg-white shadow-[0_0_0_4px_rgb(255_255_255/0.25)]" />
      <div className={cn("absolute", leftSide ? "left-3" : "right-3")}>
        <motion.span
          className={cn(chip, "bg-destructive text-ink", leftSide ? "left-0" : "right-0")}
          style={{ opacity: showProblem, rotateX: rotateProblem }}
        >
          <X className="size-3" strokeWidth={3} /> {pin.problem}
        </motion.span>
        <motion.span
          className={cn(chip, "bg-mint text-ink", leftSide ? "left-0" : "right-0")}
          style={{ opacity: showFix, rotateX: rotateFix }}
        >
          <Check className="size-3" strokeWidth={3} /> {pin.fix}
        </motion.span>
      </div>
    </div>
  );
}

export function SliderPins({ pins, pos }: { pins: SliderPin[]; pos: MotionValue<number> }) {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      {pins.map((p) => (
        <Pin key={p.problem} pin={p} pos={pos} />
      ))}
    </div>
  );
}
