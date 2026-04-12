import { NextResponse } from "next/server";
import { fetchContentWithKey } from "@/app/_lib/content-service";
import { extractFields, extractList } from "@/app/_lib/helper-service";

export async function GET() {
  try {
    // Fetch all 4 content keys in parallel
    const [headerContent, pillarsContent, resultsContent, valuesContent] =
      await Promise.all([
        fetchContentWithKey(
          "HAMZA_HOMEPAGE_WHO_WE_ARE_HEADER_CONTENT_KEY"
        ),
        fetchContentWithKey(
          "HAMZA_HOMEPAGE_WHO_WE_ARE_PILLARS_OF_HAMZA_CONTENT_KEY"
        ),
        fetchContentWithKey(
          "HAMZA_HOMEPAGE_WHO_WE_ARE_RESULT_SECTION_CONTENT_KEY"
        ),
        fetchContentWithKey(
          "HAMZA_HOMEPAGE_WHO_WE_ARE_VALUES_SECTION_CONTENT_KEY"
        ),
      ]);

    // Hero: title from top-level .title, description from contentFields
    const heroTitle = headerContent?.title || "من نحن";
    const headerFields = extractFields(
      headerContent?.contentFields,
      ["descriptionText"]
    ) as { descriptionText?: string };
    const heroDescription = headerFields?.descriptionText || "";

    // Results Section: Fieldset1 + Fieldset2
    const resultsList1 = extractList(resultsContent?.contentFields, "Fieldset1", {
      titleText: "title",
      iconImage: "icon",
      description: "description",
      buttonText: "buttonText",
    });
    const resultsList2 = extractList(resultsContent?.contentFields, "Fieldset2", {
      titleText2: "title",
      iconImage2: "icon",
      description2: "description",
      buttonText2: "buttonText",
    });

    // Values Section
    const valuesFields = extractFields(valuesContent?.contentFields, [
      "titleText",
    ]) as { titleText?: string };
    const valuesList = extractList(
      valuesContent?.contentFields,
      "valuesFieldsSet",
      {
        valueNumber: "number",
        valueTitle: "title",
        valueDescription: "description",
      }
    );

    // Pillars Section
    const pillarsFields = extractFields(pillarsContent?.contentFields, [
      "titleText",
      "descriptionText",
    ]) as { titleText?: string; descriptionText?: string };
    const pillarsList = extractList(
      pillarsContent?.contentFields,
      "whyHamzaTestFieldset",
      {
        pointNumberText: "number",
        pointDescriptionText: "description",
      }
    );

    return NextResponse.json({
      hero: {
        title: heroTitle,
        description: heroDescription,
        bgColor: "#FFF",
        breadcrumbs: [
          { label: "الرئيسة", path: "/" },
          { label: "عن الجهة", disabled: true },
          { label: "عن همزة", path: "/about" },
          { label: heroTitle, path: "/about/who-we-are", disabled: true },
        ],
      },
      results: {
        list1: resultsList1 || [],
        list2: resultsList2 || [],
      },
      values: {
        title: valuesFields?.titleText || valuesContent?.title || "القيم",
        list: valuesList || [],
      },
      pillars: {
        title: pillarsFields?.titleText || pillarsContent?.title || "لماذا اختبار همزة؟",
        description: pillarsFields?.descriptionText || "",
        list: pillarsList || [],
      },
    });
  } catch (error) {
    console.error("Error fetching who-we-are content:", error);

    // Fallback static data
    return NextResponse.json(
      {
        hero: {
          title: "من نحن",
          description:
            "منصة اختبارات همزة هي إحدى الأدوات التقنية الداعمة لمبادرة مجمع الملك سلمان العالمي للغة العربية في بناء الاختبارات المعيارية للغة العربية وتفعيلها.",
          bgColor: "#FFF",
          breadcrumbs: [
            { label: "الرئيسة", path: "/" },
            { label: "عن الجهة", disabled: true },
            { label: "عن همزة", path: "/about" },
            {
              label: "من نحن",
              path: "/about/who-we-are",
              disabled: true,
            },
          ],
        },
        results: { list1: [], list2: [] },
        values: {
          title: "القيم",
          list: [
            { number: "01", title: "الموثوقية", description: "تقديم نتائج دقيقة وثابتة تضمن صحتها ودوامها" },
            { number: "02", title: "الموضوعية", description: "ضمان الحياد التام وخلو التقييم من أي تحيز" },
            { number: "03", title: "الجودة", description: "الالتزام بالمعايير الدولية وأفضل الممارسات في القياس" },
            { number: "04", title: "الابتكار", description: "تطوير مستمر ونتبع أحدث التقنيات في الاختبارات" },
            { number: "05", title: "العالمية", description: "اعتراف واعتماد دولي يعزز مكانة اللغة العربية عالميًا" },
          ],
        },
        pillars: {
          title: "لماذا اختبار همزة؟",
          description: "يتميز اختبار همزة بمجموعة من الخصائص",
          list: [
            { number: "01", description: "معايير دولية معتمدة في قياس اللغة العربية" },
            { number: "02", description: "نتائج موثوقة ودقيقة تعكس المستوى الحقيقي للمتقدم" },
            { number: "03", description: "اختبارات متعددة تناسب مختلف الأغراض والمستويات" },
          ],
        },
      },
      { status: 500 }
    );
  }
}