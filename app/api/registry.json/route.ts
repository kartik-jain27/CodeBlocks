import { NextResponse } from "next/server";

import { blocksRegistry } from "@/lib/blocks-registry";
import { getAppUrl } from "@/lib/site-config";

export async function GET() {
  const appUrl = getAppUrl();

  return NextResponse.json({
    "$schema": "https://ui.shadcn.com/schema/registry.json",
    name: "codeblocks",
    homepage: appUrl,
    items: blocksRegistry.map((block) => ({
      ...block,
      registryUrl: `${appUrl}${block.isPro ? "/r/pro" : "/r"}/${block.name}`,
    })),
  });
}
