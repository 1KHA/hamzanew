"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { t } from "@/app/_lib/translationContext";
import TestBookingView from "../../test-booking/TestBookingView";
import BookingSlotCard from "./BookingSlotCard";
import type {
  TestBooking,
  TestCenterLocationType,
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

interface DelayTestProps {
  onHandleCloseModal: () => void;
  translations: TranslationDict;
  selectedBooking: TestBooking | null;
  onOpenChangeTestConfirmation: () => void;
}

export default function DelayTest({
  onHandleCloseModal,
  translations,
  selectedBooking,
  onOpenChangeTestConfirmation,
}: DelayTestProps) {
  const [newBookingSelection, setNewBookingSelection] = useState<
    Partial<TestBooking> | null
  >(null);
  const [language] = useState(() => getCookie("lang") || "ar-SA");

  const handleSelectionChange = (selection: {
    date: Date | null;
    time: string | null;
    test: TestItem | null;
    locationType?: TestCenterLocationType | null;
  }) => {
    if (selection.date && selection.time && selection.test) {
      // Create a booking object from the selection
      const newBooking: Partial<TestBooking> = {
        testDate: selection.date.toISOString(),
        startTime: selection.test.startTime || { key: "", name: "" },
        endTime: selection.test.endTime || { key: "", name: "" },
        typeOfTheTest: selection.test.typeOfTheTest || { key: "", name: "" },
        locationType: selection.locationType || selectedBooking?.locationType,
      };
      setNewBookingSelection(newBooking);
    } else {
      setNewBookingSelection(null);
    }
  };

  const handleRescheduleComplete = () => {
    onHandleCloseModal();
    window.location.reload();
  };

  const handleCancel = () => {
    onHandleCloseModal();
  };

  const handleRescheduleNext = async (bookingData: {
    selectedDate: Date | null;
    selectedTime: string | null;
    selectedTest: TestItem | null;
    existingBooking: Record<string, unknown> | null;
  }) => {
    console.log("Rescheduling next button clicked", bookingData);
    console.log("Selected Date:", bookingData.selectedDate);
    console.log("Selected Time:", bookingData.selectedTime);
    console.log("Selected Test:", bookingData.selectedTest);
    console.log("Existing Booking:", bookingData.existingBooking);

    // Check test capacity
    if (bookingData.selectedTest?.id) {
      try {
        const testId = String(bookingData.selectedTest.id);

        // Fetch test details to get capacity
        const testResponse = await fetch(`/api/tests?testId=${testId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (testResponse.ok) {
          const testData = (await testResponse.json()) as {
            items?: { capacity?: number | string }[];
          } & Record<string, unknown>;
          const testItem = testData?.items?.[0];

          if (testItem) {
            const capacity = testItem.capacity;
            console.log("Test capacity:", capacity);

            // Format testId for bookings API - pad with zeros if needed
            const formattedTestId = testId.padStart(6, "0");

            // Fetch existing bookings for this test
            const bookingsResponse = await fetch(
              `/api/test-bookings?testId=${formattedTestId}`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );

            if (bookingsResponse.ok) {
              const bookingsData = (await bookingsResponse.json()) as {
                totalCount?: number;
              } & Record<string, unknown>;
              const totalExistingBookings = bookingsData.totalCount || 0;
              console.log("Total existing bookings:", totalExistingBookings);

              // Convert capacity to number if it's a string
              const capacityNum =
                typeof capacity === "string"
                  ? parseInt(capacity, 10)
                  : capacity;

              // Check if capacity is not full
              if (
                typeof capacityNum === "number" &&
                capacityNum > 0 &&
                totalExistingBookings < capacityNum
              ) {
                console.log(
                  "Capacity is not full. Available slots:",
                  capacityNum - totalExistingBookings
                );

                // Update the existing booking with new testDate and timeslots
                if (bookingData.existingBooking?.id) {
                  try {
                    // Get current date in ISO format (YYYY-MM-DDTHH:mm:ss.sssZ)
                    const currentDate = new Date();
                    const registrationDate = currentDate.toISOString();

                    // Get the booking ID
                    const bookingId = String(bookingData.existingBooking.id);

                    // Prepare request body with only the required fields
                    const requestBody = {
                      id: bookingId,
                      registrationDate,
                      r_testRelationship_c_testId: bookingData.selectedTest.id,
                    };

                    console.log("Updating booking with:", requestBody);

                    // Update the booking
                    const updateResponse = await fetch(
                      `/api/test-bookings?bookingId=${bookingId}`,
                      {
                        method: "PATCH",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify(requestBody),
                      }
                    );

                    if (updateResponse.ok) {
                      const updateData = await updateResponse.json();
                      console.log("Booking updated successfully:", updateData);
                    } else {
                      const errorData = (await updateResponse
                        .json()
                        .catch(() => ({}))) as Record<string, unknown>;
                      console.error("Error updating booking:", errorData);
                    }
                  } catch (error) {
                    console.error("Error updating booking:", error);
                  }
                }
              }
            }
          }
        }
      } catch (error) {
        console.error("Error checking test capacity:", error);
      }
    }

    // Close all other popups and open change test confirmation modal
    if (onHandleCloseModal) {
      onHandleCloseModal();
    }
    if (onOpenChangeTestConfirmation) {
      onOpenChangeTestConfirmation();
    }
  };

  // Get test center ID from existing booking
  const testCenterId = useMemo(
    () => selectedBooking?.r_testCenterRelationship_c_testCenterId || null,
    [selectedBooking?.r_testCenterRelationship_c_testCenterId]
  );

  if (!selectedBooking) {
    return (
      <div id="profile-modal-popup1" className="modal-overlay">
        <div className="modal-main">
          <div className="modal-header">
            <div className="modal-hd">
              <span>{t("hamza-test-summary", translations)}</span>
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
            <p>No booking selected</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="profile-modal-popup1" className="modal-overlay">
      <div className="modal-main delay-test-modal">
        <div className="modal-header hamza-booking-header-title">
          <div className="modal-hd hamza-booking-header-title-text">
            <div>
              <div>
                <span>{selectedBooking?.typeOfTheTest?.name}</span>
                <p>
                  {t(
                    "hamza-choose-the-appropriate-date-for-your-test",
                    translations
                  )}
                </p>
              </div>
            </div>
          </div>
          {/* Booking Slot Cards Comparison */}
          {(selectedBooking || newBookingSelection) && (
            <div className="booking-slots-comparison">
              <BookingSlotCard
                booking={selectedBooking}
                isActive={true}
              />
              <div className="booking-slots-arrow">
                <Image
                  src={
                    language === "ar-SA"
                      ? "/test-takers/testing-center/booking-calendar-left-arrow.png"
                      : "/test-takers/testing-center/booking-calendar-right-arrow.png"
                  }
                  alt="Arrow"
                  width={24}
                  height={24}
                />
              </div>
              <BookingSlotCard
                booking={newBookingSelection || selectedBooking}
                isActive={!!newBookingSelection}
              />
            </div>
          )}
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
        <TestBookingView
          translations={translations}
          testCenterId={testCenterId}
          showBookingHeader={false}
          isRescheduling={true}
          existingBooking={selectedBooking as unknown as Record<string, unknown>}
          onRescheduleComplete={handleRescheduleComplete}
          onCancel={handleCancel}
          isModal={true}
          onSelectionChange={handleSelectionChange}
          onRescheduleNext={handleRescheduleNext}
        />
      </div>
    </div>
  );
}
