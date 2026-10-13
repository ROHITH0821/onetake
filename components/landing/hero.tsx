"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Captions, Music2, Scissors } from "lucide-react";
import { useRef } from "react";
import { vibes } from "@/lib/mock-data";
import { GradientButton } from "../gradient-button";
import { PhoneFrame } from "../phone-frame";
import { Reel } from "../reel";
import { Words } from "../scroll-fx";

const loop = { duration: 8, repeat: Infinity, times: [0, 0.28, 0.42, 0.92, 1], ease: "easeInOut" as const };
const easeOut = [0.16, 1, 0.3, 1] as const;
/** Entrance waits for the intro curtain to lift. */
const INTRO = 1.25;

const badges = [
  { icon: Scissors, label: "Cuts on the beat", className: "-left-4 top-[18%] sm:-left-24", delay: 0, drift: -120 },
  { icon: Captions, label: "Auto captions", className: "-right-4 top-[42%] sm:-right-24", delay: 1.2, drift: -220 },
  { icon: Music2, label: "Trending sound", className: "-left-2 bottom-[16%] sm:-left-20", delay: 2.4, drift: -60 },
];

export function Hero() {
  const vibe = vibes[0];
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // Copy lifts away while the phone straightens up and swells toward the viewer.
  const copyY = useTransform(scrollYProgress, [0, 0.5], [0, -90]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const phoneRotateX = useTransform(scrollYProgress, [0, 0.45], [22, 0]);
  const phoneScale = useTransform(scrollYProgress, [0, 0.6], [0.94, 1.14]);
  const phoneY = useTransform(scrollYProgress, [0, 0.6], [0, -110]);
  const glowScale = useTransform(scrollYProgress, [0, 1], [1, 1.8]);
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 260]);
  const drifts = [
    useTransform(scrollYProgress, [0, 1], [0, badges[0].drift]),
    useTransform(scrollYProgress, [0, 1], [0, badges[1].drift]),
    useTransform(scrollYProgress, [0, 1], [0, badges[2].drift]),
  ];

  return (
    <section ref={ref} className="relative overflow-hidden px-4 pb-24 pt-32 sm:px-6 sm:pt-40">
      <motion.div
        className="pointer-events-none absolute left-1/2 top-24 -ml-[19rem] size-[38rem] orb rounded-full bg-brand opacity-45 will-change-transform"
        style={{ scale: glowScale, y: glowY }}
        aria-hidden
      />

      <div className="relative mx-auto flex max-w-5xl flex-col items-center text-center">
        <motion.div className="flex flex-col items-center" style={{ y: copyY, opacity: copyOpacity }}>
          <h1 className="text-[clamp(2.75rem,12vw,6.5rem)] font-semibold leading-[0.95] tracking-tight">
            <Words text="Raw clip in." accent="Reel out." stack delay={INTRO} />
          </h1>
          <motion.p
            className="mt-5 max-w-md text-lg text-mist sm:text-xl"
            initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: INTRO + 0.35, ease: easeOut }}
          >
            Upload your clip. Tap your vibe. Get a reel worth posting.
          </motion.p>
          <motion.div
            className="mt-8 flex flex-col items-center gap-3"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 18, delay: INTRO + 0.5 }}
          >
            <GradientButton href="/create/upload" size="lg">
              Edit my video <ArrowRight />
            </GradientButton>
            <p className="text-sm text-mist">Clips under 1 minute · See the plan before you pay</p>
          </motion.div>
        </motion.div>

        <motion.div className="relative mt-14 w-[min(72vw,19rem)]" style={{ rotateX: phoneRotateX, scale: phoneScale, y: phoneY, transformPerspective: 1100 }}>
          <motion.div
            initial={{ opacity: 0, y: 140, rotate: -10, scale: 0.8 }}
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
            <motion.div key={label} className={`absolute hidden min-[420px]:block ${className}`} style={{ y: drifts[i] }}>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 16, delay: INTRO + 0.9 + i * 0.15 }}
              >
                <div className="glass-blur flex animate-float items-center gap-2 rounded-full px-3 py-2 text-xs font-medium whitespace-nowrap" style={{ animationDelay: `${delay}s` }}>
                  <Icon className="size-4 text-pink" />
                  {label}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
