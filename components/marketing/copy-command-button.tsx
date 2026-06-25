"use client";

import { Check, Clipboard } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

interface CopyCommandButtonProps {
  command: string;
  label?: string;
}

export function CopyCommandButton({
  command,
  label = "Copy CLI command",
}: CopyCommandButtonProps) {
  const [copied, setCopied] = useState(false);

  async function copyCommand() {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <Button type="button" variant="outline" size="sm" onClick={copyCommand}>
      {copied ? <Check aria-hidden="true" /> : <Clipboard aria-hidden="true" />}
      {copied ? "Copied" : label}
    </Button>
  );
}
