import { ArrowRight } from "lucide-react";
import { Button } from "../../ui/button";
import { HomeSectionHeader } from "./HomeSectionHeader";

export const HomeCallToAction = () => {
  return (
    <section className="px-4 py-12 md:py-24 lg:py-32 bg-primary text-white">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <HomeSectionHeader
          subtitleClass="text-muted"
          sectionTitle="Ready to Transform Your Fire Watch Operations?"
          subtitle="Join hundreds of companies who trust REDLINE: Fire Watch&trade; to manage their fire watch staffing with confidence and compliance."
        />

        <div className="flex initial:flex-col sm:row gap-2 min-[400px]:flex-row">
          <Button size="lg" variant="outline">
            Request Demo <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
          <Button size="lg" variant="secondary">
            Contact Sales
          </Button>
        </div>
      </div>
    </section>
  );
};
