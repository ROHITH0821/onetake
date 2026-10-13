"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Camera, Download, MessageCircle, WandSparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BeatBars } from "@/components/beat-bars";
import { Chip, Segmented } from "@/components/flow/controls";
import { GradientButton } from "@/components/gradient-button";
import { PhoneFrame } from "@/components/phone-frame";
import { Reel } from "@/components/reel";
import { useFlow } from "@/lib/flow-store";
import { tweakChips, vibeById } from "@/lib/mock-data";

const views = ["After", "Before"] as const;
const aspects: Record<string, string> = { "9:16": "9 / 16", "1:1": "1 / 1", "16:9": "16 / 9" };
const confettiColors = ["var(--color-violet)", "var(--color-pink)", "var(--color-orange)", "#ffffff", "var(--color-mint)"];

type Piece = { id: number; x: number; y: number; rotate: number; color: string; delay: number; wide: boolean };

// Deterministic pseudo-random spread, so server and client markup match.
const rand = (n: number) => {
  const v = Math.sin(n * 12.9898) * 43758.5453;
  return v - Math.floor(v);
};

const pieces: Piece[] = Array.from({ length: 48 }, (_, id) => ({
  id,
  x: (rand(id + 1) - 0.5) * 110,
  y: 30 + rand(id + 101) * 70,
  rotate: rand(id + 201) * 720 - 360,
  color: confettiColors[id % confettiColors.length],
  delay: rand(id + 301) * 0.25,
  wide: id % 3 === 0,
}));

function Confetti() {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden>
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          className="absolute left-1/2 top-[30%] block rounded-[2px]"
          style={{ background: p.color, width: p.wide ? 14 : 8, height: p.wide ? 6 : 12 }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
          animate={{ x: `${p.x}vw`, y: `${p.y}vh`, rotate: p.rotate, opacity: [1, 1, 0], scale: 1 }}
          transition={{ duration: 2.2, delay: p.delay, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}
    </div>
  );
}

export default function RevealPage() {
  const { state } = useFlow();
  const router = useRouter();
  const vibe = vibeById(state.vibe);
  const clip = state.clip;
  const [view, setView] = useState<(typeof views)[number]>("After");
  const [tweaking, setTweaking] = useState(false);
  const [tweaks, setTweaks] = useState<string[]>([]);
  const [notice, setNotice] = useState<string | null>(null);
  const after = view === "After";
  const shareText = "Made this reel with OneTake";

  function download() {
    if (!clip) {
      setNotice("This is the sample reel, so there's no file to download. Upload a clip to try it.");
      return;
    }
    const a = document.createElement("a");
    a.href = clip.url;
    a.download = `onetake-${clip.name}`;
    a.click();
    setNotice("Demo build: this saved your original clip. Real renders arrive with the backend.");
  }

  async function shareInstagram() {
    if (navigator.share) {
      try {
        await navigator.share({ title: "My OneTake reel", text: shareText });
      } catch {
        // User closed the share sheet.
      }
      return;
    }
    setNotice("Download the reel, then post it from the Instagram app.");
  }

  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col items-center px-4 pb-16 pt-8">
      <Confetti />
      <motion.div
        className="pointer-events-none fixed inset-0 z-40 bg-white"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        aria-hidden
      />

      <motion.h1
        className="text-center text-4xl font-semibold tracking-tight sm:text-5xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 18 }}
      >
        Your reel is <span className="text-brand">ready.</span>
      </motion.h1>

      <div className="mt-5">
        <Segmented label="Compare" options={views} value={view} onChange={setView} />
      </div>

      <motion.div
        className="mt-5 w-[min(72vw,17rem)]"
        initial={{ opacity: 0, y: 40, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <PhoneFrame glow={after}>
          {clip ? (
            <div className="grid size-full place-items-center bg-black">
              <div className="@container relative w-full overflow-hidden" style={{ aspectRatio: after ? aspects[state.format ?? "9:16"] : undefined, height: after ? undefined : "100%" }}>
                <video
                  src={clip.url}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="size-full object-cover transition-[filter] duration-500"
                  style={{ filter: after ? vibe.grade : "none" }}
                />
                {after && (
                  <>
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/60 to-transparent" />
                    {state.captionStyle !== "Minimal" ? (
                      <div className="absolute inset-x-0 bottom-[22%] grid place-items-center">
                        {vibe.words.map((w, i) => (
                          <span
                            key={w}
                            className="col-start-1 row-start-1 animate-caption-word rounded-lg bg-white px-2.5 py-1 font-heading text-[clamp(0.9rem,7cqw,1.6rem)] font-bold uppercase leading-none text-ink opacity-0"
                            style={{ animationDelay: `${i * 0.6}s` }}
                          >
                            {w}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="absolute inset-x-0 bottom-[20%] text-center text-sm font-medium">{vibe.words.join(" ")}</p>
                    )}
                    <BeatBars className="absolute bottom-3 left-3 h-4" />
                  </>
                )}
              </div>
            </div>
          ) : after ? (
            <Reel scenes={vibe.scenes} video={vibe.video} sync="reveal" words={vibe.words} />
          ) : (
            <Reel variant="raw" video={vibe.video} />
          )}
        </PhoneFrame>
      </motion.div>

      <div className="mt-8 flex w-full flex-col gap-3">
        <GradientButton size="lg" className="w-full" onClick={download}>
          <Download className="hover:translate-x-0!" /> Download
        </GradientButton>
        <div className="grid grid-cols-2 gap-3">
          <button type="button" onClick={shareInstagram} className="glass inline-flex h-12 items-center justify-center gap-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors hover:bg-white/10">
            <Camera className="size-4 text-pink" /> Instagram
          </button>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(shareText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="glass inline-flex h-12 items-center justify-center gap-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors hover:bg-white/10"
          >
            <MessageCircle className="size-4 text-mint" /> WhatsApp
          </a>
        </div>
        <button
          type="button"
          aria-expanded={tweaking}
          onClick={() => setTweaking((t) => !t)}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/15 text-sm font-medium whitespace-nowrap transition-colors hover:bg-white/10"
        >
          <WandSparkles className="size-4" /> Tweak it
        </button>

        <AnimatePresence initial={false}>
          {tweaking && (
            <motion.div
              className="overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="glass rounded-3xl p-4">
                <p className="text-sm text-mist">What should change?</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {tweakChips.map((c) => (
                    <Chip key={c} selected={tweaks.includes(c)} onClick={() => setTweaks((t) => (t.includes(c) ? t.filter((x) => x !== c) : [...t, c]))}>
                      {c}
                    </Chip>
                  ))}
                </div>
                <GradientButton className="mt-4 w-full" disabled={tweaks.length === 0} onClick={() => router.push("/create/editing")}>
                  Re-edit my reel
                </GradientButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {notice && (
          <p role="status" className="rounded-2xl bg-white/5 px-4 py-3 text-center text-sm text-mist">
            {notice}
          </p>
        )}
      </div>
    </main>
  );
}
