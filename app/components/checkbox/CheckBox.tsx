"use client";
import { useId, useEffect, useRef, useCallback } from "react";
import "./checkbox.css";

export interface CheckBoxProps {
  color?: "brand" | "neutral";
  size?: "lg" | "md" | "sm";
  label?: string;
  helperText?: string;
  alertMessage?: boolean;
  alertText?: string;
  disabled?: boolean;
  readonly?: boolean;
  name?: string;
  value?: string;
  checked?: boolean;
  indeterminate?: boolean;
  onChange?: (event?: React.ChangeEvent<HTMLInputElement>) => void;
  id?: string;
  extraClass?: string;
}

export default function CheckBox({
  color = "brand",
  size = "md",
  label,
  helperText,
  alertMessage,
  alertText,
  disabled = false,
  readonly = false,
  name,
  value = "",
  checked = false,
  indeterminate = false,
  onChange,
  id: externalId,
  extraClass,
}: CheckBoxProps) {
  const internalId = useId();
  const id = externalId ?? internalId;
  const helperId = `${id}-helper`;
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate && !checked;
    }
  }, [indeterminate, checked]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled || readonly) return;
      onChange?.(e);
    },
    [disabled, readonly, onChange]
  );

  const classNames = [
    "checkbox",
    `checkbox--${color}`,
    `checkbox--${size}`,
    indeterminate && !checked ? "checkbox--indeterminate" : "",
    readonly ? "checkbox--readonly" : "",
    disabled ? "checkbox--disabled" : "",
    extraClass ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <label className={classNames}>
      <div className="checkbox-main">
        <div className="checkbox-main__content">
          <input
            ref={inputRef}
            id={id}
            type="checkbox"
            name={name}
            value={value}
            checked={checked}
            disabled={disabled || readonly}
            aria-disabled={readonly || undefined}
            aria-checked={indeterminate && !checked ? "mixed" : undefined}
            aria-describedby={helperText ? helperId : undefined}
            onChange={handleChange}
          />

          <span className="checkbox-container" aria-hidden="true">
            <span className="checkbox__checked-icon">
              {indeterminate && !checked ? (
                <svg
                  width="10"
                  height="2"
                  viewBox="0 0 10 2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  aria-hidden="true"
                  focusable="false"
                >
                  <line x1="0" y1="1" x2="10" y2="1" />
                </svg>
              ) : (
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
          </span>

          {!helperText ? (
            label && <span className="checkbox__label">{label}</span>
          ) : (
            <div style={{ display: "flex", flexDirection: "column" }}>
              {label && <span className="checkbox__label">{label}</span>}
              <span id={helperId} className="checkbox__helper-text">
                {helperText}
              </span>
            </div>
          )}
        </div>

        {alertMessage && alertText && (
          <div className="checkbox__warning" role="alert">
            <span className="checkbox__warning-icon" aria-hidden="true">
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
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <circle cx="12" cy="16" r="0.5" fill="currentColor" />
              </svg>
            </span>
            <span className="checkbox__warning-text">{alertText}</span>
          </div>
        )}
      </div>
    </label>
  );
}
