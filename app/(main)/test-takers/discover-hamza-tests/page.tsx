import type { Metadata } from "next";
import { cookies } from "next/headers";
import DiscoverHamzaTestsContent from "./DiscoverHamzaTestsContent";
import { fetchContentWithKey } from "@/app/_lib/content-service";
import { extractFields, extractList } from "@/app/_lib/helper-service";
import { getTranslations } from "@/app/_lib/getTranslations";
import { st } from "@/app/_lib/static-text-server";

/* ==========================================================================
   Metadata
   ========================================================================== */

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = cookieStore.get("lang")?.value.startsWith("en") ? "en" : "ar";
  return {
    title: st("discoverTests", "pageTitle", locale),
    description: st("discoverTests", "pageTitle", locale),
  };
}

interface TabContent {
  title_icon: string;
  header: string;
  description: string;
  link: string;
  image: string;
}

interface AreYouReadyData {
  titleText: string;
  descriptionText: string;
  buttonText: string;
}

/**
 * Maps test index to icon name
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
  return iconMap[index] || "mortarboard-02";
}

// Static fallback data
const staticTabsContent: TabContent[] = [
  {
    title_icon: "mortarboard-02",
    header: "اختبار همزة الأكاديمي",
    description:
      "يعد متطلبا لدراسة في الجامعات أو المعاهد العليا، حيث يركّز على تقييم المهارات اللغة العربية الأكاديمية .",
    link: "/types-of-tests/hamza-academic-test",
    image: "/assets/image/academic-test.png",
  },
  {
    title_icon: "glasses",
    header: "اختبار همزة العام",
    description:
      "يُعد اختبار همزة العام أداة موثوقة لقياس كفاءة اللغة العربية للناطقين بغيرها للأغراض العامة.",
    link: "/types-of-tests/hamza-general-test",
    image: "/assets/image/photo2.jpg",
  },
  {
    title_icon: "star",
    header: "اختبار همزة لتحديد المستوى!!",
    description:
      "ضمم الاختبار ليقيس معرفة المتعلم باللغة العربية من خلال أربعة أقسام رئيسية: الاستماع، القراءة، المفردات، والقواعد، وذلك بهدف اختيار المستوى المناسب للمختبر عند التحاقه بالبرنامج المستهدف.",
    link: "/types-of-tests/hamza-placement-test",
    image: "/assets/image/placement-test.png",
  },
  {
    title_icon: "book-02",
    header: "اختبار همزة المفردات",
    description:
      "اختبار معياري لقياس مفردات العربية لدى غير الناطقين بها، يصنّف الكلمات إلى خمسة مستويات من الشيوع، من الأكثر إلى الأقل. طُوِّف وفق إجراءات علمية دقيقة بمراجعة خبراء واختبارات صدق لضمان التدرج في الصعوبة. وتكمن أهميته في تشخيص المستوى اللغوي للمتعلمين في جانب المفردات، بوصفها أساس النجاح اللغوي.",
    link: "/types-of-tests/hamza-vocabulary-test",
    image: "/assets/image/vocabulary-test.png",
  },
];

const staticAreYouReady: AreYouReadyData = {
  titleText: "هل أنت مستعد لاختبار همزة؟",
  descriptionText: "نوفّر برامج إعداد مرنة يمكنك دراستها بالوتيرة التي تناسبك، وبأساليب متنوعة تلائم احتياجاتك. عزّز تجربتك وجهودك الدراسية، واستعد ليوم الاختبار بثقة واطمئنان.",
  buttonText: "التحضير للاختبار",
};

export const dynamic = "force-dynamic";

export default async function DiscoverHamzaTestsPage() {
  const cookieStore = await cookies();
  const locale = cookieStore.get("lang")?.value || "ar-SA";
  const staticLocale = locale.startsWith("en") ? "en" : "ar";

  // Fetch translations and Liferay content directly (no internal API)
  const [translations, typeOfTestsContent, areYoureadyContentData] = await Promise.all([
    getTranslations().catch((err) => {
      console.error("[DiscoverHamzaTests] Failed to fetch translations:", err);
      return null;
    }),
    fetchContentWithKey("TEST_TAKERS_TYPE_OF_TESTS_CONTENT_KEY").catch((err) => {
      console.error("[DiscoverHamzaTests] Failed to fetch type of tests:", err);
      return null;
    }),
    fetchContentWithKey("TEST_TAKERS_ARE_YOU_READY_FOR_THE_HAMZA_TEST_CONTENT_KEY").catch((err) => {
      console.error("[DiscoverHamzaTests] Failed to fetch are you ready:", err);
      return null;
    }),
  ]);

  // Section 1: Type of Tests — extract title and list
  const typeOfTestsContentFields = extractFields(
    typeOfTestsContent?.contentFields,
    ["titleText"]
  ) as { titleText?: string };

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

  // Transform to component interface
  const tabsContent = typeOfTestsList?.length
    ? typeOfTestsList.map((item: any, index: number) => ({
        title_icon: getIconForTestIndex(index),
        header: item.testName || "",
        description: item.testDescriptionText || "",
        link: item.navigationLinkText || "#",
        image: item.image || "",
      }))
    : staticTabsContent;

  const sectionTitle = st("discoverTests", "pageTitle", staticLocale);

  // Section 2: Are You Ready
  const areYoureadyFields = extractFields(
    areYoureadyContentData?.contentFields,
    ["descriptionText", "buttonText", "titleText"]
  ) as { titleText?: string; descriptionText?: string; buttonText?: string };

  const areYouReady = areYoureadyContentData
    ? {
        titleText: areYoureadyFields?.titleText || staticAreYouReady.titleText,
        descriptionText: areYoureadyFields?.descriptionText || staticAreYouReady.descriptionText,
        buttonText: areYoureadyFields?.buttonText || staticAreYouReady.buttonText,
      }
    : staticAreYouReady;

  return (
    <section className="bg-[#F9FAFB] !py-[20px] lg:!py-[40px] cta-bg-logo">
      <div className="custom-container relative z-10">
        <DiscoverHamzaTestsContent
          tabsContent={tabsContent}
          areYouReady={areYouReady}
          sectionTitle={sectionTitle}
          translations={translations}
        />
      </div>
    </section>
  );
}
