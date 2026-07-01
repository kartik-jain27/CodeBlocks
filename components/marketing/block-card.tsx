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

  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-[var(--neo-raised-lg)]">
      <CardHeader>
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
      <CardContent>
        <BlockVisual block={block} blurred={block.isPro} />
        <div className="mt-4 overflow-x-auto rounded-xl bg-surface p-3 font-mono text-xs text-muted-foreground shadow-[var(--neo-inset-sm)]">
          {command}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button asChild size="sm">
            <Link href={`/blocks/${block.category}/${block.name}`}>
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
          <CopyCommandButton command={command} />
          <Button asChild variant="ghost" size="sm">
            <Link href={`/api/r/${block.isPro ? `pro/${block.name}` : block.name}`}>
              JSON
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
