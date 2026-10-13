import { cn } from "@/lib/utils";

type PhoneFrameProps = {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  /** Screen aspect ratio; defaults to a tall phone. */
  aspect?: string;
};

export function PhoneFrame({ children, className, glow = false, aspect = "9 / 19" }: PhoneFrameProps) {
  return (
    <div
      className={cn(
        "relative w-full rounded-[2.4rem] border border-white/15 bg-ink-3 p-2 shadow-2xl",
        glow && "glow",
        className,
      )}
    >
      <div className="@container relative overflow-hidden rounded-[1.9rem] bg-ink" style={{ aspectRatio: aspect }}>
        {children}
        <div className="pointer-events-none absolute left-1/2 top-2 z-20 h-5 w-[32%] -translate-x-1/2 rounded-full bg-black" />
      </div>
    </div>
  );
}
