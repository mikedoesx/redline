import { Bell, Clock, Shield, Smartphone } from "lucide-react";

import { AppGetOnMobileButtons } from "../AppGetOnMobileButtons";
import Image from "next/image";

export const AppMarketMobile = () => {
  return (
    <section id="mobile" className="w-full py-12 md:py-24 lg:py-32">
      <div className="px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              Automated Tracking, Reporting, Tasks, and more
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl">
              Access all Redline features from anywhere with our powerful mobile
              application, available for iOS and Android.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
          <Image
            src="/placeholder.svg?height=600&width=300"
            width={300}
            height={600}
            alt="Redline Mobile App"
            className="mx-auto rounded-[2.5rem] shadow-xl border-8 border-gray-800"
          />
          <div className="grid gap-6">
            <div className="flex gap-4 items-start">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-600 text-white">
                <Smartphone className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Real-time Updates</h3>
                <p className="text-muted-foreground">
                  Receive instant notifications about schedule changes,
                  certification expirations, and assignment updates.
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-600 text-white">
                <Bell className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Alert Management</h3>
                <p className="text-muted-foreground">
                  Quickly respond to emergency situations with our integrated
                  alert system and communication tools.
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-600 text-white">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Mobile Time Clock</h3>
                <p className="text-muted-foreground">
                  Clock in and out directly from your mobile device with GPS
                  verification for accurate time tracking.
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-600 text-white">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Digital Inspections</h3>
                <p className="text-muted-foreground">
                  Complete fire watch inspection forms digitally, with photo
                  documentation and timestamp verification.
                </p>
              </div>
            </div>

            <AppGetOnMobileButtons />
          </div>
        </div>
      </div>
    </section>
  );
};
