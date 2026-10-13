"use client";

import { Check } from "lucide-react";
import type { Vibe } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { Reel } from "./reel";
import { TiltCard } from "./tilt-card";

type VibeCardProps = {
  vibe: Vibe;
  selected?: boolean;
  onSelect?: (vibe: Vibe) => void;
  className?: string;
};

export function VibeCard({ vibe, selected = false, onSelect, className }: VibeCardProps) {
  const body = (
    <div
      className={cn(
        "@container relative aspect-[9/14] w-full overflow-hidden rounded-3xl border border-white/10 transition-shadow duration-300",
        selected && "ring-2 ring-pink ring-offset-2 ring-offset-ink glow",
      )}
    >
      <Reel scenes={vibe.scenes} video={vibe.video} words={vibe.words} beat={false} />
      <div className="absolute inset-x-0 bottom-0 p-4 pt-10 text-left">
        <p className="font-heading text-xl font-semibold leading-tight">{vibe.name}</p>
        <p className="text-xs text-white/75">{vibe.tagline}</p>
      </div>
      {selected && (
        <span className="absolute right-3 top-3 grid size-7 place-items-center rounded-full bg-brand">
          <Check className="size-4" strokeWidth={3} />
        </span>
      )}
    </div>
  );

  return (
    <TiltCard className={className}>
      {onSelect ? (
        <button type="button" aria-pressed={selected} onClick={() => onSelect(vibe)} className="block w-full rounded-3xl">
          {body}
        </button>
      ) : (
        body
      )}
    </TiltCard>
  );
}
