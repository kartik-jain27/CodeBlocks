const WINDOW_MS = 60_000;
const buckets = new Map<string, { count: number; resetAt: number }>();

// In-memory rate limiting resets on server restart and is not shared across
// multiple instances. That is acceptable while CodeBlocks is single-instance;
// revisit this with Upstash Redis if the app moves to multiple regions.
export function checkRateLimit(
  key: string,
  limit: number,
): { allowed: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || now > bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (bucket.count >= limit) {
    return {
      allowed: false,
      retryAfterSeconds: Math.ceil((bucket.resetAt - now) / 1000),
    };
  }

  bucket.count += 1;
  return { allowed: true, retryAfterSeconds: 0 };
}
