"use client";

import { RefreshCw } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

interface RotateTokenButtonProps {
  onRotated: (registryToken: string) => void;
}

export function RotateTokenButton({ onRotated }: RotateTokenButtonProps) {
  const [isRotating, setIsRotating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function rotateToken() {
    setIsRotating(true);
    setError(null);

    try {
      const response = await fetch("/api/account/rotate-token", {
        method: "POST",
      });
      const data = (await response.json()) as {
        registryToken?: string;
        error?: string;
      };

      if (!response.ok || !data.registryToken) {
        throw new Error(data.error ?? "Token could not be rotated");
      }

      onRotated(data.registryToken);
    } catch {
      setError("Token could not be rotated. Please try again.");
    } finally {
      setIsRotating(false);
    }
  }

  return (
    <div className="flex flex-col items-start gap-2">
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={rotateToken}
        disabled={isRotating}
      >
        <RefreshCw aria-hidden="true" />
        {isRotating ? "Rotating..." : "Rotate token"}
      </Button>
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
    </div>
  );
}
