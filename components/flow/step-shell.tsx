"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type StepShellProps = {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
  /** Route of the previous step. */
  back?: string;
  /** Primary action(s), pinned to the bottom on phones. */
  footer?: React.ReactNode;
  /** Let children run edge to edge (carousels). */
  bleed?: boolean;
  className?: string;
};

export function StepShell({ title, subtitle, children, back, footer, bleed = false, className }: StepShellProps) {
  return (
    <motion.main
      className="mx-auto flex w-full max-w-5xl flex-1 flex-col pb-28"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="px-4 pt-8 sm:px-6 sm:pt-12">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h1>
        {subtitle && <p className="mt-2 max-w-xl text-lg text-mist">{subtitle}</p>}
      </div>
      <div className={cn("mt-8 flex-1", !bleed && "px-4 sm:px-6", className)}>{children}</div>

      {(back || footer) && (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-ink/85 backdrop-blur-xl">
          <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
            {back ? (
              <Link href={back} className="inline-flex h-12 items-center gap-2 rounded-full px-4 text-sm font-medium whitespace-nowrap text-mist transition-colors hover:bg-white/10 hover:text-foreground">
                <ArrowLeft className="size-4" /> Back
              </Link>
            ) : (
              <span />
            )}
            <div className="flex items-center gap-3">{footer}</div>
          </div>
        </div>
      )}
    </motion.main>
  );
}
