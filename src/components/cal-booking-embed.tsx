import { getCalApi } from "@calcom/embed-react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const CAL_NAMESPACE = "showroom-fitting";
const DEFAULT_CAL_LINK = "na-curva351/showroom-fitting";

type CalBookingEmbedProps = {
  className?: string;
  /** Mount the embed only while the booking surface is visible (e.g. modal open). */
  active?: boolean;
};

function getCalLinkFromEnv(): string {
  const raw = import.meta.env.VITE_CAL_COM_BOOKING_URL?.trim();
  if (!raw) return DEFAULT_CAL_LINK;

  if (/^https?:\/\//i.test(raw)) {
    try {
      const { pathname } = new URL(raw);
      const calLink = pathname.replace(/^\/+|\/+$/g, "");
      return calLink || DEFAULT_CAL_LINK;
    } catch {
      return DEFAULT_CAL_LINK;
    }
  }

  return raw.replace(/^\/+|\/+$/g, "") || DEFAULT_CAL_LINK;
}

/** Inline Cal.com booking embed for the showroom visit modal. */
export function CalBookingEmbed({ className, active = true }: CalBookingEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const calLink = getCalLinkFromEnv();

  useEffect(() => {
    if (!active) return;

    const element = containerRef.current;
    if (!element) return;

    let cancelled = false;

    (async () => {
      const cal = await getCalApi({ namespace: CAL_NAMESPACE });
      if (cancelled) return;

      element.replaceChildren();
      cal("inline", {
        elementOrSelector: element,
        calLink,
        config: { layout: "month_view" },
      });
    })();

    return () => {
      cancelled = true;
      element.replaceChildren();
    };
  }, [active, calLink]);

  return (
    <div
      ref={containerRef}
      data-cal-booking-embed
      className={cn("min-h-[22rem] w-full", className)}
    />
  );
}
