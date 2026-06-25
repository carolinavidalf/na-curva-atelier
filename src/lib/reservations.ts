import type { DressSlug } from "@/i18n/translations";
import {
  getPeriodKeysForDays,
  getRentalPeriodKeys,
  parseDateKey,
  RENTAL_DAYS,
} from "@/lib/rental-period";
import { isSupabaseConfigured, supabaseFetch } from "@/lib/supabase";

export type ReservationBlock = {
  startDate: string;
  days: number;
};

const DEFAULT_RESERVATION_STARTS = ["2026-07-12", "2026-07-20", "2026-08-03"];

/** Mock reservation start dates per piece — used when Supabase is not configured. */
const STATIC_RESERVATION_STARTS_BY_SLUG: Partial<Record<DressSlug, string[]>> = {
  "the-bias-slip": ["2026-07-12", "2026-07-20", "2026-08-03"],
  "the-poplin-shirt-dress": ["2026-07-12", "2026-07-20", "2026-08-03"],
  "the-burgundy-gown": ["2026-07-18", "2026-08-03"],
  "the-olive-linen": ["2026-07-12", "2026-07-20", "2026-08-03"],
  "the-tuxedo-mini": ["2026-07-05", "2026-07-20"],
  "the-tiered-sun-dress": ["2026-07-12"],
  "the-champagne-slip": ["2026-07-12", "2026-07-20", "2026-08-03"],
  "the-cacao-wrap": ["2026-08-03"],
};

function getStaticReservationStarts(slug: string): string[] {
  return STATIC_RESERVATION_STARTS_BY_SLUG[slug as DressSlug] ?? DEFAULT_RESERVATION_STARTS;
}

export function blocksFromStarts(starts: string[], days = RENTAL_DAYS): ReservationBlock[] {
  return starts.map((startDate) => ({ startDate, days }));
}

async function fetchReservationBlocksFromSupabase(slug: string): Promise<ReservationBlock[]> {
  const { data: dress, error: dressError } = await supabaseFetch<{ id: string }[]>("dresses", {
    select: "id",
    slug: `eq.${slug}`,
    limit: "1",
  });

  const dressRow = dress?.[0];
  if (dressError || !dressRow) {
    console.error("[reservations] dress lookup failed:", dressError);
    return blocksFromStarts(getStaticReservationStarts(slug));
  }

  const { data: reservations, error: reservationError } = await supabaseFetch<
    { start_date: string; days?: number | null }[]
  >("reservations", {
    select: "start_date,days",
    dress_id: `eq.${dressRow.id}`,
    status: "eq.confirmed",
    order: "start_date.asc",
  });

  if (!reservationError && reservations) {
    return reservations.map((row) => ({
      startDate: row.start_date,
      days: row.days ?? RENTAL_DAYS,
    }));
  }

  if (reservationError && !reservationError.includes("days")) {
    console.error("[reservations] Supabase fetch failed:", reservationError);
    return blocksFromStarts(getStaticReservationStarts(slug));
  }

  const { data: startsOnly, error: startsError } = await supabaseFetch<{ start_date: string }[]>(
    "reservations",
    {
      select: "start_date",
      dress_id: `eq.${dressRow.id}`,
      status: "eq.confirmed",
      order: "start_date.asc",
    },
  );

  if (startsError || !startsOnly) {
    console.error("[reservations] Supabase fetch failed:", startsError ?? reservationError);
    return blocksFromStarts(getStaticReservationStarts(slug));
  }

  return startsOnly.map((row) => ({ startDate: row.start_date, days: RENTAL_DAYS }));
}

export async function getReservationBlocks(slug: string): Promise<ReservationBlock[]> {
  if (!isSupabaseConfigured()) {
    return blocksFromStarts(getStaticReservationStarts(slug));
  }

  return fetchReservationBlocksFromSupabase(slug);
}

/** @deprecated Use getReservationBlocks — kept for start-date-only callers */
export async function getReservationStarts(slug: string): Promise<string[]> {
  const blocks = await getReservationBlocks(slug);
  return blocks.map((block) => block.startDate);
}

export function expandReservationBlocks(blocks: ReservationBlock[]): string[] {
  const keys = new Set<string>();
  for (const block of blocks) {
    for (const key of getPeriodKeysForDays(parseDateKey(block.startDate), block.days)) {
      keys.add(key);
    }
  }
  return Array.from(keys);
}

/** @deprecated Use expandReservationBlocks */
export function expandReservationStarts(starts: string[]): string[] {
  return expandReservationBlocks(blocksFromStarts(starts));
}

/** All individual dates blocked by existing reservations. */
export async function getReservedDates(slug: string): Promise<string[]> {
  const blocks = await getReservationBlocks(slug);
  return expandReservationBlocks(blocks);
}

export function toDateKey(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export function findReservationBlockForDateKey(
  dateKey: string,
  blocks: ReservationBlock[],
): ReservationBlock | null {
  for (const block of blocks) {
    if (getPeriodKeysForDays(parseDateKey(block.startDate), block.days).includes(dateKey)) {
      return block;
    }
  }
  return null;
}

/** @deprecated Use findReservationBlockForDateKey */
export function findReservationStartForDateKey(
  dateKey: string,
  starts: string[],
): string | null {
  const block = findReservationBlockForDateKey(dateKey, blocksFromStarts(starts));
  return block?.startDate ?? null;
}

export function getPeriodKeysForBlock(block: ReservationBlock): string[] {
  return getPeriodKeysForDays(parseDateKey(block.startDate), block.days);
}

/** @deprecated Use getPeriodKeysForBlock */
export function getRentalPeriodKeysFromStart(startKey: string): string[] {
  return getRentalPeriodKeys(parseDateKey(startKey));
}
