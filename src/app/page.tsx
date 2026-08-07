import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { Features } from "@/components/sections/Features";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { FeatureShowcase } from "@/components/sections/FeatureShowcase";
import { Shortcuts } from "@/components/sections/Shortcuts";
import { Comparison } from "@/components/sections/Comparison";
import { Privacy } from "@/components/sections/Privacy";
import { Platforms } from "@/components/sections/Platforms";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <BeforeAfter />
        <Features />
        <FeatureShowcase />
        <HowItWorks />
        <Shortcuts />
        <Comparison />
        <Privacy />
        <Platforms />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
