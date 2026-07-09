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
    const { error } = await supabase
      .from("users")
      .update({ registry_token: newToken })
      .eq("clerk_id", userId);

    if (error) {
      throw error;
    }

    return NextResponse.json({ registryToken: newToken });
  } catch {
    return NextResponse.json(
      { error: "Supabase is not configured" },
      { status: 500 },
    );
  }
}
