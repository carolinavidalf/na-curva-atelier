-- Variable-length rental blocks (default remains 5 days for standard rentals)
alter table public.reservations
  add column if not exists days integer not null default 5 check (days >= 1 and days <= 60);
