"use client";

/**
 * Hamza Academic Test Page
 *
 * This page displays comprehensive information about the Hamza Academic Test,
 * including language proficiency levels, test sections, and registration information.
 *
 * @accessibility
 * - All images have descriptive alt text (decorative images use empty alt)
 * - Proper heading hierarchy (h1 -> h2 -> h3)
 * - Screen reader support with role and aria attributes
 * - Semantic HTML structure with landmark elements
 */

import "@/app/components/card/Card.css";
import "@/app/styles/Button.css";
import Button from "../../components/button/Button";
import Tag from "../../components/tag/Tag";

/* ==========================================================================
   Types & Interfaces
   ========================================================================== */

/**
 * Interface for test section data
 */
interface TestSection {
  id: number;
  icon: string;
  iconAlt: string;
  title: string;
  description: string;
  questionCount: number;
  questionUnit: string;
}

/**
 * Interface for info card data
 */
interface InfoCard {
  icon: string;
  iconAlt: string;
  title: string;
  description: string;
}

/* ==========================================================================
   Static Data
   ========================================================================== */

/**
 * Data for the four question types - Academic Test
 */
const QUESTION_TYPES: TestSection[] = [
  {
    id: 1,
    icon: "headphones",
    iconAlt: "أيقونة سماعات - قسم الفهم المسموع",
    title: "الفهم المسموع",
    description: "الاستماع إلى مقاطع صوتية عامة ومتنوعة، والإجابة عن أسئلة (الاختيار من متعدد) - (30) فقرة.",
    questionCount: 30,
    questionUnit: "فقرة",
  },
  {
    id: 2,
    icon: "book-open-01",
    iconAlt: "أيقونة كتاب مفتوح - قسم استيعاب المقروء",
    title: "استيعاب المقروء",
    description: "قراءة نصوص عامة ومتنوعة، والإجابة عن أسئلة (الاختيار من متعدد) - (40) فقرة.",
    questionCount: 40,
    questionUnit: "فقرة",
  },
  {
    id: 3,
    icon: "pencil-edit-02",
    iconAlt: "أيقونة قلم - قسم الكتابة",
    title: "الكتابة",
    description: "كتابة مقال واحد في موضوع عام تتراوح عدد كلماته من (200) إلى (250) كلمة - فقرة واحدة.",
    questionCount: 1,
    questionUnit: "فقرة",
  },
  {
    id: 4,
    icon: "message-01",
    iconAlt: "أيقونة محادثة - قسم التحدث",
    title: "التحدث",
    description: "الإجابة عن أسئلة عامة، والتحدُّث عن موضوع عام - (4) فقرات.",
    questionCount: 4,
    questionUnit: "فقرات",
  },
];

/**
 * Data for test info (duration, questions count, etc.) - Academic Test
 */
const TEST_INFO: InfoCard[] = [
  {
    icon: "time-02",
    iconAlt: "أيقونة ساعة - مدة الاختبار",
    title: "مدة الاختبار",
    description: "(155) دقيقة",
  },
  {
    icon: "right-to-left-list-bullet",
    iconAlt: "أيقونة قائمة - عدد فقرات الاختبار",
    title: "عدد فقرات الاختبار",
    description: "(75) فقرة",
  },
  {
    icon: "cursor-in-window",
    iconAlt: "أيقونة شاشة - تطبيق الاختبار عن بُعد",
    title: "يطبق الاختبار",
    description: "عن بُعد",
  },
  {
    icon: "building-06",
    iconAlt: "أيقونة مبنى - تطبيق الاختبار في مراكز الاختبار",
    title: "يطبق الاختبار",
    description: "في مراكز الاختبار",
  },
];

/* ==========================================================================
   Sub Components
   ========================================================================== */

/**
 * Test Info Card Component
 * Displays test metadata like duration and question count
 */
function TestInfoCard({ icon, title, description }: InfoCard) {
  return (
    <article className="card !border-none">
      <div className="flex flex-row gap-[24px] items-start">
        {/* Card Icon */}
        <span className="square-green" aria-hidden="true">
          <img
            alt=""
            width={28}
            height={28}
            loading="lazy"
            className="inline-block white-icon"
            src={`/assets/icons/stroke-standard/${icon}-stroke-rounded.svg`}
          />
        </span>

        {/* Card Content */}
        <div className="card-content flex-1 flex flex-col items-start text-start">
          <h3 className="text-lg-semibold">{title}</h3>
          <p className="text-md-regular">{description}</p>
        </div>
      </div>
    </article>
  );
}

/**
 * Test Section Card Component
 * Displays individual test section details
 */
function TestSectionCard({ section }: { section: TestSection }) {
  return (
    <article className="card !border-none">
      <div className="flex flex-row gap-[24px] items-center w-full">
        {/* Section Icon */}
        <div className="circular-green w-[56px] h-[56px] !mb-0 flex-shrink-0" aria-hidden="true">
          <img
            alt=""
            width={28}
            height={28}
            loading="lazy"
            className="inline-block green-icon"
            src={`/assets/icons/stroke-standard/${section.icon}-stroke-rounded.svg`}
          />
        </div>

        {/* Section Content */}
        <div className="flex flex-col gap-[12px] flex-1 text-start">
          <h3 className="text-lg-bold">{section.title}</h3>
          <p className="text-md-regular text-[#475467]">{section.description}</p>

          {/* Question Count Badge */}
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
   Main Page Component
   ========================================================================== */

/**
 * Hamza Academic Test Page Component
 * Main entry point for the academic test information page
 */
export default function HamzaAcademicTestPage() {
  return (
    <>
      {/* ====================================================================
          Section 1: Language Proficiency Levels
          ==================================================================== */}
      <section className="bg-[#F3FCF6]" aria-labelledby="levels-title">
        <div className="content !py-[40px] xl:!py-0">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-[24px] xl:gap-0">

            {/* Right Column: Section Info */}
            <div className="flex flex-col gap-[16px] justify-center items-center text-center py-0 xl:py-[80px] px-0 xl:px-[80px]">

              {/* Icon */}
              <div className="circular-green-outline !w-[64px] !h-[64px]" aria-hidden="true">
                <img
                  alt=""
                  width={32}
                  height={32}
                  loading="lazy"
                  className="inline-block green-icon"
                  src="/assets/icons/stroke-standard/mortarboard-01-stroke-rounded.svg"
                />
              </div>

              {/* Title */}
              <h1 id="levels-title" className="display-sm-bold !leading-[1.8]">
                المستويات التي يقيسها
                <br />
                اختبار همزة الأكاديمي
              </h1>

              {/* Subtitle */}
              <p className="text-md-regular">
                وفق الإطار الأوروبي المرجعي المشترك للغات
              </p>
            </div>

            {/* Left Column: Levels Chart Image */}
            <div className="bg-[#F0FDF4] flex items-center justify-center border border-[#D2D6DB] rounded-[16px] overflow-hidden mx-0 xl:mx-0">
              <img
                src="/assets/image/acadmic-pic.png"
                alt="رسم بياني يوضح مستويات اختبار همزة الأكاديمي من A1 مبتدئ إلى C2 ماهر"
                className="w-full h-auto object-contain"
                loading="lazy"
              />
            </div>

          </div>
        </div>
      </section>

      {/* ====================================================================
          Section 2: Test Information and Sections
          ==================================================================== */}
      <section className="bg-color-grey-50 cta-bg-logo" aria-labelledby="test-sections-title">
        <div className="content !py-[40px] xl:!py-[128px] flex flex-col gap-[24px] md:gap-[32px]">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-[80px]">

            {/* Right Column: Test Information */}
            <div className="flex flex-col gap-[32px]">

              {/* Section Header */}
              <header>
                <div className="flex flex-col gap-[14px]">

                  {/* Test Type Badge */}
                  <p className="!text-[#1B8354] !text-[18px] flex gap-[8px] items-center !text-semibold">
                    <span className="circular-green-outline" aria-hidden="true">
                      <img
                        alt=""
                        width={16}
                        height={16}
                        loading="eager"
                        className="inline-block green-icon"
                        src="/assets/icons/stroke-standard/mortarboard-01-stroke-rounded.svg"
                      />
                    </span>
                    اختبار همزة الأكاديمي
                  </p>

                  {/* Section Title */}
                  <h2 id="test-sections-title" className="display-sm-bold">
                    أقسام الاختبار
                    <img
                      alt=""
                      width={38}
                      height={38}
                      loading="eager"
                      className="inline-block flip-rtl hidden xl:inline-block"
                      aria-hidden="true"
                      src="/assets/icons/stroke-standard/arrow-left-02-stroke-rounded.svg"
                    />
                  </h2>

                  {/* Test Description */}
                  <p className="text-md-regular">
                    صُمّم اختبار "همزة" ليقدّم تقييمًا شاملًا لمستوى الكفاءة اللغوية
                    في اللغة العربية من خلال أربعة أقسام رئيسية:
                  </p>
                </div>
              </header>

              {/* Test Info Cards Grid */}
              <div
                className="grid grid-cols-1 md:grid-cols-2 gap-[24px]"
                role="list"
                aria-label="معلومات الاختبار الأكاديمي"
              >
                {TEST_INFO.map((card, index) => (
                  <div key={index} role="listitem">
                    <TestInfoCard {...card} />
                  </div>
                ))}
              </div>
            </div>

            {/* Left Column: Test Sections */}
            <div className="flex flex-col gap-[16px]">
              {/* Test Sections Cards Grid */}
              <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-[16px]"
                role="list"
                aria-label="أقسام اختبار همزة الأكاديمي الأربعة"
              >
                {QUESTION_TYPES.map((section) => (
                  <div key={section.id} role="listitem">
                    <TestSectionCard section={section} />
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ====================================================================
          Section 3: Call to Action - Test Preparation
          ==================================================================== */}
      <section
        className="content gap-[32px] !py-[40px]"
        aria-labelledby="cta-title"
      >
        <div className="flex flex-col gap-[24px] bg-[#074D31] rounded-[16px] md:rounded-[24px] px-[24px] md:px-[80px] custom-container section-spacing-5xl cta-bg-pattern">

          {/* CTA Content */}
          <div className="flex flex-col md:flex-row items-center gap-[32px] text-center md:text-start">
            <div className="flex flex-col gap-4">
              <h2 id="cta-title" className="display-sm-bold !text-white">
                هل أنت مستعد لاختبار همزة الأكاديمي؟
              </h2>
              <p className="text-md-regular !text-white md:text-start text-center max-w-[500px]">
                نوفّر برامج إعداد مرنة يمكنك دراستها بالوتيرة التي تناسبك،
                وبأساليب متنوعة تلائم احتياجاتك. عزّز تجربتك وجهودك الدراسية،
                واستعد ليوم الاختبار بثقة واطمئنان.
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 w-full md:w-auto">
            <Button
              label="التحضير للاختبار"
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
