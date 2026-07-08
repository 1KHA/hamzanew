"use client";

import { useMemo, useRef, useEffect, useCallback } from "react";
import { DayPicker } from "react-day-picker";
import { ar, enUS } from "date-fns/locale";
import type { Locale } from "date-fns/locale";
import "react-day-picker/style.css";
import Image from "next/image";
import { t } from "@/app/_lib/translationContext";
import type { TestItem, TranslationDict } from "@/app/_lib/booking-types";

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() ?? null;
  return null;
}

// Arabic month and weekday names
const arabicMonths = [
  "hamza-month-january",
  "hamza-month-february",
  "hamza-month-march",
  "hamza-month-april",
  "hamza-month-may",
  "hamza-month-june",
  "hamza-month-july",
  "hamza-month-august",
  "hamza-month-september",
  "hamza-month-october",
  "hamza-month-november",
  "hamza-month-december",
];

const arabicWeekdays = [
  "hamza-sunday",
  "hamza-monday",
  "hamza-tuesday",
  "hamza-wednesday",
  "hamza-thursday",
  "hamza-friday",
  "hamza-saturday",
];

type CustomLocalize = Locale["localize"] & {
  monthLong: (n: number) => string;
  weekday: (n: number, options?: unknown) => string;
  weekdayLong: (n: number, options?: unknown) => string;
};

// Custom locale with translations
const createCustomLocale = (
  translations: TranslationDict | undefined,
  baseLocale: Locale
): Locale => {
  if (!translations) {
    return baseLocale; // Fallback to base locale if no translations
  }

  const baseLocalize = baseLocale.localize as unknown as CustomLocalize;

  // Create a completely new locale object to avoid any caching issues
  const customLocale = {
    ...baseLocale,
    localize: {
      ...baseLocale.localize,
      // Override month functions
      month: (n: number) => {
        const monthKey = arabicMonths[n];
        return monthKey
          ? t(monthKey, translations)
          : (baseLocale.localize.month as (index: number) => string)(n);
      },
      monthLong: (n: number) => {
        const monthKey = arabicMonths[n];
        return monthKey
          ? t(monthKey, translations)
          : baseLocalize.monthLong(n);
      },
      // Override weekday functions - these receive an index (0-6)
      weekday: (n: number, options?: unknown) => {
        const dayIndex = typeof n === "number" ? n : 0;

        // Always try to use translations first
        if (dayIndex >= 0 && dayIndex < arabicWeekdays.length) {
          const weekdayKey = arabicWeekdays[dayIndex];
          if (weekdayKey) {
            const translated = t(weekdayKey, translations);
            // Always use translation if available, even if it matches the key
            if (translated) {
              return translated;
            }
          }
        }
        // Fallback to original locale function
        return baseLocalize.weekday(n, options);
      },
      weekdayLong: (n: number, options?: unknown) => {
        const dayIndex = typeof n === "number" ? n : 0;

        // Always try to use translations first
        if (dayIndex >= 0 && dayIndex < arabicWeekdays.length) {
          const weekdayKey = arabicWeekdays[dayIndex];
          if (weekdayKey) {
            const translated = t(weekdayKey, translations);
            // Always use translation if available, even if it matches the key
            if (translated) {
              return translated;
            }
          }
        }
        // Fallback to original locale function
        return baseLocalize.weekdayLong(n, options);
      },
    } as unknown as CustomLocalize,
    // Ensure options are also copied
    options: baseLocale.options ? { ...baseLocale.options } : undefined,
  };

  return customLocale as unknown as Locale;
};

interface CalendarProps {
  selectedDate?: Date | null;
  currentMonth?: Date;
  onSelect?: (date: Date | undefined) => void;
  onMonthChange?: (date: Date) => void;
  translations: TranslationDict;
  testsList?: TestItem[] | null;
  isModal?: boolean;
}

export default function Calendar({
  selectedDate,
  currentMonth: currentMonthProp,
  onSelect,
  onMonthChange,
  translations,
  testsList,
  isModal = false,
}: CalendarProps) {
  const calendarRef = useRef<HTMLDivElement>(null);
  const language = useMemo(() => getCookie("lang") || "ar-SA", []);
  const currentMonth = useMemo(
    () => currentMonthProp ?? new Date(),
    [currentMonthProp]
  );

  // Extract dates from testsList and normalize them (date only, no time)
  const testDates = useMemo(() => {
    if (!testsList || !Array.isArray(testsList)) return [];

    const dates = new Set<number>();
    testsList.forEach((test) => {
      if (test.testDate) {
        try {
          const date = new Date(test.testDate);
          // Normalize to date only (remove time)
          const normalizedDate = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate()
          );
          dates.add(normalizedDate.getTime());
        } catch (error) {
          console.error("Error parsing testDate:", error);
        }
      }
    });

    return Array.from(dates).map((timestamp) => new Date(timestamp));
  }, [testsList]);

  // Check if a date has tests
  const isDateWithTest = useCallback((date: Date) => {
    if (!date) return false;
    const normalizedDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
    return testDates.some(
      (testDate) => testDate.getTime() === normalizedDate.getTime()
    );
  }, [testDates]);

  // Create locale with translations based on language - memoize to recreate when translations or language change
  const locale = useMemo(() => {
    // Select base locale based on language cookie
    const baseLocale = language === "en-US" ? enUS : ar;
    return createCustomLocale(translations, baseLocale);
  }, [translations, language]);

  const handleSelect = (date: Date | undefined) => {
    if (onSelect) {
      onSelect(date);
    }
  };

  const handleMonthChange = (date: Date) => {
    if (onMonthChange) {
      onMonthChange(date);
    }
  };

  // Custom formatters for weekday names
  const formatters = useMemo(
    () => ({
      formatWeekdayName: (date: Date) => {
        const dayIndex = date.getDay(); // 0 = Sunday, 1 = Monday, etc.
        const weekdayKey = arabicWeekdays[dayIndex];
        return weekdayKey
          ? t(weekdayKey, translations)
          : date.toLocaleDateString(language, { weekday: "short" });
      },
    }),
    [translations, language]
  );

  // Add calendar icon at the beginning of the caption label
  useEffect(() => {
    const addCalendarIcon = () => {
      const captionLabel =
        calendarRef.current?.querySelector(".rdp-caption_label");
      if (captionLabel && !captionLabel.querySelector(".calendar-icon")) {
        const icon = document.createElement("img");
        icon.src = "/test-takers/testing-center/calendar.svg";
        icon.alt = "Calendar";
        icon.className = "calendar-icon";
        icon.style.width = "25px";
        icon.style.height = "25px";
        icon.style.marginRight = "8px";
        icon.style.verticalAlign = "middle";
        captionLabel.prepend(icon);
      }
    };

    // Add icon immediately and also after a short delay to catch re-renders
    addCalendarIcon();
    const timeout = setTimeout(addCalendarIcon, 100);

    // Also observe for changes
    const observer = new MutationObserver(addCalendarIcon);
    if (calendarRef.current) {
      observer.observe(calendarRef.current, { childList: true, subtree: true });
    }

    return () => {
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, [currentMonth]);

  const isArabic = language === "ar-SA";

  return (
    <div
      className={`calendar-wrapper ${isModal ? "calendar-modal" : ""}`}
      ref={calendarRef}
    >
      <DayPicker
        mode="single"
        navLayout="around"
        selected={selectedDate ?? undefined}
        onSelect={handleSelect}
        month={currentMonth}
        onMonthChange={handleMonthChange}
        locale={locale}
        formatters={formatters}
        className={`custom-calendar ${isModal ? "custom-calendar-modal" : ""}`}
        modifiers={{
          hasTest: (date: Date) => isDateWithTest(date),
        }}
        modifiersClassNames={{
          hasTest: "rdp-day_has-test",
        }}
        components={{
          Chevron: ({ orientation, ...props }) => {
            if (orientation === "left") {
              return (
                <Image
                  src={
                    isArabic
                      ? "/test-takers/testing-center/booking-calendar-right-arrow.svg"
                      : "/test-takers/testing-center/booking-calendar-left-arrow.svg"
                  }
                  alt="Previous month"
                  width={24}
                  height={24}
                  unoptimized
                  {...props}
                />
              );
            }
            return (
              <Image
                src={
                  isArabic
                    ? "/test-takers/testing-center/booking-calendar-left-arrow.svg"
                    : "/test-takers/testing-center/booking-calendar-right-arrow.svg"
                }
                alt="Next month"
                width={24}
                height={24}
                  unoptimized
                {...props}
              />
            );
          },
        }}
      />
    </div>
  );
}
