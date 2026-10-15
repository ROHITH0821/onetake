"use client";

import { motion, useScroll } from "framer-motion";
import { Check } from "lucide-react";
import { useRef } from "react";
import { vibes } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { Words } from "../scroll-fx";

const frames = vibes.map((v) => v.scenes[0]);
const loop = { duration: 3, repeat: Infinity, ease: "easeInOut" as const };

function Frames({ highlight }: { highlight?: number }) {
  return (
    <div className="flex h-full items-center gap-1">
      {frames.map((bg, i) => (
        <motion.span
          key={i}
          className={cn("h-3/4 flex-1 rounded-md", highlight === i && "ring-2 ring-price")}
          style={{ background: bg }}
          animate={highlight === i ? { scale: [1, 1.15, 1.15, 1] } : undefined}
          transition={highlight === i ? { ...loop, times: [0, 0.2, 0.8, 1] } : undefined}
        />
      ))}
    </div>
  );
}

function ScanArt() {
  return (
    <div className="@container relative h-full">
      <Frames />
      <motion.span
        className="absolute inset-y-1 left-0 w-1 rounded-full bg-white shadow-[0_0_14px_3px_white]"
        animate={{ x: ["0cqw", "98cqw", "0cqw"] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

function HookArt() {
  return (
    <div className="relative h-full">
      <Frames highlight={2} />
      <span className="absolute -top-1 left-1/2 -translate-x-1/2 rounded-full bg-price px-1.5 py-0.5 text-[9px] font-bold text-ink">HOOK</span>
    </div>
  );
}

const wave = Array.from({ length: 28 }, (_, i) => 25 + ((i * 41) % 75));

function BeatArt() {
  return (
    <div className="relative flex h-full flex-col justify-center gap-1">
      <div className="flex justify-between px-1">
        {Array.from({ length: 7 }, (_, i) => (
          <motion.span
            key={i}
            className="size-1.5 rounded-full bg-orange"
            animate={{ scale: [1, 1.8, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.6, repeatDelay: 3.6 }}
          />
        ))}
      </div>
      <div className="flex h-1/2 items-center gap-[2px]">
        {wave.map((h, i) => (
          <span key={i} className={cn("flex-1 rounded-full", i % 4 === 0 ? "bg-orange" : "bg-mint/70")} style={{ height: `${h}%` }} />
        ))}
      </div>
    </div>
  );
}

function ReframeArt() {
  return (
    <div className="@container relative h-full overflow-hidden rounded-md" style={{ background: frames[1] }}>
      <span className="absolute bottom-0 left-[38%] h-3/4 w-[22%] rounded-t-full bg-black/30" />
      <motion.span
        className="absolute inset-y-1 w-[34%] rounded-md border-2 border-dashed border-white"
        animate={{ x: ["10cqw", "30cqw", "20cqw", "10cqw"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="absolute left-1/2 top-[12%] size-4 -translate-x-1/2 rounded-sm border border-price" />
        <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 text-[8px] font-bold text-white">9:16</span>
      </motion.span>
    </div>
  );
}

const captionWords = ["cuts", "land", "on", "beat"];

function CaptionArt() {
  return (
    <div className="flex h-full items-center justify-center gap-1">
      {captionWords.map((w, i) => (
        <motion.span
          key={w}
          className="rounded bg-white px-1.5 py-0.5 font-heading text-[11px] font-bold uppercase text-ink"
          animate={{ opacity: [0, 0, 1, 1, 0], y: [6, 6, 0, 0, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, times: [0, i * 0.12, i * 0.12 + 0.06, 0.88, 1] }}
        >
          {w}
        </motion.span>
      ))}
    </div>
  );
}

function CheckArt() {
  return (
    <div className="flex h-full flex-col justify-center gap-1.5">
      {["Captions", "Beat sync", "Framing"].map((t, i) => (
        <div key={t} className="flex items-center gap-1.5 text-[10px] text-mist">
          <motion.span
            className="grid size-3.5 place-items-center rounded-sm bg-mint text-ink"
            animate={{ scale: [0, 0, 1, 1, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, times: [0, 0.15 + i * 0.15, 0.22 + i * 0.15, 0.9, 1] }}
          >
            <Check className="size-2.5" strokeWidth={4} />
          </motion.span>
          {t}
        </div>
      ))}
    </div>
  );
}

const steps = [
  { title: "Scans your clip", body: "Watches every frame, finds faces, motion and sound.", art: <ScanArt /> },
  { title: "Picks the hook", body: "Your strongest second goes first.", art: <HookArt /> },
  { title: "Maps the beat", body: "Finds every beat in the sound you picked.", art: <BeatArt /> },
  { title: "Cuts & reframes", body: "Cuts on the beat, keeps faces in the 9:16 frame.", art: <ReframeArt /> },
  { title: "Adds captions", body: "Timed word by word, in your language.", art: <CaptionArt /> },
  { title: "Checks its own work", body: "A second pass watches it back before you do.", art: <CheckArt /> },
];

/** Transparent AI: what actually happens after you tap. */
export function Pipeline() {
  const list = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: list, offset: ["start 75%", "end 60%"] });

  return (
    <section className="px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <h2 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">
          <Words text="What happens" accent="behind the tap." />
        </h2>
        <p className="mt-3 max-w-xl text-lg text-mist">No black box. Here&apos;s every step the AI takes with your clip.</p>

        <ol ref={list} className="relative mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-6 lg:gap-3">
          {/* Progress line: vertical on phones, across the top on desktop. */}
          <div className="absolute bottom-6 left-[1.2rem] top-6 w-0.5 overflow-hidden rounded-full bg-white/10 sm:hidden" aria-hidden>
            <motion.div className="h-full origin-top bg-brand" style={{ scaleY: scrollYProgress }} />
          </div>
          <div className="absolute -top-5 left-0 right-0 hidden h-0.5 overflow-hidden rounded-full bg-white/10 lg:block" aria-hidden>
            <motion.div className="h-full origin-left bg-brand" style={{ scaleX: scrollYProgress }} />
          </div>

          {steps.map((s, i) => (
            <motion.li
              key={s.title}
              className="relative flex gap-3 sm:flex-col"
              initial={{ opacity: 0.25, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-25% 0px -25% 0px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="relative z-10 grid size-10 shrink-0 place-items-center rounded-full bg-brand font-heading text-sm font-semibold sm:hidden">
                {i + 1}
              </span>
              <div className="glass flex flex-1 gap-3 rounded-2xl p-3 sm:flex-col sm:p-4">
                <div className="h-20 w-28 shrink-0 rounded-xl bg-ink/70 p-2 sm:w-full" aria-hidden>
                  {s.art}
                </div>
                <div className="min-w-0">
                  <p className="hidden font-mono text-xs text-mist sm:block">0{i + 1}</p>
                  <h3 className="text-base font-semibold leading-snug">{s.title}</h3>
                  <p className="mt-1 text-xs leading-snug text-mist sm:text-sm">{s.body}</p>
                </div>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
