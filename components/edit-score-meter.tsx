"use client";

import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useId } from "react";
import { cn } from "@/lib/utils";

type EditScoreMeterProps = {
  /** 0–100 */
  score: number;
  size?: number;
  label?: string;
  className?: string;
};

export function EditScoreMeter({ score, size = 140, label = "Edit Score", className }: EditScoreMeterProps) {
  const id = useId();
  const value = useMotionValue(0);
  const rounded = useTransform(value, (v) => Math.round(v));
  const offset = useTransform(value, (v) => 1 - v / 100);

  useEffect(() => {
    const controls = animate(value, score, { duration: 0.6, ease: [0.16, 1, 0.3, 1] });
    return controls.stop;
  }, [score, value]);

  const stroke = size * 0.085;
  const r = (size - stroke) / 2;

  return (
    <div
      className={cn("relative grid shrink-0 place-items-center", className)}
      style={{ width: size, height: size }}
      role="meter"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={score}
    >
      <div
        className="absolute inset-[12%] rounded-full bg-brand blur-2xl transition-opacity duration-500"
        style={{ opacity: 0.15 + (score / 100) * 0.55 }}
      />
      <svg width={size} height={size} className="relative -rotate-90">
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--color-violet)" />
            <stop offset="55%" stopColor="var(--color-pink)" />
            <stop offset="100%" stopColor="var(--color-orange)" />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={r} fill="var(--color-ink-2)" stroke="rgb(255 255 255 / 0.1)" strokeWidth={stroke} />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={`url(#${id})`}
          strokeWidth={stroke}
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray="1"
          style={{ strokeDashoffset: offset }}
        />
      </svg>
      <div className="absolute inset-0 grid place-content-center text-center">
        <motion.span className="font-heading font-semibold leading-none tabular-nums" style={{ fontSize: size * 0.3 }}>
          {rounded}
        </motion.span>
        {size >= 100 && <span className="mt-1 text-[10px] font-medium uppercase tracking-widest text-mist">{label}</span>}
      </div>
    </div>
  );
}
