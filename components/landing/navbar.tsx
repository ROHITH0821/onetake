"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { GradientButton } from "../gradient-button";
import { Logo } from "../logo";
import { PriceBadge } from "../price-badge";
import { CTA_LABEL, priceLabel } from "@/lib/pricing";

const links = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#demo", label: "Try a sample" },
  { href: "#faq", label: "FAQ" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  // Tuck away while scrolling down the page, drop back in on the way up.
  useMotionValueEvent(scrollY, "change", (y) => {
    const delta = y - (scrollY.getPrevious() ?? 0);
    if (y < 120) setHidden(false);
    else if (Math.abs(delta) > 4) setHidden(delta > 0);
  });

  return (
    <motion.header
      className="fixed inset-x-0 top-3 z-50 px-3 sm:top-4 sm:px-6"
      initial={false}
      animate={{ y: hidden && !open ? "-140%" : "0%" }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      onFocusCapture={() => setHidden(false)}
    >
      <nav className="glass-blur mx-auto max-w-5xl rounded-3xl px-2 py-2 sm:px-4" aria-label="Main">
        <div className="flex items-center justify-between gap-2">
          <Logo className="pl-1 max-[359px]:text-lg" />
          <ul className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="rounded-full px-4 py-2 text-sm text-mist transition-colors hover:bg-white/10 hover:text-foreground">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-1.5">
            <a href="#pricing" aria-label={`Pricing: ${priceLabel} per reel`} className="rounded-full transition-transform hover:scale-105 max-[359px]:hidden">
              <PriceBadge size="sm" />
            </a>
            <GradientButton href="/create/upload" size="sm" className="max-[359px]:px-3 max-[359px]:text-xs">
              <span className="lg:hidden">Edit my video</span>
              <span className="hidden lg:inline">{CTA_LABEL}</span>
            </GradientButton>
            <button
              type="button"
              className="grid size-10 place-items-center rounded-full transition-colors hover:bg-white/10 md:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
        <AnimatePresence initial={false}>
          {open && (
            <motion.ul
              className="overflow-hidden md:hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              {[...links, { href: "#pricing", label: `Pricing · ${priceLabel}` }].map((l) => (
                <li key={l.href}>
                  <a href={l.href} onClick={() => setOpen(false)} className="block rounded-xl px-3 py-3 text-base hover:bg-white/10">
                    {l.label}
                  </a>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
