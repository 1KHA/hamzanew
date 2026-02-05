"use client";
import React from "react";

interface ButtonProps {
  label?: string;
  onClick?: () => void;
  variant?:
    | "primary-brand"
    | "secondary-outline"
    | "secondary"
    | "secondary-solid"
    | string;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  tabIndex?: number;
  iconOnly?: boolean;
  icon?: string;
  iconPosition?: "left" | "right";
  iconSize?: number;
  iconClass?: string;
  className?: string;
  type?: "button" | "submit" | "reset";
}

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
}) => {
  const baseClass = `dga-btn dga-btn--${size} dga-btn--${variant} !flex !justify-center !items-center !p-4 !cursor-pointer`;
  const combinedClass = `${baseClass} ${className}`.trim();

  const renderIcon = () => {
    if (!icon) return null;

    return (
      <img
        alt=""
        width={iconSize}
        height={iconSize}
        className={`inline-block ${iconClass}`}
        src={`/assets/icons/stroke-standard/${icon}-stroke-rounded.svg`}
      />
    );
  };

  return (
    <button
      type={type}
      tabIndex={tabIndex}
      disabled={disabled}
      className={combinedClass}
      onClick={onClick}
    >
      {iconOnly ? (
        renderIcon()
      ) : (
        <>
          {icon && iconPosition === "left" && renderIcon()}
          {label && <span>{label}</span>}
          {icon && iconPosition === "right" && renderIcon()}
        </>
      )}
    </button>
  );
};

export default Button;
