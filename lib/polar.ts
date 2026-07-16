export const pricingTiers = [
  {
    name: "Hobby",
    price: "$0",
    description: "Start with free blocks and shadcn CLI installs.",
    cta: "Browse free blocks",
    href: "/blocks",
    featured: false,
    features: [
      "5 free blocks",
      "Public CLI install endpoints",
      "Commercial use for free blocks",
      "Preview and copy source",
    ],
  },
  {
    name: "Pro",
    price: "$89",
    description: "Lifetime access to every pro block in CodeBlocks.",
    cta: "Unlock Pro",
    href: getPolarCheckoutUrl(process.env.NEXT_PUBLIC_POLAR_PRO_PRODUCT_ID),
    featured: true,
    features: [
      "3 pro blocks today",
      "Future pro blocks included",
      "Commercial license",
      "Registry token for pro installs",
    ],
  },
  {
    name: "Team",
    price: "",
    description: "A shared license for small product teams.",
    cta: "Coming soon",
    href: "/pricing",
    featured: false,
    comingSoon: true,
    features: [
      "Everything in Pro",
      "5 seats",
      "Shared commercial license",
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
