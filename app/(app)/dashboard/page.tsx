import { auth, currentUser } from "@clerk/nextjs/server";
import { Bookmark, LockKeyhole } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { CopyableCommand } from "@/components/copyable-command";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  getBlockRegistry,
  getInstallCommand,
  type BlockRegistryItem,
} from "@/lib/blocks-registry";
import { hasServerClerk } from "@/lib/clerk";
import { createClient } from "@/lib/supabase";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Dashboard - CodeBlocks",
  description: "Manage CodeBlocks plan access, registry tokens, and saved blocks.",
};

interface UserAccessRow {
  id: string;
  is_pro: boolean | null;
  registry_token: string | null;
}

interface FavoriteRow {
  block_name: string;
}

async function getDashboardData(userId: string | null) {
  let userAccess: UserAccessRow | null = null;
  let savedBlocks: BlockRegistryItem[] = [];
  let statusMessage: string | null = null;

  if (!userId) {
    return { userAccess, savedBlocks, statusMessage };
  }

  try {
    const supabase = createClient();
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("id,is_pro,registry_token")
      .eq("clerk_id", userId)
      .maybeSingle();

    if (userError) {
      statusMessage = "Account data is not available in this environment.";
      return { userAccess, savedBlocks, statusMessage };
    }

    userAccess = userData;

    if (userData?.id) {
      const { data: favorites } = await supabase
        .from("favorites")
        .select("block_name")
        .eq("user_id", userData.id)
        .order("created_at", { ascending: false });

      savedBlocks = ((favorites ?? []) as FavoriteRow[])
        .map((favorite) => getBlockRegistry(favorite.block_name))
        .filter((block): block is BlockRegistryItem => Boolean(block));
    }
  } catch {
    statusMessage = "Connect Supabase to load plan and saved block data.";
  }

  return { userAccess, savedBlocks, statusMessage };
}

export default async function DashboardPage() {
  const clerkConfigured = hasServerClerk();
  let userId: string | null = null;

  if (clerkConfigured) {
    const session = await auth();
    userId = session.userId;

    if (!userId) {
      redirect("/sign-in?redirect_url=/dashboard");
    }
  }

  const user = clerkConfigured ? await currentUser() : null;
  const { userAccess, savedBlocks, statusMessage } = await getDashboardData(userId);
  const isPro = Boolean(userAccess?.is_pro);
  const registryToken = userAccess?.registry_token;

  return (
    <>
      <SiteHeader />
      <main className="bg-background">
        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <div>
              <Badge variant="default" className="rounded-full text-accent">
                Dashboard
              </Badge>
              <h1 className="mt-4 text-3xl font-semibold tracking-normal text-foreground sm:text-4xl">
                {user?.firstName ? `${user.firstName}'s CodeBlocks` : "Your CodeBlocks"}
              </h1>
              <p className="mt-2 text-base text-muted-foreground">
                Manage your plan, registry token, and saved blocks.
              </p>
            </div>

            {statusMessage ? (
              <div className="mt-6 rounded-2xl bg-surface p-4 text-sm text-muted-foreground shadow-[var(--neo-raised)]">
                {statusMessage}
              </div>
            ) : null}

            {!clerkConfigured ? (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Account access is not configured</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-6 text-muted-foreground">
                    Add Clerk environment variables to enable protected dashboard
                    sessions locally.
                  </p>
                  <Button asChild className="mt-4">
                    <Link href="/sign-in">Sign in</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : null}

            <Card className="mt-6">
              <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Current plan</p>
                  <p className="mt-1 text-lg font-semibold text-foreground">
                    {isPro ? "Pro" : "Hobby (Free)"}
                  </p>
                </div>
                {!isPro ? (
                  <Button asChild>
                    <Link href="/pricing">Upgrade to Pro</Link>
                  </Button>
                ) : (
                  <Badge variant="pro">Pro active</Badge>
                )}
              </CardContent>
            </Card>

            {isPro && registryToken ? (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <LockKeyhole aria-hidden="true" className="size-5" />
                    Your registry token
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-6 text-muted-foreground">
                    Use this token to install Pro blocks through the CLI.
                  </p>
                  <div className="mt-3">
                    <CopyableCommand command={registryToken} />
                  </div>
                  <p className="mt-3 text-xs leading-6 text-muted-foreground">
                    Add it to your project&apos;s{" "}
                    <code className="text-accent">components.json</code> registry
                    headers as{" "}
                    <code className="text-accent">
                      Authorization: Bearer &lt;token&gt;
                    </code>
                    .
                  </p>
                </CardContent>
              </Card>
            ) : null}

            <div className="mt-8">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-lg font-semibold text-foreground">
                  Saved blocks
                </h2>
                <Button asChild variant="outline" size="sm">
                  <Link href="/blocks">Browse blocks</Link>
                </Button>
              </div>

              {savedBlocks.length > 0 ? (
                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {savedBlocks.map((block) => (
                    <Link
                      key={block.name}
                      href={`/blocks/${block.category}/${block.name}`}
                      className="rounded-2xl bg-surface p-4 shadow-[var(--neo-raised)] transition-all duration-200 hover:shadow-[var(--neo-raised-lg)]"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-medium text-foreground">
                            {block.title}
                          </p>
                          <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
                            {block.description}
                          </p>
                        </div>
                        <Badge variant={block.isPro ? "pro" : "success"}>
                          {block.isPro ? "Pro" : "Free"}
                        </Badge>
                      </div>
                      <p className="mt-4 truncate font-mono text-xs text-muted-foreground">
                        {getInstallCommand(block)}
                      </p>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="mt-4 rounded-2xl bg-surface p-8 text-center shadow-[var(--neo-inset-sm)]">
                  <Bookmark
                    aria-hidden="true"
                    className="mx-auto size-8 text-muted-foreground"
                  />
                  <p className="mt-4 font-medium text-foreground">
                    No saved blocks yet
                  </p>
                  <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                    Save blocks as you browse to build a shortlist for your next
                    project.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
