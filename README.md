# CodeBlocks

CodeBlocks is a freemium shadcn/ui block library for SaaS landing pages and app screens. It includes public registry endpoints for free blocks, token-gated registry endpoints for pro blocks, Clerk authentication, Supabase access flags, and Polar checkout/webhook wiring.

## Stack

- Next.js 15 App Router with TypeScript
- Tailwind CSS v4
- shadcn-style UI primitives
- Clerk authentication
- Supabase Postgres for users, pro flags, favorites, and registry tokens
- Polar for one-time Pro and Team purchases

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment

Copy `.env.example` to `.env.local` and fill in the values:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_WEBHOOK_SECRET=

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

POLAR_ACCESS_TOKEN=
POLAR_WEBHOOK_SECRET=
NEXT_PUBLIC_POLAR_PRO_PRODUCT_ID=
NEXT_PUBLIC_POLAR_TEAM_PRODUCT_ID=

NEXT_PUBLIC_APP_URL=http://localhost:3000
```

The app can render without local Clerk keys, but protected dashboard/account flows and webhooks need the real environment variables.

## Database

Run the SQL in `supabase/schema.sql` in your Supabase project. The `users` table stores Clerk IDs, emails, `is_pro`, Polar customer IDs, and registry tokens. The `favorites` table is ready for saved blocks.

## Registry

Free block endpoint:

```bash
npx shadcn@latest add http://localhost:3000/api/r/hero-1
```

Pro block endpoint:

```bash
npx shadcn@latest add http://localhost:3000/api/r/pro/dashboard-1
```

Pro requests must include:

```http
Authorization: Bearer <registry_token>
```

The registry index is available at `/api/registry.json`, and static registry item files are in `registry/`.

## Included V1 Blocks

- `hero-1` free
- `hero-2` free
- `pricing-1` free
- `auth-1` free
- `features-1` free
- `cta-1` pro
- `dashboard-1` pro
- `app-shell-1` pro

## Webhooks

Clerk user sync:

```text
/api/webhooks/clerk
```

Polar order unlock:

```text
/api/webhooks/polar
```

Configure Polar to send `order.created` events. The webhook marks the matching Supabase user as pro by email.
