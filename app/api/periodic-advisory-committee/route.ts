import { NextResponse } from 'next/server';
import { fetchContentWithKey } from '@/app/_lib/content-service';
import { extractFields } from '@/app/_lib/helper-service';

export async function GET() {
  try {
    // Fetch data from backend using the content key mentioned in the documentation
    const periodicAdvisoryCommitteeContent = await fetchContentWithKey(
      "HAMZA_HOMEPAGE_WHO_WE_ARE_PERIODIC_ADVISORY_COMMITTEE_CONTENT_KEY"
    );

    // Extract fields using helper functions
    const contentFields = extractFields(
      periodicAdvisoryCommitteeContent?.contentFields,
      ["titleText", "descriptionText", "viewAllButtonText"]
    );

    // Return the processed data
    return NextResponse.json({
      title: periodicAdvisoryCommitteeContent?.title || "اللجنة الاستشارية الدولية",
      descriptionText: (contentFields as { descriptionText?: string })?.descriptionText || 
        "تهدف اللجنة استشارية إلى الاستفادة بتقديم الاستشارات ورفع التوصيات والأنشطة المتعلقة بتطوير أدوات القياس والمعايير المعتمدة، بما يُسهم في استدامة التحسين والتطوير في التوجهات المستقبلية في هذا المجال، لتبني أفضل الممارسات الدورية في قياس مهارات اللغة العربية.",
      viewAllButtonText: (contentFields as { viewAllButtonText?: string })?.viewAllButtonText || "عرض الكل"
    });
  } catch (error) {
    console.error("Failed to fetch periodic advisory committee content:", error);
    return NextResponse.json(
      { error: "Failed to fetch periodic advisory committee data" },
      { status: 500 }
    );
  }
}