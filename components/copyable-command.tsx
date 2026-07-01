"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

interface CopyableCommandProps {
  command: string;
  label?: string;
}

export function CopyableCommand({ command, label }: CopyableCommandProps) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className="flex min-w-0 items-center gap-2 rounded-xl bg-surface px-4 py-3 font-mono text-sm shadow-[var(--neo-inset-sm)]">
      <span className="select-none text-accent">$</span>
      <span className="min-w-0 flex-1 truncate text-muted-foreground">
        {command}
      </span>
      <button
        type="button"
        onClick={copy}
        className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground shadow-[var(--neo-flat)] transition-all hover:shadow-[var(--neo-raised-sm)] hover:text-foreground active:shadow-[var(--neo-inset-sm)]"
        aria-label={label ?? "Copy command"}
      >
        {copied ? (
          <Check aria-hidden="true" className="size-4 text-success" />
        ) : (
          <Copy aria-hidden="true" className="size-4" />
        )}
      </button>
    </div>
  );
}
