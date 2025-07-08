import {
  Badge,
  Box,
  Card,
  Container,
  Flex,
  Grid,
  Heading,
  Section,
  Text,
} from "@radix-ui/themes";

import Image from "next/image";
import { Plug } from "lucide-react";

export function AppIntegrations() {
  return (
    <Section
      id="integrations"
      className="w-full bg-muted py-12 md:py-24 lg:py-32"
    >
      <Container>
        <Flex
          direction="column"
          align="center"
          className="text-center space-y-4"
        >
          <Badge color="red" size="2">
            Integrations
          </Badge>
          <Heading size="8" className="font-bold tracking-tighter">
            Works Seamlessly with Your Existing Stack
          </Heading>
          <Text size="5" className="max-w-2xl text-muted-foreground">
            REDLINE connects to industry-leading platforms so you can keep the
            tools you love while centralising fire watch staffing operations.
          </Text>
        </Flex>

        <Grid
          columns={{ initial: "1", lg: "2" }}
          gap="8"
          className="mx-auto max-w-4xl mt-12"
        >
          {/* Quicksuite */}
          <Card>
            <Flex direction="column" gap="4" p="6">
              <Flex align="center" gap="3">
                <Box className="p-3 flex items-center justify-center rounded-lg bg-red-600 text-white">
                  <Plug className="h-5 w-5" />
                </Box>
                <Heading size="5" className="font-bold">
                  Quicksuite
                </Heading>
              </Flex>
              <Text className="text-muted-foreground">
                Sync employee records, certification status, and assignments
                between Quicksuite and REDLINE in real-time—no double data entry
                required.
              </Text>
              <Image
                src="/placeholder.svg?height=220&width=400"
                width={400}
                height={220}
                alt="Quicksuite integration screenshot"
                className="rounded-md border"
              />
            </Flex>
          </Card>

          {/* Payroll */}
          <Card>
            <Flex direction="column" gap="4" p="6">
              <Flex align="center" gap="3">
                <Box className="p-3 flex items-center justify-center rounded-lg bg-red-600 text-white">
                  <Plug className="h-5 w-5" />
                </Box>
                <Heading size="5" className="font-bold">
                  Payroll Platforms
                </Heading>
              </Flex>
              <Text className="text-muted-foreground">
                Push approved hours straight to payroll systems such as ADP,
                Paychex, and QuickBooks for faster, error-free payroll runs.
              </Text>
              <Image
                src="/placeholder.svg?height=220&width=400"
                width={400}
                height={220}
                alt="Payroll integration screenshot"
                className="rounded-md border"
              />
            </Flex>
          </Card>
        </Grid>
      </Container>
    </Section>
  );
}

export default AppIntegrations;
