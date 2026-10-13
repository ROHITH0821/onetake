/**
 * Opening curtain: logo lands, a beat bar fills, then the curtain lifts.
 * Pure CSS so it still clears if scripts are slow to load.
 */
export function Intro() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[100] grid animate-intro-curtain place-items-center bg-ink [clip-path:inset(0)]" aria-hidden>
      <div className="absolute left-1/2 top-1/2 size-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand opacity-30 blur-[100px]" />
      <div className="relative flex animate-intro-logo flex-col items-center gap-5">
        <div className="flex items-center gap-3 font-heading text-5xl font-semibold tracking-tight sm:text-6xl">
          <span className="grid size-12 place-items-center rounded-2xl bg-brand sm:size-14">
            <span className="ml-1 block size-0 border-y-[9px] border-l-[15px] border-y-transparent border-l-white" />
          </span>
          OneTake
        </div>
        <div className="h-1 w-40 overflow-hidden rounded-full bg-white/10">
          <div className="h-full origin-left animate-intro-bar bg-brand" />
        </div>
      </div>
    </div>
  );
}
