/**
 * Filter Component
 *
 * A dropdown filter component that displays a list of options
 * for the user to select from.
 *
 * @accessibility
 * - Uses proper ARIA attributes for dropdown behavior
 * - Keyboard navigation support (Enter, Escape, Arrow keys)
 * - Focus management for screen readers
 */

"use client";

import { useState, useRef, useEffect } from "react";
import Button from "@/app/components/button/Button";
import "./Filter.css";

/* ==========================================================================
   Types & Interfaces
   ========================================================================== */

/**
 * Interface for filter option item
 */
interface FilterOption {
  id: string;
  label: string;
  value: string;
}

/**
 * Props for Filter component
 */
interface FilterProps {
  /** Title displayed above the options */
  title: string;
  /** Array of filter options */
  options: FilterOption[];
  /** Currently selected option value */
  selectedValue?: string;
  /** Callback when an option is selected */
  onSelect: (value: string) => void;
  /** Button label */
  buttonLabel?: string;
  /** Button icon */
  buttonIcon?: string;
  /** Button variant */
  buttonVariant?: string;
}

/* ==========================================================================
   Main Component
   ========================================================================== */

/**
 * Filter Component
 *
 * Renders a button that opens a dropdown list with selectable options.
 */
export default function Filter({
  title,
  options,
  selectedValue,
  onSelect,
  buttonLabel = "تصفية",
  buttonIcon = "filter",
  buttonVariant = "primary-neutral",
}: FilterProps) {
  /* State */
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  /* Close dropdown when clicking outside */
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  /* Keyboard navigation */
  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case "Escape":
        setIsOpen(false);
        buttonRef.current?.focus();
        break;
      case "Enter":
      case " ":
        if (!isOpen) {
          setIsOpen(true);
        }
        break;
    }
  };

  /* Temporary selection before applying */
  const [tempValue, setTempValue] = useState<string | undefined>(selectedValue);

  /* Update temp value when selectedValue changes */
  useEffect(() => {
    setTempValue(selectedValue);
  }, [selectedValue]);

  /* Handle option selection (temporary) */
  const handleOptionClick = (value: string) => {
    setTempValue(value);
  };

  /* Apply filter */
  const handleApply = () => {
    if (tempValue) {
      onSelect(tempValue);
    }
    setIsOpen(false);
    buttonRef.current?.focus();
  };

  /* Clear filter */
  const handleClear = () => {
    setTempValue(undefined);
    onSelect("");
    setIsOpen(false);
    buttonRef.current?.focus();
  };

  /* Handle option keyboard selection */
  const handleOptionKeyDown = (
    event: React.KeyboardEvent,
    value: string
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleOptionClick(value);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Filter Button */}
      <div onClick={() => setIsOpen(!isOpen)}>
        <Button
          label={buttonLabel}
          variant={buttonVariant}
          size="lg"
          icon={buttonIcon}
          iconPosition="left"
          iconClass={buttonVariant === "primary-neutral" ? "white-icon" : ""}
        />
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="filter-dropdown"
          role="listbox"
          aria-label={title}
          onKeyDown={handleKeyDown}
        >
          {/* Dropdown Title */}
          <div className="filter-dropdown__title">
            <h3 className="text-md-semibold">{title}</h3>
          </div>

          {/* Options List */}
          <ul className="filter-dropdown__list">
            {options.map((option) => {
              const isSelected = tempValue === option.value;

              return (
                <li
                  key={option.id}
                  role="option"
                  aria-selected={isSelected}
                  tabIndex={0}
                  className="filter-dropdown__option"
                  onClick={() => handleOptionClick(option.value)}
                  onKeyDown={(e) => handleOptionKeyDown(e, option.value)}
                >
                  {/* Option Label */}
                  <span className="text-md-regular">{option.label}</span>

                  {/* Checkmark Icon */}
                  {isSelected && (
                    <img
                      src="/assets/icons/stroke-standard/tick-02-stroke-rounded.svg"
                      alt="محدد"
                      width={20}
                      height={20}
                      className="filter-dropdown__checkmark"
                    />
                  )}
                </li>
              );
            })}
          </ul>

          {/* Divider */}
          <hr className="filter-dropdown__divider" />

          {/* Action Buttons */}
          <div className="filter-dropdown__actions">
            <Button
              label="تطبيق الاختيارات"
              variant="primary-brand"
              size="lg"
              onClick={handleApply}
            />
            <Button
              label="إزالة التصفية"
              variant="secondary-outline"
              size="lg"
              onClick={handleClear}
            />
          </div>
        </div>
      )}
    </div>
  );
}
