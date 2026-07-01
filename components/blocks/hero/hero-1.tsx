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
  badge = "New in CodeBlocks",
  headline = "Production-ready shadcn blocks. One-time payment.",
  subheadline = "Browse polished SaaS sections, install them with the shadcn CLI, and ship the product screens your customers actually touch.",
  primaryCta = "Browse blocks",
  secondaryCta = "View pricing",
}: HeroOneProps) {
  return (
    <section className="relative flex min-h-[720px] flex-col items-center justify-center overflow-hidden px-4 py-28 text-center">
      <div className="absolute left-1/2 top-24 -z-10 h-[600px] w-[600px] -translate-x-1/2 bg-[radial-gradient(circle,var(--accent-glow)_0%,transparent_70%)]" />
      <Badge
        variant="default"
        className="mb-6 rounded-full px-4 py-1.5 text-sm text-accent"
      >
        {badge}
      </Badge>
      <h1 className="mx-auto max-w-4xl text-5xl font-semibold tracking-normal text-foreground sm:text-6xl lg:text-7xl">
        {headline}
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
        {subheadline}
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Button size="lg" className="px-8">
          {primaryCta}
          <ArrowRight aria-hidden="true" />
        </Button>
        <Button variant="outline" size="lg" className="px-8">
          {secondaryCta}
        </Button>
      </div>
    </section>
  );
}
