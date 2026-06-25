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
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle className="text-xl">{block.title}</CardTitle>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {block.description}
            </p>
          </div>
          <Badge variant={block.isPro ? "default" : "secondary"}>
            {block.isPro ? "Pro" : "Free"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <BlockVisual block={block} blurred={block.isPro} />
        <div className="mt-4 rounded-md border bg-muted/40 p-3 font-mono text-xs text-muted-foreground">
          {command}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {block.isPro ? (
            <Button asChild size="sm">
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
            <Link href={`/api/r/${block.name}`}>
              JSON
              <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
