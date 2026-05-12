import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { fetchContentWithKey } from '@/app/_lib/content-service';
import { extractFields, extractList } from '@/app/_lib/helper-service';
import { st } from '@/app/_lib/static-text-server';

export async function GET() {
  try {
    // Get locale from cookie for localized fallbacks
    const cookieStore = await cookies();
    const locale = cookieStore.get("lang")?.value || "ar-SA";
    const staticLocale = locale.startsWith("en") ? "en" : "ar";

    // Fetch data from backend
    const benefitsContentData = await fetchContentWithKey(
      "HAMZA_HOMEPAGE_BENEFITS_OF_HAMZA_TEST_BENEFITS_OF_HAMZA_TEST_CONTENT_KEY"
    );

    // Extract fields using helper functions
    const benefitsContentDataContentFields = extractFields(
      benefitsContentData?.contentFields,
      ["descriptionText"]
    );
    
    const objectArray = extractList(
      benefitsContentData?.contentFields,
      "BenefitsFieldset",
      {
        numberText: "number",
        benefitsTitleText: "title",
        benefitsDescriptionText: "description",
      }
    );

    // Return the processed data
    return NextResponse.json({
      title: benefitsContentData?.title || st("about", "benefitsTakersTitle", staticLocale),
      description: (benefitsContentDataContentFields as { descriptionText?: string })?.descriptionText || 
        st("about", "benefitsDescription", staticLocale),
      benefits: objectArray?.length > 0 ? objectArray : null
    });
  } catch (error) {
    console.error("Failed to fetch content:", error);
    return NextResponse.json(
      { error: "Failed to fetch benefits data" },
      { status: 500 }
    );
  }
}
