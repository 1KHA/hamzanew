"use client";
import React from "react";
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
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

// =====================
//   COMPONENT
// =====================

const Tag: React.FC<TagProps> = ({
  label,
  variant = "success",
  size = "md",
  rounded = false,
  outlined = false,
  iconOnly = false,
  leadIcon,
  trailIcon,
  className = "",
  style,
  children,
}) => {
  const buildClass = () => {
    const classes = [
      "tag",
      `tag--${variant}`,
      outlined ? `tag--${variant}-outlined` : "",
      `tag--${size}`,
      rounded ? "tag--rounded" : "",
      iconOnly ? "tag--icon" : "",
      className,
    ];
    return classes.filter(Boolean).join(" ");
  };

  // Icon only mode
  if (iconOnly) {
    return (
      <span className={buildClass()} style={style}>
        {leadIcon ? (
          <span className="tag-icon">
            <img
              src={leadIcon.src}
              alt={leadIcon.alt || ""}
              width={leadIcon.width || 16}
              height={leadIcon.height || 16}
            />
          </span>
        ) : (
          children
        )}
      </span>
    );
  }

  // Default mode
  return (
    <span className={buildClass()} style={style}>
      {leadIcon && (
        <span className="tag-icon">
          <img
            src={leadIcon.src}
            alt={leadIcon.alt || ""}
            width={leadIcon.width || 16}
            height={leadIcon.height || 16}
          />
        </span>
      )}

      {label}

      {trailIcon && (
        <span className="tag-icon">
          <img
            src={trailIcon.src}
            alt={trailIcon.alt || ""}
            width={trailIcon.width || 16}
            height={trailIcon.height || 16}
          />
        </span>
      )}

      {children}
    </span>
  );
};

export default Tag;
