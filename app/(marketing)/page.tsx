import { ArrowRight, Github, Package, Users } from "lucide-react";
import Link from "next/link";

import { HeroOne } from "@/components/blocks/hero/hero-1";
import { PricingOne } from "@/components/blocks/pricing/pricing-1";
import { BlockVisual } from "@/components/marketing/block-visual";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { blocksRegistry } from "@/lib/blocks-registry";

const stats = [
  { label: "blocks at V1", value: `${blocksRegistry.length}`, icon: Package },
  { label: "developers roadmap", value: "1,000+", icon: Users },
  { label: "GitHub stars goal", value: "500", icon: Github },
];

const faqs = [
  {
    question: "What is CodeBlocks?",
    answer:
      "CodeBlocks is a shadcn/ui block library focused on SaaS landing pages, auth flows, dashboards, pricing sections, and app shells.",
  },
  {
    question: "How do installs work?",
    answer:
      "Free blocks install from public registry endpoints. Pro blocks use a registry token tied to your paid account.",
  },
  {
    question: "Is the license one-time?",
    answer:
      "Yes. Pro and Team are one-time purchases through Polar with lifetime updates for the block library.",
  },
  {
    question: "Can I use the blocks in client work?",
    answer:
      "Yes. The Pro and Team licenses include commercial use for your products and client projects.",
  },
];

export default function LandingPage() {
  const previewBlocks = blocksRegistry.slice(0, 8);

  return (
    <>
      <SiteHeader />
      <main>
        <HeroOne />
        <section className="border-y bg-muted/30 px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-3">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div key={stat.label} className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-md bg-background">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <div>
                    <div className="text-2xl font-semibold">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <div className="max-w-2xl">
                <Badge variant="secondary">Block previews</Badge>
                <h2 className="mt-4 text-3xl font-semibold tracking-normal sm:text-4xl">
                  Start with the screens that convert.
                </h2>
                <p className="mt-4 text-base text-muted-foreground">
                  Hero sections, pricing tables, auth cards, dashboards, and pro app
                  shells are ready for CLI installs.
                </p>
              </div>
              <Button asChild variant="outline">
                <Link href="/blocks">
                  View all blocks
                  <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {previewBlocks.map((block) => (
                <div key={block.name} className="rounded-lg border bg-card p-3">
                  <BlockVisual block={block} blurred={block.isPro} />
                  <div className="mt-3 flex items-center justify-between gap-2">
                    <span className="text-sm font-medium">{block.name}</span>
                    <Badge variant={block.isPro ? "default" : "secondary"}>
                      {block.isPro ? "Pro" : "Free"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <PricingOne />
        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="max-w-2xl">
              <Badge variant="secondary">FAQ</Badge>
              <h2 className="mt-4 text-3xl font-semibold tracking-normal sm:text-4xl">
                Clear answers before checkout.
              </h2>
            </div>
            <div className="mt-8 divide-y rounded-lg border">
              {faqs.map((faq) => (
                <details key={faq.question} className="group p-5">
                  <summary className="cursor-pointer list-none text-base font-medium">
                    <span className="flex items-center justify-between gap-4">
                      {faq.question}
                      <span className="text-muted-foreground group-open:rotate-45">
                        +
                      </span>
                    </span>
                  </summary>
                  <p className="mt-4 text-sm leading-6 text-muted-foreground">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
