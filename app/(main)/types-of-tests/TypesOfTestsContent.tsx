
import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "../../components/scroll-reveal/ScrollReveal";
import { st } from "@/app/_lib/static-text-server";

/* ==========================================================================
   Types
   ========================================================================== */

interface TestQuestionSet {
  sectionTitleText: string;
  sectionDescriptionText: string;
  targetGroupText: string;
  targetGroupDescription: string;
  testQuestionsTitleText: string;
  testQuestionsDescriptionText: string;
  setOfTestsFieldSet: Array<{
    testNameText: string;
    testParagraph: string;
  }>;
  totalText: string;
  testDurationTitleText: string;
  testDurationText: string;
  testTotalDurationText: string;
  AFatefulTestText: string;
}

interface TypesOfTestsData {
  title: string;
  descriptionText: string;
  bookATestText: string;
  testQuestionsSetList: TestQuestionSet[];
}

/* ==========================================================================
   Props
   ========================================================================== */

interface TypesOfTestsContentProps {
  data: TypesOfTestsData;
  locale: "ar" | "en";
}

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

function QuestionRow({ label, count }: { label: string; count: string }) {
  return (
    <div className="question-row">
      <p className="text-md-medium">{label}</p>
      <p className="text-md-regular text-gray">({count})</p>
    </div>
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

/* Index-based mappings (tests always come in same order: Academic, General, Placement, Vocabulary) */
const ICONS = ["mortarboard-01", "glasses", "star", "book-02"];
const INFO_LINKS = [
  "/types-of-tests/hamza-academic-test",
  "/types-of-tests/hamza-general-test",
  "/types-of-tests/hamza-placement-test",
  "/types-of-tests/hamza-vocabulary-test",
];

function TestCardComponent({ test, index, locale }: { test: TestQuestionSet; index: number; locale: "ar" | "en" }) {
  const icon = ICONS[index] || "star";
  const infoLink = INFO_LINKS[index] || "/types-of-tests";

  // Format duration
  const formatDuration = (text: string) => {
    const match = text.match(/(\d+)/);
    if (match) {
      const minutes = parseInt(match[1]);
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return {
        minutes: minutes,
        hours: hours > 0 ? `${hours}:${remainingMinutes.toString().padStart(2, '0')}` : `00:${remainingMinutes.toString().padStart(2, '0')}`
      };
    }
    return { minutes: 0, hours: "00:00" };
  };

  const duration = formatDuration(test.testDurationText);

  return (
    <article className="card w-full" aria-labelledby={`test-title-${index}`}>
      <div className="flex flex-col gap-[16px] h-[190px]">
        <div className="circular-green-number" aria-hidden="true">
          <Image
            src={`/assets/icons/stroke-standard/${icon}-stroke-rounded.svg`}
            alt={test.sectionTitleText}
            width={24}
            height={24}
            unoptimized
            className="inline-block white-icon"
          />
        </div>

        <div className="card-content flex-1 flex flex-col items-start text-start">
          <h3 id={`test-title-${index}`} className="text-lg-bold">
            {test.sectionTitleText}
          </h3>
          <p className="text-md-regular">{test.sectionDescriptionText}</p>
        </div>

        <hr aria-hidden="true" />
      </div>

      <div className="card-info-sections">
        <InfoSection
          iconSrc="/assets/icons/stroke-standard/target-02-stroke-rounded.svg"
          iconAlt={st("typesOfTests", "targetGroupIconAlt", locale)}
          label={test.targetGroupText}
        >
          <p className="text-md-medium">{test.targetGroupDescription}</p>
        </InfoSection>

        <InfoSection
          iconSrc="/assets/icons/stroke-standard/message-question-stroke-rounded.svg"
          iconAlt={st("typesOfTests", "questionsIconAlt", locale)}
          label={test.testQuestionsTitleText}
        >
          {test.testQuestionsDescriptionText ? (
            <p className="text-md-medium">{test.testQuestionsDescriptionText}</p>
          ) : test.setOfTestsFieldSet && test.setOfTestsFieldSet.length > 0 ? (
            <div className="questions-list">
              {test.setOfTestsFieldSet.map((item, i) => (
                item.testNameText && item.testParagraph && (
                  <QuestionRow 
                    key={i} 
                    label={item.testNameText} 
                    count={item.testParagraph} 
                  />
                )
              ))}
              {test.totalText && (
                <QuestionRow
                  label={st("typesOfTests", "totalLabel", locale)}
                  count={test.totalText.replace(/(المجموع\s*:\s*)/, "")}
                />
              )}
            </div>
          ) : null}
        </InfoSection>

        <InfoSection
          iconSrc="/assets/icons/stroke-standard/time-02-stroke-rounded.svg"
          iconAlt={st("typesOfTests", "durationIconAlt", locale)}
          label={test.testDurationTitleText}
        >
          <div className="duration-row">
            <p className="text-md-medium">({test.testDurationText})</p>
          </div>
        </InfoSection>
      </div>

      <div className="flex flex-col btn-card !gap-[8px]">
        <Link
          href={infoLink}
          className="link-neutral !underline text-[14px]"
          aria-label={`${st("typesOfTests", "moreInfoAria", locale)} ${test.sectionTitleText}`}
        >
          {st("typesOfTests", "moreInfo", locale)}
        </Link>
      </div>
    </article>
  );
}

/* ==========================================================================
   Main Export
   ========================================================================== */

export default function TypesOfTestsContent({ data, locale }: TypesOfTestsContentProps) {
  return (
    <>
      {/* ── Cards Section ─────────────────────────────────────────── */}
      <ScrollReveal direction="up" delay={r(0)} duration={DURATION} amount={0}>
        <h1 id="comparison-title" className="display-sm-bold">
          {data?.title || st("typesOfTests", "pageTitleFallback", locale)}
        </h1>
      </ScrollReveal>

      {data?.descriptionText && (
        <ScrollReveal direction="up" delay={r(0.5)} duration={DURATION} amount={0}>
          <p className="text-md-regular">{data.descriptionText}</p>
        </ScrollReveal>
      )}

      <div
        className="tests-comparison-grid"
        role="list"
        aria-label={st("typesOfTests", "listAria", locale)}
      >
        {data?.testQuestionsSetList?.map((test, i) => (
          <div key={i} role="listitem">
            <ScrollReveal
              direction="up"
              delay={r(i + 1)}
              duration={DURATION}
              amount={0}
            >
              <TestCardComponent test={test} index={i} locale={locale} />
            </ScrollReveal>
          </div>
        ))}
      </div>

      {/* ── Video Section ───────────────────────────────────────────
      Hidden temporarily per request.
      <div className="video-section" aria-labelledby="registration-title">
        <ScrollReveal direction="up" delay={0} duration={DURATION} amount={AMOUNT}>
          <h2 id="registration-title" className="display-sm-bold">
            {st("typesOfTests", "videoTitle", locale)}
          </h2>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.2} duration={DURATION} amount={AMOUNT}>
          <div className="video-player">
            <video
              className="video-player__element"
              controls
              preload="metadata"
              aria-label={st("typesOfTests", "videoAria", locale)}
            >
              <track kind="captions" srcLang={locale} label={st("typesOfTests", "videoTrackLabel", locale)} />
              {st("typesOfTests", "videoFallback", locale)}
            </video>
          </div>
        </ScrollReveal>
      </div>
      */}
    </>
  );
}
