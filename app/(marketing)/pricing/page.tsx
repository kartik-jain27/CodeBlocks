import { Check, CreditCard } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import { PricingButton } from "@/components/pricing-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { pricingTiers } from "@/lib/polar";

export const metadata: Metadata = {
  title: "Pricing - CodeBlocks",
  description:
    "Start with free shadcn/ui blocks or unlock Pro and Team registry access through Polar checkout.",
};

export default function PricingPage() {
  const polarProductIds: Record<string, string | undefined> = {
    Pro: process.env.NEXT_PUBLIC_POLAR_PRO_PRODUCT_ID,
    Team: process.env.NEXT_PUBLIC_POLAR_TEAM_PRODUCT_ID,
  };

  return (
    <>
      <SiteHeader />
      <main className="bg-background">
        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="default" className="rounded-full text-accent">
                <CreditCard aria-hidden="true" className="mr-1 size-3.5" />
                One-time licenses
              </Badge>
              <h1 className="mt-5 text-5xl font-semibold tracking-normal sm:text-6xl">
                CodeBlocks pricing
              </h1>
              <p className="mt-5 text-base text-muted-foreground sm:text-lg">
                Start free, then unlock every pro block and future update when
                CodeBlocks becomes part of your product workflow.
              </p>
            </div>
            <div className="mt-12 grid gap-4 lg:grid-cols-3">
              {pricingTiers.map((tier) => (
                <Card
                  key={tier.name}
                  className={tier.featured ? "shadow-[var(--neo-raised-lg)]" : undefined}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between gap-4">
                      <CardTitle>{tier.name}</CardTitle>
                      {tier.featured ? <Badge variant="pro">Popular</Badge> : null}
                    </div>
                    <CardDescription>{tier.description}</CardDescription>
                  </CardHeader>
                  <CardContent className={tier.comingSoon ? "relative" : undefined}>
                    {tier.comingSoon ? (
                      <div className="absolute inset-0 z-10 flex items-center justify-center">
                        <span className="rounded-full bg-background/85 px-5 py-2 text-sm font-semibold shadow-[var(--neo-raised)]">
                          Coming soon
                        </span>
                      </div>
                    ) : null}
                    <div className={tier.comingSoon ? "blur-sm" : undefined}>
                      {tier.price ? (
                        <div className="text-4xl font-semibold">{tier.price}</div>
                      ) : null}
                      {tier.name === "Hobby" || tier.comingSoon ? (
                        <Button
                          asChild={!tier.comingSoon}
                          disabled={tier.comingSoon}
                          className="mt-6 w-full"
                          variant={tier.featured ? "default" : "outline"}
                        >
                          {tier.comingSoon ? (
                            tier.cta
                          ) : (
                            <Link href={tier.href}>{tier.cta}</Link>
                          )}
                        </Button>
                      ) : (
                        <PricingButton
                          productId={polarProductIds[tier.name]}
                          label={tier.cta}
                          featured={tier.featured}
                        />
                      )}
                      <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
                        {tier.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2">
                            <Check
                              aria-hidden="true"
                              className="size-4 text-foreground"
                            />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
