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
import ScrollReveal from "@/app/components/scroll-reveal/ScrollReveal";
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
  // CMS header + special-needs footer content
  let testCentersContent;
  let specialNeedsContent;
  try {
    testCentersContent = await fetchContentWithKey(
      "TEST_TAKERS_TEST_CENTER_HEADER_CONTENT_KEY"
    );
    specialNeedsContent = await fetchContentWithKey(
      "TEST_TAKERS_TEST_DELIVERY_OPTIONS_SPECIAL_NEEDS_CONTENT_KEY"
    );
  } catch (error) {
    console.error("[TestCentersPage] Failed to fetch CMS content:", error);
  }

  const testCentersContentFields = extractFields(
    testCentersContent?.contentFields,
    ["titleText", "descriptionText"]
  ) as Record<string, string>;

  const specialNeedsContentFields = extractFields(
    specialNeedsContent?.contentFields,
    ["titleText", "descriptionText", "buttonText"]
  ) as Record<string, string>;

  // Fetch test centers
  let testCentersMap = new Map<number | string, any>();
  try {
    const testCentersData = await fetchTestCenters();

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
  const processedCombinations = new Set<string>();
  const testCenterIdsWithTests = new Set<number | string>();
  const examCards: ExamCard[] = [];

  for (const test of tests) {
    const testCenterId = test.r_testCenterRelationship_c_testCenterId;
    const typeOfTheTest = test.typeOfTheTest?.name || "";

    if (testCenterId && testCentersMap.has(testCenterId)) {
      const combinationKey = `${testCenterId}_${typeOfTheTest}`;

      if (!processedCombinations.has(combinationKey)) {
        processedCombinations.add(combinationKey);
        testCenterIdsWithTests.add(testCenterId);

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
            const testCenter = testCentersMap.get(testCenterId);
            const testCapacity =
              test.capacity || testCenter?.capacity || 0;
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
        const testCenter = testCentersMap.get(testCenterId);

        examCards.push({
          ...testCenter,
          registationStatus: isUnavailable ? "unavailable" : "available",
          typeOfTheTest,
          typeOfTheTestKey: test.typeOfTheTest?.key || "",
          testId: test.id || "",
          capacity: test.capacity || testCenter?.capacity || "",
          testStatus: test.testStatus?.name || "",
        });
      }
    }
  }

  // Add test centers without tests as unavailable
  testCentersMap.forEach((testCenter, testCenterId) => {
    if (!testCenterIdsWithTests.has(testCenterId)) {
      examCards.push({
        ...testCenter,
        registationStatus: "unavailable",
        typeOfTheTest: "",
        typeOfTheTestKey: "",
        testStatus: "",
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
    specialNeedsButton: st("testTakers", "testCentersSpecialNeedsButton", locale),
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

        <ScrollReveal direction="up" delay={0.1}>
          <div className={styles.specialNeedsFooter}>
            <h2 className={styles.specialNeedsTitle}>
              {specialNeedsContentFields?.titleText ?? ""}
            </h2>
            <p className={styles.specialNeedsDescription}>
              {specialNeedsContentFields?.descriptionText ?? ""}
            </p>
            <button type="button" className={styles.specialNeedsButton}>
              {specialNeedsContentFields?.buttonText ?? labels.specialNeedsButton}
            </button>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
