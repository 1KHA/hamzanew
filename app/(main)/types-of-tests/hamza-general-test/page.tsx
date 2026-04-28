import { Metadata } from "next";
import Button from "../../../components/button/Button";
import GeneralTestContent from "./GeneralTestContent";
import "@/app/components/card/card.css";
import "@/app/styles/Button.css";
import { fetchContentWithKey } from "@/app/_lib/content-service";
import { extractFields, extractList } from "@/app/_lib/helper-service";

export const metadata: Metadata = {
  title: "اختبار همزة العام",
  description:
    "تعرّف على أقسام اختبار همزة العام وسجّل الآن للتحضير للاختبار.",
};

async function getHamzaGeneralTestData() {
  try {
    console.log("[GeneralTestPage] Fetching content directly from Liferay...");

    const [headerContent, testSectionsContent, areYouReadyContent] =
      await Promise.all([
        fetchContentWithKey(
          "HAMZA_HOMEPAGE_TYPES_OF_TESTS_HAMZA_GENERAL_TEST_HEADER_CONTENT_KEY"
        ),
        fetchContentWithKey(
          "HAMZA_HOMEPAGE_TYPES_OF_TESTS_HAMZA_GENERAL_TEST_TEST_SECTIONS_CONTENT_KEY"
        ),
        fetchContentWithKey(
          "HAMZA_HOMEPAGE_TYPES_OF_TESTS_HAMZA_GENERAL_TEST_ARE_YOU_READY_FOR_THE_HAMZA_TEST_CONTENT_KEY"
        ),
      ]);

    // Section 1: Header
    const headerFields = extractFields(headerContent?.contentFields, [
      "titleText",
      "descriptionText",
      "buttonText",
    ]) as {
      titleText?: string;
      descriptionText?: string;
      buttonText?: string;
    };

    const header = {
      title: headerFields?.titleText || headerContent?.title || "اختبار همزة العام",
      titleText: headerFields?.titleText || "اختبار همزة العام",
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
      title:
        testSectionsContentFields?.titleText ||
        testSectionsContent?.title ||
        "أقسام الاختبار",
      descriptionText: testSectionsContentFields?.descriptionText || "",
      testSectionsList: testSectionsList || [],
    };

    // Section 3: Are You Ready
    const areYouReadyFields = extractFields(areYouReadyContent?.contentFields, [
      "descriptionText",
      "buttonText",
      "titleText",
    ]) as {
      titleText?: string;
      descriptionText?: string;
      buttonText?: string;
    };

    const areYouReady = {
      title:
        areYouReadyFields?.titleText ||
        areYouReadyContent?.title ||
        "هل أنت مستعد لاختبار همزة؟",
      titleText: areYouReadyFields?.titleText || "هل أنت مستعد لاختبار همزة؟",
      descriptionText: areYouReadyFields?.descriptionText || "",
      buttonText: areYouReadyFields?.buttonText || "التحضير للاختبار",
    };

    console.log("[GeneralTestPage] SUCCESS — using Liferay data");

    return { header, testSections, areYouReady };
  } catch (error) {
    console.error("[GeneralTestPage] FAILED —", error);
    console.log("[GeneralTestPage] Using FALLBACK static data");

    return {
      header: {
        title: "اختبار همزة العام",
        titleText: "اختبار همزة العام",
        descriptionText: "",
        buttonText: "سجّل الآن",
      },
      testSections: {
        title: "أقسام الاختبار",
        descriptionText: "",
        testSectionsList: [],
      },
      areYouReady: {
        title: "هل أنت مستعد لاختبار همزة العام؟",
        titleText: "هل أنت مستعد لاختبار همزة العام؟",
        descriptionText:
          "نوفّر برامج إعداد مرنة يمكنك دراستها بالوتيرة التي تناسبك، وبأساليب متنوعة تلائم احتياجاتك. عزّز تجربتك وجهودك الدراسية، واستعد ليوم الاختبار بثقة واطمئنان.",
        buttonText: "التحضير للاختبار",
      },
    };
  }
}

export default async function HamzaGeneralTestPage() {
  const data = await getHamzaGeneralTestData();

  return (
    <>
      {/* Section 1: Test Information and Sections */}
      <section
        className="bg-color-grey-50 cta-bg-logo"
        aria-labelledby="test-sections-title"
      >
        <div className="content !py-[40px] xl:!py-[128px] flex flex-col gap-[24px] md:gap-[32px]">
          <GeneralTestContent
            header={data.header}
            testSections={data.testSections}
          />
        </div>
      </section>

      {/* Section 2: Call to Action */}
      <section
        className="content gap-[32px] !py-[40px]"
        aria-labelledby="cta-title"
      >
        <div className="flex flex-col gap-[24px] bg-[#074D31] rounded-[16px] md:rounded-[24px] px-[24px] md:px-[80px] custom-container section-spacing-5xl cta-bg-pattern">
          <div className="flex flex-col md:flex-row items-center gap-[32px] text-center md:text-start">
            <div className="flex flex-col gap-4">
              <h2 id="cta-title" className="display-sm-bold !text-white">
                {data.areYouReady?.titleText || "هل أنت مستعد لاختبار همزة العام؟"}
              </h2>
              <p className="text-md-regular !text-white md:text-start text-center max-w-[500px]">
                {data.areYouReady?.descriptionText ||
                  "نوفّر برامج إعداد مرنة يمكنك دراستها بالوتيرة التي تناسبك، وبأساليب متنوعة تلائم احتياجاتك. عزّز تجربتك وجهودك الدراسية، واستعد ليوم الاختبار بثقة واطمئنان."}
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 w-full md:w-auto">
            <Button
              label={data.areYouReady?.buttonText || "التحضير للاختبار"}
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
