import { NextResponse } from "next/server";
import { fetchContentWithKey } from "@/app/_lib/content-service";
import { extractFields, extractListWithSubListOriginalKeys } from "@/app/_lib/helper-service";
import { cookies } from "next/headers";

export async function GET() {
  try {
    // Access cookies directly for language detection
    const cookieStore = await cookies();
    const locale = cookieStore.get("lang")?.value || "ar-SA";
    
    console.log("Types of Tests API - Language:", locale);
    
    const content = await fetchContentWithKey(
      "HAMZA_HOMEPAGE_TYPES_OF_TESTS_COMPARE_HAMZA_TESTS_CONTENT_KEY"
    );

    console.log("Types of Tests Content - Title:", content?.title);

    // Extract simple fields
    const fields = extractFields(
      content?.contentFields,
      ["titleText", "descriptionText", "bookATestText"]
    ) as { titleText?: string; descriptionText?: string; bookATestText?: string };

    // Use titleText (the custom localized field) as the primary title
    const title = fields?.titleText || content?.title || "أنواع الاختبارات";

    // Extract nested list with sub-lists (sectionFieldset containing setOfTestsFieldSet)
    // The function keeps original field names from the nested fields
    const testQuestionsSetList = extractListWithSubListOriginalKeys(
      content?.contentFields,
      "sectionFieldset",
      {
        sectionTitleText: "sectionTitleText",
        sectionDescriptionText: "sectionDescriptionText",
        targetGroupText: "targetGroupText",
        targetGroupDescription: "targetGroupDescription",
        testQuestionsTitleText: "testQuestionsTitleText",
        testQuestionsDescriptionText: "testQuestionsDescriptionText",
        testDurationTitleText: "testDurationTitleText",
        totalText: "totalText",
        testDurationText: "testDurationText",
        testTotalDurationText: "testTotalDurationText",
        AFatefulTestText: "AFatefulTestText",
      },
      "setOfTestsFieldSet"
    );

    return NextResponse.json({
      title: title,
      titleText: fields?.titleText || "أنواع الاختبارات",
      descriptionText: fields?.descriptionText || "",
      bookATestText: fields?.bookATestText || "احجز اختبارًا",
      testQuestionsSetList: testQuestionsSetList || [],
      locale: locale,
    });
  } catch (error) {
    console.error("Error fetching types of tests content:", error);
    return NextResponse.json(
      {
        title: "أنواع الاختبارات",
        titleText: "أنواع الاختبارات",
        descriptionText: "",
        bookATestText: "احجز اختبارًا",
        testQuestionsSetList: [],
      },
      { status: 500 }
    );
  }
}