export const pricingTiers = [
  {
    name: "Hobby",
    price: "$0",
    description: "Start with free blocks and shadcn CLI installs.",
    cta: "Browse free blocks",
    href: "/blocks",
    featured: false,
    features: [
      "40 free blocks roadmap",
      "CLI install endpoints",
      "Commercial use for free blocks",
      "GitHub source access",
    ],
  },
  {
    name: "Pro",
    price: "$97",
    description: "Lifetime access to every pro block in CodeBlocks.",
    cta: "Unlock Pro",
    href: getPolarCheckoutUrl(process.env.NEXT_PUBLIC_POLAR_PRO_PRODUCT_ID),
    featured: true,
    features: [
      "200+ blocks roadmap",
      "Lifetime updates",
      "Commercial license",
      "Registry token for pro installs",
    ],
  },
  {
    name: "Team",
    price: "$297",
    description: "A shared license for small product teams.",
    cta: "Buy Team",
    href: getPolarCheckoutUrl(process.env.NEXT_PUBLIC_POLAR_TEAM_PRODUCT_ID),
    featured: false,
    features: [
      "Everything in Pro",
      "5 seats",
      "Team workspace roadmap",
      "Priority block requests",
    ],
  },
];

export function getPolarCheckoutUrl(productId?: string) {
  if (!productId) {
    return "/pricing";
  }

  return `https://buy.polar.sh/${productId}`;
}
