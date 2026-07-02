"use client";

import "./bookingSlotCard.css";
import type { TestBooking } from "@/app/_lib/booking-types";

// Format date for display (DD.MM.YYYY)
function formatDate(dateString: string | undefined | null) {
  if (!dateString) return "00.00.0000";
  try {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  } catch {
    return "00.00.0000";
  }
}

// Format timeslot for display (HH:MM - HH:MM)
function formatTimeSlot(
  startTime: { key?: string; name?: string } | string | undefined | null,
  endTime: { key?: string; name?: string } | string | undefined | null
) {
  if (!startTime || !endTime) return "00:00 - 00:00";
  try {
    const startKey = typeof startTime === "object" ? startTime.key : startTime;
    const endKey = typeof endTime === "object" ? endTime.key : endTime;
    // Format 24-hour format: "0430" = 04:30
    const formatTime = (timeKey: string | undefined) => {
      const timeString = String(timeKey || "0000").padStart(4, "0");
      const hour = timeString.substring(0, 2);
      const minute = timeString.substring(2, 4);
      return `${hour}:${minute}`;
    };
    return `${formatTime(startKey)} - ${formatTime(endKey)}`;
  } catch {
    return "00:00 - 00:00";
  }
}

interface BookingSlotCardProps {
  booking?: Partial<TestBooking> | null;
  isActive?: boolean;
}

export default function BookingSlotCard({
  booking,
  isActive = true,
}: BookingSlotCardProps) {
  const formattedDate = booking?.testDate
    ? formatDate(booking.testDate)
    : "00.00.0000";
  const formattedTime = formatTimeSlot(booking?.startTime, booking?.endTime);
  const testName = booking?.typeOfTheTest?.name || "";
  const testMechanism = booking?.locationType?.name || "";

  return (
    <div className={`booking-slot-card ${isActive ? "active" : "disabled"}`}>
      <div className="booking-slot-content">
        <div className="booking-slot-right">
          <div className="booking-slot-date">{formattedDate}</div>
          <div className="booking-slot-test-name">{testName}</div>
          <div className="booking-slot-mechanism">{testMechanism}</div>
        </div>
        <div className="booking-slot-left">
          <div className="booking-slot-time">{formattedTime}</div>
        </div>
      </div>
    </div>
  );
}
