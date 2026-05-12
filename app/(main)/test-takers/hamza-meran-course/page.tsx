/**
 * Hamza Meran Course Page
 *
 * This page displays comprehensive information about the Hamza Meran Course,
 * including course sections and registration information.
 *
 * @accessibility
 * - All images have descriptive alt text
 * - Proper heading hierarchy (h1, h2, h3)
 * - Screen reader support with role and aria attributes
 */

import "@/app/components/card/card.css";
import "@/app/styles/Button.css";
import Button from "../../../components/button/Button";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { st } from "@/app/_lib/static-text-server";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = cookieStore.get("lang")?.value.startsWith("en") ? "en" : "ar";
  return {
    title: st("meranCourse", "metaTitle", locale),
    description: st("meranCourse", "metaDescription", locale),
  };
}

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
 * Hamza Meran Course Page Component
 * Main entry point for the course information page
 */
export default async function HamzaMeranCoursePage() {
  const cookieStore = await cookies();
  const locale = cookieStore.get("lang")?.value.startsWith("en") ? "en" : "ar";

  /**
   * Data for the four course sections
   */
  const COURSE_SECTIONS: CourseSection[] = [
    {
      id: 1,
      icon: "headphones",
      iconAlt: st("meranCourse", "sectionListeningIconAlt", locale),
      title: st("meranCourse", "sectionListeningTitle", locale),
      description: st("meranCourse", "sectionListeningDesc", locale),
    },
    {
      id: 2,
      icon: "book-open-01",
      iconAlt: st("meranCourse", "sectionReadingIconAlt", locale),
      title: st("meranCourse", "sectionReadingTitle", locale),
      description: st("meranCourse", "sectionReadingDesc", locale),
    },
    {
      id: 3,
      icon: "pencil-edit-02",
      iconAlt: st("meranCourse", "sectionWritingIconAlt", locale),
      title: st("meranCourse", "sectionWritingTitle", locale),
      description: st("meranCourse", "sectionWritingDesc", locale),
    },
    {
      id: 4,
      icon: "message-01",
      iconAlt: st("meranCourse", "sectionSpeakingIconAlt", locale),
      title: st("meranCourse", "sectionSpeakingTitle", locale),
      description: st("meranCourse", "sectionSpeakingDesc", locale),
    },
  ];

  /**
   * Data for the duration section feature cards
   */
  const DURATION_FEATURES = [
    {
      id: 1,
      icon: "cells",
      iconAlt: st("meranCourse", "durationFeature1Alt", locale),
      title: st("meranCourse", "durationFeature1Title", locale),
    },
    {
      id: 2,
      icon: "star-half",
      iconAlt: st("meranCourse", "durationFeature2Alt", locale),
      title: st("meranCourse", "durationFeature2Title", locale),
    },
    {
      id: 3,
      icon: "pendulum",
      iconAlt: st("meranCourse", "durationFeature3Alt", locale),
      title: st("meranCourse", "durationFeature3Title", locale),
    },
    {
      id: 4,
      icon: "quiz-02",
      iconAlt: st("meranCourse", "durationFeature4Alt", locale),
      title: st("meranCourse", "durationFeature4Title", locale),
    },
  ];

  /**
   * Data for the three course weeks
   */
  const WEEKS = [
    { id: 1, number: "1", title: st("meranCourse", "week1Title", locale) },
    { id: 2, number: "2", title: st("meranCourse", "week2Title", locale) },
    { id: 3, number: "3", title: st("meranCourse", "week3Title", locale) },
  ];

  /**
   * Data for the target audience cards
   */
  const TARGET_AUDIENCE = [
    { id: 1, text: st("meranCourse", "audience1", locale) },
    { id: 2, text: st("meranCourse", "audience2", locale) },
    { id: 3, text: st("meranCourse", "audience3", locale) },
  ];

  /**
   * Data for the features section
   */
  const FEATURES = [
    {
      id: 1,
      icon: "touch-interaction-04",
      iconAlt: st("meranCourse", "feature1IconAlt", locale),
      title: st("meranCourse", "feature1Title", locale),
      description: st("meranCourse", "feature1Desc", locale),
    },
    {
      id: 2,
      icon: "mentoring",
      iconAlt: st("meranCourse", "feature2IconAlt", locale),
      title: st("meranCourse", "feature2Title", locale),
      description: st("meranCourse", "feature2Desc", locale),
    },
    {
      id: 3,
      icon: "hand-prayer",
      iconAlt: st("meranCourse", "feature3IconAlt", locale),
      title: st("meranCourse", "feature3Title", locale),
      description: st("meranCourse", "feature3Desc", locale),
    },
    {
      id: 4,
      icon: "bend-tool",
      iconAlt: st("meranCourse", "feature4IconAlt", locale),
      title: st("meranCourse", "feature4Title", locale),
      description: st("meranCourse", "feature4Desc", locale),
    },
    {
      id: 5,
      icon: "award-05",
      iconAlt: st("meranCourse", "feature5IconAlt", locale),
      title: st("meranCourse", "feature5Title", locale),
      description: st("meranCourse", "feature5Desc", locale),
    },
    {
      id: 6,
      icon: "book-open-02",
      iconAlt: st("meranCourse", "feature6IconAlt", locale),
      title: st("meranCourse", "feature6Title", locale),
      description: st("meranCourse", "feature6Desc", locale),
    },
    {
      id: 7,
      icon: "user-group-02",
      iconAlt: st("meranCourse", "feature7IconAlt", locale),
      title: st("meranCourse", "feature7Title", locale),
      description: st("meranCourse", "feature7Desc", locale),
    },
  ];

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
                        alt={st("meranCourse", "courseBadge", locale)}
                        width={16}
                        height={16}
                        loading="eager"
                        className="inline-block green-icon"
                        src="/assets/icons/stroke-standard/mortarboard-02-stroke-rounded.svg"
                      />
                    </span>
                    {st("meranCourse", "courseBadge", locale)}
                  </p>

                  {/* Main Title - Visible on large screens */}
                  <h1
                    id="test-sections-title"
                    className="display-sm-bold hidden xl:block"
                  >
                    {st("meranCourse", "sectionsHeading", locale)}
                    <img
                      alt={st("meranCourse", "sectionsArrowAlt", locale)}
                      width={38}
                      height={38}
                      loading="eager"
                      className="inline-block flip-rtl"
                      src="/assets/icons/stroke-standard/arrow-left-02-stroke-rounded.svg"
                    />
                  </h1>

                  {/* Course Description */}
                  <p className="text-md-regular">
                    {st("meranCourse", "courseDescription", locale)}
                  </p>
                </div>
              </header>

              {/* Register Button */}
              <div>
                <a href="/test-takers/hamza-meran-course/player">
                  <Button
                    label={st("meranCourse", "watchLessonsBtn", locale)}
                    variant="primary-brand"
                    size="lg"
                    icon="arrow-up-right-01"
                    iconClass="white-icon"
                  />
                </a>
              </div>
            </div>

            {/* Right Column: Course Sections */}
            <div className="flex flex-col gap-[16px]">
              {/* Title - Visible on small and medium screens */}
              <h2 className="display-sm-bold block xl:hidden">
                {st("meranCourse", "sectionsHeading", locale)}
              </h2>

              {/* Course Sections Cards Grid */}
              <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-[16px]"
                role="list"
                aria-label={st("meranCourse", "sectionsListAria", locale)}
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
              {st("meranCourse", "durationHeading", locale)}
            </h2>
            <div className="flex flex-col gap-[12px]">
              <p className="text-md-regular text-[#475467]">
                {st("meranCourse", "durationDesc1", locale)}
              </p>
              <p className="text-md-regular text-[#475467]">
                {st("meranCourse", "durationDesc2", locale)}
              </p>
            </div>
          </div>

          {/* Left Column (RTL): Feature Cards + Weeks */}
          <div className="flex flex-col gap-[32px]">
            {/* 4 Feature Cards */}
            <div
              className="grid grid-cols-2 md:grid-cols-4 gap-[16px]"
              role="list"
              aria-label={st("meranCourse", "durationFeaturesAria", locale)}
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
          aria-label={st("meranCourse", "weeksAria", locale)}
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
                aria-label={st("meranCourse", "progressAria", locale).replace("{week}", week.title)}
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
                  aria-label={st("meranCourse", "additionalProgressAria", locale).replace("{week}", week.title)}
                  aria-valuenow={0}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div className="h-full w-full bg-[#E5E7EB] rounded-full" />
                </div>
                <div
                  className="w-full h-[8px] rounded-full bg-[#D1FADF] overflow-hidden"
                  role="progressbar"
                  aria-label={st("meranCourse", "additionalProgressAria", locale).replace("{week}", week.title)}
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
          Section 4: Target Audience
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
              {st("meranCourse", "targetAudienceHeading", locale)}
            </h2>
            <p className="text-md-regular text-[#fff]">
              {st("meranCourse", "targetAudienceDesc", locale)}
            </p>
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-[16px]"
            role="list"
            aria-label={st("meranCourse", "targetAudienceListAria", locale)}
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
          Section 5: Features
          ==================================================================== */}
      <section
        className="!py-[40px] xl:!py-[80px] !flex flex-col gap-[24px] md:gap-[32px]"
        aria-labelledby="features-title"
      >
        <div className="content !flex flex-col gap-[16px] md:gap-[32px]">
          <h2 id="features-title" className="display-sm-bold text-start">
            {st("meranCourse", "featuresHeading", locale)}
          </h2>

          {/* Top Row: 4 cards */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[16px]"
            role="list"
            aria-label={st("meranCourse", "featuresListAria", locale)}
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
            aria-label={st("meranCourse", "extraFeaturesListAria", locale)}
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
