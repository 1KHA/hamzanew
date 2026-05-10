import NextLink from "next/link";
import "./link.css";

interface LinkProps {
  label?: string;
  url?: string;
  variant?: "primary" | "neutral" | "on-color";
  size?: "sm" | "md" | "lg";
  inline?: boolean;
  disabled?: boolean;
  external?: boolean;
  target?: "_blank" | "_self" | "_parent" | "_top";
  rel?: string;
  icon?: boolean;
  iconType?: React.ReactNode;
  extraClass?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  "aria-label"?: string;
  "aria-current"?: React.AnchorHTMLAttributes<HTMLAnchorElement>["aria-current"];
  role?: string;
  children?: React.ReactNode;
}

export default function Link({
  label,
  url,
  variant = "primary",
  size = "md",
  inline,
  disabled,
  external,
  target = "_self",
  rel,
  icon,
  iconType,
  extraClass = "",
  onClick,
  "aria-label": ariaLabel,
  "aria-current": ariaCurrent,
  role,
  children,
}: LinkProps) {
  const className = [
    "link",
    `link--${size}`,
    `link--${variant}`,
    inline ? "link--inline" : "",
    disabled ? "link--disabled" : "",
    extraClass,
  ]
    .filter(Boolean)
    .join(" ");

  const computedRel =
    rel ?? (target === "_blank" ? "noopener noreferrer" : undefined);

  const content = (
    <>
      <span className="link__label">{label}</span>
      {icon && iconType && <span className="link__icon">{iconType}</span>}
      {children}
    </>
  );

  if (!url) {
    return (
      <span
        className={className}
        aria-label={ariaLabel}
        aria-disabled={disabled || undefined}
        role={role ?? "link"}
      >
        {content}
      </span>
    );
  }

  if (external || target === "_blank" || url.startsWith("http") || url.startsWith("mailto:") || url.startsWith("tel:") || url.startsWith("sms:")) {
    return (
      <a
        href={url}
        className={className}
        target={target}
        rel={computedRel}
        onClick={onClick}
        aria-label={ariaLabel}
        aria-current={ariaCurrent}
        aria-disabled={disabled || undefined}
        role={role}
      >
        {content}
      </a>
    );
  }

  return (
    <NextLink
      href={url}
      className={className}
      target={target}
      rel={computedRel}
      onClick={onClick}
      aria-label={ariaLabel}
      aria-current={ariaCurrent}
      aria-disabled={disabled || undefined}
      role={role}
    >
      {content}
    </NextLink>
  );
}
