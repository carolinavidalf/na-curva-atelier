import type { Dress } from "@/lib/dresses";
import type { Translation } from "./translations";

export function localizedDress(dress: Dress, t: Translation) {
  const copy = t.dresses[dress.slug];
  return {
    ...dress,
    name: copy.name,
    description: copy.description,
    details: copy.details,
    occasionLabels: dress.occasions.map((key) => t.occasions[key]),
  };
}
