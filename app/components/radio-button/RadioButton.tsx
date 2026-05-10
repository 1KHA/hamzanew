"use client";

import { useId, useState, useCallback, forwardRef } from "react";
import "./radio-button.css";

export interface RadioButtonProps {
  label?: string;
  helperText?: string;
  alertMessage?: boolean;
  alertText?: string;
  color?: "brand" | "neutral";
  disabled?: boolean;
  name?: string;
  value?: string;
  checked?: boolean;
  id?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onInput?: (event: React.FormEvent<HTMLInputElement>) => void;
  "aria-label"?: string;
  "aria-describedby"?: string;
}

const AlertIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <circle cx="12" cy="16" r="0.5" fill="currentColor" />
  </svg>
);

const RadioButton = forwardRef<HTMLInputElement, RadioButtonProps>(function RadioButton(
  {
    label,
    helperText,
    alertMessage,
    alertText,
    color = "brand",
    disabled = false,
    name,
    value = "",
    checked,
    id: externalId,
    onChange,
    onInput,
    "aria-label": ariaLabel,
    "aria-describedby": ariaDescribedBy,
  },
  ref
) {
  const internalId = useId();
  const id = externalId ?? internalId;
  const helperId = `${id}-helper`;
  const alertId = `${id}-alert`;

  const [isActive, setIsActive] = useState(false);

  const handleMouseDown = useCallback(() => {
    if (!disabled) setIsActive(true);
  }, [disabled]);

  const handleMouseUp = useCallback(() => setIsActive(false), []);
  const handleMouseLeave = useCallback(() => setIsActive(false), []);

  const describedBy = [
    helperText ? helperId : "",
    alertMessage && alertText ? alertId : "",
    ariaDescribedBy ?? "",
  ]
    .filter(Boolean)
    .join(" ") || undefined;

  const labelClass = [
    "radio",
    `radio--${color}`,
    isActive ? "active" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <label
      htmlFor={id}
      className={labelClass}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      <div className="radio-main">
        <div className="radio-main__content">
          <input
            ref={ref}
            type="radio"
            id={id}
            name={name}
            value={value}
            checked={checked}
            disabled={disabled}
            aria-label={ariaLabel}
            aria-describedby={describedBy}
            aria-checked={checked}
            onChange={onChange}
            onInput={onInput}
          />
          <div className="radio-container" aria-hidden="true" />

          {(label || helperText) && (
            <div className="dga-flex-column" style={{ display: "flex", flexDirection: "column" }}>
              {label && <span className="radio__label">{label}</span>}
              {helperText && (
                <span id={helperId} className="radio__helper-text">
                  {helperText}
                </span>
              )}
            </div>
          )}
        </div>

        {alertMessage && alertText && (
          <div id={alertId} className="radio__warning" role="alert">
            <span className="radio__warning-icon">
              <AlertIcon />
            </span>
            <span>{alertText}</span>
          </div>
        )}
      </div>
    </label>
  );
});

export default RadioButton;
