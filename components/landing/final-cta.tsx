import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { finalCta, footer, legalNav, nav, navHref } from "@/lib/content";
import { CTA_LABEL, CTA_SHORT } from "@/lib/pricing";
import { site } from "@/lib/site";
import { Logo } from "../logo";
import { ScrollZoom, Words } from "../scroll-fx";
import { EarlyAccessButton } from "../early-access/early-access";

export function FinalCta() {
  return (
    <section className="px-4 py-12 sm:px-6">
      <ScrollZoom>
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] bg-brand px-6 py-16 text-center sm:py-24">
          <div className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-white/25 blur-3xl" aria-hidden />
          <div className="pointer-events-none absolute -bottom-24 -left-16 size-72 rounded-full bg-ink/30 blur-3xl" aria-hidden />
          <h2 className="relative mx-auto max-w-3xl text-[clamp(2rem,7vw,4.25rem)] font-semibold leading-[1.02] tracking-tight">
            <Words text={finalCta.headline} /> <Words text={finalCta.headlineEnd} delay={0.2} />
          </h2>
          <p className="relative mx-auto mt-4 max-w-md text-lg text-white/90">{finalCta.subtext}</p>
          <EarlyAccessButton
            variant="plain"
            className="relative mt-8 inline-flex h-14 items-center gap-2 rounded-full bg-white px-8 text-lg font-semibold whitespace-nowrap text-ink shadow-xl transition-transform duration-200 hover:scale-[1.03] active:scale-[0.97]"
          >
            <span className="max-[359px]:hidden">{CTA_LABEL}</span>
            <span className="min-[360px]:hidden">{CTA_SHORT}</span>
            <ArrowRight className="size-5" />
          </EarlyAccessButton>
        </div>
      </ScrollZoom>
    </section>
  );
}

export function Footer({ onHome = true }: { onHome?: boolean }) {
  return (
    <footer className="px-4 pb-28 pt-8 sm:px-6 md:pb-10">
      <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center">
        <div>
          <Logo />
          <p className="mt-2 max-w-xs text-sm text-mist">{footer.tagline}</p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-mist">
          {nav.map((l) => (
            <a key={l.href} href={navHref(l.href, onHome)} className="whitespace-nowrap hover:text-foreground">
              {l.label}
            </a>
          ))}
        </nav>
      </div>
      <div className="mx-auto mt-6 flex max-w-5xl flex-wrap items-center justify-between gap-x-6 gap-y-2 text-xs text-mist">
        <p>
          {site.name} is run by {site.operator}.
        </p>
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          {legalNav.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="hover:text-foreground">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
