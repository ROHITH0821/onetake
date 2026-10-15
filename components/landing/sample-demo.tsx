"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Play, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { demoStoryboards, vibes, type VibeId } from "@/lib/mock-data";
import { priceLabel } from "@/lib/pricing";
import { Chip } from "../flow/controls";
import { GradientButton } from "../gradient-button";
import { PhoneFrame } from "../phone-frame";
import { Reel } from "../reel";
import { Words } from "../scroll-fx";

type Phase = "pick" | "planning" | "plan" | "reel";

const stepLabels = ["Pick a vibe", "See the plan", "Watch the reel"];

/** No-upload demo: pick a vibe, get a storyboard, play the finished sample reel. */
export function SampleDemo() {
  const [vibe, setVibe] = useState<VibeId | null>(null);
  const [phase, setPhase] = useState<Phase>("pick");
  const board = vibe ? demoStoryboards[vibe] : null;
  const vibeData = vibes.find((v) => v.id === vibe) ?? vibes[0];
  const stepIndex = phase === "pick" ? 0 : phase === "reel" ? 2 : 1;

  useEffect(() => {
    if (phase !== "planning") return;
    const t = setTimeout(() => setPhase("plan"), 1100);
    return () => clearTimeout(t);
  }, [phase]);

  const choose = (id: VibeId) => {
    setVibe(id);
    setPhase("planning");
  };

  return (
    <section id="demo" className="px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <h2 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">
          <Words text="Try it with" accent="a sample clip." />
        </h2>
        <p className="mt-3 max-w-xl text-lg text-mist">No upload needed. Pick a vibe and see exactly what you&apos;d get.</p>

        <div className="glass mt-10 grid gap-8 rounded-3xl p-4 sm:p-8 lg:grid-cols-[minmax(0,1fr)_16rem]">
          <div className="min-w-0">
            <ol className="flex flex-wrap gap-2 text-xs font-semibold" aria-label="Demo steps">
              {stepLabels.map((s, i) => (
                <li
                  key={s}
                  aria-current={i === stepIndex ? "step" : undefined}
                  className={`rounded-full px-3 py-1.5 transition-colors ${i <= stepIndex ? "bg-white text-ink" : "bg-white/5 text-mist"}`}
                >
                  {i + 1}. {s}
                </li>
              ))}
            </ol>

            <p className="mt-6 text-sm font-medium text-mist">Choose a vibe</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {vibes.map((v) => (
                <Chip key={v.id} selected={vibe === v.id} onClick={() => choose(v.id)}>
                  {v.name}
                </Chip>
              ))}
            </div>

            <div className="mt-6 min-h-64" aria-live="polite">
              <AnimatePresence mode="wait">
                {phase === "pick" && (
                  <motion.p key="pick" className="grid h-64 place-items-center rounded-2xl border border-dashed border-white/15 px-6 text-center text-mist" exit={{ opacity: 0 }}>
                    Your storyboard will appear here.
                  </motion.p>
                )}

                {phase === "planning" && (
                  <motion.div key="planning" exit={{ opacity: 0 }} className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {Array.from({ length: 4 }, (_, i) => (
                      <div key={i}>
                        <div className="aspect-[9/14] animate-pulse rounded-xl bg-white/10" style={{ animationDelay: `${i * 0.12}s` }} />
                        <div className="mt-2 h-3 w-2/3 animate-pulse rounded bg-white/10" />
                      </div>
                    ))}
                    <p className="col-span-full text-sm text-mist">Planning your {vibeData.name.toLowerCase()} edit…</p>
                  </motion.div>
                )}

                {(phase === "plan" || phase === "reel") && board && (
                  <motion.div key={`plan-${vibe}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <p className="text-sm text-mist">
                      Sample: <span className="font-semibold text-foreground">{board.title}</span>
                    </p>
                    <ol className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                      {board.shots.map((s, i) => (
                        <motion.li
                          key={s.label}
                          initial={{ opacity: 0, y: 16, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ delay: i * 0.1, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <div className="relative aspect-[9/14] overflow-hidden rounded-xl border border-white/10" style={{ background: vibeData.scenes[i % 4] }}>
                            <video src={`${s.clip}#t=${s.at}`} preload="metadata" muted playsInline className="absolute inset-0 size-full object-cover" />
                            <span className="absolute left-1.5 top-1.5 rounded-full bg-black/60 px-1.5 py-0.5 font-mono text-[10px]">0:0{i * 3}</span>
                            <span className="absolute inset-x-1.5 bottom-1.5 rounded-md bg-white px-1.5 py-1 text-center text-[10px] font-bold leading-tight text-ink">
                              {s.caption}
                            </span>
                          </div>
                          <p className="mt-1.5 text-sm font-semibold">{s.label}</p>
                        </motion.li>
                      ))}
                    </ol>
                    <div className="mt-5 flex flex-wrap items-center gap-3">
                      {phase === "plan" ? (
                        <button
                          type="button"
                          onClick={() => setPhase("reel")}
                          className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 font-semibold whitespace-nowrap text-ink transition-transform active:scale-95"
                        >
                          <Play className="size-4 fill-ink" /> Play the reel
                        </button>
                      ) : (
                        <GradientButton href="/create/upload">
                          Now do this with your clip, {priceLabel} <ArrowRight />
                        </GradientButton>
                      )}
                      <button
                        type="button"
                        onClick={() => {
                          setVibe(null);
                          setPhase("pick");
                        }}
                        className="inline-flex h-12 items-center gap-2 rounded-full px-4 text-sm text-mist whitespace-nowrap hover:bg-white/10 hover:text-foreground"
                      >
                        <RotateCcw className="size-4" /> Start over
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className={phase === "reel" ? "block" : "hidden lg:block"}>
            <PhoneFrame glow={phase === "reel"} className="mx-auto w-[min(62vw,15rem)]">
              {phase === "reel" && board ? (
                <motion.div className="size-full" initial={{ opacity: 0, scale: 1.08 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
                  <Reel scenes={vibeData.scenes} video={board.reel} words={board.words} />
                </motion.div>
              ) : (
                <div className="grid size-full place-items-center p-6 text-center text-sm text-mist">Your finished reel plays here</div>
              )}
            </PhoneFrame>
          </div>
        </div>
      </div>
    </section>
  );
}
