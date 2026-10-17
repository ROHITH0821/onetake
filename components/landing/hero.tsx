"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Captions, Music2, Scissors } from "lucide-react";
import { useRef } from "react";
import { hero } from "@/lib/content";
import { vibes } from "@/lib/mock-data";
import { CTA_LABEL, CTA_SHORT } from "@/lib/pricing";
import { PhoneFrame } from "../phone-frame";
import { Reel } from "../reel";
import { Words } from "../scroll-fx";
import { EarlyAccessButton } from "../early-access/early-access";

const loop = { duration: 8, repeat: Infinity, times: [0, 0.28, 0.42, 0.92, 1], ease: "easeInOut" as const };
const easeOut = [0.16, 1, 0.3, 1] as const;
/** Entrance waits for the intro curtain to lift. */
const INTRO = 0.45;

const badges = [
  { icon: Scissors, label: "Cuts on the beat", className: "-left-6 top-[16%] sm:-left-20", delay: 0 },
  { icon: Captions, label: "Auto captions", className: "-right-6 top-[44%] sm:-right-20", delay: 1.2 },
  { icon: Music2, label: "Synced to the beat", className: "-left-4 bottom-[14%] sm:-left-16", delay: 2.4 },
];

export function Hero() {
  const vibe = vibes[0];
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const glowScale = useTransform(scrollYProgress, [0, 1], [1, 1.6]);
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const phoneY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const phoneRotate = useTransform(scrollYProgress, [0, 0.6], [12, 0]);

  return (
    <section ref={ref} id="top" className="relative overflow-hidden px-4 pb-16 pt-28 sm:px-6 sm:pt-36">
      <motion.div
        className="pointer-events-none absolute left-1/2 top-16 -ml-[19rem] size-[38rem] orb rounded-full bg-brand opacity-40 will-change-transform"
        style={{ scale: glowScale, y: glowY }}
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-5xl items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,19rem)]">
        <div className="text-center lg:text-left">
          <h1 className="text-[clamp(2.6rem,9vw,4.75rem)] font-semibold leading-[1] tracking-tight">
            <Words text={hero.headline} accent={hero.headlineAccent} stack delay={INTRO} />
          </h1>
          <motion.p
            className="mx-auto mt-5 max-w-xl text-lg text-mist sm:text-xl lg:mx-0"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: INTRO + 0.6, ease: easeOut }}
          >
            {hero.subtext}
          </motion.p>
          <motion.div
            className="mt-8 flex flex-col items-center gap-4 lg:items-start"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 18, delay: INTRO + 0.75 }}
          >
            <EarlyAccessButton size="lg">
              <span className="max-[359px]:hidden">{CTA_LABEL}</span>
              <span className="min-[360px]:hidden">{CTA_SHORT}</span>
              <ArrowRight />
            </EarlyAccessButton>
            <p className="text-sm text-mist">{hero.note}</p>
          </motion.div>
        </div>

        <motion.div className="relative mx-auto w-[min(66vw,17rem)]" style={{ y: phoneY, rotateX: phoneRotate, transformPerspective: 1100 }}>
          <motion.div
            initial={{ opacity: 0, y: 120, rotate: -8, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 70, damping: 14, delay: INTRO + 0.3 }}
          >
            <PhoneFrame glow>
              <Reel variant="raw" video={vibe.video} sync="hero" />
              <span className="absolute bottom-4 left-4 rounded-full bg-black/60 px-3 py-1 text-xs font-medium">Raw clip</span>
              <motion.div
                className="absolute inset-0"
                animate={{ clipPath: ["inset(0 100% 0 0)", "inset(0 100% 0 0)", "inset(0 0% 0 0)", "inset(0 0% 0 0)", "inset(0 100% 0 0)"] }}
                transition={loop}
              >
                <Reel scenes={vibe.scenes} video={vibe.video} sync="hero" words={vibe.words} />
                <span className="absolute bottom-4 right-4 rounded-full bg-brand px-3 py-1 text-xs font-semibold">OneTake reel</span>
              </motion.div>
              <motion.div
                className="absolute inset-y-0 left-0 w-1 bg-white shadow-[0_0_30px_6px_var(--color-pink)]"
                animate={{ x: ["0cqw", "0cqw", "100cqw", "100cqw", "0cqw"], opacity: [0, 1, 1, 0, 0] }}
                transition={loop}
                aria-hidden
              />
            </PhoneFrame>
          </motion.div>

          {badges.map(({ icon: Icon, label, className, delay }, i) => (
            <motion.div
              key={label}
              className={`absolute hidden min-[420px]:block ${className}`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 16, delay: INTRO + 0.9 + i * 0.15 }}
            >
              <div className="glass-blur flex animate-float items-center gap-2 rounded-full px-3 py-2 text-xs font-medium whitespace-nowrap" style={{ animationDelay: `${delay}s` }}>
                <Icon className="size-4 text-pink" />
                {label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
