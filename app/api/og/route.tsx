import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

import { getBlockRegistry } from "@/lib/blocks-registry";

export const runtime = "edge";

export function GET(request: NextRequest) {
  const blockName = request.nextUrl.searchParams.get("block");
  const block = blockName ? getBlockRegistry(blockName) : null;
  const title = block?.title ?? "CodeBlocks";
  const description =
    block?.description ?? "Production-ready shadcn/ui blocks for SaaS products.";

  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#0d0d0b",
          color: "#f4f0df",
          display: "flex",
          fontFamily: "Inter, Arial, sans-serif",
          height: "100%",
          justifyContent: "center",
          padding: "72px",
          width: "100%",
        }}
      >
        <div
          style={{
            border: "1px solid #2b2a25",
            borderRadius: "36px",
            display: "flex",
            flexDirection: "column",
            gap: "28px",
            height: "100%",
            justifyContent: "center",
            padding: "56px",
            width: "100%",
          }}
        >
          <div style={{ color: "#c9c3ad", fontSize: 30, fontWeight: 700 }}>
            CodeBlocks
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            <div style={{ fontSize: 72, fontWeight: 800, letterSpacing: 0 }}>
              {title}
            </div>
            <div
              style={{
                color: "#c9c3ad",
                fontSize: 34,
                lineHeight: 1.35,
                maxWidth: 900,
              }}
            >
              {description}
            </div>
          </div>
          <div style={{ color: "#c9c3ad", fontSize: 28 }}>
            shadcn/ui blocks installable with one command
          </div>
        </div>
      </div>
    ),
    {
      height: 630,
      width: 1200,
    },
  );
}
