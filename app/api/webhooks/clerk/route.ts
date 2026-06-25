import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@/lib/supabase";

interface ClerkUserData {
  id: string;
  email_addresses?: Array<{
    email_address: string;
    id: string;
  }>;
  primary_email_address_id?: string | null;
}

export async function POST(request: NextRequest) {
  let event;

  try {
    event = await verifyWebhook(request);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "user.created" || event.type === "user.updated") {
    const user = event.data as ClerkUserData;
    const primaryEmail =
      user.email_addresses?.find(
        (email) => email.id === user.primary_email_address_id,
      )?.email_address ?? user.email_addresses?.[0]?.email_address;

    if (primaryEmail) {
      try {
        const supabase = createClient();
        await supabase.from("users").upsert(
          {
            clerk_id: user.id,
            email: primaryEmail,
          },
          { onConflict: "clerk_id" },
        );
      } catch {
        return NextResponse.json(
          { error: "Supabase is not configured" },
          { status: 500 },
        );
      }
    }
  }

  return NextResponse.json({ received: true });
}
