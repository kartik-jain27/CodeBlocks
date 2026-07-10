import { SignIn } from "@clerk/nextjs";
import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Sign in - CodeBlocks",
};

export default function SignInPage() {
  const hasClerk = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      {hasClerk ? (
        <SignIn />
      ) : (
        <div className="max-w-md rounded-2xl bg-surface p-6 text-center shadow-[var(--neo-raised-lg)]">
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
