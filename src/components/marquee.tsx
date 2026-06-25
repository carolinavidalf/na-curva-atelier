import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type MarqueeProps = {
  children: ReactNode;
  className?: string;
  /** One full loop duration in seconds */
  duration?: number;
  /** Repeat the child row within each half so wide screens stay filled */
  repeats?: number;
};

export function Marquee({
  children,
  className,
  duration = 40,
  repeats = 3,
}: MarqueeProps) {
  const half = (
    <div className="flex shrink-0 items-center gap-10">
      {Array.from({ length: repeats }).map((_, i) => (
        <div key={i} className="flex shrink-0 items-center gap-10">
          {children}
        </div>
      ))}
    </div>
  );

  return (
    <div className={cn("overflow-hidden", className)}>
      <div
        className="marquee-track flex w-max"
        style={{ animationDuration: `${duration}s` }}
      >
        {half}
        <div className="flex shrink-0 items-center gap-10" aria-hidden>
          {Array.from({ length: repeats }).map((_, i) => (
            <div key={i} className="flex shrink-0 items-center gap-10">
              {children}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
