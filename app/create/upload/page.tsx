"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CloudUpload, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { StepShell } from "@/components/flow/step-shell";
import { GradientButton } from "@/components/gradient-button";
import { PhoneFrame } from "@/components/phone-frame";
import { formatTime, useFlow } from "@/lib/flow-store";
import { cn } from "@/lib/utils";

const MAX_SECONDS = 60;

function readDuration(url: string) {
  return new Promise<number>((resolve, reject) => {
    const v = document.createElement("video");
    v.preload = "metadata";
    v.onloadedmetadata = () => resolve(v.duration);
    v.onerror = () => reject(new Error("unreadable"));
    v.src = url;
  });
}

export default function UploadPage() {
  const { state, set } = useFlow();
  const router = useRouter();
  const input = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const clip = state.clip;

  async function accept(file: File | undefined) {
    if (!file) return;
    if (!file.type.startsWith("video/")) {
      setError("That isn't a video. Try an MP4 or MOV from your gallery.");
      return;
    }
    const url = URL.createObjectURL(file);
    try {
      const duration = await readDuration(url);
      if (duration > MAX_SECONDS) {
        URL.revokeObjectURL(url);
        setError(`That clip is ${formatTime(duration)}. Trim it to under 1 minute and try again.`);
        return;
      }
      if (clip) URL.revokeObjectURL(clip.url);
      setError(null);
      set({ clip: { url, name: file.name, duration }, sample: false });
    } catch {
      URL.revokeObjectURL(url);
      setError("We couldn't read that file. Try a different clip.");
    }
  }

  return (
    <StepShell
      title="Drop in your clip"
      subtitle="Any video under 1 minute. Shaky, sideways, unedited — all fine."
      footer={
        <GradientButton disabled={!clip} onClick={() => router.push("/create/type")}>
          Continue <ArrowRight />
        </GradientButton>
      }
    >
      <input ref={input} type="file" accept="video/*" className="sr-only" tabIndex={-1} onChange={(e) => accept(e.target.files?.[0])} />

      <AnimatePresence mode="wait" initial={false}>
        {clip ? (
          <motion.div
            key="preview"
            className="flex flex-col items-center gap-5"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <PhoneFrame glow className="w-[min(60vw,15rem)]">
              <video src={clip.url} autoPlay loop muted playsInline className="size-full object-cover" />
            </PhoneFrame>
            <div className="max-w-full text-center">
              <p className="truncate font-medium">{clip.name}</p>
              <p className="text-sm text-mist">{formatTime(clip.duration)} · ready to edit</p>
            </div>
            <button
              type="button"
              onClick={() => input.current?.click()}
              className="inline-flex h-11 items-center gap-2 rounded-full border border-white/15 px-5 text-sm font-medium whitespace-nowrap transition-colors hover:bg-white/10"
            >
              <RefreshCw className="size-4" /> Choose another clip
            </button>
          </motion.div>
        ) : (
          <motion.div key="drop" exit={{ opacity: 0 }}>
            <button
              type="button"
              onClick={() => input.current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragging(false);
                accept(e.dataTransfer.files[0]);
              }}
              className={cn(
                "group relative grid min-h-[22rem] w-full place-items-center overflow-hidden rounded-3xl border-2 border-dashed p-6 text-center transition-[border-color,background-color] duration-200 sm:min-h-[26rem]",
                dragging ? "border-pink bg-pink/10" : "border-white/20 bg-white/[0.03] hover:border-white/40",
              )}
            >
              <div className="pointer-events-none absolute left-1/2 top-1/2 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand opacity-15 blur-3xl transition-opacity group-hover:opacity-25" aria-hidden />
              <div className="relative">
                <span className="mx-auto grid size-20 animate-float place-items-center rounded-3xl bg-brand glow">
                  <CloudUpload className="size-9" />
                </span>
                <p className="mt-6 font-heading text-2xl font-semibold sm:text-3xl">{dragging ? "Drop it!" : "Tap to choose a video"}</p>
                <p className="mt-2 text-mist">or drag and drop it here · MP4 or MOV · under 1 min</p>
              </div>
            </button>
            {error && (
              <p role="alert" className="mt-4 rounded-2xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                {error}
              </p>
            )}
            <p className="mt-6 text-center text-sm text-mist">
              No clip handy?{" "}
              <button
                type="button"
                className="font-medium text-foreground underline decoration-pink underline-offset-4 hover:text-pink"
                onClick={() => {
                  set({ sample: true });
                  router.push("/create/type");
                }}
              >
                Try it with a sample
              </button>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </StepShell>
  );
}
