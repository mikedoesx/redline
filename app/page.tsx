import { AppCallToAction } from "@/components/home/AppCallToAction";
import { AppContact } from "@/components/home/AppContact";
import { AppFeatureBanner } from "@/components/home/AppFeatureBanner";
import { AppFeatures } from "@/components/home/AppFeatures";
import { AppFooter } from "@/components/home/AppFooter";
import AppHeader from "@/components/AppHeader";
import { AppHero } from "@/components/home/AppHero";
import { AppIntegrations } from "@/components/home/AppIntegrations";
import { AppMarketMobile } from "@/components/home/AppMarketMobile";
import { AppPricing } from "@/components/home/AppPricing";

export default function LandingPage() {
  return (
    <>
      <AppHeader />
      <main>
        <AppHero />
        <AppFeatureBanner />
        <AppPricing />
        <AppFeatures />
        <AppMarketMobile />
        <AppCallToAction />
        <AppIntegrations />
        <AppContact />
      </main>
      <AppFooter />
    </>
  );
}
