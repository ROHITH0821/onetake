import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("inline-flex items-center gap-2 font-heading text-xl font-semibold tracking-tight", className)}>
      <span className="grid size-7 place-items-center rounded-lg bg-brand">
        <span className="ml-0.5 block size-0 border-y-[5px] border-l-[8px] border-y-transparent border-l-white" />
      </span>
      OneTake
    </Link>
  );
}
