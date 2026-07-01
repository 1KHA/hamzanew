"use client";

import Image from "next/image";
import { t } from "@/app/_lib/translationContext";
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

  return (
    <div id="profile-modal-popup3" className="modal-overlay">
      <div className="modal-main cancell-test-booking-modal">
        <div className="modal-header">
          <div className="modal-hd">
            <span>{t("hamza-test-summary", translations)}</span>
            <p>{testTypeName}</p>
          </div>
          <div className="modal-cls">
            <span onClick={onHandleCloseModal} className="close-modal">
              <Image
                src="/profile/close-icon.svg"
                alt={t("hamza-close", translations) || "Close"}
                width={20}
                height={20}
              />
            </span>
          </div>
        </div>
        <div className="modal-cnt-area">
          <div className="test-summary-detail">
            <ul className="summary-three-col">
              <li>
                <div className="summary-label">
                  {t("hamza-card-payment-name-form", translations)}
                </div>
                <div className="summary-cnt">{fullNameDisplay || "-"}</div>
              </li>
              <li>
                <div className="summary-label">
                  {t("hamza-email-id-form", translations)}
                </div>
                <div className="summary-cnt">{emailId || "-"}</div>
              </li>
              <li>
                <div className="summary-label">
                  {t("hamza-phone-number-form", translations)}
                </div>
                <div className="summary-cnt">{phoneNumber || "-"}</div>
              </li>
              <li>
                <div className="summary-label">مكان الاختبار</div>
                <div className="summary-cnt">في الموقع</div>
              </li>
              <li>
                <div className="summary-label">
                  {t("hamza-home-page-map-test-type-title-form", translations)}
                </div>
                <div className="summary-cnt">{testTypeName}</div>
              </li>
              <li>
                <div className="summary-label">
                  {t("hamza-test-price-form", translations)}
                </div>
                <div className="summary-cnt">
                  0 {t("hamza-sar", translations)}
                </div>
              </li>
              <li>
                <div className="summary-label">
                  {t("hamza-test-date-form", translations)}
                </div>
                <div className="summary-cnt">{testDate}</div>
              </li>
              <li>
                <div className="summary-label">
                  {t("hamza-test-time--slot-form", translations)}
                </div>
                <div className="summary-cnt">{timeSlot}</div>
              </li>
              <li>
                <div className="summary-label">
                  {t("hamza-total-form", translations)}
                </div>
                <div className="summary-cnt">
                  0 {t("hamza-sar", translations)}
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="modal-btn text-left">
          <span className="cmn-btn-green" onClick={handleCancelBooking}>
            {t("hamza-cancel-the-test", translations)}
          </span>{" "}
          &nbsp;{" "}
          <span className="cmn-outline-btn-bold" onClick={onHandleCloseModal}>
            {t("hamza-cancel", translations)}
          </span>
        </div>
      </div>
    </div>
  );
}
