import Link from "next/link";

import { BrandMark } from "@/components/brand-mark";

const footerLinks = [
  { href: "/blocks", label: "Blocks" },
  { href: "/pricing", label: "Pricing" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/account", label: "Account" },
];

export function SiteFooter() {
  return (
    <footer className="w-full bg-background/90 shadow-[var(--neo-flat)] backdrop-blur-xl">
      <div className="mx-auto grid max-w-[68rem] gap-8 px-5 py-10 sm:px-8 md:grid-cols-[1fr_auto] lg:px-12 xl:px-16">
        <div>
          <Link href="/" className="flex items-center gap-2 text-sm font-semibold">
            <BrandMark />
            CodeBlocks
          </Link>
          <p className="mt-3 max-w-md text-sm text-muted-foreground">
            Production-ready shadcn blocks for SaaS landing pages and app screens.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          {footerLinks.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-foreground">
              {item.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="shadow-[var(--neo-inset-sm)]">
        <div className="mx-auto max-w-[68rem] px-5 py-4 text-center text-xs text-muted-foreground sm:px-8 lg:px-12 xl:px-16">
          CodeBlock, Built by Kartik
        </div>
      </div>
    </footer>
  );
}
