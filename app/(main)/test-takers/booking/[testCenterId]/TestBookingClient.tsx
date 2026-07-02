"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import AOSProvider from "@/app/_components/AOSProvider";
import Calendar from "../Calendar";
import TimeSlot from "../TimeSlot";
import AppointmentDetails from "../AppointmentDetails";
import BookingHeader from "../BookingHeader";
import { fetchTests } from "@/app/_lib/booking/tests-service";
import {
  getBookingData,
  createBookingData,
  storeBookingData,
} from "@/app/_lib/booking/booking-data-utils";
import type {
  BookingData,
  TestItem,
  TranslationDict,
} from "@/app/_lib/booking-types";

interface TestBookingClientProps {
  translations: TranslationDict;
  testData?: TestItem | null;
}

export default function TestBookingClient({
  translations,
  testData,
}: TestBookingClientProps) {
  const params = useParams<{ testCenterId: string }>();
  const router = useRouter();
  // Get testCenterId from URL params, but will also check bookingData
  const testCenterIdFromParams = params?.testCenterId;

  // Get testCenterId from params or bookingData via lazy initializer
  const storedBookingData = useMemo<BookingData | null>(() => getBookingData(), []);

  const [testCenterId, setTestCenterId] = useState<string | number | null>(
    () => {
      const centerId = testCenterIdFromParams || storedBookingData?.testCenterId;
      return centerId || null;
    }
  );

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const timeSlotRef = useRef<HTMLDivElement>(null);
  const appointmentDetailsRef = useRef<HTMLDivElement>(null);
  const [syncedHeight, setSyncedHeight] = useState("auto");
  const [bookingData] = useState<BookingData | null>(storedBookingData);
  const [testsList, setTestsList] = useState<TestItem[] | null>(null);
  const [isLoadingTests, setIsLoadingTests] = useState(false);
  const [testTypeNames, setTestTypeNames] = useState({
    ar_SA: "",
    en_US: "",
  });
  const [hasExistingBooking, setHasExistingBooking] = useState(false);
  const [displayTestName, setDisplayTestName] = useState("");

  // Redirect to error page if testCenterId is missing from both params and bookingData
  useEffect(() => {
    const centerId = testCenterIdFromParams || storedBookingData?.testCenterId;

    if (centerId) {
      setTestCenterId(centerId);
    } else {
      // Only redirect if we don't have testCenterId from either source
      const isValidTestCenterId =
        typeof testCenterIdFromParams === "string" &&
        testCenterIdFromParams !== "" &&
        testCenterIdFromParams !== "undefined" &&
        testCenterIdFromParams.trim() !== "";

      if (!isValidTestCenterId) {
        window.location.href = "/not-found";
      }
    }
  }, [testCenterIdFromParams, storedBookingData?.testCenterId]);

  // Retrieve booking data from sessionStorage and ensure testCenterId is stored
  useEffect(() => {
    const centerId = testCenterId || storedBookingData?.testCenterId;

    if (storedBookingData) {
      // Ensure testCenterId is in the booking data
      if (centerId && !storedBookingData.testCenterId) {
        const updatedBookingData = {
          ...storedBookingData,
          testCenterId: centerId,
        };
        storeBookingData(updatedBookingData);
      }
      // Update testCenterId state if it's in bookingData
      if (storedBookingData.testCenterId && !testCenterId) {
        setTestCenterId(storedBookingData.testCenterId);
      }
      console.log("Retrieved booking data from session:", storedBookingData);
    } else if (centerId) {
      // If no booking data exists but we have testCenterId, create initial structure
      const initialBookingData = createBookingData({
        testCenterId: centerId,
        testId: null,
        testDate: null,
        selectedTimeSlot: null,
        startTime: null,
        endTime: null,
        testType: null,
        testTypeName: "",
        testTypeName_i18n: { ar_SA: "", en_US: "" },
        selectedDate: null,
        testStatus: null,
        capacity: null,
      });
      storeBookingData(initialBookingData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testCenterId]);

  // Fetch list of tests based on testCenterId and typeOfTheTest
  useEffect(() => {
    const fetchTestsList = async () => {
      // Get typeOfTheTest value from bookingData (prefer testTypeKey)
      const typeOfTheTest = bookingData?.testTypeKey || bookingData?.testType;

      if (!testCenterId || !typeOfTheTest) {
        return;
      }

      setIsLoadingTests(true);
      try {
        // Build the filter: r_testCenterRelationship_c_testCenterId eq 'testCenterId' and typeOfTheTest eq 'typeOfTheTest'
        const filter = `r_testCenterRelationship_c_testCenterId eq '${testCenterId}' and typeOfTheTest eq '${typeOfTheTest}' and testStatus eq 'Available'`;

        console.log("Fetching tests with filter:", filter);
        const response = (await fetchTests(null, filter)) as {
          items?: TestItem[];
        };

        if (response?.items) {
          setTestsList(response.items);
          console.log("Tests list fetched:", response.items);
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
  }, [testCenterId, bookingData?.testTypeKey, bookingData?.testType]);

  // Check for existing test booking and verify test type match
  useEffect(() => {
    const checkExistingBooking = async () => {
      if (!bookingData?.testTypeKey) {
        return;
      }

      try {
        // Fetch user profile to get emailId
        const profileResponse = await fetch("/api/user-profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!profileResponse.ok) {
          return;
        }

        const profileData = (await profileResponse.json()) as {
          emailId?: string;
          status?: string;
        } & Record<string, unknown>;
        const userEmail =
          profileData && profileData.status !== "FAIL" ? profileData.emailId : null;

        if (!userEmail) {
          return;
        }

        // Fetch existing test bookings for the user (exclude Completed/Cancelled)
        const filter = encodeURIComponent(
          `emailId eq '${userEmail}' and (testBookingStatus ne 'Completed' and testBookingStatus ne 'Cancelled')`
        );

        const bookingsResponse = await fetch(
          `/api/test-bookings?filter=${filter}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!bookingsResponse.ok) {
          console.error("Error fetching existing bookings");
          return;
        }

        const bookingsData = (await bookingsResponse.json()) as {
          items?: { r_testRelationship_c_testId?: string | number; id?: string | number }[];
        } & Record<string, unknown>;
        console.log("Existing bookings fetched:", bookingsData);

        if (
          bookingsData.items &&
          Array.isArray(bookingsData.items) &&
          bookingsData.items.length > 0
        ) {
          // Iterate through all active bookings to find a matching test type
          for (const booking of bookingsData.items) {
            const testId = booking.r_testRelationship_c_testId;
            if (!testId) {
              continue;
            }

            // Fetch test details
            const testDetailsResponse = await fetch(
              `/api/tests?testId=${String(testId)}`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );

            if (!testDetailsResponse.ok) {
              continue;
            }

            const testDetailsData = (await testDetailsResponse.json()) as {
              items?: TestItem[];
            } & Record<string, unknown>;
            console.log("Test details fetched:", testDetailsData);

            if (testDetailsData.items && testDetailsData.items.length > 0) {
              const testItem = testDetailsData.items[0];
              const testTypeKey = testItem.typeOfTheTest?.key;

              // Verify if test type key matches
              if (testTypeKey === bookingData.testTypeKey) {
                console.log("Existing booking found with matching test type");
                setHasExistingBooking(true);

                // Pre-select date and time from the existing test
                if (testItem.testDate) {
                  const testDate = new Date(testItem.testDate);
                  setSelectedDate(testDate);
                  setCurrentMonth(testDate);
                }

                // Stop after finding the first matching booking
                break;
              }
            }
          }
        }
      } catch (error) {
        console.error("Error checking existing booking:", error);
      }
    };

    void checkExistingBooking();
  }, [bookingData?.testTypeKey]);

  const handleDateSelect = (date: Date | undefined) => {
    const newDate = date ?? null;
    setSelectedDate(newDate);
    setSelectedTime(null);
    if (newDate) {
      setCurrentMonth(newDate);
    }
  };

  const handleTimeSelect = (timeSlot: { value: string }) => {
    setSelectedTime(timeSlot.value);
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

      // Measure AppointmentDetails natural height
      appointmentWrapper.style.height = "auto";
      // Force reflow to ensure accurate measurement
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
      // Use requestAnimationFrame for initial render, setTimeout for subsequent updates
      if (delay === 0) {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          rafId = requestAnimationFrame(updateHeightFromAppointment);
        });
      } else {
        resizeTimeout = setTimeout(updateHeightFromAppointment, delay);
      }
    };

    // Wait for refs to be available
    const initializeObserver = () => {
      if (!appointmentDetailsRef.current) {
        // Retry if refs aren't ready yet
        initTimeout = setTimeout(initializeObserver, 50);
        return;
      }

      // Initial update with multiple attempts to handle async content loading
      scheduleUpdate(0); // Immediate with RAF
      scheduleUpdate(100); // After a short delay
      scheduleUpdate(300); // After content might have loaded
      scheduleUpdate(500); // Final fallback

      // Use ResizeObserver to catch any size changes
      resizeObserver = new ResizeObserver(() => scheduleUpdate());
      resizeObserver.observe(appointmentDetailsRef.current);
      if (timeSlotRef.current) {
        resizeObserver.observe(timeSlotRef.current);
      }

      // Use MutationObserver to catch content changes (like async data loading)
      mutationObserver = new MutationObserver(() => {
        scheduleUpdate();
      });

      if (appointmentDetailsRef.current) {
        mutationObserver.observe(appointmentDetailsRef.current, {
          childList: true,
          subtree: true,
          characterData: true,
          attributes: true,
          attributeFilter: ["class", "style"],
        });
      }
    };

    initializeObserver();

    const handleResize = () => scheduleUpdate();
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(resizeTimeout);
      clearTimeout(initTimeout);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      window.removeEventListener("resize", handleResize);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      if (mutationObserver) {
        mutationObserver.disconnect();
      }
    };
  }, [selectedDate, selectedTime, testsList, bookingData]);

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
      } catch (error) {
        console.error("Error matching test:", error);
        return false;
      }
    });
  }, [selectedDate, selectedTime, testsList]);

  // Get test name with fallbacks - same logic as AppointmentDetails
  // Priority: selectedTest > first item from testsList > testData
  const displayTestNameComputed = useMemo(() => {
    return (
      selectedTest?.typeOfTheTest?.name ||
      (testsList && Array.isArray(testsList) && testsList.length > 0
        ? testsList[0]?.typeOfTheTest?.name
        : testData?.typeOfTheTest?.name) ||
      ""
    );
  }, [selectedTest, testsList, testData]);

  useEffect(() => {
    if (displayTestNameComputed) {
      setDisplayTestName(displayTestNameComputed);
    }
  }, [displayTestNameComputed]);

  // Fetch test type name in both languages
  useEffect(() => {
    const fetchTestTypeNames = async () => {
      const testToUse =
        selectedTest ||
        (testsList && testsList.length > 0 ? testsList[0] : null) ||
        testData;
      const testTypeKey =
        testToUse?.typeOfTheTest?.key ||
        bookingData?.testTypeKey ||
        bookingData?.testType;

      if (!testTypeKey || !testCenterId) {
        return;
      }

      try {
        // Build filter for fetching test
        const filter = `r_testCenterRelationship_c_testCenterId eq '${testCenterId}' and typeOfTheTest eq '${testTypeKey}'`;

        // Fetch test in Arabic
        const responseAr = await fetch(
          `/api/tests?filter=${encodeURIComponent(filter)}&lang=ar-SA`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        // Fetch test in English
        const responseEn = await fetch(
          `/api/tests?filter=${encodeURIComponent(filter)}&lang=en-US`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        let arName = "";
        let enName = "";

        if (responseAr.ok) {
          const dataAr = (await responseAr.json()) as {
            items?: TestItem[];
          } & Record<string, unknown>;
          arName = dataAr?.items?.[0]?.typeOfTheTest?.name || "";
        }

        if (responseEn.ok) {
          const dataEn = (await responseEn.json()) as {
            items?: TestItem[];
          } & Record<string, unknown>;
          enName = dataEn?.items?.[0]?.typeOfTheTest?.name || "";
        }

        // Fallback to current display name if API calls fail
        if (!arName && !enName) {
          const currentName =
            displayTestName || testToUse?.typeOfTheTest?.name || "";
          const currentLang = getCookie("lang") || "ar-SA";
          if (currentLang === "ar-SA") {
            arName = currentName;
            // If we only have Arabic, use it for English too (better than empty)
            enName = currentName;
          } else {
            enName = currentName;
            // If we only have English, use it for Arabic too (better than empty)
            arName = currentName;
          }
        }

        setTestTypeNames({
          ar_SA:
            arName || testToUse?.typeOfTheTest?.name || displayTestName || "",
          en_US:
            enName || testToUse?.typeOfTheTest?.name || displayTestName || "",
        });
      } catch (error) {
        console.error(
          "Error fetching test type names in both languages:",
          error
        );
        // Fallback to current name for both languages
        const currentName =
          displayTestName || testToUse?.typeOfTheTest?.name || "";
        setTestTypeNames({
          ar_SA: currentName,
          en_US: currentName,
        });
      }
    };

    // Only fetch if we have the necessary data
    if (testCenterId && (selectedTest || testsList?.length || testData)) {
      void fetchTestTypeNames();
    }
  }, [
    selectedTest,
    testsList,
    testData,
    testCenterId,
    bookingData?.testTypeKey,
    bookingData?.testType,
    displayTestName,
  ]);

  // Handle next button click - capture booking data and redirect
  const handleNext = () => {
    if (!selectedDate || !selectedTime || !selectedTest) {
      console.warn("Cannot proceed: Missing required booking information");
      return;
    }

    // Create comprehensive booking data structure using uniform format
    const bookingDataToStore = createBookingData({
      testCenterId,
      testId: selectedTest.id,
      testDate: selectedTest.testDate,
      selectedTimeSlot: selectedTime, // Format: "00-02"
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

    // Store in sessionStorage
    try {
      storeBookingData(bookingDataToStore);
      // Redirect to payment data page
      router.push("/test-takers/booking/payment-data");
    } catch (error) {
      console.error("Error storing booking data:", error);
      alert("Failed to save booking data. Please try again.");
    }
  };

  return (
    <AOSProvider>
      <div id="midd-wrapper">
        <section className="cmn-section lightgrey-bg screen20-first-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                {!isLoadingTests && (
                  <BookingHeader
                    currentStep={2}
                    translations={translations}
                    testName={displayTestName}
                    testName_i18n={
                      testTypeNames.ar_SA && testTypeNames.en_US
                        ? testTypeNames
                        : null
                    }
                  />
                )}

                <div className="test-booking-wrapper">
                  <div className="calendar-wrapper">
                    <Calendar
                      selectedDate={selectedDate}
                      currentMonth={currentMonth}
                      onSelect={handleDateSelect}
                      onMonthChange={setCurrentMonth}
                      translations={translations}
                      testsList={testsList}
                    />
                  </div>
                  <div
                    ref={timeSlotRef}
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
                      disabled={hasExistingBooking}
                    />
                  </div>
                  <div
                    ref={appointmentDetailsRef}
                    style={{
                      height: syncedHeight,
                      transition: "height 0.3s ease",
                    }}
                  >
                    <AppointmentDetails
                      selectedDate={selectedDate}
                      selectedTime={selectedTime}
                      testData={testData}
                      bookingData={bookingData}
                      testsList={testsList}
                      onPrevious={() =>
                        router.push("/test-takers/test-centers")
                      }
                      onNext={handleNext}
                      translations={translations}
                      testCenterId={testCenterId}
                    />
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

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() ?? null;
  return null;
}
