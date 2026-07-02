"use client";

import { useMemo, useState } from "react";
import BookingHeader from "../BookingHeader";
import type { BookingData, TranslationDict } from "@/app/_lib/booking-types";

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() ?? null;
  return null;
}

interface PaymentPageClientProps {
  translations: TranslationDict;
  isFormLoading?: boolean;
}

export default function PaymentPageClient({
  translations,
  isFormLoading = true,
}: PaymentPageClientProps) {
  const [language] = useState(() => getCookie("lang") || "ar-SA");
  const [bookingData] = useState<BookingData | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      const storedData = sessionStorage.getItem("testBookingData");
      return storedData ? (JSON.parse(storedData) as BookingData) : null;
    } catch {
      return null;
    }
  });

  // Get localized test name
  const testName = useMemo(() => {
    if (!bookingData) return "";

    const i18n = bookingData.testTypeName_i18n;
    if (i18n) {
      const langKey = language === "ar-SA" ? "ar_SA" : "en_US";
      return (
        i18n[langKey as keyof typeof i18n] ||
        i18n.en_US ||
        i18n.ar_SA ||
        bookingData.testTypeName ||
        ""
      );
    }

    return bookingData.testTypeName || "";
  }, [bookingData, language]);

  // Hide header while form is loading
  if (isFormLoading) {
    return null;
  }

  return (
    <BookingHeader
      currentStep={3}
      translations={translations}
      testName={testName}
      testName_i18n={bookingData?.testTypeName_i18n || null}
    />
  );
}
