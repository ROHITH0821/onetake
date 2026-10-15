"use client";

import { Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { StepShell } from "@/components/flow/step-shell";
import { GradientButton } from "@/components/gradient-button";
import { StoryboardStrip } from "@/components/storyboard-strip";
import { formatTime, reelSeconds, useFlow } from "@/lib/flow-store";
import { clipTypes, editPlans, songs, vibeById } from "@/lib/mock-data";
import { priceLabel } from "@/lib/pricing";

export default function PlanPage() {
  const { state } = useFlow();
  const router = useRouter();
  const type = state.type ?? "reel";
  const vibe = vibeById(state.vibe);
  const seconds = reelSeconds(state);
  const song = songs.find((s) => s.id === state.songId);

  const summary = [
    clipTypes.find((t) => t.id === type)?.name,
    `${vibe.name} vibe`,
    song ? song.title : "AI picks the sound",
    state.captionStyle ? `${state.captionStyle} captions` : "AI picks captions",
    state.language,
    `${formatTime(seconds)} long`,
    state.format ?? "9:16",
    ...state.chips,
  ].filter(Boolean);

  return (
    <StepShell
      bleed
      title="Your edit plan"
      subtitle="Here's exactly what we'll make. Happy with it? Hit the button."
      back="/create/extras"
      footer={
        <GradientButton size="lg" onClick={() => router.push("/create/editing")}>
          <Sparkles className="hover:translate-x-0!" /> Approve · {priceLabel}
        </GradientButton>
      }
    >
      <StoryboardStrip
        shots={editPlans[type]}
        seconds={seconds}
        scenes={vibe.scenes}
        videoUrl={state.clip?.url ?? vibe.video}
        videoDuration={state.clip?.duration ?? 8}
      />

      <div className="mt-8 px-4 sm:px-6">
        <div className="glass rounded-3xl p-5">
          <h2 className="text-lg font-semibold">What you picked</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {summary.map((s) => (
              <li key={s} className="rounded-full bg-white/10 px-3 py-1.5 text-sm">
                {s}
              </li>
            ))}
          </ul>
          {state.note.trim() && <p className="mt-4 border-l-2 border-pink pl-3 text-sm text-mist">“{state.note.trim()}”</p>}
        </div>
        <p className="mt-4 text-sm text-mist">You only pay {priceLabel} if this plan looks right. Payments aren&apos;t connected in this demo yet, so go ahead.</p>
      </div>
    </StepShell>
  );
}
