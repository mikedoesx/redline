import { Bell, Clock, MapPin, Smartphone } from "lucide-react";
import { Box, Container, Flex, Grid, Heading, Text } from "@radix-ui/themes";

import { AppGetOnMobileButtons } from "./AppGetOnMobileButtons";
import Image from "next/image";

export const AppMarketMobile = () => {
  return (
    <Container id="mobile" className="w-full px-4 py-12 md:py-24 lg:py-32">
      <Flex
        direction="column"
        align="center"
        justify="center"
        className="space-y-4 text-center"
      >
        <Heading size="8" className="font-bold tracking-tighter">
          Fire Watch Management On-the-Go
        </Heading>
        <Text size="5" className="max-w-[900px]">
          Empower your fire watch personnel with our mobile app. Real-time
          updates, instant alerts, and seamless communication keep everyone
          connected and compliant.
        </Text>
      </Flex>

      <Grid
        columns={{ initial: "1", lg: "2" }}
        gap="6"
        align="center"
        className="mx-auto max-w-5xl py-12"
      >
        <Flex direction="column" gap="6">
          <Flex gap="4" align="center">
            <Box className="flex p-3 shrink-0 items-center justify-center rounded-lg bg-red-600 text-white">
              <Bell className="h-5 w-5" />
            </Box>
            <Box>
              <Heading size="5" className="font-bold">
                Real-time Updates
              </Heading>
              <Text>
                Instant notifications for schedule changes, emergency alerts,
                and important updates keep your team informed.
              </Text>
            </Box>
          </Flex>

          <Flex gap="4" align="center">
            <Box className="flex p-3 shrink-0 items-center justify-center rounded-lg bg-red-600 text-white">
              <MapPin className="h-5 w-5" />
            </Box>
            <Box>
              <Heading size="5" className="font-bold">
                GPS Check-in
              </Heading>
              <Text>
                Location-verified check-ins ensure personnel are on-site and
                provide accurate time tracking for billing.
              </Text>
            </Box>
          </Flex>

          <Flex gap="4" align="center">
            <Box className="flex p-3 shrink-0 items-center justify-center rounded-lg bg-red-600 text-white">
              <Clock className="h-5 w-5" />
            </Box>
            <Box>
              <Heading size="5" className="font-bold">
                Mobile Time Clock
              </Heading>
              <Text>
                Easy clock in/out functionality with photo verification and GPS
                tracking for complete accountability.
              </Text>
            </Box>
          </Flex>

          <Flex gap="4" align="center">
            <Box className="flex p-3 shrink-0 items-center justify-center rounded-lg bg-red-600 text-white">
              <Smartphone className="h-5 w-5" />
            </Box>
            <Box>
              <Heading size="5" className="font-bold">
                Digital Inspections
              </Heading>
              <Text>
                Complete fire watch inspections digitally with photo
                documentation and instant report generation.
              </Text>
            </Box>
          </Flex>
        </Flex>

        <Box className="flex justify-center">
          <Image
            src="/images/phone.png"
            width={427 / 1.5}
            height={858 / 1.5}
            alt="Mobile App Screenshot"
            className="mx-auto"
          />
        </Box>
      </Grid>

      <Flex justify="center" className="mt-8">
        <AppGetOnMobileButtons />
      </Flex>
    </Container>
  );
};
