import { useMemo, useState } from "react";
import { useLocale, useT } from "@/i18n/locale-context";
import {
  getPeriodKeysForDays,
  getRentalPeriodKeys,
  isPeriodStartValid,
  isRentalStartValid,
  parseDateKey,
} from "@/lib/rental-period";
import {
  expandReservationBlocks,
  getPeriodKeysForBlock,
  type ReservationBlock,
  toDateKey,
} from "@/lib/reservations";
import { cn } from "@/lib/utils";

type AvailabilityCalendarProps = {
  reservations: ReservationBlock[];
  monthLabelId?: string;
  size?: "default" | "modal";
  rentalStart: Date | null;
  onRentalStartChange: (date: Date | null) => void;
  selectionError: string | null;
  onSelectionError: (error: string | null) => void;
  adminMode?: boolean;
  adminBlockDays?: number;
  adminPendingStart?: Date | null;
  onAdminDayClick?: (date: Date) => void;
  highlightedBlockStart?: string | null;
};

type CalendarDay = {
  day: number;
  date: Date;
  key: string;
};

const sizeStyles = {
  default: {
    row: "h-9",
    cell: "size-8",
    dayText: "text-sm",
    month: "text-sm",
    weekday: "text-[0.65rem]",
    nav: "size-6 text-sm",
    legend: "text-[0.65rem]",
    legendSwatch: "size-3",
    gridGap: "gap-x-1 gap-y-1.5 [--cal-gap-x:0.25rem] [--cal-range-h:2rem]",
    headerMt: "mt-3",
    legendMt: "mt-3.5",
  },
  modal: {
    row: "h-11",
    cell: "size-10",
    dayText: "text-base",
    month: "text-base",
    weekday: "text-xs",
    nav: "size-7 text-base",
    legend: "text-xs",
    legendSwatch: "size-3.5",
    gridGap: "gap-x-1.5 gap-y-2 [--cal-gap-x:0.375rem] [--cal-range-h:2.5rem]",
    headerMt: "mt-4",
    legendMt: "mt-4",
  },
} as const;

type RangeSegment = { roundLeft: boolean; roundRight: boolean };

const rangeBarVariants = {
  reserved: "z-0 bg-reserved",
  preview: "z-[1] bg-coral/12",
  selected: "z-[2] bg-coral transition-colors duration-200 group-hover/cell:bg-coral-dark",
} as const;

function startOfToday(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

function buildMonthDays(year: number, month: number): (CalendarDay | null)[] {
  const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (CalendarDay | null)[] = Array.from({ length: firstWeekday }, () => null);

  for (let day = 1; day <= daysInMonth; day++) {
    cells.push({
      day,
      date: new Date(year, month, day),
      key: toDateKey(year, month, day),
    });
  }

  return cells;
}

function isSameGridRow(indexA: number, indexB: number): boolean {
  return Math.floor(indexA / 7) === Math.floor(indexB / 7);
}

function getPeriodSegmentFlags(
  cells: (CalendarDay | null)[],
  index: number,
  periodKeys: Set<string>,
): RangeSegment | null {
  const cell = cells[index];
  if (!cell || !periodKeys.has(cell.key)) return null;

  const prevIndex = index - 1;
  const nextIndex = index + 1;
  const prev = prevIndex >= 0 ? cells[prevIndex] : null;
  const next = nextIndex < cells.length ? cells[nextIndex] : null;

  const prevInPeriod =
    prev !== null &&
    periodKeys.has(prev.key) &&
    isSameGridRow(prevIndex, index);
  const nextInPeriod =
    next !== null &&
    periodKeys.has(next.key) &&
    isSameGridRow(index, nextIndex);

  return {
    roundLeft: !prevInPeriod,
    roundRight: !nextInPeriod,
  };
}

function rangeBarClassName(
  segment: RangeSegment,
  variant: keyof typeof rangeBarVariants,
): string {
  return cn(
    "pointer-events-none absolute top-0 bottom-0 my-auto h-[var(--cal-range-h)]",
    rangeBarVariants[variant],
    segment.roundLeft && segment.roundRight && "inset-x-0 rounded-md",
    segment.roundLeft &&
      !segment.roundRight &&
      "left-0 right-[calc(var(--cal-gap-x)/-2)] rounded-l-md",
    !segment.roundLeft &&
      segment.roundRight &&
      "left-[calc(var(--cal-gap-x)/-2)] right-0 rounded-r-md",
    !segment.roundLeft &&
      !segment.roundRight &&
      "left-[calc(var(--cal-gap-x)/-2)] right-[calc(var(--cal-gap-x)/-2)]",
  );
}

function RangeBar({
  segment,
  variant,
}: {
  segment: RangeSegment | null;
  variant: keyof typeof rangeBarVariants;
}) {
  if (!segment) return null;

  return <span aria-hidden className={rangeBarClassName(segment, variant)} />;
}

export function AvailabilityCalendar({
  reservations,
  monthLabelId = "availability-month-label",
  size = "default",
  rentalStart,
  onRentalStartChange,
  selectionError,
  onSelectionError,
  adminMode = false,
  adminBlockDays = 5,
  adminPendingStart = null,
  onAdminDayClick,
  highlightedBlockStart = null,
}: AvailabilityCalendarProps) {
  const t = useT();
  const { locale } = useLocale();
  const styles = sizeStyles[size];
  const today = useMemo(() => startOfToday(), []);

  const reserved = useMemo(
    () => new Set(expandReservationBlocks(reservations)),
    [reservations],
  );
  const reservationPeriodByKey = useMemo(() => {
    const map = new Map<string, Set<string>>();
    for (const block of reservations) {
      const periodKeys = new Set(getPeriodKeysForBlock(block));
      for (const key of periodKeys) {
        map.set(key, periodKeys);
      }
    }
    return map;
  }, [reservations]);

  const highlightedKeys = useMemo(() => {
    if (!highlightedBlockStart) return new Set<string>();
    const block = reservations.find((item) => item.startDate === highlightedBlockStart);
    if (!block) return new Set<string>();
    return new Set(getPeriodKeysForBlock(block));
  }, [highlightedBlockStart, reservations]);

  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [previewStart, setPreviewStart] = useState<Date | null>(null);

  const selectedKeys = useMemo(
    () => new Set(rentalStart ? getRentalPeriodKeys(rentalStart) : []),
    [rentalStart],
  );

  const adminPendingKeys = useMemo(
    () =>
      new Set(
        adminPendingStart
          ? getPeriodKeysForDays(adminPendingStart, adminBlockDays)
          : [],
      ),
    [adminPendingStart, adminBlockDays],
  );

  const previewKeys = useMemo(() => {
    if (adminMode && adminPendingStart) return adminPendingKeys;
    return new Set(previewStart ? getRentalPeriodKeys(previewStart) : []);
  }, [adminMode, adminPendingKeys, adminPendingStart, previewStart]);

  const intlLocale = locale === "pt" ? "pt-PT" : "en-GB";
  const monthLabel = new Intl.DateTimeFormat(intlLocale, {
    month: "long",
    year: "numeric",
  }).format(new Date(viewYear, viewMonth, 1));

  const weekdayLabels = useMemo(
    () =>
      Array.from({ length: 7 }, (_, i) => {
        const date = new Date(2024, 0, 1 + i);
        return new Intl.DateTimeFormat(intlLocale, { weekday: "short" }).format(date);
      }),
    [intlLocale],
  );

  const cells = useMemo(
    () => buildMonthDays(viewYear, viewMonth),
    [viewYear, viewMonth],
  );

  const { hasReservedInMonth, hasSelectedInMonth } = useMemo(() => {
    let hasReserved = false;
    let hasSelected = false;

    for (const cell of cells) {
      if (!cell) continue;
      if (reserved.has(cell.key)) hasReserved = true;
      if (selectedKeys.has(cell.key) || adminPendingKeys.has(cell.key)) hasSelected = true;
      if (hasReserved && hasSelected) break;
    }

    return {
      hasReservedInMonth: hasReserved,
      hasSelectedInMonth: hasSelected,
    };
  }, [cells, reserved, selectedKeys, adminPendingKeys]);

  const legendItemClass = (isActive: boolean) =>
    cn(
      "flex items-center gap-2 transition-opacity duration-200",
      isActive ? "opacity-100" : "opacity-55",
    );

  const goToPreviousMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
      return;
    }
    setViewMonth((m) => m - 1);
  };

  const goToNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
      return;
    }
    setViewMonth((m) => m + 1);
  };

  const formatDayLabel = (date: Date) =>
    new Intl.DateTimeFormat(intlLocale, {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);

  const handleDaySelect = (cell: CalendarDay) => {
    const isPast = cell.date < today;
    const isReserved = reserved.has(cell.key);

    if (adminMode) {
      if (isPast) return;
      onAdminDayClick?.(cell.date);
      if (!isReserved) {
        if (!isPeriodStartValid(cell.date, adminBlockDays, today, reserved)) {
          onSelectionError("Those dates overlap an existing reservation.");
          return;
        }
        onSelectionError(null);
      }
      return;
    }

    if (isPast || isReserved) return;

    if (!isRentalStartValid(cell.date, today, reserved)) {
      onRentalStartChange(null);
      onSelectionError(t.dress.rentalPeriodError);
      setPreviewStart(null);
      return;
    }

    onSelectionError(null);
    onRentalStartChange(cell.date);
    setPreviewStart(null);
  };

  const clearPreview = () => {
    if (!adminMode) setPreviewStart(null);
  };

  const handleDayPreview = (cell: CalendarDay) => {
    if (adminMode) return;
    if (cell.date < today || reserved.has(cell.key)) return;
    setPreviewStart(cell.date);
  };

  const navButtonClass = cn(
    "absolute top-1/2 flex -translate-y-1/2 shrink-0 items-center justify-center text-muted-foreground/50 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-coral focus-visible:ring-offset-1",
    styles.nav,
  );

  return (
    <div>
      <div className="relative">
        <button
          type="button"
          onClick={goToPreviousMonth}
          className={cn(navButtonClass, "left-0")}
          aria-label={t.dress.calendarPreviousMonth}
        >
          ←
        </button>
        <p
          id={monthLabelId}
          className={cn(
            "w-full px-8 text-center font-display font-medium capitalize tracking-tight text-foreground",
            styles.month,
          )}
        >
          {monthLabel}
        </p>
        <button
          type="button"
          onClick={goToNextMonth}
          className={cn(navButtonClass, "right-0")}
          aria-label={t.dress.calendarNextMonth}
        >
          →
        </button>
      </div>

      <div
        role="grid"
        aria-labelledby={monthLabelId}
        onMouseLeave={clearPreview}
        className={cn("grid grid-cols-7", styles.gridGap, styles.headerMt)}
      >
        {weekdayLabels.map((label, i) => (
          <div
            key={`weekday-${i}`}
            role="columnheader"
            className={cn(
              "pb-1 text-center font-normal uppercase tracking-[0.1em] text-muted-foreground/65",
              styles.weekday,
            )}
          >
            {label}
          </div>
        ))}

        {cells.map((cell, index) => {
          if (!cell) {
            return (
              <div
                key={`empty-${index}`}
                role="gridcell"
                aria-hidden
                className={styles.row}
              />
            );
          }

          const isPast = cell.date < today;
          const isReserved = reserved.has(cell.key);
          const isSelected = selectedKeys.has(cell.key) || adminPendingKeys.has(cell.key);
          const isHighlighted = highlightedKeys.has(cell.key);
          const isSelectable = adminMode ? !isPast : !isPast && !isReserved;
          const reservedPeriod = isReserved ? reservationPeriodByKey.get(cell.key) : undefined;
          const reservedSegment = reservedPeriod
            ? getPeriodSegmentFlags(cells, index, reservedPeriod)
            : null;
          const selectedSegment = isSelected
            ? getPeriodSegmentFlags(
                cells,
                index,
                adminPendingKeys.size > 0 ? adminPendingKeys : selectedKeys,
              )
            : null;
          const inPreview = previewKeys.has(cell.key) && !isSelected && !isReserved;
          const previewSegment = inPreview
            ? getPeriodSegmentFlags(cells, index, previewKeys)
            : null;

          const statusLabel = isPast
            ? t.dress.calendarPast
            : isReserved
              ? t.dress.legendReserved
              : isSelected
                ? t.dress.legendSelected
                : t.dress.legendAvailable;

          const ariaLabel = adminMode
            ? isReserved
              ? `${formatDayLabel(cell.date)}, ${statusLabel}`
              : isPast
                ? `${formatDayLabel(cell.date)}, ${statusLabel}`
                : `${formatDayLabel(cell.date)}, ${statusLabel}. Select as rental start`
            : isSelectable
              ? `${formatDayLabel(cell.date)}, ${statusLabel}. ${t.dress.calendarSelectDay}`
              : `${formatDayLabel(cell.date)}, ${statusLabel}`;

          return (
            <div
              key={cell.key}
              role="gridcell"
              className={cn(
                "relative flex items-center justify-center overflow-visible",
                styles.row,
                isSelected && "group/cell",
                isHighlighted && "rounded-md ring-2 ring-coral/70 ring-offset-1",
              )}
            >
              <div className="pointer-events-none absolute inset-0" aria-hidden>
                <RangeBar segment={reservedSegment} variant="reserved" />
                <RangeBar segment={previewSegment} variant="preview" />
                <RangeBar segment={selectedSegment} variant="selected" />
              </div>
              <button
                type="button"
                disabled={!isSelectable}
                onClick={() => handleDaySelect(cell)}
                onMouseEnter={() => handleDayPreview(cell)}
                aria-label={ariaLabel}
                aria-pressed={isSelected}
                className={cn(
                  "relative z-10 flex items-center justify-center rounded-md tabular-nums leading-none transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-coral focus-visible:ring-offset-1 disabled:cursor-not-allowed",
                  styles.cell,
                  styles.dayText,
                  isPast && "text-muted-foreground/30",
                  isSelectable && "cursor-pointer",
                  isSelectable &&
                    !isSelected &&
                    !inPreview &&
                    "text-foreground/85 hover:bg-foreground/6",
                  isReserved &&
                    "font-medium text-reserved-foreground line-through decoration-reserved-foreground/55",
                  inPreview && !isReserved && "text-foreground/85",
                  isSelected && "font-medium text-primary-foreground",
                )}
              >
                {cell.day}
              </button>
            </div>
          );
        })}
      </div>

      <div
        className={cn(
          "flex flex-wrap items-center gap-x-4 gap-y-2 text-muted-foreground/75",
          styles.legend,
          styles.legendMt,
        )}
      >
        <span className={legendItemClass(hasReservedInMonth)}>
          <span
            className={cn(
              "shrink-0 rounded-l-sm rounded-r-sm bg-reserved",
              styles.legendSwatch,
            )}
            aria-hidden
          />
          {t.dress.legendReserved}
        </span>
        <span className={legendItemClass(hasSelectedInMonth)}>
          <span
            className={cn(
              "shrink-0 rounded-l-sm rounded-r-sm bg-coral",
              styles.legendSwatch,
            )}
            aria-hidden
          />
          {adminMode ? "Selected period" : t.dress.legendSelected}
        </span>
      </div>

      {selectionError && (
        <p
          className={cn("text-[13px] leading-relaxed text-coral", styles.legendMt)}
          role="alert"
        >
          {selectionError}
        </p>
      )}
    </div>
  );
}

export function formatReservationBlockLabel(
  block: ReservationBlock,
  locale: "pt" | "en" = "en",
): string {
  const intlLocale = locale === "pt" ? "pt-PT" : "en-GB";
  const start = parseDateKey(block.startDate);
  const end = new Date(start);
  end.setDate(end.getDate() + block.days - 1);
  const fmt = new Intl.DateTimeFormat(intlLocale, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const dayLabel = block.days === 1 ? "day" : "days";
  return `${fmt.format(start)} – ${fmt.format(end)} (${block.days} ${dayLabel})`;
}
