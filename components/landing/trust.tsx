import { ScanEye, ShieldCheck } from "lucide-react";
import { editPlans, vibes } from "@/lib/mock-data";
import { Reveal } from "../reveal";
import { SlideIn, Words } from "../scroll-fx";
import { TiltCard } from "../tilt-card";

const checks = ["Captions spelled right", "Cuts land on the beat", "Nothing important cropped"];

export function Trust() {
  const shots = editPlans.personal.slice(0, 4);
  const { scenes, video } = vibes[2];

  return (
    <section id="pricing" className="overflow-x-clip px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <h2 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">
          <Words text="No surprises." accent="No wasted money." />
        </h2>
        <Reveal delay={0.2}>
          <p className="mt-3 max-w-lg text-lg text-mist">You approve the edit before you pay for it. Pricing lands at launch.</p>
        </Reveal>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <SlideIn from="left" className="h-full">
            <TiltCard max={5} className="h-full">
              <article className="glass h-full rounded-3xl p-6 sm:p-8">
                <span className="grid size-12 place-items-center rounded-2xl bg-brand">
                  <ShieldCheck className="size-6" />
                </span>
                <h3 className="mt-5 text-2xl font-semibold sm:text-3xl">See the plan before you pay</h3>
                <p className="mt-2 text-mist">Every edit starts with a storyboard: which moments, in what order, with what captions.</p>
                <ol className="mt-6 grid grid-cols-4 gap-2">
                  {shots.map((s, i) => (
                    <li key={s.title}>
                      <div className="relative aspect-[9/14] overflow-hidden rounded-xl border border-white/10" style={{ background: scenes[i] }}>
                        <video src={`${video}#t=${i * 2 + 1}`} preload="metadata" muted playsInline className="absolute inset-0 size-full object-cover" />
                      </div>
                      <p className="mt-1.5 truncate text-[11px] text-mist">{s.title}</p>
                    </li>
                  ))}
                </ol>
              </article>
            </TiltCard>
          </SlideIn>

          <SlideIn from="right" className="h-full">
            <TiltCard max={5} className="h-full">
              <article className="glass h-full rounded-3xl p-6 sm:p-8">
                <span className="grid size-12 place-items-center rounded-2xl bg-brand">
                  <ScanEye className="size-6" />
                </span>
                <h3 className="mt-5 text-2xl font-semibold sm:text-3xl">AI checks its own edit</h3>
                <p className="mt-2 text-mist">Before you see the reel, a second pass watches it back and fixes what looks off.</p>
                <ul className="mt-6 space-y-2.5">
                  {checks.map((c) => (
                    <li key={c} className="flex items-center gap-3 rounded-xl bg-ink/60 px-4 py-3 text-sm">
                      <span className="size-2 shrink-0 rounded-full bg-mint shadow-[0_0_10px_var(--color-mint)]" />
                      {c}
                    </li>
                  ))}
                </ul>
              </article>
            </TiltCard>
          </SlideIn>
        </div>
      </div>
    </section>
  );
}
