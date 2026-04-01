import { NextResponse } from 'next/server';
import { fetchContentWithKey } from '@/app/_lib/content-service';
import { extractFields, extractList } from '@/app/_lib/helper-service';

export async function GET() {
  try {
    // Fetch data from backend
    const whyHamzaTestContent = await fetchContentWithKey(
      "HAMZA_HOMEPAGE_WHO_WE_ARE_HAMZA_TESTS_ADVANTAGES_CONTENT_KEY"
    );

    // Extract fields using helper functions
    const whyHamzaTestContentFields = extractFields(
      whyHamzaTestContent?.contentFields,
      ["titleText", "descriptionText"]
    );
    
    const whyHamzaTestPointsList = extractList(
      whyHamzaTestContent?.contentFields,
      "whyHamzaTestFieldset",
      {
        pointNumberText: "number",
        pointDescriptionText: "description",
      }
    );

    // Return the processed data
    return NextResponse.json({
      title: (whyHamzaTestContentFields as { titleText?: string })?.titleText || "السمات",
      traits: whyHamzaTestPointsList?.length > 0 ? whyHamzaTestPointsList : null
    });
  } catch (error) {
    console.error("Failed to fetch content:", error);
    return NextResponse.json(
      { error: "Failed to fetch traits data" },
      { status: 500 }
    );
  }
}
