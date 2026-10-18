import { ArrowRight } from "lucide-react";
import { GUARANTEE, CTA_LABEL } from "@/lib/pricing";
import { cn } from "@/lib/utils";
import { EarlyAccessLink } from "../early-access/early-access";

/** The ₹99 call to action. Links to the early-access form, so it works without JS. */
export function BlogCta({ title, body, className }: { title: string; body?: string; className?: string }) {
  return (
    <section className={cn("relative overflow-hidden rounded-3xl bg-brand p-6 sm:p-10", className)} aria-label="Edit your video with OneTake">
      <h2 className="relative max-w-xl text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">{title}</h2>
      {body && <p className="relative mt-2 max-w-xl text-white/90">{body}</p>}
      <EarlyAccessLink className="relative mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-base font-semibold whitespace-nowrap text-ink shadow-xl transition-transform hover:scale-[1.03] active:scale-[0.98]">
        {CTA_LABEL} <ArrowRight className="size-4" aria-hidden />
      </EarlyAccessLink>
      <p className="relative mt-3 text-sm text-white/85">{GUARANTEE}</p>
    </section>
  );
}
