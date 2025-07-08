import { ArrowRight, Flame } from "lucide-react";
import { Button, Card, TextField } from "@radix-ui/themes";

import { AppGetOnMobileButtons } from "../AppGetOnMobileButtons";
import Link from "next/link";

export const AppHero = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="px-4 md:px-6">
        <div className="max-w-6xl mx-auto grid gap-6 lg:grid-cols-[400px] lg:gap-12 xl:grid-cols-[1fr_450px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2 flex flex-col">
              <div className="text-3xl flex">
                <Flame
                  color="#dc2626"
                  className="h-8 w-8 sm:h-12 sm:w-12 xl:h-14 xl:w-14"
                />
                <span className="text-3xl font-bold sm:text-5xl xl:text-6xl/none">
                  Redline
                </span>
              </div>

              <h1 className="text-xl font-bold tracking-tighter sm:text-3xl xl:text-4xl/none">
                Fire Watch Staffing Made Simple
              </h1>

              <p className="max-w-[600px] text-muted-foreground md:text-lg">
                The specialized platform that helps you recruit, deploy, and
                manage fire watch personnel with confidence and compliance.
              </p>
            </div>

            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size={"3"}>
                Request Demo <ArrowRight className="h-4 w-4" />
              </Button>

              <Button size={"3"} variant="outline">
                Learn More
              </Button>
            </div>

            <AppGetOnMobileButtons />
          </div>

          {/* Login Card */}
          <Card>
            <div className="space-y-4">
              <div className="flex items-center justify-center">
                <Flame className="h-8 w-8 text-red-600" />
                <h2 className="text-2xl font-bold ml-2">Login</h2>
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <TextField.Root
                    id="email"
                    type="email"
                    placeholder="name@company.com"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="text-sm font-medium">
                      Password
                    </label>
                    <Link
                      href="#"
                      className="text-xs text-red-600 hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <TextField.Root
                    id="password"
                    type="password"
                    placeholder="••••••••"
                  />
                </div>

                <Button className="w-full bg-red-600 hover:bg-red-700">
                  Sign In
                </Button>
              </div>

              <div className="text-center text-sm">
                <span className="text-muted-foreground">
                  Don't have an account?{" "}
                </span>
                <Link href="#" className="text-red-600 hover:underline">
                  Contact sales
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
