import { NextResponse } from "next/server";
import { fetchContentWithKey } from "@/app/_lib/content-service";
import { extractFields, extractList } from "@/app/_lib/helper-service";
import { cookies } from "next/headers";

export async function GET() {
  try {
    // Access cookies directly for language detection
    const cookieStore = await cookies();
    const locale = cookieStore.get("lang")?.value || "ar-SA";
    
    console.log("Hamza Academic Test API - Language:", locale);
    
    // Fetch all four content sources simultaneously
    const [
      levelMeasuredContent,
      academicHamzaTestContent,
      testSectionsContent,
      areYoureadyContentData,
    ] = await Promise.all([
      fetchContentWithKey(
        "HAMZA_HOMEPAGE_TYPES_OF_TESTS_HAMZA_ACADEMIC_TEST_LEVELS_MEASURED_BY_HAMZA_ACADEMIC_TEST_CONTENT_KEY"
      ),
      fetchContentWithKey(
        "HAMZA_HOMEPAGE_TYPES_OF_TESTS_HAMZA_ACADEMIC_TEST_HEADER_CONTENT_KEY"
      ),
      fetchContentWithKey(
        "HAMZA_HOMEPAGE_TYPES_OF_TESTS_HAMZA_ACADEMIC_TEST_TEST_SECTIONS_CONTENT_KEY"
      ),
      fetchContentWithKey(
        "HAMZA_HOMEPAGE_TYPES_OF_TESTS_HAMZA_ACADEMIC_TEST_ARE_YOU_READY_FOR_THE_HAMZA_TEST_CONTENT_KEY"
      ),
    ]);

    console.log("Hamza Academic Test - Header:", academicHamzaTestContent?.title);
    console.log("Hamza Academic Test - Levels:", levelMeasuredContent?.title);
    console.log("Hamza Academic Test - Test Sections:", testSectionsContent?.title);
    console.log("Hamza Academic Test - Ready:", areYoureadyContentData?.title);

    // Section 1: Header
    const headerFields = extractFields(
      academicHamzaTestContent?.contentFields,
      ["titleText", "descriptionText", "buttonText"]
    ) as { titleText?: string; descriptionText?: string; buttonText?: string };

    const header = {
      title: headerFields?.titleText || academicHamzaTestContent?.title || "اختبار همزة الأكاديمي",
      titleText: headerFields?.titleText || "اختبار همزة الأكاديمي",
      descriptionText: headerFields?.descriptionText || "",
      buttonText: headerFields?.buttonText || "سجّل الآن",
    };

    // Section 2: Levels Measured
    const levelMeasuredFields = extractFields(
      levelMeasuredContent?.contentFields,
      ["descriptionText", "buttonText", "image"]
    ) as { descriptionText?: string; buttonText?: string; image?: string };

    const levelsMeasured = {
      title: levelMeasuredContent?.title || "المستويات التي يقيسها اختبار همزة الأكاديمي",
      descriptionText: levelMeasuredFields?.descriptionText || "",
      buttonText: levelMeasuredFields?.buttonText || "",
      image: levelMeasuredFields?.image || "",
    };

    // Section 3: Test Sections
    const testSectionsContentFields = extractFields(
      testSectionsContent?.contentFields,
      [
        "titleText",
        "descriptionText",
        "testDurationText",
        "testDurationValueText",
        "numberOfTestItemsText",
        "numberOfTestItemsValueText",
        "availableTestsTitleText",
        "inTestingCentersText",
        "atADistanceText",
      ]
    ) as {
      titleText?: string;
      descriptionText?: string;
      testDurationText?: string;
      testDurationValueText?: string;
      numberOfTestItemsText?: string;
      numberOfTestItemsValueText?: string;
      availableTestsTitleText?: string;
      inTestingCentersText?: string;
      atADistanceText?: string;
    };

    const testSectionsList = extractList(
      testSectionsContent?.contentFields,
      "TestsFieldset",
      {
        testNameText: "testNameText",
        image: "image",
        testDescriptionText: "testDescriptionText",
        sidebarTopText: "sidebarTopText",
        sidebarBottomText1: "sidebarBottomText1",
        sidebarBottomText2: "sidebarBottomText2",
      }
    );

    const testSections = {
      title: testSectionsContentFields?.titleText || testSectionsContent?.title || "أقسام الاختبار",
      descriptionText: testSectionsContentFields?.descriptionText || "",
      testDurationText: testSectionsContentFields?.testDurationText || "مدة الاختبار",
      testDurationValueText: testSectionsContentFields?.testDurationValueText || "",
      numberOfTestItemsText: testSectionsContentFields?.numberOfTestItemsText || "عدد الأسئلة",
      numberOfTestItemsValueText: testSectionsContentFields?.numberOfTestItemsValueText || "",
      availableTestsTitleText: testSectionsContentFields?.availableTestsTitleText || "الاختبارات المتاحة",
      inTestingCentersText: testSectionsContentFields?.inTestingCentersText || "في مراكز الاختبار",
      atADistanceText: testSectionsContentFields?.atADistanceText || "عن بُعد",
      testSectionsList: testSectionsList || [],
    };

    // Section 4: Are You Ready
    const areYoureadyFields = extractFields(
      areYoureadyContentData?.contentFields,
      ["descriptionText", "buttonText", "titleText"]
    ) as { titleText?: string; descriptionText?: string; buttonText?: string };

    const areYouReady = {
      title: areYoureadyFields?.titleText || areYoureadyContentData?.title || "هل أنت مستعد لاختبار همزة؟",
      titleText: areYoureadyFields?.titleText || "هل أنت مستعد لاختبار همزة؟",
      descriptionText: areYoureadyFields?.descriptionText || "",
      buttonText: areYoureadyFields?.buttonText || "سجّل الآن",
    };

    return NextResponse.json({
      header,
      levelsMeasured,
      testSections,
      areYouReady,
      locale,
    });
  } catch (error) {
    console.error("Error fetching hamza academic test content:", error);
    return NextResponse.json(
      {
        header: {
          title: "اختبار همزة الأكاديمي",
          titleText: "اختبار همزة الأكاديمي",
          descriptionText: "",
          buttonText: "سجّل الآن",
        },
        levelsMeasured: {
          title: "المستويات التي يقيسها اختبار همزة الأكاديمي",
          descriptionText: "",
          buttonText: "",
          image: "",
        },
        testSections: {
          title: "أقسام الاختبار",
          descriptionText: "",
          testDurationText: "مدة الاختبار",
          testDurationValueText: "",
          numberOfTestItemsText: "عدد الأسئلة",
          numberOfTestItemsValueText: "",
          availableTestsTitleText: "الاختبارات المتاحة",
          inTestingCentersText: "في مراكز الاختبار",
          atADistanceText: "عن بُعد",
          testSectionsList: [],
        },
        areYouReady: {
          title: "هل أنت مستعد لاختبار همزة؟",
          titleText: "هل أنت مستعد لاختبار همزة؟",
          descriptionText: "",
          buttonText: "سجّل الآن",
        },
      },
      { status: 500 }
    );
  }
}