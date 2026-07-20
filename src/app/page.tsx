import { Hero } from "@/components/sections/Hero";
import { TrustBadges } from "@/components/sections/TrustBadges";
import { LiveActivity } from "@/components/sections/LiveActivity";
import { StatsEducation } from "@/components/sections/StatsEducation";
import { RiskHighlights } from "@/components/sections/RiskHighlights";
import { FeaturesGrid } from "@/components/sections/FeaturesGrid";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { ComparisonTable } from "@/components/sections/ComparisonTable";
import { Testimonials } from "@/components/sections/Testimonials";
import { SupportStrip } from "@/components/sections/SupportStrip";
import { Pricing } from "@/components/sections/Pricing";
import { GuaranteeBanner } from "@/components/sections/GuaranteeBanner";
import { BrandsDirectory } from "@/components/sections/BrandsDirectory";
import { FaqPreview } from "@/components/sections/FaqPreview";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBadges />
      <LiveActivity />
      <StatsEducation />
      <RiskHighlights />
      <FeaturesGrid />
      <WhyChooseUs />
      <HowItWorks />
      <ComparisonTable />
      <Testimonials />
      <SupportStrip />
      <Pricing />
      <GuaranteeBanner />
      <BrandsDirectory />
      <FaqPreview />
    </>
  );
}
