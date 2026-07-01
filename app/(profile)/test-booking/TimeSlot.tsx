"use client";

import { useMemo } from "react";
import "./timeSlot.css";
import { t } from "@/app/_lib/translationContext";
import type { TestItem, TranslationDict } from "@/app/_lib/booking-types";

interface TimeSlotValue {
  value: string;
  display: string;
  startTime: { key: string; name: string };
  endTime: { key: string; name: string };
}

interface TimeSlotProps {
  selectedDate: Date | null;
  selectedTime?: string | null;
  onTimeSelect?: (timeSlot: TimeSlotValue) => void;
  translations: TranslationDict;
  testsList?: TestItem[] | null;
  disabled?: boolean;
  isModal?: boolean;
  existingBookingDate?: Date | null;
  existingBookingTimeSlot?: string | null;
}

export default function TimeSlot({
  selectedDate,
  selectedTime,
  onTimeSelect,
  translations,
  testsList,
  disabled = false,
  isModal = false,
  existingBookingDate = null,
  existingBookingTimeSlot = null,
}: TimeSlotProps) {
  // Filter and extract time slots from tests list based on selected date
  const availableTimeSlots = useMemo<TimeSlotValue[]>(() => {
    if (!selectedDate || !testsList || !Array.isArray(testsList)) {
      return [];
    }

    // Normalize selected date (date only, no time)
    const normalizedSelectedDate = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate()
    );

    // Filter tests that match the selected date
    const matchingTests = testsList.filter((test) => {
      if (!test.testDate) return false;
      try {
        const testDate = new Date(test.testDate);
        const normalizedTestDate = new Date(
          testDate.getFullYear(),
          testDate.getMonth(),
          testDate.getDate()
        );
        return (
          normalizedTestDate.getTime() === normalizedSelectedDate.getTime()
        );
      } catch {
        return false;
      }
    });

    // Extract unique time slots from matching tests
    const slotsMap = new Map<string, TimeSlotValue>();
    matchingTests.forEach((test) => {
      if (test.startTime && test.endTime) {
        const key = `${test.startTime.key}-${test.endTime.key}`;
        const display = `${test.startTime.name} - ${test.endTime.name}`;

        // Only add if not already in map (to avoid duplicates)
        if (!slotsMap.has(key)) {
          slotsMap.set(key, {
            value: key,
            display,
            startTime: test.startTime,
            endTime: test.endTime,
          });
        }
      }
    });

    // Convert map to array and sort by start time key (24-hour format: "0430" = 04:30)
    return Array.from(slotsMap.values()).sort((a, b) => {
      const timeStringA = String(a.startTime.key || "0000").padStart(4, "0");
      const timeStringB = String(b.startTime.key || "0000").padStart(4, "0");
      const startA = parseInt(timeStringA, 10);
      const startB = parseInt(timeStringB, 10);
      return startA - startB;
    });
  }, [selectedDate, testsList]);

  const isExistingBookingSlot = (timeSlot: TimeSlotValue) => {
    if (!existingBookingDate || !existingBookingTimeSlot || !selectedDate) {
      return false;
    }

    const normalizedSelectedDate = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate()
    );

    const normalizedExistingDate = new Date(
      existingBookingDate.getFullYear(),
      existingBookingDate.getMonth(),
      existingBookingDate.getDate()
    );

    const dateMatches =
      normalizedSelectedDate.getTime() === normalizedExistingDate.getTime();
    const timeMatches = timeSlot.value === existingBookingTimeSlot;

    return dateMatches && timeMatches;
  };

  const handleTimeClick = (timeSlot: TimeSlotValue) => {
    if (disabled || isExistingBookingSlot(timeSlot)) {
      return; // Prevent selection if disabled or is existing booking slot
    }
    if (onTimeSelect) {
      onTimeSelect(timeSlot);
    }
  };

  return (
    <div className={`timeslot-wrapper ${isModal ? "timeslot-modal" : ""}`}>
      <h3 className="timeslot-title">
        {t("hamza-exam-booking-choose-time-24-hour-system", translations)}
      </h3>
      <div className="timeslot-list">
        {availableTimeSlots.length > 0 ? (
          availableTimeSlots.map((timeSlot, index) => {
            const slotIsExistingBooking = isExistingBookingSlot(timeSlot);
            const isSlotDisabled = disabled || slotIsExistingBooking;

            return (
              <button
                key={index}
                className={`timeslot-item ${
                  selectedTime === timeSlot.value ? "selected" : ""
                } ${isSlotDisabled ? "disabled" : ""}`}
                onClick={() => handleTimeClick(timeSlot)}
                disabled={isSlotDisabled}
              >
                {timeSlot.display}
              </button>
            );
          })
        ) : (
          <div className="timeslot-empty">
            {selectedDate
              ? t("hamza-no-time-slots-available", translations) ||
                "No time slots available for this date"
              : t("hamza-select-date-first", translations) ||
                "Please select a date first"}
          </div>
        )}
      </div>
    </div>
  );
}
