import { NextResponse } from 'next/server';
import { fetchContentWithKey } from '@/app/_lib/content-service';
import { extractFields, extractList } from '@/app/_lib/helper-service';

export async function GET() {
  try {
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
      title: benefitsContentData?.title || "فوائد اختبارات همزة للمختبرين",
      description: (benefitsContentDataContentFields as { descriptionText?: string })?.descriptionText || 
        "توفّر اختبارات همزة نهجاً معيارياً وموثوقاً لقياس الكفاءة في اللغة العربية، ويستخدمها أفراد يسعون إلى الدراسة أو العمل أو الهجرة إلى دول ناطقة بالعربية. تدعم هذه الاختبارات المؤسسات في اختيار الطلاب الأنسب، وبناء كوادر قادرة على التواصل بفاعلية في بيئات العمل والتعليم، واستقطاب الكفاءات إلى جهتك.",
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
