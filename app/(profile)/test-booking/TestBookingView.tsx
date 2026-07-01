"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import AOSProvider from "@/app/_components/AOSProvider";
import Calendar from "./Calendar";
import TimeSlot from "./TimeSlot";
import AppointmentDetails from "./AppointmentDetails";
import BookingHeader from "./BookingHeader";
import { fetchTests } from "@/app/_lib/booking/tests-service";
import {
  getBookingData,
  createBookingData,
  storeBookingData,
} from "@/app/_lib/booking/booking-data-utils";
import {
  getCurrentSaudiTime,
  addHoursInSaudiTime,
} from "@/app/_lib/time-utils";
import type {
  BookingData,
  TestCenterLocationType,
  TestItem,
  TranslationDict,
} from "@/app/_lib/booking-types";

interface TestBookingViewProps {
  translations: TranslationDict;
  testCenterId?: string | number | null;
  bookingData?: BookingData | null;
  showBookingHeader?: boolean;
  isRescheduling?: boolean;
  existingBooking?: Record<string, unknown> | null;
  onRescheduleComplete?: (() => void) | null;
  onCancel?: (() => void) | null;
  isModal?: boolean;
  onSelectionChange?:
    | ((selection: {
        date: Date | null;
        time: string | null;
        test: TestItem | null;
        locationType?: TestCenterLocationType | null;
      }) => void)
    | null;
  onRescheduleNext?:
    | ((bookingData: {
        selectedDate: Date | null;
        selectedTime: string | null;
        selectedTest: TestItem | null;
        existingBooking: Record<string, unknown> | null;
      }) => void)
    | null;
}

export default function TestBookingView({
  translations,
  testCenterId,
  bookingData: bookingDataProp = null,
  showBookingHeader = true,
  isRescheduling = false,
  existingBooking = null,
  onRescheduleComplete = null,
  onCancel = null,
  isModal = false,
  onSelectionChange = null,
  onRescheduleNext = null,
}: TestBookingViewProps) {
  // Initialize from sessionStorage (normal flow) or existing booking (reschedule flow)
  const initialBookingData = useMemo<BookingData | null>(() => {
    if (isRescheduling) return null;
    return getBookingData();
  }, [isRescheduling]);

  const [bookingData] = useState<BookingData | null>(
    bookingDataProp || initialBookingData
  );

  const [selectedDate, setSelectedDate] = useState<Date | null>(() => {
    if (isRescheduling && existingBooking?.testDate) {
      return new Date(existingBooking.testDate as string);
    }
    return null;
  });

  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState<Date>(() => selectedDate ?? new Date());

  const timeSlotRef = useRef<HTMLDivElement>(null);
  const appointmentDetailsRef = useRef<HTMLDivElement>(null);
  const [syncedHeight, setSyncedHeight] = useState("auto");
  const [testsList, setTestsList] = useState<TestItem[] | null>(null);
  const [isLoadingTests, setIsLoadingTests] = useState(false);
  const [testTypeNames, setTestTypeNames] = useState({
    ar_SA: "",
    en_US: "",
  });
  const [displayTestName, setDisplayTestName] = useState(() => {
    if (
      isRescheduling &&
      existingBooking?.typeOfTheTest &&
      typeof existingBooking.typeOfTheTest === "object" &&
      existingBooking.typeOfTheTest !== null &&
      "name" in existingBooking.typeOfTheTest
    ) {
      return String((existingBooking.typeOfTheTest as { name?: string }).name || "");
    }
    return "";
  });
  const [resolvedTestCenterId, setResolvedTestCenterId] = useState<
    string | number | null
  >(
    () =>
      testCenterId ||
      bookingDataProp?.testCenterId ||
      bookingData?.testCenterId ||
      (existingBooking?.r_testCenterRelationship_c_testCenterId as
        | string
        | number
        | undefined) ||
      null
  );
  const [testCenterLocationType, setTestCenterLocationType] =
    useState<TestCenterLocationType | null>(null);

  // Fetch list of tests based on testCenterId and typeOfTheTest
  useEffect(() => {
    const fetchTestsList = async () => {
      let typeOfTheTest: string | undefined;
      let centerId: string | number | undefined;

      if (isRescheduling && existingBooking) {
        // For rescheduling, get test center ID from existing booking
        // First check if it's already in the enriched booking data
        const existingCenterId = existingBooking
          .r_testCenterRelationship_c_testCenterId as string | number | undefined;
        if (existingCenterId) {
          centerId = existingCenterId;
          typeOfTheTest = (existingBooking.typeOfTheTest as { key?: string } | undefined)
            ?.key;
          if (centerId) {
            setResolvedTestCenterId(centerId);
          }
        } else if (existingBooking.r_testRelationship_c_testId) {
          // Fallback: fetch test details to get the test center ID
          try {
            const testDetailsResponse = await fetch(
              `/api/tests?testId=${String(
                existingBooking.r_testRelationship_c_testId
              )}`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );

            if (testDetailsResponse.ok) {
              const testDetailsData = (await testDetailsResponse.json()) as {
                items?: TestItem[];
              } & Record<string, unknown>;
              if (testDetailsData.items && testDetailsData.items.length > 0) {
                const testItem = testDetailsData.items[0];
                centerId = testItem.r_testCenterRelationship_c_testCenterId;
                typeOfTheTest = testItem.typeOfTheTest?.key;

                // Update resolved test center ID for the component
                if (centerId) {
                  setResolvedTestCenterId(centerId);
                }
              }
            }
          } catch (error) {
            console.error(
              "Error fetching test details for rescheduling:",
              error
            );
          }
        }
      } else {
        // Normal flow - get from bookingData or testCenterId prop
        typeOfTheTest = bookingData?.testTypeKey || bookingData?.testType || undefined;
        centerId =
          resolvedTestCenterId || testCenterId || bookingData?.testCenterId || undefined;
      }

      if (!centerId || !typeOfTheTest) {
        return;
      }

      setIsLoadingTests(true);
      try {
        const filter = `r_testCenterRelationship_c_testCenterId eq '${centerId}' and typeOfTheTest eq '${typeOfTheTest}'`;

        console.log("Fetching tests with filter:", filter);
        const response = (await fetchTests(null, filter)) as {
          items?: TestItem[];
        };

        if (response?.items) {
          // Filter tests for rescheduling: exclude past dates and dates within 24 hours
          let filteredTests: TestItem[] = response.items;
          if (isRescheduling) {
            // Get current time in Saudi time (GMT+3)
            const now = getCurrentSaudiTime();
            // Add 24 hours in Saudi time context
            const minAllowedDate = addHoursInSaudiTime(now, 24);

            filteredTests = response.items.filter((test: TestItem) => {
              if (!test.testDate) return false;
              try {
                // testDate is in GMT+3 from service
                const testDate = new Date(test.testDate);
                // Exclude tests in the past or within next 24 hours
                // Only allow tests that are at least 24 hours from now
                const isAllowed = testDate >= minAllowedDate;
                if (!isAllowed) {
                  console.log(
                    `Test excluded (past or within 24h): ${
                      test.testDate
                    } (now GMT+3: ${now.toISOString()}, min allowed GMT+3: ${minAllowedDate.toISOString()})`
                  );
                }
                return isAllowed;
              } catch (error) {
                console.error("Error parsing test date:", error);
                return false;
              }
            });
            console.log(
              `Filtered tests for rescheduling: ${filteredTests.length} out of ${response.items.length} tests available (excluding past and next 24h)`
            );
          }

          setTestsList(filteredTests);
          console.log("Tests list fetched:", filteredTests);

          // Fetch test center location type if we have centerId
          if (centerId) {
            try {
              const centerFilter = encodeURIComponent(`id eq '${centerId}'`);
              const centerResponse = await fetch(
                `/api/test-centers?filter=${centerFilter}`,
                {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );

              if (centerResponse.ok) {
                const centerData = (await centerResponse.json()) as {
                  items?: { locationType?: TestCenterLocationType }[];
                } & Record<string, unknown>;
                if (centerData?.items && centerData.items.length > 0) {
                  setTestCenterLocationType(centerData.items[0].locationType || null);
                }
              }
            } catch (error) {
              console.error("Error fetching test center location type:", error);
            }
          }
        } else {
          console.log("No tests found or empty response");
          setTestsList([]);
        }
      } catch (error) {
        console.error("Error fetching tests list:", error);
        setTestsList([]);
      } finally {
        setIsLoadingTests(false);
      }
    };

    void fetchTestsList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    testCenterId,
    bookingData?.testTypeKey,
    bookingData?.testType,
    isRescheduling,
    existingBooking,
  ]);

  // Fetch test type names for display
  useEffect(() => {
    const fetchTestTypeNames = async () => {
      const testToUse =
        testsList?.find((test) => {
          if (!test.testDate || !test.startTime?.key || !selectedDate || !selectedTime)
            return false;
          return (
            new Date(test.testDate).toDateString() === selectedDate.toDateString() &&
            test.startTime.key === selectedTime.split("-")[0]
          );
        }) || testsList?.[0];

      if (testToUse?.typeOfTheTest?.name) {
        const currentName = testToUse.typeOfTheTest.name;
        setTestTypeNames({
          ar_SA: currentName,
          en_US: currentName,
        });
        setDisplayTestName(currentName);
      }
    };

    if (testCenterId && testsList && testsList.length > 0) {
      void fetchTestTypeNames();
    }
  }, [testsList, selectedDate, selectedTime, testCenterId]);

  const handleDateSelect = (date: Date | undefined) => {
    const newDate = date ?? null;
    setSelectedDate(newDate);
    setSelectedTime(null);
    if (newDate) {
      setCurrentMonth(newDate);
    }
    // Notify parent of selection change
    if (onSelectionChange) {
      onSelectionChange({ date: newDate, time: null, test: null });
    }
  };

  const handleTimeSelect = (timeSlot: { value: string }) => {
    const timeValue = timeSlot.value;
    setSelectedTime(timeValue);

    // Find the selected test to pass complete booking info
    const selectedTest = testsList?.find((test) => {
      if (!test.testDate || !test.startTime || !test.endTime || !selectedDate)
        return false;
      try {
        const testDate = new Date(test.testDate);
        const normalizedTestDate = new Date(
          testDate.getFullYear(),
          testDate.getMonth(),
          testDate.getDate()
        );
        const normalizedSelectedDate = new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          selectedDate.getDate()
        );
        const dateMatches =
          normalizedTestDate.getTime() === normalizedSelectedDate.getTime();
        const [startTimeKey] = timeValue.split("-");
        const timeMatches = test.startTime.key === startTimeKey;
        return dateMatches && timeMatches;
      } catch {
        return false;
      }
    }) || null;

    // Notify parent of selection change
    if (onSelectionChange) {
      onSelectionChange({
        date: selectedDate,
        time: timeValue,
        test: selectedTest,
        locationType: testCenterLocationType ||
          (existingBooking?.locationType as TestCenterLocationType | undefined) ||
          null,
      });
    }
  };

  // Match both panels to the AppointmentDetails height
  useEffect(() => {
    let resizeTimeout: ReturnType<typeof setTimeout>;
    let rafId: number;
    let mutationObserver: MutationObserver;
    let resizeObserver: ResizeObserver;
    let initTimeout: ReturnType<typeof setTimeout>;

    const updateHeightFromAppointment = () => {
      if (!appointmentDetailsRef.current || !timeSlotRef.current) return;

      const appointmentWrapper = appointmentDetailsRef.current;
      const timeSlotWrapper = timeSlotRef.current;

      appointmentWrapper.style.height = "auto";
      void appointmentWrapper.offsetHeight;
      const appointmentHeight = appointmentWrapper.scrollHeight;

      if (appointmentHeight > 0) {
        const targetHeight = `${appointmentHeight}px`;
        appointmentWrapper.style.height = targetHeight;
        timeSlotWrapper.style.height = targetHeight;
        setSyncedHeight(targetHeight);
      }
    };

    const scheduleUpdate = (delay = 100) => {
      clearTimeout(resizeTimeout);
      if (delay === 0) {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          rafId = requestAnimationFrame(updateHeightFromAppointment);
        });
      } else {
        resizeTimeout = setTimeout(updateHeightFromAppointment, delay);
      }
    };

    const initializeObserver = () => {
      if (!appointmentDetailsRef.current) {
        initTimeout = setTimeout(initializeObserver, 100);
        return;
      }

      updateHeightFromAppointment();
      scheduleUpdate(0);

      if (appointmentDetailsRef.current) {
        mutationObserver = new MutationObserver(() => {
          scheduleUpdate();
        });
        mutationObserver.observe(appointmentDetailsRef.current, {
          childList: true,
          subtree: true,
          attributes: true,
          attributeFilter: ["style", "class"],
        });

        resizeObserver = new ResizeObserver(() => {
          scheduleUpdate();
        });
        resizeObserver.observe(appointmentDetailsRef.current);
      }
    };

    initializeObserver();

    return () => {
      clearTimeout(resizeTimeout);
      clearTimeout(initTimeout);
      if (rafId) cancelAnimationFrame(rafId);
      if (mutationObserver) mutationObserver.disconnect();
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, [selectedDate, selectedTime, testsList]);

  // Handle next button click - different logic for rescheduling vs normal booking
  const handleNext = async () => {
    if (!selectedDate || !selectedTime) {
      console.warn("Cannot proceed: Missing required booking information");
      return;
    }

    // Find the selected test
    const selectedTest =
      testsList?.find((test) => {
        if (!test.testDate || !test.startTime || !test.endTime || !selectedDate)
          return false;
        try {
          const testDate = new Date(test.testDate);
          const normalizedTestDate = new Date(
            testDate.getFullYear(),
            testDate.getMonth(),
            testDate.getDate()
          );
          const normalizedSelectedDate = new Date(
            selectedDate.getFullYear(),
            selectedDate.getMonth(),
            selectedDate.getDate()
          );

          const dateMatches =
            normalizedTestDate.getTime() === normalizedSelectedDate.getTime();
          const [startTimeKey] = selectedTime.split("-");
          const timeMatches = test.startTime.key === startTimeKey;

          return dateMatches && timeMatches;
        } catch {
          return false;
        }
      }) || null;

    if (!selectedTest) {
      console.warn("Selected test not found");
      return;
    }

    if (isRescheduling && existingBooking) {
      // Rescheduling flow - use custom handler if provided, otherwise use default
      if (onRescheduleNext) {
        // Use custom rescheduling handler
        onRescheduleNext({
          selectedDate,
          selectedTime,
          selectedTest,
          existingBooking,
        });
      } else {
        // Default rescheduling flow - update existing booking
        try {
          const requestBody = {
            r_testRelationship_c_testId: selectedTest.id,
          };

          const response = await fetch(
            `/api/test-bookings?bookingId=${String(existingBooking.id)}`,
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
                `Failed to reschedule booking: ${response.status}`
            );
          }

          const data = await response.json();
          console.log("Booking rescheduled successfully:", data);

          if (onRescheduleComplete) {
            onRescheduleComplete();
          } else {
            window.location.reload();
          }
        } catch (error) {
          console.error("Error rescheduling booking:", error);
          alert(
            error instanceof Error ? error.message : "Failed to reschedule booking"
          );
        }
      }
    } else {
      // Normal booking flow - store data and redirect to payment
      const centerId =
        resolvedTestCenterId || testCenterId || bookingData?.testCenterId;

      const bookingDataToStore = createBookingData({
        testCenterId: centerId,
        testId: selectedTest.id,
        testDate: selectedTest.testDate,
        selectedTimeSlot: selectedTime,
        startTime: selectedTest.startTime,
        endTime: selectedTest.endTime,
        testType:
          selectedTest.typeOfTheTest?.key ||
          bookingData?.testTypeKey ||
          bookingData?.testType,
        testTypeName: selectedTest.typeOfTheTest?.name || displayTestName,
        testTypeName_i18n: {
          ar_SA:
            testTypeNames.ar_SA ||
            selectedTest.typeOfTheTest?.name ||
            displayTestName,
          en_US:
            testTypeNames.en_US ||
            selectedTest.typeOfTheTest?.name ||
            displayTestName,
        },
        selectedDate,
        testStatus: selectedTest.testStatus,
        capacity: selectedTest.capacity,
        originalBookingData: bookingData,
      });

      try {
        storeBookingData(bookingDataToStore);
        window.location.href = "/profile/payment-data";
      } catch (error) {
        console.error("Error storing booking data:", error);
        alert("Failed to save booking data. Please try again.");
      }
    }
  };

  const handlePrevious = () => {
    if (onCancel) {
      onCancel();
    } else {
      window.location.href = "/test-takers/test-centers";
    }
  };

  return (
    <AOSProvider>
      {showBookingHeader && !isLoadingTests && (
        <BookingHeader
          currentStep={2}
          translations={translations}
          testName={displayTestName}
          testName_i18n={
            testTypeNames.ar_SA && testTypeNames.en_US ? testTypeNames : null
          }
        />
      )}

      <div
        className={`test-booking-wrapper ${
          isModal ? "test-booking-modal" : ""
        }`}
      >
        <div className="calendar-wrapper">
          <Calendar
            selectedDate={selectedDate}
            currentMonth={currentMonth}
            onSelect={handleDateSelect}
            onMonthChange={setCurrentMonth}
            translations={translations}
            testsList={testsList}
            isModal={isModal}
          />
        </div>
        <div
          ref={timeSlotRef}
          className={isModal ? "timeslot-modal" : ""}
          style={{
            height: syncedHeight,
            transition: "height 0.3s ease",
          }}
        >
          <TimeSlot
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            onTimeSelect={handleTimeSelect}
            translations={translations}
            testsList={testsList}
            disabled={false}
            isModal={isModal}
            existingBookingDate={
              isRescheduling && existingBooking?.testDate
                ? new Date(existingBooking.testDate as string)
                : null
            }
            existingBookingTimeSlot={
              isRescheduling &&
              existingBooking?.startTime &&
              existingBooking?.endTime
                ? `${(existingBooking.startTime as { key: string }).key}-${(
                    existingBooking.endTime as { key: string }
                  ).key}`
                : null
            }
          />
        </div>
        <div
          ref={appointmentDetailsRef}
          className={isModal ? "appointment-modal" : ""}
          style={{
            height: syncedHeight,
            transition: "height 0.3s ease",
          }}
        >
          <AppointmentDetails
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            testData={null}
            bookingData={bookingData}
            testsList={testsList}
            onPrevious={handlePrevious}
            onNext={handleNext}
            translations={translations}
            testCenterId={resolvedTestCenterId || testCenterId}
            isModal={isModal}
          />
        </div>
      </div>
    </AOSProvider>
  );
}
