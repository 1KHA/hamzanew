"use client";
import { useId, useState, useCallback, forwardRef } from "react";
import type { ReactNode } from "react";
import "./text-input.css";

export interface TextInputProps {
  label?: string;
  placeholder?: string;
  size?: "md" | "lg";
  type?: "text" | "number" | "password" | "email" | "tel" | "search" | "url";
  variant?: "default" | "lighter" | "darker";
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  fullwidth?: boolean;
  name?: string;
  value?: string;
  defaultValue?: string;
  autoComplete?: string;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onInput?: (event: React.FormEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  id?: string;
  extraClass?: string;
  "aria-label"?: string;
  "aria-describedby"?: string;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  prefix?: ReactNode;
  suffix?: ReactNode;
  feedbackIcon?: boolean;
  feedbackIconType?: "success" | "error" | "warning";
}

const SuccessIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const ErrorIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <circle cx="12" cy="16" r="0.5" fill="currentColor" />
  </svg>
);

const WarningIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const feedbackIcons = { success: <SuccessIcon />, error: <ErrorIcon />, warning: <WarningIcon /> };

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(function TextInput(
  {
    label,
    placeholder,
    size = "lg",
    type = "text",
    variant = "default",
    error = false,
    helperText,
    disabled = false,
    readonly = false,
    required = false,
    fullwidth = true,
    name,
    value,
    defaultValue,
    autoComplete,
    maxLength,
    minLength,
    pattern,
    onChange,
    onInput,
    onBlur,
    onFocus,
    id: externalId,
    extraClass,
    "aria-label": ariaLabel,
    "aria-describedby": ariaDescribedBy,
    leadingIcon,
    trailingIcon,
    prefix,
    suffix,
    feedbackIcon = false,
    feedbackIconType = "success",
  },
  ref
) {
  const internalId = useId();
  const id = externalId ?? internalId;
  const helperId = `${id}-helper`;

  const [isFocused, setIsFocused] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const handleFocus = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    },
    [onFocus]
  );

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    },
    [onBlur]
  );

  const containerClass = [
    "input",
    `input--${size}`,
    variant !== "default" ? `input--${variant}` : "",
    error ? "input--error" : "",
    disabled ? "input--disabled" : "",
    readonly ? "readOnly" : "",
    isFocused ? "focus" : "",
    isActive ? "active" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const formControlClass = [
    "dga-form-control",
    fullwidth ? "dga-form-control--fullwidth" : "",
    extraClass ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  const trailingContent = error ? (
    <span className="input__feedback-icon input__feedback-icon--error" aria-hidden="true">
      <ErrorIcon />
    </span>
  ) : feedbackIcon ? (
    <span className={`input__feedback-icon input__feedback-icon--${feedbackIconType}`} aria-hidden="true">
      {feedbackIcons[feedbackIconType]}
    </span>
  ) : trailingIcon ? (
    <span className="input__icon" aria-hidden="true">
      {trailingIcon}
    </span>
  ) : null;

  const describedBy = [helperText ? helperId : "", ariaDescribedBy ?? ""].filter(Boolean).join(" ") || undefined;

  return (
    <div className={formControlClass}>
      {label && (
        <label
          htmlFor={id}
          className={`dga-label dga-label--${size}${disabled ? " disabled" : ""}`}
        >
          {required && (
            <span className="star" aria-hidden="true">
              *
            </span>
          )}
          {label}
        </label>
      )}

      <div
        className={containerClass}
        onMouseDown={() => !disabled && !readonly && setIsActive(true)}
        onMouseUp={() => setIsActive(false)}
        onMouseLeave={() => setIsActive(false)}
      >
        {prefix}

        {leadingIcon && (
          <span className="input__icon" aria-hidden="true">
            {leadingIcon}
          </span>
        )}

        <input
          ref={ref}
          id={id}
          type={type}
          name={name}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readonly}
          required={required}
          value={value}
          defaultValue={defaultValue}
          autoComplete={autoComplete}
          maxLength={maxLength}
          minLength={minLength}
          pattern={pattern}
          aria-label={ariaLabel}
          aria-describedby={describedBy}
          aria-invalid={error || undefined}
          aria-required={required || undefined}
          className="input__field"
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={onChange}
          onInput={onInput}
        />

        {trailingContent}
        {suffix}
      </div>

      {helperText && (
        <div
          id={helperId}
          className={`dga-helper-text${error ? " dga-helper-text--error" : ""}`}
          role={error ? "alert" : undefined}
          aria-live={error ? "polite" : undefined}
        >
          {error && (
            <span className="dga-helper-text__icon" aria-hidden="true">
              <ErrorIcon />
            </span>
          )}
          <span className="dga-helper-text__desc">{helperText}</span>
        </div>
      )}
    </div>
  );
});

export default TextInput;
