import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-56px)] flex-col items-center justify-center bg-background px-8 text-center">
      <div className="rounded-2xl bg-surface px-10 py-12 shadow-[var(--neo-raised-lg)]">
        <p className="font-mono text-sm text-accent">404</p>
        <h1 className="mt-2 text-2xl font-bold text-foreground">
          Page not found
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          This block does not exist or was moved.
        </p>
        <Button asChild className="mt-6">
          <Link href="/blocks">Browse all blocks</Link>
        </Button>
      </div>
    </div>
  );
}
