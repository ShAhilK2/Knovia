import HeroSection from "@/components/landing/hero-section";
import FeaturesSection from "@/components/landing/features-section";
import HowItWorks from "@/components/landing/how-it-works";
import PricingSection from "@/components/landing/pricing-section";
import CtaSection from "@/components/landing/cta-section";
import { BackgroundGradient } from "@/components/background-gradient";

export default function Home() {
  return (
    <div className="min-h-screen relative">
      {/* BackgroundGradient */}
      <BackgroundGradient />

      <div className="relative z-10">
        <HeroSection />
        <FeaturesSection />
        <HowItWorks />
        <PricingSection />
        <CtaSection />
      </div>
    </div>
  );
}
