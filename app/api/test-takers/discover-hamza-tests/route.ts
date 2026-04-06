import { NextResponse } from "next/server";
import { fetchContentWithKey } from "@/app/_lib/content-service";
import { extractFields, extractList } from "@/app/_lib/helper-service";
import { cookies } from "next/headers";

export async function GET() {
  try {
    // Access cookies directly for language detection
    const cookieStore = await cookies();
    const locale = cookieStore.get("lang")?.value || "ar-SA";
    
    console.log("Test Takers Discover Hamza Tests API - Language:", locale);
    
    // Fetch both content sources simultaneously
    const [
      typeOfTestsContent,
      areYoureadyContentData,
    ] = await Promise.all([
      fetchContentWithKey("TEST_TAKERS_TYPE_OF_TESTS_CONTENT_KEY"),
      fetchContentWithKey(
        "TEST_TAKERS_ARE_YOU_READY_FOR_THE_HAMZA_TEST_CONTENT_KEY"
      ),
    ]);

    console.log("Test Takers - Type of Tests:", typeOfTestsContent?.title);
    console.log("Test Takers - Are You Ready:", areYoureadyContentData?.title);

    // Section 1: Type of Tests
    const typeOfTestsContentFields = extractFields(
      typeOfTestsContent?.contentFields,
      ["titleText"]
    ) as { titleText?: string };

    // Extract the test types list - 5 fields per item
    const typeOfTestsList = extractList(
      typeOfTestsContent?.contentFields,
      "typeOfTestsFieldset",
      {
        testNumber: "testNumber",
        testName: "testName",
        testDescriptionText: "testDescriptionText",
        image: "image",
        navigationLinkText: "navigationLinkText",
      }
    );

    // Transform to match the component interface
    const tabsContent = typeOfTestsList?.map((item: any, index: number) => ({
      title_icon: getIconForTestIndex(index),
      header: item.testName,
      description: item.testDescriptionText,
      link: item.navigationLinkText,
      image: item.image,
    })) || [];

    const typeOfTests = {
      title: typeOfTestsContentFields?.titleText || typeOfTestsContent?.title || "أنواع الاختبارات",
      tabsContent: tabsContent,
    };

    // Section 2: Are You Ready
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
      typeOfTests,
      areYouReady,
      locale,
    });
  } catch (error) {
    console.error("Error fetching test takers discover hamza tests content:", error);
    return NextResponse.json(
      {
        typeOfTests: {
          title: "أنواع الاختبارات",
          tabsContent: [],
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

/**
 * Maps test index to icon name
 * Based on the original static data:
 * - Index 0: mortarboard-02 (academic)
 * - Index 1: glasses (general)
 * - Index 2: star (placement)
 * - Index 3: book-02 (vocabulary)
 */
function getIconForTestIndex(index: number): string {
  const iconMap: Record<number, string> = {
    0: "mortarboard-02",
    1: "glasses",
    2: "star",
    3: "book-02",
  };
  
  return iconMap[index] || "mortarboard-02"; // Default to academic icon
}