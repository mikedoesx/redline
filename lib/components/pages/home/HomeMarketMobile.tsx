import { Bell, Clock, MapPin, Smartphone } from "lucide-react";

import { HomeGetOnMobileButtons } from "./HomeGetOnMobileButtons";
import { HomeListItem } from "./HomeListItem";
import { HomeSectionHeader } from "./HomeSectionHeader";
import Image from "next/image";

export const HomeMarketMobile = () => {
  const featureList = [
    {
      Icon: Bell,
      iconBackgroundColor: "bg-white",
      iconColor: "text-primary",
      titleTextColor: "text-muted",
      descriptionTextColor: "text-muted-foreground",
      titleText: "Certification Tracking",
      descriptionText:
        "Automatically track and manage fire safety certifications, ensuring all personnel are compliant with regulations.",
    },
    {
      Icon: MapPin,
      iconBackgroundColor: "bg-white",
      iconColor: "text-primary",
      titleTextColor: "text-muted",
      descriptionTextColor: "text-muted-foreground",
      titleText: "GPS Check-in",
      descriptionText:
        "Location-verified check-ins ensure personnel are on-site and provide accurate time tracking for billing.",
    },
    {
      Icon: Clock,
      iconBackgroundColor: "bg-white",
      iconColor: "text-primary",
      titleTextColor: "text-muted",
      descriptionTextColor: "text-muted-foreground",
      titleText: "Mobile Time Clock",
      descriptionText:
        "Easy clock in/out functionality with photo verification and GPS tracking for complete accountability.",
    },
    {
      Icon: Smartphone,
      iconBackgroundColor: "bg-white",
      iconColor: "text-primary",
      titleTextColor: "text-muted",
      descriptionTextColor: "text-muted-foreground",
      titleText: "Digital Inspections",
      descriptionText:
        "Complete fire watch inspections digitally with photo documentation and instant report generation.",
    },
  ];

  return (
    <section
      id="mobile"
      className="w-full px-4 py-12 md:py-24 lg:py-32 bg-secondary"
    >
      <HomeSectionHeader
        titleClass="text-muted"
        subtitleClass="text-muted-foreground"
        sectionTitle="Fire Watch Management On-the-Go"
        subtitle="Empower your fire watch personnel with our mobile app. Real-time
          updates, instant alerts, and seamless communication keep everyone
          connected and compliant."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center mx-auto max-w-5xl py-12">
        <div className="flex flex-col gap-6">
          {featureList.map((it) => (
            <HomeListItem key={it.titleText} {...it} />
          ))}
        </div>

        <div className="flex justify-center">
          <Image
            src="/images/phone.png"
            width={427 / 1.5}
            height={858 / 1.5}
            alt="Mobile App Screenshot"
            className="mx-auto"
          />
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <HomeGetOnMobileButtons />
      </div>
    </section>
  );
};
