import dress1 from "@/assets/dress-1.jpg";
import dress2 from "@/assets/dress-2.jpg";
import dress3 from "@/assets/dress-3.jpg";
import dress4 from "@/assets/dress-4.jpg";
import dress5 from "@/assets/dress-5.jpg";
import dress6 from "@/assets/dress-6.jpg";
import dress7 from "@/assets/dress-7.jpg";
import dress8 from "@/assets/dress-8.jpg";

export type Occasion =
  | "Wedding Guest"
  | "Black Tie"
  | "Summer Event"
  | "Party"
  | "Dinner"
  | "Holiday";

export const OCCASIONS: Occasion[] = [
  "Wedding Guest",
  "Black Tie",
  "Summer Event",
  "Party",
  "Dinner",
  "Holiday",
];

export const SIZES = ["XS", "S", "M", "L"] as const;
export type Size = (typeof SIZES)[number];

export interface Dress {
  slug: string;
  name: string;
  designer: string;
  price: number; // EUR per rental
  retail: number;
  sizes: Size[];
  occasions: Occasion[];
  image: string;
  description: string;
  details: string[];
  available: boolean;
}

export const DRESSES: Dress[] = [
  {
    slug: "the-bias-slip",
    name: "The Bias Slip",
    designer: "Galvan",
    price: 95,
    retail: 720,
    sizes: ["XS", "S", "M"],
    occasions: ["Black Tie", "Dinner", "Party"],
    image: dress1,
    description:
      "A column of liquid black silk cut on the true bias. The kind of dress that asks nothing of you and gives everything back.",
    details: [
      "100% silk crêpe",
      "Bias-cut floor length",
      "Adjustable straps",
      "Dry clean only — included",
    ],
    available: true,
  },
  {
    slug: "the-poplin-shirt-dress",
    name: "The Poplin Shirt Dress",
    designer: "Toteme",
    price: 65,
    retail: 480,
    sizes: ["S", "M", "L"],
    occasions: ["Dinner", "Holiday", "Summer Event"],
    image: dress2,
    description:
      "An oversized ivory poplin in the spirit of effortless sophistication. Pair it with leather sandals or never take it off.",
    details: [
      "Organic cotton poplin",
      "Relaxed oversized fit",
      "Mother-of-pearl buttons",
      "Mid-calf length",
    ],
    available: true,
  },
  {
    slug: "the-burgundy-gown",
    name: "The Burgundy Gown",
    designer: "Bernadette",
    price: 140,
    retail: 1180,
    sizes: ["XS", "S", "M"],
    occasions: ["Black Tie", "Wedding Guest"],
    image: dress3,
    description:
      "Deep burgundy satin shaped into a one-shoulder gown with a fluid mermaid sweep. Made for evenings that matter.",
    details: [
      "Duchess satin",
      "One-shoulder neckline",
      "Sweeping train",
      "Hidden back zip",
    ],
    available: true,
  },
  {
    slug: "the-olive-linen",
    name: "The Olive Linen",
    designer: "Matteau",
    price: 70,
    retail: 540,
    sizes: ["XS", "S", "M", "L"],
    occasions: ["Summer Event", "Holiday", "Dinner"],
    image: dress4,
    description:
      "Sun-faded olive linen with a relaxed gathered waist. For long lunches in the Algarve and slow walks home.",
    details: [
      "European linen",
      "Adjustable spaghetti straps",
      "Patch pockets",
      "Ankle length",
    ],
    available: true,
  },
  {
    slug: "the-tuxedo-mini",
    name: "The Tuxedo Mini",
    designer: "The Frankie Shop",
    price: 85,
    retail: 620,
    sizes: ["XS", "S", "M"],
    occasions: ["Party", "Dinner", "Black Tie"],
    image: dress5,
    description:
      "A single-breasted blazer reimagined as a sharply tailored mini. Confident, modern, undeniably elegant.",
    details: [
      "Italian wool blend",
      "Single-button closure",
      "Pressed lapels",
      "Fully lined",
    ],
    available: true,
  },
  {
    slug: "the-tiered-sun-dress",
    name: "The Tiered Sun Dress",
    designer: "Sleeper",
    price: 60,
    retail: 395,
    sizes: ["S", "M", "L"],
    occasions: ["Summer Event", "Holiday", "Wedding Guest"],
    image: dress6,
    description:
      "Soft butter cotton with delicate gathered tiers. A dress that catches the light and the breeze in equal measure.",
    details: [
      "Cotton voile",
      "Tiered gathered skirt",
      "Self-tie sash",
      "Midi length",
    ],
    available: false,
  },
  {
    slug: "the-champagne-slip",
    name: "The Champagne Slip",
    designer: "Rixo",
    price: 110,
    retail: 850,
    sizes: ["XS", "S", "M"],
    occasions: ["Black Tie", "Party", "Wedding Guest"],
    image: dress7,
    description:
      "A champagne sequin slip that moves like water. For the moment you want to be looked at and seen at the same time.",
    details: [
      "Hand-applied sequins",
      "Silk satin lining",
      "Adjustable straps",
      "Midi length",
    ],
    available: true,
  },
  {
    slug: "the-cacao-wrap",
    name: "The Cacao Wrap",
    designer: "Diane von Furstenberg",
    price: 75,
    retail: 580,
    sizes: ["XS", "S", "M", "L"],
    occasions: ["Dinner", "Wedding Guest", "Holiday"],
    image: dress8,
    description:
      "A true silk wrap in deep cacao — the most flattering dress ever made, in the warmest colour of the season.",
    details: [
      "100% silk",
      "Self-tie wrap closure",
      "Long sleeves",
      "Floor length",
    ],
    available: true,
  },
];

export function getDress(slug: string): Dress | undefined {
  return DRESSES.find((d) => d.slug === slug);
}
