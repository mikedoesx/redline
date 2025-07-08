import {
  Container,
  Flex,
  Grid,
  Heading,
  Link as RadixLink,
  Text,
} from "@radix-ui/themes";
import { Facebook, Flame, Linkedin, Twitter } from "lucide-react";

import Link from "next/link";

export const AppFooter = () => {
  return (
    <Container className="w-full border-t bg-background px-4 py-6 md:py-24">
      <Grid columns={{ initial: "2", md: "4" }} gap="8">
        <Flex direction="column" className="space-y-4">
          <Flex align="center" gap="1">
            <Flame className="h-6 w-6 text-red-600" />
            <Heading size="5">REDLINE</Heading>
          </Flex>
          <Text size="2" className="text-muted-foreground">
            Specialized employment management for fire watch staffing, ensuring
            safety and compliance.
          </Text>
        </Flex>

        <Flex direction="column" className="space-y-4">
          <Heading size="3">Product</Heading>
          <Flex direction="column" className="space-y-2">
            <RadixLink asChild size="2">
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Features
              </Link>
            </RadixLink>
            <RadixLink asChild size="2">
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Mobile App
              </Link>
            </RadixLink>
            <RadixLink asChild size="2">
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Integrations
              </Link>
            </RadixLink>
            <RadixLink asChild size="2">
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Compliance
              </Link>
            </RadixLink>
          </Flex>
        </Flex>

        <Flex direction="column" className="space-y-4">
          <Heading size="3">Resources</Heading>
          <Flex direction="column" className="space-y-2">
            <RadixLink asChild size="2">
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Documentation
              </Link>
            </RadixLink>
            <RadixLink asChild size="2">
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Fire Safety Guides
              </Link>
            </RadixLink>
            <RadixLink asChild size="2">
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Support
              </Link>
            </RadixLink>
            <RadixLink asChild size="2">
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Certification Resources
              </Link>
            </RadixLink>
          </Flex>
        </Flex>

        <Flex direction="column" className="space-y-4">
          <Heading size="3">Company</Heading>
          <Flex direction="column" className="space-y-2">
            <RadixLink asChild size="2">
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                About
              </Link>
            </RadixLink>
            <RadixLink asChild size="2">
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Blog
              </Link>
            </RadixLink>
            <RadixLink asChild size="2">
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Careers
              </Link>
            </RadixLink>
            <RadixLink asChild size="2">
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Contact
              </Link>
            </RadixLink>
          </Flex>
        </Flex>
      </Grid>

      <Flex
        direction={{ initial: "column", sm: "row" }}
        align="center"
        justify="between"
        gap="4"
        className="mt-8"
      >
        <Text size="1" className="text-muted-foreground">
          © {new Date().getFullYear()} REDLINE &trade;. All rights reserved.
        </Text>
        <Flex gap="4">
          <RadixLink asChild>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground"
            >
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
          </RadixLink>
          <RadixLink asChild>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground"
            >
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
          </RadixLink>
          <RadixLink asChild>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground"
            >
              <Facebook className="h-5 w-5" />
              <span className="sr-only">Facebook</span>
            </Link>
          </RadixLink>
        </Flex>
      </Flex>
    </Container>
  );
};
