"use client";

import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { Chip } from "@/components/flow/controls";
import { StepShell } from "@/components/flow/step-shell";
import { GradientButton } from "@/components/gradient-button";
import { useFlow } from "@/lib/flow-store";
import { suggestionChips } from "@/lib/mock-data";

const MAX = 200;

export default function ExtrasPage() {
  const { state, set } = useFlow();
  const router = useRouter();
  const empty = !state.note.trim() && state.chips.length === 0;

  const toggle = (chip: string) =>
    set({ chips: state.chips.includes(chip) ? state.chips.filter((c) => c !== chip) : [...state.chips, chip] });

  return (
    <StepShell
      title="Anything else?"
      subtitle="Totally optional. Tap a suggestion or say it in your own words."
      back="/create/vibe"
      footer={
        <GradientButton onClick={() => router.push("/create/plan")}>
          {empty ? "Skip" : "Show my plan"} <ArrowRight />
        </GradientButton>
      }
    >
      <div className="max-w-2xl">
        <div className="flex flex-wrap gap-2">
          {suggestionChips.map((c) => (
            <Chip key={c} selected={state.chips.includes(c)} onClick={() => toggle(c)}>
              {c}
            </Chip>
          ))}
        </div>

        <label htmlFor="note" className="mt-8 block text-sm font-medium text-mist">
          Notes for the edit
        </label>
        <div className="glass mt-2 rounded-3xl p-1 transition-shadow focus-within:glow">
          <textarea
            id="note"
            rows={4}
            maxLength={MAX}
            value={state.note}
            onChange={(e) => set({ note: e.target.value })}
            placeholder="e.g. Start with the cake cutting, keep Nani's laugh"
            className="block w-full resize-none rounded-[1.25rem] bg-transparent p-4 text-base placeholder:text-mist/60 focus:outline-none"
          />
        </div>
        <p className="mt-2 text-right text-xs tabular-nums text-mist">
          {state.note.length}/{MAX}
        </p>
      </div>
    </StepShell>
  );
}
