/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_URL?: string;
  readonly VITE_SUPABASE_URL?: string;
  readonly VITE_SUPABASE_ANON_KEY?: string;
  readonly VITE_CAL_COM_BOOKING_URL?: string;
  readonly VITE_CAL_COM_BOOKING_URL_EN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
