import { Clock, Shield, Users } from "lucide-react";

export const HomeFeatureBanner = () => {
  const features = [
    {
      icon: Shield,
      name: "24/7 Protection",
      description:
        "Round-the-clock fire watch services with certified professionals monitoring your property at all times.",
    },
    {
      icon: Clock,
      name: "Real-Time Reporting",
      description:
        "Instant alerts and comprehensive reports delivered directly to your dashboard for complete transparency.",
    },
    {
      icon: Users,
      name: "Expert Team",
      description:
        "Highly trained and certified fire watch personnel with years of experience in fire safety and prevention.",
    },
  ];

  return (
    <section className="bg-foreground py-16 md:py-20 md:border-t-8 md:border-white">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        {features.map((feature, index) => {
          const IconComponent = feature.icon;
          return (
            <div
              key={index}
              className="flex flex-col items-center gap-4 text-center"
            >
              <div className="p-4 bg-white rounded-lg">
                <IconComponent className="w-8 h-8 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold text-primary mb-2">
                  {feature.name}
                </div>
                <div className="text-accent leading-relaxed">
                  {feature.description}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
