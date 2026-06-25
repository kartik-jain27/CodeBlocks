import { notFound } from "next/navigation";

import { BlockCard } from "@/components/marketing/block-card";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import { Badge } from "@/components/ui/badge";
import {
  blockCategories,
  getBlocksByCategory,
  getCategory,
  type BlockCategory,
} from "@/lib/blocks-registry";

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export function generateStaticParams() {
  return blockCategories.map((category) => ({
    category: category.slug,
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const config = getCategory(category);

  if (!config) {
    notFound();
  }

  const blocks = getBlocksByCategory(config.slug as BlockCategory);

  return (
    <>
      <SiteHeader />
      <main>
        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <Badge variant="secondary">{config.label}</Badge>
              <h1 className="mt-5 text-4xl font-semibold tracking-normal sm:text-5xl">
                {config.label} blocks
              </h1>
              <p className="mt-5 text-base leading-7 text-muted-foreground sm:text-lg">
                {config.description}
              </p>
            </div>
            <div className="mt-10 grid gap-5 lg:grid-cols-2">
              {blocks.map((block) => (
                <BlockCard key={block.name} block={block} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
