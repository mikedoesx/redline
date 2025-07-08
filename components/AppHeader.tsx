import { Box } from "@radix-ui/themes";
import { Flame } from "lucide-react";
import Link from "next/link";

export function AppHeader() {
  return (
    <Box className="bg-white py-4 border">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-bold text-gray-800 flex gap-1 items-center"
        >
          <Flame color="#dc2626" /> REDLINE
        </Link>

        <nav className="hidden md:flex gap-6">
          <Link
            href="#features"
            className="text-sm font-medium hover:text-red-600"
          >
            Features
          </Link>
          <Link
            href="#integrations"
            className="text-sm font-medium hover:text-red-600"
          >
            Integrations
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

        <div className="hidden md:block">
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Get Started
          </button>
        </div>
      </div>
    </Box>
  );
}

export default AppHeader;
