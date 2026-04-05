import { NextResponse } from "next/server";
import { fetchContentWithKey } from "@/app/_lib/content-service";
import { extractFields, extractList } from "@/app/_lib/helper-service";
import { cookies } from "next/headers";

export async function GET() {
  try {
    // Access cookies directly for language detection
    const cookieStore = await cookies();
    const locale = cookieStore.get("lang")?.value || "ar-SA";
    
    console.log("Hamza Placement Test API - Language:", locale);
    
    // Fetch all three content sources simultaneously
    const [
      headerContent,
      testSectionsContent,
      areYoureadyContentData,
    ] = await Promise.all([
      fetchContentWithKey(
        "HAMZA_HOMEPAGE_TYPES_OF_TESTS_HAMZA_PLACEMENT_TEST_HEADER_CONTENT_KEY"
      ),
      fetchContentWithKey(
        "HAMZA_HOMEPAGE_TYPES_OF_TESTS_HAMZA_PLACEMENT_TEST_TEST_SECTIONS_CONTENT_KEY"
      ),
      fetchContentWithKey(
        "HAMZA_HOMEPAGE_TYPES_OF_TESTS_HAMZA_PLACEMENT_TEST_ARE_YOU_READY_FOR_THE_HAMZA_TEST_CONTENT_KEY"
      ),
    ]);

    console.log("Hamza Placement Test - Header:", headerContent?.title);
    console.log("Hamza Placement Test - Test Sections:", testSectionsContent?.title);
    console.log("Hamza Placement Test - Ready:", areYoureadyContentData?.title);

    // Section 1: Header
    const headerFields = extractFields(
      headerContent?.contentFields,
      ["titleText", "descriptionText", "buttonText"]
    ) as { titleText?: string; descriptionText?: string; buttonText?: string };

    const header = {
      title: headerFields?.titleText || headerContent?.title || "اختبار همزة لتحديد المستوى",
      titleText: headerFields?.titleText || "اختبار همزة لتحديد المستوى",
      descriptionText: headerFields?.descriptionText || "",
      buttonText: headerFields?.buttonText || "سجّل الآن",
    };

    // Section 2: Test Sections
    const testSectionsContentFields = extractFields(
      testSectionsContent?.contentFields,
      ["titleText", "descriptionText"]
    ) as {
      titleText?: string;
      descriptionText?: string;
    };

    // Extract the test sections list - only 3 fields per item (unlike academic which has 6)
    const testSectionsList = extractList(
      testSectionsContent?.contentFields,
      "TestsFieldset",
      {
        testNameText: "testNameText",
        image: "image",
        testDescriptionText: "testDescriptionText",
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
    console.error("Error fetching hamza placement test content:", error);
    return NextResponse.json(
      {
        header: {
          title: "اختبار همزة لتحديد المستوى",
          titleText: "اختبار همزة لتحديد المستوى",
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