import { auth } from "@clerk/nextjs/server";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

import { hasServerClerk } from "@/lib/clerk";
import { createClient } from "@/lib/supabase";

export async function POST() {
  if (!hasServerClerk()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const newToken = randomUUID();

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("users")
      .update({ registry_token: newToken })
      .eq("clerk_id", userId)
      .select("registry_token")
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: "No account found to update. Try signing in again." },
        { status: 404 },
      );
    }

    return NextResponse.json({ registryToken: data.registry_token });
  } catch {
    return NextResponse.json(
      { error: "Supabase is not configured" },
      { status: 500 },
    );
  }
}
