"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { flowSteps } from "@/lib/flow-store";
import { Logo } from "./logo";

/** Top progress bar for the edit flow; reads the step from the route. */
export function StepProgress() {
  const pathname = usePathname();
  const index = Math.max(0, flowSteps.findIndex((s) => pathname.startsWith(s.path)));
  const step = flowSteps[index];

  return (
    <header className="sticky top-0 z-40 bg-ink/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo className="text-lg" />
        <p className="text-sm text-mist" aria-live="polite">
          <span className="font-semibold text-foreground">{step.label}</span> · {index + 1} of {flowSteps.length}
        </p>
        <Link href="/" aria-label="Exit editor" className="grid size-9 place-items-center rounded-full text-mist transition-colors hover:bg-white/10 hover:text-foreground">
          <X className="size-5" />
        </Link>
      </div>
      <div
        className="h-1 bg-white/10"
        role="progressbar"
        aria-label="Edit progress"
        aria-valuemin={1}
        aria-valuemax={flowSteps.length}
        aria-valuenow={index + 1}
      >
        <motion.div
          className="h-full origin-left rounded-r-full bg-brand shadow-[0_0_16px_var(--color-pink)]"
          initial={false}
          animate={{ scaleX: (index + 1) / flowSteps.length }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </header>
  );
}
