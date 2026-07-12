"use client";

import { useClerk, useUser } from "@clerk/nextjs";
import { LogOut, Settings } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { clerkUserProfileAppearance } from "@/lib/clerk-appearance";
import { Button } from "@/components/ui/button";

export function AccountProfileButton() {
  const { openUserProfile, signOut } = useClerk();
  const { user } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;

    function handlePointerDown(event: PointerEvent) {
      if (!menuRef.current?.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [menuOpen]);

  function openAccount() {
    setMenuOpen(false);
    openUserProfile({
      appearance: clerkUserProfileAppearance,
    });
  }

  const avatarUrl = user?.imageUrl;
  const fallbackInitial =
    user?.firstName?.[0] ??
    user?.username?.[0] ??
    user?.primaryEmailAddress?.emailAddress?.[0] ??
    "A";

  return (
    <div ref={menuRef} className="relative flex items-center gap-2">
      <Button type="button" variant="outline" onClick={openAccount}>
        Account
      </Button>
      <button
        type="button"
        onClick={() => setMenuOpen((value) => !value)}
        aria-label="Open account menu"
        aria-expanded={menuOpen}
        className="flex size-9 items-center justify-center overflow-hidden rounded-full bg-surface text-sm font-semibold uppercase text-foreground shadow-[var(--neo-raised)] transition hover:-translate-y-0.5 hover:shadow-[var(--neo-raised-lg)]"
      >
        {avatarUrl ? (
          // Clerk serves the user's profile image URL. A plain img avoids adding
          // remote image-domain config just for this tiny avatar.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={avatarUrl}
            alt=""
            className="size-full object-cover"
            referrerPolicy="no-referrer"
          />
        ) : (
          fallbackInitial
        )}
      </button>
      {menuOpen ? (
        <div className="absolute right-0 top-12 z-50 w-56 overflow-hidden rounded-2xl bg-surface p-2 shadow-[var(--neo-raised-lg)]">
          <button
            type="button"
            onClick={openAccount}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-semibold text-foreground transition hover:bg-surface-hover"
          >
            <Settings className="size-4" aria-hidden="true" />
            Manage account
          </button>
          <button
            type="button"
            onClick={() => signOut({ redirectUrl: "/" })}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-semibold text-foreground transition hover:bg-surface-hover"
          >
            <LogOut className="size-4" aria-hidden="true" />
            Sign out
          </button>
        </div>
      ) : null}
    </div>
  );
}
