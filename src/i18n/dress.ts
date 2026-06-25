import type { Dress, DressWithTranslations } from "@/lib/dresses";
import type { Locale, Translation } from "./translations";

export function localizeDress(
  dress: DressWithTranslations,
  locale: Locale,
  t: Translation,
): Dress {
  const copy =
    dress.translations[locale] ??
    dress.translations.pt ??
    dress.translations.en ??
    t.dresses[dress.slug as keyof typeof t.dresses];

  if (!copy) {
    throw new Error(`Missing dress copy for slug "${dress.slug}"`);
  }

  return {
    slug: dress.slug,
    designer: dress.designer,
    price: dress.price,
    retail: dress.retail,
    sizes: dress.sizes,
    occasions: dress.occasions,
    available: dress.available,
    sortOrder: dress.sortOrder,
    image: dress.image,
    name: copy.name,
    description: copy.description,
    details: copy.details,
    occasionLabels: dress.occasions.map((key) => t.occasions[key]),
  };
}
