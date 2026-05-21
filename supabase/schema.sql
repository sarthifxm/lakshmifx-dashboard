create table if not exists profiles (
  id uuid primary key,
  full_name text,
  role text default 'investor',
  telegram_chat_id text,
  whatsapp_number text,
  created_at timestamp with time zone default timezone('utc', now())
);

create table if not exists trading_accounts (
  id bigserial primary key,
  profile_id uuid references profiles(id) on delete cascade,
  broker_name text,
  platform text default 'myfxbook',
  account_number text,
  account_name text,
  base_currency text default 'USD',
  created_at timestamp with time zone default timezone('utc', now())
);

create table if not exists equity_snapshots (
  id bigserial primary key,
  trading_account_id bigint references trading_accounts(id) on delete cascade,
  balance numeric,
  equity numeric,
  drawdown numeric,
  snapshot_at timestamp with time zone default timezone('utc', now())
);

create table if not exists trades (
  id bigserial primary key,
  trading_account_id bigint references trading_accounts(id) on delete cascade,
  symbol text,
  side text,
  lot numeric,
  open_price numeric,
  close_price numeric,
  profit numeric,
  status text default 'open',
  opened_at timestamp with time zone,
  closed_at timestamp with time zone
);