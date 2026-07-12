import type { Metadata } from "next";
import Link from "next/link";

import { PageContainer } from "@/components/layout/page-container";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";

export const metadata: Metadata = {
  title: "Docs - CodeBlocks",
  description: "Set up the CodeBlocks registry and install blocks with the shadcn CLI.",
};

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="mt-4 overflow-x-auto rounded-2xl bg-surface p-5 font-mono text-xs leading-6 text-foreground shadow-[var(--neo-inset-sm)] sm:text-sm">
      <code>{children}</code>
    </pre>
  );
}

export default function DocsPage() {
  return (
    <>
      <SiteHeader />
      <PageContainer>
        <main className="mx-auto max-w-3xl min-w-0 py-16">
          <h1 className="text-4xl font-semibold text-foreground sm:text-5xl">
            Documentation
          </h1>
          <p className="mt-4 text-base text-muted-foreground">
            Everything you need to install CodeBlocks blocks into your project.
          </p>

          <section className="mt-12">
            <h2 className="text-2xl font-semibold text-foreground">
              Setup the CodeBlocks registry
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Add the CodeBlocks registry namespace to your{" "}
              <code className="rounded bg-surface-hover px-1.5 py-0.5 text-xs">
                components.json
              </code>
              . Learn more about registry config from the{" "}
              <a
                href="https://ui.shadcn.com/docs/registry"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-foreground underline underline-offset-4"
              >
                shadcn registry docs
              </a>
              .
            </p>
            <CodeBlock>
              {`{
  "registries": {
    "codeblocks": {
      "url": "https://codeblocks.dev/r/pro/{name}",
      "headers": {
        "Authorization": "Bearer <your-registry-token>"
      }
    }
  }
}`}
            </CodeBlock>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Your{" "}
              <Link href="/account" className="font-medium text-foreground underline underline-offset-4">
                account page
              </Link>{" "}
              has this exact snippet pre-filled with your real token — copy it
              from there rather than typing it by hand.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-semibold text-foreground">
              Free blocks
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Free blocks install directly with the shadcn CLI, no account or
              token required.
            </p>
            <CodeBlock>
              {`npx shadcn@latest add https://codeblocks.dev/r/hero-1`}
            </CodeBlock>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-semibold text-foreground">
              Pro blocks
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Pro blocks live under <code className="rounded bg-surface-hover px-1.5 py-0.5 text-xs">/r/pro/</code> and
              require your registry token, sent as a Bearer token:
            </p>
            <CodeBlock>
              {`npx shadcn@latest add https://codeblocks.dev/r/pro/dashboard-1 \\
  --header "Authorization: Bearer <your-registry-token>"`}
            </CodeBlock>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              If you set up the registry namespace above, you can install pro
              blocks with the shorter <code className="rounded bg-surface-hover px-1.5 py-0.5 text-xs">codeblocks/{"{name}"}</code>{" "}
              syntax instead, and the CLI applies the token automatically.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-semibold text-foreground">
              Browsing blocks
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Every block has its own install command on its category page under{" "}
              <Link href="/blocks" className="font-medium text-foreground underline underline-offset-4">
                Blocks
              </Link>{" "}
              — copy it straight from there rather than typing block names by
              hand.
            </p>
          </section>
        </main>
      </PageContainer>
      <SiteFooter />
    </>
  );
}
