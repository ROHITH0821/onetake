import { priceLabel } from "@/lib/pricing";
import { cn } from "@/lib/utils";

const sizes = {
  sm: "h-7 px-2.5 text-sm",
  md: "h-9 px-3.5 text-lg",
  lg: "h-14 px-5 text-3xl",
  xl: "h-20 px-7 text-5xl sm:h-24 sm:text-6xl",
};

type PriceBadgeProps = {
  size?: keyof typeof sizes;
  /** Small trailing text, e.g. "/ reel". */
  suffix?: string;
  className?: string;
};

/**
 * The one price accent on the page. Lime on ink, bold, softly glowing.
 * Use it wherever the price appears so it reads the same everywhere.
 */
export function PriceBadge({ size = "md", suffix, className }: PriceBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1 rounded-full bg-price font-heading font-bold leading-none whitespace-nowrap text-ink shadow-[0_0_28px_-6px_var(--color-price)]",
        sizes[size],
        className,
      )}
    >
      {priceLabel}
      {suffix && <span className="font-sans text-[0.5em] font-semibold opacity-70">{suffix}</span>}
    </span>
  );
}
