import "./loading.css";

type LoadingSize = "tiny" | "xs" | "sm" | "md" | "lg" | "xl" | "huge";
type LoadingVariant = "neutral" | "brand" | "on-color";

interface LoadingProps {
  size?: LoadingSize;
  variant?: LoadingVariant;
  className?: string;
  label?: string;
}

export default function Loading({
  size = "md",
  variant = "neutral",
  className,
  label = "جارٍ التحميل...",
}: LoadingProps) {
  const spinnerClass = [
    "dga-loading",
    `dga-loading--${size}`,
    `dga-loading--${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div role="status" aria-busy="true">
      <div className={spinnerClass} aria-hidden="true">
        <div className="dga-loading__circle" />
      </div>
      <span className="sr-only">{label}</span>
    </div>
  );
}
