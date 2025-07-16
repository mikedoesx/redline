"use client";

import { Menu, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { Button } from "@/lib/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useIsMobile } from "@/lib/hooks/use-mobile";
import { useState } from "react";

export const HomeHeader = () => {
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
    <header className="bg-white relative p-4 border-b">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo220x48.png"
            height={48 / 1.25}
            width={295 / 1.25}
            alt="REDLINE: Fire Watch Staffing Solutions"
          />
        </Link>

        {/* Desktop Navigation */}
        {!isMobile && (
          <nav className="flex gap-6">
            <Link href="#features">Features</Link>
            <Link href="#locations">Locations</Link>
            <Link href="#mobile">App</Link>
            <Link href="#pricing">Pricing</Link>
            <Link href="#contact">Contact Us</Link>
          </nav>
        )}
        <div className="flex items-center gap-4">
          <Button onClick={() => router.push("/signup")} variant="outline">
            Sign Up
          </Button>
          <Button onClick={() => router.push("/login")}>Login</Button>

          {isMobile && (
            <Button onClick={toggleMobileMenu} variant="ghost">
              {isMobileMenuOpen ? <X /> : <Menu />}
            </Button>
          )}
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 px-4">
            <div className="flex flex-col gap-4 py-4">
              <Link
                href="#features"
                className="py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                href="#mobile"
                className="py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                App
              </Link>
              <Link
                href="#pricing"
                className="py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="#contact"
                className="py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact Us
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
