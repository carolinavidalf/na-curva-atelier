import { useId, useState } from "react";
import { ChevronRight } from "lucide-react";
import { AvailabilityCalendar } from "@/components/availability-calendar";
import { ctaClass } from "@/components/cta-button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useLocale, useT } from "@/i18n/locale-context";
import { formatRentalDate, getRentalEndDate } from "@/lib/rental-period";
import type { ReservationBlock } from "@/lib/reservations";

type AvailabilitySectionProps = {
  reservations: ReservationBlock[];
  headingId?: string;
  confirmedRentalStart: Date | null;
  onConfirmRentalStart: (date: Date | null) => void;
};

export function AvailabilitySection({
  reservations,
  headingId = "dress-availability-heading",
  confirmedRentalStart,
  onConfirmRentalStart,
}: AvailabilitySectionProps) {
  const t = useT();
  const { locale } = useLocale();
  const [open, setOpen] = useState(false);
  const [pendingRentalStart, setPendingRentalStart] = useState<Date | null>(null);
  const [pendingSelectionError, setPendingSelectionError] = useState<string | null>(null);
  const monthLabelId = useId();

  const hasConfirmedDates = confirmedRentalStart !== null;
  const confirmedDateRange = hasConfirmedDates
    ? t.dress.rentalDateRange(
        formatRentalDate(confirmedRentalStart, locale),
        formatRentalDate(getRentalEndDate(confirmedRentalStart), locale),
      )
    : null;

  const openModal = () => {
    setPendingRentalStart(confirmedRentalStart);
    setPendingSelectionError(null);
    setOpen(true);
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      setPendingRentalStart(null);
      setPendingSelectionError(null);
    }
    setOpen(nextOpen);
  };

  const handleUseDates = () => {
    if (!pendingRentalStart || pendingSelectionError) return;
    onConfirmRentalStart(pendingRentalStart);
    setPendingRentalStart(null);
    setPendingSelectionError(null);
    setOpen(false);
  };

  const showConfirmButton = pendingRentalStart !== null && !pendingSelectionError;

  const pendingDateRange =
    pendingRentalStart && !pendingSelectionError
      ? t.dress.rentalDateRange(
          formatRentalDate(pendingRentalStart, locale),
          formatRentalDate(getRentalEndDate(pendingRentalStart), locale),
        )
      : null;

  const modalHelperText =
    pendingRentalStart && !pendingSelectionError
      ? t.dress.availabilityChangeHelper
      : t.dress.availabilityHelper;

  const actionLinkClass =
    "group mt-2.5 inline-flex min-h-10 items-center gap-1 py-1 text-[13px] font-medium text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 focus-visible:ring-offset-background";

  return (
    <div className="border-t border-border pt-5">
      <p className="eyebrow mb-2" id={headingId}>
        {t.dress.availability}
      </p>

      {hasConfirmedDates ? (
        <>
          <p className="text-[14px] font-medium tracking-tight text-foreground">
            {confirmedDateRange}
          </p>
          <button type="button" onClick={openModal} className={actionLinkClass}>
            <span className="link-action-label">{t.dress.changeDates}</span>
            <ChevronRight className="link-action-arrow size-3.5" aria-hidden />
          </button>
        </>
      ) : (
        <>
          <p className="text-[13px] leading-relaxed text-muted-foreground">
            {t.dress.availabilityHelper}
          </p>
          <button type="button" onClick={openModal} className={actionLinkClass}>
            <span className="link-action-label">{t.dress.viewReservedDates}</span>
            <ChevronRight className="link-action-arrow size-3.5" aria-hidden />
          </button>
        </>
      )}

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent
          overlayClassName="bg-foreground/20 backdrop-blur-[2px]"
          closeLabel={t.dress.closeModal}
          className="max-w-[min(26rem,calc(100vw-2rem))] gap-0 border-border/50 bg-background p-6 shadow-none sm:rounded-sm"
        >
          <DialogHeader className="space-y-2 pr-8 text-left">
            <DialogTitle className="eyebrow font-sans text-foreground">
              {t.dress.availability}
            </DialogTitle>
            <DialogDescription className="text-[13px] leading-relaxed text-muted-foreground">
              {modalHelperText}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-5">
            <AvailabilityCalendar
              reservations={reservations}
              monthLabelId={monthLabelId}
              size="modal"
              rentalStart={pendingRentalStart}
              onRentalStartChange={setPendingRentalStart}
              selectionError={pendingSelectionError}
              onSelectionError={setPendingSelectionError}
            />
          </div>
          {showConfirmButton && (
            <div className="mt-8 space-y-4">
              <div className="space-y-1">
                <p className="eyebrow">{t.dress.rentalSummaryLabel}</p>
                <p className="text-[14px] font-medium tracking-tight text-foreground tabular-nums">
                  {pendingDateRange}
                </p>
              </div>
              <button
                type="button"
                onClick={handleUseDates}
                className={ctaClass({ variant: "primary", size: "full" })}
              >
                {t.dress.useTheseDates}
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
