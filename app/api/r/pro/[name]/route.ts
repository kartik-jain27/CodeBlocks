import { NextResponse } from "next/server";

import { getBlockRegistry } from "@/lib/blocks-registry";
import { checkRateLimit } from "@/lib/rate-limit";
import { createClient } from "@/lib/supabase";

interface ProRegistryRouteContext {
  params: Promise<{
    name: string;
  }>;
}

export async function GET(request: Request, context: ProRegistryRouteContext) {
  const { name } = await context.params;
  const token = request.headers.get("authorization")?.replace("Bearer ", "");

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { allowed, retryAfterSeconds } = checkRateLimit(`pro:${token}`, 120);

  if (!allowed) {
    return NextResponse.json(
      { error: "Too many requests" },
      {
        status: 429,
        headers: { "Retry-After": String(retryAfterSeconds) },
      },
    );
  }

  const block = getBlockRegistry(name);

  if (!block) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  try {
    const supabase = createClient();
    const { data: user, error } = await supabase
      .from("users")
      .select("is_pro")
      .eq("registry_token", token)
      .single();

    if (error || !user?.is_pro) {
      return NextResponse.json({ error: "Pro required" }, { status: 403 });
    }

    return NextResponse.json(block);
  } catch {
    return NextResponse.json(
      { error: "Supabase is not configured" },
      { status: 500 },
    );
  }
}
