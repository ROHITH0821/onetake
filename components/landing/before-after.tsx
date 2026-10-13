import { vibes } from "@/lib/mock-data";
import { BeforeAfterSlider } from "../before-after-slider";
import { Reel } from "../reel";
import { Reveal } from "../reveal";
import { ScrollZoom, SlideIn, Words } from "../scroll-fx";

const raw = ["Shaky and crooked", "Dead air at the start", "No sound, no captions"];
const edited = ["Opens on the best moment", "Cuts land on the beat", "Captions people can read"];

export function BeforeAfter() {
  const vibe = vibes[1];

  return (
    <section id="examples" className="overflow-x-clip px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,22rem)_minmax(0,1fr)]">
        <div className="md:col-span-3 md:text-center">
          <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">
            <Words text="Same clip." accent="Different league." />
          </h2>
          <Reveal delay={0.2}>
            <p className="mt-3 text-lg text-mist">Scroll, or drag the handle, to see what one take turns into.</p>
          </Reveal>
        </div>

        <SlideIn from="left" className="order-3 md:order-none">
          <ul className="space-y-3 md:text-right">
            {raw.map((t) => (
              <li key={t} className="text-mist line-through decoration-white/30">
                {t}
              </li>
            ))}
          </ul>
        </SlideIn>

        <ScrollZoom>
          <BeforeAfterSlider
            scrollWipe
            className="mx-auto aspect-[9/14] w-full max-w-sm glow"
            before={<Reel variant="raw" video={vibe.video} sync="before-after" />}
            after={<Reel scenes={vibe.scenes} video={vibe.video} sync="before-after" words={vibe.words} />}
          />
        </ScrollZoom>

        <SlideIn from="right" className="order-4 md:order-none">
          <ul className="space-y-3">
            {edited.map((t) => (
              <li key={t} className="flex items-center gap-3 font-medium">
                <span className="size-2 shrink-0 rounded-full bg-brand" />
                {t}
              </li>
            ))}
          </ul>
        </SlideIn>
      </div>
    </section>
  );
}
