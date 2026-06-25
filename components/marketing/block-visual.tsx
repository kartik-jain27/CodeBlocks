import { LockKeyhole } from "lucide-react";

import type { BlockRegistryItem } from "@/lib/blocks-registry";

interface BlockVisualProps {
  block: BlockRegistryItem;
  blurred?: boolean;
}

export function BlockVisual({ block, blurred = false }: BlockVisualProps) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-md border bg-background">
      <div className={blurred ? "h-full blur-sm" : "h-full"}>
        {renderVisual(block)}
      </div>
      {blurred ? (
        <div className="absolute inset-0 flex items-center justify-center bg-background/55">
          <span className="flex items-center gap-2 rounded-md border bg-background px-3 py-2 text-sm font-medium shadow-sm">
            <LockKeyhole aria-hidden="true" className="size-4" />
            Unlock Pro
          </span>
        </div>
      ) : null}
    </div>
  );
}

function renderVisual(block: BlockRegistryItem) {
  switch (block.name) {
    case "hero-1":
      return (
        <div className="flex h-full flex-col items-center justify-center bg-muted/30 p-6 text-center">
          <div className="h-5 w-28 rounded-full border bg-background" />
          <div className="mt-5 h-5 w-64 max-w-full rounded bg-foreground/90" />
          <div className="mt-3 h-4 w-48 max-w-full rounded bg-muted-foreground/25" />
          <div className="mt-6 flex gap-2">
            <div className="h-9 w-24 rounded-md bg-primary" />
            <div className="h-9 w-24 rounded-md border bg-background" />
          </div>
        </div>
      );
    case "hero-2":
      return (
        <div className="grid h-full grid-cols-[0.85fr_1fr] gap-4 p-5">
          <div className="flex flex-col justify-center">
            <div className="h-4 w-24 rounded bg-muted" />
            <div className="mt-4 h-5 w-40 rounded bg-foreground/90" />
            <div className="mt-2 h-5 w-28 rounded bg-foreground/90" />
            <div className="mt-5 h-8 w-24 rounded-md bg-primary" />
          </div>
          <div className="rounded-md border bg-muted/40 p-3">
            <div className="h-3 w-20 rounded bg-foreground/80" />
            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="h-14 rounded bg-background" />
              <div className="h-14 rounded bg-background" />
              <div className="h-14 rounded bg-background" />
              <div className="h-14 rounded bg-background" />
            </div>
          </div>
        </div>
      );
    case "pricing-1":
      return (
        <div className="grid h-full grid-cols-3 gap-3 p-4">
          {[0, 1, 2].map((item) => (
            <div
              key={item}
              className={`rounded-md border p-3 ${item === 1 ? "border-primary bg-muted/40" : ""}`}
            >
              <div className="h-3 w-14 rounded bg-foreground/70" />
              <div className="mt-5 h-6 w-16 rounded bg-foreground/90" />
              <div className="mt-4 h-8 rounded-md bg-primary/80" />
              <div className="mt-4 space-y-2">
                <div className="h-2 rounded bg-muted" />
                <div className="h-2 rounded bg-muted" />
                <div className="h-2 rounded bg-muted" />
              </div>
            </div>
          ))}
        </div>
      );
    case "auth-1":
      return (
        <div className="flex h-full items-center justify-center bg-muted/30 p-5">
          <div className="w-52 rounded-md border bg-background p-4">
            <div className="mx-auto h-4 w-24 rounded bg-foreground/80" />
            <div className="mt-5 grid grid-cols-2 gap-2">
              <div className="h-8 rounded-md border" />
              <div className="h-8 rounded-md border" />
            </div>
            <div className="mt-4 h-8 rounded-md border" />
            <div className="mt-2 h-8 rounded-md border" />
            <div className="mt-3 h-8 rounded-md bg-primary" />
          </div>
        </div>
      );
    case "features-1":
      return (
        <div className="grid h-full grid-cols-3 gap-3 p-4">
          {[0, 1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="rounded-md border p-3">
              <div className="size-8 rounded-md bg-muted" />
              <div className="mt-6 h-3 rounded bg-foreground/75" />
              <div className="mt-2 h-2 rounded bg-muted" />
            </div>
          ))}
        </div>
      );
    case "cta-1":
      return (
        <div className="flex h-full items-center p-5">
          <div className="grid w-full grid-cols-[1fr_0.8fr] gap-5 rounded-md border bg-muted/40 p-5">
            <div>
              <div className="h-4 w-20 rounded-full border bg-background" />
              <div className="mt-5 h-5 w-40 rounded bg-foreground/90" />
              <div className="mt-2 h-5 w-28 rounded bg-foreground/90" />
            </div>
            <div className="flex items-end gap-2">
              <div className="h-10 flex-1 rounded-md border bg-background" />
              <div className="h-10 w-20 rounded-md bg-primary" />
            </div>
          </div>
        </div>
      );
    case "dashboard-1":
      return (
        <div className="h-full p-4">
          <div className="grid grid-cols-3 gap-3">
            {[0, 1, 2].map((item) => (
              <div key={item} className="rounded-md border p-3">
                <div className="h-2 w-14 rounded bg-muted" />
                <div className="mt-4 h-5 w-16 rounded bg-foreground/80" />
              </div>
            ))}
          </div>
          <div className="mt-3 grid grid-cols-[1fr_0.7fr] gap-3">
            <div className="flex h-28 items-end gap-2 rounded-md border p-3">
              {["h-10", "h-16", "h-12", "h-20", "h-14"].map((height) => (
                <div key={height} className={`flex-1 rounded-t bg-primary/80 ${height}`} />
              ))}
            </div>
            <div className="space-y-2 rounded-md border p-3">
              <div className="h-6 rounded bg-muted" />
              <div className="h-6 rounded bg-muted" />
              <div className="h-6 rounded bg-muted" />
            </div>
          </div>
        </div>
      );
    case "app-shell-1":
      return (
        <div className="grid h-full grid-cols-[88px_1fr]">
          <div className="border-r bg-muted/40 p-3">
            <div className="size-8 rounded-md bg-primary" />
            <div className="mt-8 space-y-2">
              <div className="h-6 rounded bg-background" />
              <div className="h-6 rounded bg-muted" />
              <div className="h-6 rounded bg-muted" />
              <div className="h-6 rounded bg-muted" />
            </div>
          </div>
          <div className="p-3">
            <div className="mb-3 flex items-center justify-between border-b pb-3">
              <div className="h-4 w-24 rounded bg-foreground/80" />
              <div className="h-8 w-16 rounded-md border" />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="h-16 rounded-md border" />
              <div className="h-16 rounded-md border" />
              <div className="h-16 rounded-md border" />
            </div>
            <div className="mt-3 h-24 rounded-md border bg-muted/30" />
          </div>
        </div>
      );
    default:
      return <div className="h-full bg-muted" />;
  }
}
