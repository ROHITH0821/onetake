"use client";

import { Check, X } from "lucide-react";
import { vibes } from "@/lib/mock-data";
import { BeforeAfterSlider } from "../before-after-slider";
import { PriceBadge } from "../price-badge";
import { Reel } from "../reel";
import { ScrollZoom, Words } from "../scroll-fx";
import { SliderPins, type SliderPin } from "./slider-pins";

const pins: SliderPin[] = [
  { x: 22, y: 16, problem: "Dead air 0:00–0:04", fix: "Opens on best moment" },
  { x: 74, y: 30, problem: "Horizon tilted", fix: "Stabilized" },
  { x: 30, y: 44, problem: "Flat audio", fix: "Cut on the beat" },
  { x: 70, y: 58, problem: "No captions", fix: "Readable captions" },
  { x: 38, y: 91, problem: "Wrong aspect ratio", fix: "Perfect 9:16" },
];

export function BeforeAfter() {
  const vibe = vibes[1];

  return (
    <section id="examples" className="overflow-x-clip px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-5xl md:text-center">
        <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
          <Words text="Same clip." accent="Every problem fixed." />
        </h2>
        <p className="mt-3 text-lg text-mist">Drag the handle. Watch each problem flip to its fix.</p>
      </div>

      <div className="mx-auto mt-10 grid max-w-5xl items-center gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,22rem)_minmax(0,1fr)]">
        <ul className="hidden space-y-3 text-right md:block">
          {pins.map((p) => (
            <li key={p.problem} className="flex items-center justify-end gap-2 text-sm text-mist">
              {p.problem} <X className="size-4 text-destructive" />
            </li>
          ))}
        </ul>

        <ScrollZoom>
          <BeforeAfterSlider
            scrollWipe
            className="mx-auto aspect-[9/14] w-full max-w-sm glow"
            before={<Reel variant="raw" video={vibe.video} sync="before-after" />}
            after={<Reel scenes={vibe.scenes} video={vibe.video} sync="before-after" words={vibe.words} />}
            overlay={(pos) => <SliderPins pins={pins} pos={pos} />}
          />
          <p className="mt-5 flex items-center justify-center gap-2 text-lg font-semibold">
            This edit cost <PriceBadge size="sm" />
          </p>
        </ScrollZoom>

        <ul className="hidden space-y-3 md:block">
          {pins.map((p) => (
            <li key={p.fix} className="flex items-center gap-2 text-sm font-medium">
              <Check className="size-4 text-mint" /> {p.fix}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
