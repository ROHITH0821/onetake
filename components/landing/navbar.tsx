"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Logo } from "../logo";
import { nav, navHref } from "@/lib/content";
import { CTA_LABEL, CTA_SHORT } from "@/lib/pricing";
import { EarlyAccessButton } from "../early-access/early-access";

const links = nav;

export function Navbar({ onHome = true }: { onHome?: boolean }) {
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
          <ul className="hidden items-center lg:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a href={navHref(l.href, onHome)} className="rounded-full px-3 py-2 text-sm whitespace-nowrap text-mist transition-colors hover:bg-white/10 hover:text-foreground">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-1.5">
            <EarlyAccessButton size="sm" className="max-[359px]:px-3 max-[359px]:text-xs">
              <span className="max-[399px]:hidden">{CTA_LABEL}</span>
              <span className="min-[400px]:hidden">{CTA_SHORT}</span>
            </EarlyAccessButton>
            <button
              type="button"
              className="grid size-10 place-items-center rounded-full transition-colors hover:bg-white/10 lg:hidden"
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
              className="overflow-hidden lg:hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              {links.map((l) => (
                <li key={l.href}>
                  <a href={navHref(l.href, onHome)} onClick={() => setOpen(false)} className="block rounded-xl px-3 py-3 text-base hover:bg-white/10">
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
