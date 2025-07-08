import { CheckCircle2 } from "lucide-react";

export const AppTestimonials = () => {
  return (
    <section
      id="testimonials"
      className="w-full py-12 md:py-24 lg:py-32 bg-muted"
    >
      <div className="px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              Trusted by safety professionals
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl">
              See what our customers have to say about how Redline has
              transformed their fire watch operations.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="flex flex-col gap-4">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <CheckCircle2
                    key={i}
                    className="h-5 w-5 fill-red-600 text-white"
                  />
                ))}
              </div>
              <p className="text-muted-foreground">
                "Redline has completely transformed how we manage our fire watch
                teams. Compliance tracking alone has saved us countless hours
                and potential liability issues."
              </p>
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-muted h-10 w-10"></div>
                <div>
                  <p className="font-medium">Robert Martinez</p>
                  <p className="text-sm text-muted-foreground">
                    Safety Director, Construction Corp
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="flex flex-col gap-4">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <CheckCircle2
                    key={i}
                    className="h-5 w-5 fill-red-600 text-white"
                  />
                ))}
              </div>
              <p className="text-muted-foreground">
                "The scheduling features have eliminated double-bookings and
                gaps in coverage. We can now confidently provide 24/7 fire watch
                services to our clients."
              </p>
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-muted h-10 w-10"></div>
                <div>
                  <p className="font-medium">Jennifer Wilson</p>
                  <p className="text-sm text-muted-foreground">
                    Operations Manager, FireGuard Services
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="flex flex-col gap-4">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <CheckCircle2
                    key={i}
                    className="h-5 w-5 fill-red-600 text-white"
                  />
                ))}
              </div>
              <p className="text-muted-foreground">
                "As a fire safety consultant, I recommend Redline to all my
                clients. The certification tracking alone ensures they stay
                compliant with regulations."
              </p>
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-muted h-10 w-10"></div>
                <div>
                  <p className="font-medium">David Thompson</p>
                  <p className="text-sm text-muted-foreground">
                    Fire Safety Consultant, SafetyFirst
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
