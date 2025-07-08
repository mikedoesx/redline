import { Box, Container, Flex, Link as RadixLink } from "@radix-ui/themes";

import { Flame } from "lucide-react";
import Link from "next/link";

export function AppHeader() {
  return (
    <Box className="bg-white p-4 border">
      <Container>
        <Flex align="center" justify="between">
          <Link
            href="/"
            className="text-2xl font-bold text-gray-800 flex gap-1 items-center"
          >
            <Flame className="text-red-600" /> REDLINE
          </Link>

          <Flex asChild className="hidden md:flex" gap="6">
            <nav>
              <RadixLink asChild>
                <Link
                  href="#features"
                  className="text-sm font-medium hover:text-red-600"
                >
                  Features
                </Link>
              </RadixLink>
              <RadixLink asChild>
                <Link
                  href="#integrations"
                  className="text-sm font-medium hover:text-red-600"
                >
                  Integrations
                </Link>
              </RadixLink>
              <RadixLink asChild>
                <Link
                  href="#testimonials"
                  className="text-sm font-medium hover:text-red-600"
                >
                  Testimonials
                </Link>
              </RadixLink>
              <RadixLink asChild>
                <Link
                  href="#mobile"
                  className="text-sm font-medium hover:text-red-600"
                >
                  Mobile App
                </Link>
              </RadixLink>
              <RadixLink asChild>
                <Link
                  href="#contact"
                  className="text-sm font-medium hover:text-red-600"
                >
                  Contact
                </Link>
              </RadixLink>
            </nav>
          </Flex>

          <Box className="hidden md:block">
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Get Started
            </button>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}

export default AppHeader;
