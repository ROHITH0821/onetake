import { AudienceTabs } from "@/components/landing/audience-tabs";
import { BeforeAfter } from "@/components/landing/before-after";
import { FinalCta, Footer } from "@/components/landing/final-cta";
import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Intro } from "@/components/landing/intro";
import { Navbar } from "@/components/landing/navbar";
import { SoundsStrip } from "@/components/landing/sounds-strip";
import { SmoothScroll } from "@/components/scroll-fx";
import { Trust } from "@/components/landing/trust";
import { VibeShowcase } from "@/components/landing/vibe-showcase";

export default function Home() {
  return (
    <>
      <Intro />
      <SmoothScroll />
      <Navbar />
      <main>
        <Hero />
        <BeforeAfter />
        <HowItWorks />
        <AudienceTabs />
        <VibeShowcase />
        <SoundsStrip />
        <Trust />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
