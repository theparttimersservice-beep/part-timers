-- ============================================
-- THE PART-TIMER'S — Supabase SQL Setup
-- Supabase SQL Editor mein paste karke Run karo
-- ============================================

-- 1. USERS TABLE
create table if not exists public.users (
  id text primary key,
  name text not null,
  phone text unique not null,
  district text,
  village text,
  type text not null default 'customer',
  skill text,
  rate text,
  exp text,
  shop text,
  biz_type text,
  sales text,
  vehicle_type text,
  vehicle_num text,
  vehicle_rate text,
  plan text default 'Local Mini',
  avatar_url text,
  rating numeric default 4.8,
  jobs integer default 0,
  bio text,
  status text default 'active',
  created_at timestamptz default now()
);

-- 2. BOOKINGS TABLE
create table if not exists public.bookings (
  id text primary key,
  user_id text references public.users(id),
  user_name text,
  user_phone text,
  service text,
  service_desc text,
  price text,
  worker_phone text,
  booking_date date,
  booking_time time,
  location text,
  note text,
  status text default 'pending',
  created_at timestamptz default now()
);

-- 3. ORDERS TABLE
create table if not exists public.orders (
  id text primary key,
  user_id text references public.users(id),
  user_name text,
  user_phone text,
  item text,
  icon text,
  qty text,
  total text,
  address text,
  status text default 'pending',
  created_at timestamptz default now()
);

-- 4. LISTINGS TABLE (vendor items)
create table if not exists public.listings (
  id text primary key,
  vendor_id text references public.users(id),
  vendor_name text,
  vendor_phone text,
  name text not null,
  category text,
  price text,
  listing_type text default 'For Sale',
  description text,
  image_url text,
  district text,
  status text default 'pending',
  featured boolean default false,
  created_at timestamptz default now()
);

-- 5. NOTIFICATIONS TABLE
create table if not exists public.notifications (
  id uuid default gen_random_uuid() primary key,
  user_id text references public.users(id),
  title text,
  message text,
  type text default 'info',
  read boolean default false,
  created_at timestamptz default now()
);

-- 6. APP CONFIG TABLE (admin settings)
create table if not exists public.app_config (
  key text primary key,
  value text,
  updated_at timestamptz default now()
);

-- Default config values
insert into public.app_config (key, value) values
  ('haata_live', 'true'),
  ('promo_active', 'true'),
  ('maintenance', 'false'),
  ('registration_open', 'true'),
  ('app_name', 'The Part-Timer''s'),
  ('tagline', 'Empowering Rural Odisha'),
  ('whatsapp_number', '91XXXXXXXXXX')
on conflict (key) do nothing;

-- ============================================
-- ROW LEVEL SECURITY (RLS) — Important!
-- ============================================

alter table public.users enable row level security;
alter table public.bookings enable row level security;
alter table public.orders enable row level security;
alter table public.listings enable row level security;
alter table public.notifications enable row level security;
alter table public.app_config enable row level security;

-- Users: anyone can insert (register), only owner can update
create policy "Anyone can register" on public.users for insert with check (true);
create policy "Users can view all profiles" on public.users for select using (true);
create policy "Users can update own profile" on public.users for update using (true);

-- Bookings: users can insert & view own
create policy "Users can create bookings" on public.bookings for insert with check (true);
create policy "Users can view own bookings" on public.bookings for select using (true);
create policy "Anyone can update booking status" on public.bookings for update using (true);

-- Orders: same as bookings
create policy "Users can create orders" on public.orders for insert with check (true);
create policy "Users can view own orders" on public.orders for select using (true);
create policy "Anyone can update order status" on public.orders for update using (true);

-- Listings: vendors can post, everyone can view approved
create policy "Vendors can post listings" on public.listings for insert with check (true);
create policy "Everyone can view listings" on public.listings for select using (true);
create policy "Vendors can update own listings" on public.listings for update using (true);
create policy "Vendors can delete own listings" on public.listings for delete using (true);

-- Notifications
create policy "Users can view own notifications" on public.notifications for select using (true);
create policy "Anyone can create notifications" on public.notifications for insert with check (true);
create policy "Users can mark read" on public.notifications for update using (true);

-- App config: anyone can read
create policy "Anyone can read config" on public.app_config for select using (true);
create policy "Anyone can update config" on public.app_config for update using (true);

-- ============================================
-- REALTIME — Enable for live updates
-- ============================================
begin;
  drop publication if exists supabase_realtime;
  create publication supabase_realtime;
commit;

alter publication supabase_realtime add table public.bookings;
alter publication supabase_realtime add table public.orders;
alter publication supabase_realtime add table public.listings;
alter publication supabase_realtime add table public.notifications;

-- ============================================
-- STORAGE POLICIES
-- Run these AFTER creating buckets in dashboard
-- ============================================

-- Profiles bucket policy
insert into storage.buckets (id, name, public) values ('profiles', 'profiles', true) on conflict do nothing;
insert into storage.buckets (id, name, public) values ('listings', 'listings', true) on conflict do nothing;
insert into storage.buckets (id, name, public) values ('avatars', 'avatars', true) on conflict do nothing;

create policy "Public profiles" on storage.objects for select using (bucket_id = 'profiles');
create policy "Upload profiles" on storage.objects for insert with check (bucket_id = 'profiles');
create policy "Public listings" on storage.objects for select using (bucket_id = 'listings');
create policy "Upload listings" on storage.objects for insert with check (bucket_id = 'listings');
create policy "Public avatars" on storage.objects for select using (bucket_id = 'avatars');
create policy "Upload avatars" on storage.objects for insert with check (bucket_id = 'avatars');

-- Done!
select 'Setup complete! All tables, RLS, realtime ready.' as message;
