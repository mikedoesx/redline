import { Box, Container, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { Calendar, Clock, Shield, Users2 } from "lucide-react";

import Image from "next/image";

export const AppFeatures = () => {
  return (
    <Container
      id="features"
      className="w-full px-4 py-12 md:py-24 lg:py-32 bg-muted"
    >
      <Flex
        direction="column"
        align="center"
        justify="center"
        className="space-y-4 text-center"
      >
        <Box className="space-y-2">
          <Heading size="8" className="font-bold tracking-tighter">
            Specialized for Fire Watch Management
          </Heading>
          <Text size="5" className="max-w-[900px] text-muted-foreground">
            Our platform provides all the tools you need to manage fire watch
            personnel efficiently, ensuring safety compliance and operational
            excellence.
          </Text>
        </Box>
      </Flex>

      <Grid
        columns={{ initial: "1", lg: "2" }}
        gap="6"
        className="mx-auto max-w-5xl items-center py-12"
      >
        <Flex direction="column" gap="6">
          <Flex gap="4" align="start">
            <Box className="p-3 bg-red-100 rounded-lg">
              <Shield className="h-5 w-5 text-red-600" />
            </Box>
            <Box>
              <Heading size="5" className="font-bold">
                Certification Tracking
              </Heading>
              <Text className="text-muted-foreground">
                Automatically track and manage fire safety certifications,
                ensuring all personnel are compliant with regulations.
              </Text>
            </Box>
          </Flex>

          <Flex gap="4" align="start">
            <Box className="p-3 bg-red-100 rounded-lg">
              <Calendar className="h-5 w-5 text-red-600" />
            </Box>
            <Box>
              <Heading size="5" className="font-bold">
                Shift Scheduling
              </Heading>
              <Text className="text-muted-foreground">
                Create and manage complex 24/7 fire watch schedules with ease,
                ensuring proper coverage at all times.
              </Text>
            </Box>
          </Flex>

          <Flex gap="4" align="start">
            <Box className="p-3 bg-red-100 rounded-lg">
              <Users2 className="h-5 w-5 text-red-600" />
            </Box>
            <Box>
              <Heading size="5" className="font-bold">
                Personnel Management
              </Heading>
              <Text className="text-muted-foreground">
                Comprehensive tools for recruiting, vetting, and managing
                qualified fire watch personnel.
              </Text>
            </Box>
          </Flex>

          <Flex gap="4" align="start">
            <Box className="p-3 bg-red-100 rounded-lg">
              <Clock className="h-5 w-5 text-red-600" />
            </Box>
            <Box>
              <Heading size="5" className="font-bold">
                Time & Attendance
              </Heading>
              <Text className="text-muted-foreground">
                Track time on site with GPS verification, ensuring
                accountability and accurate billing for fire watch services.
              </Text>
            </Box>
          </Flex>
        </Flex>

        <Image
          src="/placeholder.svg?height=550&width=550"
          width={550}
          height={550}
          alt="Fire Watch Management Features"
          className="mx-auto aspect-square overflow-hidden rounded-xl object-cover"
        />
      </Grid>
    </Container>
  );
};
