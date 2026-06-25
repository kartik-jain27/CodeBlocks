import { auth, currentUser } from "@clerk/nextjs/server";
import { Blocks, Download, LockKeyhole } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

import { DashboardOne } from "@/components/blocks/dashboard/dashboard-1";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { blocksRegistry } from "@/lib/blocks-registry";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const hasClerk = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

  if (hasClerk) {
    const { userId } = await auth();

    if (!userId) {
      redirect("/");
    }
  }

  const user = hasClerk ? await currentUser() : null;
  const freeBlocks = blocksRegistry.filter((block) => !block.isPro).length;
  const proBlocks = blocksRegistry.filter((block) => block.isPro).length;

  return (
    <>
      <SiteHeader />
      <main>
        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <Badge variant="secondary">Dashboard</Badge>
                <h1 className="mt-4 text-3xl font-semibold tracking-normal sm:text-4xl">
                  {user?.firstName ? `${user.firstName}'s CodeBlocks` : "Your CodeBlocks"}
                </h1>
                <p className="mt-3 text-base text-muted-foreground">
                  Registry access, install activity, and pro unlock state.
                </p>
              </div>
              <Button asChild>
                <Link href="/account">View registry token</Link>
              </Button>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Free blocks</CardTitle>
                  <Blocks aria-hidden="true" className="size-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-semibold">{freeBlocks}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pro blocks</CardTitle>
                  <LockKeyhole
                    aria-hidden="true"
                    className="size-4 text-muted-foreground"
                  />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-semibold">{proBlocks}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Installs</CardTitle>
                  <Download aria-hidden="true" className="size-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-semibold">0</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <DashboardOne />
      </main>
      <SiteFooter />
    </>
  );
}
