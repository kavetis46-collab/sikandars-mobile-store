-- =====================================================================
-- SIKANDAR MOBILE STORE — SUPABASE POSTGRESQL SCHEMA + STORAGE + RLS
-- Run this SQL in your Supabase Dashboard SQL Editor to provision the
-- production cloud database alongside Storage buckets.
-- =====================================================================

-- 1. Inventory Products Table
create table if not exists public.products (
  id text primary key,
  slug text unique not null,
  name text not null,
  series text not null,
  generation integer not null default 16,
  form_factor text not null default 'Pro',
  ram text not null default '8GB RAM',
  badge text default 'Certified Pre-Owned',
  image text not null,
  gallery_images jsonb default '[]'::jsonb,
  colors jsonb default '[]'::jsonb,
  variants jsonb default '[]'::jsonb,
  specs jsonb default '{}'::jsonb,
  condition_grade text not null default 'Superb',
  battery_health text not null default '92% – 98% Health',
  warranty text not null default '6 Months Store Warranty + Bill',
  return_policy text not null default '7-Day Functional Verification Guarantee',
  accessories text not null default 'Original Box & Charging Cable',
  stock_count integer not null default 1,
  is_sold boolean not null default false,
  is_featured boolean not null default false,
  is_latest boolean not null default false,
  is_popular boolean not null default false,
  is_best_deal boolean not null default false,
  discount_percent integer not null default 0,
  display_price integer not null default 0,
  cashify_price integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 2. Phone Exchange Enquiries Table
create table if not exists public.exchange_enquiries (
  id text primary key,
  customer_name text not null,
  customer_phone text not null,
  brand text not null,
  model text not null,
  storage text not null,
  physical_condition text not null,
  battery_health text default '',
  accessories text default '',
  photo_urls jsonb default '[]'::jsonb,
  notes text default '',
  status text not null default 'pending',
  admin_notes text default '',
  created_at timestamptz not null default now()
);

-- 3. Customer Product / Contact Enquiries Table
create table if not exists public.customer_enquiries (
  id text primary key,
  customer_name text default '',
  customer_phone text not null,
  product_id text default '',
  product_name text default '',
  storage text default '',
  colour text default '',
  price text default '',
  message text default '',
  source text default 'website',
  status text not null default 'new',
  created_at timestamptz not null default now()
);

-- 4. Verified Customer Reviews Table
create table if not exists public.customer_reviews (
  id text primary key,
  name text not null,
  date text not null,
  rating integer not null default 5 check (rating >= 1 and rating <= 5),
  avatar text default '',
  badge text default 'Verified Buyer',
  device_purchased text default '',
  category text default 'iPhone Purchase',
  text text not null,
  likes integer not null default 0,
  verified_source text default 'Google Maps Verified',
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

-- 5. Shop Settings Singleton Table
create table if not exists public.shop_settings (
  id integer primary key default 1 check (id = 1),
  store_name text not null default 'Sikandar Mobile Store',
  tagline text not null default 'PREMIUM PHONES. SMARTER PRICES.',
  whatsapp text not null default '919700317171',
  phone text not null default '+91 9700317171',
  phone_raw text not null default '+919700317171',
  email text default '',
  address text not null default 'Chirag Ali Lane, Jagdish Market (Abids & Koti Junction), Hyderabad, Telangana - 500001',
  landmark text default 'Opp. Chirag Ali Lane Entrance, Jagdish Market',
  maps_url text not null default 'https://www.google.com/maps/search/?api=1&query=Sikandars+Mobile+Store+Jagdish+Market+Hyderabad&query_place_id=ChIJl2rsVn2XyzsR8pnP9WROa7E',
  instagram_url text default 'https://www.instagram.com/sikandarsmobilestore',
  hours_json jsonb default '[]'::jsonb,
  warranty_policy text not null default '6 Months Store Testing & Hardware Warranty on Certified Pre-Owned iPhones',
  return_policy text not null default '7-Day Functional Verification Replacement Window at Abids Showroom',
  updated_at timestamptz not null default now()
);

-- Enable Row Level Security
alter table public.products enable row level security;
alter table public.exchange_enquiries enable row level security;
alter table public.customer_enquiries enable row level security;
alter table public.customer_reviews enable row level security;
alter table public.shop_settings enable row level security;

-- Public Read Policies
create policy "Public read products" on public.products for select using (true);
create policy "Public read published reviews" on public.customer_reviews for select using (is_published = true);
create policy "Public read shop settings" on public.shop_settings for select using (true);

-- Public Enquiry Submissions
create policy "Public submit exchange enquiry" on public.exchange_enquiries for insert with check (true);
create policy "Public submit customer enquiry" on public.customer_enquiries for insert with check (true);

-- Admin Authenticated Full Access Policies
create policy "Admin manage products" on public.products for all using (auth.role() = 'authenticated');
create policy "Admin manage exchange enquiries" on public.exchange_enquiries for all using (auth.role() = 'authenticated');
create policy "Admin manage customer enquiries" on public.customer_enquiries for all using (auth.role() = 'authenticated');
create policy "Admin manage reviews" on public.customer_reviews for all using (auth.role() = 'authenticated');
create policy "Admin manage shop settings" on public.shop_settings for all using (auth.role() = 'authenticated');

-- Storage bucket for product & exchange photos
insert into storage.buckets (id, name, public)
values ('store-media', 'store-media', true)
on conflict (id) do nothing;

create policy "Public read store-media" on storage.objects for select using (bucket_id = 'store-media');
create policy "Public upload exchange photos" on storage.objects for insert with check (bucket_id = 'store-media');
create policy "Admin delete store-media" on storage.objects for delete using (bucket_id = 'store-media' and auth.role() = 'authenticated');
