import Link from "next/link";

import { CategoryGrid } from "@/components/category-grid";
import { PageContainer } from "@/components/layout/page-container";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <>
      <SiteHeader showThemeToggle={false} />
      <PageContainer>
        <main className="flex min-w-0 flex-col gap-10">
          <section className="relative flex min-h-[620px] w-full min-w-0 flex-col items-center justify-center overflow-hidden rounded-[2rem] bg-surface px-6 py-24 text-center shadow-[var(--hero-shadow)] sm:px-8 lg:min-h-[640px]">
            <div className="relative z-10 flex w-full min-w-0 max-w-full flex-col items-center">
              <h1 className="hero-heading mx-auto max-w-4xl text-foreground">
                <span className="mx-auto block max-w-[13ch] text-2xl font-bold leading-[1.08] tracking-normal sm:max-w-none sm:text-3xl lg:text-[2rem]">
                  <span className="text-muted-foreground">Production-ready</span>{" "}
                  shadcn/ui{" "}
                  <span className="text-muted-foreground">Blocks</span>
                </span>
                <span className="mt-2 block text-3xl font-bold leading-[1.05] tracking-normal sm:text-5xl lg:text-6xl">
                  <span className="text-muted-foreground">for</span> Busy{" "}
                  <span className="text-muted-foreground">&amp;</span> Smart{" "}
                  <span className="text-muted-foreground">devs</span>
                </span>
              </h1>

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
                <span>40+ free blocks</span>
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
          
          <CategoryGrid />
          
        </main>
        <div className="overflow-hidden rounded-[2rem] bg-surface shadow-[var(--neo-raised-lg)]">
          <SiteFooter />
        </div>
      </PageContainer>
    </>
  );
}
