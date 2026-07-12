import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";

const sections = [
  {
    title: "Use of CodeBlocks",
    body: "CodeBlocks provides reusable UI blocks and registry endpoints for building SaaS interfaces. You are responsible for reviewing, testing, and adapting any block before shipping it in your own product.",
  },
  {
    title: "Licensing",
    body: "Free blocks can be used in personal and commercial projects. Pro blocks require an active purchase or license and must not be redistributed as a competing block library or registry.",
  },
  {
    title: "Accounts and access",
    body: "You are responsible for keeping your account and registry token secure. If a token is exposed, rotate it from your account page before using private registry installs again.",
  },
  {
    title: "Payments and refunds",
    body: "Paid access is processed by our payment provider. Refund requests are reviewed case by case based on the purchase, usage, and applicable payment-provider rules.",
  },
  {
    title: "Availability",
    body: "We aim to keep the registry available, but access can be interrupted by maintenance, provider outages, or abuse-prevention limits.",
  },
];

export default function TermsPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-background px-4 py-14 sm:px-6 lg:px-8">
        <section className="mx-auto max-w-3xl">
          <p className="text-sm font-semibold text-muted-foreground">Terms</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-normal sm:text-5xl">
            Terms of service
          </h1>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            These starter terms explain the basic rules for using CodeBlocks.
            Review them with a legal professional before relying on them for a
            live paid product.
          </p>

          <div className="mt-10 space-y-4">
            {sections.map((section) => (
              <article
                key={section.title}
                className="rounded-2xl bg-surface p-6 shadow-[var(--neo-flat)]"
              >
                <h2 className="text-lg font-semibold">{section.title}</h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {section.body}
                </p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
