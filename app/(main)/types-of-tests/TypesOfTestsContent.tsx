"use client";

import Image from "next/image";
import Link from "next/link";
import Button from "../../components/button/Button";
import ScrollReveal from "../../components/scroll-reveal/ScrollReveal";
import { TESTS_DATA, type TestCard, type QuestionBreakdown } from "./data";

/* ==========================================================================
   Timing helpers
   ========================================================================== */

const STAGGER  = 0.15;
const DURATION = 0.9;
const AMOUNT   = 0.3;

const r = (i: number) => i * STAGGER;

/* ==========================================================================
   Sub Components
   ========================================================================== */

function QuestionRow({ label, count }: { label: string; count: number }) {
  return (
    <div className="question-row">
      <p className="text-md-medium">{label}</p>
      <p className="text-md-regular text-gray">({count}) فقرة</p>
    </div>
  );
}

function QuestionBreakdownList({ questions }: { questions: QuestionBreakdown }) {
  return (
    <>
      <QuestionRow label="أسئلة الاستماع" count={questions.listening} />
      <QuestionRow label="أسئلة القراءة"  count={questions.reading}   />
      <QuestionRow label="أسئلة الكتابة"  count={questions.writing}   />
      <QuestionRow label="أسئلة التحدث"   count={questions.speaking}  />
      <QuestionRow label="المجموع"         count={questions.total}     />
    </>
  );
}

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
    <div className="info-section">
      <p className="text-sm-bold text-green-700 info-section__label">
        <Image
          src={iconSrc}
          alt={iconAlt}
          width={20}
          height={20}
          unoptimized
          className="inline-block green-icon"
        />
        {label}
      </p>
      {children}
    </div>
  );
}

function TestCardComponent({ test }: { test: TestCard }) {
  return (
    <article className="card w-full" aria-labelledby={`test-title-${test.id}`}>
      <div className="flex flex-col gap-[16px] h-[190px]">
        <div className="circular-green-number" aria-hidden="true">
          <Image
            src={`/assets/icons/stroke-standard/${test.icon}-stroke-rounded.svg`}
            alt={test.iconAlt}
            width={24}
            height={24}
            unoptimized
            className="inline-block white-icon"
          />
        </div>

        <div className="card-content flex-1 flex flex-col items-start text-start">
          <h3 id={`test-title-${test.id}`} className="text-lg-bold">
            {test.title}
          </h3>
          <p className="text-md-regular">{test.description}</p>
        </div>

        <hr aria-hidden="true" />
      </div>

      <div className="card-info-sections">
        <InfoSection
          iconSrc="/assets/icons/stroke-standard/target-02-stroke-rounded.svg"
          iconAlt="أيقونة هدف - الفئة المستهدفة"
          label="الفئة المستهدفة"
        >
          <p className="text-md-medium">{test.targetAudience}</p>
        </InfoSection>

        <InfoSection
          iconSrc="/assets/icons/stroke-standard/message-question-stroke-rounded.svg"
          iconAlt="أيقونة سؤال - عدد أسئلة الاختبار"
          label="عدد أسئلة الاختبار"
        >
          {test.questionsText ? (
            <p className="text-md-medium">{test.questionsText}</p>
          ) : (
            test.questions && <QuestionBreakdownList questions={test.questions} />
          )}
        </InfoSection>

        <InfoSection
          iconSrc="/assets/icons/stroke-standard/time-02-stroke-rounded.svg"
          iconAlt="أيقونة ساعة - مدة الاختبار"
          label="مدة الاختبار"
        >
          <div className="duration-row">
            <p className="text-md-medium">({test.duration.minutes}) دقيقة</p>
            <p className="text-md-regular text-gray">({test.duration.hours}) ساعة</p>
          </div>
        </InfoSection>
      </div>

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
   Main Export
   ========================================================================== */

export default function TypesOfTestsContent() {
  return (
    <>
      {/* ── Cards Section ─────────────────────────────────────────── */}
      <ScrollReveal direction="up" delay={r(0)} duration={DURATION} amount={0}>
        <h1 id="comparison-title" className="display-sm-bold">
          قارن بين اختبارات همزة
        </h1>
      </ScrollReveal>

      <div
        className="tests-comparison-grid"
        role="list"
        aria-label="قائمة اختبارات همزة"
      >
        {TESTS_DATA.map((test, i) => (
          <div key={test.id} role="listitem">
            <ScrollReveal
              direction="up"
              delay={r(i + 1)}
              duration={DURATION}
              amount={0}
            >
              <TestCardComponent test={test} />
            </ScrollReveal>
          </div>
        ))}
      </div>

      {/* ── Video Section ─────────────────────────────────────────── */}
      <div className="video-section" aria-labelledby="registration-title">
        <ScrollReveal direction="up" delay={0} duration={DURATION} amount={AMOUNT}>
          <h2 id="registration-title" className="display-sm-bold">
            آلية التسجيل
          </h2>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.2} duration={DURATION} amount={AMOUNT}>
          <div className="video-player">
            <video
              className="video-player__element"
              controls
              poster="/assets/video/video-poster.jpg"
              preload="metadata"
              aria-label="فيديو شرح آلية التسجيل في اختبارات همزة"
            >
              <source src="/assets/video/registration-guide.mp4"  type="video/mp4"  />
              <source src="/assets/video/registration-guide.webm" type="video/webm" />
              <track kind="captions" srcLang="ar" label="العربية" />
              متصفحك لا يدعم تشغيل الفيديو.
            </video>
          </div>
        </ScrollReveal>
      </div>
    </>
  );
}
