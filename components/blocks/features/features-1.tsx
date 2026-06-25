import {
  Blocks,
  Braces,
  Gauge,
  LockKeyhole,
  Moon,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FeaturesOneProps {
  headline?: string;
  subheadline?: string;
}

interface FeatureItem {
  title: string;
  description: string;
  icon: LucideIcon;
}

const features: FeatureItem[] = [
  {
    title: "SaaS-first",
    description: "Blocks for onboarding, billing, settings, and dashboards.",
    icon: Blocks,
  },
  {
    title: "CLI-ready",
    description: "Every item ships through a shadcn-compatible registry.",
    icon: Braces,
  },
  {
    title: "Responsive",
    description: "Mobile-first sections that hold up inside real products.",
    icon: Gauge,
  },
  {
    title: "Dark mode",
    description: "Theme-aware styles built on shadcn CSS variables.",
    icon: Moon,
  },
  {
    title: "Pro gated",
    description: "Use registry tokens for paid blocks and lifetime access.",
    icon: LockKeyhole,
  },
  {
    title: "Polished",
    description: "Clean defaults with typed props and low-friction edits.",
    icon: Sparkles,
  },
];

export function FeaturesOne({
  headline = "Everything a SaaS interface needs.",
  subheadline = "CodeBlocks focuses on the product screens that usually slow teams down after the landing page is done.",
}: FeaturesOneProps) {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-normal sm:text-4xl">
            {headline}
          </h2>
          <p className="mt-4 text-base text-muted-foreground">{subheadline}</p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <Card key={feature.title}>
                <CardHeader>
                  <span className="flex size-10 items-center justify-center rounded-md bg-muted">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-6 text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
