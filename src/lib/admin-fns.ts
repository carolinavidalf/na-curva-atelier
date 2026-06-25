import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const adminAuth = z.object({ adminPassword: z.string().min(1) });

const dressCopySchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  details: z.array(z.string()),
});

const adminDressSchema = adminAuth.extend({
  slug: z.string().min(1),
  designer: z.string().min(1),
  price: z.number().int().min(0),
  retail: z.number().int().min(0),
  available: z.boolean(),
  translations: z.object({
    pt: dressCopySchema,
    en: dressCopySchema,
  }),
});

const adminReservationSchema = adminAuth.extend({
  slug: z.string().min(1),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  days: z.number().int().min(1).max(60),
});

const adminRemoveReservationSchema = adminAuth.extend({
  slug: z.string().min(1),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

type AdminConfig = { url: string; serviceKey: string };

type DressAdminRow = {
  id: string;
  slug: string;
  designer: string;
  price: number;
  retail: number;
  sizes: string[];
  occasions: string[];
  image_url: string;
  available: boolean;
  sort_order: number;
  dress_translations: {
    locale: string;
    name: string;
    description: string;
    details: string[];
  }[];
};

export type AdminDress = {
  id: string;
  slug: string;
  designer: string;
  price: number;
  retail: number;
  available: boolean;
  translations: {
    pt: { name: string; description: string; details: string[] };
    en: { name: string; description: string; details: string[] };
  };
};

function getAdminConfig(): AdminConfig {
  const url = (process.env.VITE_SUPABASE_URL ?? "").trim().replace(/\/$/, "");
  const serviceKey = (process.env.SUPABASE_SERVICE_ROLE_KEY ?? "").trim();

  if (!url || !serviceKey) {
    throw new Error(
      "Admin writes require VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.",
    );
  }

  return { url, serviceKey };
}

function assertAdmin(password: string) {
  const expected = process.env.ADMIN_PASSWORD?.trim();
  if (!expected) {
    throw new Error("Set ADMIN_PASSWORD in .env to use the admin panel.");
  }
  if (password !== expected) {
    throw new Error("Invalid password.");
  }
}

async function adminFetch<T>(
  method: string,
  path: string,
  options?: {
    searchParams?: Record<string, string>;
    body?: unknown;
    prefer?: string;
  },
): Promise<T> {
  const { url, serviceKey } = getAdminConfig();
  const query = options?.searchParams
    ? `?${new URLSearchParams(options.searchParams).toString()}`
    : "";

  const headers: Record<string, string> = {
    apikey: serviceKey,
    Authorization: `Bearer ${serviceKey}`,
    Accept: "application/json",
  };

  if (options?.body !== undefined) {
    headers["Content-Type"] = "application/json";
  }
  if (options?.prefer) {
    headers.Prefer = options.prefer;
  }

  const response = await fetch(`${url}/rest/v1/${path}${query}`, {
    method,
    headers,
    body: options?.body !== undefined ? JSON.stringify(options.body) : undefined,
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Supabase admin request failed (${response.status})`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  const text = await response.text();
  return text ? (JSON.parse(text) as T) : (undefined as T);
}

function isMissingDaysColumnError(message: string): boolean {
  return message.includes("days") && message.includes("does not exist");
}

function formatReservationError(message: string): string {
  try {
    const parsed = JSON.parse(message) as { code?: string; message?: string };
    if (parsed.code === "23505") {
      return "This start date is already blocked for this dress.";
    }
    if (isMissingDaysColumnError(parsed.message ?? message)) {
      return "Custom rental length requires a database update. In Supabase SQL Editor, run: alter table public.reservations add column if not exists days integer not null default 5 check (days >= 1 and days <= 60);";
    }
    if (parsed.message) return parsed.message;
  } catch {
    // not JSON
  }
  return message;
}

async function listAdminReservations(dressId: string): Promise<AdminReservation[]> {
  try {
    const rows = await adminFetch<{ start_date: string; days: number | null }[]>(
      "GET",
      "reservations",
      {
        searchParams: {
          select: "start_date,days",
          dress_id: `eq.${dressId}`,
          status: "eq.confirmed",
          order: "start_date.asc",
        },
      },
    );
    return rows.map((row) => ({
      startDate: row.start_date,
      days: row.days ?? 5,
    }));
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (!isMissingDaysColumnError(message)) {
      throw new Error(formatReservationError(message));
    }

    const rows = await adminFetch<{ start_date: string }[]>("GET", "reservations", {
      searchParams: {
        select: "start_date",
        dress_id: `eq.${dressId}`,
        status: "eq.confirmed",
        order: "start_date.asc",
      },
    });
    return rows.map((row) => ({ startDate: row.start_date, days: 5 }));
  }
}

async function insertAdminReservation(
  dressId: string,
  startDate: string,
  days: number,
): Promise<void> {
  const payload = {
    dress_id: dressId,
    start_date: startDate,
    days,
    status: "confirmed" as const,
  };

  try {
    await adminFetch("POST", "reservations", {
      body: [payload],
      prefer: "return=minimal",
    });
    return;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (!isMissingDaysColumnError(message)) {
      throw new Error(formatReservationError(message));
    }
    if (days !== 5) {
      throw new Error(formatReservationError(message));
    }

    await adminFetch("POST", "reservations", {
      body: [{ dress_id: dressId, start_date: startDate, status: "confirmed" }],
      prefer: "return=minimal",
    });
  }
}

function mapAdminDress(row: DressAdminRow): AdminDress {
  const pt = row.dress_translations.find((t) => t.locale === "pt");
  const en = row.dress_translations.find((t) => t.locale === "en");

  if (!pt || !en) {
    throw new Error(`Dress "${row.slug}" is missing PT or EN translations.`);
  }

  return {
    id: row.id,
    slug: row.slug,
    designer: row.designer,
    price: row.price,
    retail: row.retail,
    available: row.available,
    translations: {
      pt: { name: pt.name, description: pt.description, details: pt.details },
      en: { name: en.name, description: en.description, details: en.details },
    },
  };
}

async function getDressIdBySlug(slug: string): Promise<string> {
  const rows = await adminFetch<{ id: string }[]>("GET", "dresses", {
    searchParams: { select: "id", slug: `eq.${slug}`, limit: "1" },
  });
  const row = rows[0];
  if (!row) throw new Error(`Dress not found: ${slug}`);
  return row.id;
}

export const verifyAdminLogin = createServerFn({ method: "POST" })
  .validator(adminAuth)
  .handler(async ({ data }) => {
    assertAdmin(data.adminPassword);
    return { ok: true as const };
  });

export const fetchAdminDresses = createServerFn({ method: "POST" })
  .validator(adminAuth)
  .handler(async ({ data }) => {
    assertAdmin(data.adminPassword);
    const rows = await adminFetch<DressAdminRow[]>("GET", "dresses", {
      searchParams: {
        select:
          "id,slug,designer,price,retail,sizes,occasions,image_url,available,sort_order,dress_translations(locale,name,description,details)",
        order: "sort_order.asc",
      },
    });
    return rows.map(mapAdminDress);
  });

export type AdminReservation = {
  startDate: string;
  days: number;
};

export const fetchAdminReservations = createServerFn({ method: "POST" })
  .validator(adminAuth.extend({ slug: z.string().min(1) }))
  .handler(async ({ data }) => {
    assertAdmin(data.adminPassword);
    const dressId = await getDressIdBySlug(data.slug);
    return listAdminReservations(dressId);
  });

export const addAdminReservation = createServerFn({ method: "POST" })
  .validator(adminReservationSchema)
  .handler(async ({ data }) => {
    assertAdmin(data.adminPassword);
    const dressId = await getDressIdBySlug(data.slug);
    await insertAdminReservation(dressId, data.startDate, data.days);
    return { ok: true as const };
  });

export const removeAdminReservation = createServerFn({ method: "POST" })
  .validator(adminRemoveReservationSchema)
  .handler(async ({ data }) => {
    assertAdmin(data.adminPassword);
    const dressId = await getDressIdBySlug(data.slug);
    await adminFetch("DELETE", "reservations", {
      searchParams: {
        dress_id: `eq.${dressId}`,
        start_date: `eq.${data.startDate}`,
      },
    });
    return { ok: true as const };
  });

export const updateAdminDress = createServerFn({ method: "POST" })
  .validator(adminDressSchema)
  .handler(async ({ data }) => {
    assertAdmin(data.adminPassword);
    const dressId = await getDressIdBySlug(data.slug);

    await adminFetch("PATCH", "dresses", {
      searchParams: { slug: `eq.${data.slug}` },
      body: {
        designer: data.designer,
        price: data.price,
        retail: data.retail,
        available: data.available,
        updated_at: new Date().toISOString(),
      },
      prefer: "return=minimal",
    });

    for (const locale of ["pt", "en"] as const) {
      const copy = data.translations[locale];
      await adminFetch("PATCH", "dress_translations", {
        searchParams: {
          dress_id: `eq.${dressId}`,
          locale: `eq.${locale}`,
        },
        body: {
          name: copy.name,
          description: copy.description,
          details: copy.details,
        },
        prefer: "return=minimal",
      });
    }

    return { ok: true as const };
  });
