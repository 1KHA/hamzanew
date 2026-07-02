import { getTranslations } from "@/app/_lib/getTranslations";
import { fetchTests } from "@/app/_lib/booking/tests-service";
import TestBookingClient from "./TestBookingClient";
import type { TestItem } from "@/app/_lib/booking-types";

interface PageProps {
  params: Promise<{ testCenterId: string }>;
}

export default async function Page({ params }: PageProps) {
  const translations = await getTranslations();
  const { testCenterId } = await params;

  // Fetch test data based on testCenterId
  let testData: TestItem | null = null;
  if (testCenterId) {
    try {
      const response = (await fetchTests(testCenterId)) as {
        items?: TestItem[];
      };
      testData = response?.items?.[0] || null;
    } catch (error) {
      console.error("Error fetching test data:", error);
    }
  }

  return <TestBookingClient translations={translations} testData={testData} />;
}
