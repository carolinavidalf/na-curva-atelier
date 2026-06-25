import logo from "@/assets/logo.png";
import { cn } from "@/lib/utils";

type WordmarkProps = {
  className?: string;
  /** Use on coral or dark backgrounds */
  variant?: "default" | "light";
};

export function Wordmark({ className, variant = "default" }: WordmarkProps) {
  return (
    <img
      src={logo}
      alt="Na Curva"
      width={838}
      height={434}
      className={cn(
        "h-auto w-auto max-w-full object-contain object-left",
        variant === "light" && "brightness-0 invert",
        className,
      )}
    />
  );
}
