import type { Locale } from "@/i18n/translations";
import { toDateKey } from "@/lib/reserved-dates";

export const RENTAL_DAYS = 5;

export function parseDateKey(key: string): Date {
  const [year, month, day] = key.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function addDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

export function getRentalPeriodKeys(start: Date): string[] {
  return Array.from({ length: RENTAL_DAYS }, (_, index) => {
    const day = addDays(start, index);
    return toDateKey(day.getFullYear(), day.getMonth(), day.getDate());
  });
}

export function getRentalEndDate(start: Date): Date {
  return addDays(start, RENTAL_DAYS - 1);
}

export function formatRentalDate(date: Date, locale: Locale): string {
  const intlLocale = locale === "pt" ? "pt-PT" : "en-GB";
  return new Intl.DateTimeFormat(intlLocale, {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function formatRentalDateWhatsApp(date: Date, locale: Locale): string {
  if (locale === "pt") {
    return new Intl.DateTimeFormat("pt-PT", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  }

  return formatRentalDate(date, locale);
}

export function isRentalStartValid(
  start: Date,
  today: Date,
  reserved: Set<string>,
): boolean {
  if (start < today) return false;

  return getRentalPeriodKeys(start).every((key) => {
    const [year, month, day] = key.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    return date >= today && !reserved.has(key);
  });
}
