import { AppShellOne } from "@/components/blocks/app-shell/app-shell-1";
import { AuthOne } from "@/components/blocks/auth/auth-1";
import { CtaOne } from "@/components/blocks/cta/cta-1";
import { DashboardOne } from "@/components/blocks/dashboard/dashboard-1";
import { FeaturesOne } from "@/components/blocks/features/features-1";
import { HeroOne } from "@/components/blocks/hero/hero-1";
import { HeroTwo } from "@/components/blocks/hero/hero-2";
import { PricingOne } from "@/components/blocks/pricing/pricing-1";

const blockPreviewMap = {
  "app-shell-1": AppShellOne,
  "auth-1": AuthOne,
  "cta-1": CtaOne,
  "dashboard-1": DashboardOne,
  "features-1": FeaturesOne,
  "hero-1": HeroOne,
  "hero-2": HeroTwo,
  "pricing-1": PricingOne,
};

interface BlockPreviewRendererProps {
  slug: string;
}

export function BlockPreviewRenderer({ slug }: BlockPreviewRendererProps) {
  const Preview = blockPreviewMap[slug as keyof typeof blockPreviewMap];

  if (!Preview) {
    return null;
  }

  return <Preview />;
}
