
import Image from "next/image";
import Tag from "../../../components/tag/Tag";
import ScrollReveal from "../../../components/scroll-reveal/ScrollReveal";
import { QUESTION_TYPES, TEST_INFO, type TestSection, type InfoCard } from "./data";
import { st } from "@/app/_lib/static-text-server";

/* ==========================================================================
   Types
   ========================================================================== */

interface TestSectionItem {
  testNameText: string;
  image: string;
  testDescriptionText: string;
  sidebarTopText: string;
  sidebarBottomText1: string;
  sidebarBottomText2: string;
}

interface TestSectionsData {
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
}

interface AcademicLevelsContentProps {
  title?: string;
  subtitle?: string;
  image?: string;
}

interface LevelsMeasuredData {
  title: string;
  descriptionText: string;
  buttonText: string;
  image: string;
}

interface AcademicTestContentProps {
  levelsMeasured?: LevelsMeasuredData;
  testSections?: TestSectionsData;
  questionTypes?: TestSection[];
  testInfo?: InfoCard[];
  locale?: "ar" | "en";
}

/* ==========================================================================
   Timing helpers
   ========================================================================== */

const STAGGER  = 0.22;
const DURATION = 0.9;
const AMOUNT   = 0.4;

const r = (i: number) => i * STAGGER;
const l = (i: number) => 0.6 + i * STAGGER;

/* ==========================================================================
   Sub Components
   ========================================================================== */

function TestInfoCard({ icon, iconAlt, title, description }: InfoCard) {
  return (
    <article className="card !border-none">
      <div className="flex flex-row gap-[24px] items-start">
        <span className="square-green" aria-hidden="true">
          <Image
            src={`/assets/icons/stroke-standard/${icon}-stroke-rounded.svg`}
            alt={iconAlt}
            width={28}
            height={28}
            unoptimized
            className="inline-block white-icon"
          />
        </span>
        <div className="card-content flex-1 flex flex-col items-start text-start">
          <h3 className="text-lg-semibold">{title}</h3>
          <p className="text-md-regular">{description}</p>
        </div>
      </div>
    </article>
  );
}

function TestSectionCard({ section, locale = "ar" }: { section: TestSection; locale?: "ar" | "en" }) {
  return (
    <article className="card !border-none">
      <div className="flex flex-row gap-[24px] items-center w-full">
        <div
          className="circular-green w-[56px] h-[56px] !mb-0 flex-shrink-0"
          aria-hidden="true"
        >
          <Image
            src={`/assets/icons/stroke-standard/${section.icon}-stroke-rounded.svg`}
            alt={section.iconAlt}
            width={28}
            height={28}
            unoptimized
            className="inline-block green-icon"
          />
        </div>
        <div className="flex flex-col gap-[12px] flex-1 text-start">
          <h3 className="text-lg-bold">{section.title}</h3>
          <p className="text-md-regular text-[#475467]">{section.description}</p>
          <div>
            <Tag
              variant="neutral"
              size="md"
              label={`${st("generalTest", "questionCountLabel", locale)} ${section.questionCount}`}
              trailIcon={{
                src: "/assets/icons/stroke-standard/message-question-stroke-rounded.svg",
                alt: st("generalTest", "questionCountLabel", locale),
              }}
            />
          </div>
        </div>
      </div>
    </article>
  );
}

/* ==========================================================================
   Section 1: Levels Content
   ========================================================================== */

export function AcademicLevelsContent({ 
  title = "المستويات التي يقيسها اختبار همزة الأكاديمي",
  subtitle = "وفق الإطار الأوروبي المرجعي المشترك للغات",
  image = "/assets/image/acadmic-pic.png"
}: AcademicLevelsContentProps) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-[24px] xl:gap-0">

      {/* Right Column: icon + title + subtitle */}
      <ScrollReveal direction="up" delay={r(0)} duration={DURATION} amount={0} className="h-full flex items-center justify-center">
        <div className="flex flex-col gap-[16px] justify-center items-center text-center py-0 xl:py-[80px] px-0 xl:px-[80px]">
          <div className="circular-green-outline !w-[64px] !h-[64px]" aria-hidden="true">
            <Image
              src="/assets/icons/stroke-standard/mortarboard-01-stroke-rounded.svg"
              alt=""
              width={32}
              height={32}
              unoptimized
              priority
              className="inline-block green-icon"
            />
          </div>
          <h1 id="levels-title" className="display-sm-bold !leading-[1.8]">
            {title.split(" ").slice(0, 3).join(" ")}
            <br />
            {title.split(" ").slice(3).join(" ")}
          </h1>
          <p className="text-md-regular">
            {subtitle}
          </p>
        </div>
      </ScrollReveal>

      {/* Left Column: levels chart image */}
      <ScrollReveal direction="left" delay={l(0)} duration={DURATION} amount={0}>
        <div className="bg-[#F0FDF4] flex items-center justify-center border border-[#D2D6DB] rounded-[16px] overflow-hidden">
          <Image
            src={image}
            alt="رسم بياني يوضح مستويات اختبار همزة الأكاديمي من A1 مبتدئ إلى C2 ماهر"
            width={600}
            height={400}
            unoptimized
            className="w-full h-auto object-contain"
          />
        </div>
      </ScrollReveal>

    </div>
  );
}

/* ==========================================================================
   Section 2: Test Sections Content
   ========================================================================== */

export default function AcademicTestContent({ 
  testSections,
  questionTypes = QUESTION_TYPES,
  testInfo = TEST_INFO,
  locale = "ar",
}: AcademicTestContentProps) {
  // Helper function to extract number from Arabic or Western numerals
  const extractNumber = (text: string | undefined | null): number => {
    if (!text) return 0;
    
    // Check if text contains Arabic numerals (٠١٢٣٤٥٦٧٨٩)
    const arabicNumerals = text.match(/[٠-٩]+/);
    if (arabicNumerals) {
      const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
      const num = parseInt(arabicNumerals[0].split('').map(d => arabicDigits.indexOf(d)).join('')) || 0;
      if (num > 0) return num;
    }
    
    // Check for Western numerals
    const westernNumerals = text.match(/\d+/);
    if (westernNumerals) {
      return parseInt(westernNumerals[0]) || 0;
    }
    
    return 0;
  };
  
  // Map section names to fallback question counts
  const sectionNameToFallback: Record<string, number> = {
    "الفهم المسموع": 30,
    "الاستماع": 30,
    "استيعاب المقروء": 40,
    "القراءة": 40,
    "الكتابة": 1,
    "التحدث": 4,
  };

  // Transform API data if provided
  const transformedQuestionTypes = testSections?.testSectionsList?.length 
    ? testSections.testSectionsList.map((section, index) => {
        const iconMap: Record<string, string> = {
          "الاستماع": "headphones",
          "الفهم المسموع": "headphones",
          "القراءة": "book-open-01",
          "استيعاب المقروء": "book-open-01",
          "الكتابة": "pencil-edit-02",
          "المفردات": "book-02",
          "التحدث": "message-01",
        };
        
        // Try to extract number from sidebarTopText or sidebarBottomText1
        // Don't use description text as it may contain word counts instead of question counts
        const sidebarCount = extractNumber(section.sidebarTopText) || 
                             extractNumber(section.sidebarBottomText1) ||
                             extractNumber(section.sidebarBottomText2);
        
        // Use sidebar data if valid, otherwise use fallback
        const sectionName = section.testNameText;
        const fallback = sectionNameToFallback[sectionName] || 0;
        
        const questionCount = sidebarCount > 0 ? sidebarCount : fallback;
        
        return {
          id: index + 1,
          icon: iconMap[sectionName] || "star",
          iconAlt: `أيقونة قسم ${sectionName}`,
          title: sectionName,
          description: section.testDescriptionText,
          questionCount,
          questionUnit: "",
        };
      })
    : questionTypes;

  const transformedTestInfo = testSections
    ? [
        {
          icon: "time-02",
          iconAlt: "أيقونة ساعة - مدة الاختبار",
          title: testSections.testDurationText,
          description: `${testSections.testDurationValueText} دقيقة`,
        },
        {
          icon: "right-to-left-list-bullet",
          iconAlt: "أيقونة قائمة - عدد الأسئلة",
          title: testSections.numberOfTestItemsText,
          description: `${testSections.numberOfTestItemsValueText}`,
        },
        {
          icon: "cursor-in-window",
          iconAlt: "أيقونة شاشة - تطبيق الاختبار عن بُعد",
          title: testSections.availableTestsTitleText,
          description: testSections.atADistanceText,
        },
        {
          icon: "building-06",
          iconAlt: "أيقونة مبنى - تطبيق الاختبار في مراكز الاختبار",
          title: testSections.availableTestsTitleText,
          description: testSections.inTestingCentersText,
        },
      ]
    : testInfo;

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-[80px]">

      {/* ── Right Column ─────────────────────────────────────────── */}
      <div className="flex flex-col gap-[32px]">

        <ScrollReveal direction="up" delay={r(0)} duration={DURATION} amount={AMOUNT}>
          <header>
            <div className="flex flex-col gap-[14px]">
              <p className="!text-[#1B8354] !text-[18px] flex gap-[8px] items-center !font-semibold">
                <span className="circular-green-outline" aria-hidden="true">
                  <Image
                    src="/assets/icons/stroke-standard/mortarboard-01-stroke-rounded.svg"
                    alt=""
                    width={16}
                    height={16}
                    unoptimized
                    priority
                    className="inline-block green-icon"
                  />
                </span>
                اختبار همزة الأكاديمي
              </p>

              <h2 id="test-sections-title" className="display-sm-bold hidden xl:block">
                {testSections?.title || "أقسام الاختبار"}
                <Image
                  src="/assets/icons/stroke-standard/arrow-left-02-stroke-rounded.svg"
                  alt=""
                  width={38}
                  height={38}
                  unoptimized
                  aria-hidden
                  className="inline-block flip-rtl"
                />
              </h2>

              <p className="text-md-regular">
                {testSections?.descriptionText || "صُمّم اختبار \"همزة\" ليقدّم تقييمًا شاملًا لمستوى الكفاءة اللغوية في اللغة العربية من خلال أربعة أقسام رئيسية:"}
              </p>
            </div>
          </header>
        </ScrollReveal>

        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-[24px]"
          role="list"
          aria-label="معلومات الاختبار الأكاديمي"
        >
          {transformedTestInfo.map((card, i) => (
            <ScrollReveal
              key={i}
              role="listitem"
              direction="up"
              delay={r(i + 1)}
              duration={DURATION}
              amount={AMOUNT}
            >
              <TestInfoCard {...card} />
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* ── Left Column ──────────────────────────────────────────── */}
      <div className="flex flex-col gap-[16px]">

        {/* Mobile-only title */}
        <ScrollReveal direction="up" delay={l(0)} duration={DURATION} amount={AMOUNT}>
          <h2 className="display-sm-bold block xl:hidden">
            {testSections?.title || "أقسام الاختبار"}
          </h2>
        </ScrollReveal>

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-[16px]"
          role="list"
          aria-label="أقسام اختبار همزة الأكاديمي الأربعة"
        >
          {transformedQuestionTypes.map((section, i) => (
            <ScrollReveal
              key={section.id}
              role="listitem"
              direction="left"
              delay={l(i)}
              duration={DURATION}
              amount={AMOUNT}
            >
              <TestSectionCard section={section} locale={locale} />
            </ScrollReveal>
          ))}
        </div>
      </div>

    </div>
  );
}