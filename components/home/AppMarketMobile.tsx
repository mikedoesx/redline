import {
  Badge,
  Box,
  Container,
  Flex,
  Grid,
  Heading,
  Section,
  Text,
} from "@radix-ui/themes";
import { Bell, Clock, MapPin, Smartphone } from "lucide-react";

import { AppGetOnMobileButtons } from "../AppGetOnMobileButtons";
import Image from "next/image";

export const AppMarketMobile = () => {
  return (
    <Section id="mobile" className="w-full py-12 md:py-24 lg:py-32">
      <Container>
        <Flex
          direction="column"
          align="center"
          justify="center"
          className="space-y-4 text-center"
        >
          <Badge color="red" size="2">
            Mobile App
          </Badge>
          <Heading size="8" className="font-bold tracking-tighter">
            Fire Watch Management On-the-Go
          </Heading>
          <Text size="5" className="max-w-[900px] text-muted-foreground">
            Empower your fire watch personnel with our mobile app. Real-time
            updates, instant alerts, and seamless communication keep everyone
            connected and compliant.
          </Text>
        </Flex>

        <Grid
          columns={{ initial: "1", lg: "2" }}
          gap="6"
          className="mx-auto max-w-5xl items-center py-12"
        >
          <Flex direction="column" gap="6">
            <Flex gap="4" align="start">
              <Box className="flex p-3 shrink-0 items-center justify-center rounded-lg bg-red-600 text-white">
                <Bell className="h-5 w-5" />
              </Box>
              <Box>
                <Heading size="5" className="font-bold">
                  Real-time Updates
                </Heading>
                <Text className="text-muted-foreground">
                  Instant notifications for schedule changes, emergency alerts,
                  and important updates keep your team informed.
                </Text>
              </Box>
            </Flex>

            <Flex gap="4" align="start">
              <Box className="flex p-3 shrink-0 items-center justify-center rounded-lg bg-red-600 text-white">
                <MapPin className="h-5 w-5" />
              </Box>
              <Box>
                <Heading size="5" className="font-bold">
                  GPS Check-in
                </Heading>
                <Text className="text-muted-foreground">
                  Location-verified check-ins ensure personnel are on-site and
                  provide accurate time tracking for billing.
                </Text>
              </Box>
            </Flex>

            <Flex gap="4" align="start">
              <Box className="flex p-3 shrink-0 items-center justify-center rounded-lg bg-red-600 text-white">
                <Clock className="h-5 w-5" />
              </Box>
              <Box>
                <Heading size="5" className="font-bold">
                  Mobile Time Clock
                </Heading>
                <Text className="text-muted-foreground">
                  Easy clock in/out functionality with photo verification and
                  GPS tracking for complete accountability.
                </Text>
              </Box>
            </Flex>

            <Flex gap="4" align="start">
              <Box className="flex p-3 shrink-0 items-center justify-center rounded-lg bg-red-600 text-white">
                <Smartphone className="h-5 w-5" />
              </Box>
              <Box>
                <Heading size="5" className="font-bold">
                  Digital Inspections
                </Heading>
                <Text className="text-muted-foreground">
                  Complete fire watch inspections digitally with photo
                  documentation and instant report generation.
                </Text>
              </Box>
            </Flex>
          </Flex>

          <Box className="flex justify-center">
            <Image
              src="/placeholder.svg?height=600&width=300"
              width={300}
              height={600}
              alt="Mobile App Screenshot"
              className="mx-auto rounded-2xl shadow-2xl"
            />
          </Box>
        </Grid>

        <Flex justify="center" className="mt-8">
          <AppGetOnMobileButtons />
        </Flex>
      </Container>
    </Section>
  );
};
