"use client";

import { useEffect, useRef } from "react";

/** Leader videos by sync key, so a raw/edited pair of the same clip stays in step. */
const leaders = new Map<string, HTMLVideoElement>();

type LazyVideoProps = {
  src: string;
  className?: string;
  style?: React.CSSProperties;
  /** Videos sharing a key play in step; the one with `lead` sets the time. */
  sync?: string;
  lead?: boolean;
  /** Wait until the page has finished loading before fetching (for above-the-fold clips). */
  afterLoad?: boolean;
};

/** Resolves once the page has loaded and the browser is idle. */
const pageSettled = () =>
  new Promise<void>((resolve) => {
    const idle = () =>
      "requestIdleCallback" in window ? window.requestIdleCallback(() => resolve(), { timeout: 2000 }) : setTimeout(resolve, 300);
    if (document.readyState === "complete") idle();
    else window.addEventListener("load", idle, { once: true });
  });

/** Muted looping clip that only loads and plays while it is near the viewport. */
export function LazyVideo({ src, className, style, sync, lead = false, afterLoad = false }: LazyVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    let cancelled = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return video.pause();
        if (video.dataset.src !== src) {
          video.dataset.src = src;
          video.src = src;
        }
        video.play().catch(() => {
          // Autoplay can be refused (e.g. data saver); the gradient behind stays visible.
        });
      },
      { rootMargin: "80px" },
    );
    // Above-the-fold clips wait for the page to load so they don't compete with first paint.
    if (afterLoad) pageSettled().then(() => !cancelled && observer.observe(video));
    else observer.observe(video);

    let follow: (() => void) | undefined;
    if (sync && lead) leaders.set(sync, video);
    if (sync && !lead) {
      follow = () => {
        const leader = leaders.get(sync);
        if (leader && !leader.paused && Math.abs(leader.currentTime - video.currentTime) > 0.12) {
          video.currentTime = leader.currentTime;
        }
      };
      video.addEventListener("timeupdate", follow);
    }

    return () => {
      cancelled = true;
      observer.disconnect();
      if (follow) video.removeEventListener("timeupdate", follow);
      if (sync && lead && leaders.get(sync) === video) leaders.delete(sync);
    };
  }, [src, sync, lead, afterLoad]);

  return <video ref={ref} muted loop playsInline preload="none" className={className} style={style} />;
}
