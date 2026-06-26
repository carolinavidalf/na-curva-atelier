import { useEffect, useState } from "react";
import { useLocale, useT } from "@/i18n/locale-context";
import type { Locale } from "@/i18n/translations";
import { cn } from "@/lib/utils";

const DEFAULT_CAL_LINK_PT = "na-curva351/marcar-visita";
const DEFAULT_CAL_LINK_EN = "na-curva351/book-visit";

type CalBookingEmbedProps = {
  className?: string;
  /** Mount the embed only while the booking surface is visible (e.g. modal open). */
  active?: boolean;
};

function parseCalLink(raw: string | undefined, fallback: string): string {
  const value = raw?.trim();
  if (!value) return fallback;

  if (/^https?:\/\//i.test(value)) {
    try {
      const { pathname } = new URL(value);
      const calLink = pathname.replace(/^\/+|\/+$/g, "");
      return calLink || fallback;
    } catch {
      return fallback;
    }
  }

  return value.replace(/^\/+|\/+$/g, "") || fallback;
}

function getCalLinkForLocale(locale: Locale): string {
  if (locale === "en") {
    return parseCalLink(import.meta.env.VITE_CAL_COM_BOOKING_URL_EN, DEFAULT_CAL_LINK_EN);
  }
  return parseCalLink(import.meta.env.VITE_CAL_COM_BOOKING_URL, DEFAULT_CAL_LINK_PT);
}

function getCalEmbedSrc(calLink: string, locale: Locale): string {
  const params = new URLSearchParams({
    embed: "true",
    layout: "month_view",
    locale: locale === "pt" ? "pt" : "en",
    hideEventTypeDetails: "true",
    showTimezoneWhenEventDetailsHidden: "true",
  });
  return `https://cal.com/${calLink}?${params.toString()}`;
}

/** Inline Cal.com booking embed for the showroom visit modal. */
export function CalBookingEmbed({ className, active = true }: CalBookingEmbedProps) {
  const { locale } = useLocale();
  const t = useT();
  const calLink = getCalLinkForLocale(locale);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!active) {
      setReady(false);
      return;
    }

    const timer = window.setTimeout(() => setReady(true), 50);
    return () => {
      window.clearTimeout(timer);
      setReady(false);
    };
  }, [active, locale]);

  if (!active) return null;

  return (
    <div
      className={cn(
        "relative w-full h-[min(36rem,calc(100dvh-14rem))] min-h-[24rem]",
        className,
      )}
    >
      {ready ? (
        <iframe
          key={`${calLink}-${locale}`}
          title={t.dress.showroomVisitTitle}
          src={getCalEmbedSrc(calLink, locale)}
          data-cal-booking-embed
          className="absolute inset-0 h-full w-full border-0 bg-background"
          loading="eager"
          referrerPolicy="strict-origin-when-cross-origin"
          allow="clipboard-write; fullscreen"
        />
      ) : null}
    </div>
  );
}
