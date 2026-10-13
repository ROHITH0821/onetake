"use client";

import { ArrowRight, Briefcase, Check, Clapperboard, Heart, Store } from "lucide-react";
import { useRouter } from "next/navigation";
import { StepShell } from "@/components/flow/step-shell";
import { GradientButton } from "@/components/gradient-button";
import { TiltCard } from "@/components/tilt-card";
import { useFlow } from "@/lib/flow-store";
import { clipTypes, type ClipType } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const icons: Record<ClipType, typeof Store> = {
  reel: Clapperboard,
  business: Store,
  personal: Heart,
  client: Briefcase,
};

export default function TypePage() {
  const { state, set } = useFlow();
  const router = useRouter();

  return (
    <StepShell
      title="What are we making?"
      subtitle="This decides the pacing and where the hook goes."
      back="/create/upload"
      footer={
        <GradientButton disabled={!state.type} onClick={() => router.push("/create/vibe")}>
          Continue <ArrowRight />
        </GradientButton>
      }
    >
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {clipTypes.map((t) => {
          const Icon = icons[t.id];
          const selected = state.type === t.id;
          return (
            <TiltCard key={t.id} max={8}>
              <button
                type="button"
                aria-pressed={selected}
                onClick={() => set({ type: t.id })}
                className={cn(
                  "glass relative flex aspect-[4/5] w-full flex-col justify-between rounded-3xl p-4 text-left transition-shadow duration-300 sm:p-5",
                  selected && "ring-2 ring-pink glow",
                )}
              >
                <span className={cn("grid size-12 place-items-center rounded-2xl transition-colors sm:size-14", selected ? "bg-brand" : "bg-white/10")}>
                  <Icon className="size-6 sm:size-7" />
                </span>
                {selected && (
                  <span className="absolute right-3 top-3 grid size-7 place-items-center rounded-full bg-brand">
                    <Check className="size-4" strokeWidth={3} />
                  </span>
                )}
                <span>
                  <span className="block font-heading text-xl font-semibold leading-tight sm:text-2xl">{t.name}</span>
                  <span className="mt-1 block text-sm text-mist">{t.blurb}</span>
                </span>
              </button>
            </TiltCard>
          );
        })}
      </div>
    </StepShell>
  );
}
