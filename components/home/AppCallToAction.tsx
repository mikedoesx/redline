import { ArrowRight } from "lucide-react";
import { Button } from "@radix-ui/themes";

export const AppCallToAction = () => {
  return (
    <section id="cta" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              Ready to transform your fire watch operations?
            </h2>
            <p className="max-w-[600px] mx-auto text-muted-foreground md:text-xl">
              Join safety-conscious organizations already using Redline to
              improve compliance, efficiency, and safety in their fire watch
              operations.
            </p>
          </div>

          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Button size="3">
              Request a demo <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="3" variant="outline">
              Contact sales
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
