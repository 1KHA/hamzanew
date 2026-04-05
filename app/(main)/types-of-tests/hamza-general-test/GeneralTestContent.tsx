"use client";

import Image from "next/image";
import Tag from "../../../components/tag/Tag";
import ScrollReveal from "../../../components/scroll-reveal/ScrollReveal";
import { QUESTION_TYPES, TEST_INFO, type TestSection, type InfoCard } from "./data";

/* ==========================================================================
   Types
   ========================================================================== */

interface TestSectionItem {
  testNameText: string;
  image: string;
  testDescriptionText: string;
}

interface TestSectionsData {
  title: string;
  descriptionText: string;
  testSectionsList: TestSectionItem[];
}

interface HeaderData {
  title: string;
  titleText: string;
  descriptionText: string;
  buttonText: string;
}

interface GeneralTestContentProps {
  header?: HeaderData;
  testSections?: TestSectionsData;
  questionTypes?: TestSection[];
  testInfo?: InfoCard[];
}

/* ==========================================================================
   Timing helpers  (same pattern as PlacementTestContent)
   ========================================================================== */

const STAGGER  = 0.22;
const DURATION = 0.9;
const AMOUNT   = 0.4;

const r = (i: number) => i * STAGGER;        // right column: 0, 0.22, 0.44 …
const l = (i: number) => 0.6 + i * STAGGER;  // left column:  0.6, 0.82, 1.04 …

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
   Main Export
   ========================================================================== */

export default function GeneralTestContent({
  header,
  testSections,
  questionTypes = QUESTION_TYPES,
  testInfo = TEST_INFO
}: GeneralTestContentProps) {
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
        
        return {
          id: index + 1,
          icon: iconMap[section.testNameText] || "star",
          iconAlt: `أيقونة قسم ${section.testNameText}`,
          title: section.testNameText,
          description: section.testDescriptionText,
          questionCount: 0, // Will use fallback data
          questionUnit: "فقرة",
        };
      })
    : questionTypes;

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
                    src="/assets/icons/stroke-standard/glasses-stroke-rounded.svg"
                    alt=""
                    width={16}
                    height={16}
                    unoptimized
                    priority
                    className="inline-block green-icon"
                  />
                </span>
                {header?.titleText || "اختبار همزة العام"}
              </p>

              <h1 id="test-sections-title" className="display-sm-bold hidden xl:block">
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
              </h1>

              <p className="text-md-regular">
                {testSections?.descriptionText || "صُمّم اختبار \"همزة\" ليقدّم تقييمًا شاملًا لمستوى الكفاءة اللغوية في اللغة العربية من خلال أربعة أقسام رئيسية:"}
              </p>
            </div>
          </header>
        </ScrollReveal>

        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-[24px]"
          role="list"
          aria-label="معلومات الاختبار"
        >
          {testInfo.map((card, i) => (
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
          aria-label="أقسام اختبار همزة الأربعة"
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
              <TestSectionCard section={section} />
            </ScrollReveal>
          ))}
        </div>
      </div>

    </div>
  );
}