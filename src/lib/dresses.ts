import dress1 from "@/assets/dress-1.jpg";
import dress2 from "@/assets/dress-2.jpg";
import dress3 from "@/assets/dress-3.jpg";
import dress4 from "@/assets/dress-4.jpg";
import dress5 from "@/assets/dress-5.jpg";
import dress6 from "@/assets/dress-6.jpg";
import dress7 from "@/assets/dress-7.jpg";
import dress8 from "@/assets/dress-8.jpg";
import type { DressSlug, OccasionKey } from "@/i18n/translations";
import { OCCASION_KEYS } from "@/i18n/translations";

export type Occasion = OccasionKey;

export const OCCASIONS = OCCASION_KEYS;

export const SIZES = ["XS", "S", "M", "L"] as const;
export type Size = (typeof SIZES)[number];

export interface Dress {
  slug: DressSlug;
  designer: string;
  price: number;
  retail: number;
  sizes: Size[];
  occasions: OccasionKey[];
  image: string;
  available: boolean;
}

export const DRESSES: Dress[] = [
  {
    slug: "the-bias-slip",
    designer: "Galvan",
    price: 95,
    retail: 720,
    sizes: ["XS", "S", "M"],
    occasions: ["blackTie", "dinner", "party"],
    image: dress1,
    available: true,
  },
  {
    slug: "the-poplin-shirt-dress",
    designer: "Toteme",
    price: 65,
    retail: 480,
    sizes: ["S", "M", "L"],
    occasions: ["dinner", "holiday", "summerEvent"],
    image: dress2,
    available: true,
  },
  {
    slug: "the-burgundy-gown",
    designer: "Bernadette",
    price: 140,
    retail: 1180,
    sizes: ["XS", "S", "M"],
    occasions: ["blackTie", "weddingGuest"],
    image: dress3,
    available: true,
  },
  {
    slug: "the-olive-linen",
    designer: "Matteau",
    price: 70,
    retail: 540,
    sizes: ["XS", "S", "M", "L"],
    occasions: ["summerEvent", "holiday", "dinner"],
    image: dress4,
    available: true,
  },
  {
    slug: "the-tuxedo-mini",
    designer: "The Frankie Shop",
    price: 85,
    retail: 620,
    sizes: ["XS", "S", "M"],
    occasions: ["party", "dinner", "blackTie"],
    image: dress5,
    available: true,
  },
  {
    slug: "the-tiered-sun-dress",
    designer: "Sleeper",
    price: 60,
    retail: 395,
    sizes: ["S", "M", "L"],
    occasions: ["summerEvent", "holiday", "weddingGuest"],
    image: dress6,
    available: false,
  },
  {
    slug: "the-champagne-slip",
    designer: "Rixo",
    price: 110,
    retail: 850,
    sizes: ["XS", "S", "M"],
    occasions: ["blackTie", "party", "weddingGuest"],
    image: dress7,
    available: true,
  },
  {
    slug: "the-cacao-wrap",
    designer: "Diane von Furstenberg",
    price: 75,
    retail: 580,
    sizes: ["XS", "S", "M", "L"],
    occasions: ["dinner", "weddingGuest", "holiday"],
    image: dress8,
    available: true,
  },
];

export function getDress(slug: string): Dress | undefined {
  return DRESSES.find((d) => d.slug === slug);
}
