import { cn } from "@/lib/utils";

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

function getCalEmbedSrc(calLink: string): string {
  const params = new URLSearchParams({
    embed: "true",
    layout: "month_view",
  });
  return `https://cal.com/${calLink}?${params.toString()}`;
}

/** Inline Cal.com booking embed for the showroom visit modal. */
export function CalBookingEmbed({ className, active = true }: CalBookingEmbedProps) {
  const calLink = getCalLinkFromEnv();

  if (!active) return null;

  return (
    <iframe
      title="Book a showroom visit"
      src={getCalEmbedSrc(calLink)}
      data-cal-booking-embed
      className={cn("h-[32rem] w-full border-0 bg-background", className)}
      loading="lazy"
      referrerPolicy="strict-origin-when-cross-origin"
    />
  );
}
