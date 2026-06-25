import { NextResponse } from "next/server";

import { getBlockRegistry } from "@/lib/blocks-registry";

interface RegistryRouteContext {
  params: Promise<{
    name: string;
  }>;
}

export async function GET(_request: Request, context: RegistryRouteContext) {
  const { name } = await context.params;
  const block = getBlockRegistry(name);

  if (!block) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (block.isPro) {
    return NextResponse.json({ error: "Pro block" }, { status: 403 });
  }

  return NextResponse.json(block);
}
