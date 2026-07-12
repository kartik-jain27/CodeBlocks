import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";

import { clerkAppearance } from "@/lib/clerk-appearance";
import { getAppUrl } from "@/lib/site-config";

import "./globals.css";

export const metadata: Metadata = {
  title: "CodeBlocks - Production-ready shadcn/ui blocks",
  description:
    "shadcn/ui blocks for SaaS developers. Install any block in one command.",
  metadataBase: new URL(getAppUrl()),
  icons: {
    icon: [
      { url: "/favicon.png?v=3", sizes: "64x64", type: "image/png" },
      { url: "/favicon.ico?v=3", sizes: "32x32" },
    ],
    shortcut: "/favicon.png?v=3",
    apple: "/favicon.png?v=3",
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  const themeScript = `
    (() => {
      try {
        const savedTheme = localStorage.getItem("codeblocks-theme");
        const theme = savedTheme === "light" || savedTheme === "dark"
          ? savedTheme
          : (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
        document.documentElement.dataset.theme = theme;
        document.documentElement.style.colorScheme = theme;
      } catch {
        document.documentElement.dataset.theme = "dark";
      }
    })();
  `;

  const shell = (
    <html lang="en" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {children}
      </body>
    </html>
  );

  if (!publishableKey) {
    return shell;
  }

  return (
    <ClerkProvider publishableKey={publishableKey} appearance={clerkAppearance}>
      {shell}
    </ClerkProvider>
  );
}
