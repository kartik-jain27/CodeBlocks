"use client";

import { useClerk } from "@clerk/nextjs";

import { clerkUserProfileAppearance } from "@/lib/clerk-appearance";
import { Button } from "@/components/ui/button";

export function AccountProfileButton() {
  const { openUserProfile } = useClerk();

  return (
    <Button
      type="button"
      variant="outline"
      onClick={() =>
        openUserProfile({
          appearance: clerkUserProfileAppearance,
        })
      }
    >
      Account
    </Button>
  );
}
