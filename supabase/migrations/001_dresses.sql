-- Na Curva dress catalog
-- Run in Supabase SQL Editor (Dashboard → SQL → New query)

create extension if not exists "pgcrypto";

create table if not exists public.dresses (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  designer text not null,
  price integer not null check (price >= 0),
  retail integer not null check (retail >= 0),
  sizes text[] not null default '{}',
  occasions text[] not null default '{}',
  image_url text not null,
  available boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.dress_translations (
  dress_id uuid not null references public.dresses (id) on delete cascade,
  locale text not null check (locale in ('pt', 'en')),
  name text not null,
  description text not null,
  details text[] not null default '{}',
  primary key (dress_id, locale)
);

create table if not exists public.reservations (
  id uuid primary key default gen_random_uuid(),
  dress_id uuid not null references public.dresses (id) on delete cascade,
  start_date date not null,
  status text not null default 'confirmed' check (status in ('confirmed', 'pending', 'cancelled')),
  created_at timestamptz not null default now(),
  unique (dress_id, start_date)
);

create index if not exists dresses_sort_order_idx on public.dresses (sort_order);
create index if not exists reservations_dress_id_idx on public.reservations (dress_id);
create index if not exists reservations_start_date_idx on public.reservations (start_date);

alter table public.dresses enable row level security;
alter table public.dress_translations enable row level security;
alter table public.reservations enable row level security;

create policy "Public read dresses"
  on public.dresses for select
  to anon, authenticated
  using (true);

create policy "Public read dress translations"
  on public.dress_translations for select
  to anon, authenticated
  using (true);

create policy "Public read confirmed reservations"
  on public.reservations for select
  to anon, authenticated
  using (status = 'confirmed');

-- Storage bucket for dress photos (create in Dashboard → Storage if this fails)
insert into storage.buckets (id, name, public)
values ('dress-images', 'dress-images', true)
on conflict (id) do nothing;

create policy "Public read dress images"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'dress-images');

-- Seed catalog (idempotent on slug)
insert into public.dresses (slug, designer, price, retail, sizes, occasions, image_url, available, sort_order)
values
  ('the-bias-slip', 'Galvan', 95, 720, array['XS','S','M'], array['blackTie','dinner','party'], 'the-bias-slip.jpg', true, 1),
  ('the-poplin-shirt-dress', 'Toteme', 65, 480, array['S','M','L'], array['dinner','holiday','summerEvent'], 'the-poplin-shirt-dress.jpg', true, 2),
  ('the-burgundy-gown', 'Bernadette', 140, 1180, array['XS','S','M'], array['blackTie','weddingGuest'], 'the-burgundy-gown.jpg', true, 3),
  ('the-olive-linen', 'Matteau', 70, 540, array['XS','S','M','L'], array['summerEvent','holiday','dinner'], 'the-olive-linen.jpg', true, 4),
  ('the-tuxedo-mini', 'The Frankie Shop', 85, 620, array['XS','S','M'], array['party','dinner','blackTie'], 'the-tuxedo-mini.jpg', true, 5),
  ('the-tiered-sun-dress', 'Sleeper', 60, 395, array['S','M','L'], array['summerEvent','holiday','weddingGuest'], 'the-tiered-sun-dress.jpg', false, 6),
  ('the-champagne-slip', 'Rixo', 110, 850, array['XS','S','M'], array['blackTie','party','weddingGuest'], 'the-champagne-slip.jpg', true, 7),
  ('the-cacao-wrap', 'Diane von Furstenberg', 75, 580, array['XS','S','M','L'], array['dinner','weddingGuest','holiday'], 'the-cacao-wrap.jpg', true, 8)
on conflict (slug) do update set
  designer = excluded.designer,
  price = excluded.price,
  retail = excluded.retail,
  sizes = excluded.sizes,
  occasions = excluded.occasions,
  image_url = excluded.image_url,
  available = excluded.available,
  sort_order = excluded.sort_order,
  updated_at = now();

insert into public.dress_translations (dress_id, locale, name, description, details)
select d.id, v.locale, v.name, v.description, v.details
from public.dresses d
join (
  values
    ('the-bias-slip', 'pt', 'O Slip em Bias', 'Uma coluna de seda preta líquida cortada no verdadeiro bias. O tipo de vestido que não te pede nada e dá-te tudo.', array['100% crêpe de seda','Comprimento até ao chão em bias','Alças ajustáveis','Limpeza a seco incluída']),
    ('the-bias-slip', 'en', 'The Bias Slip', 'A column of liquid black silk cut on the true bias. The kind of dress that asks nothing of you and gives everything back.', array['100% silk crêpe','Bias-cut floor length','Adjustable straps','Dry clean only — included']),
    ('the-poplin-shirt-dress', 'pt', 'O Vestido Camiseiro em Popeline', 'Um popeline oversized em marfim no espírito da sofisticação sem esforço. Com sandálias de couro ou para nunca tirar.', array['Popeline de algodão orgânico','Corte oversized relaxado','Botões em madrepérola','Comprimento mid-calf']),
    ('the-poplin-shirt-dress', 'en', 'The Poplin Shirt Dress', 'An oversized ivory poplin in the spirit of effortless sophistication. Pair it with leather sandals or never take it off.', array['Organic cotton poplin','Relaxed oversized fit','Mother-of-pearl buttons','Mid-calf length']),
    ('the-burgundy-gown', 'pt', 'O Vestido Borgonha', 'Cetim borgonha profundo moldado num vestido de um ombro com cauda fluida. Feito para noites que importam.', array['Cetim duchesse','Decote de um ombro','Cauda ampla','Fecho invisível nas costas']),
    ('the-burgundy-gown', 'en', 'The Burgundy Gown', 'Deep burgundy satin shaped into a one-shoulder gown with a fluid mermaid sweep. Made for evenings that matter.', array['Duchess satin','One-shoulder neckline','Sweeping train','Hidden back zip']),
    ('the-olive-linen', 'pt', 'O Linho Verde-Azeitona', 'Linho verde-azeitona desbotado pelo sol com cintura reunida relaxada. Para longos almoços no Algarve e caminhadas lentas para casa.', array['Linho europeu','Alças finas ajustáveis','Bolsos de patch','Comprimento no tornozelo']),
    ('the-olive-linen', 'en', 'The Olive Linen', 'Sun-faded olive linen with a relaxed gathered waist. For long lunches in the Algarve and slow walks home.', array['European linen','Adjustable spaghetti straps','Patch pockets','Ankle length']),
    ('the-tuxedo-mini', 'pt', 'O Mini Smoking', 'Um blazer de um botão reimaginado como mini afiado. Confiante, moderno, inegavelmente elegante.', array['Mistura de lã italiana','Fecho de um botão','Lapelas pressionadas','Forro completo']),
    ('the-tuxedo-mini', 'en', 'The Tuxedo Mini', 'A single-breasted blazer reimagined as a sharply tailored mini. Confident, modern, undeniably elegant.', array['Italian wool blend','Single-button closure','Pressed lapels','Fully lined']),
    ('the-tiered-sun-dress', 'pt', 'O Vestido de Sol em Camadas', 'Algodão amanteigado macio com camadas delicadas reunidas. Um vestido que apanha a luz e a brisa em igual medida.', array['Voile de algodão','Saia em camadas reunidas','Faixa para atar','Comprimento midi']),
    ('the-tiered-sun-dress', 'en', 'The Tiered Sun Dress', 'Soft butter cotton with delicate gathered tiers. A dress that catches the light and the breeze in equal measure.', array['Cotton voile','Tiered gathered skirt','Self-tie sash','Midi length']),
    ('the-champagne-slip', 'pt', 'O Slip Champanhe', 'Um slip de lantejoulas champanhe que se move como água. Para o momento em que queres ser vista e olhada ao mesmo tempo.', array['Lantejoulas aplicadas à mão','Forro em cetim de seda','Alças ajustáveis','Comprimento midi']),
    ('the-champagne-slip', 'en', 'The Champagne Slip', 'A champagne sequin slip that moves like water. For the moment you want to be looked at and seen at the same time.', array['Hand-applied sequins','Silk satin lining','Adjustable straps','Midi length']),
    ('the-cacao-wrap', 'pt', 'O Wrap Cacau', 'Um verdadeiro wrap de seda em cacau profundo — o vestido mais favorecedor alguma vez feito, na cor mais quente da estação.', array['100% seda','Fecho wrap para atar','Mangas compridas','Comprimento até ao chão']),
    ('the-cacao-wrap', 'en', 'The Cacao Wrap', 'A true silk wrap in deep cacao — the most flattering dress ever made, in the warmest colour of the season.', array['100% silk','Self-tie wrap closure','Long sleeves','Floor length'])
) as v(slug, locale, name, description, details)
  on d.slug = v.slug
on conflict (dress_id, locale) do update set
  name = excluded.name,
  description = excluded.description,
  details = excluded.details;

insert into public.reservations (dress_id, start_date, status)
select d.id, v.start_date::date, 'confirmed'
from public.dresses d
join (
  values
    ('the-bias-slip', '2026-07-12'),
    ('the-bias-slip', '2026-07-20'),
    ('the-bias-slip', '2026-08-03'),
    ('the-poplin-shirt-dress', '2026-07-12'),
    ('the-poplin-shirt-dress', '2026-07-20'),
    ('the-poplin-shirt-dress', '2026-08-03'),
    ('the-burgundy-gown', '2026-07-18'),
    ('the-burgundy-gown', '2026-08-03'),
    ('the-olive-linen', '2026-07-12'),
    ('the-olive-linen', '2026-07-20'),
    ('the-olive-linen', '2026-08-03'),
    ('the-tuxedo-mini', '2026-07-05'),
    ('the-tuxedo-mini', '2026-07-20'),
    ('the-tiered-sun-dress', '2026-07-12'),
    ('the-champagne-slip', '2026-07-12'),
    ('the-champagne-slip', '2026-07-20'),
    ('the-champagne-slip', '2026-08-03'),
    ('the-cacao-wrap', '2026-08-03')
) as v(slug, start_date)
  on d.slug = v.slug
on conflict (dress_id, start_date) do nothing;
