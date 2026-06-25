import { validateEvent } from "@polar-sh/sdk/webhooks";
import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase";

interface PolarWebhookEvent {
  type: string;
  data: {
    customer?: {
      id?: string;
      email?: string;
    };
    customerEmail?: string;
    customer_email?: string;
  };
}

export async function POST(request: Request) {
  const webhookSecret = process.env.POLAR_WEBHOOK_SECRET;

  if (!webhookSecret) {
    return NextResponse.json(
      { error: "Missing POLAR_WEBHOOK_SECRET" },
      { status: 500 },
    );
  }

  const body = await request.text();
  const headers = {
    "webhook-id": request.headers.get("webhook-id") ?? "",
    "webhook-timestamp": request.headers.get("webhook-timestamp") ?? "",
    "webhook-signature": request.headers.get("webhook-signature") ?? "",
  };

  let event: PolarWebhookEvent;

  try {
    event = (await validateEvent(body, headers, webhookSecret)) as PolarWebhookEvent;
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "order.created") {
    const customerEmail =
      event.data.customer?.email ??
      event.data.customerEmail ??
      event.data.customer_email;

    if (!customerEmail) {
      return NextResponse.json({ received: true, updated: false });
    }

    try {
      const supabase = createClient();
      await supabase
        .from("users")
        .update({
          is_pro: true,
          pro_purchased_at: new Date().toISOString(),
          polar_customer_id: event.data.customer?.id,
        })
        .eq("email", customerEmail);
    } catch {
      return NextResponse.json(
        { error: "Supabase is not configured" },
        { status: 500 },
      );
    }
  }

  return NextResponse.json({ received: true });
}
