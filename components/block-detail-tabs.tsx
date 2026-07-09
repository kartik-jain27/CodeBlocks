"use client";

import { Check, Copy, ExternalLink, LockKeyhole, Monitor, Smartphone, Tablet } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import { CodeBlock } from "@/components/code-block";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Viewport = "mobile" | "tablet" | "desktop";
type Tab = "preview" | "code";
type Theme = "dark" | "light";

interface BlockDetailTabsProps {
  blockSlug: string;
  blockTitle: string;
  code: string;
  isLocked: boolean;
}

const viewports: Array<{
  value: Viewport;
  label: string;
  width: string;
  icon: typeof Monitor;
}> = [
  { value: "desktop", label: "Desktop preview", width: "100%", icon: Monitor },
  { value: "tablet", label: "Tablet preview", width: "768px", icon: Tablet },
  { value: "mobile", label: "Mobile preview", width: "390px", icon: Smartphone },
];

function isTheme(value: string | null | undefined): value is Theme {
  return value === "dark" || value === "light";
}

function getSiteTheme(): Theme {
  const root = document.documentElement;

  try {
    const savedTheme = window.localStorage.getItem("codeblocks-theme");

    if (isTheme(savedTheme)) {
      return savedTheme;
    }
  } catch {}

  if (isTheme(root.dataset.theme)) {
    return root.dataset.theme;
  }

  return root.classList.contains("dark") ? "dark" : "light";
}

export function BlockDetailTabs({
  blockSlug,
  blockTitle,
  code,
  isLocked,
}: BlockDetailTabsProps) {
  const [activeTab, setActiveTab] = useState<Tab>("preview");
  const [viewport, setViewport] = useState<Viewport>("desktop");
  const [copied, setCopied] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const selectedViewport = viewports.find((item) => item.value === viewport) ?? viewports[0];
  const previewPath = `/preview/${blockSlug}`;
  const previewSrc = `${previewPath}?theme=light`;

  const sendThemeToPreview = useCallback(() => {
    const iframe = iframeRef.current;

    if (!iframe) {
      return;
    }

    const theme = getSiteTheme();
    const currentSrc = iframe.getAttribute("src") ?? previewSrc;
    const url = new URL(currentSrc, window.location.origin);

    if (url.pathname === previewPath && url.searchParams.get("theme") !== theme) {
      url.searchParams.set("theme", theme);
      iframe.src = `${url.pathname}${url.search}`;
    }

    iframe.contentWindow?.postMessage({ type: "set-theme", theme }, window.location.origin);
  }, [previewPath, previewSrc]);

  useEffect(() => {
    const frameId = window.requestAnimationFrame(sendThemeToPreview);
    const observer = new MutationObserver(sendThemeToPreview);

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    });

    function handleStorage(event: StorageEvent) {
      if (event.key === "codeblocks-theme") {
        sendThemeToPreview();
      }
    }

    window.addEventListener("storage", handleStorage);

    return () => {
      window.cancelAnimationFrame(frameId);
      observer.disconnect();
      window.removeEventListener("storage", handleStorage);
    };
  }, [sendThemeToPreview]);

  async function copyCode() {
    await navigator.clipboard.writeText(code.trim());
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="relative grid grid-cols-2 overflow-hidden rounded-2xl bg-surface p-1 shadow-[var(--neo-inset-sm)]">
          <span
            aria-hidden="true"
            className={cn(
              "absolute bottom-1 left-1 top-1 w-[calc(50%-0.25rem)] rounded-xl bg-surface-hover shadow-[var(--neo-raised-sm)] transition-transform duration-300 ease-out motion-reduce:transition-none",
              activeTab === "code" ? "translate-x-full" : "translate-x-0",
            )}
          />
          {(["preview", "code"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={cn(
                "relative z-10 min-w-24 rounded-xl px-5 py-2 text-sm font-medium capitalize transition-colors duration-300",
                activeTab === tab
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {tab}
            </button>
          ))}
        </div>
        {activeTab === "code" ? (
          <Button type="button" variant="outline" size="sm" onClick={copyCode}>
            {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
            {copied ? "Copied" : "Copy code"}
          </Button>
        ) : null}
      </div>

      {activeTab === "preview" ? (
        <div className="mt-4">
          <div className="mb-3 flex justify-end gap-1">
            {viewports.map((item) => {
              const Icon = item.icon;

              return (
                <Button
                  key={item.value}
                  type="button"
                  size="icon"
                  variant={viewport === item.value ? "secondary" : "ghost"}
                  aria-label={item.label}
                  title={item.label}
                  onClick={() => setViewport(item.value)}
                >
                  <Icon aria-hidden="true" />
                </Button>
              );
            })}
          </div>
          <div className="overflow-x-auto rounded-2xl bg-surface p-3 shadow-[var(--neo-inset-sm)]">
            <div
              className="mx-auto overflow-hidden rounded-xl bg-background shadow-[var(--neo-flat)] transition-[max-width]"
              style={{ maxWidth: selectedViewport.width }}
            >
              {isLocked ? (
                <div className="relative min-h-[560px] overflow-hidden">
                  <iframe
                    ref={iframeRef}
                    src={previewSrc}
                    title={`${blockTitle} preview`}
                    className="h-[560px] w-full border-0 blur-sm"
                    onLoad={sendThemeToPreview}
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-background/70 px-4 text-center backdrop-blur-sm">
                    <div className="max-w-sm rounded-2xl bg-surface p-6 shadow-[var(--neo-raised-lg)]">
                      <Badge variant="pro">
                        <LockKeyhole aria-hidden="true" className="mr-1 size-3" />
                        Pro
                      </Badge>
                      <h2 className="mt-4 text-xl font-semibold text-foreground">
                        Unlock with Pro
                      </h2>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        Upgrade to preview, copy, and install this block.
                      </p>
                      <Button asChild className="mt-5">
                        <Link href="/pricing">
                          View pricing
                          <ExternalLink aria-hidden="true" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <iframe
                  ref={iframeRef}
                  src={previewSrc}
                  title={`${blockTitle} preview`}
                  className="h-[640px] w-full border-0"
                  onLoad={sendThemeToPreview}
                />
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-4">
          {isLocked ? (
            <div className="rounded-2xl bg-surface p-6 text-center shadow-[var(--neo-raised)]">
              <Badge variant="pro">
                <LockKeyhole aria-hidden="true" className="mr-1 size-3" />
                Pro
              </Badge>
              <h2 className="mt-4 text-xl font-semibold text-foreground">
                Unlock code access
              </h2>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                Pro blocks include full component source and private registry installs.
              </p>
              <Button asChild className="mt-5">
                <Link href="/pricing">Unlock Pro</Link>
              </Button>
            </div>
          ) : (
            <CodeBlock code={code} language="tsx" />
          )}
        </div>
      )}
    </div>
  );
}
