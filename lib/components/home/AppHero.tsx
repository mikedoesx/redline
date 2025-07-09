"use client";

import { ArrowRight, Flame } from "lucide-react";
import {
  Button,
  Card,
  Container,
  Flex,
  Grid,
  Heading,
  Text,
  TextField,
} from "@radix-ui/themes";

import { AppGetOnMobileButtons } from "./AppGetOnMobileButtons";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const AppHero = () => {
  const router = useRouter();

  return (
    <Container className="w-full px-4 py-12 md:py-24 lg:py-32 xl:py-48">
      <Grid
        columns={{ initial: "1", lg: "2" }}
        gap="6"
        className="max-w-6xl mx-auto"
      >
        <Flex direction="column" justify="center" className="space-y-4">
          <Flex direction="column" className="space-y-2">
            <Image
              src="/images/logo295x48.png"
              height={48}
              width={295}
              alt="REDLINE: Fire Watch Staffing Solutions"
            />

            <Heading as="h1" size="7" className="font-bold tracking-tighter">
              Fire Watch Staffing & Management
            </Heading>

            <Text size="4" className="max-w-[600px] text-muted-foreground">
              The specialized platform that helps you recruit, deploy, and
              manage fire watch personnel with confidence and compliance.
            </Text>
          </Flex>

          <Flex direction={{ initial: "column", sm: "row" }} gap="4">
            <Button size="4">
              Request Demo <ArrowRight className="h-4 w-4 ml-1" />
            </Button>

            <Button size="4" variant="outline">
              Learn More
            </Button>
          </Flex>

          <AppGetOnMobileButtons />
        </Flex>

        {/* Login Card */}
        <Card size="3">
          <Flex direction="column" className="space-y-4">
            <Flex align="center" justify="center">
              <Flame className="h-8 w-8 text-red-600" />
              <Heading size="6" className="ml-2">
                Login
              </Heading>
            </Flex>

            <Flex direction="column" className="space-y-3">
              <Flex direction="column" className="space-y-1">
                <Text as="label" size="2" weight="medium">
                  Email
                </Text>
                <TextField.Root type="email" placeholder="name@company.com" />
              </Flex>

              <Flex direction="column" className="space-y-1">
                <Flex align="center" justify="between">
                  <Text as="label" size="2" weight="medium">
                    Password
                  </Text>
                  <Link
                    href="#"
                    className="text-xs text-red-600 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </Flex>
                <TextField.Root type="password" placeholder="••••••••" />
              </Flex>

              <Button
                className="w-full"
                onClick={() => router.push("/dashboard")}
              >
                Sign In
              </Button>
            </Flex>

            <Flex justify="center" className="text-center">
              <Text size="2">
                <Text className="text-muted-foreground">
                  Don't have an account?{" "}
                </Text>
                <Link href="/signup" className="text-red-600 hover:underline">
                  Sign up{" "}
                </Link>
              </Text>
            </Flex>
          </Flex>
        </Card>
      </Grid>
    </Container>
  );
};
