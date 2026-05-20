import Button from "../../../components/button/Button";
import AcademicTestContent, { AcademicLevelsContent } from "./AcademicTestContent";
import "@/app/components/card/card.css";
import "@/app/styles/Button.css";
import { fetchContentWithKey } from "@/app/_lib/content-service";
import { extractFields, extractList } from "@/app/_lib/helper-service";
import { cookies } from "next/headers";

interface TestSectionItem {
  testNameText: string;
  image: string;
  testDescriptionText: string;
  sidebarTopText: string;
  sidebarBottomText1: string;
  sidebarBottomText2: string;
}

interface AcademicTestData {
  levelsMeasured: {
    title: string;
    descriptionText: string;
    buttonText: string;
    image: string;
  };
  testSections: {
    title: string;
    descriptionText: string;
    testDurationText: string;
    testDurationValueText: string;
    numberOfTestItemsText: string;
    numberOfTestItemsValueText: string;
    availableTestsTitleText: string;
    inTestingCentersText: string;
    atADistanceText: string;
    testSectionsList: TestSectionItem[];
  };
  areYouReady: {
    title: string;
    titleText: string;
    descriptionText: string;
    buttonText: string;
  };
}

async function getAcademicTestData(): Promise<AcademicTestData> {
  try {
    console.log("[AcademicTestPage] Fetching content directly from Liferay...");

    const [
      levelMeasuredContent,
      testSectionsContent,
      areYouReadyContent,
    ] = await Promise.all([
      fetchContentWithKey(
        "HAMZA_HOMEPAGE_TYPES_OF_TESTS_HAMZA_ACADEMIC_TEST_LEVELS_MEASURED_BY_HAMZA_ACADEMIC_TEST_CONTENT_KEY"
      ),
      fetchContentWithKey(
        "HAMZA_HOMEPAGE_TYPES_OF_TESTS_HAMZA_ACADEMIC_TEST_TEST_SECTIONS_CONTENT_KEY"
      ),
      fetchContentWithKey(
        "HAMZA_HOMEPAGE_TYPES_OF_TESTS_HAMZA_ACADEMIC_TEST_ARE_YOU_READY_FOR_THE_HAMZA_TEST_CONTENT_KEY"
      ),
    ]);

    // Section 1: Levels Measured
    const levelMeasuredFields = extractFields(
      levelMeasuredContent?.contentFields,
      ["descriptionText", "buttonText", "image"]
    ) as {
      descriptionText?: string;
      buttonText?: string;
      image?: string;
    };

    const levelsMeasured = {
      title:
        levelMeasuredContent?.title ||
        "المستويات التي يقيسها اختبار همزة الأكاديمي",
      descriptionText: levelMeasuredFields?.descriptionText || "",
      buttonText: levelMeasuredFields?.buttonText || "",
      image: levelMeasuredFields?.image || "/assets/image/acadmic-pic.png",
    };

    // Section 2: Test Sections
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
      title:
        testSectionsContentFields?.titleText ||
        testSectionsContent?.title ||
        "أقسام الاختبار",
      descriptionText: testSectionsContentFields?.descriptionText ||
        "صُمّم اختبار \"همزة\" ليقدّم تقييمًا شاملًا لمستوى الكفاءة اللغوية في اللغة العربية من خلال أربعة أقسام رئيسية:",
      testDurationText: testSectionsContentFields?.testDurationText || "مدة الاختبار",
      testDurationValueText: testSectionsContentFields?.testDurationValueText || "155 دقيقة",
      numberOfTestItemsText:
        testSectionsContentFields?.numberOfTestItemsText || "عدد فقرات الاختبار",
      numberOfTestItemsValueText:
        testSectionsContentFields?.numberOfTestItemsValueText || "75 فقرة",
      availableTestsTitleText:
        testSectionsContentFields?.availableTestsTitleText || "يطبق الاختبار",
      inTestingCentersText:
        testSectionsContentFields?.inTestingCentersText || "في مراكز الاختبار",
      atADistanceText: testSectionsContentFields?.atADistanceText || "عن بُعد",
      testSectionsList: (testSectionsList || []) as TestSectionItem[],
    };

    // Section 3: Are You Ready
    const areYouReadyFields = extractFields(
      areYouReadyContent?.contentFields,
      ["descriptionText", "buttonText", "titleText"]
    ) as {
      titleText?: string;
      descriptionText?: string;
      buttonText?: string;
    };

    const areYouReady = {
      title:
        areYouReadyFields?.titleText ||
        areYouReadyContent?.title ||
        "هل أنت مستعد لاختبار همزة الأكاديمي؟",
      titleText:
        areYouReadyFields?.titleText || "هل أنت مستعد لاختبار همزة الأكاديمي؟",
      descriptionText:
        areYouReadyFields?.descriptionText ||
        "نوفّر برامج إعداد مرنة يمكنك دراستها بالوتيرة التي تناسبك، وبأساليب متنوعة تلائم احتياجاتك.",
      buttonText: areYouReadyFields?.buttonText || "التحضير للاختبار",
    };

    console.log("[AcademicTestPage] SUCCESS — using Liferay data");

    return { levelsMeasured, testSections, areYouReady };
  } catch (error) {
    console.error("[AcademicTestPage] FAILED —", error);
    console.log("[AcademicTestPage] Using FALLBACK static data");

    return {
      levelsMeasured: {
        title: "المستويات التي يقيسها اختبار همزة الأكاديمي",
        descriptionText: "وفق الإطار الأوروبي المرجعي المشترك للغات",
        buttonText: "",
        image: "/assets/image/acadmic-pic.png",
      },
      testSections: {
        title: "أقسام الاختبار",
        descriptionText:
          'صُمّم اختبار "همزة" ليقدّم تقييمًا شاملًا لمستوى الكفاءة اللغوية في اللغة العربية من خلال أربعة أقسام رئيسية:',
        testDurationText: "مدة الاختبار",
        testDurationValueText: "155",
        numberOfTestItemsText: "عدد فقرات الاختبار",
        numberOfTestItemsValueText: "75 فقرة",
        availableTestsTitleText: "يطبق الاختبار",
        inTestingCentersText: "في مراكز الاختبار",
        atADistanceText: "عن بُعد",
        testSectionsList: [],
      },
      areYouReady: {
        title: "هل أنت مستعد لاختبار همزة الأكاديمي؟",
        titleText: "هل أنت مستعد لاختبار همزة الأكاديمي؟",
        descriptionText:
          "نوفّر برامج إعداد مرنة يمكنك دراستها بالوتيرة التي تناسبك، وبأساليب متنوعة تلائم احتياجاتك.",
        buttonText: "التحضير للاختبار",
      },
    };
  }
}

export default async function HamzaAcademicTestPage() {
  const cookieStore = await cookies();
  const locale = cookieStore.get("lang")?.value || "ar-SA";
  const staticLocale = locale === "en-US" ? "en" : "ar";

  const data = await getAcademicTestData();

  return (
    <>
      {/* Section 1: Language Proficiency Levels */}
      <section className="bg-[#F3FCF6]" aria-labelledby="levels-title">
        <div className="content !py-[40px] xl:!py-0">
          <AcademicLevelsContent
            title={data.levelsMeasured.title}
            subtitle={data.levelsMeasured.descriptionText}
            image={data.levelsMeasured.image}
          />
        </div>
      </section>

      {/* Section 2: Test Information and Sections */}
      <section
        className="bg-color-grey-50 cta-bg-logo"
        aria-labelledby="test-sections-title"
      >
        <div className="content !py-[40px] xl:!py-[128px] flex flex-col gap-[24px] md:gap-[32px]">
          <AcademicTestContent testSections={data.testSections} locale={staticLocale} />
        </div>
      </section>

      {/* Section 3: Call to Action */}
      <section
        className="content gap-[32px] !py-[40px]"
        aria-labelledby="cta-title"
      >
        <div className="flex flex-col gap-[24px] bg-[#074D31] rounded-[16px] md:rounded-[24px] px-[24px] md:px-[80px] custom-container section-spacing-5xl cta-bg-pattern">
          <div className="flex flex-col md:flex-row items-center gap-[32px] text-center md:text-start">
            <div className="flex flex-col gap-4">
              <h2 id="cta-title" className="display-sm-bold !text-white">
                {data.areYouReady.titleText}
              </h2>
              <p className="text-md-regular !text-white md:text-start text-center max-w-[500px]">
                {data.areYouReady.descriptionText}
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 w-full md:w-auto">
            <Button
              label={data.areYouReady.buttonText}
              variant="primary-neutral--on-color"
              size="lg"
              icon="arrow-up-right-01"
              className="w-full md:w-auto"
            />
          </div>
        </div>
      </section>
    </>
  );
}
