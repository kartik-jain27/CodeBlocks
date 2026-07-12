import { getAppUrl } from "@/lib/site-config";

export type BlockCategory =
  | "hero"
  | "features"
  | "pricing"
  | "auth"
  | "cta"
  | "dashboard"
  | "app-shell";

export interface RegistryFile {
  path: string;
  type: "registry:component";
}

export interface BlockRegistryItem {
  name: string;
  type: "registry:block";
  title: string;
  description: string;
  isPro: boolean;
  category: BlockCategory;
  dependencies: string[];
  registryDependencies: string[];
  files: RegistryFile[];
}

export interface BlockCategoryConfig {
  slug: BlockCategory;
  label: string;
  description: string;
}

export const blockCategories: BlockCategoryConfig[] = [
  {
    slug: "hero",
    label: "Hero",
    description: "Above-the-fold sections for SaaS landing pages.",
  },
  {
    slug: "features",
    label: "Features",
    description: "Feature grids and product value sections.",
  },
  {
    slug: "pricing",
    label: "Pricing",
    description: "Conversion-focused pricing tables.",
  },
  {
    slug: "auth",
    label: "Auth",
    description: "Authentication forms for sign in and sign up flows.",
  },
  {
    slug: "cta",
    label: "CTA",
    description: "Upgrade prompts and email capture sections.",
  },
  {
    slug: "dashboard",
    label: "Dashboard",
    description: "App-ready metrics, activity, and reporting blocks.",
  },
  {
    slug: "app-shell",
    label: "App Shell",
    description: "Sidebar and header layouts for logged-in products.",
  },
];

export const blocksRegistry: BlockRegistryItem[] = [
  {
    name: "hero-1",
    type: "registry:block",
    title: "Centered SaaS Hero",
    description:
      "A centered landing-page hero with a badge, strong headline, supporting copy, and two CTAs.",
    isPro: false,
    category: "hero",
    dependencies: [],
    registryDependencies: ["button", "badge"],
    files: [
      {
        path: "components/blocks/hero/hero-1.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "hero-2",
    type: "registry:block",
    title: "Split Product Hero",
    description:
      "A split hero layout with product copy, trust badges, and a responsive mockup panel.",
    isPro: false,
    category: "hero",
    dependencies: ["lucide-react"],
    registryDependencies: ["button", "badge", "card"],
    files: [
      {
        path: "components/blocks/hero/hero-2.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "pricing-1",
    type: "registry:block",
    title: "Three-Tier Pricing",
    description:
      "A three-column pricing section with a billing toggle and clear plan differentiation.",
    isPro: false,
    category: "pricing",
    dependencies: ["lucide-react"],
    registryDependencies: ["button", "badge", "card"],
    files: [
      {
        path: "components/blocks/pricing/pricing-1.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "auth-1",
    type: "registry:block",
    title: "Sign-In Card",
    description:
      "A polished sign-in form card with email, password, and social provider actions.",
    isPro: false,
    category: "auth",
    dependencies: ["lucide-react"],
    registryDependencies: ["button", "card", "input", "label", "separator"],
    files: [
      {
        path: "components/blocks/auth/auth-1.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "features-1",
    type: "registry:block",
    title: "SaaS Feature Grid",
    description:
      "A responsive two-by-three feature section for product capabilities and outcomes.",
    isPro: false,
    category: "features",
    dependencies: ["lucide-react"],
    registryDependencies: ["card"],
    files: [
      {
        path: "components/blocks/features/features-1.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "cta-1",
    type: "registry:block",
    title: "Email Capture CTA",
    description:
      "A full-width call-to-action section with audience-focused copy and email capture.",
    isPro: true,
    category: "cta",
    dependencies: ["lucide-react"],
    registryDependencies: ["button", "input", "badge"],
    files: [
      {
        path: "components/blocks/cta/cta-1.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "dashboard-1",
    type: "registry:block",
    title: "Founder Metrics Dashboard",
    description:
      "A dashboard block with KPI cards, a simple chart, and recent customer activity.",
    isPro: true,
    category: "dashboard",
    dependencies: ["lucide-react"],
    registryDependencies: ["badge", "card"],
    files: [
      {
        path: "components/blocks/dashboard/dashboard-1.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "app-shell-1",
    type: "registry:block",
    title: "SaaS App Shell",
    description:
      "A complete sidebar, header, and main-content shell for authenticated products.",
    isPro: true,
    category: "app-shell",
    dependencies: ["lucide-react"],
    registryDependencies: ["button", "badge"],
    files: [
      {
        path: "components/blocks/app-shell/app-shell-1.tsx",
        type: "registry:component",
      },
    ],
  },
];

export function getBlockRegistry(name: string) {
  return blocksRegistry.find((block) => block.name === name);
}

export function getBlocksByCategory(category: BlockCategory) {
  return blocksRegistry.filter((block) => block.category === category);
}

export function getCategory(category: string) {
  return blockCategories.find((item) => item.slug === category);
}

export function getInstallCommand(block: BlockRegistryItem) {
  const appUrl = getAppUrl();
  const endpoint = block.isPro ? `/r/pro/${block.name}` : `/r/${block.name}`;

  return `npx shadcn@latest add ${appUrl}${endpoint}`;
}
