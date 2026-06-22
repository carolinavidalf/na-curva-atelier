type WordmarkProps = {
  className?: string;
  barClassName?: string;
};

/**
 * Na Curva logo wordmark.
 * "na __ curva" — heavy lowercase sans with a bar between the words.
 */
export function Wordmark({ className = "", barClassName = "" }: WordmarkProps) {
  return (
    <span className={`wordmark ${className}`}>
      <span>na</span>
      <span className={`wordmark__bar ${barClassName}`} aria-hidden="true" />
      <span>curva</span>
    </span>
  );
}
