"use client";

import { SignedIn, SignedOut, useClerk } from "@clerk/nextjs";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

const mobileLinks = [
  { href: "/blocks", label: "Blocks" },
  { href: "/pricing", label: "Pricing" },
  { href: "/docs", label: "Docs" },
  { href: "/dashboard", label: "Dashboard" },
];

interface MobileNavProps {
  showThemeToggle: boolean;
}

export function MobileNav({ showThemeToggle }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const { signOut } = useClerk();
  const hasClerk = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);
  const Icon = open ? X : Menu;

  function closeMenu() {
    setOpen(false);
  }

  return (
    <div className="relative flex items-center gap-2 md:hidden">
      {showThemeToggle ? <ThemeToggle size="compact" /> : null}
      <Button
        type="button"
        variant="outline"
        size="icon"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <Icon aria-hidden="true" />
      </Button>
      {open ? (
        <div className="absolute right-0 top-12 z-50 w-56 rounded-2xl bg-surface p-2 shadow-[var(--neo-raised-lg)]">
          <nav className="grid gap-1">
            {mobileLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="rounded-xl px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-surface-hover hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-2 grid gap-2 border-t border-border-muted pt-2">
            {hasClerk ? (
              <>
                <SignedOut>
                  <Button asChild variant="ghost" className="justify-start">
                    <Link href="/sign-in" onClick={closeMenu}>
                      Sign in
                    </Link>
                  </Button>
                  <Button asChild className="justify-start">
                    <Link href="/sign-up" onClick={closeMenu}>
                      Get free blocks
                    </Link>
                  </Button>
                </SignedOut>
                <SignedIn>
                  <Button asChild className="justify-start">
                    <Link href="/account" onClick={closeMenu}>
                      Account
                    </Link>
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    className="justify-start"
                    onClick={() => {
                      closeMenu();
                      signOut({ redirectUrl: "/" });
                    }}
                  >
                    Sign out
                  </Button>
                </SignedIn>
              </>
            ) : (
              <>
                <Button asChild variant="ghost" className="justify-start">
                  <Link href="/sign-in" onClick={closeMenu}>
                    Sign in
                  </Link>
                </Button>
                <Button asChild className="justify-start">
                  <Link href="/sign-up" onClick={closeMenu}>
                    Get free blocks
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
