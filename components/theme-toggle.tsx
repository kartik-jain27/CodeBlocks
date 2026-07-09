"use client";

import type { MouseEvent } from "react";
import { useEffect, useRef, useState } from "react";

type ThemeMode = "dark" | "light";
type ThemeToggleProps = {
  size?: "default" | "compact";
};

type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void) => {
    ready: Promise<void>;
    finished: Promise<void>;
  };
};

function getInitialTheme(): ThemeMode {
  if (typeof window === "undefined") {
    return "dark";
  }

  const savedTheme = window.localStorage.getItem("codeblocks-theme");

  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

function getWaveRadius(x: number, y: number) {
  return Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y),
  );
}

function setThemeWaveOrigin(x: number, y: number, radius: number) {
  const root = document.documentElement;

  root.style.setProperty("--theme-transition-x", `${x}px`);
  root.style.setProperty("--theme-transition-y", `${y}px`);
  root.style.setProperty("--theme-transition-radius", `${radius}px`);
}

function createThemeWave(x: number, y: number, radius: number, theme: ThemeMode) {
  const waveBaseSize = 56;
  const wave = document.createElement("span");
  wave.className = `theme-wave theme-wave--${theme}`;
  wave.style.setProperty("--theme-wave-x", `${x}px`);
  wave.style.setProperty("--theme-wave-y", `${y}px`);
  wave.style.setProperty("--theme-wave-scale", `${(radius * 2) / waveBaseSize}`);
  wave.setAttribute("aria-hidden", "true");

  document.body.appendChild(wave);
  window.setTimeout(() => wave.remove(), 1450);
}

export function ThemeToggle({ size = "default" }: ThemeToggleProps) {
  const [theme, setTheme] = useState<ThemeMode>("dark");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const isTransitioningRef = useRef(false);

  useEffect(() => {
    const initialTheme = getInitialTheme();
    setTheme(initialTheme);
    document.documentElement.dataset.theme = initialTheme;
    document.documentElement.style.colorScheme = initialTheme;
  }, []);

  function applyTheme(nextTheme: ThemeMode) {
    setTheme(nextTheme);
    window.localStorage.setItem("codeblocks-theme", nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    document.documentElement.style.colorScheme = nextTheme;
  }

  function toggleTheme(event: MouseEvent<HTMLButtonElement>) {
    if (isTransitioningRef.current) {
      return;
    }

    const nextTheme = theme === "dark" ? "light" : "dark";
    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const radius = getWaveRadius(x, y);
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const transitionDocument = document as ViewTransitionDocument;

    setThemeWaveOrigin(x, y, radius);
    isTransitioningRef.current = true;
    setIsTransitioning(true);

    function finishTransition() {
      isTransitioningRef.current = false;
      setIsTransitioning(false);
    }

    if (!prefersReducedMotion && transitionDocument.startViewTransition) {
      const transition = transitionDocument.startViewTransition(() => {
        applyTheme(nextTheme);
      });

      transition.ready
        .then(() => createThemeWave(x, y, radius, nextTheme))
        .catch(() => createThemeWave(x, y, radius, nextTheme));
      transition.finished.finally(finishTransition);
      return;
    }

    if (!prefersReducedMotion) {
      createThemeWave(x, y, radius, nextTheme);
    }

    applyTheme(nextTheme);
    window.setTimeout(finishTransition, prefersReducedMotion ? 120 : 650);
  }

  const isLight = theme === "light";
  const isCompact = size === "compact";
  const stars = isCompact
    ? [
        "left-2.5 top-1.5 size-0.5",
        "left-4 top-3.5 size-0.5",
        "left-6 top-1 size-1",
        "left-8.5 top-4.5 size-0.5",
        "left-10.5 top-2 size-0.5",
      ]
    : [
        "left-4 top-3 size-1",
        "left-7 top-5 size-0.5",
        "left-10 top-2.5 size-1.5",
        "left-14 top-6 size-0.5",
        "left-[4.5rem] top-3.5 size-1",
        "left-6 top-7 size-1",
        "left-12 top-8 size-0.5",
      ];
  const sunRays = isCompact
    ? [
        "left-2.5 top-1 h-1 w-0.5",
        "left-2.5 bottom-1 h-1 w-0.5",
        "left-1 top-1/2 h-0.5 w-1 -translate-y-1/2",
        "left-4.5 top-1/2 h-0.5 w-1 -translate-y-1/2",
      ]
    : [
        "left-4 top-1 h-1.5 w-0.5",
        "left-4 bottom-1 h-1.5 w-0.5",
        "left-1.5 top-1/2 h-0.5 w-1.5 -translate-y-1/2",
        "left-7 top-1/2 h-0.5 w-1.5 -translate-y-1/2",
      ];

  return (
    <button
      type="button"
      aria-label={`Switch to ${isLight ? "dark" : "light"} theme`}
      aria-pressed={isLight}
      disabled={isTransitioning}
      onClick={toggleTheme}
      className={`group relative overflow-hidden rounded-full outline-none transition duration-500 disabled:pointer-events-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
        isCompact ? "h-6 w-14" : "h-10 w-24"
      } ${
        isLight
          ? "bg-[#f4d38d] shadow-[var(--neo-raised)]"
          : "bg-[#302e31] shadow-[var(--neo-raised)]"
      }`}
    >
      <span
        className={`absolute inset-0 transition-opacity duration-500 ${
          isLight ? "opacity-0" : "opacity-100"
        }`}
      >
        {stars.map((star) => (
          <span
            key={star}
            className={`absolute ${star} rotate-45 bg-[#f6f3e6] shadow-[0_0_6px_rgba(246,243,230,0.75)]`}
          />
        ))}
        <span
          className={`absolute size-0.5 rounded-full bg-[#a7a3a1] ${
            isCompact ? "left-8 top-4.5" : "left-[3.7rem] top-7"
          }`}
        />
        <span
          className={`absolute size-0.5 rounded-full bg-[#a7a3a1] ${
            isCompact ? "left-3.5 top-4.5" : "left-5 top-6"
          }`}
        />
      </span>
      <span
        className={`absolute inset-0 transition-opacity duration-500 ${
          isLight ? "opacity-100" : "opacity-0"
        }`}
      >
        <span
          className={`absolute rounded-full bg-[#f7e2a6]/70 ${
            isCompact ? "left-2.5 top-1.5 h-2.5 w-6" : "left-4 top-3 h-4 w-9"
          }`}
        />
        <span
          className={`absolute rounded-full bg-[#eaa56f]/55 ${
            isCompact ? "left-4 top-3.5 h-3.5 w-8" : "left-8 top-5 h-5 w-12"
          }`}
        />
        <span
          className={`absolute bottom-0 rounded-t-[100%] bg-[#d96b57]/75 ${
            isCompact ? "left-1 h-2.5 w-10" : "left-2 h-4 w-16"
          }`}
        />
        <span
          className={`absolute bottom-0 rounded-t-[100%] bg-[#b94f5a]/75 ${
            isCompact ? "left-6 h-3.5 w-10" : "left-10 h-5 w-16"
          }`}
        />
      </span>
      {sunRays.map((ray) => (
        <span
          key={ray}
          className={`absolute ${ray} rounded-full bg-[#fff4c8] transition-opacity duration-500 ${
            isLight ? "opacity-90" : "opacity-0"
          }`}
        />
      ))}
      <span
        className={`absolute rounded-full transition-all duration-500 ${
          isCompact ? "top-0.5 size-5" : "top-1.5 size-7"
        } ${
          isLight
            ? `${
                isCompact ? "left-0.5" : "left-1.5"
              } bg-[#fff1a8] shadow-[var(--neo-raised-sm),inset_-3px_-3px_0_rgba(236,155,76,0.45)]`
            : `${
                isCompact ? "left-[2.125rem]" : "left-[3.875rem]"
              } bg-black shadow-[var(--neo-raised-sm)]`
        }`}
      >
        <span
          className={`absolute rounded-full transition-all duration-500 ${
            isLight
              ? `${isCompact ? "left-1 top-1 size-1.5" : "left-2 top-1.5 size-2"} bg-white/60`
              : `${isCompact ? "right-0.5 top-0.5 size-3.5" : "right-1 top-1 size-5"} bg-[#aab3cc]`
          }`}
        />
        <span
          className={`absolute rounded-full transition-all duration-500 ${
            isLight
              ? `${isCompact ? "right-1 bottom-1 size-1" : "right-1.5 bottom-1.5 size-1.5"} bg-white/50`
              : `${isCompact ? "right-1 top-0 size-4" : "right-2 top-0 size-6"} bg-black`
          }`}
        />
        <span
          className={`absolute rounded-full bg-white/40 transition-opacity duration-500 ${
            isCompact ? "right-0.5 top-1.5 size-1" : "right-1.5 top-2 size-1.5"
          } ${
            isLight ? "opacity-0" : "opacity-100"
          }`}
        />
        <span
          className={`absolute rounded-full bg-white/35 transition-opacity duration-500 ${
            isCompact ? "bottom-1 right-1.5 size-0.5" : "bottom-1.5 right-2 size-1"
          } ${
            isLight ? "opacity-0" : "opacity-100"
          }`}
        />
      </span>
    </button>
  );
}
