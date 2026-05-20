import type { Metadata } from "next";
import { cookies } from "next/headers";
import { fetchContentWithKey } from "@/app/_lib/content-service";
import { extractFields, extractListWithSubListOriginalKeys } from "@/app/_lib/helper-service";
import { st } from "@/app/_lib/static-text-server";
import TypesOfTestsContent from "./TypesOfTestsContent";
import "@/app/components/card/card.css";
import "@/app/styles/Button.css";
import "./types-of-tests.css";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = cookieStore.get("lang")?.value.startsWith("en") ? "en" : "ar";
  return {
    title: st("typesOfTests", "pageTitleFallback", locale),
    description:
      locale === "en"
        ? "Compare Hamza tests and choose the right one for you. Learn details about each test and register now."
        : "قارن بين اختبارات همزة واختر الاختبار المناسب لك. تعرّف على تفاصيل كل اختبار وسجّل الآن.",
  };
}

async function getTypesOfTestsData() {
  try {
    const content = await fetchContentWithKey(
      "HAMZA_HOMEPAGE_TYPES_OF_TESTS_COMPARE_HAMZA_TESTS_CONTENT_KEY"
    );

    // Extract simple fields
    const fields = extractFields(
      content?.contentFields,
      ["titleText", "descriptionText", "bookATestText"]
    ) as { titleText?: string; descriptionText?: string; bookATestText?: string } | undefined;

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
  const cookieStore = await cookies();
  const locale = cookieStore.get("lang")?.value.startsWith("en") ? "en" : "ar";

  const data = await getTypesOfTestsData();

  return (
    <section className="bg-color-grey-50" aria-labelledby="comparison-title">
      <div className="content !py-[40px] md:!py-[80px] flex flex-col gap-[24px] md:gap-[32px]">
        <TypesOfTestsContent data={data} locale={locale} />
      </div>
    </section>
  );
}