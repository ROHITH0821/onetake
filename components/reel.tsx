import { cn } from "@/lib/utils";
import { BeatBars } from "./beat-bars";
import { LazyVideo } from "./lazy-video";

const subjects = [
  "left-1/2 bottom-0 h-[58%] w-[46%] -translate-x-1/2",
  "left-[18%] bottom-0 h-[72%] w-[52%]",
  "left-[40%] bottom-0 h-[46%] w-[38%]",
  "left-[8%] bottom-0 h-[64%] w-[44%]",
];

/** Soft silhouette so the gradient blocks read as "footage of someone". */
function Subject({ index }: { index: number }) {
  return (
    <div className={cn("absolute", subjects[index % subjects.length])}>
      <div className="mx-auto aspect-square w-[46%] rounded-full bg-black/25" />
      <div className="mt-[4%] h-full w-full rounded-t-[45%] bg-black/25" />
    </div>
  );
}

type ReelProps = {
  variant?: "edited" | "raw";
  scenes?: string[];
  /** Real footage; the gradient scenes become the loading backdrop. */
  video?: string;
  /** Keep a raw/edited pair of the same clip in step (pass the same key to both). */
  sync?: string;
  words?: readonly string[];
  captions?: boolean;
  beat?: boolean;
  className?: string;
};

/**
 * A reel preview. With `video` it plays real footage; without, looping CSS
 * scenes stand in. `edited` is the graded clip with captions and a beat meter;
 * `raw` is the same clip dull, shaky and crooked.
 */
export function Reel({
  variant = "edited",
  scenes = [],
  video,
  sync,
  words,
  captions = true,
  beat = true,
  className,
}: ReelProps) {
  if (variant === "raw") {
    return (
      <div
        className={cn(
          "relative h-full w-full overflow-hidden bg-raw-3",
          className,
        )}
        aria-hidden
      >
        <div className="absolute inset-0 animate-shake bg-linear-to-b from-raw-2 via-raw-1 to-raw-3">
          {video ? (
            <LazyVideo
              src={video}
              sync={sync}
              className="size-full object-cover blur-[0.6px] brightness-[0.62] contrast-[0.82] saturate-[0.35] sepia-[0.25]"
            />
          ) : (
            <>
              <div className="absolute inset-x-0 top-[38%] h-px bg-white/15" />
              <Subject index={1} />
            </>
          )}
        </div>
        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-black/50 px-2 py-1 text-[10px] font-medium tracking-wide text-white/80">
          <span className="size-1.5 animate-rec rounded-full bg-destructive" />
          REC
        </div>
        <div className="absolute right-3 top-3 rounded-full bg-black/50 px-2 py-1 font-mono text-[10px] text-white/70">
          0:47
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn("relative h-full w-full overflow-hidden bg-ink", className)}
      aria-hidden
    >
      {video ? (
        <>
          <div className="absolute inset-0" style={{ background: scenes[0] }} />
          <LazyVideo
            src={video}
            sync={sync}
            lead
            className="absolute inset-0 size-full object-cover"
          />
        </>
      ) : (
        <>
          <div className="absolute inset-x-0 top-0 h-[400%] animate-reel-cuts">
            {scenes.slice(0, 4).map((bg, i) => (
              <div key={i} className="relative h-1/4 w-full overflow-hidden">
                <div
                  className="absolute inset-0 animate-kenburns"
                  style={{ background: bg }}
                >
                  <div className="absolute -right-[10%] top-[8%] aspect-square w-[55%] rounded-full bg-white/25 blur-2xl" />
                  <Subject index={i} />
                </div>
              </div>
            ))}
          </div>
          <div className="absolute inset-0 animate-cut-flash bg-white opacity-0" />
        </>
      )}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/60 to-transparent" />
      {captions && words && (
        <div className="absolute inset-x-0 bottom-[22%] grid place-items-center">
          {words.slice(0, 4).map((w, i) => (
            <span
              key={i}
              className="col-start-1 row-start-1 animate-caption-word rounded-lg bg-white px-2.5 py-1 font-heading text-[clamp(0.9rem,7cqw,1.6rem)] font-bold uppercase leading-none text-ink opacity-0 shadow-lg"
              style={{ animationDelay: `${i * 0.6}s` }}
            >
              {w}
            </span>
          ))}
        </div>
      )}
      {beat && <BeatBars className="absolute bottom-3 left-3 h-4" />}
    </div>
  );
}
