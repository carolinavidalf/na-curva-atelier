import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const focusOnLight =
  "focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const focusOnCoral =
  "focus-visible:ring-2 focus-visible:ring-background focus-visible:ring-offset-2 focus-visible:ring-offset-coral";

const pressed = "active:scale-[0.98] active:transition-none";

export const ctaButtonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-md font-medium uppercase tracking-[0.12em] cursor-pointer",
    "transition-[color,background-color,border-color,transform,box-shadow] duration-200 ease-out",
    "focus-visible:outline-none",
    "disabled:pointer-events-none disabled:opacity-50",
    pressed,
  ],
  {
    variants: {
      variant: {
        /** Primary — dark fill on light backgrounds */
        primary: [
          "bg-foreground text-background",
          "hover:bg-foreground-hover",
          "active:bg-ink",
          focusOnLight,
        ],
        /** Tertiary — outline on light backgrounds */
        outline: [
          "border border-foreground/60 bg-transparent text-foreground",
          "hover:border-foreground hover:bg-foreground/8 hover:text-foreground",
          "active:border-foreground active:bg-foreground/12 active:text-foreground",
          focusOnLight,
        ],
        /** Secondary — coral fill */
        coral: [
          "bg-coral text-primary-foreground",
          "hover:bg-coral-dark",
          "active:bg-coral-darker",
          focusOnLight,
        ],
        "on-coral": [
          "bg-background text-coral",
          "hover:bg-lavender hover:text-foreground",
          "active:bg-lavender-deep active:text-foreground",
          focusOnCoral,
        ],
        "on-coral-outline": [
          "border border-background/60 bg-transparent text-background",
          "hover:border-background hover:bg-background hover:text-coral",
          "active:border-background active:bg-peach active:text-coral",
          focusOnCoral,
        ],
      },
      size: {
        default: "px-7 py-3.5 text-[0.72rem]",
        sm: "px-5 py-2.5 text-[0.7rem]",
        compact: "px-6 py-3 text-[0.72rem]",
        wide: "px-8 py-3.5 text-[0.72rem]",
        full: "w-full py-4 text-center text-[0.72rem]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

type CtaClassOptions = {
  variant?: VariantProps<typeof ctaButtonVariants>["variant"];
  size?: VariantProps<typeof ctaButtonVariants>["size"];
  className?: string;
};

export function ctaClass({ variant, size, className }: CtaClassOptions = {}) {
  return cn(ctaButtonVariants({ variant, size }), className);
}
