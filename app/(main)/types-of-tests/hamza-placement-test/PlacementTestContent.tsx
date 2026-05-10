
import Image from "next/image";
import Tag from "../../../components/tag/Tag";
import ScrollReveal from "../../../components/scroll-reveal/ScrollReveal";
import { QUESTION_TYPES, TEST_INFO, type TestSection, type InfoCard } from "./data";

/* ==========================================================================
   Type Definitions
   ========================================================================== */

interface TestSectionItem {
  testNameText: string;
  image?: string;
  testDescriptionText: string;
}

interface TestSectionsData {
  title?: string;
  descriptionText?: string;
  testSectionsList?: TestSectionItem[];
}

interface HeaderData {
  titleText?: string;
  descriptionText?: string;
  buttonText?: string;
}

interface PlacementTestContentProps {
  header?: HeaderData;
  testSections?: TestSectionsData;
}

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

function TestSectionCard({ section }: { section: TestSection }) {
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
              label={`عدد الأسئلة ${section.questionCount} ${section.questionUnit}`}
              trailIcon={{
                src: "/assets/icons/stroke-standard/message-question-stroke-rounded.svg",
                alt: "أيقونة عدد الأسئلة",
              }}
            />
          </div>
        </div>
      </div>
    </article>
  );
}

/* ==========================================================================
   Timing helpers
   Centralised so tweaking one number adjusts all cards at once.
   ========================================================================== */

const STAGGER  = 0.22;   // seconds between consecutive cards
const DURATION = 0.9;    // seconds per card animation
const AMOUNT   = 0.4;    // fraction of element visible before firing

/** Right-column delay for element at position i (0 = header). */
const r = (i: number) => i * STAGGER;            // 0, 0.22, 0.44, 0.66, 0.88

/** Left-column delay for element at position i.
 *  0.6 s base ensures right column is clearly leading on desktop.
 *  On mobile each card fires its own whileInView so the base delay
 *  is a brief, comfortable pause after the card enters the viewport. */
const l = (i: number) => 0.6 + i * STAGGER;     // 0.6, 0.82, 1.04, 1.26

/* ==========================================================================
   Main Export
   ========================================================================== */

export default function PlacementTestContent({ header, testSections }: PlacementTestContentProps) {
  // Use dynamic data if available, otherwise fallback to static data
  const sectionTitle = testSections?.title || "أقسام الاختبار";
  const sectionDescription = testSections?.descriptionText || "صُمّم اختبار \"همزة\" ليقدّم تقييمًا شاملًا لمستوى الكفاءة اللغوية في اللغة العربية من خلال أربعة أقسام رئيسية:";
  const headerTitle = header?.titleText || "اختبار همزة لتحديد المستوى";

  // Transform API data to component format if available
  const dynamicSections: TestSection[] = testSections?.testSectionsList?.map((item, index) => ({
    id: index + 1,
    icon: getIconForSection(item.testNameText),
    iconAlt: `أيقونة ${item.testNameText}`,
    title: item.testNameText,
    description: item.testDescriptionText,
    questionCount: 20,
    questionUnit: "فقرة",
  })) || [];

  // Use dynamic sections if available, otherwise fallback to static
  const sections = dynamicSections.length > 0 ? dynamicSections : QUESTION_TYPES;

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-[80px]">

      {/* ── Right Column ─────────────────────────────────────────── */}
      <div className="flex flex-col gap-[32px]">

        {/* Header */}
        <ScrollReveal direction="up" delay={r(0)} duration={DURATION} amount={AMOUNT}>
          <header>
            <div className="flex flex-col gap-[14px]">
              <p className="!text-[#1B8354] !text-[18px] flex gap-[8px] items-center !font-semibold">
                <span className="circular-green-outline" aria-hidden="true">
                  <Image
                    src="/assets/icons/stroke-standard/star-stroke-rounded.svg"
                    alt=""
                    width={16}
                    height={16}
                    unoptimized
                    priority
                    className="inline-block green-icon"
                  />
                </span>
                {headerTitle}
              </p>

              <h1 id="test-sections-title" className="display-sm-bold">
                {sectionTitle}
                <Image
                  src="/assets/icons/stroke-standard/arrow-left-02-stroke-rounded.svg"
                  alt=""
                  width={38}
                  height={38}
                  unoptimized
                  aria-hidden
                  className="inline-block flip-rtl hidden xl:inline-block"
                />
              </h1>

              <p className="text-md-regular">
                {sectionDescription}
              </p>
            </div>
          </header>
        </ScrollReveal>

        {/* Info Cards */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-[24px]"
          role="list"
          aria-label="معلومات اختبار تحديد المستوى"
        >
          {TEST_INFO.map((card, i) => (
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
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-[16px]"
        role="list"
        aria-label="أقسام اختبار همزة لتحديد المستوى الأربعة"
      >
        {sections.map((section, i) => (
          <ScrollReveal
            key={section.id}
            role="listitem"
            direction="left"
            delay={l(i)}
            duration={DURATION}
            amount={AMOUNT}
          >
            <TestSectionCard section={section} />
          </ScrollReveal>
        ))}
      </div>

    </div>
  );
}

/* ==========================================================================
   Helper Functions
   ========================================================================== */

/**
 * Maps section name to icon name
 * This is a simple mapping that can be extended based on available icons
 */
function getIconForSection(sectionName: string): string {
  const iconMap: Record<string, string> = {
    "الفهم المسموع": "headphones",
    "الاستماع": "headphones",
    "استيعاب المقروء": "book-open-01",
    "القراءة": "book-open-01",
    "الكتابة": "pencil-edit-02",
    "التحدث": "message-01",
    // Add more mappings as needed
  };
  
  return iconMap[sectionName] || "book-open-01"; // Default to book icon
}