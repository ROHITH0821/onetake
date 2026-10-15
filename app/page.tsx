import { AudienceTabs } from "@/components/landing/audience-tabs";
import { BeforeAfter } from "@/components/landing/before-after";
import { Comparison } from "@/components/landing/comparison";
import { EditingTax } from "@/components/landing/editing-tax";
import { Faq } from "@/components/landing/faq";
import { FinalCta, Footer } from "@/components/landing/final-cta";
import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Intro } from "@/components/landing/intro";
import { Navbar } from "@/components/landing/navbar";
import { Pipeline } from "@/components/landing/pipeline";
import { Pricing } from "@/components/landing/pricing";
import { SampleDemo } from "@/components/landing/sample-demo";
import { SoundsStrip } from "@/components/landing/sounds-strip";
import { StickyCta } from "@/components/landing/sticky-cta";
import { Trust } from "@/components/landing/trust";
import { VibeShowcase } from "@/components/landing/vibe-showcase";
import { SmoothScroll } from "@/components/scroll-fx";

// Pain first, then the fix, then the price. Reorder or drop sections freely:
// each one is self-contained.
export default function Home() {
  return (
    <>
      <Intro />
      <SmoothScroll />
      <Navbar />
      <main>
        <Hero />
        <EditingTax />
        <BeforeAfter />
        <HowItWorks />
        <Pipeline />
        <SampleDemo />
        <VibeShowcase />
        <SoundsStrip />
        <AudienceTabs />
        <Comparison />
        <Pricing />
        <Trust />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <StickyCta />
    </>
  );
}
