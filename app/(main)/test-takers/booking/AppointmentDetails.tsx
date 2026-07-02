"use client";

import { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import { t } from "@/app/_lib/translationContext";
import type {
  BookingData,
  TestCenter,
  TestItem,
  TranslationDict,
} from "@/app/_lib/booking-types";

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() ?? null;
  return null;
}

interface AppointmentDetailsProps {
  selectedDate?: Date | null;
  selectedTime?: string | null;
  testData?: TestItem | null;
  bookingData?: BookingData | null;
  testsList?: TestItem[] | null;
  onPrevious?: () => void;
  onNext?: () => void;
  translations: TranslationDict;
  testCenterId?: string | number | null;
  isModal?: boolean;
}

export default function AppointmentDetails({
  selectedDate,
  selectedTime,
  testData,
  bookingData,
  testsList,
  onPrevious,
  onNext,
  translations,
  testCenterId,
  isModal = false,
}: AppointmentDetailsProps) {
  const [language] = useState(() => getCookie("lang") || "ar-SA");
  const [testCenterData, setTestCenterData] = useState<TestCenter | null>(null);
  const [isLoadingTestCenter, setIsLoadingTestCenter] = useState(false);

  // Fetch test center details based on testCenterId
  useEffect(() => {
    const fetchTestCenterDetails = async () => {
      // Get testCenterId from props, bookingData, or testData
      const centerId =
        testCenterId ||
        bookingData?.testCenterId ||
        testData?.r_testCenterRelationship_c_testCenterId;

      if (!centerId) {
        return;
      }

      setIsLoadingTestCenter(true);
      try {
        // Call the API endpoint with filter
        const filter = encodeURIComponent(`id eq '${centerId}'`);
        const response = await fetch(`/api/test-centers?filter=${filter}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = (await response.json()) as {
            items?: TestCenter[];
          } & Record<string, unknown>;
          if (data?.items && data.items.length > 0) {
            setTestCenterData(data.items[0]);
          }
        } else {
          console.error("Failed to fetch test center details");
        }
      } catch (error) {
        console.error("Error fetching test center details:", error);
      } finally {
        setIsLoadingTestCenter(false);
      }
    };

    void fetchTestCenterDetails();
  }, [
    testCenterId,
    bookingData?.testCenterId,
    testData?.r_testCenterRelationship_c_testCenterId,
  ]);

  // Format date for display
  const formatDate = (date: Date | string | undefined | null) => {
    // Use today's date if no date is selected
    const d = date ? new Date(date) : new Date();
    const months = {
      ar: [
        t("hamza-month-january", translations),
        t("hamza-month-february", translations),
        t("hamza-month-march", translations),
        t("hamza-month-april", translations),
        t("hamza-month-may", translations),
        t("hamza-month-june", translations),
        t("hamza-month-july", translations),
        t("hamza-month-august", translations),
        t("hamza-month-september", translations),
        t("hamza-month-october", translations),
        t("hamza-month-november", translations),
        t("hamza-month-december", translations),
      ],
      en: [
        t("hamza-month-january", translations),
        t("hamza-month-february", translations),
        t("hamza-month-march", translations),
        t("hamza-month-april", translations),
        t("hamza-month-may", translations),
        t("hamza-month-june", translations),
        t("hamza-month-july", translations),
        t("hamza-month-august", translations),
        t("hamza-month-september", translations),
        t("hamza-month-october", translations),
        t("hamza-month-november", translations),
        t("hamza-month-december", translations),
      ],
    };
    const lang = language === "ar-SA" ? "ar" : "en";
    // Arabic format: day month year
    if (lang === "ar") {
      return `${d.getDate()} ${months[lang][d.getMonth()]} ${d.getFullYear()}`;
    }
    // English format: month day, year
    return `${months[lang][d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
  };

  const appointmentData = {
    ar: {
      appointment: "الموعد",
      testNumber: "رقم الاختبار",
      date: "التاريخ",
      time: "الوقت",
      location: "الموقع",
      previous: "السابق",
      next: "التالي",
    },
    en: {
      appointment: "Appointment",
      testNumber: "Test Number",
      date: "Date",
      time: "Time",
      location: "Location",
      previous: "Previous",
      next: "Next",
    },
  };

  const texts = language === "ar-SA" ? appointmentData.ar : appointmentData.en;

  // Get localized value from i18n object
  const getLocalizedValue = (
    i18nObject: Record<string, string> | undefined,
    fallback: string | undefined
  ) => {
    if (!i18nObject) return fallback;
    const langKey = language === "ar-SA" ? "ar_SA" : "en_US";
    return i18nObject[langKey] || i18nObject.en_US || fallback || "";
  };

  // Find the selected test from testsList based on selectedDate and selectedTime
  const selectedTest = useMemo(() => {
    if (
      !selectedDate ||
      !selectedTime ||
      !testsList ||
      !Array.isArray(testsList)
    ) {
      return null;
    }

    // Normalize selected date (date only, no time)
    const normalizedSelectedDate = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate()
    );

    // Parse selectedTime (format: "00-02")
    const [startTimeKey, endTimeKey] = selectedTime.split("-");

    // Find test that matches both date and time
    return testsList.find((test) => {
      if (!test.testDate || !test.startTime || !test.endTime) return false;

      try {
        const testDate = new Date(test.testDate);
        const normalizedTestDate = new Date(
          testDate.getFullYear(),
          testDate.getMonth(),
          testDate.getDate()
        );

        const dateMatches =
          normalizedTestDate.getTime() === normalizedSelectedDate.getTime();
        const timeMatches =
          test.startTime.key === startTimeKey &&
          test.endTime.key === endTimeKey;

        return dateMatches && timeMatches;
      } catch {
        return false;
      }
    });
  }, [selectedDate, selectedTime, testsList]);

  // Get test name and ID from selected test, with fallbacks
  // Priority: selectedTest > first item from testsList > testData
  // The typeOfTheTest.name is already localized by the API based on Accept-Language header
  const displayTestName =
    selectedTest?.typeOfTheTest?.name ||
    (testsList && Array.isArray(testsList) && testsList.length > 0
      ? testsList[0]?.typeOfTheTest?.name
      : testData?.typeOfTheTest?.name) ||
    "";
  const displayTestId =
    selectedTest?.id ||
    (testsList && Array.isArray(testsList) && testsList.length > 0
      ? testsList[0]?.id
      : testData?.id) ||
    "";

  const displayLocation = testCenterData
    ? getLocalizedValue(
        testCenterData.locationName_i18n,
        testCenterData.locationName
      )
    : "";

  const displayAddress = testCenterData
    ? getLocalizedValue(
        testCenterData.locationDetails_i18n,
        testCenterData.locationDetails
      )
    : "";

  const displayCountry = testCenterData?.countryCode?.name || "";

  // Next button should be disabled until a time slot is chosen
  const isNextDisabled = !selectedTime;

  // Show loader while test center data is loading
  if (isLoadingTestCenter) {
    return (
      <div
        className={`appointment-details-wrapper ${
          isModal ? "appointment-modal" : ""
        }`}
      >
        <div
          className="loader-container"
          style={{
            minHeight: "400px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="loader"></div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`appointment-details-wrapper ${
        isModal ? "appointment-modal" : ""
      }`}
    >
      <div className="appointment-header">
        <div className="appointment-label">{texts.appointment}</div>
        <div className="appointment-title">{displayTestName}</div>
        {displayTestId && (
          <div className="appointment-test-number">
            {texts.testNumber}: {displayTestId}
          </div>
        )}
      </div>

      <div className="appointment-info">
        <div className="info-item">
          <div className="info-icon calendar-icon">
            <Image
              src="/test-takers/testing-center/calendar-appointment.svg"
              alt={texts.date}
              width={24}
              height={24}
              unoptimized
            />
          </div>
          <div className="info-content">
            <div className="info-value">{formatDate(selectedDate)}</div>
            <div className="info-label">{texts.date}</div>
          </div>
        </div>

        <div className="info-item">
          <div className="info-icon clock-icon">
            <Image
              src="/test-takers/testing-center/clock-appointment.svg"
              alt={texts.time}
              width={24}
              height={24}
              unoptimized
            />
          </div>
          <div className="info-content">
            <div className="info-value">
              {selectedTest?.startTime && selectedTest?.endTime
                ? (() => {
                    // Format time to "HH:MM" format
                    const formatTime = (timeValue: string | undefined) => {
                      if (!timeValue) return "00:00";
                      const timeStr = String(timeValue);
                      // If already in "HH:MM" format, return as is
                      if (timeStr.includes(":")) return timeStr;
                      // If in "HHMM" format (4 digits), add colon
                      if (timeStr.length === 4) {
                        return `${timeStr.substring(0, 2)}:${timeStr.substring(
                          2,
                          4
                        )}`;
                      }
                      // Default fallback
                      return timeStr;
                    };

                    const startTime = formatTime(
                      selectedTest.startTime.key || "0000"
                    );
                    const endTime = formatTime(
                      selectedTest.endTime.key || "0000"
                    );
                    // Time from service is already in Saudi time (GMT+3)
                    return `${startTime} - ${endTime}`;
                  })()
                : selectedTime
                ? (() => {
                    // Fallback: use selectedTime if selectedTest is not available
                    // Format selectedTime if needed (might be "0100-0200" or "01:00-02:00")
                    const formatTimeSlot = (timeSlot: string) => {
                      if (!timeSlot) return "-";
                      if (timeSlot.includes("-")) {
                        const [start, end] = timeSlot.split("-");
                        const formatTime = (timeValue: string) => {
                          const timeStr = String(timeValue);
                          if (timeStr.includes(":")) return timeStr;
                          if (timeStr.length === 4) {
                            return `${timeStr.substring(
                              0,
                              2
                            )}:${timeStr.substring(2, 4)}`;
                          }
                          return timeStr;
                        };
                        return `${formatTime(start)} - ${formatTime(end)}`;
                      }
                      return timeSlot;
                    };
                    // Time from service is already in Saudi time (GMT+3)
                    return formatTimeSlot(selectedTime);
                  })()
                : "-"}
            </div>
            <div className="info-label">{texts.time}</div>
          </div>
        </div>

        <div className="info-item">
          <div className="info-icon location-icon">
            <Image
              src="/test-takers/testing-center/location-appointment.svg"
              alt={texts.location}
              width={24}
              height={24}
              unoptimized
            />
          </div>
          <div className="info-content">
            <div className="info-value">{displayLocation}</div>
            <div className="info-address">
              {displayAddress}
              {displayCountry && `, ${displayCountry}`}
            </div>
            <div className="info-label">{texts.location}</div>
          </div>
        </div>
      </div>

      <div className="appointment-actions">
        <button className="btn-previous" onClick={onPrevious}>
          {texts.previous}
        </button>
        <button
          className={`btn-next ${isNextDisabled ? "disabled" : ""}`}
          onClick={onNext}
          disabled={isNextDisabled}
        >
          {texts.next}
        </button>
      </div>
    </div>
  );
}
