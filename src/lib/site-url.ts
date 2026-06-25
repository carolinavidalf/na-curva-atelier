const DEFAULT_SITE_URL = "https://nacurva.pt";

/** Public site origin used for Open Graph / WhatsApp link previews. */
export function getSiteUrl(): string {
  const configured = import.meta.env.VITE_SITE_URL?.trim();
  if (configured) return configured.replace(/\/$/, "");
  return DEFAULT_SITE_URL;
}

/** Turn a site-relative path into an absolute URL crawlers can fetch. */
export function absoluteUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${getSiteUrl()}${normalized}`;
}
