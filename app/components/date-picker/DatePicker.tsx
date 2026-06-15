"use client";

import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./DatePicker.css";

/* ── date helpers ─────────────────────────────────────────────── */

function getMonthDays(date: Date): Date[] {
  const count = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  return Array.from({ length: count }, (_, i) => new Date(date.getFullYear(), date.getMonth(), i + 1));
}

function getDaysFromPrevMonth(date: Date): Date[] {
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  const prev = new Date(date.getFullYear(), date.getMonth(), 0);
  const result: Date[] = [];
  for (let i = 0; i < firstDay; i++)
    result.unshift(new Date(prev.getFullYear(), prev.getMonth(), prev.getDate() - i));
  return result;
}

function getDaysFromNextMonth(date: Date): Date[] {
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();
  const next = new Date(date.getFullYear(), date.getMonth() + 1, 1);
  const result: Date[] = [];
  for (let i = 1; i <= 6 - lastDay; i++)
    result.push(new Date(next.getFullYear(), next.getMonth(), i));
  return result;
}

function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

const DAYS = {
  en: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  ar: ["أحد", "إثنين", "ثلاثاء", "أربعاء", "خميس", "جمعة", "سبت"],
};

const MONTHS = {
  en: ["January","February","March","April","May","June","July","August","September","October","November","December"],
  ar: ["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"],
};

/* ── DateCell ─────────────────────────────────────────────────── */

interface DateCellProps {
  date: Date;
  isCurrentMonth: boolean;
  isSelected: boolean;
  isToday: boolean;
  disabled?: boolean;
  onSelect: (d: Date) => void;
}

const DateCell = memo(function DateCell({
  date, isCurrentMonth, isSelected, isToday, disabled, onSelect,
}: DateCellProps) {
  let cls = "date-cell";
  if (!isCurrentMonth) cls += " date-cell--not-current-month";
  if (isSelected)      cls += " date-cell--selected";
  if (isToday)         cls += " date-cell--today";
  if (disabled)        cls += " date-cell--disabled";

  return (
    <button
      type="button"
      className={cls}
      onClick={() => isCurrentMonth && !disabled && onSelect(date)}
      disabled={!isCurrentMonth || disabled}
      tabIndex={isCurrentMonth && !disabled ? 0 : -1}
      aria-label={date.toLocaleDateString("ar-SA", { day: "numeric", month: "long", year: "numeric" })}
      aria-pressed={isSelected}
    >
      <div className="date-cell__label">
        <span>{date.getDate()}</span>
      </div>
    </button>
  );
});

/* ── MonthNavigator ───────────────────────────────────────────── */

interface MonthNavProps {
  currentMonth: Date;
  rtl: boolean;
  onChange: (d: Date) => void;
}

const MonthNavigator = memo(function MonthNavigator({ currentMonth, rtl, onChange }: MonthNavProps) {
  const [yearOpen, setYearOpen] = useState(false);
  const dropdownRef = useRef<HTMLUListElement>(null);
  const lang = rtl ? "ar" : "en";

  const thisYear = new Date().getFullYear();
  const years = useMemo(() => {
    const list: number[] = [];
    for (let y = thisYear - 50; y <= thisYear + 50; y++) list.push(y);
    return list;
  }, [thisYear]);

  /* scroll to selected year when dropdown opens */
  useEffect(() => {
    if (!yearOpen || !dropdownRef.current) return;
    const el = dropdownRef.current.querySelector<HTMLElement>(".selected-year");
    if (el) {
      const { offsetHeight } = dropdownRef.current;
      dropdownRef.current.scrollTop = el.offsetTop - offsetHeight / 2 + 20;
    }
  }, [yearOpen]);

  const selectYear = (year: number, e: React.MouseEvent | React.KeyboardEvent) => {
    e.stopPropagation();
    onChange(new Date(year, currentMonth.getMonth(), 1));
    setTimeout(() => setYearOpen(false), 5);
  };

  return (
    <div className="date-picker__navigator">
      <div className="date-picker__navigator-label">
        {MONTHS[lang][currentMonth.getMonth()]}{" "}
        <span
          className="year-selector"
          role="button"
          tabIndex={0}
          aria-haspopup="listbox"
          aria-expanded={yearOpen}
          aria-label={rtl ? "اختر السنة" : "Select year"}
          onClick={() => setYearOpen(v => !v)}
          onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setYearOpen(v => !v); } }}
        >
          {currentMonth.getFullYear()}
          {yearOpen && (
            <ul
              ref={dropdownRef}
              role="listbox"
              className="dga-breadcrumb-dropdown"
              aria-label={rtl ? "قائمة السنوات" : "Year list"}
            >
              {years.map(y => (
                <li
                  key={y}
                  role="option"
                  tabIndex={0}
                  aria-selected={y === currentMonth.getFullYear()}
                  className={`dga-breadcrumb-dropdown-item${y === currentMonth.getFullYear() ? " selected-year" : ""}`}
                  onClick={e => selectYear(y, e)}
                  onKeyDown={e => { if (e.key === "Enter") selectYear(y, e); }}
                >
                  <span className="link__label">{y}</span>
                </li>
              ))}
            </ul>
          )}
        </span>
      </div>

      <div className="date-picker__navigator-buttons">
        <button
          type="button"
          className="dp-nav-btn"
          onClick={() => onChange(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
          aria-label={rtl ? "الشهر التالي" : "Previous month"}
        >
          <img src="/assets/icons/stroke-standard/arrow-left-02-stroke-rounded.svg" alt="" width={20} height={20} aria-hidden="true" />
        </button>
        <button
          type="button"
          className="dp-nav-btn"
          onClick={() => onChange(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
          aria-label={rtl ? "الشهر السابق" : "Next month"}
        >
          <img src="/assets/icons/stroke-standard/arrow-right-02-stroke-rounded.svg" alt="" width={20} height={20} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
});

/* ── DatePicker ───────────────────────────────────────────────── */

export interface DatePickerProps {
  value?: Date | null;
  rtl?: boolean;
  maxDate?: Date;
  onChange: (date: Date) => void;
}

export default function DatePicker({ value, rtl = false, maxDate, onChange }: DatePickerProps) {
  const today = useMemo(() => new Date(), []);
  const [currentMonth, setCurrentMonth] = useState(() =>
    value
      ? new Date(value.getFullYear(), value.getMonth(), 1)
      : new Date(today.getFullYear(), today.getMonth(), 1)
  );

  /* keep calendar in sync when external value changes */
  useEffect(() => {
    if (value) setCurrentMonth(new Date(value.getFullYear(), value.getMonth(), 1));
  }, [value]);

  const days = useMemo(() => [
    ...getDaysFromPrevMonth(currentMonth).slice(0, 2),
    ...getMonthDays(currentMonth),
    ...getDaysFromNextMonth(currentMonth).slice(0, 2),
  ], [currentMonth]);

  const handleSelect = useCallback((date: Date) => onChange(date), [onChange]);
  const lang = rtl ? "ar" : "en";

  return (
    <div
      className="date-picker-root dga-flex-column"
      dir={rtl ? "rtl" : "ltr"}
      role="application"
      aria-label={rtl ? "منتقي التاريخ" : "Date picker"}
    >
      <div className="date-picker">
        <MonthNavigator currentMonth={currentMonth} rtl={rtl} onChange={setCurrentMonth} />

        <div className="date-picker__weekdays" role="row" aria-hidden="true">
          {DAYS[lang].map(d => (
            <div key={d} className="date-picker__weekday" role="columnheader">
              {d}
            </div>
          ))}
        </div>

        <div className="date-picker__date-grid" role="grid" aria-label={rtl ? "أيام الشهر" : "Month days"}>
          {days.map(date => (
            <DateCell
              key={date.toISOString()}
              date={date}
              isCurrentMonth={date.getMonth() === currentMonth.getMonth()}
              isSelected={value ? sameDay(date, value) : false}
              isToday={sameDay(date, today)}
              disabled={maxDate ? startOfDay(date) > startOfDay(maxDate) : false}
              onSelect={handleSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
