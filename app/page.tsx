import { Examples } from "@/components/landing/examples";
import { Faq } from "@/components/landing/faq";
import { FinalCta, Footer } from "@/components/landing/final-cta";
import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Intro } from "@/components/landing/intro";
import { Navbar } from "@/components/landing/navbar";
import { Pricing } from "@/components/landing/pricing";
import { Problem } from "@/components/landing/problem";
import { StickyCta } from "@/components/landing/sticky-cta";
import { WhatWeDo } from "@/components/landing/what-we-do";
import { EarlyAccessProvider } from "@/components/early-access/early-access";
import { SmoothScroll } from "@/components/scroll-fx";

// Hero → problem → what we do → proof → price → how it works → FAQ → CTA.
// Copy lives in lib/content.ts; each section is self-contained.
export default function Home() {
  return (
    <EarlyAccessProvider>
      <Intro />
      <SmoothScroll />
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <WhatWeDo />
        <Examples />
        <Pricing />
        <HowItWorks />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <StickyCta />
    </EarlyAccessProvider>
  );
}
