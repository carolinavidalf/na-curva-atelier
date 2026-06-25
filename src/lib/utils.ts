import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const TRAILING_ARROW = " →";

export function splitTrailingArrow(label: string): {
  text: string;
  arrow: string | null;
} {
  if (label.endsWith(TRAILING_ARROW)) {
    return { text: label.slice(0, -TRAILING_ARROW.length), arrow: "→" };
  }

  return { text: label, arrow: null };
}
