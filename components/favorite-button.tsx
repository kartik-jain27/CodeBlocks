"use client";

import { Bookmark } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FavoriteButtonProps {
  blockName: string;
  initialFavorited: boolean;
  isSignedIn: boolean;
}

export function FavoriteButton({
  blockName,
  initialFavorited,
  isSignedIn,
}: FavoriteButtonProps) {
  const pathname = usePathname();
  const [favorited, setFavorited] = useState(initialFavorited);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function toggleFavorite() {
    if (!isSignedIn) {
      window.location.href = `/sign-in?redirect_url=${encodeURIComponent(pathname)}`;
      return;
    }

    const nextFavorited = !favorited;

    setFavorited(nextFavorited);
    setIsSaving(true);
    setError(null);

    try {
      const response = await fetch("/api/favorites", {
        method: nextFavorited ? "POST" : "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ blockName }),
      });

      if (!response.ok) {
        throw new Error("Favorite could not be saved");
      }
    } catch {
      setFavorited(!nextFavorited);
      setError("Favorite could not be saved.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="flex flex-col items-start gap-2">
      <Button
        type="button"
        variant="outline"
        size="sm"
        aria-pressed={favorited}
        onClick={toggleFavorite}
        disabled={isSaving}
      >
        <Bookmark
          aria-hidden="true"
          className={cn(favorited ? "fill-current" : "fill-none")}
        />
        {favorited ? "Saved" : "Save block"}
      </Button>
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
    </div>
  );
}
