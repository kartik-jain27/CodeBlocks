import { notFound } from "next/navigation";

import { BlockPreviewRenderer } from "@/components/block-preview-renderer";
import { PreviewThemeSync } from "@/app/preview/preview-theme-sync";
import { blocksRegistry, getBlockRegistry } from "@/lib/blocks-registry";

interface PreviewPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return blocksRegistry.map((block) => ({
    slug: block.name,
  }));
}

export default async function PreviewPage({ params }: PreviewPageProps) {
  const { slug } = await params;
  const block = getBlockRegistry(slug);

  if (!block) {
    notFound();
  }

  return (
    <PreviewThemeSync>
      <main className="min-h-screen bg-background text-foreground">
        <BlockPreviewRenderer slug={block.name} />
      </main>
    </PreviewThemeSync>
  );
}
