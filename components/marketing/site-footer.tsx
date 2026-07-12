import { Mail } from "lucide-react";
import Link from "next/link";

import { BrandMark } from "@/components/brand-mark";
import { siteConfig } from "@/lib/site-config";

const productLinks = [
  { href: "/blocks", label: "Blocks" },
  { href: "/pricing", label: "Pricing" },
  { href: "/dashboard", label: "Dashboard" },
];

const resourceLinks = [
  { href: "/docs", label: "Docs" },
  { href: "/account", label: "Account" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

function GithubIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="size-4"
      fill="currentColor"
    >
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.221-.253-4.556-1.113-4.556-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.026 2.747-1.026.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="size-4"
      fill="currentColor"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231ZM17.083 19.77h1.833L7.084 4.126H5.117Z" />
    </svg>
  );
}

export function SiteFooter() {
  const socialLinks = [
    siteConfig.social.x
      ? { href: siteConfig.social.x, label: "X", icon: XIcon }
      : null,
    siteConfig.social.github
      ? { href: siteConfig.social.github, label: "GitHub", icon: GithubIcon }
      : null,
    siteConfig.social.email
      ? { href: `mailto:${siteConfig.social.email}`, label: "Email", icon: Mail }
      : null,
  ].filter(Boolean) as { href: string; label: string; icon: typeof Mail }[];

  return (
    <footer className="w-full bg-background/90 shadow-[var(--neo-flat)] backdrop-blur-xl">
      <div className="mx-auto grid max-w-[68rem] gap-10 px-5 py-10 sm:px-8 md:grid-cols-[1fr_auto_auto] lg:px-12 xl:px-16">
        <div>
          <Link href="/" className="flex items-center gap-2 text-sm font-semibold">
            <BrandMark />
            {siteConfig.name}
          </Link>
          <p className="mt-3 max-w-md text-sm text-muted-foreground">
            Production-ready shadcn blocks for SaaS landing pages and app screens.
          </p>
          {socialLinks.length > 0 ? (
            <div className="mt-4 flex items-center gap-3">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={item.href.startsWith("mailto:") ? undefined : "noreferrer"}
                  aria-label={item.label}
                  className="flex size-8 items-center justify-center rounded-full text-muted-foreground shadow-[var(--neo-flat)] transition-colors hover:text-foreground"
                >
                  <item.icon aria-hidden="true" className="size-4" />
                </a>
              ))}
            </div>
          ) : null}
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Product
          </p>
          <div className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
            {productLinks.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-foreground">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Resources
          </p>
          <div className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
            {resourceLinks.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-foreground">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="shadow-[var(--neo-inset-sm)]">
        <div className="mx-auto max-w-[68rem] px-5 py-4 text-center text-xs text-muted-foreground sm:px-8 lg:px-12 xl:px-16">
          © {new Date().getFullYear()} {siteConfig.name}. Built by Kartik.
        </div>
      </div>
    </footer>
  );
}
