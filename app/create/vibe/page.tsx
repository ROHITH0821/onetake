"use client";

import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { EditScoreMeter } from "@/components/edit-score-meter";
import { Chip, Field, Segmented } from "@/components/flow/controls";
import { StepShell } from "@/components/flow/step-shell";
import { GradientButton } from "@/components/gradient-button";
import { SongCard } from "@/components/song-card";
import { VibeCard } from "@/components/vibe-card";
import { stopPreview, togglePreview, usePlayingId } from "@/lib/beat-player";
import { editScore, useFlow } from "@/lib/flow-store";
import { captionStyles, formats, languages, lengths, songs, vibes } from "@/lib/mock-data";

const scoreLine = (score: number) =>
  score >= 100 ? "Fully dialled in." : score >= 55 ? "Looking good. Keep tapping." : score > 0 ? "Nice start. Add a sound next." : "Tap a vibe to start.";

export default function VibePage() {
  const { state, set } = useFlow();
  const router = useRouter();
  const playingId = usePlayingId();
  const score = editScore(state);

  useEffect(() => stopPreview, []);

  return (
    <StepShell
      bleed
      title="Tap your vibe"
      subtitle="The more you pick, the sharper the edit. Skip anything and AI chooses for you."
      back="/create/type"
      footer={
        <>
          <EditScoreMeter score={score} size={48} className="lg:hidden" />
          <GradientButton disabled={!state.vibe} onClick={() => router.push("/create/extras")}>
            Continue <ArrowRight />
          </GradientButton>
        </>
      }
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_15rem]">
        <div className="min-w-0 space-y-10">
          <Field label="Vibe" hint="Pick one">
            <ul className="no-scrollbar flex snap-x gap-3 overflow-x-auto px-4 py-3 sm:px-6">
              {vibes.map((v) => (
                <li key={v.id} className="w-36 shrink-0 snap-start sm:w-40">
                  <VibeCard vibe={v} selected={state.vibe === v.id} onSelect={() => set({ vibe: v.id })} />
                </li>
              ))}
            </ul>
          </Field>

          <Field label="Trending sound" hint="15s previews">
            <ul className="no-scrollbar flex snap-x gap-3 overflow-x-auto px-4 py-3 sm:px-6">
              {songs.map((s) => (
                <li key={s.id} className="shrink-0">
                  <SongCard
                    song={s}
                    playing={playingId === s.id}
                    onToggle={togglePreview}
                    selected={state.songId === s.id}
                    onSelect={() => set({ songId: state.songId === s.id ? null : s.id })}
                    className="w-64"
                  />
                </li>
              ))}
            </ul>
          </Field>

          <Field label="Captions">
            <div className="flex flex-wrap gap-2 px-4 sm:px-6">
              {captionStyles.map((c) => (
                <Chip key={c} selected={state.captionStyle === c} onClick={() => set({ captionStyle: state.captionStyle === c ? null : c })}>
                  {c}
                </Chip>
              ))}
            </div>
            <div className="mt-3 flex flex-wrap gap-2 px-4 sm:px-6">
              {languages.map((l) => (
                <Chip key={l} selected={state.language === l} onClick={() => set({ language: state.language === l ? null : l })}>
                  {l}
                </Chip>
              ))}
            </div>
          </Field>

          <div className="flex flex-wrap gap-x-10 gap-y-8">
            <Field label="Length">
              <div className="px-4 sm:px-6">
                <Segmented label="Length" options={lengths} value={state.length as (typeof lengths)[number] | null} onChange={(length) => set({ length })} />
              </div>
            </Field>
            <Field label="Format">
              <div className="px-4 sm:px-6">
                <Segmented label="Format" options={formats} value={state.format as (typeof formats)[number] | null} onChange={(format) => set({ format })} />
              </div>
            </Field>
          </div>
        </div>

        <aside className="hidden lg:block">
          <div className="glass sticky top-24 mr-6 flex flex-col items-center rounded-3xl p-6 text-center">
            <EditScoreMeter score={score} size={160} />
            <p className="mt-4 text-sm text-mist" aria-live="polite">
              {scoreLine(score)}
            </p>
          </div>
        </aside>
      </div>
    </StepShell>
  );
}
