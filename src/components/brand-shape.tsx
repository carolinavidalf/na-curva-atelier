import brandShape from "@/assets/brand-shape.png";
import { cn } from "@/lib/utils";

type BrandShapeProps = {
  className?: string;
  /** `light` = peach tint for coral / dark backgrounds */
  variant?: "coral" | "foreground" | "peach" | "light";
};

const tintClass = {
  coral: "bg-coral",
  foreground: "bg-foreground",
  peach: "bg-peach",
  light: "bg-peach",
} as const;

const maskStyle = {
  maskImage: `url(${brandShape})`,
  maskRepeat: "no-repeat",
  maskPosition: "center",
  maskSize: "contain",
  WebkitMaskImage: `url(${brandShape})`,
  WebkitMaskRepeat: "no-repeat",
  WebkitMaskPosition: "center",
  WebkitMaskSize: "contain",
} as const;

export function BrandShape({ className, variant = "coral" }: BrandShapeProps) {
  return (
    <span
      aria-hidden
      className={cn("inline-block shrink-0", tintClass[variant], className)}
      style={maskStyle}
    />
  );
}
