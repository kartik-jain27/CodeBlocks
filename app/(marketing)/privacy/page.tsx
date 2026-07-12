import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";

const sections = [
  {
    title: "Information we collect",
    body: "When you create an account, we receive account details from Clerk such as your user ID, email address, and connected sign-in methods. If you purchase a plan, the payment provider handles checkout and sends us the access status needed to unlock Pro registry installs.",
  },
  {
    title: "How we use it",
    body: "We use account information to sign you in, show your registry access, issue or rotate registry tokens, and provide support for purchases or install issues.",
  },
  {
    title: "Third-party providers",
    body: "CodeBlocks depends on infrastructure providers for authentication, payments, data storage, and rate limiting. Those providers process data under their own policies and security controls.",
  },
  {
    title: "Data security",
    body: "Registry tokens should be treated like secrets. Store them only in trusted environments and rotate them if they are shared publicly or committed by mistake.",
  },
  {
    title: "Contact",
    body: "For privacy or account questions, contact the project owner through the email listed in the site footer.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-background px-4 py-14 sm:px-6 lg:px-8">
        <section className="mx-auto max-w-3xl">
          <p className="text-sm font-semibold text-muted-foreground">Privacy</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-normal sm:text-5xl">
            Privacy policy
          </h1>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            This starter policy summarizes how CodeBlocks handles account,
            access, and checkout data. Review it before launching paid traffic.
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
