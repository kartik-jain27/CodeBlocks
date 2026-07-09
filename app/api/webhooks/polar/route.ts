import { validateEvent } from "@polar-sh/sdk/webhooks";
import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase";

interface PolarWebhookEvent {
  type: string;
  data: {
    productId?: string;
    product_id?: string;
    product?: {
      id?: string;
    };
    products?: Array<{
      id?: string;
      productId?: string;
      product_id?: string;
    }>;
    items?: PolarWebhookLineItem[];
    lineItems?: PolarWebhookLineItem[];
    line_items?: PolarWebhookLineItem[];
    customer?: {
      id?: string;
      email?: string;
      externalId?: string | null;
    };
    customerEmail?: string;
    customer_email?: string;
  };
}

interface PolarWebhookLineItem {
  productId?: string;
  product_id?: string;
  product?: {
    id?: string;
  };
}

function getConfiguredProductIds() {
  return [
    process.env.NEXT_PUBLIC_POLAR_PRO_PRODUCT_ID,
    process.env.NEXT_PUBLIC_POLAR_TEAM_PRODUCT_ID,
  ].filter((id): id is string => Boolean(id));
}

function getPurchasedProductIds(data: PolarWebhookEvent["data"]) {
  const ids = [
    data.productId,
    data.product_id,
    data.product?.id,
    ...(data.products ?? []).flatMap((product) => [
      product.id,
      product.productId,
      product.product_id,
    ]),
    ...(data.items ?? []).flatMap((item) => [
      item.productId,
      item.product_id,
      item.product?.id,
    ]),
    ...(data.lineItems ?? []).flatMap((item) => [
      item.productId,
      item.product_id,
      item.product?.id,
    ]),
    ...(data.line_items ?? []).flatMap((item) => [
      item.productId,
      item.product_id,
      item.product?.id,
    ]),
  ];

  return ids.filter((id): id is string => Boolean(id));
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
    const configuredProductIds = getConfiguredProductIds();
    const purchasedProductIds = getPurchasedProductIds(event.data);

    if (configuredProductIds.length === 0) {
      return NextResponse.json(
        { error: "Missing Polar product configuration" },
        { status: 500 },
      );
    }

    if (
      purchasedProductIds.length === 0 ||
      !purchasedProductIds.some((id) => configuredProductIds.includes(id))
    ) {
      return NextResponse.json({ received: true, updated: false });
    }

    const externalId = event.data.customer?.externalId;
    const customerEmail =
      event.data.customer?.email ??
      event.data.customerEmail ??
      event.data.customer_email;

    if (!externalId && !customerEmail) {
      return NextResponse.json({ received: true, updated: false });
    }

    try {
      const supabase = createClient();
      let query = supabase
        .from("users")
        .update({
          is_pro: true,
          pro_purchased_at: new Date().toISOString(),
          polar_customer_id: event.data.customer?.id,
        });

      if (externalId) {
        query = query.eq("clerk_id", externalId);
      } else {
        query = query.eq("email", customerEmail);
      }

      const { data, error } = await query.select("id").maybeSingle();

      if (error) {
        throw error;
      }

      return NextResponse.json({ received: true, updated: Boolean(data?.id) });
    } catch {
      return NextResponse.json(
        { error: "Pro unlock failed" },
        { status: 500 },
      );
    }
  }

  return NextResponse.json({ received: true });
}
