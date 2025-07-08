import { Calendar, Clock, Shield, Users2 } from "lucide-react";

import Image from "next/image";

export const AppFeatures = () => {
  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              Specialized for Fire Watch Management
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl">
              Our platform provides all the tools you need to manage fire watch
              personnel efficiently, ensuring safety compliance and operational
              excellence.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
          <div className="grid gap-6">
            <div className="flex gap-4 items-start">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-600 text-white">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Certification Tracking</h3>
                <p className="text-muted-foreground">
                  Automatically track and manage fire safety certifications,
                  ensuring all personnel are compliant with regulations.
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-600 text-white">
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Shift Scheduling</h3>
                <p className="text-muted-foreground">
                  Create and manage complex 24/7 fire watch schedules with ease,
                  ensuring proper coverage at all times.
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-600 text-white">
                <Users2 className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Personnel Management</h3>
                <p className="text-muted-foreground">
                  Comprehensive tools for recruiting, vetting, and managing
                  qualified fire watch personnel.
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-600 text-white">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Time & Attendance</h3>
                <p className="text-muted-foreground">
                  Track time on site with GPS verification, ensuring
                  accountability and accurate billing for fire watch services.
                </p>
              </div>
            </div>
          </div>
          <Image
            src="/placeholder.svg?height=550&width=550"
            width={550}
            height={550}
            alt="Fire Watch Management Features"
            className="mx-auto aspect-square overflow-hidden rounded-xl object-cover"
          />
        </div>
      </div>
    </section>
  );
};
