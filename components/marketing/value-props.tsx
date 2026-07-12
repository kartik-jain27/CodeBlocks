import { Blocks, Braces, Palette, Terminal } from "lucide-react";

const valueProps = [
  {
    icon: Blocks,
    title: "Real shadcn/ui registry",
    description:
      "Zero abstraction. Every block installs straight into your components folder — the code lives in your repo, not a hidden node_modules package.",
  },
  {
    icon: Palette,
    title: "Theme-aware by default",
    description:
      "Blocks inherit your project's CSS variables automatically, so light and dark mode just work without any manual restyling.",
  },
  {
    icon: Braces,
    title: "TypeScript-first",
    description:
      "Every block ships fully typed and built for the Next.js 15 App Router, so there's nothing to convert before you ship it.",
  },
  {
    icon: Terminal,
    title: "One-command installs",
    description:
      "Works with the shadcn CLI you already have. Copy the command from any block, run it, and it's wired into your project.",
  },
];

export function ValueProps() {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {valueProps.map((item) => (
        <div
          key={item.title}
          className="neo-raised rounded-2xl p-6 shadow-[var(--category-shadow)]"
        >
          <item.icon
            className="size-6 text-foreground"
            strokeWidth={1.75}
            aria-hidden="true"
          />
          <h3 className="mt-4 text-sm font-semibold text-foreground">
            {item.title}
          </h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {item.description}
          </p>
        </div>
      ))}
    </section>
  );
}
