"use client";

import type { CSSProperties, ReactNode } from "react";
import { useEffect, useState } from "react";

type Theme = "dark" | "light";
type PreviewThemeStyles = CSSProperties & Record<`--${string}`, string>;

interface PreviewThemeSyncProps {
  children: ReactNode;
}

const lightThemeStyles: PreviewThemeStyles = {
  "--background": "#ffffff",
  "--surface": "#ffffff",
  "--surface-hover": "#f4f4f5",
  "--foreground": "#09090b",
  "--muted": "#71717a",
  "--muted-foreground": "#71717a",
  "--border": "#e4e4e7",
  "--border-muted": "#e4e4e7",
  "--accent": "#18181b",
  "--accent-foreground": "#fafafa",
  "--primary": "#18181b",
  "--primary-foreground": "#fafafa",
  "--secondary": "#f4f4f5",
  "--secondary-foreground": "#18181b",
  "--card": "#ffffff",
  "--card-foreground": "#09090b",
  "--popover": "#ffffff",
  "--popover-foreground": "#09090b",
  "--success": "#18181b",
  "--pro-gold": "#18181b",
  "--neo-raised": "none",
  "--neo-raised-sm": "none",
  "--neo-raised-lg": "none",
  "--neo-inset": "none",
  "--neo-inset-sm": "none",
  "--neo-flat": "none",
};

const darkThemeStyles: PreviewThemeStyles = {
  "--background": "#09090b",
  "--surface": "#09090b",
  "--surface-hover": "#18181b",
  "--foreground": "#fafafa",
  "--muted": "#a1a1aa",
  "--muted-foreground": "#a1a1aa",
  "--border": "#27272a",
  "--border-muted": "#27272a",
  "--accent": "#fafafa",
  "--accent-foreground": "#18181b",
  "--primary": "#fafafa",
  "--primary-foreground": "#18181b",
  "--secondary": "#27272a",
  "--secondary-foreground": "#fafafa",
  "--card": "#09090b",
  "--card-foreground": "#fafafa",
  "--popover": "#09090b",
  "--popover-foreground": "#fafafa",
  "--success": "#fafafa",
  "--pro-gold": "#fafafa",
  "--neo-raised": "none",
  "--neo-raised-sm": "none",
  "--neo-raised-lg": "none",
  "--neo-inset": "none",
  "--neo-inset-sm": "none",
  "--neo-flat": "none",
};

function isTheme(value: string | null): value is Theme {
  return value === "dark" || value === "light";
}

function getInitialTheme(): Theme {
  if (typeof window === "undefined") {
    return "light";
  }

  const searchTheme = new URLSearchParams(window.location.search).get("theme");

  if (isTheme(searchTheme)) {
    return searchTheme;
  }

  const storedTheme = window.localStorage.getItem("codeblocks-theme");

  if (isTheme(storedTheme)) {
    return storedTheme;
  }

  const dataTheme = document.documentElement.dataset.theme;

  if (isTheme(dataTheme ?? null)) {
    return dataTheme as Theme;
  }

  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function applyDocumentTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;
}

export function PreviewThemeSync({ children }: PreviewThemeSyncProps) {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const initialTheme = getInitialTheme();

    setTheme(initialTheme);
    applyDocumentTheme(initialTheme);

    function handleMessage(event: MessageEvent) {
      const nextTheme = event.data?.type === "set-theme" ? event.data.theme : null;

      if (!isTheme(nextTheme)) {
        return;
      }

      setTheme(nextTheme);
      applyDocumentTheme(nextTheme);
    }

    window.addEventListener("message", handleMessage);

    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <div
      className="block-preview-scope min-h-screen bg-background text-foreground"
      style={theme === "dark" ? darkThemeStyles : lightThemeStyles}
      suppressHydrationWarning
    >
      {children}
    </div>
  );
}
