import Cal from "@calcom/embed-react";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

type CalBookingEmbedProps = {
  className?: string;
};

function getCalLinkFromEnv(): string | null {
  const raw = import.meta.env.VITE_CAL_COM_BOOKING_URL?.trim();
  if (!raw) return null;

  if (/^https?:\/\//i.test(raw)) {
    try {
      const { pathname } = new URL(raw);
      const calLink = pathname.replace(/^\/+|\/+$/g, "");
      return calLink || null;
    } catch {
      return null;
    }
  }

  return raw.replace(/^\/+|\/+$/g, "") || null;
}

/** Inline Cal.com booking embed for the showroom visit modal. */
export function CalBookingEmbed({ className }: CalBookingEmbedProps) {
  const calLink = useMemo(() => getCalLinkFromEnv(), []);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!calLink) {
    return (
      <div
        data-cal-booking-embed
        className={cn("min-h-[12rem] w-full", className)}
      />
    );
  }

  if (!mounted) {
    return (
      <div
        data-cal-booking-embed
        className={cn("min-h-[12rem] w-full", className)}
      />
    );
  }

  return (
    <div
      data-cal-booking-embed
      className={cn("min-h-[12rem] w-full overflow-hidden", className)}
    >
      <Cal
        calLink={calLink}
        config={{ layout: "month_view" }}
        style={{ width: "100%", height: "min(70vh, 36rem)", overflow: "auto" }}
      />
    </div>
  );
}
