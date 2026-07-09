import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { hasServerClerk } from "@/lib/clerk";
import { createPolarClient } from "@/lib/polar-server";

export async function POST(request: Request) {
  if (!hasServerClerk()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let productId: string | undefined;

  try {
    const body = (await request.json()) as { productId?: string };
    productId = body.productId;
  } catch {
    return NextResponse.json({ error: "Invalid product" }, { status: 400 });
  }

  const allowedProductIds = [
    process.env.NEXT_PUBLIC_POLAR_PRO_PRODUCT_ID,
    process.env.NEXT_PUBLIC_POLAR_TEAM_PRODUCT_ID,
  ].filter((value): value is string => Boolean(value));

  if (!productId || !allowedProductIds.includes(productId)) {
    return NextResponse.json({ error: "Invalid product" }, { status: 400 });
  }

  const user = await currentUser();
  const customerEmail = user?.primaryEmailAddress?.emailAddress;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  if (!process.env.POLAR_ACCESS_TOKEN) {
    return NextResponse.json(
      { error: "Checkout could not be created" },
      { status: 500 },
    );
  }

  try {
    const polarClient = createPolarClient();
    const checkout = await polarClient.checkouts.create({
      products: [productId],
      externalCustomerId: userId,
      customerEmail,
      successUrl: `${appUrl}/dashboard?checkout=success`,
    });

    return NextResponse.json({ url: checkout.url });
  } catch {
    return NextResponse.json(
      { error: "Checkout could not be created" },
      { status: 500 },
    );
  }
}
