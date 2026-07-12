import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

import { AccountProfileButton } from "@/components/auth/account-profile-button";
import { BrandMark } from "@/components/brand-mark";
import { MobileNav } from "@/components/marketing/mobile-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { clerkUserProfileAppearance } from "@/lib/clerk-appearance";

const navItems = [
  { href: "/blocks", label: "Blocks" },
  { href: "/pricing", label: "Pricing" },
  { href: "/docs", label: "Docs" },
  { href: "/dashboard", label: "Dashboard" },
];

interface SiteHeaderProps {
  showThemeToggle?: boolean;
}

export function SiteHeader({ showThemeToggle = true }: SiteHeaderProps) {
  const hasClerk = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

  return (
    <header className="sticky top-0 z-40 bg-background/90 shadow-[var(--neo-flat)] backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[68rem] items-center justify-between px-5 sm:px-8 lg:px-12 xl:px-16">
        <Link href="/" className="flex items-center gap-2 text-sm font-semibold">
          <BrandMark />
          CodeBlocks
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-foreground">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          {hasClerk ? (
            <>
              <SignedOut>
                <Button asChild variant="ghost">
                  <Link href="/sign-in">Sign in</Link>
                </Button>
                <Button asChild>
                  <Link href="/sign-up">Get free blocks</Link>
                </Button>
                {showThemeToggle ? <ThemeToggle size="compact" /> : null}
              </SignedOut>
              <SignedIn>
                <AccountProfileButton />
                <UserButton
                  appearance={clerkUserProfileAppearance}
                  userProfileProps={{ appearance: clerkUserProfileAppearance }}
                />
                {showThemeToggle ? <ThemeToggle size="compact" /> : null}
              </SignedIn>
            </>
          ) : (
            <>
              <Button asChild variant="ghost">
                <Link href="/sign-in">Sign in</Link>
              </Button>
              <Button asChild>
                <Link href="/sign-up">Get free blocks</Link>
              </Button>
              {showThemeToggle ? <ThemeToggle size="compact" /> : null}
            </>
          )}
        </div>
        <MobileNav showThemeToggle={showThemeToggle} />
      </div>
    </header>
  );
}
