import { cn } from "@/lib/utils";

const delays = [0, 0.2, 0.05, 0.3, 0.12];

/** Beat-pulse meter used on anything musical. */
export function BeatBars({ playing = true, className }: { playing?: boolean; className?: string }) {
  return (
    <span className={cn("inline-flex h-4 items-end gap-[3px]", className)} aria-hidden>
      {delays.map((d, i) => (
        <span
          key={i}
          className="h-full w-[3px] origin-bottom animate-beat rounded-full bg-white"
          style={{ animationDelay: `${d}s`, animationPlayState: playing ? "running" : "paused" }}
        />
      ))}
    </span>
  );
}
