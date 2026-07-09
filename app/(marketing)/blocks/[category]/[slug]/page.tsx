import { auth } from "@clerk/nextjs/server";
import { readFile } from "fs/promises";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import path from "path";

import { BlockDetailTabs } from "@/components/block-detail-tabs";
import { CopyableCommand } from "@/components/copyable-command";
import { FavoriteButton } from "@/components/favorite-button";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import { Badge } from "@/components/ui/badge";
import {
  getBlockRegistry,
  getCategory,
  getInstallCommand,
} from "@/lib/blocks-registry";
import { createClient } from "@/lib/supabase";

interface BlockDetailPageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: BlockDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const block = getBlockRegistry(slug);

  if (!block) {
    return {
      title: "Block not found - CodeBlocks",
    };
  }

  return {
    title: `${block.title} - CodeBlocks`,
    description: block.description,
    openGraph: {
      title: `${block.title} - CodeBlocks`,
      description: block.description,
      images: [`/api/og?block=${block.name}`],
    },
  };
}

async function getBlockSource(filePath?: string) {
  if (!filePath) {
    return "";
  }

  try {
    return await readFile(path.join(process.cwd(), filePath), "utf8");
  } catch {
    return "";
  }
}

async function getUserIsPro(userId: string | null) {
  if (!userId) {
    return false;
  }

  try {
    const supabase = createClient();
    const { data } = await supabase
      .from("users")
      .select("is_pro")
      .eq("clerk_id", userId)
      .single();

    return Boolean(data?.is_pro);
  } catch {
    return false;
  }
}

async function getInitialFavorited(userId: string | null, blockName: string) {
  if (!userId) {
    return false;
  }

  try {
    const supabase = createClient();
    const { data: user } = await supabase
      .from("users")
      .select("id")
      .eq("clerk_id", userId)
      .maybeSingle();

    if (!user?.id) {
      return false;
    }

    const { data: favorite } = await supabase
      .from("favorites")
      .select("block_name")
      .eq("user_id", user.id)
      .eq("block_name", blockName)
      .maybeSingle();

    return Boolean(favorite);
  } catch {
    return false;
  }
}

export default async function BlockDetailPage({ params }: BlockDetailPageProps) {
  const { category, slug } = await params;
  const block = getBlockRegistry(slug);
  const categoryConfig = getCategory(category);

  if (!block || !categoryConfig || block.category !== categoryConfig.slug) {
    notFound();
  }

  const hasServerClerk = Boolean(
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && process.env.CLERK_SECRET_KEY,
  );
  const session = hasServerClerk ? await auth() : null;
  const userId = session?.userId ?? null;
  const [sourceCode, userIsPro, initialFavorited] = await Promise.all([
    getBlockSource(block.files[0]?.path),
    getUserIsPro(userId),
    getInitialFavorited(userId, block.name),
  ]);
  const isLocked = block.isPro && !userIsPro;
  const installCommand = getInstallCommand(block);
  const installPrompt = `Install the ${block.title} block into this project.
Steps:
1. Ensure this is a Next.js + shadcn project with components.json
2. Run: npx shadcn@latest add https://codeblocks.dev/r/${block.name}
After install, summarize what was added and any next steps.`;

  return (
    <>
      <SiteHeader />
      <main className="bg-background">
        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <Link href="/blocks" className="hover:text-foreground">
                Blocks
              </Link>
              <span>/</span>
              <Link
                href={`/blocks/${categoryConfig.slug}`}
                className="hover:text-foreground"
              >
                {categoryConfig.label}
              </Link>
              <span>/</span>
              <span className="text-foreground">{block.title}</span>
            </div>

            <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
              <div className="max-w-3xl">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-3xl font-semibold tracking-normal text-foreground sm:text-4xl">
                    {block.title}
                  </h1>
                  <Badge variant={block.isPro ? "pro" : "success"}>
                    {block.isPro ? "Pro" : "Free"}
                  </Badge>
                </div>
                <p className="mt-2 text-base leading-7 text-muted-foreground">
                  {block.description}
                </p>
              </div>
              <FavoriteButton
                blockName={block.name}
                initialFavorited={initialFavorited}
                isSignedIn={Boolean(userId)}
              />
            </div>

            <BlockDetailTabs
              blockSlug={block.name}
              blockTitle={block.title}
              code={sourceCode}
              isLocked={isLocked}
            />

            <div className="mt-6">
              <p className="mb-2 text-sm font-medium text-foreground">
                Installation
              </p>
              <div className="grid gap-3">
                <CopyableCommand command={installCommand} />
                <CopyableCommand command={installPrompt} label="Copy Prompt" />
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
