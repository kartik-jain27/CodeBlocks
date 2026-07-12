import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { CustomAuthForm } from "@/components/auth/custom-auth-form";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Sign in - CodeBlocks",
};

export default function SignInPage() {
  const hasClerk = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

  return (
    <main className="auth-screen flex min-h-screen items-center justify-center bg-background px-4 py-12">
      {hasClerk ? (
        <CustomAuthForm mode="sign-in" />
      ) : (
        <div className="relative max-w-md rounded-2xl bg-surface p-6 text-center shadow-[var(--neo-raised-lg)]">
          <Link
            href="/"
            aria-label="Back to homepage"
            className="absolute left-4 top-4 inline-flex size-9 items-center justify-center rounded-full bg-surface text-foreground shadow-[var(--neo-flat)] transition hover:-translate-y-0.5 hover:shadow-[var(--neo-raised-sm)]"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
          </Link>
          <h1 className="text-2xl font-semibold text-foreground">
            Sign in is not configured
          </h1>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Add Clerk environment variables to enable account access locally.
          </p>
          <Button asChild className="mt-6">
            <Link href="/blocks">Browse blocks</Link>
          </Button>
        </div>
      )}
    </main>
  );
}
