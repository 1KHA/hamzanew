"use client";

import AOSProvider from "@/app/_components/AOSProvider";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import CancelTestConfirmation from "./_modal/cancelTestConfirmation";
import CancellTestBooking from "./_modal/cancellTestBooking";
import ChangeTestConfirmation from "./_modal/changeTestConfirmation";
import DelayTest from "./_modal/delayTest";
import TestDetails from "./_modal/testDetails";
import { t } from "@/app/_lib/translationContext";
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
}

export default function TestsClient({
  translations,
  userProfileData,
  enrichedBookings,
}: TestsClientProps) {
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

  // Get status class based on testStatus
  function getStatusClass(testStatus: TestStatus | undefined) {
    if (!testStatus) return "";
    const statusKey = testStatus.key || "";
    if (statusKey === "Scheduled") return "btn-grey";
    if (statusKey === "Completed") return "btn-blue";
    if (statusKey === "Cancelled") return "btn-orange";
    return "";
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
    const statusClass = getStatusClass(booking.testBookingStatus);

    // Check if booking is cancelled
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
      <div key={booking.id || index} className="profile-box-list">
        <div className="profile-box-hd mb-3">
          <span>
            <Image
              src={iconPath}
              alt={locationTypeName || ""}
              width={24}
              height={24}
            />
          </span>{" "}
          {locationTypeName}
        </div>
        <div className="profile-box-details">
          <span>{testTypeName}</span>
          {t("hamza-test-date-form", translations)}: {formattedDate} <br />
          {t("hamza-test-time--slot-form", translations)}:{" "}
          {formattedTimeSlot && <> {formattedTimeSlot}</>}
        </div>
        <div
          className={`profile-box-action ${
            isCancelled ? "profile-box-action-no-left" : ""
          }`}
        >
          {!isCancelled && (
            <div className="profile-box-action-l">
              {showTestDetails ? (
                <span
                  className="cmn-outline-btn"
                  onClick={() => {
                    setSelectedBooking(booking);
                    setIsTestDetailsModalOpen(true);
                  }}
                >
                  {t("hamza-test-details", translations) || "Test details"}
                </span>
              ) : (
                <>
                  <span
                    className="cmn-outline-btn"
                    onClick={() => {
                      setSelectedBooking(booking);
                      setIsCancelTestModalOpen(true);
                    }}
                  >
                    {t("hamza-cancel-test-booking", translations)}
                  </span>{" "}
                  &nbsp;
                  <span
                    className="cmn-outline-btn"
                    onClick={() => {
                      setSelectedBooking(booking);
                      setIsDelayTestModalOpen(true);
                    }}
                  >
                    {t("hamza-delay-test-booking", translations)}
                  </span>
                </>
              )}
            </div>
          )}
          <div className="profile-box-action-r">
            {t("hamza-registration-status", translations)} &nbsp;
            <a href="#" className={`booking-status-btn ${statusClass}`}>
              {testStatusName}
            </a>
          </div>
        </div>
      </div>
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

  return (
    <AOSProvider>
      <div id="midd-wrapper">
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

        <section className="cmn-section lightgrey-bg screen20-first-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="heading-desc-side align-items-start">
                  <div className="sidebar-area-cnt">
                    <nav aria-label="breadcrumb">
                      <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                          <Link href="/">
                            {t("hamza-navigation-menu-home", translations)}
                          </Link>{" "}
                          <span>&gt;</span>{" "}
                          <Link href="/profile">
                            {t("hamza-page-level-nav-profile", translations)}
                          </Link>{" "}
                          <span>&gt;</span>{" "}
                          {t("hamza-page-level-nav-tests", translations)}
                        </li>
                      </ol>
                    </nav>
                    <div className="sigup-cnt-area mw-100">
                      <div className="singup-whitebox">
                        {remoteBookings.length > 0 && (
                          <div className="profile-box-main mb-5">
                            <div className="whitebox-hd-area mb-3">
                              {t("hamza-recorded-test", translations)}
                            </div>
                            <div className="profile-box-listarea">
                              {remoteBookings.map((booking, index) =>
                                renderBookingCard(booking, index)
                              )}
                            </div>
                          </div>
                        )}
                        {inPersonBookings.length > 0 && (
                          <div className="profile-box-main">
                            <div className="whitebox-hd-area mb-3">
                              {t("hamza-recorded-test", translations)}
                            </div>
                            <div className="profile-box-listarea">
                              {inPersonBookings.map((booking, index) =>
                                renderBookingCard(booking, index)
                              )}
                            </div>
                          </div>
                        )}
                        {(!enrichedBookings ||
                          enrichedBookings.length === 0) && (
                          <div className="profile-box-main">
                            <div className="whitebox-hd-area mb-3">
                              {t("hamza-recorded-test", translations)}
                            </div>
                            <div className="profile-box-listarea">
                              <div className="profile-box-list">
                                <div className="profile-box-details">
                                  <span>
                                    {t("hamza-no-recorded-tests", translations)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </AOSProvider>
  );
}
