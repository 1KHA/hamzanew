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

export const metadata: Metadata = {
  title: "دورة مران همزة",
  description:
    "تهدف الدورة إلى تهيئة الطلاب الناطقين بغير اللغة العربية لاختبار همزة الأكاديمي الذي يقيس كفاية اللغة العربية من خلال المهارات الأربع الأساسية",
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
    icon: "cells",
    iconAlt: "أيقونة تعلّم - الوحدات التعليمية",
    title: "الوحدات التعليمية",
  },
  {
    id: 2,
    icon: "star-half",
    iconAlt: "أيقونة دبلوم - التقييمات المستمرة",
    title: "التقييمات المستمرة",
  },
  {
    id: 3,
    icon: "pendulum",
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

/**
 * Data for the target audience cards
 */
const TARGET_AUDIENCE = [
  {
    id: 1,
    text: "متعلمي اللغة العربية الناطقين بغيرها.",
  },
  {
    id: 2,
    text: "الراغبين في التقديم على المنح الدراسية في برامج اللغة العربية.",
  },
  {
    id: 3,
    text: "الراغبين بالالتحاق بوظائف تحتاج إلى معرفةٍ بالكفاية اللغوية العربية",
  },
];

/**
 * Data for the features section
 */
const FEATURES = [
  {
    id: 1,
    icon: "touch-interaction-04",
    iconAlt: "أيقونة تعلم تفاعلي",
    title: "تعلم تفاعلي",
    description:
      "تتيح المنصة تجربة تعلم متفاعلة من خلال مزيج من المقاطع الفيديو التعليمية عالية الجودة، والأنشطة التفاعلية، والتمارين العملية. يتم توفير التحفيز والتوجيه اللازم للمتعلمين لمساعدتهم على الاستفادة القصوى من الدروس.",
  },
  {
    id: 2,
    icon: "mentoring",
    iconAlt: "أيقونة توجيه شخصي",
    title: "توجيه شخصي",
    description:
      "تقدم المنصة توجيهًا شخصيًا للمتعلمين من خلال واجهة سهلة الاستخدام. يتلقى المتعلمون تقييمات مستمرة لأدائهم وتوجيهات للتحسين. يتم توفير مساحة للمناقشة مع المدربين والزملاء لتبادل الأفكار وحل الأسئلة.",
  },
  {
    id: 3,
    icon: "hand-prayer",
    iconAlt: "أيقونة تواصل وتعاون",
    title: "تواصل وتعاون",
    description:
      "توفر المنصة وسائل تواصل وتعاون فعّالة بين المتعلمين. يمكنهم التواصل مع المدربين والخبراء في المجال والتفاعل مع زملائهم من خلال منتديات النقاش والدروس المباشرة.",
  },
  {
    id: 4,
    icon: "bend-tool",
    iconAlt: "أيقونة تجربة تعلم مرنة",
    title: "تجربة تعلم مرنة",
    description:
      "تمكن المنصة المتعلمين من الوصول إلى المحتوى التعليمي في أي وقت ومن أي مكان. يمكنهم تنظيم جدولهم الزمني بناءً على احتياجاتهم الشخصية والتعلم في وتيرة تناسبهم.",
  },
  {
    id: 5,
    icon: "award-05",
    iconAlt: "أيقونة شهادات معتمدة",
    title: "شهادات معتمدة",
    description:
      "بعد اجتياز الدورة التعليمية بنجاح، يحصل المتعلمون على شهادة معتمدة من مجمع الملك سلمان العالمي للغة العربية ممثلة في شعار المنصة (أهلًا بسهلا) تثبت إتقانهم للمهارات المكتسبة. تعتبر هذه الشهادات قيمة في سوق العمل وتعزز فرص الحصول على وظائف أفضل.",
  },
  {
    id: 6,
    icon: "book-open-02",
    iconAlt: "أيقونة محتوى تعليمي متنوع",
    title: "محتوى تعليمي متنوع",
    description:
      "تقدم المنصة مجموعة واسعة من الدورات التعليمية في مجالات اللغة العربية مثل تدريب المعلمين، برامج معالجة اللغات الطبيعية الأعمال، التدريب على اختبار همزة، الكتابة الإدارية وغيرها. يتم تطوير المحتوى بواسطة خبراء في المجال ومقسم إلى وحدات تعليمية سهلة الاستيعاب.",
  },
  {
    id: 7,
    icon: "user-group-02",
    iconAlt: "أيقونة تواجد مجتمع تعليمي لغوي",
    title: "تواجد مجتمع تعليمي لغوي",
    description:
      "تسعى المنصة لبناء مجتمع تعليمي نشط وملهم. يتم تنظيم ورش العمل والندوات والفعاليات الأخرى لتعزيز التواصل والتعاون بين المتعلمين وتمكينهم من توسيع شبكة معارفهم.",
  },
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
    <article className="card !border-none bg-[#E5E7EB]">
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
        className="bg-color-grey-50 cta-bg-logo "
        aria-labelledby="test-sections-title"
      >
        <div className="content !py-[40px] xl:!py-[128px] !flex flex-col gap-[24px] md:gap-[32px] relative z-10">
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
                  iconClass="white-icon"
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
                  className="card items-center text-center gap-[16px] !border-none !bg-[#F9FAFB]"
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
                  <p className="text-md-semibold font-semibold text-[#101828]">
                    {feature.title}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>

        {/* 3 Week Progress Items */}
        <div
          className="grid grid-cols-3 gap-[16px] !p-[16px] bg-[#F9FAFB] rounded-lg"
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
              <p className="text-md-semibold font-bold text-center text-[#101828]">
                {week.title}
              </p>
              {/* Progress Bars */}
              <div
                className="w-full h-[8px] rounded-full bg-[#D1FADF] overflow-hidden"
                role="progressbar"
                aria-label={`تقدم ${week.title}`}
                aria-valuenow={100}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div className="h-full w-full bg-[#1B8354] rounded-full" />
              </div>
              <div className="flex flex-row gap-[12px] items-center w-full">
                <div
                  className="w-full h-[8px] rounded-full bg-[#D1FADF] overflow-hidden"
                  role="progressbar"
                  aria-label={`تقدم إضافي ${week.title}`}
                  aria-valuenow={0}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div className="h-full w-full bg-[#E5E7EB] rounded-full" />
                </div>
                <div
                  className="w-full h-[8px] rounded-full bg-[#D1FADF] overflow-hidden"
                  role="progressbar"
                  aria-label={`تقدم إضافي ${week.title}`}
                  aria-valuenow={0}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div className="h-full w-full bg-[#E5E7EB] rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ====================================================================
          Section 4: Target Audience (الفئة المستهدفة)
          ==================================================================== */}
      <section
        className="relative bg-[#074D31]"
        aria-labelledby="target-audience-title"
      >
        <div
          className="absolute inset-0 opacity-[0.2]"
          aria-hidden="true"
          style={{ backgroundImage: "url('/assets/image/bg-pattern.png')", backgroundSize: "inherit", backgroundPosition: "center" }}
        />
        <div className="content !py-[40px] xl:!py-[80px] !flex flex-col gap-[24px] md:gap-[32px] relative z-10">
          <div className="flex flex-col gap-[16px] items-start">
            <h2
              id="target-audience-title"
              className="display-sm-bold text-white"
            >
              الفئة المستهدفة
            </h2>
            <p className="text-md-regular text-[#fff]">
              تحظى اختبارات همزة بثقة بعض المؤسسات حول العالم تستهدف هذه الدورة
              الراغبين في التقديم لاختبار همزة .
            </p>
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-[16px]"
            role="list"
            aria-label="الفئات المستهدفة"
          >
            {TARGET_AUDIENCE.map((item) => (
              <article
                key={item.id}
                role="listitem"
                className="card !border-none items-center text-center gap-[16px]"
              >
                <div className="circular-green-number">
                  <span>{item.id}</span>
                </div>
                <p className="text-md-semibold text-[#101828]">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          Section 5: Features (الميزات)
          ==================================================================== */}
      <section
        className="!py-[40px] xl:!py-[80px] !flex flex-col gap-[24px] md:gap-[32px]"
        aria-labelledby="features-title"
      >
        <div className="content !flex flex-col gap-[16px] md:gap-[32px]">
          <h2 id="features-title" className="display-sm-bold text-start">
            الميزات
          </h2>

          {/* Top Row: 4 cards */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[16px]"
            role="list"
            aria-label="ميزات المنصة"
          >
            {FEATURES.slice(0, 4).map((feature) => (
              <article
                key={feature.id}
                role="listitem"
                className="card"
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
                <div className="flex flex-col gap-[8px]">
                  <h3 className="text-lg-bold text-[#101828]">{feature.title}</h3>
                  <p className="text-md-regular text-[#475467]">
                    {feature.description}
                  </p>
                </div>
              </article>
            ))}
          </div>

          {/* Bottom Row: 3 cards */}
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-[16px]"
            role="list"
            aria-label="ميزات إضافية"
          >
            {FEATURES.slice(4).map((feature) => (
              <article
                key={feature.id}
                role="listitem"
                className="card"
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
                <div className="flex flex-col gap-[8px]">
                  <h3 className="text-lg-bold text-[#101828]">{feature.title}</h3>
                  <p className="text-md-regular text-[#475467]">
                    {feature.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}