"use client";

import { Button } from "@/components/ui/button";

interface PricingButtonProps {
  productId?: string;
  label: string;
  featured?: boolean;
}

export function PricingButton({ productId, label, featured }: PricingButtonProps) {
  function handleCheckout() {
    if (!productId) {
      return;
    }

    window.location.href = `https://buy.polar.sh/${productId}`;
  }

  return (
    <Button
      type="button"
      onClick={handleCheckout}
      className="mt-6 w-full"
      variant={featured ? "default" : "outline"}
      disabled={!productId}
    >
      {productId ? label : "Checkout unavailable"}
    </Button>
  );
}
