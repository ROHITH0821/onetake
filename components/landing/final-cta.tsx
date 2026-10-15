import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { CTA_LABEL, GUARANTEE } from "@/lib/pricing";
import { Logo } from "../logo";
import { PriceBadge } from "../price-badge";
import { ScrollZoom, Words } from "../scroll-fx";

export function FinalCta() {
  return (
    <section className="px-4 py-12 sm:px-6">
      <ScrollZoom>
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] bg-brand px-6 py-16 text-center sm:py-24">
          <div className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-white/25 blur-3xl" aria-hidden />
          <div className="pointer-events-none absolute -bottom-24 -left-16 size-72 rounded-full bg-ink/30 blur-3xl" aria-hidden />
          <h2 className="relative text-[clamp(2.25rem,9vw,5rem)] font-semibold leading-[0.98] tracking-tight">
            <Words text="Got a clip?" />
            <br />
            <Words text="Make it a reel" delay={0.2} />
          </h2>
          <div className="relative mt-4 flex items-center justify-center gap-3 text-2xl font-semibold sm:text-3xl">
            for <PriceBadge size="lg" className="shadow-[0_0_40px_-4px_var(--color-price)]" />
          </div>
          <Link
            href="/create/upload"
            className="relative mt-8 inline-flex h-14 items-center gap-2 rounded-full bg-white px-8 text-lg font-semibold whitespace-nowrap text-ink shadow-xl transition-transform duration-200 hover:scale-[1.03] active:scale-[0.97] max-[359px]:px-5 max-[359px]:text-base"
          >
            {CTA_LABEL} <ArrowRight className="size-5" />
          </Link>
          <p className="relative mt-4 text-white/85">{GUARANTEE}</p>
        </div>
      </ScrollZoom>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="px-4 pb-28 pt-8 sm:px-6 md:pb-10">
      <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center">
        <div>
          <Logo />
          <p className="mt-2 text-sm text-mist">For everyone with a clip and a story.</p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-mist">
          <a href="#how-it-works" className="whitespace-nowrap hover:text-foreground">How it works</a>
          <a href="#demo" className="whitespace-nowrap hover:text-foreground">Try a sample</a>
          <a href="#pricing" className="whitespace-nowrap hover:text-foreground">Pricing</a>
          <a href="#faq" className="whitespace-nowrap hover:text-foreground">FAQ</a>
        </nav>
      </div>
    </footer>
  );
}
