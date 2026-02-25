/**
 * Hamza Vocabulary Test Page
 *
 * This page displays comprehensive information about the Hamza Vocabulary Test,
 * including test levels and registration information.
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
import { Metadata } from "next";

/**
 * Metadata configuration for the User Profile page
 * Provides SEO optimization with title, description, and Open Graph tags
 */
export const metadata: Metadata = {
  title: "اختبار همزة المفردات",
};
/* ==========================================================================
   Types & Interfaces
   ========================================================================== */

/**
 * Interface for info card data
 */
interface InfoCard {
  icon: string;
  title: string;
  description: string;
}

/* ==========================================================================
   Static Data
   ========================================================================== */

/**
 * Data for test info (levels, questions count, duration) - Vocabulary Test
 */
const TEST_INFO: InfoCard[] = [
  {
    icon: "chart-column",
    title: "المستويات",
    description: "(5) مستويات",
  },
  {
    icon: "right-to-left-list-bullet",
    title: "عدد فقرات الاختبار",
    description: "(150) فقرة",
  },
  {
    icon: "time-02",
    title: "مدة الاختبار",
    description: "(150) دقيقة",
  },
];

/* ==========================================================================
   Sub Components
   ========================================================================== */

/**
 * Test Info Card Component
 * Displays test metadata like levels, duration, and question count
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

/* ==========================================================================
   Main Page Component
   ========================================================================== */

/**
 * Hamza Vocabulary Test Page Component
 * Main entry point for the vocabulary test information page
 */
export default function HamzaVocabularyTestPage() {
  return (
    <>
      {/* ====================================================================
          Section 1: Test Information
          ==================================================================== */}
      <section
        className="bg-color-grey-50 cta-bg-logo"
        aria-labelledby="test-sections-title"
      >
        <div className="content !py-[40px] xl:!py-[128px] flex flex-col gap-[24px] md:gap-[32px]">
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
                    src="/assets/icons/stroke-standard/book-02-stroke-rounded.svg"
                  />
                </span>
                اختبار همزة المفردات
              </p>

              {/* Section Title */}
              <h1 id="test-sections-title" className="display-sm-bold">
                أقسام الاختبار
              </h1>

              {/* Test Description */}
              <p className="text-md-regular max-w-[900px]">
                يقيس هذا الاختبار مستويات المفردات اللغوية لدى المتعلمين، ويُعد
                امتدادًا مطوّرًا للاختبار الأصلي الخاص بمستويات المفردات. ويعتمد
                على منهجية الاختبار من متعدد، مما يتيح قياسًا دقيقًا ومنهجيًا
                لقدرة المتعلمين على فهم المفردات واستخدامها عبر مستويات مختلفة،
                ويسهم في تشخيص كفاءتهم اللغوية بشكل موضوعي وموثوق.
              </p>
            </div>
          </header>

          {/* Test Info Cards Grid */}
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-[24px]"
            role="list"
            aria-label="معلومات اختبار همزة المفردات"
          >
            {TEST_INFO.map((card, index) => (
              <div key={index} role="listitem">
                <TestInfoCard {...card} />
              </div>
            ))}
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
                هل أنت مستعد لاختبار همزة المفردات؟
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