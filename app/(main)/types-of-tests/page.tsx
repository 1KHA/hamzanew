import { Metadata } from "next";
import { fetchContentWithKey } from "@/app/_lib/content-service";
import { extractFields, extractListWithSubListOriginalKeys } from "@/app/_lib/helper-service";
import TypesOfTestsContent from "./TypesOfTestsContent";
import "@/app/components/card/card.css";
import "@/app/styles/Button.css";
import "./types-of-tests.css";

export const metadata: Metadata = {
  title: "أنواع اختبارات همزة",
  description:
    "قارن بين اختبارات همزة واختر الاختبار المناسب لك. تعرّف على تفاصيل كل اختبار وسجّل الآن.",
};

async function getTypesOfTestsData() {
  try {
    const content = await fetchContentWithKey(
      "HAMZA_HOMEPAGE_TYPES_OF_TESTS_COMPARE_HAMZA_TESTS_CONTENT_KEY"
    );

    // Extract simple fields
    const fields = extractFields(
      content?.contentFields,
      ["titleText", "descriptionText", "bookATestText"]
    );

    // Extract nested list with sub-lists
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

    return {
      title: fields?.titleText || content?.title || "قارن بين اختبارات همزة",
      descriptionText: fields?.descriptionText || "",
      bookATestText: fields?.bookATestText || "حجز اختبار",
      testQuestionsSetList: testQuestionsSetList || [],
    };
  } catch (error) {
    console.error("Error fetching types of tests data:", error);
    return {
      title: "قارن بين اختبارات همزة",
      descriptionText: "",
      bookATestText: "حجز اختبار",
      testQuestionsSetList: [],
    };
  }
}

export default async function TypesOfTestsPage() {
  const data = await getTypesOfTestsData();

  return (
    <section className="bg-color-grey-50" aria-labelledby="comparison-title">
      <div className="content !py-[40px] md:!py-[80px] flex flex-col gap-[24px] md:gap-[32px]">
        <TypesOfTestsContent data={data} />
      </div>
    </section>
  );
}