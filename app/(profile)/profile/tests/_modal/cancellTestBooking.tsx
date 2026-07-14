"use client";

import Button from "@/app/components/button/Button";
import ModalShell from "./ModalShell";
import { t } from "@/app/_lib/translationContext";
import styles from "../tests.module.css";
import type {
  TestBooking,
  TranslationDict,
  UserProfile,
} from "@/app/_lib/booking-types";

interface CancellTestBookingProps {
  userProfileData: UserProfile | null;
  onHandleCloseModal: () => void;
  onOpenCancelTestModal: () => void;
  translations: TranslationDict;
  selectedBooking: TestBooking | null;
}

export default function CancellTestBooking({
  userProfileData,
  onHandleCloseModal,
  onOpenCancelTestModal,
  translations,
  selectedBooking,
}: CancellTestBookingProps) {
  // Build full name in Arabic and English
  const fullNameAr = `${userProfileData?.firstName || ""} ${
    userProfileData?.secondName || ""
  } ${userProfileData?.lastName || ""}`.trim();
  const fullNameEn = `${userProfileData?.firstNameInEnglish || ""} ${
    userProfileData?.secondNameInEnglish || ""
  } ${userProfileData?.lastNameInEnglish || ""}`.trim();
  const fullNameDisplay =
    fullNameAr && fullNameEn
      ? `${fullNameAr} / ${fullNameEn}`
      : fullNameAr || fullNameEn || "";

  // Build phone number with extension
  const phoneNumber =
    userProfileData?.phoneExtension && userProfileData?.phoneNumber
      ? `${userProfileData.phoneExtension} ${userProfileData.phoneNumber}`
      : userProfileData?.phoneNumber || "";

  // Get email
  const emailId = userProfileData?.emailId || "";

  // Format date for display
  function formatDate(dateString: string | undefined | null) {
    if (!dateString) return "-";
    try {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      return `${day}.${month}.${year}`;
    } catch {
      return "-";
    }
  }

  // Format time slot (startTime - endTime)
  function formatTimeSlot(
    startTime: { key?: string; name?: string } | undefined | null,
    endTime: { key?: string; name?: string } | undefined | null
  ) {
    if (!startTime || !endTime) return "-";
    // Format 24-hour format: "0430" = 04:30
    const formatTime = (timeKey: string | undefined) => {
      if (!timeKey) return "00:00";
      const timeString = String(timeKey).padStart(4, "0");
      const hour = timeString.substring(0, 2);
      const minute = timeString.substring(2, 4);
      return `${hour}:${minute}`;
    };
    const start = formatTime(
      typeof startTime === "object" ? startTime.key : startTime
    );
    const end = formatTime(
      typeof endTime === "object" ? endTime.key : endTime
    );
    return start && end ? `${start} - ${end}` : start || end || "-";
  }

  // Get booking data
  const testTypeName = selectedBooking?.typeOfTheTest?.name || "-";
  const testDate = selectedBooking?.testDate
    ? formatDate(selectedBooking.testDate)
    : "-";
  const timeSlot = formatTimeSlot(
    selectedBooking?.startTime,
    selectedBooking?.endTime
  );

  const handleCancelBooking = async () => {
    if (!selectedBooking?.id) {
      console.error("Booking ID is missing");
      return;
    }

    try {
      // Prepare request body with only testBookingStatus
      const requestBody = {
        testBookingStatus: {
          key: "Cancelled",
        },
      };

      // Call API to update test booking
      const response = await fetch(
        `/api/test-bookings?bookingId=${String(selectedBooking.id)}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        const errorData = (await response.json().catch(() => ({}))) as Record<
          string,
          unknown
        >;
        throw new Error(
          String(errorData.error) ||
            `Failed to cancel booking: ${response.status}`
        );
      }

      const data = await response.json();
      console.log("Booking cancelled successfully:", data);

      // Close current modal and open confirmation modal
      onHandleCloseModal();
      onOpenCancelTestModal();
    } catch (error) {
      console.error("Error cancelling booking:", error);
      alert(
        error instanceof Error ? error.message : "Failed to cancel booking"
      );
    }
  };

  const summaryItems = [
    {
      label: t("hamza-card-payment-name-form", translations),
      value: fullNameDisplay || "-",
    },
    {
      label: t("hamza-email-id-form", translations),
      value: emailId || "-",
    },
    {
      label: t("hamza-phone-number-form", translations),
      value: phoneNumber || "-",
    },
    {
      label: "مكان الاختبار",
      value: "في الموقع",
    },
    {
      label: t("hamza-home-page-map-test-type-title-form", translations),
      value: testTypeName,
    },
    {
      label: t("hamza-test-price-form", translations),
      value: `0 ${t("hamza-sar", translations)}`,
    },
    {
      label: t("hamza-test-date-form", translations),
      value: testDate,
    },
    {
      label: t("hamza-test-time--slot-form", translations),
      value: timeSlot,
    },
    {
      label: t("hamza-total-form", translations),
      value: `0 ${t("hamza-sar", translations)}`,
    },
  ];

  return (
    <ModalShell
      id="profile-modal-popup3"
      title={t("hamza-test-summary", translations) || "Test Summary"}
      subtitle={testTypeName}
      onClose={onHandleCloseModal}
      closeAriaLabel={t("hamza-close", translations) || "Close"}
      footer={
        <>
          <Button
            label={t("hamza-cancel", translations) || "Close"}
            variant="secondary-outline"
            size="md"
            onClick={onHandleCloseModal}
          />
          <Button
            label={t("hamza-cancel-the-test", translations) || "Cancel the test"}
            variant="primary-brand"
            size="md"
            onClick={handleCancelBooking}
          />
        </>
      }
    >
      <div className={styles.summaryGrid}>
        {summaryItems.map((item, index) => (
          <div key={index} className={styles.summaryItem}>
            <div className={styles.summaryLabel}>{item.label}</div>
            <div className={styles.summaryValue}>{item.value}</div>
          </div>
        ))}
      </div>
    </ModalShell>
  );
}
