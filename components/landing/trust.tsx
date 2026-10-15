import { ArrowRight, Download, IndianRupee, ScanEye, ShieldCheck, ThumbsUp } from "lucide-react";
import { editPlans, sampleClips, vibes } from "@/lib/mock-data";
import { priceLabel } from "@/lib/pricing";
import { Reveal } from "../reveal";
import { SlideIn, Words } from "../scroll-fx";

const checks = ["Captions spelled right", "Cuts land on the beat", "Nothing important cropped"];
const flow = [
  { icon: ShieldCheck, label: "See storyboard" },
  { icon: ThumbsUp, label: "You approve" },
  { icon: IndianRupee, label: `Pay ${priceLabel}` },
  { icon: Download, label: "Download" },
];

export function Trust() {
  const shots = editPlans.personal.slice(0, 4);
  const { scenes } = vibes[2];
  // One clip per storyboard shot.
  const clips = [sampleClips.friends, sampleClips.dance, sampleClips.beachSunset, sampleClips.foodPose];

  return (
    <section id="no-surprises" className="overflow-x-clip px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <h2 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">
          <Words text="No surprises." accent="No wasted money." />
        </h2>
        <Reveal delay={0.2}>
          <p className="mt-3 max-w-lg text-lg text-mist">You see the plan before you pay. Don&apos;t like it? Don&apos;t pay.</p>
        </Reveal>

        <Reveal delay={0.1}>
          <ol className="mt-8 flex flex-wrap items-center gap-2" aria-label="How payment works">
            {flow.map(({ icon: Icon, label }, i) => (
              <li key={label} className="flex items-center gap-2">
                <span className={`inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-semibold ${i === 2 ? "bg-price text-ink" : "bg-white/10"}`}>
                  <Icon className="size-4" /> {label}
                </span>
                {i < flow.length - 1 && <ArrowRight className="size-4 text-mist" aria-hidden />}
              </li>
            ))}
          </ol>
        </Reveal>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <SlideIn from="left" className="h-full">
            <article className="glass h-full rounded-3xl p-6 sm:p-8">
              <span className="grid size-12 place-items-center rounded-2xl bg-brand">
                <ShieldCheck className="size-6" />
              </span>
              <h3 className="mt-5 text-2xl font-semibold sm:text-3xl">See the plan before you pay</h3>
              <p className="mt-2 text-mist">Which moments, in what order, with what captions. Approve it, then pay.</p>
              <ol className="mt-6 grid grid-cols-4 gap-2">
                {shots.map((s, i) => (
                  <li key={s.title}>
                    <div className="relative aspect-[9/14] overflow-hidden rounded-xl border border-white/10" style={{ background: scenes[i] }}>
                      <video src={`${clips[i]}#t=2`} preload="metadata" muted playsInline className="absolute inset-0 size-full object-cover" />
                    </div>
                    <p className="mt-1.5 truncate text-[11px] text-mist">{s.title}</p>
                  </li>
                ))}
              </ol>
              <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-mint/15 px-3 py-1.5 text-sm font-semibold text-mint">
                <ThumbsUp className="size-4" /> Looks good? Approve and pay {priceLabel}
              </p>
            </article>
          </SlideIn>

          <SlideIn from="right" className="h-full">
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
          </SlideIn>
        </div>
      </div>
    </section>
  );
}
