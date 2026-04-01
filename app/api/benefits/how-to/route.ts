import { NextResponse } from 'next/server';
import { fetchContentWithKey } from '@/app/_lib/content-service';
import { extractList } from '@/app/_lib/helper-service';

export async function GET() {
  try {
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
      title: howToBenefitsFromTestContent?.title || "فوائد اختبارات همزة للجهات",
      subtitle: "كيفية الاستفادة من همزة",
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
