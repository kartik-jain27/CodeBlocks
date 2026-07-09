"use client";

import { Check, Crown, Users } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface PricingOneProps {
  headline?: string;
  subheadline?: string;
}

const plans = [
  {
    name: "Hobby",
    monthly: "$0",
    annual: "$0",
    description: "Free blocks for side projects and prototypes.",
    icon: Users,
    features: ["Core components", "Responsive sections", "Community updates"],
    featured: false,
  },
  {
    name: "Pro",
    monthly: "$97",
    annual: "$97",
    description: "Lifetime access for builders shipping commercial SaaS.",
    icon: Crown,
    features: ["Advanced sections", "Lifetime updates", "Commercial license"],
    featured: true,
  },
  {
    name: "Team",
    monthly: "$297",
    annual: "$297",
    description: "A shared license for small product teams.",
    icon: Users,
    features: ["Shared workspace", "Reusable patterns", "Priority support"],
    featured: false,
  },
];

export function PricingOne({
  headline = "Simple pricing for serious shipping.",
  subheadline = "Start free, unlock every pro block once, and keep the updates.",
}: PricingOneProps) {
  const [billing, setBilling] = useState<"monthly" | "annual">("annual");

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-normal sm:text-4xl">
            {headline}
          </h2>
          <p className="mt-4 text-base text-muted-foreground">{subheadline}</p>
          <div className="mt-8 inline-flex rounded-lg border bg-muted p-1">
            {(["monthly", "annual"] as const).map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setBilling(value)}
                className={`rounded-md px-4 py-2 text-sm font-medium capitalize transition ${
                  billing === value
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground"
                }`}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {plans.map((plan) => {
            const Icon = plan.icon;

            return (
              <Card
                key={plan.name}
                className={plan.featured ? "border-primary shadow-lg" : undefined}
              >
                <CardHeader>
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="flex size-10 items-center justify-center rounded-md bg-muted">
                        <Icon aria-hidden="true" className="size-5" />
                      </span>
                      <CardTitle className="text-xl">{plan.name}</CardTitle>
                    </div>
                    {plan.featured ? <Badge>Best value</Badge> : null}
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-semibold">
                      {billing === "annual" ? plan.annual : plan.monthly}
                    </span>
                    <span className="pb-1 text-sm text-muted-foreground">
                      one-time
                    </span>
                  </div>
                  <Button
                    className="mt-6 w-full"
                    variant={plan.featured ? "default" : "outline"}
                  >
                    Choose {plan.name}
                  </Button>
                  <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <Check aria-hidden="true" className="size-4 text-foreground" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
