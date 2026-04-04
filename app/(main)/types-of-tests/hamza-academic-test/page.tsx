import Button from "../../../components/button/Button";
import AcademicTestContent, { AcademicLevelsContent } from "./AcademicTestContent";
import "@/app/components/card/card.css";
import "@/app/styles/Button.css";

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
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/hamza-academic-test`, {
      cache: "no-store",
    });
    
    if (!response.ok) {
      throw new Error("Failed to fetch academic test data");
    }
    
    const data = await response.json();
    return {
      levelsMeasured: data.levelsMeasured,
      testSections: data.testSections,
      areYouReady: data.areYouReady,
    };
  } catch (error) {
    console.error("Error fetching academic test data:", error);
    return {
      levelsMeasured: {
        title: "المستويات التي يقيسها اختبار همزة الأكاديمي",
        descriptionText: "وفق الإطار الأوروبي المرجعي المشترك للغات",
        buttonText: "",
        image: "/assets/image/acadmic-pic.png",
      },
      testSections: {
        title: "أقسام الاختبار",
        descriptionText: "صُمّم اختبار \"همزة\" ليقدّم تقييمًا شاملًا لمستوى الكفاءة اللغوية في اللغة العربية من خلال أربعة أقسام رئيسية:",
        testDurationText: "مدة الاختبار",
        testDurationValueText: "155 دقيقة",
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
        descriptionText: "نوفّر برامج إعداد مرنة يمكنك دراستها بالوتيرة التي تناسبك، وبأساليب متنوعة تلائم احتياجاتك.",
        buttonText: "التحضير للاختبار",
      },
    };
  }
}

export default async function HamzaAcademicTestPage() {
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
          <AcademicTestContent testSections={data.testSections} />
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