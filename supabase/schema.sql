-- Jalankan di Supabase SQL Editor.
create table if not exists public.wallets (
  user_id uuid primary key references auth.users(id) on delete cascade,
  balance bigint not null default 0 check (balance >= 0),
  updated_at timestamptz not null default now()
);

create table if not exists public.deposit_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  amount bigint not null check (amount >= 1000),
  payment_method text not null default 'gopay_manual',
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  transfer_note text,
  proof_path text,
  reviewed_by uuid references auth.users(id),
  reviewed_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.wallet_transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  amount bigint not null,
  type text not null check (type in ('deposit','purchase','refund','adjustment')),
  reference_id uuid,
  description text,
  created_at timestamptz not null default now()
);

create table if not exists public.otp_orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  supplier text not null default 'otpkan',
  supplier_order_id text unique,
  service text not null,
  country text not null,
  phone_number text,
  otp_code text,
  price bigint not null check (price >= 0),
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

-- Buat wallet otomatis untuk user baru.
create or replace function public.create_wallet_for_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.wallets(user_id) values(new.id) on conflict do nothing;
  return new;
end; $$;
drop trigger if exists on_auth_user_created_wallet on auth.users;
create trigger on_auth_user_created_wallet after insert on auth.users
for each row execute procedure public.create_wallet_for_user();

alter table public.wallets enable row level security;
alter table public.deposit_requests enable row level security;
alter table public.wallet_transactions enable row level security;
alter table public.otp_orders enable row level security;

create policy "read own wallet" on public.wallets for select to authenticated using (auth.uid() = user_id);
create policy "read own deposits" on public.deposit_requests for select to authenticated using (auth.uid() = user_id);
create policy "read own transactions" on public.wallet_transactions for select to authenticated using (auth.uid() = user_id);
create policy "read own otp orders" on public.otp_orders for select to authenticated using (auth.uid() = user_id);

-- Jangan izinkan client mengubah saldo, menyetujui deposit, atau menulis ledger.
-- Operasi admin wajib melalui server-side service role + validasi admin.
