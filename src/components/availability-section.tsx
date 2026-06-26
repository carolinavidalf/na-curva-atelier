import { useId, useState } from "react";
import { ChevronRight } from "lucide-react";
import { AvailabilityCalendar } from "@/components/availability-calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useT } from "@/i18n/locale-context";
import type { ReservationBlock } from "@/lib/reservations";

type AvailabilitySectionProps = {
  reservations: ReservationBlock[];
  headingId?: string;
};

export function AvailabilitySection({
  reservations,
  headingId = "dress-availability-heading",
}: AvailabilitySectionProps) {
  const t = useT();
  const [open, setOpen] = useState(false);
  const monthLabelId = useId();

  const actionLinkClass =
    "group mt-2.5 inline-flex min-h-10 items-center gap-1 py-1 text-[13px] font-medium text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 focus-visible:ring-offset-background";

  return (
    <div className="border-t border-border pt-5">
      <div className="mb-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <p className="eyebrow" id={headingId}>
          {t.dress.availability}
        </p>
        <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
          {t.dress.availabilityViewOnly}
        </span>
      </div>
      <p className="text-[13px] leading-relaxed text-muted-foreground">
        {t.dress.availabilityHelper}
      </p>
      <button type="button" onClick={() => setOpen(true)} className={actionLinkClass}>
        <span className="link-action-label">{t.dress.viewReservedDates}</span>
        <ChevronRight className="link-action-arrow size-3.5" aria-hidden />
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          overlayClassName="bg-foreground/20 backdrop-blur-[2px]"
          closeLabel={t.dress.closeModal}
          className="max-w-[min(26rem,calc(100vw-2rem))] gap-0 border-border/50 bg-background p-6 shadow-none sm:rounded-sm"
        >
          <DialogHeader className="space-y-2 pr-8 text-left">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <DialogTitle className="eyebrow font-sans text-foreground">
                {t.dress.availability}
              </DialogTitle>
              <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                {t.dress.availabilityViewOnly}
              </span>
            </div>
            <DialogDescription className="text-[13px] leading-relaxed text-muted-foreground">
              {t.dress.availabilityHelper}
            </DialogDescription>
          </DialogHeader>
          <p className="mt-4 text-[12px] leading-relaxed text-muted-foreground/90">
            {t.dress.availabilityReadOnlyNote}
          </p>
          <div className="mt-4">
            <AvailabilityCalendar
              reservations={reservations}
              monthLabelId={monthLabelId}
              size="modal"
              readOnly
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
