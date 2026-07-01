import {
  Bell,
  Blocks,
  CreditCard,
  Home,
  LayoutDashboard,
  Search,
  Settings,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface AppShellOneProps {
  workspaceName?: string;
}

const navItems = [
  { label: "Home", icon: Home, active: true },
  { label: "Blocks", icon: Blocks, active: false },
  { label: "Dashboard", icon: LayoutDashboard, active: false },
  { label: "Billing", icon: CreditCard, active: false },
  { label: "Settings", icon: Settings, active: false },
];

export function AppShellOne({ workspaceName = "CodeBlocks" }: AppShellOneProps) {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-lg border border-border-muted bg-background">
        <div className="grid min-h-[620px] lg:grid-cols-[260px_1fr]">
          <aside className="border-b border-border-muted bg-surface p-4 lg:border-b-0 lg:border-r">
            <div className="flex items-center gap-2">
              <span className="flex size-9 items-center justify-center rounded-md border border-accent/30 bg-accent-subtle text-accent">
                <Blocks aria-hidden="true" className="size-5" />
              </span>
              <div>
                <div className="text-sm font-semibold">{workspaceName}</div>
                <div className="text-xs text-muted-foreground">Pro workspace</div>
              </div>
            </div>
            <nav className="mt-8 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;

                return (
                  <a
                    key={item.label}
                    href="#"
                    className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition ${
                      item.active
                        ? "bg-background text-foreground"
                        : "text-muted-foreground hover:bg-surface-hover hover:text-foreground"
                    }`}
                  >
                    <Icon aria-hidden="true" className="size-4" />
                    {item.label}
                  </a>
                );
              })}
            </nav>
          </aside>
          <main className="flex min-w-0 flex-col">
            <header className="flex flex-col gap-3 border-b border-border-muted p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold tracking-normal">Dashboard</h2>
                <p className="text-sm text-muted-foreground">Good morning, Kartik.</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" aria-label="Search">
                  <Search aria-hidden="true" />
                </Button>
                <Button variant="outline" size="icon" aria-label="Notifications">
                  <Bell aria-hidden="true" />
                </Button>
              </div>
            </header>
            <div className="grid gap-4 p-4 md:grid-cols-3">
              {["Free installs", "Pro installs", "Revenue"].map((item, index) => (
                <div key={item} className="rounded-lg border border-border-muted bg-surface p-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm text-muted-foreground">{item}</span>
                    {index === 1 ? <Badge variant="pro">Pro</Badge> : null}
                  </div>
                  <div className="mt-8 text-3xl font-semibold">
                    {["2,841", "594", "$18.4K"][index]}
                  </div>
                </div>
              ))}
            </div>
            <div className="grid flex-1 gap-4 p-4 pt-0 lg:grid-cols-[1fr_320px]">
              <div className="rounded-lg border border-border-muted bg-surface p-4">
                <div className="h-4 w-32 rounded bg-foreground/80" />
                <div className="mt-6 grid gap-3">
                  {["hero-2", "pricing-1", "dashboard-1", "app-shell-1"].map(
                    (block) => (
                      <div
                        key={block}
                        className="flex items-center justify-between rounded-md border border-border-muted bg-background p-3"
                      >
                        <span className="text-sm font-medium">{block}</span>
                        <span className="text-xs text-muted-foreground">Installed</span>
                      </div>
                    ),
                  )}
                </div>
              </div>
              <div className="rounded-lg border border-border-muted bg-surface p-4">
                <div className="h-4 w-28 rounded bg-foreground/80" />
                <div className="mt-6 space-y-3">
                  <div className="h-24 rounded-md bg-surface-hover" />
                  <div className="h-24 rounded-md bg-surface-hover" />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </section>
  );
}
