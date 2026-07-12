import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { getBlockRegistry } from "@/lib/blocks-registry";
import { hasServerClerk } from "@/lib/clerk";
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
  if (!hasServerClerk()) {
    return {
      response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }

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

  let supabase;

  try {
    supabase = createClient();
  } catch {
    return {
      response: NextResponse.json(
        { error: "Favorites need Supabase server keys in .env.local." },
        { status: 503 },
      ),
    };
  }

  try {
    const { data: existingUser, error: lookupError } = await supabase
      .from("users")
      .select("id")
      .eq("clerk_id", userId)
      .maybeSingle();

    if (lookupError) {
      throw lookupError;
    }

    if (existingUser?.id) {
      return { blockName, supabase, userId: existingUser.id };
    }

    const clerkUser = await currentUser();
    const email =
      clerkUser?.primaryEmailAddress?.emailAddress ??
      clerkUser?.emailAddresses[0]?.emailAddress;

    if (!email) {
      return {
        response: NextResponse.json(
          { error: "Your account email is missing, so favorites cannot sync." },
          { status: 409 },
        ),
      };
    }

    const { data: syncedUser, error: syncError } = await supabase
      .from("users")
      .upsert(
        {
          clerk_id: userId,
          email,
        },
        { onConflict: "clerk_id" },
      )
      .select("id")
      .single();

    if (syncError || !syncedUser?.id) {
      throw syncError ?? new Error("User sync failed");
    }

    return { blockName, supabase, userId: syncedUser.id };
  } catch (error) {
    console.error("Favorite context failed", error);
    return {
      response: NextResponse.json(
        { error: "Favorites database is not ready yet." },
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
  } catch (error) {
    console.error("Favorite create failed", error);
    return NextResponse.json(
      { error: "Favorite could not be saved." },
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
  } catch (error) {
    console.error("Favorite delete failed", error);
    return NextResponse.json(
      { error: "Favorite could not be removed." },
      { status: 500 },
    );
  }
}
