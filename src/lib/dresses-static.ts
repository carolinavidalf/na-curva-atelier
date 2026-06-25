import dress1 from "@/assets/dress-1.jpg";
import dress2 from "@/assets/dress-2.jpg";
import dress3 from "@/assets/dress-3.jpg";
import dress4 from "@/assets/dress-4.jpg";
import dress5 from "@/assets/dress-5.jpg";
import dress6 from "@/assets/dress-6.jpg";
import dress7 from "@/assets/dress-7.jpg";
import dress8 from "@/assets/dress-8.jpg";
import { translations, type Locale } from "@/i18n/translations";
import type { DressCopy, DressRecord, DressWithTranslations } from "@/lib/dresses";

export const STATIC_IMAGE_BY_SLUG: Record<string, string> = {
  "the-bias-slip": dress1,
  "the-poplin-shirt-dress": dress2,
  "the-burgundy-gown": dress3,
  "the-olive-linen": dress4,
  "the-tuxedo-mini": dress5,
  "the-tiered-sun-dress": dress6,
  "the-champagne-slip": dress7,
  "the-cacao-wrap": dress8,
};

const STATIC_RECORDS: DressRecord[] = [
  {
    slug: "the-bias-slip",
    designer: "Galvan",
    price: 95,
    retail: 720,
    sizes: ["XS", "S", "M"],
    occasions: ["blackTie", "dinner", "party"],
    available: true,
    sortOrder: 1,
  },
  {
    slug: "the-poplin-shirt-dress",
    designer: "Toteme",
    price: 65,
    retail: 480,
    sizes: ["S", "M", "L"],
    occasions: ["dinner", "holiday", "summerEvent"],
    available: true,
    sortOrder: 2,
  },
  {
    slug: "the-burgundy-gown",
    designer: "Bernadette",
    price: 140,
    retail: 1180,
    sizes: ["XS", "S", "M"],
    occasions: ["blackTie", "weddingGuest"],
    available: true,
    sortOrder: 3,
  },
  {
    slug: "the-olive-linen",
    designer: "Matteau",
    price: 70,
    retail: 540,
    sizes: ["XS", "S", "M", "L"],
    occasions: ["summerEvent", "holiday", "dinner"],
    available: true,
    sortOrder: 4,
  },
  {
    slug: "the-tuxedo-mini",
    designer: "The Frankie Shop",
    price: 85,
    retail: 620,
    sizes: ["XS", "S", "M"],
    occasions: ["party", "dinner", "blackTie"],
    available: true,
    sortOrder: 5,
  },
  {
    slug: "the-tiered-sun-dress",
    designer: "Sleeper",
    price: 60,
    retail: 395,
    sizes: ["S", "M", "L"],
    occasions: ["summerEvent", "holiday", "weddingGuest"],
    available: false,
    sortOrder: 6,
  },
  {
    slug: "the-champagne-slip",
    designer: "Rixo",
    price: 110,
    retail: 850,
    sizes: ["XS", "S", "M"],
    occasions: ["blackTie", "party", "weddingGuest"],
    available: true,
    sortOrder: 7,
  },
  {
    slug: "the-cacao-wrap",
    designer: "Diane von Furstenberg",
    price: 75,
    retail: 580,
    sizes: ["XS", "S", "M", "L"],
    occasions: ["dinner", "weddingGuest", "holiday"],
    available: true,
    sortOrder: 8,
  },
];

function staticTranslationsForSlug(slug: string): Partial<Record<Locale, DressCopy>> {
  const pt = translations.pt.dresses[slug as keyof typeof translations.pt.dresses];
  const en = translations.en.dresses[slug as keyof typeof translations.en.dresses];
  const result: Partial<Record<Locale, DressCopy>> = {};
  if (pt) result.pt = pt;
  if (en) result.en = en;
  return result;
}

export function getStaticDressesWithTranslations(): DressWithTranslations[] {
  return STATIC_RECORDS.map((record) => ({
    ...record,
    image: STATIC_IMAGE_BY_SLUG[record.slug] ?? "",
    translations: staticTranslationsForSlug(record.slug),
  }));
}
