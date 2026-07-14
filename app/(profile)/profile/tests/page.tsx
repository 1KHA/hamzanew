import { Metadata } from "next";
import { cookies } from "next/headers";
import { getTranslations } from "@/app/_lib/getTranslations";
import { getCachedUserProfile } from "@/app/_lib/session-cache";
import { fetchTestBookings } from "@/app/_lib/booking/test-booking-service";
import { fetchTests } from "@/app/_lib/booking/tests-service";
import { fetchTestCenters } from "@/app/_lib/booking/test-center-service";
import { st } from "@/app/_lib/static-text-server";
import PageHero from "@/app/components/page-hero/PageHero";
import TestsClient from "./TestsClient";
import type { TestBooking, TestItem, TestCenter } from "@/app/_lib/booking-types";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await cookies()).get("lang")?.value?.startsWith("en")
    ? "en"
    : "ar";
  return {
    title: st("profileTests", "metaTitle", locale),
  };
}

export default async function Page() {
  const translations = await getTranslations();
  const locale = (await cookies()).get("lang")?.value?.startsWith("en")
    ? "en"
    : "ar";

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

  const strings = {
    sectionRemote: st("profileTests", "sectionRemote", locale),
    sectionInPerson: st("profileTests", "sectionInPerson", locale),
    statusScheduled: st("profileTests", "statusScheduled", locale),
    statusCompleted: st("profileTests", "statusCompleted", locale),
    statusCancelled: st("profileTests", "statusCancelled", locale),
    labelTestType: st("profileTests", "labelTestType", locale),
    labelTestDate: st("profileTests", "labelTestDate", locale),
    labelTimeSlot: st("profileTests", "labelTimeSlot", locale),
    labelTestLocation: st("profileTests", "labelTestLocation", locale),
    actionCancel: st("profileTests", "actionCancel", locale),
    actionDelay: st("profileTests", "actionDelay", locale),
    actionTestDetails: st("profileTests", "actionTestDetails", locale),
    actionBrowseTests: st("profileTests", "actionBrowseTests", locale),
    emptyStateTitle: st("profileTests", "emptyStateTitle", locale),
    emptyStateDescription: st("profileTests", "emptyStateDescription", locale),
  };

  const HERO_CONFIG = {
    title: st("profileTests", "heroTitle", locale),
    bgColor: "#F9FAFB",
    breadcrumbs: [
      { label: st("profileTests", "breadcrumbHome", locale), path: "/" },
      {
        label: st("profileTests", "breadcrumbProfile", locale),
        path: "/profile",
      },
      { label: st("profileTests", "breadcrumbTests", locale), disabled: true },
    ],
  };

  return (
    <>
      <PageHero
        heroMap={{ "/profile/tests": HERO_CONFIG }}
        defaultRoute="/profile/tests"
        breadcrumbsMax={3}
        translations={translations}
      />

      <section
        aria-labelledby="tests-heading"
        className="profile-main-section"
      >
        <h1 id="tests-heading" className="sr-only">
          {st("profileTests", "heroTitle", locale)}
        </h1>
        <div className="content" role="main">
          <TestsClient
            translations={translations}
            userProfileData={userProfileData}
            enrichedBookings={enrichedBookings}
            strings={strings}
          />
        </div>
      </section>
    </>
  );
}
