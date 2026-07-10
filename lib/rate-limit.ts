import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const WINDOW_MS = 60_000;
const buckets = new Map<string, { count: number; resetAt: number }>();
const upstashLimiters = new Map<number, Ratelimit>();

interface RateLimitResult {
  allowed: boolean;
  retryAfterSeconds: number;
}

function hasUpstashConfig() {
  return Boolean(
    process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN,
  );
}

function getUpstashLimiter(limit: number) {
  const existing = upstashLimiters.get(limit);

  if (existing) {
    return existing;
  }

  const limiter = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(limit, "1 m"),
    prefix: `codeblocks:registry:${limit}`,
  });

  upstashLimiters.set(limit, limiter);
  return limiter;
}

function checkMemoryRateLimit(
  key: string,
  limit: number,
): RateLimitResult {
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

export async function checkRateLimit(
  key: string,
  limit: number,
): Promise<RateLimitResult> {
  if (!hasUpstashConfig()) {
    return checkMemoryRateLimit(key, limit);
  }

  let result: Awaited<ReturnType<Ratelimit["limit"]>>;

  try {
    result = await getUpstashLimiter(limit).limit(key);
  } catch {
    return checkMemoryRateLimit(key, limit);
  }

  if (result.success) {
    return { allowed: true, retryAfterSeconds: 0 };
  }

  return {
    allowed: false,
    retryAfterSeconds: Math.max(1, Math.ceil((result.reset - Date.now()) / 1000)),
  };
}
