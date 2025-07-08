import { Button } from "@/components/ui/button";
import { Flame } from "lucide-react";
import Link from "next/link";

export const AppHeader = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Flame className="h-6 w-6 text-red-600" />
          <span className="text-xl font-bold">Redline</span>
        </div>
        <nav className="hidden md:flex gap-6">
          <Link
            href="#features"
            className="text-sm font-medium hover:text-red-600"
          >
            Features
          </Link>
          <Link
            href="#testimonials"
            className="text-sm font-medium hover:text-red-600"
          >
            Testimonials
          </Link>
          <Link
            href="#mobile"
            className="text-sm font-medium hover:text-red-600"
          >
            Mobile App
          </Link>
          <Link
            href="#contact"
            className="text-sm font-medium hover:text-red-600"
          >
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button className="bg-red-600 hover:bg-red-700">Get Started</Button>
        </div>
      </div>
    </header>
  );
};
