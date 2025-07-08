import { AppCallToAction } from "@/components/home/AppCallToAction"
import { AppFeatures } from "@/components/home/AppFeatures"
import { AppHero } from "@/components/home/AppHero"
import { AppIntegrations } from "@/components/home/AppIntegrations"
import { AppMarketMobile } from "@/components/home/AppMarketMobile"
import { AppContact } from "@/components/home/AppContact"

export default function LandingPage() {
  return (
    <main>
      <AppHero />
      <AppFeatures />
      <AppMarketMobile />
      <AppIntegrations />
      <AppContact />
      <AppCallToAction />
    </main>
  )
}
