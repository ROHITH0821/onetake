"use client";

import { motion } from "framer-motion";
import { Check, CloudUpload, Film } from "lucide-react";
import { vibes } from "@/lib/mock-data";
import { BeatBars } from "../beat-bars";
import { DrawLine, FlipIn, Words } from "../scroll-fx";
import { TiltCard } from "../tilt-card";
import { priceLabel } from "@/lib/pricing";

const cycle = { duration: 3.2, repeat: Infinity, ease: "easeInOut" as const };

function UploadArt() {
  return (
    <div className="relative grid h-full place-items-center">
      <div className="grid size-28 place-items-center rounded-3xl border-2 border-dashed border-white/25">
        <CloudUpload className="size-8 text-mist" />
      </div>
      <motion.div
        className="absolute grid h-16 w-12 place-items-center rounded-xl bg-brand shadow-xl"
        animate={{ y: [70, 0, 0, 70], opacity: [0, 1, 1, 0], scale: [0.8, 1, 0.9, 0.8] }}
        transition={{ ...cycle, times: [0, 0.4, 0.8, 1] }}
      >
        <Film className="size-5" />
      </motion.div>
    </div>
  );
}

function VibeArt() {
  const chips = vibes.slice(0, 4);
  return (
    <div className="grid h-full place-content-center gap-2">
      <div className="grid grid-cols-2 gap-2">
        {chips.map((v, i) => (
          <motion.span
            key={v.id}
            className="rounded-full border border-white/15 px-3 py-2 text-center text-xs font-medium"
            animate={{
              backgroundColor: ["rgba(255,255,255,0.04)", "rgba(236,72,153,0.9)", "rgba(255,255,255,0.04)"],
              scale: [1, 1.08, 1],
            }}
            transition={{ duration: 0.9, repeat: Infinity, repeatDelay: 2.7, delay: i * 0.9 }}
          >
            {v.name}
          </motion.span>
        ))}
      </div>
      <BeatBars className="mx-auto mt-2 h-5" />
    </div>
  );
}

function ReelArt() {
  return (
    <div className="grid h-full place-items-center">
      <div className="relative h-32 w-[4.5rem] overflow-hidden rounded-2xl border border-white/20 bg-ink">
        <motion.div className="absolute inset-0 bg-brand" animate={{ opacity: [0, 0, 1, 1, 0] }} transition={{ ...cycle, times: [0, 0.45, 0.55, 0.9, 1] }} />
        <motion.div
          className="absolute inset-x-3 top-1/2 h-1 origin-left rounded-full bg-white"
          animate={{ scaleX: [0, 1, 1, 0], opacity: [1, 1, 0, 0] }}
          transition={{ ...cycle, times: [0, 0.45, 0.5, 1] }}
        />
        <motion.div
          className="absolute inset-0 grid place-items-center"
          animate={{ scale: [0, 0, 1.2, 1, 0], opacity: [0, 0, 1, 1, 0] }}
          transition={{ ...cycle, times: [0, 0.5, 0.6, 0.9, 1] }}
        >
          <span className="grid size-9 place-items-center rounded-full bg-white text-ink">
            <Check className="size-5" strokeWidth={3} />
          </span>
        </motion.div>
      </div>
    </div>
  );
}

const steps = [
  { title: "Upload", body: "Drop in any clip under a minute. Straight from your phone is perfect.", art: <UploadArt /> },
  { title: "Tap your vibe", body: "Pick a mood, a sound, captions and length. No prompts, no timeline.", art: <VibeArt /> },
  { title: "Get your reel", body: `See the edit plan first, pay ${priceLabel} only if you like it, then download.`, art: <ReelArt /> },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <h2 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-6xl">
          <Words text="Three taps." accent="That's the whole edit." />
        </h2>
        <DrawLine className="mt-10" />
        <ol className="mt-6 grid gap-4 md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title}>
              <FlipIn index={i} className="h-full">
                <TiltCard max={6} className="h-full">
                  <div className="glass flex h-full flex-col rounded-3xl p-5">
                    <div className="h-44 rounded-2xl bg-ink/60">{s.art}</div>
                    <p className="mt-5 font-heading text-5xl font-semibold text-brand">{i + 1}</p>
                    <h3 className="mt-1 text-2xl font-semibold">{s.title}</h3>
                    <p className="mt-2 text-mist">{s.body}</p>
                  </div>
                </TiltCard>
              </FlipIn>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
