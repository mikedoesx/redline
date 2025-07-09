import { AppCallToAction } from "@/lib/components/home/AppCallToAction";
import { AppContact } from "@/lib/components/home/AppContact";
import { AppFeatureBanner } from "@/lib/components/home/AppFeatureBanner";
import { AppFeatures } from "@/lib/components/home/AppFeatures";
import { AppFooter } from "@/lib/components/home/AppFooter";
import AppHeader from "@/lib/components/AppHeader";
import { AppHero } from "@/lib/components/home/AppHero";
import { AppIntegrations } from "@/lib/components/home/AppIntegrations";
import { AppMarketMobile } from "@/lib/components/home/AppMarketMobile";
import { AppPricing } from "@/lib/components/home/AppPricing";

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
