/**
 * Hamza General Test Page
 *
 * This page displays comprehensive information about the Hamza General Test,
 * including test sections and registration information.
 *
 * @accessibility
 * - All images have descriptive alt text
 * - Proper heading hierarchy (h1, h2, h3)
 * - Screen reader support with role and aria attributes
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
  title: "دورة مران",
};
/* ==========================================================================
   Types & Interfaces
   ========================================================================== */

/**
 * Interface for course section data
 */
interface CourseSection {
  id: number;
  icon: string;
  iconAlt: string;
  title: string;
  description: string;
}

/* ==========================================================================
   Static Data
   ========================================================================== */

/**
 * Data for the four course sections
 */
const COURSE_SECTIONS: CourseSection[] = [
  {
    id: 1,
    icon: "headphones",
    iconAlt: "أيقونة سماعات - قسم الفهم المسموع",
    title: "الفهم المسموع",
    description:
      "الاستماع يقيس قدرتك على متابعة المحادثات والحوارات اليومية والأكاديمية",
  },
  {
    id: 2,
    icon: "book-open-01",
    iconAlt: "أيقونة كتاب مفتوح - قسم استيعاب المقروء",
    title: "استيعاب المقروء",
    description: "القراءة تختبر فهمك للنصوص التعليمية والمقالات التحليلية",
  },
  {
    id: 3,
    icon: "pencil-edit-02",
    iconAlt: "أيقونة قلم - قسم الكتابة",
    title: "الكتابة",
    description:
      "الكتابة تقيّم قدرتك على التعبير بلغة دقيقة ومنظمة في موضوعات أكاديمية",
  },
  {
    id: 4,
    icon: "message-01",
    iconAlt: "أيقونة محادثة - قسم التحدث",
    title: "التحدث",
    description:
      "المحادثة تركّز على طلاقتك وثقتك في استخدام اللغة في المواقف المختلفة",
  },
];

/**
 * Data for the duration section feature cards
 */
const DURATION_FEATURES = [
  {
    id: 1,
    icon: "online-learning-01",
    iconAlt: "أيقونة تعلّم - الوحدات التعليمية",
    title: "الوحدات التعليمية",
  },
  {
    id: 2,
    icon: "diploma",
    iconAlt: "أيقونة دبلوم - التقييمات المستمرة",
    title: "التقييمات المستمرة",
  },
  {
    id: 3,
    icon: "activity-01",
    iconAlt: "أيقونة نشاط - الأنشطة العملية",
    title: "الأنشطة العملية",
  },
  {
    id: 4,
    icon: "quiz-02",
    iconAlt: "أيقونة أسئلة - الأسئلة التجريبية للاختبار",
    title: "الأسئلة التجريبية للاختبار",
  },
];

/**
 * Data for the three course weeks
 */
const WEEKS = [
  { id: 1, number: "1", title: "الأسبوع الأول" },
  { id: 2, number: "2", title: "الأسبوع الثاني" },
  { id: 3, number: "3", title: "الأسبوع الثالث" },
];

/* ==========================================================================
   Sub Components
   ========================================================================== */

/**
 * Course Section Card Component
 * Displays individual course section details
 */
function CourseSectionCard({ section }: { section: CourseSection }) {
  return (
    <article className="card !border-none">
      <div className="flex flex-row gap-[24px] items-center w-full">
        {/* Section Icon */}
        <div className="circular-green w-[56px] h-[56px] !mb-0 flex-shrink-0">
          <img
            alt={section.iconAlt}
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
        </div>
      </div>
    </article>
  );
}

/* ==========================================================================
   Main Page Component
   ========================================================================== */

/**
 * Hamza General Test Page Component
 * Main entry point for the test information page
 */
export default function HamzaGeneralTestPage() {
  return (
    <>
      {/* ====================================================================
          Section 1:Title and Introduction
          ==================================================================== */}

      {/* ====================================================================
          Section 2: Test Information and Sections
          ==================================================================== */}
      <section
        className="bg-color-grey-50 cta-bg-logo"
        aria-labelledby="test-sections-title"
      >
        <div className="content !py-[40px] xl:!py-[128px] !flex flex-col gap-[24px] md:gap-[32px]">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-[80px]">
            {/* Left Column: Test Information */}
            <div className="flex flex-col gap-[32px]">
              {/* Section Header */}
              <header className="">
                <div className="flex flex-col gap-[14px]">
                  {/* Course Badge */}
                  <p className="!text-[#1B8354] !text-[18px] flex gap-[8px] items-center !text-semibold">
                    <span className="circular-green-outline">
                      <img
                        alt="أيقونة دورة - دورة مران"
                        width={16}
                        height={16}
                        loading="eager"
                        className="inline-block green-icon"
                        src="/assets/icons/stroke-standard/mortarboard-02-stroke-rounded.svg"
                      />
                    </span>
                    دورة مران
                  </p>

                  {/* Main Title - Visible on large screens */}
                  <h1
                    id="test-sections-title"
                    className="display-sm-bold hidden xl:block"
                  >
                    أقسام الدورة
                    <img
                      alt="سهم يشير إلى أقسام الدورة"
                      width={38}
                      height={38}
                      loading="eager"
                      className="inline-block flip-rtl"
                      src="/assets/icons/stroke-standard/arrow-left-02-stroke-rounded.svg"
                    />
                  </h1>

                  {/* Course Description */}
                  <p className="text-md-regular">
                    تهدف الدورة إلى تهيئة الطلاب الناطقين بغير اللغة العربية
                    لاختبار همزة الأكاديمي، الذي يقيس كفاية اللغة العربية،
                    التي تشمل المهارات الأربع الأساسية، من خلال محاضرات
                    تفاعلية، سيكتسب الطلاب من خلالها إستراتيجيات؛ للإجابة عن
                    الأسئلة، وتعزيز ثقتهم في استخدام اللغة العربية.
                  </p>
                </div>
              </header>

              {/* Register Button */}
              <div>
                <Button
                  label="سجل الآن"
                  variant="primary-brand"
                  size="lg"
                  icon="arrow-up-right-01"
                />
              </div>
            </div>

            {/* Right Column: Course Sections */}
            <div className="flex flex-col gap-[16px]">
              {/* Title - Visible on small and medium screens */}
              <h2 className="display-sm-bold block xl:hidden">
                أقسام الدورة
              </h2>

              {/* Course Sections Cards Grid */}
              <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-[16px]"
                role="list"
                aria-label="أقسام دورة مران الأربعة"
              >
                {COURSE_SECTIONS.map((section) => (
                  <div key={section.id} role="listitem">
                    <CourseSectionCard section={section} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          Section 3: Duration
          ==================================================================== */}
      <section
        className="content !py-[40px] xl:!py-[80px] !flex flex-col gap-[24px]"
        aria-labelledby="duration-title"
      >
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_2fr] gap-[64px] items-start">
          {/* Right Column (RTL): Title + Description */}
          <div className="flex flex-col gap-[20px]">
            <h2 id="duration-title" className="display-sm-bold">
              المدة الزمنية
            </h2>
            <div className="flex flex-col gap-[12px]">
              <p className="text-md-regular text-[#475467]">
                المدة المتوقعة لإكمال الدورة (ثلاثة أسابيع)
              </p>
              <p className="text-md-regular text-[#475467]">
                بمعدل (ساعتين) أسبوعيًا، بما يضمن للمتدرب تجربة تعليمية
                متكاملة وفاعلة
              </p>
            </div>
          </div>

          {/* Left Column (RTL): Feature Cards + Weeks */}
          <div className="flex flex-col gap-[32px]">
            {/* 4 Feature Cards */}
            <div
              className="grid grid-cols-2 md:grid-cols-4 gap-[16px]"
              role="list"
              aria-label="محتويات الدورة"
            >
              {DURATION_FEATURES.map((feature) => (
                <article
                  key={feature.id}
                  role="listitem"
                  className="card items-center text-center gap-[16px]"
                >
                  <div className="circular-green !mb-0">
                    <img
                      alt={feature.iconAlt}
                      width={24}
                      height={24}
                      loading="lazy"
                      className="inline-block green-icon"
                      src={`/assets/icons/stroke-standard/${feature.icon}-stroke-rounded.svg`}
                    />
                  </div>
                  <p className="text-md-regular font-semibold text-[#101828]">
                    {feature.title}
                  </p>
                </article>
              ))}
            </div>


          </div>

        </div>

        {/* 3 Week Progress Items */}
        <div
          className="grid grid-cols-3 gap-[16px]"
          role="list"
          aria-label="أسابيع الدورة"
        >
          {WEEKS.map((week) => (
            <div
              key={week.id}
              role="listitem"
              className="flex flex-col items-start gap-[12px]"
            >
              <div className="circular-green-number">
                <span>{week.number}</span>
              </div>
              <p className="text-md-regular font-bold text-center text-[#101828]">
                {week.title}
              </p>
              {/* Progress Bar */}
              <div className="w-full h-[8px] rounded-full bg-[#D1FADF] overflow-hidden">
                <div className="h-full w-full bg-[#1B8354] rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}