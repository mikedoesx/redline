import { AppCallToAction } from "@/components/home/AppCallToAction";
import { AppFeatures } from "@/components/home/AppFeatures";
import { AppHero } from "@/components/home/AppHero";
import { AppMarketMobile } from "@/components/home/AppMarketMobile";
import { AppTestimonials } from "@/components/home/AppTestimonials";

export default function LandingPage() {
  return (
    <main>
      <AppHero />
      <AppFeatures />
      <AppMarketMobile />
      <AppTestimonials />
      <AppCallToAction />
    </main>
  );
}
