"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { CTA_LABEL, TRUST_LINE } from "@/lib/pricing";
import { GradientButton } from "../gradient-button";
import { PriceBadge } from "../price-badge";
import { Words } from "../scroll-fx";
import { TimelineCollapse } from "./timeline-collapse";

const easeOut = [0.16, 1, 0.3, 1] as const;
/** Entrance waits for the intro curtain to lift. */
const INTRO = 1.25;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const glowScale = useTransform(scrollYProgress, [0, 1], [1, 1.6]);
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section ref={ref} id="top" className="relative overflow-hidden px-4 pb-20 pt-28 sm:px-6 sm:pt-36">
      <motion.div
        className="pointer-events-none absolute left-1/2 top-16 -ml-[19rem] size-[38rem] orb rounded-full bg-brand opacity-40 will-change-transform"
        style={{ scale: glowScale, y: glowY }}
        aria-hidden
      />

      <motion.div className="relative mx-auto flex max-w-4xl flex-col items-center text-center" style={{ y: contentY }}>
        <h1 className="text-[clamp(2.75rem,11vw,6rem)] font-semibold leading-[0.98] tracking-tight">
          <Words text="Skip the" accent="2-hour edit." stack delay={INTRO} />
        </h1>

        <motion.p
          className="mt-5 flex max-w-2xl flex-wrap items-center justify-center gap-x-2 gap-y-2 text-lg font-medium text-balance sm:text-2xl"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: INTRO + 0.7, ease: easeOut }}
        >
          Upload your clip. Tap your vibe. Get a reel worth posting, for just <PriceBadge size="md" />
        </motion.p>

        <motion.div
          className="mt-8 w-full"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: INTRO + 0.4, ease: easeOut }}
        >
          <TimelineCollapse delay={INTRO + 0.6} className="mx-auto" />
        </motion.div>

        <motion.div
          className="mt-6 flex flex-col items-center gap-3"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 18, delay: INTRO + 0.9 }}
        >
          <GradientButton href="/create/upload" size="lg" className="max-[359px]:px-5 max-[359px]:text-base">
            {CTA_LABEL} <ArrowRight />
          </GradientButton>
          <p className="max-w-xs text-sm text-mist sm:max-w-none">{TRUST_LINE}</p>
        </motion.div>
      </motion.div>
    </section>
  );
}
