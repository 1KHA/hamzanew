"use client";

import { useEffect, useState } from "react";
import type { BookingData } from "@/app/_lib/booking-types";

export default function PaymentDataClient() {
  const [bookingData] = useState<BookingData | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      const storedData = sessionStorage.getItem("testBookingData");
      if (storedData) {
        const parsedData = JSON.parse(storedData) as BookingData;
        console.log("=== Payment Data Page - Booking Data ===");
        console.log("Full Booking Data:", parsedData);
        console.log("Test Center ID:", parsedData.testCenterId);
        console.log("Test ID:", parsedData.testId);
        console.log("Selected Time Slot:", parsedData.selectedTimeSlot);
        console.log("Selected Date:", parsedData.selectedDate);
        console.log("Test Type:", parsedData.testType);
        console.log("Test Type Name:", parsedData.testTypeName);
        console.log("Test Type Name (i18n):", parsedData.testTypeName_i18n);
        if (parsedData.testTypeName_i18n) {
          console.log(
            "  - Arabic (ar_SA):",
            parsedData.testTypeName_i18n.ar_SA
          );
          console.log(
            "  - English (en_US):",
            parsedData.testTypeName_i18n.en_US
          );
        }
        console.log("Start Time:", parsedData.startTime);
        console.log("End Time:", parsedData.endTime);
        console.log("Test Date:", parsedData.testDate);
        console.log("Test Status:", parsedData.testStatus);
        console.log("Capacity:", parsedData.capacity);
        console.log("========================================");
        return parsedData;
      } else {
        console.warn("No booking data found in sessionStorage");
      }
      return null;
    } catch (error) {
      console.error("Error retrieving booking data:", error);
      return null;
    }
  });

  // Store booking data in a way that can be accessed by other components
  useEffect(() => {
    if (bookingData) {
      window.__bookingData = bookingData;
    }
  }, [bookingData]);

  return null; // This component only handles logging and data preparation
}
