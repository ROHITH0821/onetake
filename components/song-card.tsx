"use client";

import { Check, Pause, Play } from "lucide-react";
import { PREVIEW_SECONDS } from "@/lib/beat-player";
import type { Song } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { BeatBars } from "./beat-bars";

type SongCardProps = {
  song: Song;
  playing: boolean;
  onToggle: (song: Song) => void;
  selected?: boolean;
  onSelect?: (song: Song) => void;
  className?: string;
};

export function SongCard({ song, playing, onToggle, selected = false, onSelect, className }: SongCardProps) {
  return (
    <div
      className={cn(
        "glass relative flex w-56 shrink-0 snap-start items-center gap-3 rounded-2xl p-3 transition-shadow duration-300",
        selected && "ring-2 ring-pink glow",
        className,
      )}
    >
      <button
        type="button"
        onClick={() => onToggle(song)}
        aria-label={playing ? `Stop ${song.title}` : `Play ${PREVIEW_SECONDS}s preview of ${song.title}`}
        className={cn("relative grid size-14 shrink-0 place-items-center rounded-full transition-transform duration-200 active:scale-95", playing && "shadow-[0_0_28px_-2px_var(--color-pink)]")}
        style={{ background: song.cover }}
      >
        <svg viewBox="0 0 56 56" className="absolute inset-0 -rotate-90">
          <circle cx="28" cy="28" r="26" fill="none" stroke="white" strokeOpacity="0.2" strokeWidth="2" />
          {playing && (
            <circle cx="28" cy="28" r="26" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" pathLength={1} strokeDasharray="1" strokeDashoffset="1">
              <animate attributeName="stroke-dashoffset" from="1" to="0" dur={`${PREVIEW_SECONDS}s`} fill="freeze" />
            </circle>
          )}
        </svg>
        {playing ? <Pause className="size-5 fill-white" /> : <Play className="ml-0.5 size-5 fill-white" />}
      </button>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold">{song.title}</p>
        <p className="truncate text-xs text-mist">
          {song.tag} · {song.bpm} BPM
        </p>
        <BeatBars playing={playing} className={cn("mt-1.5 h-3 transition-opacity", playing ? "opacity-100" : "opacity-35")} />
      </div>

      {onSelect && (
        <button
          type="button"
          aria-pressed={selected}
          aria-label={`Use ${song.title}`}
          onClick={() => onSelect(song)}
          className={cn(
            "grid size-8 shrink-0 place-items-center rounded-full border border-white/20 text-xs transition-colors",
            selected ? "border-transparent bg-brand" : "hover:bg-white/10",
          )}
        >
          <Check className={cn("size-4", !selected && "opacity-40")} strokeWidth={3} />
        </button>
      )}
    </div>
  );
}
