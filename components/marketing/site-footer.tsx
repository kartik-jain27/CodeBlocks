import { Blocks } from "lucide-react";
import Link from "next/link";

const footerLinks = [
  { href: "/blocks", label: "Blocks" },
  { href: "/pricing", label: "Pricing" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/account", label: "Account" },
];

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1fr_auto] lg:px-8">
        <div>
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Blocks aria-hidden="true" className="size-4" />
            </span>
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
    </footer>
  );
}
