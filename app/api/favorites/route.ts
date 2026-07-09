import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { getBlockRegistry } from "@/lib/blocks-registry";
import { createClient } from "@/lib/supabase";

async function parseBlockName(request: Request) {
  try {
    const body = (await request.json()) as { blockName?: string };
    return body.blockName;
  } catch {
    return null;
  }
}

async function getFavoriteContext(request: Request) {
  const { userId } = await auth();

  if (!userId) {
    return {
      response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }

  const blockName = await parseBlockName(request);

  if (!blockName || !getBlockRegistry(blockName)) {
    return {
      response: NextResponse.json({ error: "Unknown block" }, { status: 404 }),
    };
  }

  try {
    const supabase = createClient();
    const { data: user, error } = await supabase
      .from("users")
      .select("id")
      .eq("clerk_id", userId)
      .single();

    if (error || !user?.id) {
      return {
        response: NextResponse.json({ error: "User not found" }, { status: 404 }),
      };
    }

    return { blockName, supabase, userId: user.id };
  } catch {
    return {
      response: NextResponse.json(
        { error: "Supabase is not configured" },
        { status: 500 },
      ),
    };
  }
}

export async function POST(request: Request) {
  const context = await getFavoriteContext(request);

  if ("response" in context) {
    return context.response;
  }

  try {
    const { error } = await context.supabase.from("favorites").upsert(
      { user_id: context.userId, block_name: context.blockName },
      { onConflict: "user_id,block_name" },
    );

    if (error) {
      throw error;
    }

    return NextResponse.json({ favorited: true });
  } catch {
    return NextResponse.json(
      { error: "Supabase is not configured" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  const context = await getFavoriteContext(request);

  if ("response" in context) {
    return context.response;
  }

  try {
    const { error } = await context.supabase
      .from("favorites")
      .delete()
      .eq("user_id", context.userId)
      .eq("block_name", context.blockName);

    if (error) {
      throw error;
    }

    return NextResponse.json({ favorited: false });
  } catch {
    return NextResponse.json(
      { error: "Supabase is not configured" },
      { status: 500 },
    );
  }
}
