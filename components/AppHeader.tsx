"use client"

import { Box, Container, Flex, Link as RadixLink } from "@radix-ui/themes"
import { Flame, Menu, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export function AppHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <Box className="bg-white p-4 border relative">
      <Container>
        <Flex align="center" justify="between">
          <Link href="/" className="text-2xl font-bold text-gray-800 flex gap-1 items-center">
            <Flame className="text-red-600" /> REDLINE
          </Link>

          {/* Desktop Navigation */}
          <Flex asChild className="hidden md:flex" gap="6">
            <nav>
              <RadixLink asChild>
                <Link href="#features" className="text-sm font-medium hover:text-red-600">
                  Features
                </Link>
              </RadixLink>
              <RadixLink asChild>
                <Link href="#integrations" className="text-sm font-medium hover:text-red-600">
                  Integrations
                </Link>
              </RadixLink>
              <RadixLink asChild>
                <Link href="#testimonials" className="text-sm font-medium hover:text-red-600">
                  Testimonials
                </Link>
              </RadixLink>
              <RadixLink asChild>
                <Link href="#mobile" className="text-sm font-medium hover:text-red-600">
                  Mobile App
                </Link>
              </RadixLink>
              <RadixLink asChild>
                <Link href="#contact" className="text-sm font-medium hover:text-red-600">
                  Contact
                </Link>
              </RadixLink>
            </nav>
          </Flex>

          {/* Desktop CTA Button */}
          <Box className="hidden md:block">
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Get Started</button>
          </Box>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 text-gray-600 hover:text-red-600 transition-colors"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </Flex>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <Box className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
            <Container>
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
                    href="#testimonials"
                    className="text-sm font-medium hover:text-red-600 py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Testimonials
                  </Link>
                </RadixLink>
                <RadixLink asChild>
                  <Link
                    href="#mobile"
                    className="text-sm font-medium hover:text-red-600 py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Mobile App
                  </Link>
                </RadixLink>
                <RadixLink asChild>
                  <Link
                    href="#contact"
                    className="text-sm font-medium hover:text-red-600 py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Contact
                  </Link>
                </RadixLink>
                <Box className="pt-2 border-t border-gray-200">
                  <button
                    className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Get Started
                  </button>
                </Box>
              </Flex>
            </Container>
          </Box>
        )}
      </Container>
    </Box>
  )
}

export default AppHeader
