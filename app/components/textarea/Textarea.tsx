"use client";

import { useId, useState, useCallback, forwardRef } from "react";
import "./textarea.css";

export interface TextareaProps {
  label?: string;
  placeholder?: string;
  variant?: "default" | "lighter" | "darker";
  error?: boolean;
  feedbackIcon?: boolean;
  feedbackIconType?: "success" | "error" | "warning";
  feedbackIconRing?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  scrollbar?: boolean;
  fullwidth?: boolean;
  resize?: boolean;
  cols?: number;
  rows?: number;
  name?: string;
  value?: string;
  defaultValue?: string;
  id?: string;
  extraClass?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onInput?: (event: React.FormEvent<HTMLTextAreaElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  "aria-label"?: string;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean | "true" | "false";
  "aria-required"?: boolean;
  translate?: "yes" | "no";
  lang?: string;
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

const feedbackIcons = {
  success: <SuccessIcon />,
  error: <ErrorIcon />,
  warning: <WarningIcon />,
};

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  {
    label,
    placeholder,
    variant = "default",
    error = false,
    feedbackIcon = false,
    feedbackIconType = "success",
    disabled = false,
    readonly = false,
    scrollbar = true,
    fullwidth = true,
    resize = true,
    cols,
    rows = 4,
    name,
    value,
    defaultValue,
    id: externalId,
    extraClass,
    onChange,
    onInput,
    onBlur,
    onFocus,
    "aria-label": ariaLabel,
    "aria-describedby": ariaDescribedBy,
    "aria-invalid": ariaInvalid,
    "aria-required": ariaRequired,
    translate,
    lang,
  },
  ref
) {
  const internalId = useId();
  const id = externalId ?? internalId;

  const [isFocused, setIsFocused] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const handleFocus = useCallback(
    (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    },
    [onFocus]
  );

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    },
    [onBlur]
  );

  const containerClass = [
    "dga-textarea",
    error ? "dga-textarea--error" : "",
    variant !== "default" ? `dga-textarea--${variant}` : "",
    isFocused ? "focus" : "",
    isActive ? "active" : "",
    disabled ? "disabled" : "",
    readonly ? "dga-textarea--readonly" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const formControlClass = [
    "textarea-control",
    fullwidth ? "textarea-control--fullwidth" : "",
    extraClass ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  const fieldClass = [
    "dga-textarea__field",
    resize ? "dga-textarea__field--resize" : "",
    !scrollbar ? "dga-textarea__field--hidden-scrollbar" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const feedbackIconEl = error ? (
    <span className="dga-textarea__feedback-icon dga-textarea__feedback-icon--error" aria-hidden="true">
      <ErrorIcon />
    </span>
  ) : feedbackIcon ? (
    <span className={`dga-textarea__feedback-icon dga-textarea__feedback-icon--${feedbackIconType}`} aria-hidden="true">
      {feedbackIcons[feedbackIconType]}
    </span>
  ) : null;

  return (
    <div className={formControlClass}>
      {label && (
        <label htmlFor={id} className="textarea-label">
          {label}
        </label>
      )}

      <div
        className={containerClass}
        onMouseDown={() => !disabled && !readonly && setIsActive(true)}
        onMouseUp={() => setIsActive(false)}
        onMouseLeave={() => setIsActive(false)}
      >
        <textarea
          ref={ref}
          id={id}
          name={name}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readonly}
          rows={rows}
          cols={cols}
          value={value}
          defaultValue={defaultValue}
          className={fieldClass}
          aria-label={ariaLabel}
          aria-describedby={ariaDescribedBy}
          aria-invalid={ariaInvalid ?? (error || undefined)}
          aria-required={ariaRequired}
          translate={translate}
          lang={lang}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={onChange}
          onInput={onInput}
        />
        {feedbackIconEl}
      </div>
    </div>
  );
});

export default Textarea;
