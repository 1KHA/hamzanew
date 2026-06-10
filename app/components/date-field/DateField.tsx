"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import DatePicker from "../date-picker/DatePicker";
import "./DateField.css";

/* ── helpers ──────────────────────────────────────────────────── */

const DATE_RE = /^(\d{2})\/(\d{2})\/(\d{4})$/;

function formatDate(d: Date): string {
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

function parseDate(s: string): Date | null {
  const m = DATE_RE.exec(s);
  if (!m) return null;
  const [, dd, mm, yyyy] = m.map(Number);
  if (mm < 1 || mm > 12 || dd < 1 || dd > 31) return null;
  const d = new Date(yyyy, mm - 1, dd);
  if (d.getMonth() !== mm - 1) return null; // overflow check (e.g. Feb 30)
  return d;
}

/* ── CalendarIcon ─────────────────────────────────────────────── */

const CalendarIcon = (
           <img src="/assets/icons/stroke-standard/calendar-03-stroke-rounded.svg" alt="" width={20} height={20} aria-hidden="true" />

);

/* ── Types ────────────────────────────────────────────────────── */

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

export interface DateFieldProps {
  label?: string;
  placeholder?: string;
  value?: Date | null;
  size?: "md" | "lg";
  variant?: "default" | "lighter" | "darker";
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  fullwidth?: boolean;
  rtl?: boolean;
  name?: string;
  maxDate?: Date;
  onChange?: (date: Date | null) => void;
}

/* ── DateField ────────────────────────────────────────────────── */

export default function DateField({
  label,
  placeholder = "DD/MM/YYYY",
  value,
  size = "lg",
  variant = "default",
  error: errorProp = false,
  helperText,
  disabled = false,
  readonly = false,
  required = false,
  fullwidth = true,
  rtl = false,
  name,
  maxDate,
  onChange,
}: DateFieldProps) {
  const id = useId();
  const inputId = `date-field-${id}`;
  const helperId = `date-field-helper-${id}`;

  const [inputValue, setInputValue] = useState(() =>
    value ? formatDate(value) : ""
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(value ?? null);
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  /* adjust picker position to stay on screen */
  useEffect(() => {
    if (isOpen && dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      const viewportWidth = document.documentElement.clientWidth;
      
      dropdownRef.current.style.transform = "none";
      const newRect = dropdownRef.current.getBoundingClientRect();

      let shift = 0;
      if (newRect.right > viewportWidth) {
        shift = viewportWidth - newRect.right - 16;
      } else if (newRect.left < 0) {
        shift = -newRect.left + 16;
      }

      if (shift !== 0) {
        dropdownRef.current.style.transform = `translateX(${shift}px)`;
      }
    }
  }, [isOpen]);

  /* sync when external value changes */
  useEffect(() => {
    if (value !== undefined) {
      setSelectedDate(value ?? null);
      setInputValue(value ? formatDate(value) : "");
    }
  }, [value]);

  /* click outside → close picker */
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen]);

  /* keyboard: Escape closes picker */
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen]);

  const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);

    if (val === "") {
      setSelectedDate(null);
      setErrorMessage("");
      onChange?.(null);
      return;
    }

    const parsed = parseDate(val);
    if (parsed) {
      if (maxDate && startOfDay(parsed) > startOfDay(maxDate)) {
        setErrorMessage(rtl ? "التاريخ يجب أن لا يتجاوز التاريخ الحالي" : "Date exceeds the allowed maximum");
      } else {
        setSelectedDate(parsed);
        setErrorMessage("");
        onChange?.(parsed);
      }
    } else if (DATE_RE.test(val)) {
      setErrorMessage(rtl ? "تاريخ غير صالح" : "Invalid date");
    } else {
      setErrorMessage(rtl ? "استخدم صيغة DD/MM/YYYY" : "Use DD/MM/YYYY format");
    }
  }, [onChange, rtl]);

  const handlePickerChange = useCallback((date: Date) => {
    if (maxDate && startOfDay(date) > startOfDay(maxDate)) {
      setErrorMessage(rtl ? "التاريخ يجب أن لا يتجاوز التاريخ الحالي" : "Date exceeds the allowed maximum");
      setIsOpen(false);
      return;
    }
    setSelectedDate(date);
    setInputValue(formatDate(date));
    setErrorMessage("");
    setIsOpen(false);
    onChange?.(date);
  }, [onChange, maxDate, rtl]);

  const handleBlur = useCallback(() => {
    setTimeout(() => {
      if (!containerRef.current?.contains(document.activeElement)) {
        setIsFocused(false);
        setIsOpen(false);
        if (selectedDate) setInputValue(formatDate(selectedDate));
      }
    }, 150);
  }, [selectedDate]);

  const togglePicker = useCallback(() => {
    if (!disabled && !readonly) setIsOpen(v => !v);
  }, [disabled, readonly]);

  const hasError = errorProp || !!errorMessage;
  const displayHelper = errorMessage || helperText;

  const inputCls = [
    "df-input",
    `df-input--${size}`,
    variant !== "default" && `df-input--${variant}`,
    hasError && "df-input--error",
    disabled && "df-input--disabled",
    readonly && "df-input--readonly",
    isFocused && "df-input--focused",
    isActive && "df-input--active",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      ref={containerRef}
      className={`df-form-control${fullwidth ? " df-form-control--fullwidth" : ""}`}
      dir={rtl ? "rtl" : undefined}
    >
      {label && (
        <label htmlFor={inputId} className="df-label">
          {label}
          {required && (
            <span aria-hidden="true" className="df-label__required"> *</span>
          )}
        </label>
      )}

      <div className={inputCls}>
        <input
          id={inputId}
          name={name}
          type="text"
          className="df-input__field"
          value={inputValue}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readonly}
          required={required}
          aria-invalid={hasError || undefined}
          aria-describedby={displayHelper ? helperId : undefined}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
          onChange={handleInput}
          onMouseDown={() => setIsActive(true)}
          onMouseUp={() => setIsActive(false)}
          onMouseLeave={() => setIsActive(false)}
        />

        <button
          type="button"
          className="df-calendar-btn"
          onClick={togglePicker}
          disabled={disabled || readonly}
          tabIndex={-1}
          aria-label={rtl ? "فتح التقويم" : "Open calendar"}
          aria-expanded={isOpen}
          aria-controls={`${inputId}-picker`}
        >
          {CalendarIcon}
        </button>

        {hasError && (
          <span className="df-feedback-icon df-feedback-icon--error" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" focusable="false">
              <path
                d="M10 6v4m0 4h.008M17.5 10a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        )}
      </div>

      {displayHelper && (
        <p id={helperId} className={`df-helper-text${hasError ? " df-helper-text--error" : ""}`}>
          {displayHelper}
        </p>
      )}

      {isOpen && (
        <div
          ref={dropdownRef}
          id={`${inputId}-picker`}
          className="df-picker-dropdown"
          role="dialog"
          aria-label={rtl ? "منتقي التاريخ" : "Date picker"}
          aria-modal="false"
        >
          <DatePicker
            value={selectedDate}
            rtl={rtl}
            maxDate={maxDate}
            onChange={handlePickerChange}
          />
        </div>
      )}
    </div>
  );
}
