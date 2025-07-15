"use client";

import { Card, CardContent, CardHeader } from "@/lib/components/ui/card";

import { Button } from "@/lib/components/ui/button";
import { Check } from "lucide-react";
import { HomeSectionHeader } from "./HomeSectionHeader";
import { useRouter } from "next/navigation";

export const HomePricing = () => {
  const router = useRouter();

  const plans = [
    {
      name: "Fire Watch",
      price: "Set Your Own Rate!",
      description: "You are looking to do fire watch patrol",
      features: [
        "Set your own rate",
        "Set your availability",
        "Time tracking",
        "Certification management",
        "GPS tracking & verification",
        "In-app incident reporting",
        "Free training",
        "Email support",
      ],
    },
    {
      name: "Fire Watch Client",
      price: "Contact Us",
      description: "You are in need of Fire Watch",
      features: [
        "24/7 phone support",
        "Choose verified fire watchers",
        "Guarenteed fire watch in 2hrs or less",
        "Advanced scheduling",
        "Priority support",
        "Advanced reporting",
        "Quicksuite integrations",
        "Custom workflows & training",
      ],
    },
    {
      name: "AHJ Official",
      price: "Contact Us",
      description: "You are an AHJ Offical wanting reporting",
      features: [
        "24/7 phone support",
        "Custom reporting",
        "Multi-location management",
        "Custom integrations",
        "Dedicated account manager",
        "Advanced analytics",
        "Custom training",
        "SLA, NFPA, & OSHA verifications",
      ],
    },
  ];

  return (
    <section id="pricing" className="w-full px-4 py-12 md:py-24 lg:py-32">
      <HomeSectionHeader
        subtitleClass="text-muted-foreground"
        sectionTitle="How Can We Get You Started?"
        subtitle="REDLINE Fire Watch &trade; has a solution for those looking to start fire watch careers, and businesses looking for fire watchers. If you are an AHJ Official and are interested in using REDLINE: Fire Watch &trade; as your complete validation platform, reach out to sales today!"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {plans.map((plan, index) => (
          <Card key={index}>
            <CardHeader className="pb-0">
              <div className="mb-6 text-center">
                <div className="mb-2 text-xl font-bold">{plan.name}</div>
                <div className="text-muted-foreground mb-4">
                  {plan.description}
                </div>
                <div className="text-2xl font-bold text-primary">
                  {plan.price}
                </div>
              </div>
            </CardHeader>

            <CardContent className="flex flex-col">
              <div className="flex flex-col mb-6">
                <p className="font-bold mb-4">What&apos;s included:</p>
                {plan.features.map((feature, featureIndex) => (
                  <div className="my-1" key={featureIndex}>
                    <div className="flex items-center gap-3" key={featureIndex}>
                      <div className="flex-shrink-0">
                        <Check className="h-4 w-4 text-green-600" />
                      </div>
                      <div>{feature}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex flex-col items-center text-center mt-12">
        <p className="mb-4 text-muted-foreground">
          Need a custom solution? We offer tailored packages for unique
          requirements.
        </p>

        <div className="flex justify-center gap-2">
          <Button size="lg" onClick={() => router.push("/signup")}>
            Signup now!
          </Button>
          <Button size="lg" variant="secondary">
            Contact Sales
          </Button>
        </div>
      </div>
    </section>
  );
};
