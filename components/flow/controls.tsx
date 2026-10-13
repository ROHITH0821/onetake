"use client";

import { motion } from "framer-motion";
import { useId } from "react";
import { cn } from "@/lib/utils";

export function Chip({ selected, onClick, children, className }: { selected: boolean; onClick: () => void; children: React.ReactNode; className?: string }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={cn(
        "h-11 rounded-full border px-4 text-sm font-medium whitespace-nowrap transition-[background-color,border-color,transform] duration-200 active:scale-95",
        selected ? "border-transparent bg-brand text-white" : "border-white/15 bg-white/5 hover:bg-white/10",
        className,
      )}
    >
      {children}
    </button>
  );
}

type SegmentedProps<T extends string> = {
  options: readonly T[];
  value: T | null;
  onChange: (value: T) => void;
  label: string;
};

/** Pill toggle with a sliding gradient thumb. */
export function Segmented<T extends string>({ options, value, onChange, label }: SegmentedProps<T>) {
  const id = useId();
  return (
    <div role="radiogroup" aria-label={label} className="glass inline-flex rounded-full p-1">
      {options.map((o) => {
        const selected = o === value;
        return (
          <button
            key={o}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(o)}
            className="relative h-10 min-w-16 rounded-full px-4 text-sm font-medium whitespace-nowrap"
          >
            {selected && <motion.span layoutId={id} className="absolute inset-0 rounded-full bg-brand" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
            <span className={cn("relative transition-colors", !selected && "text-mist")}>{o}</span>
          </button>
        );
      })}
    </div>
  );
}

export function Field({ label, hint, children, className }: { label: string; hint?: string; children: React.ReactNode; className?: string }) {
  return (
    <section className={className}>
      <div className="mb-3 flex items-baseline justify-between gap-3 px-4 sm:px-6">
        <h2 className="text-xl font-semibold">{label}</h2>
        {hint && <p className="text-xs text-mist">{hint}</p>}
      </div>
      {children}
    </section>
  );
}
