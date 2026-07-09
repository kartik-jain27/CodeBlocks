import { NextResponse } from "next/server";

import { getBlockRegistry } from "@/lib/blocks-registry";
import { checkRateLimit } from "@/lib/rate-limit";

interface RegistryRouteContext {
  params: Promise<{
    name: string;
  }>;
}

export async function GET(request: Request, context: RegistryRouteContext) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const { allowed, retryAfterSeconds } = checkRateLimit(`free:${ip}`, 60);

  if (!allowed) {
    return NextResponse.json(
      { error: "Too many requests" },
      {
        status: 429,
        headers: { "Retry-After": String(retryAfterSeconds) },
      },
    );
  }

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
