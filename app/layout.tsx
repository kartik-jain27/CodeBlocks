import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";

import "./globals.css";

export const metadata: Metadata = {
  title: "CodeBlocks - Production-ready shadcn blocks",
  description:
    "A freemium shadcn/ui block library for SaaS marketing pages, auth flows, dashboards, and app shells.",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  const shell = (
    <html lang="en">
      <body>{children}</body>
    </html>
  );

  if (!publishableKey) {
    return shell;
  }

  return <ClerkProvider publishableKey={publishableKey}>{shell}</ClerkProvider>;
}
