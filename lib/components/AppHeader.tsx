"use client";

import {
  Box,
  Button,
  Container,
  Flex,
  Link as RadixLink,
} from "@radix-ui/themes";
import { Menu, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import Image from "next/image";
import Link from "next/link";
import { useIsMobile } from "@/lib/hooks/use-mobile";
import { useState } from "react";

export function AppHeader() {
  const router = useRouter();
  const pathName = usePathname();
  const isMobile = useIsMobile();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  if (pathName !== "/") {
    return <></>;
  }

  return (
    <Box className="bg-white relative p-4 border-b">
      <Flex className="max-w-7xl mx-auto" align="center" justify="between">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo295x48.png"
            height={48 / 1.25}
            width={295 / 1.25}
            alt="REDLINE: Fire Watch Staffing Solutions"
          />
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
                  href="#pricing"
                  className="text-sm font-medium hover:text-red-600"
                >
                  Pricing
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
          <Button onClick={() => router.push("/signup")} variant="outline">
            Sign Up
          </Button>
          <Button onClick={() => router.push("/login")}>Login</Button>

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
                  href="#pricing"
                  className="text-sm font-medium hover:text-red-600 py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Pricing
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
    </Box>
  );
}

export default AppHeader;
