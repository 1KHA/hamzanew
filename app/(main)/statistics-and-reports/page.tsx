/**
 * Statistics and Reports Page
 *
 * Displays a searchable, filterable grid of reports and statistics
 * with pagination support.
 * Fetches localized data from /api/statistics-and-reports based on the lang cookie.
 *
 * @accessibility
 * - Uses semantic HTML with proper landmarks (main, section)
 * - Search input has proper label and aria attributes
 * - Results are announced to screen readers via aria-live
 * - Filter controls are keyboard accessible
 * - Card grid uses proper semantic structure
 * - Pagination has proper navigation labels
 */

import type { ReactElement } from "react";
import PageHero from "@/app/components/page-hero/PageHero";
import GlobalStatisticsSection from "@/app/components/global-statistics-section/GlobalStatisticsSection";
import ReportsListing from "./ReportsListing";
import { reportsData } from "./_data/reportsData";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { getTranslations } from "@/app/_lib/getTranslations";

/* ==========================================================================
   Metadata
   ========================================================================== */

export const metadata: Metadata = {
  title: "تقارير واحصائيات",
  description:
    'نقدم تقارير وإحصاءات موثوقة، قائمة على منهجيات علمية، تعكس بدقة نتائج اختبارات "همزة" ومؤشراتها. تدعم هذه البيانات الباحثين وصنّاع القرار في القطاعين الأكاديمي والمهني، وتُسهم في تطوير السياسات التعليمية، وإثراء الدراسات المقارنة، وبناء رؤى استراتيجية عالمية لقياس كفاءة اللغة العربية.',
};

/* ==========================================================================
   Static Fallback Configuration
   ========================================================================== */

const STATIC_HERO_CONFIG = {
  title: "تقارير واحصائيات",
  description:
    'نقدم تقارير وإحصاءات موثوقة، قائمة على منهجيات علمية، تعكس بدقة نتائج اختبارات "همزة" ومؤشراتها. تدعم هذه البيانات الباحثين وصنّاع القرار في القطاعين الأكاديمي والمهني، وتُسهم في تطوير السياسات التعليمية، وإثراء الدراسات المقارنة، وبناء رؤى استراتيجية عالمية لقياس كفاءة اللغة العربية.',
  bgColor: "#ffffff",
  breadcrumbs: [
    { label: "hamza-navigation-menu-home", path: "/" },
    { label: "hamza-navigation-menu-research", disabled: true },
    { label: "hamza-statistics", disabled: true },
  ],
};

const STATIC_STATISTICS = [
  { numberTitle: "1.5k", descriptionText: "مراكز الاختبار" },
  { numberTitle: "12", descriptionText: "عدد الجنسيات" },
  { numberTitle: "22", descriptionText: "عدد الدول" },
  { numberTitle: "1.5M", descriptionText: "مختبر عالميًا" },
];

/* ==========================================================================
   Data Fetching
   ========================================================================== */

async function getStatisticsAndReportsData() {
  try {
    const cookieStore = await cookies();
    const langCookie = cookieStore.get("lang")?.value || "ar-SA";

    const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const response = await fetch(
      `${baseURL}/api/statistics-and-reports`,
      {
        cache: "no-store",
        headers: {
          Cookie: `lang=${langCookie}`,
        },
      }
    );

    if (!response.ok) {
      console.error(
        "Failed to fetch statistics and reports data:",
        response.status
      );
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching statistics and reports data:", error);
    return null;
  }
}

/* ==========================================================================
   Main Page Component
   ========================================================================== */

/**
 * StatisticsAndReportsPage Component
 *
 * Component that renders the page hero, reports listing and statistics section.
 */
export default async function StatisticsAndReportsPage(): Promise<ReactElement> {
  const [data, translations] = await Promise.all([
    getStatisticsAndReportsData(),
    getTranslations().catch((err) => {
      console.error("[StatisticsAndReports] Failed to fetch translations:", err);
      return null;
    }),
  ]);

  const heroConfig = {
    title: data?.header?.title || STATIC_HERO_CONFIG.title,
    description:
      data?.header?.description || STATIC_HERO_CONFIG.description,
    bgColor: STATIC_HERO_CONFIG.bgColor,
    breadcrumbs: STATIC_HERO_CONFIG.breadcrumbs,
  };

  const reports = data?.reports || reportsData;
  const statistics = data?.statistics || STATIC_STATISTICS;

  return (
    <>
      <PageHero
        heroMap={{ "/statistics-and-reports": heroConfig }}
        defaultRoute="/statistics-and-reports"
        breadcrumbsMax={3}
        translations={translations || undefined}
      />

      <main aria-label="صفحة التقارير والاحصائيات">
        <ReportsListing initialReports={reports} />

        {/* Statistics Section */}
        <div className="bg-neutral-50">
          <section
            className="section-spacing-5xl custom-container gap-[32px] !flex flex-col "
            aria-label="إحصائيات همزة"
          >
            <div aria-label="الإحصائيات العامة">
              <GlobalStatisticsSection statistics={statistics} />
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
