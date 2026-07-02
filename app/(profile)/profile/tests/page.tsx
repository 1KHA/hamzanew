import { getTranslations } from "@/app/_lib/getTranslations";
import { getCachedUserProfile } from "@/app/_lib/session-cache";
import { fetchTestBookings } from "@/app/_lib/booking/test-booking-service";
import { fetchTests } from "@/app/_lib/booking/tests-service";
import { fetchTestCenters } from "@/app/_lib/booking/test-center-service";
import TestsClient from "./TestsClient";
import type { TestBooking, TestItem, TestCenter } from "@/app/_lib/booking-types";

export default async function Page() {
  const translations = await getTranslations();

  const userProfileData = await getCachedUserProfile();

  // Fetch test bookings for the user
  let testBookings: { items?: TestBooking[] } | null = null;
  let enrichedBookings: TestBooking[] = [];

  if (userProfileData && userProfileData.emailId) {
    try {
      const filter = `emailId eq '${userProfileData.emailId}'`;
      testBookings = (await fetchTestBookings(filter)) as {
        items?: TestBooking[];
      } & Record<string, unknown>;

      // Fetch all test centers once and create a map for efficient lookup
      const testCentersMap = new Map<string | number, TestCenter>();
      try {
        const testCentersResponse = (await fetchTestCenters()) as {
          items?: TestCenter[];
        } & Record<string, unknown>;
        if (testCentersResponse?.items) {
          testCentersResponse.items.forEach((center) => {
            testCentersMap.set(center.id, center);
          });
        }
      } catch (error) {
        console.error("Error fetching test centers:", error);
      }

      // Enrich bookings with typeOfTheTest and locationType
      if (testBookings?.items && Array.isArray(testBookings.items)) {
        const enrichedPromises = testBookings.items.map(async (booking) => {
          try {
            const testId = booking.r_testRelationship_c_testId;
            if (!testId) {
              return {
                ...booking,
                typeOfTheTest: null,
                testDate: null,
                testStatus: null,
                startTime: null,
                endTime: null,
                locationType: null,
              };
            }

            // Fetch test details using the testId
            const testDetailsResponse = (await fetchTests(
              null,
              `id eq '${testId}'`
            )) as { items?: TestItem[] } & Record<string, unknown>;
            const testDetails = testDetailsResponse?.items?.[0] || null;

            // Get test center ID from test details
            const testCenterId =
              testDetails?.r_testCenterRelationship_c_testCenterId || null;

            return {
              ...booking,
              typeOfTheTest: testDetails?.typeOfTheTest || null,
              testDate: testDetails?.testDate || null,
              testStatus: testDetails?.testStatus || null,
              startTime: testDetails?.startTime || null,
              endTime: testDetails?.endTime || null,
              locationType: testCenterId
                ? testCentersMap.get(testCenterId)?.locationType || null
                : null,
            };
          } catch (error) {
            console.error(`Error enriching booking ${booking.id}:`, error);
            return {
              ...booking,
              typeOfTheTest: null,
              testDate: null,
              testStatus: null,
              startTime: null,
              endTime: null,
              locationType: null,
            };
          }
        });

        enrichedBookings = (await Promise.all(
          enrichedPromises
        )) as TestBooking[];
      }
    } catch (error) {
      console.error("Error fetching test bookings:", error);
      // Continue without test bookings data if fetch fails
    }
  }

  // Update testBookings with enriched items
  if (testBookings && enrichedBookings.length > 0) {
    testBookings = {
      ...testBookings,
      items: enrichedBookings,
    };
  }

  return (
    <TestsClient
      translations={translations}
      userProfileData={userProfileData}
      enrichedBookings={enrichedBookings}
    />
  );
}
