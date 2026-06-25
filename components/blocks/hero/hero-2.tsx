import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface HeroTwoProps {
  eyebrow?: string;
  headline?: string;
  subheadline?: string;
  primaryCta?: string;
  secondaryCta?: string;
}

const previewRows = [
  "Onboarding checklist",
  "Billing upgrade prompt",
  "Usage limits banner",
  "Settings shell",
];

export function HeroTwo({
  eyebrow = "SaaS blocks for shadcn/ui",
  headline = "Launch the screens every SaaS needs first.",
  subheadline = "CodeBlocks gives you polished sections for onboarding, pricing, auth, dashboards, and app shells without starting from a blank file.",
  primaryCta = "Start building",
  secondaryCta = "Explore library",
}: HeroTwoProps) {
  return (
    <section className="overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <Badge variant="secondary" className="mb-5 rounded-full px-3 py-1">
            <Sparkles aria-hidden="true" className="mr-1 size-3.5" />
            {eyebrow}
          </Badge>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-normal text-foreground sm:text-5xl">
            {headline}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            {subheadline}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg">
              {primaryCta}
              <ArrowRight aria-hidden="true" />
            </Button>
            <Button variant="outline" size="lg">
              {secondaryCta}
            </Button>
          </div>
          <div className="mt-8 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
            {["CLI install", "Dark mode", "Responsive", "Typed props"].map(
              (item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 aria-hidden="true" className="size-4 text-foreground" />
                  <span>{item}</span>
                </div>
              ),
            )}
          </div>
        </div>
        <Card className="relative overflow-hidden rounded-lg p-4 shadow-xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)/0.14),transparent_32%)]" />
          <div className="relative rounded-md border bg-background p-4">
            <div className="mb-4 flex items-center justify-between border-b pb-3">
              <div>
                <div className="h-3 w-28 rounded bg-foreground/90" />
                <div className="mt-2 h-2 w-40 rounded bg-muted" />
              </div>
              <Button size="sm">Publish</Button>
            </div>
            <div className="grid gap-3 sm:grid-cols-[0.7fr_1fr]">
              <div className="rounded-md border bg-muted/40 p-3">
                <div className="h-3 w-20 rounded bg-foreground/80" />
                <div className="mt-4 space-y-2">
                  {previewRows.map((row) => (
                    <div
                      key={row}
                      className="flex items-center justify-between rounded-md bg-background px-3 py-2 text-xs text-muted-foreground"
                    >
                      <span>{row}</span>
                      <span className="h-2 w-2 rounded-full bg-primary" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-md border bg-background p-3">
                <div className="grid gap-2 sm:grid-cols-2">
                  {["Hero", "Pricing", "Auth", "Dashboard"].map((item) => (
                    <div key={item} className="rounded-md border p-3">
                      <div className="h-2 w-16 rounded bg-muted-foreground/40" />
                      <div className="mt-8 h-16 rounded bg-muted" />
                      <div className="mt-3 h-2 w-20 rounded bg-muted" />
                      <span className="sr-only">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
