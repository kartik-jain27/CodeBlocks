import Link from "next/link";

import { CategoryGrid } from "@/components/category-grid";
import { PageContainer } from "@/components/layout/page-container";
import { SiteFaq } from "@/components/marketing/site-faq";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import { ValueProps } from "@/components/marketing/value-props";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { blocksRegistry } from "@/lib/blocks-registry";

export default function LandingPage() {
  const freeBlockCount = blocksRegistry.filter((block) => !block.isPro).length;

  return (
    <>
      <SiteHeader showThemeToggle={false} />
      <PageContainer>
        <main className="flex min-w-0 flex-col gap-10">
          <section className="relative flex min-h-[620px] w-full min-w-0 flex-col items-center justify-center overflow-hidden rounded-[2rem] bg-surface px-6 py-24 text-center shadow-[var(--hero-shadow)] sm:px-8 lg:min-h-[640px]">
            <div className="relative z-10 flex w-full min-w-0 max-w-full flex-col items-center">
              <h1 className="hero-heading mx-auto max-w-[18ch] text-4xl font-bold leading-[1.04] tracking-normal text-foreground sm:max-w-none sm:text-5xl lg:text-[3.5rem]">
                <span className="text-muted-foreground">Build</span> products.{" "}
                <span className="text-muted-foreground">Not</span> repetitive UI.
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">
                Production-ready UI blocks for modern SaaS apps. Designed to help developers
                <br className="hidden sm:block" />
                <span className="sm:hidden"> </span>
                and founders launch polished products&mdash;faster.
              </p>

              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <Button
                  size="lg"
                  className="rounded-xl px-8"
                  asChild
                >
                  <Link href="/blocks">Browse blocks</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-xl px-8"
                  asChild
                >
                  <Link href="/pricing">View pricing</Link>
                </Button>
              </div>

              <div className="mt-9 flex w-full max-w-xl min-w-0 items-center gap-2 overflow-x-auto rounded-xl bg-surface px-5 py-3 font-mono text-xs text-muted-foreground shadow-[var(--neo-inset-sm)] sm:text-sm">
                <span className="select-none text-accent">$</span>
                <span className="whitespace-nowrap">
                  npx shadcn@latest add https://codeblocks.dev/r/hero-1
                </span>
              </div>

              <div className="mt-7 flex max-w-full flex-wrap items-center justify-center gap-x-3 gap-y-3 text-[11px] text-muted-foreground sm:gap-x-6 sm:text-xs">
                <span>{freeBlockCount} free blocks</span>
                <span className="h-1 w-1 rounded-full bg-muted-foreground/40 shadow-[var(--neo-flat)]" />
                <span>Next.js 15 ready</span>
                <span className="h-1 w-1 rounded-full bg-muted-foreground/40 shadow-[var(--neo-flat)]" />
                <span>TypeScript first</span>
              </div>
            </div>

            <div className="absolute bottom-7 left-1/2 z-20 -translate-x-1/2">
              <ThemeToggle />
            </div>
          </section>
          
          <ValueProps />

          <CategoryGrid />

          <SiteFaq />
        </main>
      </PageContainer>
      <SiteFooter />
    </>
  );
}
