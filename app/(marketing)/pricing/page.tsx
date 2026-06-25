import { Check, CreditCard } from "lucide-react";
import Link from "next/link";

import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
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

export default function PricingPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="secondary">
                <CreditCard aria-hidden="true" className="mr-1 size-3.5" />
                One-time licenses
              </Badge>
              <h1 className="mt-5 text-4xl font-semibold tracking-normal sm:text-5xl">
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
                  className={tier.featured ? "border-primary shadow-lg" : undefined}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between gap-4">
                      <CardTitle>{tier.name}</CardTitle>
                      {tier.featured ? <Badge>Popular</Badge> : null}
                    </div>
                    <CardDescription>{tier.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-semibold">{tier.price}</div>
                    <Button
                      asChild
                      className="mt-6 w-full"
                      variant={tier.featured ? "default" : "outline"}
                    >
                      <Link href={tier.href}>{tier.cta}</Link>
                    </Button>
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
