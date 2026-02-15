/**
 * Hamza Placement Test Page
 *
 * This page displays comprehensive information about the Hamza Placement Test,
 * including test sections and registration information.
 *
 * @accessibility
 * - All images have descriptive alt text (decorative images use empty alt)
 * - Proper heading hierarchy (h1 -> h2 -> h3)
 * - Screen reader support with role and aria attributes
 * - Semantic HTML structure with landmark elements
 */

import "@/app/components/card/card.css";
import "@/app/styles/Button.css";
import Button from "../../components/button/Button";
import Tag from "../../components/tag/Tag";
import { Metadata } from "next";

/**
 * Metadata configuration for the User Profile page
 * Provides SEO optimization with title, description, and Open Graph tags
 */
export const metadata: Metadata = {
  title: "اختبار همزة لتحديد المستوى",
};
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
 * Data for the four question types - Placement Test
 */
const QUESTION_TYPES: TestSection[] = [
  {
    id: 1,
    icon: "headphones",
    iconAlt: "أيقونة سماعات - قسم الفهم المسموع",
    title: "الفهم المسموع",
    description:
      "يقيــس قدرتــك علــى متابعـــة المحادثات والحــوارات اليومية.",
    questionCount: 20,
    questionUnit: "فقرة",
  },
  {
    id: 2,
    icon: "book-open-01",
    iconAlt: "أيقونة كتاب مفتوح - قسم استيعاب المقروء",
    title: "استيعاب المقروء",
    description: "اختبار فهمك للنصوص العامة والمتنوعة.",
    questionCount: 20,
    questionUnit: "فقرة",
  },
  {
    id: 3,
    icon: "pencil-edit-02",
    iconAlt: "أيقونة قلم - قسم الكتابة",
    title: "الكتابة",
    description: "تقييم معرفتك واستخدامك للكلمات بصحة ودقة.",
    questionCount: 20,
    questionUnit: "فقرة",
  },
  {
    id: 4,
    icon: "message-01",
    iconAlt: "أيقونة محادثة - قسم التحدث",
    title: "التحدث",
    description: " قياس معرفتك واستخدامك للتراكيب اللغوية بصحة ودقة.",
    questionCount: 20,
    questionUnit: "فقرة",
  },
];

/**
 * Data for test info (duration, questions count, etc.) - Placement Test
 */
const TEST_INFO: InfoCard[] = [
  {
    icon: "time-02",
    iconAlt: "أيقونة ساعة - مدة الاختبار",
    title: "مدة الاختبار",
    description: "(90) دقيقة",
  },
  {
    icon: "right-to-left-list-bullet",
    iconAlt: "أيقونة قائمة - عدد فقرات الاختبار",
    title: "عدد فقرات الاختبار",
    description: "(80) فقرة",
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
        <div
          className="circular-green w-[56px] h-[56px] !mb-0 flex-shrink-0"
          aria-hidden="true"
        >
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
          <p className="text-md-regular text-[#475467]">
            {section.description}
          </p>

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
 * Hamza Placement Test Page Component
 * Main entry point for the placement test information page
 */
export default function HamzaPlacementTestPage() {
  return (
    <>
      {/* ====================================================================
          Section 1: Test Information and Sections
          ==================================================================== */}
      <section
        className="bg-color-grey-50 cta-bg-logo"
        aria-labelledby="test-sections-title"
      >
        <div className="content !py-[40px] xl:!py-[128px] flex flex-col gap-[24px] md:gap-[32px]">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-[80px]">
            {/* Right Column: Test Information */}
            <div className="flex flex-col gap-[32px]">
              {/* Section Header */}
              <header>
                <div className="flex flex-col gap-[14px]">
                  {/* Test Type Badge */}
                  <p className="!text-[#1B8354] !text-[18px] flex gap-[8px] items-center !font-semibold">
                    <span className="circular-green-outline" aria-hidden="true">
                      <img
                        alt=""
                        width={16}
                        height={16}
                        loading="eager"
                        className="inline-block green-icon"
                        src="/assets/icons/stroke-standard/star-stroke-rounded.svg"
                      />
                    </span>
                    اختبار همزة لتحديد المستوى
                  </p>

                  {/* Section Title */}
                  <h1 id="test-sections-title" className="display-sm-bold">
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
                  </h1>

                  {/* Test Description */}
                  <p className="text-md-regular">
                    صُمّم اختبار "همزة" ليقدّم تقييمًا شاملًا لمستوى الكفاءة
                    اللغوية في اللغة العربية من خلال أربعة أقسام رئيسية:
                  </p>
                </div>
              </header>

              {/* Test Info Cards Grid */}
              <div
                className="grid grid-cols-1 md:grid-cols-2 gap-[24px]"
                role="list"
                aria-label="معلومات اختبار تحديد المستوى"
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
                aria-label="أقسام اختبار همزة لتحديد المستوى الأربعة"
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
          Section 2: Call to Action - Test Preparation
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
                هل أنت مستعد لاختبار همزة لتحديد المستوى؟
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
