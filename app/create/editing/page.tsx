"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BeatBars } from "@/components/beat-bars";
import { EditScoreMeter } from "@/components/edit-score-meter";
import { editingSteps } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const STEP_MS = 1800;

export default function EditingPage() {
  const router = useRouter();
  const [done, setDone] = useState(0);
  const finished = done >= editingSteps.length;

  useEffect(() => {
    const id = setTimeout(
      () => (finished ? router.push("/create/reveal") : setDone((d) => d + 1)),
      finished ? 700 : STEP_MS,
    );
    return () => clearTimeout(id);
  }, [done, finished, router]);

  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center px-4 py-12">
      <div className="relative">
        <motion.div
          className="absolute inset-0 rounded-full bg-brand blur-3xl"
          animate={{ opacity: [0.25, 0.5, 0.25], scale: [0.9, 1.1, 0.9] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden
        />
        <EditScoreMeter score={(done / editingSteps.length) * 100} size={220} label="Percent" />
      </div>

      <h1 className="mt-10 text-center text-3xl font-semibold tracking-tight sm:text-4xl">{finished ? "Done. Rolling it out…" : "Editing your reel"}</h1>
      <p className="mt-2 flex items-center gap-2 text-mist">
        <BeatBars className="h-3.5" /> Stay here, this is quick
      </p>

      <ol className="mt-8 w-full space-y-2" aria-live="polite">
        {editingSteps.map((label, i) => {
          const state = i < done ? "done" : i === done ? "active" : "todo";
          return (
            <li
              key={label}
              className={cn(
                "flex items-center gap-3 rounded-2xl border px-4 py-3.5 transition-[background-color,border-color,opacity] duration-300",
                state === "active" ? "glass border-white/20" : "border-transparent",
                state === "todo" && "opacity-40",
              )}
            >
              <span className={cn("grid size-7 shrink-0 place-items-center rounded-full", state === "done" ? "bg-brand" : "bg-white/10")}>
                <AnimatePresence mode="wait" initial={false}>
                  {state === "done" ? (
                    <motion.span key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 500, damping: 22 }}>
                      <Check className="size-4" strokeWidth={3} />
                    </motion.span>
                  ) : state === "active" ? (
                    <LoaderCircle key="spin" className="size-4 animate-spin" />
                  ) : null}
                </AnimatePresence>
              </span>
              <span className={cn("font-medium", state === "done" && "text-mist")}>{label}</span>
            </li>
          );
        })}
      </ol>
    </main>
  );
}
