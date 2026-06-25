import { NextResponse } from "next/server";

import { blocksRegistry } from "@/lib/blocks-registry";

export async function GET() {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  return NextResponse.json({
    "$schema": "https://ui.shadcn.com/schema/registry.json",
    name: "codeblocks",
    homepage: appUrl,
    items: blocksRegistry.map((block) => ({
      ...block,
      registryUrl: `${appUrl}${block.isPro ? "/api/r/pro" : "/api/r"}/${block.name}`,
    })),
  });
}
