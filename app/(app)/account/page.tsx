import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { AccountRegistryToken } from "@/components/account-registry-token";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { hasServerClerk } from "@/lib/clerk";
import { getAppUrl } from "@/lib/site-config";
import { createClient } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function AccountPage() {
  const clerkConfigured = hasServerClerk();
  let userId: string | null = null;

  if (clerkConfigured) {
    const session = await auth();
    userId = session.userId;

    if (!userId) {
      redirect("/sign-in?redirect_url=/account");
    }
  }

  const user = clerkConfigured ? await currentUser() : null;
  let registryToken: string | null = null;
  let registryTokenStatus = "No registry token is available for this account yet";
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
      } else {
        registryTokenStatus =
          "No registry token is available for this account yet";
      }

      isPro = Boolean(data?.is_pro);
    } catch {
      registryTokenStatus = "Supabase is not configured for this environment";
    }
  }

  const appUrl = getAppUrl();

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
            <div className="mt-8">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between gap-4">
                    <CardTitle>Plan status</CardTitle>
                    <Badge variant={isPro ? "pro" : "outline"}>
                      {isPro ? "Pro active" : "Free"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-6 text-muted-foreground">
                    {isPro
                      ? "Your Pro registry access is active."
                      : "Upgrade to Pro to use private registry installs."}
                  </p>
                </CardContent>
              </Card>
              <div className="mt-4">
                <AccountRegistryToken
                  appUrl={appUrl}
                  initialRegistryToken={registryToken}
                  unavailableMessage={registryTokenStatus}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
