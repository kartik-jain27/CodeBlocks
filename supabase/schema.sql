-- Users table synced from Clerk and updated by Polar webhooks.
create table users (
  id uuid primary key default gen_random_uuid(),
  clerk_id text unique not null,
  email text not null,
  is_pro boolean default false,
  pro_purchased_at timestamptz,
  polar_customer_id text,
  registry_token text unique default gen_random_uuid()::text,
  created_at timestamptz default now()
);

-- Block favorites.
create table favorites (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  block_name text not null,
  created_at timestamptz default now(),
  unique(user_id, block_name)
);

alter table users enable row level security;
alter table favorites enable row level security;

create policy "Users can read own data"
  on users for select
  using (clerk_id = auth.uid());

create policy "Users can manage own favorites"
  on favorites for all
  using (
    user_id = (select id from users where clerk_id = auth.uid())
  );
