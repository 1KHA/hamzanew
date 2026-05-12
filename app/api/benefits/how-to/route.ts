import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { fetchContentWithKey } from '@/app/_lib/content-service';
import { extractList } from '@/app/_lib/helper-service';
import { st } from '@/app/_lib/static-text-server';

export async function GET() {
  try {
    // Get locale from cookie for localized fallbacks
    const cookieStore = await cookies();
    const locale = cookieStore.get("lang")?.value || "ar-SA";
    const staticLocale = locale.startsWith("en") ? "en" : "ar";

    // Fetch data from backend
    const howToBenefitsFromTestContent = await fetchContentWithKey(
      "HAMZA_HOMEPAGE_BENEFITS_OF_HAMZA_TEST_HAMZA_ACADEMIC_KEY_OBJECTIVES_CONTENT_KEY"
    );

    // Extract list of test benefits
    const benefitsList = extractList(
      howToBenefitsFromTestContent?.contentFields,
      "TestsFieldset",
      {
        testNameText: "number",
        image: "icon",
        testDescriptionText: "content",
      }
    );

    // Return the processed data
    return NextResponse.json({
      title: howToBenefitsFromTestContent?.title || st("about", "benefitsOrgTitle", staticLocale),
      subtitle: st("about", "benefitsOrgSubtitle", staticLocale),
      benefits: benefitsList?.length > 0 ? benefitsList : null
    });
  } catch (error) {
    console.error("Failed to fetch content:", error);
    return NextResponse.json(
      { error: "Failed to fetch how-to-benefit data" },
      { status: 500 }
    );
  }
}
