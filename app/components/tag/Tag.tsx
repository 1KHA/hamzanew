"use client";

import React, { memo, useMemo } from "react";
import Image from "next/image";
import "./tag.css";

// =====================
//   TYPES
// =====================

type TagVariant =
  | "neutral"
  | "success"
  | "info"
  | "warning"
  | "error"
  | "on-color"
  | "purple"
  | "pink"
  | "orange";

type TagSize = "lg" | "md" | "sm";

interface TagIconProps {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
}

interface TagProps {
  label?: string;
  variant?: TagVariant;
  size?: TagSize;
  rounded?: boolean;
  outlined?: boolean;
  iconOnly?: boolean;
  leadIcon?: TagIconProps;
  trailIcon?: TagIconProps;
  /** Accessible label — required when iconOnly is true */
  ariaLabel?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

// =====================
//   SUB-COMPONENTS
// =====================

const TagIcon = memo<{ icon: TagIconProps }>(({ icon }) => (
  <span className="tag-icon" aria-hidden="true">
    <Image
      src={icon.src}
      alt="أيقونة الوسم"
      width={icon.width ?? 16}
      height={icon.height ?? 16}
    />
  </span>
));

TagIcon.displayName = "TagIcon";

// =====================
//   COMPONENT
// =====================

const Tag = memo<TagProps>(({
  label,
  variant = "success",
  size = "md",
  rounded = false,
  outlined = false,
  iconOnly = false,
  leadIcon,
  trailIcon,
  ariaLabel,
  className = "",
  style,
  children,
}) => {
  const computedClass = useMemo(
    () =>
      [
        "tag",
        `tag--${variant}`,
        outlined && `tag--${variant}-outlined`,
        `tag--${size}`,
        rounded && "tag--rounded",
        iconOnly && "tag--icon",
        className,
      ]
        .filter(Boolean)
        .join(" "),
    [variant, outlined, size, rounded, iconOnly, className]
  );

  if (iconOnly) {
    return (
      <span
        className={computedClass}
        style={style}
        role="img"
        aria-label={ariaLabel ?? leadIcon?.alt ?? label}
      >
        {leadIcon ? <TagIcon icon={leadIcon} /> : children}
      </span>
    );
  }

  return (
    <span
      className={computedClass}
      style={style}
      aria-label={ariaLabel}
    >
      {leadIcon && <TagIcon icon={leadIcon} />}
      {label}
      {trailIcon && <TagIcon icon={trailIcon} />}
      {children}
    </span>
  );
});

Tag.displayName = "Tag";

export default Tag;
