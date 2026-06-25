import { Link, type LinkProps } from "@tanstack/react-router";
import { cn, splitTrailingArrow } from "@/lib/utils";

type UnderlineLinkProps = LinkProps & {
  className?: string;
  children: string;
};

export function UnderlineLink({ className, children, ...props }: UnderlineLinkProps) {
  const { text, arrow } = splitTrailingArrow(children);

  return (
    <Link className={cn("eyebrow link-underline", className)} {...props}>
      {text}
      {arrow && (
        <span className="link-underline-arrow" aria-hidden>
          {arrow}
        </span>
      )}
    </Link>
  );
}
