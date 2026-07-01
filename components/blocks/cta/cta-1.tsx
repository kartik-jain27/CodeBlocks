import { ArrowRight, Mail } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface CtaOneProps {
  badge?: string;
  headline?: string;
  subheadline?: string;
}

export function CtaOne({
  badge = "Pro block",
  headline = "Give your SaaS a better upgrade moment.",
  subheadline = "Capture intent, invite the right users, and move them toward the plan that fits their workflow.",
}: CtaOneProps) {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-8 rounded-lg border border-border-muted bg-surface p-6 sm:p-8 lg:grid-cols-[0.9fr_1fr] lg:p-10">
        <div>
          <Badge variant="pro" className="rounded-full">
            {badge}
          </Badge>
          <h2 className="mt-5 max-w-2xl text-3xl font-semibold tracking-normal sm:text-4xl">
            {headline}
          </h2>
          <p className="mt-4 max-w-xl text-base text-muted-foreground">
            {subheadline}
          </p>
        </div>
        <form className="flex flex-col justify-center gap-3 sm:flex-row lg:self-end">
          <div className="relative flex-1">
            <Mail
              aria-hidden="true"
              className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              type="email"
              placeholder="team@example.com"
              className="h-12 pl-9"
            />
          </div>
          <Button type="submit" size="lg" className="h-12">
            Request access
            <ArrowRight aria-hidden="true" />
          </Button>
        </form>
      </div>
    </section>
  );
}
