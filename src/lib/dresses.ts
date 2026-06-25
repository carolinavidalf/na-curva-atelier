import type { Locale, OccasionKey } from "@/i18n/translations";
import { OCCASION_KEYS } from "@/i18n/translations";
import { getStaticDressesWithTranslations } from "@/lib/dresses-static";
import { getDressImagePublicUrl, isSupabaseConfigured, supabaseFetch } from "@/lib/supabase";

export type Occasion = OccasionKey;

export const OCCASIONS = OCCASION_KEYS;

export const SIZES = ["XS", "S", "M", "L"] as const;
export type Size = (typeof SIZES)[number];

export type DressCopy = {
  name: string;
  description: string;
  details: string[];
};

export type DressRecord = {
  slug: string;
  designer: string;
  price: number;
  retail: number;
  sizes: Size[];
  occasions: OccasionKey[];
  available: boolean;
  sortOrder: number;
};

export type DressWithTranslations = DressRecord & {
  image: string;
  translations: Partial<Record<Locale, DressCopy>>;
};

export type Dress = DressRecord & DressCopy & {
  image: string;
  occasionLabels: string[];
};

type DressTranslationRow = {
  locale: string;
  name: string;
  description: string;
  details: string[];
};

type DressRow = {
  slug: string;
  designer: string;
  price: number;
  retail: number;
  sizes: string[];
  occasions: string[];
  image_url: string;
  available: boolean;
  sort_order: number;
  dress_translations: DressTranslationRow[] | null;
};

function isOccasionKey(value: string): value is OccasionKey {
  return (OCCASION_KEYS as readonly string[]).includes(value);
}

function isSize(value: string): value is Size {
  return (SIZES as readonly string[]).includes(value);
}

function mapDressRow(row: DressRow): DressWithTranslations {
  const translations: Partial<Record<Locale, DressCopy>> = {};

  for (const entry of row.dress_translations ?? []) {
    if (entry.locale === "pt" || entry.locale === "en") {
      translations[entry.locale] = {
        name: entry.name,
        description: entry.description,
        details: entry.details,
      };
    }
  }

  return {
    slug: row.slug,
    designer: row.designer,
    price: row.price,
    retail: row.retail,
    sizes: row.sizes.filter(isSize),
    occasions: row.occasions.filter(isOccasionKey),
    available: row.available,
    sortOrder: row.sort_order,
    image: getDressImagePublicUrl(row.image_url, row.slug),
    translations,
  };
}

async function fetchDressesFromSupabase(): Promise<DressWithTranslations[]> {
  const { data, error } = await supabaseFetch<DressRow[]>("dresses", {
    select:
      "slug,designer,price,retail,sizes,occasions,image_url,available,sort_order,dress_translations(locale,name,description,details)",
    order: "sort_order.asc",
  });

  if (error || !data) {
    console.error("[dresses] Supabase fetch failed:", error);
    return getStaticDressesWithTranslations();
  }

  return data.map(mapDressRow);
}

export async function getDressesWithTranslations(): Promise<DressWithTranslations[]> {
  if (!isSupabaseConfigured()) {
    return getStaticDressesWithTranslations();
  }

  return fetchDressesFromSupabase();
}

export async function getDressWithTranslations(
  slug: string,
): Promise<DressWithTranslations | undefined> {
  const dresses = await getDressesWithTranslations();
  return dresses.find((dress) => dress.slug === slug);
}
