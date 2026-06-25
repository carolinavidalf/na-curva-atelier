import type { DressSlug } from "@/i18n/translations";
import { getRentalPeriodKeys, parseDateKey } from "@/lib/rental-period";

/** Mock reservation start dates per piece — replace with API data later. */
export const RESERVATION_STARTS_BY_SLUG: Partial<Record<DressSlug, string[]>> = {
  "the-bias-slip": ["2026-07-12", "2026-07-20", "2026-08-03"],
  "the-poplin-shirt-dress": ["2026-07-12", "2026-07-20", "2026-08-03"],
  "the-burgundy-gown": ["2026-07-18", "2026-08-03"],
  "the-olive-linen": ["2026-07-12", "2026-07-20", "2026-08-03"],
  "the-tuxedo-mini": ["2026-07-05", "2026-07-20"],
  "the-tiered-sun-dress": ["2026-07-12"],
  "the-champagne-slip": ["2026-07-12", "2026-07-20", "2026-08-03"],
  "the-cacao-wrap": ["2026-08-03"],
};

const DEFAULT_RESERVATION_STARTS = ["2026-07-12", "2026-07-20", "2026-08-03"];

export function getReservationStarts(slug: string): string[] {
  return RESERVATION_STARTS_BY_SLUG[slug as DressSlug] ?? DEFAULT_RESERVATION_STARTS;
}

/** All individual dates blocked by existing 5-day reservations. */
export function getReservedDates(slug: string): string[] {
  return expandReservationStarts(getReservationStarts(slug));
}

export function expandReservationStarts(starts: string[]): string[] {
  const keys = new Set<string>();
  for (const start of starts) {
    for (const key of getRentalPeriodKeys(parseDateKey(start))) {
      keys.add(key);
    }
  }
  return Array.from(keys);
}

export function toDateKey(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}
