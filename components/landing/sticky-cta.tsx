"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { PriceBadge } from "../price-badge";

/**
 * Mobile-only bottom bar. Appears once the hero is behind you and steps
 * aside near the end of the page, where the final CTA takes over.
 */
export function StickyCta() {
  const [visible, setVisible] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const pastHero = y > window.innerHeight * 0.9;
    const nearEnd = y + window.innerHeight > document.documentElement.scrollHeight - 900;
    setVisible(pastHero && !nearEnd);
  });

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden"
          initial={{ y: "120%" }}
          animate={{ y: 0 }}
          exit={{ y: "120%" }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="glass-blur flex items-center justify-between gap-3 rounded-2xl p-2 pl-4 shadow-2xl">
            <span className="flex items-center gap-2 text-sm font-semibold">
              Your reel for <PriceBadge size="sm" />
            </span>
            <Link
              href="/create/upload"
              className="inline-flex h-11 items-center gap-1.5 rounded-xl bg-brand px-4 text-sm font-semibold whitespace-nowrap text-white active:scale-95"
            >
              Edit my video <ArrowRight className="size-4" />
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
