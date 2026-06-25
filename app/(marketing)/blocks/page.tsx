import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { BlockVisual } from "@/components/marketing/block-visual";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  blockCategories,
  blocksRegistry,
  getBlocksByCategory,
} from "@/lib/blocks-registry";

export default function BlocksPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <Badge variant="secondary">Registry</Badge>
              <h1 className="mt-5 text-4xl font-semibold tracking-normal sm:text-5xl">
                Browse CodeBlocks by category.
              </h1>
              <p className="mt-5 text-base leading-7 text-muted-foreground sm:text-lg">
                Free blocks install from public registry endpoints. Pro blocks unlock
                with a paid registry token.
              </p>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {blockCategories.map((category) => {
                const blocks = getBlocksByCategory(category.slug);
                const firstBlock = blocks[0] ?? blocksRegistry[0];

                return (
                  <Card key={category.slug}>
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <CardTitle>{category.label}</CardTitle>
                          <p className="mt-2 text-sm leading-6 text-muted-foreground">
                            {category.description}
                          </p>
                        </div>
                        <Badge variant="outline">{blocks.length}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <BlockVisual block={firstBlock} blurred={firstBlock.isPro} />
                      <Button asChild className="mt-4 w-full" variant="outline">
                        <Link href={`/blocks/${category.slug}`}>
                          View {category.label}
                          <ArrowRight aria-hidden="true" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
