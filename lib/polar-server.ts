import { Polar } from "@polar-sh/sdk";

export function createPolarClient() {
  const accessToken = process.env.POLAR_ACCESS_TOKEN;

  if (!accessToken) {
    throw new Error("Missing POLAR_ACCESS_TOKEN.");
  }

  return new Polar({
    accessToken,
    server: process.env.NODE_ENV === "production" ? "production" : "sandbox",
  });
}
