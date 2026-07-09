import Link from "next/link";
import type { ReactNode } from "react";

import {
  blockCategories,
  getBlocksByCategory,
  type BlockCategory,
} from "@/lib/blocks-registry";

function HeroMockup() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-4">
      <div className="h-2 w-16 rounded-full bg-[var(--mockup-line-muted)]" />
      <div className="h-3 w-28 rounded-full bg-[var(--mockup-line)]" />
      <div className="h-2 w-20 rounded-full bg-[var(--mockup-line-muted)]" />
      <div className="mt-1 flex gap-2">
        <div className="h-6 w-12 rounded-md bg-[var(--mockup-line)]" />
        <div className="h-6 w-12 rounded-md bg-[var(--mockup-panel-strong)]" />
      </div>
    </div>
  );
}

function FeaturesMockup() {
  return (
    <div className="grid h-full w-full grid-cols-3 gap-1.5 p-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex flex-col items-center gap-1 rounded-md bg-[var(--mockup-panel)] p-2">
          <div className="h-3 w-3 rounded-full bg-[var(--mockup-line)]" />
          <div className="h-1.5 w-full rounded-full bg-[var(--mockup-line-muted)]" />
          <div className="h-1 w-3/4 rounded-full bg-[var(--mockup-panel-strong)]" />
        </div>
      ))}
    </div>
  );
}

function PricingMockup() {
  return (
    <div className="flex h-full w-full items-center justify-center gap-1.5 p-3">
      {[false, true, false].map((highlight, i) => (
        <div
          key={i}
          className={`flex flex-1 flex-col gap-1.5 rounded-lg border p-2 ${
            highlight
              ? "border-[var(--mockup-line-muted)] bg-[var(--mockup-panel-strong)]"
              : "border-[var(--category-card-border)] bg-[var(--mockup-panel)]"
          }`}
        >
          <div className="h-1.5 w-3/4 rounded-full bg-[var(--mockup-line)]" />
          <div className="h-4 w-full rounded-md bg-[var(--mockup-line)]" />
          <div className="h-1 w-full rounded-full bg-[var(--mockup-line-muted)]" />
          <div className="h-1 w-full rounded-full bg-[var(--mockup-line-muted)]" />
          <div className="h-1 w-2/3 rounded-full bg-[var(--mockup-line-muted)]" />
          <div className="mt-1 h-4 w-full rounded-md bg-[var(--mockup-line)]" />
        </div>
      ))}
    </div>
  );
}

function AuthMockup() {
  return (
    <div className="flex h-full w-full items-center justify-center p-3">
      <div className="flex w-3/4 flex-col gap-1.5">
        <div className="h-2 w-1/2 rounded-full bg-[var(--mockup-line)] mx-auto" />
        <div className="mt-1 h-5 w-full rounded-md bg-[var(--mockup-panel-strong)] border border-[var(--mockup-line-soft)]" />
        <div className="h-5 w-full rounded-md bg-[var(--mockup-panel-strong)] border border-[var(--mockup-line-soft)]" />
        <div className="h-5 w-full rounded-md bg-[var(--mockup-panel-strong)] border border-[var(--mockup-line-soft)]" />
        <div className="mt-1 h-5 w-full rounded-md bg-[var(--mockup-line)]" />
        <div className="flex items-center gap-1 mt-0.5">
          <div className="h-px flex-1 bg-[var(--mockup-panel-strong)]" />
          <div className="h-1.5 w-4 rounded-full bg-[var(--mockup-panel-strong)]" />
          <div className="h-px flex-1 bg-[var(--mockup-panel-strong)]" />
        </div>
        <div className="h-5 w-full rounded-md bg-[var(--mockup-panel-strong)] border border-[var(--mockup-line-soft)]" />
      </div>
    </div>
  );
}

function DashboardMockup() {
  return (
    <div className="flex h-full w-full flex-col gap-1.5 p-3">
      <div className="grid grid-cols-3 gap-1">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="rounded-md bg-[var(--mockup-panel-strong)] border border-[var(--mockup-line-soft)] p-1.5">
            <div className="h-1 w-2/3 rounded-full bg-[var(--mockup-line)]" />
            <div className="mt-1 h-3 w-full rounded-full bg-[var(--mockup-line)]" />
          </div>
        ))}
      </div>
      <div className="flex-1 rounded-md bg-[var(--mockup-panel-strong)] border border-[var(--mockup-line-soft)] p-2">
        <div className="flex h-full items-end gap-0.5">
          {[40, 65, 45, 80, 55, 70, 50, 85, 60, 75].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm bg-[var(--mockup-line)]"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function AppShellMockup() {
  return (
    <div className="flex h-full w-full overflow-hidden rounded-lg border border-[var(--category-card-border)] m-2">
      {/* Sidebar */}
      <div className="flex w-8 flex-col gap-1.5 border-r border-[var(--category-card-border)] bg-[var(--mockup-panel)] p-1.5">
        <div className="h-2 w-full rounded-sm bg-[var(--mockup-line-muted)]" />
        <div className="h-1.5 w-full rounded-sm bg-[var(--mockup-panel-strong)]" />
        <div className="h-1.5 w-full rounded-sm bg-[var(--mockup-panel-strong)]" />
        <div className="h-1.5 w-full rounded-sm bg-[var(--mockup-panel-strong)]" />
        <div className="h-1.5 w-3/4 rounded-sm bg-[var(--mockup-panel-strong)]" />
        <div className="h-1.5 w-3/4 rounded-sm bg-[var(--mockup-panel-strong)]" />
      </div>
      {/* Main */}
      <div className="flex flex-1 flex-col gap-1.5 bg-[var(--mockup-panel)] p-1.5">
        <div className="h-2 w-1/2 rounded-sm bg-[var(--mockup-line-muted)]" />
        <div className="grid grid-cols-2 gap-1">
          <div className="h-6 rounded-sm bg-[var(--mockup-panel-strong)]" />
          <div className="h-6 rounded-sm bg-[var(--mockup-panel-strong)]" />
          <div className="h-6 rounded-sm bg-[var(--mockup-panel-strong)]" />
          <div className="h-6 rounded-sm bg-[var(--mockup-panel-strong)]" />
        </div>
      </div>
    </div>
  );
}

function CtaMockup() {
  return (
    <div className="flex h-full w-full items-center justify-center p-3">
      <div className="flex w-full flex-col items-center gap-2 rounded-xl bg-[var(--mockup-panel-strong)] border border-[var(--mockup-line-soft)] py-4 px-3">
        <div className="h-2 w-20 rounded-full bg-[var(--mockup-line)]" />
        <div className="h-1.5 w-28 rounded-full bg-[var(--mockup-line-muted)]" />
        <div className="mt-1 flex gap-2">
          <div className="h-5 w-14 rounded-md bg-[var(--mockup-line)]" />
          <div className="h-5 w-14 rounded-md bg-[var(--mockup-line-muted)] border border-[var(--mockup-line-muted)]" />
        </div>
      </div>
    </div>
  );
}

const mockups: Record<BlockCategory, ReactNode> = {
  hero: <HeroMockup />,
  features: <FeaturesMockup />,
  pricing: <PricingMockup />,
  auth: <AuthMockup />,
  dashboard: <DashboardMockup />,
  "app-shell": <AppShellMockup />,
  cta: <CtaMockup />,
};

const categoryNames: Partial<Record<BlockCategory, string>> = {
  hero: "Hero Sections",
  cta: "Call to Action",
};

const categories = blockCategories.map((category) => {
  const blocks = getBlocksByCategory(category.slug);

  return {
    slug: category.slug,
    name: categoryNames[category.slug] ?? category.label,
    count: blocks.length,
    free: blocks.filter((block) => !block.isPro).length,
    mockup: mockups[category.slug],
  };
});

export function CategoryGrid() {
  return (
    <section className="py-12">
      {/* Header row */}
      <div className="mb-7 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">
          Browse by category
        </h2>
        <Link
          href="/blocks"
          className="text-sm text-muted-foreground transition-colors hover:text-accent"
        >
          View all →
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/blocks/${cat.slug}`}
            className="group relative overflow-hidden rounded-2xl bg-[var(--category-card)] shadow-[var(--category-shadow)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--category-shadow-hover)]"
          >
            <div className="relative h-32 w-full overflow-hidden bg-[var(--category-preview)]">
              {cat.mockup}
            </div>

            <div className="px-4 py-2.5 shadow-[var(--neo-inset-sm)]">
              <p className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors">
                {cat.name}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {cat.count} blocks
                {cat.free > 0 && (
                  <span className="ml-1 text-muted-foreground">
                    (+ {cat.free} Free)
                  </span>
                )}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
