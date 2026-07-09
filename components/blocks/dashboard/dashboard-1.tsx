import { ArrowUpRight, DollarSign, MousePointerClick, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface DashboardOneProps {
  title?: string;
  description?: string;
}

const stats = [
  {
    label: "Revenue",
    value: "$18.4K",
    delta: "+18%",
    icon: DollarSign,
  },
  {
    label: "Active users",
    value: "12,940",
    delta: "+9%",
    icon: Users,
  },
  {
    label: "Conversion",
    value: "7.8%",
    delta: "+2.1%",
    icon: MousePointerClick,
  },
];

const bars = [
  "h-16",
  "h-24",
  "h-20",
  "h-32",
  "h-28",
  "h-36",
  "h-32",
  "h-40",
];

const activity = [
  ["Acme Labs", "Upgraded to Pro", "$97"],
  ["Northstar", "Started trial", "$0"],
  ["Tupleworks", "Bought Team", "$297"],
  ["LunarDesk", "Installed hero-2", "$0"],
];

export function DashboardOne({
  title = "Growth dashboard",
  description = "Track the signals that matter after launch.",
}: DashboardOneProps) {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-3xl font-semibold tracking-normal">{title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{description}</p>
          </div>
          <Badge variant="secondary" className="w-fit">
            Live metrics
          </Badge>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <Card key={stat.label}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardDescription>{stat.label}</CardDescription>
                  <Icon aria-hidden="true" className="size-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-semibold">{stat.value}</div>
                  <div className="mt-2 flex items-center gap-1 text-sm text-muted-foreground">
                    <ArrowUpRight aria-hidden="true" className="size-4 text-foreground" />
                    {stat.delta} from last month
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        <div className="mt-4 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Revenue trend</CardTitle>
              <CardDescription>Last 8 weeks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-56 items-end gap-3 rounded-md bg-muted/40 p-4">
                {bars.map((height, index) => (
                  <div
                    key={`${height}-${index}`}
                    className={`flex-1 rounded-t-md bg-primary/80 ${height}`}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Recent activity</CardTitle>
              <CardDescription>Customers and product events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {activity.map(([customer, event, value]) => (
                  <div
                    key={`${customer}-${event}`}
                    className="flex items-center justify-between gap-3 rounded-md border p-3"
                  >
                    <div>
                      <div className="text-sm font-medium">{customer}</div>
                      <div className="text-xs text-muted-foreground">{event}</div>
                    </div>
                    <Badge variant="outline">{value}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
