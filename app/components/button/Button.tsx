/**
 * Button Component
 *
 * A reusable button component that supports multiple variants,
 * sizes, and icon configurations.
 *
 * @accessibility
 * - Uses semantic button element
 * - Supports keyboard navigation via tabIndex
 * - Icon-only buttons include aria-label for screen readers
 * - Disabled state is properly communicated
 * - Icons are marked as decorative when accompanying text
 */

"use client";

import React from "react";
import "./Button.css";

/* ==========================================================================
   Types & Interfaces
   ========================================================================== */

/**
 * Button variant types
 */
type ButtonVariant =
  | "primary-brand"
  | "primary-neutral"
  | "secondary-outline"
  | "secondary"
  | "secondary-solid"
  | string;

/**
 * Button size types
 */
type ButtonSize = "sm" | "md" | "lg";

/**
 * Icon position types
 */
type IconPosition = "left" | "right";

/**
 * Props for Button component
 */
interface ButtonProps {
  /** Button text label */
  label?: string;
  /** Click handler function */
  onClick?: () => void;
  /** Visual style variant */
  variant?: ButtonVariant;
  /** Button size */
  size?: ButtonSize;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Tab index for keyboard navigation */
  tabIndex?: number;
  /** Whether to show only the icon without label */
  iconOnly?: boolean;
  /** Icon name (without path and extension) */
  icon?: string;
  /** Position of icon relative to label */
  iconPosition?: IconPosition;
  /** Icon dimensions in pixels */
  iconSize?: number;
  /** Additional CSS class for icon styling */
  iconClass?: string;
  /** Additional CSS classes for button */
  className?: string;
  /** HTML button type attribute */
  type?: "button" | "submit" | "reset";
  /** Associates button with a form element by its id (HTML form attribute) */
  form?: string;
  /** Accessible label for icon-only buttons */
  ariaLabel?: string;
  /** Alt text for icon image (defaults to icon name) */
  altText?: string;
}

/* ==========================================================================
   Main Component
   ========================================================================== */

/**
 * Button Component
 *
 * Renders a customizable button with optional icon support.
 *
 * @example
 * // Primary button with label
 * <Button label="Submit" variant="primary-brand" />
 *
 * @example
 * // Button with icon
 * <Button label="Search" icon="search" iconPosition="left" />
 *
 * @example
 * // Icon-only button
 * <Button iconOnly icon="arrow-left" ariaLabel="Go back" />
 */
const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  variant = "primary-brand",
  size = "md",
  disabled = false,
  tabIndex = 0,
  iconOnly = false,
  icon,
  iconPosition = "right",
  iconSize = 16,
  iconClass = "",
  className = "",
  type = "button",
  form,
  ariaLabel,
  altText,
}) => {
  /* Build CSS classes */
  const baseClass = `dga-btn dga-btn--${size} dga-btn--${variant} !flex !justify-center !items-center !p-4 !cursor-pointer`;
  const combinedClass = `${baseClass} ${className}`.trim();

  /**
   * Renders the icon element
   *
   * @param isDecorative - Whether the icon is purely decorative (has accompanying text)
   * @returns Icon image element or null
   */
  const renderIcon = (isDecorative: boolean = true) => {
    if (!icon) return null;

    return (
      <img
        src={`/assets/icons/stroke-standard/${icon}-stroke-rounded.svg`}
        alt={altText || icon}
        width={iconSize}
        height={iconSize}
        className={`inline-block ${iconClass}`}
        aria-hidden={altText ? false : isDecorative}
      />
    );
  };

  return (
    <button
      type={type}
      form={form}
      tabIndex={disabled ? -1 : tabIndex}
      disabled={disabled}
      className={combinedClass}
      onClick={onClick}
      aria-label={iconOnly ? (ariaLabel || label) : (ariaLabel || undefined)}
      aria-disabled={disabled}
    >
      {iconOnly ? (
        /* Icon-only mode: render icon with meaningful alt */
        renderIcon(false)
      ) : (
        /* Standard mode: icon is decorative, label provides meaning */
        <>
          {icon && iconPosition === "left" && renderIcon(true)}
          {label && <span>{label}</span>}
          {icon && iconPosition === "right" && renderIcon(true)}
        </>
      )}
    </button>
  );
};

export default Button;
