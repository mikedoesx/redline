import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import {
  CheckCircle2,
  ArrowRight,
  Twitter,
  Linkedin,
  Github,
  Facebook,
  Flame,
  Clock,
  Users2,
  Shield,
  Calendar,
  Smartphone,
  Bell,
} from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="h-6 w-6 text-red-600" />
            <span className="text-xl font-bold">Redline</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-red-600">
              Features
            </Link>
            <Link href="#testimonials" className="text-sm font-medium hover:text-red-600">
              Testimonials
            </Link>
            <Link href="#mobile" className="text-sm font-medium hover:text-red-600">
              Mobile App
            </Link>
            <Link href="#contact" className="text-sm font-medium hover:text-red-600">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button className="bg-red-600 hover:bg-red-700">Get Started</Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section with Login */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_450px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Fire Watch Staffing Made Simple
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    The specialized platform that helps you recruit, deploy, and manage fire watch personnel with
                    confidence and compliance.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" className="gap-1 bg-red-600 hover:bg-red-700">
                    Request Demo <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-red-600 text-red-600 hover:bg-red-50 bg-transparent"
                  >
                    Learn More
                  </Button>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <div className="flex items-center">
                    <Image
                      src="/placeholder.svg?height=40&width=120"
                      width={120}
                      height={40}
                      alt="App Store"
                      className="h-10"
                    />
                  </div>
                  <div className="flex items-center">
                    <Image
                      src="/placeholder.svg?height=40&width=135"
                      width={135}
                      height={40}
                      alt="Google Play"
                      className="h-10"
                    />
                  </div>
                </div>
              </div>

              {/* Login Card */}
              <Card className="p-6 shadow-lg border-0">
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
                      <Input id="email" type="email" placeholder="name@company.com" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <label htmlFor="password" className="text-sm font-medium">
                          Password
                        </label>
                        <Link href="#" className="text-xs text-red-600 hover:underline">
                          Forgot password?
                        </Link>
                      </div>
                      <Input id="password" type="password" placeholder="••••••••" />
                    </div>
                    <Button className="w-full bg-red-600 hover:bg-red-700">Sign In</Button>
                  </div>
                  <div className="text-center text-sm">
                    <span className="text-muted-foreground">Don't have an account? </span>
                    <Link href="#" className="text-red-600 hover:underline">
                      Contact sales
                    </Link>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-red-600 px-3 py-1 text-sm text-white">Features</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Specialized for Fire Watch Management
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  Our platform provides all the tools you need to manage fire watch personnel efficiently, ensuring
                  safety compliance and operational excellence.
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
                      Automatically track and manage fire safety certifications, ensuring all personnel are compliant
                      with regulations.
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
                      Create and manage complex 24/7 fire watch schedules with ease, ensuring proper coverage at all
                      times.
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
                      Comprehensive tools for recruiting, vetting, and managing qualified fire watch personnel.
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
                      Track time on site with GPS verification, ensuring accountability and accurate billing for fire
                      watch services.
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

        {/* Mobile App Section */}
        <section id="mobile" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-red-600 px-3 py-1 text-sm text-white">Mobile App</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Manage Fire Watch On The Go</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  Access all Redline features from anywhere with our powerful mobile application, available for iOS and
                  Android.
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
                      Receive instant notifications about schedule changes, certification expirations, and assignment
                      updates.
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
                      Quickly respond to emergency situations with our integrated alert system and communication tools.
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
                      Clock in and out directly from your mobile device with GPS verification for accurate time
                      tracking.
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
                      Complete fire watch inspection forms digitally, with photo documentation and timestamp
                      verification.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                  <Image
                    src="/placeholder.svg?height=40&width=120"
                    width={120}
                    height={40}
                    alt="App Store"
                    className="h-10"
                  />
                  <Image
                    src="/placeholder.svg?height=40&width=135"
                    width={135}
                    height={40}
                    alt="Google Play"
                    className="h-10"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-red-600 px-3 py-1 text-sm text-white">Testimonials</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Trusted by safety professionals</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  See what our customers have to say about how Redline has transformed their fire watch operations.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <div className="flex flex-col gap-4">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <CheckCircle2 key={i} className="h-5 w-5 fill-red-600 text-white" />
                    ))}
                  </div>
                  <p className="text-muted-foreground">
                    "Redline has completely transformed how we manage our fire watch teams. Compliance tracking alone
                    has saved us countless hours and potential liability issues."
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-muted h-10 w-10"></div>
                    <div>
                      <p className="font-medium">Robert Martinez</p>
                      <p className="text-sm text-muted-foreground">Safety Director, Construction Corp</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <div className="flex flex-col gap-4">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <CheckCircle2 key={i} className="h-5 w-5 fill-red-600 text-white" />
                    ))}
                  </div>
                  <p className="text-muted-foreground">
                    "The scheduling features have eliminated double-bookings and gaps in coverage. We can now
                    confidently provide 24/7 fire watch services to our clients."
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-muted h-10 w-10"></div>
                    <div>
                      <p className="font-medium">Jennifer Wilson</p>
                      <p className="text-sm text-muted-foreground">Operations Manager, FireGuard Services</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <div className="flex flex-col gap-4">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <CheckCircle2 key={i} className="h-5 w-5 fill-red-600 text-white" />
                    ))}
                  </div>
                  <p className="text-muted-foreground">
                    "As a fire safety consultant, I recommend Redline to all my clients. The certification tracking
                    alone ensures they stay compliant with regulations."
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-muted h-10 w-10"></div>
                    <div>
                      <p className="font-medium">David Thompson</p>
                      <p className="text-sm text-muted-foreground">Fire Safety Consultant, SafetyFirst</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section id="cta" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Ready to transform your fire watch operations?
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Join safety-conscious organizations already using Redline to improve compliance, efficiency, and
                  safety in their fire watch operations.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" className="gap-1 bg-red-600 hover:bg-red-700">
                  Request a demo <ArrowRight className="h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-red-600 text-red-600 hover:bg-red-50 bg-transparent"
                >
                  Contact sales
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t bg-background py-6 md:py-12">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Flame className="h-6 w-6 text-red-600" />
                <span className="text-xl font-bold">Redline</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Specialized employment management for fire watch staffing, ensuring safety and compliance.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Product</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Mobile App
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Integrations
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Compliance
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Fire Safety Guides
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Support
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Certification Resources
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Redline. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
