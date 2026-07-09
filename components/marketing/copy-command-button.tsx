"use client";

import { Check, Clipboard, Sparkles, type LucideIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

interface CopyCommandButtonProps {
  command: string;
  label?: string;
  icon?: "clipboard" | "sparkles";
}

export function CopyCommandButton({
  command,
  label = "Copy CLI command",
  icon = "clipboard",
}: CopyCommandButtonProps) {
  const [copied, setCopied] = useState(false);
  const Icon: LucideIcon = icon === "sparkles" ? Sparkles : Clipboard;

  async function copyCommand() {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <Button type="button" variant="outline" size="sm" onClick={copyCommand}>
      {copied ? <Check aria-hidden="true" /> : <Icon aria-hidden="true" />}
      {copied ? "Copied" : label}
    </Button>
  );
}
