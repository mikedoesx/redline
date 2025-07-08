import { Box, Container, Flex, Grid, Section, Text } from "@radix-ui/themes";
import { Clock, Shield, Users } from "lucide-react";

export const AppFeatureBanner = () => {
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
    <Section className="bg-red-600 py-16 md:py-20 md:border-t-8 md:border-white">
      <Container size="4">
        <Grid columns={{ initial: "1", md: "3" }} gap="6" align="center">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Flex
                key={index}
                direction="column"
                align="center"
                gap="4"
                className="text-center"
              >
                <Box className="p-4 bg-white rounded-lg">
                  <IconComponent className="w-8 h-8 text-red-600" />
                </Box>
                <Box>
                  <Text
                    size="5"
                    weight="bold"
                    className="text-white mb-2 block"
                  >
                    {feature.name}
                  </Text>
                  <Text size="3" className="text-red-100 leading-relaxed">
                    {feature.description}
                  </Text>
                </Box>
              </Flex>
            );
          })}
        </Grid>
      </Container>
    </Section>
  );
};
