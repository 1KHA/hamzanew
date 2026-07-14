"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import Button from "@/app/components/button/Button";
import Tag from "@/app/components/tag/Tag";
import CancelTestConfirmation from "./_modal/cancelTestConfirmation";
import CancellTestBooking from "./_modal/cancellTestBooking";
import ChangeTestConfirmation from "./_modal/changeTestConfirmation";
import DelayTest from "./_modal/delayTest";
import TestDetails from "./_modal/testDetails";
import { t } from "@/app/_lib/translationContext";
import styles from "./tests.module.css";
import {
  getCurrentSaudiTime,
  addHoursInSaudiTime,
  createDateInSaudiTime,
} from "@/app/_lib/time-utils";
import type {
  TestBooking,
  TestStatus,
  TestCenterLocationType,
  TranslationDict,
  UserProfile,
} from "@/app/_lib/booking-types";

interface TestsClientProps {
  translations: TranslationDict;
  userProfileData: UserProfile | null;
  enrichedBookings: TestBooking[];
  strings: Record<string, string>;
}

export default function TestsClient({
  translations,
  userProfileData,
  enrichedBookings,
  strings,
}: TestsClientProps) {
  const router = useRouter();
  const [isDelayTestModalOpen, setIsDelayTestModalOpen] = useState(false);
  const [isCancelTestModalOpen, setIsCancelTestModalOpen] = useState(false);
  const [isCancelTestConfirmationOpen, setIsCancelTestConfirmationOpen] =
    useState(false);

  const [isChangeTestConfirmationOpen, setIsChangeTestConfirmationOpen] =
    useState(false);
  const [isTestDetailsModalOpen, setIsTestDetailsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<TestBooking | null>(null);

  function closeAllModals() {
    setIsCancelTestModalOpen(false);
    setIsDelayTestModalOpen(false);
    setIsChangeTestConfirmationOpen(false);
    setIsTestDetailsModalOpen(false);
    setSelectedBooking(null);
    setIsCancelTestConfirmationOpen(false);
  }

  function handleCancelConfirmationTestModal() {
    setIsCancelTestModalOpen(false);
    setIsCancelTestConfirmationOpen(true);
  }

  function handleOpenChangeTestConfirmation() {
    setIsChangeTestConfirmationOpen(true);
    setIsDelayTestModalOpen(false);
  }

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
    startTime: { key?: string } | string | undefined | null,
    endTime: { key?: string } | string | undefined | null
  ) {
    if (!startTime || !endTime) return "";
    try {
      const startKey =
        typeof startTime === "object" ? startTime.key : startTime;
      const endKey = typeof endTime === "object" ? endTime.key : endTime;

      // Format as HH:MM - HH:MM (24-hour format: "0430" = 04:30)
      const formatTime = (timeKey: string | undefined) => {
        const timeString = String(timeKey).padStart(4, "0");
        const hour = timeString.substring(0, 2);
        const minute = timeString.substring(2, 4);
        return `${hour}:${minute}`;
      };

      return `${formatTime(startKey)} - ${formatTime(endKey)}`;
    } catch {
      return "";
    }
  }

  // Get icon path based on locationType
  function getLocationIcon(locationType: TestCenterLocationType | undefined) {
    if (!locationType) return "/profile/profile-box-ico2.svg";
    const locationKey = locationType.key || "";
    if (locationKey === "Online") {
      return "/profile/profile-box-ico1.svg";
    }
    return "/profile/profile-box-ico2.svg";
  }

  // Map test booking status to a design-system Tag variant
  function getStatusVariant(testStatus: TestStatus | undefined) {
    if (!testStatus) return "neutral";
    const statusKey = testStatus.key || "";
    if (statusKey === "Scheduled") return "success";
    if (statusKey === "Completed") return "neutral";
    if (statusKey === "Cancelled") return "error";
    return "neutral";
  }

  // Check if test is within next 24 hours (considering date and time slot)
  function isWithinNext24Hours(
    testDate: string | undefined | null,
    startTime: { key?: string } | undefined | null
  ) {
    if (!testDate) return false;
    try {
      // Create a date object from the test date (testDate is in GMT+3 from service)
      const testDateObj = new Date(testDate);

      // Parse the start time from key (24-hour format: "0430" = 04:30)
      let startHour = 0;
      let startMinute = 0;
      if (startTime && typeof startTime === "object" && startTime.key !== undefined) {
        const timeString = String(startTime.key).padStart(4, "0");
        startHour = parseInt(timeString.substring(0, 2) || "00", 10);
        startMinute = parseInt(timeString.substring(2, 4) || "00", 10);
        if (isNaN(startHour)) startHour = 0;
        if (isNaN(startMinute)) startMinute = 0;
      }

      // Create datetime with test date and start time in GMT+3
      const testDateTime = createDateInSaudiTime(
        testDateObj,
        startHour,
        startMinute,
        0
      );

      // Get current time in Saudi time (GMT+3)
      const now = getCurrentSaudiTime();
      // Add 24 hours in Saudi time context
      const next24Hours = addHoursInSaudiTime(now, 24);

      console.log(
        "now (GMT+3):",
        now.toISOString(),
        "| next24Hours (GMT+3):",
        next24Hours.toISOString(),
        "| testDateTime (GMT+3):",
        testDateTime.toISOString(),
        "| startHour:",
        startHour
      );

      // Check if test date and time is between now and next 24 hours
      return testDateTime >= now && testDateTime <= next24Hours;
    } catch (error) {
      console.error("Error checking test date and time:", error);
      return false;
    }
  }

  // Render a single booking card
  function renderBookingCard(booking: TestBooking, index: number) {
    const locationTypeName = booking.locationType?.name;
    const testTypeName = booking.typeOfTheTest?.name;
    const formattedDate = booking.testDate
      ? formatDate(booking.testDate)
      : t("hamza-no-date", translations);
    const formattedTimeSlot = formatTimeSlot(
      booking.startTime,
      booking.endTime
    );
    const testStatusName = booking.testBookingStatus?.name;
    const iconPath = getLocationIcon(booking.locationType);
    const statusVariant = getStatusVariant(booking.testBookingStatus);

    // Check if booking is cancelled or completed
    const isCancelled =
      booking.testBookingStatus?.key === "Cancelled" ||
      booking.testBookingStatus?.key === "Completed";

    // Check if test is scheduled and within next 24 hours
    const isScheduled = booking.testBookingStatus?.key === "Scheduled";
    const isWithin24Hours = isWithinNext24Hours(
      booking.testDate,
      booking.startTime
    );
    const showTestDetails = isScheduled && isWithin24Hours;

    return (
      <article key={booking.id || index} className={styles.bookingCard}>
        <div className={styles.cardHeader}>
          <div className={styles.locationType}>
            <span className={styles.locationIcon}>
              <Image
                src={iconPath}
                alt=""
                width={24}
                height={24}
              />
            </span>
            <span className={styles.locationName}>
              {locationTypeName || strings.labelTestLocation}
            </span>
          </div>
          <Tag label={testStatusName} variant={statusVariant} size="md" />
        </div>

        <div className={styles.cardBody}>
          <h3 className={styles.testName}>{testTypeName}</h3>

          <div className={styles.metaRow}>
            <span className={styles.metaIcon}>
              <Image
                src="/assets/icons/stroke-standard/calendar-03-stroke-rounded.svg"
                alt=""
                width={20}
                height={20}
              />
            </span>
            <span className={styles.metaLabel}>
              {t("hamza-test-date-form", translations)}
            </span>
            <span className={styles.metaValue}>{formattedDate}</span>
          </div>

          {formattedTimeSlot && (
            <div className={styles.metaRow}>
              <span className={styles.metaIcon}>
                <Image
                  src="/assets/icons/stroke-standard/clock-01-stroke-rounded.svg"
                  alt=""
                  width={20}
                  height={20}
                />
              </span>
              <span className={styles.metaLabel}>
                {t("hamza-test-time--slot-form", translations)}
              </span>
              <span className={styles.metaValue}>{formattedTimeSlot}</span>
            </div>
          )}
        </div>

        {!isCancelled && (
          <div className={styles.cardFooter}>
            {showTestDetails ? (
              <Button
                label={
                  t("hamza-test-details", translations) ||
                  strings.actionTestDetails
                }
                variant="primary-brand"
                size="md"
                icon="view"
                iconPosition="right"
                onClick={() => {
                  setSelectedBooking(booking);
                  setIsTestDetailsModalOpen(true);
                }}
              />
            ) : (
              <>
                <Button
                  label={t("hamza-cancel-test-booking", translations) || strings.actionCancel}
                  variant="secondary-outline"
                  size="md"
                  onClick={() => {
                    setSelectedBooking(booking);
                    setIsCancelTestModalOpen(true);
                  }}
                />
                <Button
                  label={t("hamza-delay-test-booking", translations) || strings.actionDelay}
                  variant="primary-brand"
                  size="md"
                  onClick={() => {
                    setSelectedBooking(booking);
                    setIsDelayTestModalOpen(true);
                  }}
                />
              </>
            )}
          </div>
        )}
      </article>
    );
  }

  // Filter bookings - separate remote and in-person
  const remoteBookings =
    enrichedBookings?.filter(
      (booking) => booking.locationType?.key === "Online"
    ) || [];

  const inPersonBookings =
    enrichedBookings?.filter(
      (booking) =>
        booking.locationType?.key === "LocalCenter" ||
        booking.locationType?.key === "SpecialNeeds" ||
        !booking.locationType?.key
    ) || [];

  const hasBookings = enrichedBookings && enrichedBookings.length > 0;

  return (
    <>
      {isDelayTestModalOpen && (
        <DelayTest
          onHandleCloseModal={closeAllModals}
          translations={translations}
          selectedBooking={selectedBooking}
          onOpenChangeTestConfirmation={handleOpenChangeTestConfirmation}
        />
      )}
      {isCancelTestConfirmationOpen && (
        <CancelTestConfirmation
          testTypeName={selectedBooking?.typeOfTheTest?.name}
          translations={translations}
          onHandleCloseModal={closeAllModals}
        />
      )}

      {isCancelTestModalOpen && (
        <CancellTestBooking
          userProfileData={userProfileData}
          translations={translations}
          selectedBooking={selectedBooking}
          onHandleCloseModal={closeAllModals}
          onOpenCancelTestModal={handleCancelConfirmationTestModal}
        />
      )}

      {isChangeTestConfirmationOpen && (
        <ChangeTestConfirmation
          onHandleCloseModal={closeAllModals}
          translations={translations}
          testTypeName={selectedBooking?.typeOfTheTest?.name}
        />
      )}

      {isTestDetailsModalOpen && (
        <TestDetails
          onHandleCloseModal={closeAllModals}
          translations={translations}
          selectedBooking={selectedBooking}
        />
      )}

      <div className={styles.testsSection}>
        {hasBookings ? (
          <>
            {remoteBookings.length > 0 && (
              <div className="mb-8">
                <h2 className={styles.sectionTitle}>
                  {t("hamza-recorded-test", translations) || strings.sectionRemote}
                </h2>
                <div className={styles.cardsGrid}>
                  {remoteBookings.map((booking, index) =>
                    renderBookingCard(booking, index)
                  )}
                </div>
              </div>
            )}

            {inPersonBookings.length > 0 && (
              <div>
                <h2 className={styles.sectionTitle}>
                  {t("hamza-testing-centers", translations) || strings.sectionInPerson}
                </h2>
                <div className={styles.cardsGrid}>
                  {inPersonBookings.map((booking, index) =>
                    renderBookingCard(booking, index)
                  )}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className={styles.emptyState}>
            <span className={styles.emptyIcon}>
              <Image
                src="/assets/icons/stroke-standard/calendar-03-stroke-rounded.svg"
                alt=""
                width={32}
                height={32}
                className="green-icon"
              />
            </span>
            <h2 className={styles.emptyTitle}>{strings.emptyStateTitle}</h2>
            <p className={styles.emptyDescription}>{strings.emptyStateDescription}</p>
            <Button
              label={strings.actionBrowseTests}
              variant="primary-brand"
              size="md"
              icon="arrow"
              iconPosition="right"
              onClick={() => router.push("/test-takers/test-centers")}
            />
          </div>
        )}
      </div>
    </>
  );
}
