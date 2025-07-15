import { Calendar, Clock, Shield, Users2 } from "lucide-react";

import { HomeListItem } from "./HomeListItem";
import { HomeSectionHeader } from "./HomeSectionHeader";
import Image from "next/image";

export const HomeFeatures = () => {
  const featureList = [
    {
      Icon: Shield,
      iconBackgroundColor: "bg-primary",
      iconColor: "text-white",
      titleTextColor: "text-foreground",
      descriptionTextColor: "text-muted-foreground",
      titleText: "Certification Tracking",
      descriptionText:
        "Automatically track and manage fire safety certifications, ensuring all personnel are compliant with regulations.",
    },
    {
      Icon: Calendar,
      iconBackgroundColor: "bg-primary",
      iconColor: "text-white",
      titleTextColor: "text-foreground",
      descriptionTextColor: "text-muted-foreground",
      titleText: "Shift Scheduling",
      descriptionText:
        "Create and manage complex 24/7 fire watch schedules with ease, ensuring proper coverage at all times.",
    },
    {
      Icon: Users2,
      iconBackgroundColor: "bg-primary",
      iconColor: "text-white",
      titleTextColor: "text-foreground",
      descriptionTextColor: "text-muted-foreground",
      titleText: "Personnel Management",
      descriptionText:
        "Comprehensive tools for recruiting, vetting, and managing qualified fire watch personnel.",
    },
    {
      Icon: Clock,
      iconBackgroundColor: "bg-primary",
      iconColor: "text-white",
      titleTextColor: "text-foreground",
      descriptionTextColor: "text-muted-foreground",
      titleText: "Time & Attendance",
      descriptionText:
        "Track time on site with GPS verification, ensuring accountability and accurate billing for fire watch services.",
    },
  ];

  return (
    <section
      id="features"
      className="w-full px-4 py-12 md:py-24 lg:py-32 bg-muted"
    >
      <HomeSectionHeader
        subtitleClass="text-muted-foreground"
        sectionTitle="Specialized for Fire Watch Management"
        subtitle="Our platform provides all the tools you need to manage fire watch
          personnel efficiently, ensuring safety compliance and operational
          excellence."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center mx-auto max-w-5xl py-12">
        <div className="flex flex-col gap-6">
          {featureList.map((it) => (
            <HomeListItem key={it.titleText} {...it} />
          ))}
        </div>

        <Image
          src="/images/extinguisher.png"
          width={550}
          height={550}
          alt="Fire Watch Management Features"
          className="mx-auto aspect-square overflow-hidden rounded-xl object-cover"
        />
      </div>
    </section>
  );
};
