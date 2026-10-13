"use client";

import { motion, type MotionValue, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import { useRef } from "react";
import { cn } from "@/lib/utils";

const easeOut = [0.16, 1, 0.3, 1] as const;

/** Inertia scrolling for the landing page; off for reduced-motion users. */
export function SmoothScroll() {
  const reduced = useReducedMotion();
  if (reduced) return null;
  return <ReactLenis root options={{ anchors: { offset: -96 }, lerp: 0.09 }} />;
}

type WordsProps = {
  text: string;
  /** Second phrase, rendered in the brand gradient. */
  accent?: string;
  /** Put the accent on its own line. */
  stack?: boolean;
  delay?: number;
  className?: string;
};

/** Headline reveal: each word rises out of a mask, one after another. */
export function Words({ text, accent, stack = false, delay = 0, className }: WordsProps) {
  const plain = text.split(" ");
  const bright = accent ? accent.split(" ") : [];

  const word = (w: string, i: number, gradient: boolean) => (
    <span key={`${w}-${i}`} className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-bottom">
      <motion.span
        className={cn("inline-block", gradient && "text-brand")}
        variants={{
          hidden: { y: "115%", rotate: 6, opacity: 0 },
          show: { y: 0, rotate: 0, opacity: 1, transition: { duration: 0.8, ease: easeOut } },
        }}
      >
        {w}
      </motion.span>
      {" "}
    </span>
  );

  return (
    <motion.span
      className={cn("inline", className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ staggerChildren: 0.07, delayChildren: delay }}
    >
      {plain.map((w, i) => word(w, i, false))}
      {stack && <br />}
      {bright.map((w, i) => word(w, i + plain.length, true))}
    </motion.span>
  );
}

/** Grows from a tilted, shrunken card to full size as it scrolls into view. */
export function ScrollZoom({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 100%", "start 40%"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.82, 1]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [18, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0.2, 1]);
  return (
    <motion.div ref={ref} className={className} style={{ scale, rotateX, opacity, transformPerspective: 1200 }}>
      {children}
    </motion.div>
  );
}

/** Swings in from one side, tied to scroll position. */
export function SlideIn({ children, from, className }: { children: React.ReactNode; from: "left" | "right"; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const dir = from === "left" ? -1 : 1;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 100%", "start 55%"] });
  const x = useTransform(scrollYProgress, [0, 1], [dir * 140, 0]);
  const rotate = useTransform(scrollYProgress, [0, 1], [dir * 8, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [0, 1]);
  return (
    <motion.div ref={ref} className={className} style={{ x, rotate, opacity }}>
      {children}
    </motion.div>
  );
}

/** Drifts vertically at a different speed from the page. */
export function Parallax({ children, speed = 60, className }: { children: React.ReactNode; speed?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);
  return (
    <motion.div ref={ref} className={className} style={{ y }}>
      {children}
    </motion.div>
  );
}

type ScrollMarqueeProps = {
  text: string;
  reverse?: boolean;
  /** Drive it from a parent's scroll progress (needed inside pinned sections, which don't move on screen). */
  progress?: MotionValue<number>;
  className?: string;
};

/** Oversized outline text that slides sideways as the page scrolls. */
export function ScrollMarquee({ text, reverse = false, progress, className }: ScrollMarqueeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(progress ?? scrollYProgress, [0, 1], reverse ? ["-45%", "0%"] : ["0%", "-45%"]);
  return (
    <div ref={ref} className={cn("pointer-events-none overflow-hidden select-none", className)} aria-hidden>
      <motion.p
        className="w-max font-heading text-[clamp(4rem,16vw,11rem)] font-bold uppercase leading-none whitespace-nowrap text-transparent [-webkit-text-stroke:1.5px_rgb(255_255_255/0.2)]"
        style={{ x }}
      >
        {`${text} · `.repeat(6)}
      </motion.p>
    </div>
  );
}

/** Flips up from flat, with a springy landing. Stagger with `index`. */
export function FlipIn({ children, index = 0, className }: { children: React.ReactNode; index?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 80, rotateX: -50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ type: "spring", stiffness: 120, damping: 16, delay: index * 0.14 }}
      style={{ transformPerspective: 1000, transformOrigin: "50% 100%" }}
    >
      {children}
    </motion.div>
  );
}

/** Pops in with an overshoot, like a beat hit. Stagger with `index`. */
export function PopIn({ children, index = 0, className }: { children: React.ReactNode; index?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.4, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ type: "spring", stiffness: 380, damping: 17, delay: index * 0.08 }}
    >
      {children}
    </motion.div>
  );
}

/** A line that draws itself across as its container scrolls through view. */
export function DrawLine({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "start 35%"] });
  return (
    <div ref={ref} className={cn("h-1 overflow-hidden rounded-full bg-white/10", className)} aria-hidden>
      <motion.div className="h-full origin-left bg-brand shadow-[0_0_18px_var(--color-pink)]" style={{ scaleX: scrollYProgress }} />
    </div>
  );
}
