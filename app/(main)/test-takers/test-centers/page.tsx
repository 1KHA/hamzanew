/* eslint-disable @typescript-eslint/no-explicit-any */

import { Metadata } from "next";
import { cookies } from "next/headers";
import { fetchContentWithKey } from "@/app/_lib/content-service";
import { extractFields } from "@/app/_lib/helper-service";
import { fetchTestCenters } from "@/app/_lib/booking/test-center-service";
import { fetchTests } from "@/app/_lib/booking/tests-service";
import { fetchTestBookings } from "@/app/_lib/booking/test-booking-service";
import {
  getCurrentSaudiTime,
  createDateInSaudiTime,
  addHoursInSaudiTime,
} from "@/app/_lib/time-utils";
import { st } from "@/app/_lib/static-text-server";
import TestCentersFilter from "./TestCentersFilter";
import styles from "./TestCenters.module.css";
import type {
  ExamCard,
  DeliveryOption,
  TestCentersLabels,
} from "./types";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await cookies()).get("lang")?.value?.startsWith("en")
    ? "en"
    : "ar";
  return {
    title: st("testTakers", "testCentersMetaTitle", locale),
  };
}

function formatTestDate(dateString: string, locale: "ar" | "en") {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale === "ar" ? "ar-SA" : "en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

function isTestUnavailable(testDate?: string, startTime?: { key?: string }) {
  if (!testDate) return true;

  try {
    const testDateObj = new Date(testDate);
    const timeString = startTime?.key || "0000";
    const startHour = parseInt(timeString.substring(0, 2) || "00", 10);
    const startMinute = parseInt(timeString.substring(2, 4) || "00", 10);

    const testDateTime = createDateInSaudiTime(
      testDateObj,
      startHour,
      startMinute,
      0
    );
    const now = getCurrentSaudiTime();
    const twentyFourHoursFromNow = addHoursInSaudiTime(now, 24);

    return (
      testDateTime < now ||
      (testDateTime >= now && testDateTime <= twentyFourHoursFromNow)
    );
  } catch (error) {
    console.error("Error parsing test date:", error);
    return true;
  }
}

export default async function TestCentersPage() {
  const cookieStore = await cookies();
  const locale = cookieStore.get("lang")?.value?.startsWith("en") ? "en" : "ar";
  const language = cookieStore.get("lang")?.value || "ar-SA";
  // CMS header content
  let testCentersContent = null;
  try {
    testCentersContent = await fetchContentWithKey(
      "TEST_TAKERS_TEST_CENTER_HEADER_CONTENT_KEY"
    );
  } catch (error) {
    console.error(
      "[TestCentersPage] Failed to fetch test center header content:",
      error
    );
  }

  const testCentersContentFields = extractFields(
    testCentersContent?.contentFields,
    ["titleText", "descriptionText"]
  ) as Record<string, string>;

  // Fetch test centers
  let testCentersMap = new Map<number | string, any>();
  try {
    const testCentersData = (await fetchTestCenters()) as {
      items?: any[];
    };

    testCentersMap = new Map(
      (testCentersData?.items || []).map((item: any) => {
        const langKey = language.replace("-", "_");
        const locationName =
          item.locationName_i18n?.[langKey] ||
          item.locationName_i18n?.en_US ||
          item.locationName ||
          "";
        const country = item.countryCode?.name || item.countryCode?.key || "";
        const countryKey = item.countryCode?.key || "";

        return [
          item.id,
          {
            id: item.id,
            centerName: item.locationType?.name || item.locationType?.key || "",
            centerKey: item.locationType?.key || "",
            country,
            countryKey,
            location: locationName,
            testType: item.typeOfTheTest?.name || "",
            capacity: item.capacity || "",
            testId: "",
            level: "",
            status: item.status?.label_i18n || item.status?.label || "",
            date: "",
            registationStatus: "",
          },
        ];
      })
    );
  } catch (error) {
    console.error("[TestCentersPage] Failed to fetch test centers:", error);
  }

  // Fetch available tests
  let tests: any[] = [];
  try {
    const testsData = (await fetchTests(
      null,
      "testStatus eq 'Available'"
    )) as { items?: unknown[] };
    tests = (testsData?.items || []) as any[];
  } catch (error) {
    console.error("[TestCentersPage] Failed to fetch tests:", error);
  }

  // Build exam cards
  const testCenterIdsWithTests = new Set<number | string>();
  const combinationMap = new Map<
    string,
    {
      testCenter: any;
      testCenterId: number | string;
      typeOfTheTest: string;
      typeOfTheTestKey: string;
      hasAvailable: boolean;
      nearestAvailableTest: any | null;
      nearestTest: any | null;
    }
  >();

  for (const test of tests) {
    const testCenterId = test.r_testCenterRelationship_c_testCenterId;
    const typeOfTheTest = test.typeOfTheTest?.name || "";

    if (testCenterId && testCentersMap.has(testCenterId)) {
      testCenterIdsWithTests.add(testCenterId);
      const combinationKey = `${testCenterId}_${typeOfTheTest}`;
      let agg = combinationMap.get(combinationKey);
      const testCenter = testCentersMap.get(testCenterId);

      if (!agg) {
        agg = {
          testCenter,
          testCenterId,
          typeOfTheTest,
          typeOfTheTestKey: test.typeOfTheTest?.key || "",
          hasAvailable: false,
          nearestAvailableTest: null,
          nearestTest: null,
        };
        combinationMap.set(combinationKey, agg);
      }

      const isUnavailableByDate = isTestUnavailable(
        test.testDate,
        test.startTime
      );
      const isUnavailableByStatus = test.testStatus?.key !== "Available";

      let isUnavailableByCapacity = false;
      if (test.id) {
        try {
          const filter = `r_testRelationship_c_testId eq '${test.id}'`;
          const bookings = (await fetchTestBookings(filter)) as {
            items?: { length?: number }[];
            totalCount?: number;
          };
          const bookingCount =
            bookings?.items?.length || bookings?.totalCount || 0;
          const testCapacity = test.capacity || testCenter?.capacity || 0;
          const capacityNum =
            typeof testCapacity === "string"
              ? parseInt(testCapacity, 10)
              : testCapacity;

          if (capacityNum > 0 && bookingCount >= capacityNum) {
            isUnavailableByCapacity = true;
          }
        } catch (err) {
          console.error(
            `[TestCentersPage] Failed to fetch bookings for test ${test.id}:`,
            err
          );
        }
      }

      const isUnavailable =
        isUnavailableByDate || isUnavailableByStatus || isUnavailableByCapacity;
      const isAvailable = !isUnavailable;

      // Diagnostic logging for Riyadh / General Test combinations
      if (testCenter?.location?.includes("الرياض") || typeOfTheTest === "اختبار عام") {
        console.log("[TestCentersPage] Riyadh/General test slot:", {
          testId: test.id,
          testDate: test.testDate,
          startTime: test.startTime,
          isUnavailableByDate,
          isUnavailableByStatus,
          isUnavailableByCapacity,
          isAvailable,
          testCenterId,
          location: testCenter?.location,
        });
      }

      const testDateMs = test.testDate
        ? new Date(test.testDate).getTime()
        : Infinity;

      if (
        !agg.nearestTest ||
        (test.testDate &&
          testDateMs <
            (agg.nearestTest.testDate
              ? new Date(agg.nearestTest.testDate).getTime()
              : Infinity))
      ) {
        agg.nearestTest = test;
      }

      if (isAvailable) {
        agg.hasAvailable = true;
        if (
          !agg.nearestAvailableTest ||
          (test.testDate &&
            testDateMs <
              (agg.nearestAvailableTest.testDate
                ? new Date(agg.nearestAvailableTest.testDate).getTime()
                : Infinity))
        ) {
          agg.nearestAvailableTest = test;
        }
      }
    }
  }

  console.log(
    "[TestCentersPage] Built combinations:",
    Array.from(combinationMap.entries()).map(([key, agg]) => ({
      key,
      hasAvailable: agg.hasAvailable,
      nearestTestDate: agg.nearestTest?.testDate,
      nearestAvailableTestDate: agg.nearestAvailableTest?.testDate,
    }))
  );

  const examCards: ExamCard[] = [];
  combinationMap.forEach((agg) => {
    const selectedTest = agg.hasAvailable
      ? agg.nearestAvailableTest
      : agg.nearestTest;
    const isUnavailable = !agg.hasAvailable;

    examCards.push({
      ...agg.testCenter,
      registationStatus: isUnavailable ? "unavailable" : "available",
      typeOfTheTest: agg.typeOfTheTest,
      typeOfTheTestKey: agg.typeOfTheTestKey,
      testId: selectedTest?.id || "",
      capacity: selectedTest?.capacity || agg.testCenter?.capacity || "",
      testStatus: selectedTest?.testStatus?.name || "",
      date: selectedTest?.testDate
        ? formatTestDate(selectedTest.testDate, locale)
        : "",
    });
  });

  // Add test centers without tests as unavailable
  testCentersMap.forEach((testCenter, testCenterId) => {
    if (!testCenterIdsWithTests.has(testCenterId)) {
      examCards.push({
        ...testCenter,
        registationStatus: "unavailable",
        typeOfTheTest: "",
        typeOfTheTestKey: "",
        testStatus: "",
        date: "",
      });
    }
  });

  const deliveryOptions: DeliveryOption[] = [
    {
      id: "LocalCenter",
      label: st("testTakers", "testCentersLocalCenter", locale),
      defaultChecked: true,
    },
    {
      id: "Online",
      label: st("testTakers", "testCentersOnline", locale),
      defaultChecked: false,
    },
    {
      id: "SpecialNeeds",
      label: st("testTakers", "testCentersSpecialNeeds", locale),
      defaultChecked: false,
    },
  ];

  const labels: TestCentersLabels = {
    testTypePlaceholder: st("testTakers", "testCentersTestTypePlaceholder", locale),
    countryPlaceholder: st("testTakers", "testCentersCountryPlaceholder", locale),
    noCentersMessage: st("testTakers", "testCentersNoCenters", locale),
    noTestAvailable: st("testTakers", "testCentersNoTest", locale),
    registrationStatus: st("testTakers", "testCentersRegistrationStatus", locale),
    available: st("testTakers", "testCentersAvailable", locale),
    unavailable: st("testTakers", "testCentersUnavailable", locale),
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {testCentersContentFields?.descriptionText ? (
          <p className={styles.intro}>
            {testCentersContentFields.descriptionText}
          </p>
        ) : null}

        <TestCentersFilter
          examCards={examCards}
          deliveryOptions={deliveryOptions}
          labels={labels}
        />

      </div>
    </div>
  );
}
