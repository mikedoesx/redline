import { AppFooter } from "@/lib/components/AppFooter";
import { HomeCallToAction } from "./HomeCallToAction";
import { HomeContact } from "./HomeContact";
import { HomeFeatureBanner } from "./HomeFeatureBanner";
import { HomeFeatures } from "./HomeFeatures";
import { HomeHeader } from "./HomeHeader";
import { HomeHero } from "./HomeHero";
import { HomeMarketMobile } from "./HomeMarketMobile";
import { HomePricing } from "./HomePricing";

export const HomePage = () => {
  return (
    <>
      <HomeHeader />
      <main>
        <HomeHero />
        <HomeFeatureBanner />
        <HomeFeatures />
        <HomePricing />
        <HomeMarketMobile />
        <HomeCallToAction />
        <HomeContact />
      </main>
      <AppFooter />
    </>
  );
};
