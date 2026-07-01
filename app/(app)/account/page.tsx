import { auth, currentUser } from "@clerk/nextjs/server";
import { KeyRound, Terminal } from "lucide-react";
import { redirect } from "next/navigation";

import { CopyCommandButton } from "@/components/marketing/copy-command-button";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function AccountPage() {
  const hasServerClerk = Boolean(
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && process.env.CLERK_SECRET_KEY,
  );
  let userId: string | null = null;

  if (hasServerClerk) {
    const session = await auth();
    userId = session.userId;

    if (!userId) {
      redirect("/sign-in?redirect_url=/account");
    }
  }

  const user = hasServerClerk ? await currentUser() : null;
  let registryToken = "Set Supabase env vars to fetch your token";
  let isPro = false;

  if (userId) {
    try {
      const supabase = createClient();
      const { data } = await supabase
        .from("users")
        .select("registry_token,is_pro")
        .eq("clerk_id", userId)
        .single();

      if (data?.registry_token) {
        registryToken = data.registry_token;
      }

      isPro = Boolean(data?.is_pro);
    } catch {
      registryToken = "Supabase is not configured for this environment";
    }
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const configSnippet = `{
  "registries": {
    "codeblocks": {
      "url": "${appUrl}/api/r/pro/{name}",
      "headers": {
        "Authorization": "Bearer ${registryToken}"
      }
    }
  }
}`;

  return (
    <>
      <SiteHeader />
      <main className="bg-background">
        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <Badge variant="default" className="rounded-full text-accent">
              Account
            </Badge>
            <h1 className="mt-4 text-4xl font-semibold tracking-normal sm:text-5xl">
              Registry access
            </h1>
            <p className="mt-3 text-base text-muted-foreground">
              {user?.primaryEmailAddress?.emailAddress ??
                "Connect Clerk to sync your account email."}
            </p>
            <div className="mt-8 grid gap-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between gap-4">
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <KeyRound aria-hidden="true" className="size-5" />
                      Registry token
                    </CardTitle>
                    <Badge variant={isPro ? "pro" : "outline"}>
                      {isPro ? "Pro active" : "Free"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto rounded-xl bg-surface p-3 font-mono text-xs text-muted-foreground shadow-[var(--neo-inset-sm)]">
                    {registryToken}
                  </div>
                  <div className="mt-4">
                    <CopyCommandButton
                      command={registryToken}
                      label="Copy registry token"
                    />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Terminal aria-hidden="true" className="size-5" />
                    components.json
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="overflow-x-auto rounded-xl bg-surface p-4 text-xs text-muted-foreground shadow-[var(--neo-inset-sm)]">
                    <code>{configSnippet}</code>
                  </pre>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
