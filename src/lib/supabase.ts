import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { STATIC_IMAGE_BY_SLUG } from "@/lib/dresses-static";

let browserClient: SupabaseClient | undefined;

export function isSupabaseConfigured(): boolean {
  return Boolean(
    import.meta.env.VITE_SUPABASE_URL?.trim() &&
      import.meta.env.VITE_SUPABASE_ANON_KEY?.trim(),
  );
}

function getSupabaseConfig() {
  return {
    url: import.meta.env.VITE_SUPABASE_URL!.trim().replace(/\/$/, ""),
    key: import.meta.env.VITE_SUPABASE_ANON_KEY!.trim(),
  };
}

/** REST fetch that works in both SSR and the browser without Node-only deps. */
export async function supabaseFetch<T>(
  path: string,
  searchParams?: Record<string, string>,
): Promise<{ data: T | null; error: string | null }> {
  if (!isSupabaseConfigured()) {
    return { data: null, error: "Supabase is not configured" };
  }

  const { url, key } = getSupabaseConfig();
  const query = searchParams ? `?${new URLSearchParams(searchParams).toString()}` : "";

  try {
    const response = await fetch(`${url}/rest/v1/${path}${query}`, {
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      return { data: null, error: await response.text() };
    }

    return { data: (await response.json()) as T, error: null };
  } catch (error) {
    return { data: null, error: error instanceof Error ? error.message : String(error) };
  }
}

/** Browser-only client — not used during SSR loaders. */
export function getSupabaseBrowserClient(): SupabaseClient {
  if (typeof window === "undefined") {
    throw new Error("getSupabaseBrowserClient() is only available in the browser");
  }

  if (!browserClient) {
    const { url, key } = getSupabaseConfig();
    browserClient = createClient(url, key);
  }

  return browserClient;
}

export function getDressImagePublicUrl(imageUrl: string, slug: string): string {
  if (/^https?:\/\//i.test(imageUrl) || imageUrl.startsWith("/")) {
    return imageUrl;
  }

  if (imageUrl.startsWith("storage:") && isSupabaseConfigured()) {
    const { url } = getSupabaseConfig();
    const storageRef = imageUrl.slice("storage:".length);
    return `${url}/storage/v1/object/public/dress-images/${storageRef}`;
  }

  // Legacy seed filenames — use bundled photos until an admin upload marks storage:
  const staticImage = STATIC_IMAGE_BY_SLUG[slug];
  if (staticImage && !imageUrl.startsWith("storage:")) {
    return staticImage;
  }

  if (isSupabaseConfigured()) {
    const { url } = getSupabaseConfig();
    return `${url}/storage/v1/object/public/dress-images/${imageUrl}`;
  }

  return staticImage ?? "";
}
