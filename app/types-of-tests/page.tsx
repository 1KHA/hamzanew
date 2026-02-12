"use client";

/**
 * Types of Tests Comparison Page
 *
 * This page displays a comparison of all Hamza test types,
 * including test details, question counts, and registration links.
 *
 * @accessibility
 * - All images have descriptive alt text
 * - Proper heading hierarchy (h1, h2)
 * - Screen reader support with role and aria attributes
 * - Semantic HTML structure
 */

import "@/app/components/card/Card.css";
import "@/app/styles/Button.css";
import Button from "../components/button/Button";
import Link from "next/link";

/* ==========================================================================
   Types & Interfaces
   ========================================================================== */

/**
 * Interface for question breakdown by skill type
 */
interface QuestionBreakdown {
  listening: number;
  reading: number;
  writing: number;
  speaking: number;
  total: number;
}

/**
 * Interface for test duration information
 */
interface TestDuration {
  minutes: number;
  hours: string;
}

/**
 * Interface for test card data
 */
interface TestCard {
  id: number;
  icon: string;
  iconAlt: string;
  title: string;
  description: string;
  targetAudience: string;
  questions?: QuestionBreakdown;
  questionsText?: string;
  duration: TestDuration;
  registerLink: string;
  infoLink: string;
}

/* ==========================================================================
   Static Data
   ========================================================================== */

/**
 * Data for all Hamza test types
 */
const TESTS_DATA: TestCard[] = [
  {
    id: 1,
    icon: "glasses",
    iconAlt: "أيقونة نظارات - اختبار همزة العام",
    title: "اختبار همزة العام",
    description:
      "اختبار لقياس كفايات اللغة العربية للناطقين بغيرها للأغراض العامة.",
    targetAudience: "الناطقين بغير اللغة العربية",
    questions: {
      listening: 25,
      reading: 25,
      writing: 2,
      speaking: 5,
      total: 57,
    },
    duration: {
      minutes: 155,
      hours: "02:35",
    },
    registerLink: "/register/general",
    infoLink: "/types-of-tests/hamza-general-test",
  },
  {
    id: 2,
    icon: "star",
    iconAlt: "أيقونة نجمة - اختبار تحديد مستوى",
    title: "تحديد مستوى",
    description:
      "اختبار لتحديد مستوى الكفاية اللغوية العامة للناطقين بغير العربية، يُستخدم للالتحاق بالبرامج الأكاديمية",
    targetAudience:
      "الطلاب الناطقين بغير اللغة العربية الراغبون في تحديد مستواهم اللغوي لأغراض عامة",
    questions: {
      listening: 20,
      reading: 20,
      writing: 20,
      speaking: 20,
      total: 80,
    },
    duration: {
      minutes: 90,
      hours: "01:30",
    },
    registerLink: "/register/placement",
    infoLink: "/types-of-tests/hamza-placement-test",
  },
  {
    id: 3,
    icon: "book-02",
    iconAlt: "أيقونة كتاب - اختبار همزة المفردات",
    title: "همزة المفردات",
    description:
      "اختبار معياري لقياس مستويات المفردات العربية لدى الناطقين بغيرها",
    targetAudience: "الناطقين بغير اللغة العربية",
    questionsText:
      "يحتوي نموذج الاختبار على (150) فقرة، موزعة على خمسة مستويات من الصعوبة والشيوع.",
    duration: {
      minutes: 150,
      hours: "02:30",
    },
    registerLink: "/register/vocabulary",
    infoLink: "/types-of-tests/hamza-vocabulary-test",
  },
  {
    id: 4,
    icon: "mortarboard-01",
    iconAlt: "أيقونة قبعة تخرج - اختبار همزة الأكاديمي",
    title: "همزة الأكاديمي",
    description:
      "اختبار محوسب مُقنّن يقيس كفايات اللغة العربية للناطقين بغيرها للأغراض الأكاديمية.",
    targetAudience: "الناطقين بغير اللغة العربية",
    questions: {
      listening: 30,
      reading: 40,
      writing: 1,
      speaking: 4,
      total: 75,
    },
    duration: {
      minutes: 155,
      hours: "02:35",
    },
    registerLink: "/register/academic",
    infoLink: "/types-of-tests/hamza-academic-test",
  },
];

/* ==========================================================================
   Sub Components
   ========================================================================== */

/**
 * Question Breakdown Row Component
 * Displays a single row in the question breakdown list
 */
function QuestionRow({ label, count }: { label: string; count: number }) {
  return (
    <div className="flex gap-[14px]">
      <p className="text-md-semibold">{label}</p>
      <p className="text-md-regular">({count}) فقرة</p>
    </div>
  );
}

/**
 * Question Breakdown List Component
 * Displays the full breakdown of questions by skill type
 */
function QuestionBreakdownList({
  questions,
}: {
  questions: QuestionBreakdown;
}) {
  return (
    <>
      <QuestionRow label="أسئلة الاستماع" count={questions.listening} />
      <QuestionRow label="أسئلة القراءة" count={questions.reading} />
      <QuestionRow label="أسئلة الكتابة" count={questions.writing} />
      <QuestionRow label="أسئلة التحدث" count={questions.speaking} />
      <QuestionRow label="المجموع" count={questions.total} />
    </>
  );
}

/**
 * Info Section Component
 * Displays a labeled section with icon (target audience, questions, duration)
 */
function InfoSection({
  iconSrc,
  iconAlt,
  label,
  children,
}: {
  iconSrc: string;
  iconAlt: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-[8px]">
      <p className="text-sm-bold text-green-700 flex gap-[8px]">
        <img
          alt={iconAlt}
          width={20}
          height={20}
          loading="lazy"
          className="inline-block green-icon"
          src={iconSrc}
        />
        {label}
      </p>
      {children}
    </div>
  );
}

/**
 * Test Card Component
 * Displays individual test information in a card format
 */
function TestCardComponent({ test }: { test: TestCard }) {
  return (
    <article className="card w-full" aria-labelledby={`test-title-${test.id}`}>
      <div className="flex flex-col gap-[24px]">
        {/* Test Icon */}
        <div className="circular-green-number" aria-hidden="true">
          <img
            alt={test.iconAlt}
            width={24}
            height={24}
            loading="lazy"
            className="inline-block white-icon"
            src={`/assets/icons/stroke-standard/${test.icon}-stroke-rounded.svg`}
          />
        </div>

        {/* Test Title and Description */}
        <div className="card-content flex-1 flex flex-col items-start text-start">
          <h3 id={`test-title-${test.id}`} className="text-lg-semibold">
            {test.title}
          </h3>
          <p className="text-md-regular">{test.description}</p>
        </div>

        <hr aria-hidden="true" />

        {/* Target Audience Section */}
        <InfoSection
          iconSrc="/assets/icons/stroke-standard/target-02-stroke-rounded.svg"
          iconAlt="أيقونة هدف - الفئة المستهدفة"
          label="الفئة المستهدفة"
        >
          <p className="text-md-semibold">{test.targetAudience}</p>
        </InfoSection>

        {/* Questions Section */}
        <InfoSection
          iconSrc="/assets/icons/stroke-standard/message-question-stroke-rounded.svg"
          iconAlt="أيقونة سؤال - عدد أسئلة الاختبار"
          label="عدد أسئلة الاختبار"
        >
          {test.questionsText ? (
            <p className="text-md-semibold">{test.questionsText}</p>
          ) : (
            test.questions && (
              <QuestionBreakdownList questions={test.questions} />
            )
          )}
        </InfoSection>

        {/* Duration Section */}
        <InfoSection
          iconSrc="/assets/icons/stroke-standard/time-02-stroke-rounded.svg"
          iconAlt="أيقونة ساعة - مدة الاختبار"
          label="مدة الاختبار"
        >
          <div className="flex gap-[14px]">
            <p className="text-md-semibold">({test.duration.minutes}) دقيقة</p>
            <p className="text-md-regular">({test.duration.hours}) ساعة</p>
          </div>
        </InfoSection>
      </div>

      {/* Card Actions */}
      <div className="flex flex-col btn-card !gap-[8px]">
        <Button
          label="التسجيل في الاختبار"
          variant="primary-brand"
          size="lg"
          icon="arrow-up-right-01"
          iconClass="white-icon"
          className="w-full"
        />
        <Link
          href={test.infoLink}
          className="link-neutral !underline text-[14px]"
          aria-label={`المزيد من المعلومات عن ${test.title}`}
        >
          المزيد من المعلومات
        </Link>
      </div>
    </article>
  );
}

/* ==========================================================================
   Main Page Component
   ========================================================================== */

/**
 * Types of Tests Page Component
 * Main entry point for the test comparison page
 */
export default function TypesOfTestsPage() {
  return (
    <>
      {/* ====================================================================
          Section 1: Test Comparison Cards
          ==================================================================== */}
      <section className="bg-color-grey-50" aria-labelledby="comparison-title">
        <div className="content !py-[40px] md:!py-[80px] flex flex-col gap-[24px] md:gap-[32px]">
          {/* Section Title */}
          <h1 id="comparison-title" className="display-sm-bold">
            قارن بين اختبارات همزة
          </h1>

          {/* Tests Grid */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[24px]"
            role="list"
            aria-label="قائمة اختبارات همزة"
          >
            {TESTS_DATA.map((test) => (
              <div key={test.id} role="listitem">
                <TestCardComponent test={test} />
              </div>
            ))}
          </div>

          {/* ====================================================================
              Section 2: Registration Process Video
              ==================================================================== */}
          <div
            className="flex flex-col gap-[24px] md:gap-[32px] !py-[40px]"
            aria-labelledby="registration-title"
          >
            <h2 id="registration-title" className="display-sm-bold">
              آلية التسجيل
            </h2>

            {/* Video Player */}
            <div className="w-full rounded-[8px] md:rounded-[16px] overflow-hidden">
              <video
                className="w-full h-auto aspect-video object-cover"
                controls
                poster="/assets/video/video-poster.jpg"
                preload="metadata"
                aria-label="فيديو شرح آلية التسجيل في اختبارات همزة"
              >
                <source
                  src="/assets/video/registration-guide.mp4"
                  type="video/mp4"
                />
                <source
                  src="/assets/video/registration-guide.webm"
                  type="video/webm"
                />
                <track kind="captions" srcLang="ar" label="العربية" />
                متصفحك لا يدعم تشغيل الفيديو.
              </video>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
