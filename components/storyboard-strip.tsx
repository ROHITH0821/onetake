"use client";

import { motion } from "framer-motion";
import { formatTime } from "@/lib/flow-store";
import type { Shot } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

type StoryboardStripProps = {
  shots: Shot[];
  /** Length of the final reel in seconds; timestamps are derived from it. */
  seconds: number;
  /** Gradient placeholders, one per shot (cycled). */
  scenes: string[];
  /** If set, real frames from this clip are used as thumbnails. */
  videoUrl?: string | null;
  videoDuration?: number;
  className?: string;
};

export function StoryboardStrip({ shots, seconds, scenes, videoUrl, videoDuration = 0, className }: StoryboardStripProps) {
  return (
    <ol className={cn("no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 sm:px-6", className)}>
      {shots.map((shot, i) => (
        <motion.li
          key={shot.title}
          className="w-36 shrink-0 snap-start sm:w-44"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 * i, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative aspect-[9/14] overflow-hidden rounded-2xl border border-white/10" style={{ background: scenes[i % scenes.length] }}>
            {videoUrl && (
              <video
                src={`${videoUrl}#t=${(shot.at * videoDuration).toFixed(1)}`}
                preload="metadata"
                muted
                playsInline
                className="absolute inset-0 size-full object-cover"
              />
            )}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/70 to-transparent" />
            <span className="absolute left-2 top-2 rounded-full bg-black/60 px-2 py-0.5 font-mono text-[11px] font-medium">
              {formatTime(shot.at * seconds)}
            </span>
            <span className="absolute bottom-2 left-2 grid size-6 place-items-center rounded-full bg-brand text-[11px] font-bold">{i + 1}</span>
          </div>
          <p className="mt-2 text-sm font-semibold leading-snug">{shot.title}</p>
          <p className="text-xs leading-snug text-mist">{shot.note}</p>
        </motion.li>
      ))}
    </ol>
  );
}
