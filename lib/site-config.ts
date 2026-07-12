const LOCAL_APP_URL = "http://localhost:3000";

function normalizeUrl(url: string) {
  try {
    return new URL(url).origin;
  } catch {
    throw new Error(`Invalid NEXT_PUBLIC_APP_URL: ${url}`);
  }
}

export function getAppUrl() {
  const configuredUrl =
    process.env.NEXT_PUBLIC_APP_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : undefined) ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined);

  if (configuredUrl) {
    return normalizeUrl(configuredUrl);
  }

  if (process.env.VERCEL || process.env.CI) {
    throw new Error(
      "NEXT_PUBLIC_APP_URL must be set to the production site URL.",
    );
  }

  return LOCAL_APP_URL;
}

// Central place for links that vary by deployment / haven't been set up yet.
// Leave a value as an empty string to hide that link in the footer entirely.
export const siteConfig = {
  name: "CodeBlocks",
  social: {
    x: "https://x.com/kartik_jain27",
    github: "https://github.com/kartik-jain27",
    email: "vvanshjain313@gmail.com",
  },
};
