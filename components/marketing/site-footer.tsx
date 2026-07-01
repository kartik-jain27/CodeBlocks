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
    <footer className="shadow-[var(--neo-inset-sm)]">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1fr_auto] lg:px-8">
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
      <div className="px-4 py-4 text-center text-xs text-muted-foreground shadow-[var(--neo-inset-sm)]">
        CodeBlock, Built by Kartik
      </div>
    </footer>
  );
}
