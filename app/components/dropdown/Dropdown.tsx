"use client";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import "./dropdown.css";

export interface DropdownOption {
  [key: string]: string;
}

export interface DropdownProps {
  options: DropdownOption[];
  placeholder?: string;
  size?: "md" | "lg";
  variant?: "default" | "lighter" | "darker";
  error?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  multiSelect?: boolean;
  optionLabel?: string;
  trackBy?: string;
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  getSelectedOptions?: (event: DropdownOption | { selectedList: DropdownOption[]; selectedOption: DropdownOption; selectedIndex: number }) => void;
  extraClass?: string;
  label?: string;
  id?: string;
}

export default function Dropdown({
  options = [],
  placeholder,
  size = "lg",
  variant = "default",
  error = false,
  disabled = false,
  readonly = false,
  multiSelect = false,
  optionLabel = "name",
  trackBy = "value",
  value,
  onChange,
  getSelectedOptions,
  extraClass,
  label,
  id: externalId,
}: DropdownProps) {
  const internalId = useId();
  const id = externalId ?? internalId;
  const listId = `${id}-list`;
  const labelId = `${id}-label`;

  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [selected, setSelected] = useState<Record<string, boolean>>(() => {
    if (!value) return {};
    const vals = Array.isArray(value) ? value : [value];
    return Object.fromEntries(vals.map((v) => [v, true]));
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Sync controlled value
  useEffect(() => {
    if (value === undefined) return;
    const vals = Array.isArray(value) ? value : [value];
    setSelected(Object.fromEntries(vals.map((v) => [v, true])));
  }, [value]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        close();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Close on Escape anywhere
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        btnRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  const close = () => {
    setOpen(false);
    setActiveIndex(-1);
  };

  const toggle = () => {
    if (disabled || readonly) return;
    setOpen((prev) => !prev);
    setActiveIndex(-1);
  };

  const selectOption = useCallback(
    (option: DropdownOption, index: number) => {
      if (multiSelect) {
        setSelected((prev) => {
          const next = { ...prev, [option[trackBy]]: !prev[option[trackBy]] };
          const selectedVals = options.filter((o) => next[o[trackBy]]).map((o) => o[trackBy]);
          // Schedule callbacks after render via setTimeout to avoid setState-during-render
          setTimeout(() => {
            onChange?.(selectedVals);
            getSelectedOptions?.({
              selectedList: options.filter((o) => next[o[trackBy]]),
              selectedOption: option,
              selectedIndex: index,
            });
          }, 0);
          return next;
        });
      } else {
        setSelected({ [option[trackBy]]: true });
        onChange?.(option[trackBy]);
        getSelectedOptions?.(option);
        close();
        btnRef.current?.focus();
      }
    },
    [multiSelect, onChange, getSelectedOptions, options, trackBy]
  );

  const handleBtnKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!open) setOpen(true);
      const next = e.key === "ArrowDown" ? 0 : options.length - 1;
      setActiveIndex(next);
      requestAnimationFrame(() => optionRefs.current[next]?.focus());
    }
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    }
  };

  const handleOptionKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.min(index + 1, options.length - 1);
      setActiveIndex(next);
      optionRefs.current[next]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (index === 0) {
        setActiveIndex(-1);
        btnRef.current?.focus();
      } else {
        const next = index - 1;
        setActiveIndex(next);
        optionRefs.current[next]?.focus();
      }
    } else if (e.key === "Tab") {
      close();
    } else if (e.key === "Home") {
      e.preventDefault();
      setActiveIndex(0);
      optionRefs.current[0]?.focus();
    } else if (e.key === "End") {
      e.preventDefault();
      const last = options.length - 1;
      setActiveIndex(last);
      optionRefs.current[last]?.focus();
    }
  };

  const selectedLabels = options
    .filter((o) => selected[o[trackBy]])
    .map((o) => o[optionLabel])
    .join("، ");

  const hasValue = selectedLabels.length > 0;

  const classNames = [
    "dropdown",
    `dropdown--${size}`,
    variant !== "default" ? `dropdown--${variant}` : "",
    error ? "dropdown--error" : "",
    disabled ? "dropdown--disabled" : "",
    readonly ? "dropdown--readonly" : "",
    multiSelect ? "dropdown--multi-select" : "",
    extraClass ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={containerRef} className={classNames}>
      {label && (
        <label id={labelId} className="input-label" htmlFor={id}>
          {label}
        </label>
      )}

      <button
        id={id}
        ref={btnRef}
        type="button"
        className="dropdown__btn"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-labelledby={label ? `${labelId} ${id}` : undefined}
        aria-disabled={disabled || readonly}
        disabled={disabled}
        onClick={toggle}
        onKeyDown={handleBtnKeyDown}
      >
        <span
          className={`dropdown__label${hasValue ? " dropdown__label--has-value" : ""}`}
          aria-live="polite"
          aria-atomic="true"
        >
          {selectedLabels}
        </span>

        {!hasValue && (
          <span className="dropdown__label-placeholder" aria-hidden="true">
            {placeholder}
          </span>
        )}

        <span className="dropdown__chevron" aria-hidden="true">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            focusable="false"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </button>

      <ul
        id={listId}
        role="listbox"
        aria-multiselectable={multiSelect}
        aria-label={placeholder ?? label}
        className={`dropdown__list${open ? " dropdown__list--open" : ""}`}
      >
        {options.map((option, index) => {
          const val = option[trackBy];
          const isSelected = Boolean(selected[val]);
          const isActive = activeIndex === index;

          return (
            <li key={val ?? index} role="presentation">
              <button
                ref={(el) => { optionRefs.current[index] = el; }}
                type="button"
                role="option"
                aria-selected={isSelected}
                data-value={val}
                className={`dropdown__option${isActive ? " dropdown__option--active" : ""}`}
                tabIndex={open ? 0 : -1}
                onClick={() => selectOption(option, index)}
                onKeyDown={(e) => handleOptionKeyDown(e, index)}
              >
                {multiSelect && (
                  <span className="dropdown__option-checkbox" aria-hidden="true">
                    {isSelected && (
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                        focusable="false"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </span>
                )}

                <span className="dropdown__option-label">{option[optionLabel] ?? ""}</span>

                {!multiSelect && (
                  <span className="dropdown__option-check" aria-hidden="true">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
