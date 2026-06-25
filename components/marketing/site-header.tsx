import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { Blocks, Menu } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/blocks", label: "Blocks" },
  { href: "/pricing", label: "Pricing" },
  { href: "/dashboard", label: "Dashboard" },
];

export function SiteHeader() {
  const hasClerk = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Blocks aria-hidden="true" className="size-4" />
          </span>
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
                <SignInButton mode="modal">
                  <Button variant="ghost">Sign in</Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button>Get free blocks</Button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <Button asChild variant="outline">
                  <Link href="/account">Account</Link>
                </Button>
                <UserButton />
              </SignedIn>
            </>
          ) : (
            <>
              <Button asChild variant="ghost">
                <Link href="/dashboard">Sign in</Link>
              </Button>
              <Button asChild>
                <Link href="/blocks">Get free blocks</Link>
              </Button>
            </>
          )}
        </div>
        <Button variant="outline" size="icon" className="md:hidden" aria-label="Open menu">
          <Menu aria-hidden="true" />
        </Button>
      </div>
    </header>
  );
}
