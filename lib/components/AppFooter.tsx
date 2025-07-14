import { Facebook, Linkedin, Twitter } from "lucide-react";

import Image from "next/image";
import Link from "next/link";

export const AppFooter = () => {
  return (
    <div className="w-full border-t bg-background px-4 pt-6 md:pt-24">
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="flex flex-col space-y-4">
          <Image
            src="/images/logo220x48.png"
            height={48 / 1.25}
            width={295 / 1.25}
            alt="REDLINE: Fire Watch Staffing Solutions"
          />
          <p className="text-muted-foreground">
            Specialized employment management for fire watch staffing, ensuring
            safety and compliance.
          </p>
        </div>

        <div className="flex flex-col space-y-4">
          <h5 className="font-bold text-lg">Product</h5>
          <div className="flex flex-col space-y-2">
            <Link href="#" className="text-muted-foreground hover:text-primary">
              Features
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">
              Mobile App
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">
              Integrations
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">
              Compliance
            </Link>
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          <h5 className="font-bold text-lg">Resources</h5>
          <div className="flex flex-col space-y-2">
            <Link href="#" className="text-muted-foreground hover:text-primary">
              Documentation
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">
              Fire Safety Guides
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">
              Support
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">
              Certification Resources
            </Link>
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          <h5 className="font-bold text-lg">Company</h5>
          <div className="flex flex-col space-y-2">
            <Link href="#" className="text-muted-foreground hover:text-primary">
              About
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">
              Blog
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">
              Careers
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">
              Contact
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
        <div className="text-muted-foreground">
          © {new Date().getFullYear()} REDLINE: Fire Watch&trade;. All rights
          reserved.
        </div>

        <div className="flex gap-4 pb-8">
          <Link href="#" className="text-muted-foreground hover:text-primary">
            <Twitter className="h-5 w-5" />
            <span className="sr-only">Twitter</span>
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-primary">
            <Linkedin className="h-5 w-5" />
            <span className="sr-only">LinkedIn</span>
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-primary">
            <Facebook className="h-5 w-5" />
            <span className="sr-only">Facebook</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
