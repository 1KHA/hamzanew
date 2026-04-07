import { NextResponse } from "next/server";
import { fetchContentWithKey } from "@/app/_lib/content-service";
import { extractFields, extractList } from "@/app/_lib/helper-service";
import { cookies } from "next/headers";

export async function GET() {
  try {
    // Access cookies directly for language detection
    const cookieStore = await cookies();
    const locale = cookieStore.get("lang")?.value || "ar-SA";
    
    console.log("Preparation Resource API - Language:", locale);
    
    // Fetch both content sources simultaneously
    const [
      headerContent,
      detailsContent,
    ] = await Promise.all([
      fetchContentWithKey("TEST_TAKERS_PREPARATION_SOURCES_TEST_PREPARATION_HEADER_CONTENT_KEY"),
      fetchContentWithKey(
        "TEST_TAKERS_PREPARATION_SOURCES_TEST_PREPARATION_DETAILS_CONTENT_KEY"
      ),
    ]);

    console.log("Preparation Resource - Header:", headerContent?.title);
    console.log("Preparation Resource - Details:", detailsContent?.title);

    // Section 1: Header content
    const headerFields = extractFields(
      headerContent?.contentFields,
      ["titleText", "descriptionText"]
    ) as { titleText?: string; descriptionText?: string };

    // Section 2: Details content
    const detailsTitle = detailsContent?.title || "نقدم لك";
    const detailsFields = extractFields(
      detailsContent?.contentFields,
      ["topDescriptionText", "descriptionText"]
    ) as { topDescriptionText?: string; descriptionText?: string };

    // Extract the resources/offer list
    const resourcesList = extractList(
      detailsContent?.contentFields,
      "offerListFieldSet",
      {
        offeringTitleText: "offeringTitleText",
        offeringDescriptionText: "offeringDescriptionText",
        imageText: "imageText",
      }
    );

    // Map to match component interface
    const resources = (resourcesList || []).map((item: any, index: number) => ({
      title: item.offeringTitleText || "",
      description: item.offeringDescriptionText || "",
      icon: getIconForResourceIndex(index),
      image: item.imageText || "",
    }));

    return NextResponse.json({
      header: {
        title: headerFields?.titleText || headerContent?.title || "مصادر التحضير",
        description: headerFields?.descriptionText || "",
      },
      details: {
        title: detailsTitle,
        topDescription: detailsFields?.topDescriptionText || "",
        description: detailsFields?.descriptionText || "",
        resources: resources,
      },
      locale,
    });
  } catch (error) {
    console.error("Error fetching preparation resource content:", error);
    return NextResponse.json(
      {
        header: {
          title: "مصادر التحضير",
          description: "",
        },
        details: {
          title: "نقدم لك",
          topDescription: "تمنحك مـــواردنـا التعليميـــة فرصـــة للاطـــلاع على أسئلة وأجوبة واقعية تساعدك على فهم طبيعة الاختبار وتوقّع أسلوبه.",
          description: "",
          resources: [
            {
              title: "مران",
              description: "تتيح لك فرصة التعلّم الذاتي في أي وقت ومن أي مكان، مما يساعدك على البقاء على تواصل مستمر مع مواد التدريب.",
              icon: "file-star",
              image: "",
            },
            {
              title: "الية الاختبار",
              description: "خيارات مرنة لأداء اختبار همزة",
              icon: "edit-01",
              image: "",
            },
            {
              title: "الارشادات ليوم الاختبار",
              description: "تحتوي على ارشادات عملية ونصائح متخصـــصة تساعـــدك في يوم الاختبار بفاعليــة وثقـــة",
              icon: "book-open-02",
              image: "",
            },
          ],
        },
      },
      { status: 500 }
    );
  }
}

/**
 * Maps resource index to icon name
 * Based on the original static data:
 * - Index 0: file-star (مران)
 * - Index 1: edit-01 (الية الاختبار)
 * - Index 2: book-open-02 (الارشادات ليوم الاختبار)
 */
function getIconForResourceIndex(index: number): string {
  const iconMap: Record<number, string> = {
    0: "file-star",
    1: "edit-01",
    2: "book-open-02",
  };
  
  return iconMap[index] || "file-star"; // Default to first icon
}