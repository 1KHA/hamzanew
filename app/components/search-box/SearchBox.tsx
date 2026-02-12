/**
 * SearchBox Component
 *
 * A reusable search input component with support for:
 * - Multiple sizes (md, lg)
 * - Multiple variants (default, lighter, darker)
 * - Search icon
 * - Clear button
 * - Disabled and readonly states
 * - RTL support
 *
 * @accessibility
 * - Proper input labeling
 * - Focus states
 * - Keyboard accessible
 */

"use client";

import React, { useState, useCallback, type ChangeEvent } from "react";
import "./SearchBox.css";

/* ==========================================================================
   Types & Interfaces
   ========================================================================== */

interface SearchBoxProps {
  /** Input size */
  size?: "md" | "lg";
  /** Visual variant */
  variant?: "default" | "lighter" | "darker";
  /** Placeholder text */
  placeholder?: string;
  /** Current value */
  value?: string;
  /** Change handler */
  onChange?: (value: string) => void;
  /** Clear handler - called when X button is clicked */
  onClear?: () => void;
  /** Search handler - called when Enter key is pressed */
  onSearch?: () => void;
  /** Input name */
  name?: string;
  /** Label text */
  label?: string;
  /** Show search icon */
  showIcon?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Readonly state */
  readonly?: boolean;
  /** Error state */
  error?: boolean;
  /** Full width */
  fullWidth?: boolean;
  /** Additional class name */
  className?: string;
  /** Aria label for accessibility */
  ariaLabel?: string;
}

/* ==========================================================================
   Search Icon Component
   ========================================================================== */

const SearchIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M17.5 17.5 22 22"
    />
    <path
      stroke="currentColor"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M20 11a9 9 0 1 0-18 0 9 9 0 0 0 18 0Z"
    />
  </svg>
);

/* ==========================================================================
   Clear Icon Component
   ========================================================================== */

const ClearIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15 5L5 15M5 5L15 15"
      stroke="#6C737F"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* ==========================================================================
   Main Component
   ========================================================================== */

const SearchBox: React.FC<SearchBoxProps> = ({
  size = "lg",
  variant = "default",
  placeholder = "بحث...",
  value = "",
  onChange,
  onClear,
  onSearch,
  name,
  label,
  showIcon = true,
  disabled = false,
  readonly = false,
  error = false,
  fullWidth = true,
  className = "",
  ariaLabel,
}) => {
  /* Local state for focus/active */
  const [isFocused, setIsFocused] = useState(false);
  const [isActive, setIsActive] = useState(false);

  /* Handle input change */
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.value);
    },
    [onChange]
  );

  /* Handle Enter key */
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        onSearch?.();
      }
    },
    [onSearch]
  );

  /* Handle clear */
  const handleClear = useCallback(() => {
    onChange?.("");
    onClear?.();
  }, [onChange, onClear]);

  /* Build class names */
  const containerClasses = [
    "dga-search-box",
    `dga-search-box--${size}`,
    variant !== "default" && `dga-search-box--${variant}`,
    error && "dga-search-box--error",
    disabled && "dga-search-box--disabled",
    readonly && "readOnly",
    isFocused && "focus",
    isActive && "active",
  ]
    .filter(Boolean)
    .join(" ");

  const formControlClasses = [
    "dga-form-control",
    fullWidth && "dga-form-control--fullwidth",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={formControlClasses}>
      {/* Label */}
      {label && <label className="dga-label">{label}</label>}

      {/* Search Box Container */}
      <div className={containerClasses}>
        {/* Search Icon */}
        {showIcon && (
          <span className="dga-search-box__icon">
            <SearchIcon />
          </span>
        )}

        {/* Input Field */}
        <input
          type="text"
          name={name}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readonly}
          className="dga-search-box__field"
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onMouseDown={() => setIsActive(true)}
          onMouseUp={() => setIsActive(false)}
          onMouseOut={() => setIsActive(false)}
          aria-label={ariaLabel || placeholder}
        />

        {/* Actions */}
        <div className="dga-search-box__actions">
          {/* Clear Button */}
          {value && value.length > 0 && !disabled && !readonly && (
            <>
              <button
                type="button"
                className="dga-search-box__action-btn"
                onClick={handleClear}
                aria-label="مسح البحث"
              >
                <ClearIcon />
              </button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1"
                height="26"
                viewBox="0 0 1 26"
                fill="none"
              >
                <rect
                  x="1"
                  y="0.5"
                  width="25"
                  height="1"
                  transform="rotate(90 1 0.5)"
                  fill="#D2D6DB"
                />
              </svg>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
