import Image from "next/image"
import { Plug } from "lucide-react"

export function AppIntegrations() {
  return (
    <section id="integrations" className="w-full bg-muted py-12 md:py-24 lg:py-32">
      <div className="px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="inline-block bg-red-600 text-white text-sm rounded-lg px-3 py-1">Integrations</div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">Works Seamlessly with Your Existing Stack</h2>
          <p className="max-w-2xl text-muted-foreground md:text-xl">
            Redline connects to industry-leading platforms so you can keep the tools you love while centralising fire
            watch staffing operations.
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl gap-8 mt-12 lg:grid-cols-2">
          {/* Quicksuite */}
          <div className="flex flex-col gap-4 p-6 rounded-lg border bg-card shadow-sm">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-red-600 text-white">
                <Plug className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold">Quicksuite</h3>
            </div>
            <p className="text-muted-foreground">
              Sync employee records, certification status, and assignments between Quicksuite and Redline in
              real-time—no double data entry required.
            </p>
            <Image
              src="/placeholder.svg?height=220&width=400"
              width={400}
              height={220}
              alt="Quicksuite integration screenshot"
              className="rounded-md border"
            />
          </div>

          {/* Payroll */}
          <div className="flex flex-col gap-4 p-6 rounded-lg border bg-card shadow-sm">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-red-600 text-white">
                <Plug className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold">Payroll Platforms</h3>
            </div>
            <p className="text-muted-foreground">
              Push approved hours straight to payroll systems such as ADP, Paychex, and QuickBooks for faster,
              error-free payroll runs.
            </p>
            <Image
              src="/placeholder.svg?height=220&width=400"
              width={400}
              height={220}
              alt="Payroll integration screenshot"
              className="rounded-md border"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default AppIntegrations
