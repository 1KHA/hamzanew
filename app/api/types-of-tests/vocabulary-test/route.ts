import { NextResponse } from "next/server";
import { fetchContentWithKey } from "@/app/_lib/content-service";
import { extractFields, extractList } from "@/app/_lib/helper-service";
import { cookies } from "next/headers";

export async function GET() {
  try {
    // Access cookies directly for language detection
    const cookieStore = await cookies();
    const locale = cookieStore.get("lang")?.value || "ar-SA";
    
    console.log("Hamza Vocabulary Test API - Language:", locale);
    
    // Fetch all three content sources simultaneously
    const [
      headerContent,
      testSectionsContent,
      areYoureadyContentData,
    ] = await Promise.all([
      fetchContentWithKey(
        "HAMZA_HOMEPAGE_TYPES_OF_TESTS_HAMZA_VOCABULARY_TEST_HEADER_CONTENT_KEY"
      ),
      fetchContentWithKey(
        "HAMZA_HOMEPAGE_TYPES_OF_TESTS_HAMZA_VOCABULARY_TEST_TEST_SECTIONS_CONTENT_KEY"
      ),
      fetchContentWithKey(
        "HAMZA_HOMEPAGE_TYPES_OF_TESTS_HAMZA_VOCABULARY_TEST_ARE_YOU_READY_FOR_THE_HAMZA_TEST_CONTENT_KEY"
      ),
    ]);

    console.log("Hamza Vocabulary Test - Header:", headerContent?.title);
    console.log("Hamza Vocabulary Test - Test Sections:", testSectionsContent?.title);
    console.log("Hamza Vocabulary Test - Ready:", areYoureadyContentData?.title);

    // Section 1: Header
    const headerFields = extractFields(
      headerContent?.contentFields,
      ["titleText", "descriptionText", "buttonText"]
    ) as { titleText?: string; descriptionText?: string; buttonText?: string };

    const header = {
      title: headerFields?.titleText || headerContent?.title || "اختبار همزة المفردات",
      titleText: headerFields?.titleText || "اختبار همزة المفردات",
      descriptionText: headerFields?.descriptionText || "",
      buttonText: headerFields?.buttonText || "سجّل الآن",
    };

    // Section 2: Test Sections - Using FieldsetTestDetails (unique for vocabulary test)
    const testSectionsContentFields = extractFields(
      testSectionsContent?.contentFields,
      ["titleText", "descriptionText"]
    ) as {
      titleText?: string;
      descriptionText?: string;
    };

    // Extract the test details list - only 2 fields per item (unlike other tests which have 3)
    const testSectionsList = extractList(
      testSectionsContent?.contentFields,
      "FieldsetTestDetails",
      {
        testTitleText: "testTitleText",
        testDetailsText: "testDetailsText",
      }
    );

    const testSections = {
      title: testSectionsContentFields?.titleText || testSectionsContent?.title || "أقسام الاختبار",
      descriptionText: testSectionsContentFields?.descriptionText || "",
      testSectionsList: testSectionsList || [],
    };

    // Section 3: Are You Ready
    const areYoureadyFields = extractFields(
      areYoureadyContentData?.contentFields,
      ["descriptionText", "buttonText", "titleText"]
    ) as { titleText?: string; descriptionText?: string; buttonText?: string };

    const areYouReady = {
      title: areYoureadyFields?.titleText || areYoureadyContentData?.title || "هل أنت مستعد لاختبار همزة؟",
      titleText: areYoureadyFields?.titleText || "هل أنت مستعد لاختبار همزة؟",
      descriptionText: areYoureadyFields?.descriptionText || "",
      buttonText: areYoureadyFields?.buttonText || "التحضير للاختبار",
    };

    return NextResponse.json({
      header,
      testSections,
      areYouReady,
      locale,
    });
  } catch (error) {
    console.error("Error fetching hamza vocabulary test content:", error);
    return NextResponse.json(
      {
        header: {
          title: "اختبار همزة المفردات",
          titleText: "اختبار همزة المفردات",
          descriptionText: "",
          buttonText: "سجّل الآن",
        },
        testSections: {
          title: "أقسام الاختبار",
          descriptionText: "",
          testSectionsList: [],
        },
        areYouReady: {
          title: "هل أنت مستعد لاختبار همزة؟",
          titleText: "هل أنت مستعد لاختبار همزة؟",
          descriptionText: "",
          buttonText: "التحضير للاختبار",
        },
      },
      { status: 500 }
    );
  }
}