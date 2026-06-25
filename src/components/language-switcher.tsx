import { useLocale } from "@/i18n/locale-context";
import type { Locale } from "@/i18n/translations";
import { cn } from "@/lib/utils";

function SwitchButton({
  code,
  label,
  active,
  onClick,
}: {
  code: Locale;
  label: string;
  active: boolean;
  onClick: (locale: Locale) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onClick(code)}
      className={cn(
        "text-xs font-medium uppercase tracking-[0.12em] transition-colors",
        active ? "text-coral" : "text-foreground/60 hover:text-coral",
      )}
      aria-current={active ? "true" : undefined}
    >
      {label}
    </button>
  );
}

export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale } = useLocale();

  return (
    <div
      className={cn("flex items-center gap-2", className)}
      role="group"
      aria-label="Language"
    >
      <SwitchButton
        code="pt"
        label="PT"
        active={locale === "pt"}
        onClick={setLocale}
      />
      <span className="text-foreground/30" aria-hidden>
        |
      </span>
      <SwitchButton
        code="en"
        label="EN"
        active={locale === "en"}
        onClick={setLocale}
      />
    </div>
  );
}
