import { ArrowRight, LockKeyhole } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getInstallCommand, type BlockRegistryItem } from "@/lib/blocks-registry";

import { BlockVisual } from "./block-visual";
import { CopyCommandButton } from "./copy-command-button";

interface BlockCardProps {
  block: BlockRegistryItem;
}

export function BlockCard({ block }: BlockCardProps) {
  const command = getInstallCommand(block);
  const blockHref = `/blocks/${block.category}/${block.name}`;

  return (
    <Card className="group relative overflow-hidden transition-all duration-200 hover:shadow-[var(--neo-raised-lg)]">
      <Link
        aria-label={`View ${block.title}`}
        className="absolute inset-0 z-10 rounded-2xl"
        href={blockHref}
      />
      <CardHeader className="relative z-20 pointer-events-none">
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle className="text-xl">{block.title}</CardTitle>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {block.description}
            </p>
          </div>
          <Badge variant={block.isPro ? "pro" : "success"}>
            {block.isPro ? "Pro" : "Free"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="relative z-20 pointer-events-none">
        <BlockVisual block={block} blurred={block.isPro} />
        <div className="mt-4 overflow-x-auto rounded-xl bg-surface p-3 font-mono text-xs text-muted-foreground shadow-[var(--neo-inset-sm)]">
          {command}
        </div>
        <div className="relative z-30 mt-4 flex flex-wrap gap-2 pointer-events-auto">
          <Button asChild size="sm">
            <Link href={blockHref}>
              View block
              <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
          {block.isPro ? (
            <Button asChild size="sm" variant="outline">
              <Link href="/pricing">
                <LockKeyhole aria-hidden="true" />
                Unlock Pro
              </Link>
            </Button>
          ) : (
            <CopyCommandButton command={command} label="Add to project" />
          )}
          <Button asChild variant="ghost" size="sm">
            <Link href={`/r/${block.isPro ? `pro/${block.name}` : block.name}`}>
              JSON
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
