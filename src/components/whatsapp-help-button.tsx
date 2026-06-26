import { MessageCircle } from "lucide-react";
import { useT } from "@/i18n/locale-context";
import { whatsappUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

/** Persistent secondary WhatsApp entry for general support. */
export function WhatsappHelpButton() {
  const t = useT();
  const href = whatsappUrl();

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={t.help.whatsappAria}
      className={cn(
        "fixed z-30 flex items-center justify-center gap-2",
        "border border-foreground/15 bg-background/92 text-foreground backdrop-blur-sm",
        "shadow-sm transition-[color,background-color,border-color,transform,box-shadow] duration-200 ease-out",
        "hover:border-foreground/30 hover:bg-background hover:shadow-md",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "active:scale-[0.98]",
        "bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-5 size-11 rounded-full",
        "md:bottom-8 md:right-8 md:h-auto md:w-auto md:rounded-md md:px-4 md:py-2.5",
        "md:text-[0.65rem] md:font-medium md:uppercase md:tracking-[0.14em]",
      )}
    >
      <MessageCircle className="size-4 shrink-0" strokeWidth={1.75} aria-hidden />
      <span className="hidden md:inline" aria-hidden>
        {t.help.whatsappLabel}
      </span>
    </a>
  );
}
