"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

interface PricingButtonProps {
  productId?: string;
  label: string;
  featured?: boolean;
}

export function PricingButton({ productId, label, featured }: PricingButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCheckout() {
    if (!productId) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      });
      const data = (await response.json()) as { url?: string; error?: string };

      if (response.status === 401) {
        window.location.href = "/sign-in?redirect_url=/pricing";
        return;
      }

      if (!response.ok || !data.url) {
        throw new Error(data.error ?? "Checkout could not be created");
      }

      window.location.href = data.url;
    } catch {
      setError("Checkout could not be created. Please try again.");
      setIsLoading(false);
    }
  }

  return (
    <div className="mt-6">
      <Button
        type="button"
        onClick={handleCheckout}
        className="w-full"
        variant={featured ? "default" : "outline"}
        disabled={!productId || isLoading}
      >
        {productId ? (isLoading ? "Opening checkout..." : label) : "Checkout unavailable"}
      </Button>
      {error ? (
        <p className="mt-2 text-sm text-destructive">{error}</p>
      ) : null}
    </div>
  );
}
