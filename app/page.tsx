import { AppCallToAction } from "@/components/home/AppCallToAction";
import { AppContact } from "@/components/home/AppContact";
import { AppFeatures } from "@/components/home/AppFeatures";
import { AppHero } from "@/components/home/AppHero";
import { AppIntegrations } from "@/components/home/AppIntegrations";
import { AppMarketMobile } from "@/components/home/AppMarketMobile";
import { AppPricing } from "@/components/home/AppPricing";

export default function LandingPage() {
  return (
    <main>
      <AppHero />
      <AppFeatures />
      <AppPricing />
      <AppMarketMobile />
      <AppCallToAction />
      <AppIntegrations />
      <AppContact />
    </main>
  );
}
