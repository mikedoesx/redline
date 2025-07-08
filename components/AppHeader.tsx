"use client";

import {
  Box,
  Button,
  Container,
  Flex,
  Link as RadixLink,
  Text,
} from "@radix-ui/themes";
import { Flame, Menu, X } from "lucide-react";

import Link from "next/link";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";

export function AppHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <Container className="bg-white relative p-4 border-b">
      <Flex align="center" justify="between">
        <Link href="/" className="flex items-center">
          <Flame className="text-red-600" />{" "}
          <Text className="text-primary" weight="bold" size="6">
            REDLINE
          </Text>
        </Link>

        {/* Desktop Navigation */}
        {!isMobile && (
          <Flex asChild gap="6">
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
                  href="#mobile"
                  className="text-sm font-medium hover:text-red-600"
                >
                  App
                </Link>
              </RadixLink>
              <RadixLink asChild>
                <Link
                  href="#contact"
                  className="text-sm font-medium hover:text-red-600"
                >
                  Contact Us
                </Link>
              </RadixLink>
            </nav>
          </Flex>
        )}
        <Flex gap="4" align="center">
          <Button>Get Started</Button>

          {isMobile && (
            <Button onClick={toggleMobileMenu} variant="ghost">
              {isMobileMenuOpen ? <X /> : <Menu />}
            </Button>
          )}
        </Flex>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <Container className="absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 px-4">
            <Flex direction="column" gap="4" className="py-4">
              <RadixLink asChild>
                <Link
                  href="#features"
                  className="text-sm font-medium hover:text-red-600 py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Features
                </Link>
              </RadixLink>
              <RadixLink asChild>
                <Link
                  href="#integrations"
                  className="text-sm font-medium hover:text-red-600 py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Integrations
                </Link>
              </RadixLink>
              <RadixLink asChild>
                <Link
                  href="#mobile"
                  className="text-sm font-medium hover:text-red-600 py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  App
                </Link>
              </RadixLink>
              <RadixLink asChild>
                <Link
                  href="#contact"
                  className="text-sm font-medium hover:text-red-600 py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact Us
                </Link>
              </RadixLink>
            </Flex>
          </Container>
        )}
      </Flex>
    </Container>
  );
}

export default AppHeader;
