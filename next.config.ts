import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/api/r/**": ["./components/blocks/**/*.tsx"],
    "/blocks/**": ["./components/blocks/**/*.tsx"],
  },
};

export default nextConfig;
