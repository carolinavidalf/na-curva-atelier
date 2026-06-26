import { CalBookingEmbed } from "@/components/cal-booking-embed";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useT } from "@/i18n/locale-context";

type ShowroomVisitModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ShowroomVisitModal({ open, onOpenChange }: ShowroomVisitModalProps) {
  const t = useT();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        overlayClassName="bg-foreground/20 backdrop-blur-[2px]"
        closeLabel={t.dress.closeModal}
        className="max-h-[min(44rem,calc(100dvh-2rem))] max-w-[min(32rem,calc(100vw-2rem))] gap-0 overflow-y-auto border-border/50 bg-background p-6 shadow-none sm:rounded-sm"
      >
        <DialogHeader className="space-y-2 pr-8 text-left">
          <DialogTitle className="eyebrow font-sans text-foreground">
            {t.dress.showroomVisitTitle}
          </DialogTitle>
          <DialogDescription className="text-[13px] leading-relaxed text-muted-foreground">
            {t.dress.showroomVisitDescription}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6">
          <CalBookingEmbed active={open} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
