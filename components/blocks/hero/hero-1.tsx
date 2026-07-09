import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface HeroOneProps {
  badge?: string;
  headline?: string;
  subheadline?: string;
  primaryCta?: string;
  secondaryCta?: string;
}

export function HeroOne({
  badge = "New launch",
  headline = "Launch the screens your SaaS needs first.",
  subheadline = "A focused hero section with clear positioning, polished actions, and responsive spacing ready for your next product page.",
  primaryCta = "Start building",
  secondaryCta = "View demo",
}: HeroOneProps) {
  return (
    <section className="relative flex min-h-[600px] flex-col items-center justify-center overflow-hidden px-4 py-24 text-center">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.12),transparent_35%),linear-gradient(to_bottom,hsl(var(--background)),hsl(var(--muted)/0.4))]" />
      <div className="absolute inset-x-8 top-20 -z-10 h-40 rounded-full bg-primary/10 blur-3xl" />
      <Badge variant="outline" className="mb-6 rounded-full px-4 py-1.5 text-sm">
        {badge}
      </Badge>
      <h1 className="mx-auto max-w-3xl text-4xl font-semibold tracking-normal text-foreground sm:text-5xl lg:text-6xl">
        {headline}
      </h1>
      <p className="mx-auto mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
        {subheadline}
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Button size="lg" className="rounded-full px-8">
          {primaryCta}
          <ArrowRight aria-hidden="true" />
        </Button>
        <Button variant="outline" size="lg" className="rounded-full px-8">
          {secondaryCta}
        </Button>
      </div>
    </section>
  );
}
