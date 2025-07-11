import { ArrowRight } from "lucide-react";
import { Button } from "../../ui/button";
import { HomeGetOnMobileButtons } from "./HomeGetOnMobileButtons";
import Image from "next/image";

export const HomeHero = () => {
  return (
    <section className="w-full px-4 py-12 md:py-24 lg:py-24 xl:py-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-[80%] mx-auto">
        <div className="flex flex-col justify-center space-y-4">
          <div className="flex flex-col space-y-2">
            <Image
              src="/images/logo220x48.png"
              height={48}
              width={295}
              alt="REDLINE: Fire Watch"
            />

            <h1 className="text-3xl lg:text-3xl font-bold tracking-tighter">
              Fire Watch Staffing & Management
            </h1>

            <p className="max-w-[600px] text-muted-foreground">
              The specialized platform that helps you recruit, deploy, and
              manage fire watch personnel with confidence and compliance.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg">
              Request Demo <ArrowRight className="h-4 w-4 ml-1" />
            </Button>

            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>

          <HomeGetOnMobileButtons />
        </div>

        <div className="relative w-full h-full">
          <Image
            src="/images/placeholder.jpg"
            alt={"Placeholer image"}
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
};
