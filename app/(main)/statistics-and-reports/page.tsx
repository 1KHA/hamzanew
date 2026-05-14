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
import { getReportsData } from "./_data/reportsData";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { getTranslations } from "@/app/_lib/getTranslations";
import { parseStatisticsCSV } from "@/app/_lib/statistics-csv-parser";
import { st } from "@/app/_lib/static-text-server";

/* ==========================================================================
   Metadata
   ========================================================================== */

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = cookieStore.get("lang")?.value.startsWith("en") ? "en" : "ar";
  return {
    title: st("statisticsAndReports", "metaTitle", locale),
    description: st("statisticsAndReports", "metaDescription", locale),
  };
}

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
  const cookieStore = await cookies();
  const locale = cookieStore.get("lang")?.value || "ar-SA";
  const staticLocale = locale.startsWith("en") ? "en" : "ar";

  const [data, translations] = await Promise.all([
    getStatisticsAndReportsData(),
    getTranslations().catch((err) => {
      console.error("[StatisticsAndReports] Failed to fetch translations:", err);
      return null;
    }),
  ]);

  const heroConfig = {
    title: data?.header?.title || st("statisticsAndReports", "heroTitle", staticLocale),
    description:
      data?.header?.description || st("statisticsAndReports", "heroDescription", staticLocale),
    bgColor: "#ffffff",
    breadcrumbs: [
      { label: "hamza-navigation-menu-home", path: "/" },
      { label: "hamza-navigation-menu-research", disabled: true },
      { label: "hamza-statistics", disabled: true },
    ],
  };

  // Statistics data source switch
  const statsSource = process.env.STATISTICS_SOURCE || "liferay";
  let csvData = null;
  if (statsSource === "csv") {
    try {
      csvData = parseStatisticsCSV();
      console.log(`[StatsReports] CSV statistics loaded: ${csvData.countryStats.length} countries, ${csvData.examTypeStats.length} exam types`);
    } catch (err) {
      console.error("[StatsReports] Failed to parse statistics CSV:", err);
    }
  }

  const reports = data?.reports || getReportsData(staticLocale);
  const statistics = data?.statistics || [
    { numberTitle: "1.5k", descriptionText: st("statisticsAndReports", "statTestCenters", staticLocale) },
    { numberTitle: "12", descriptionText: st("statisticsAndReports", "statNationalities", staticLocale) },
    { numberTitle: "22", descriptionText: st("statisticsAndReports", "statCountries", staticLocale) },
    { numberTitle: "1.5M", descriptionText: st("statisticsAndReports", "statTestedGlobally", staticLocale) },
  ];

  return (
    <>
      <PageHero
        heroMap={{ "/statistics-and-reports": heroConfig }}
        defaultRoute="/statistics-and-reports"
        breadcrumbsMax={3}
        translations={translations || undefined}
      />

      <main aria-label={st("statisticsAndReports", "ariaPage", staticLocale)}>
        <ReportsListing initialReports={reports} />

        {/* Statistics Section */}
        <div className="bg-neutral-50">
          <section
            className="section-spacing-5xl custom-container gap-[32px] !flex flex-col "
            aria-label={st("statisticsAndReports", "ariaPage", staticLocale)}
          >
            <div aria-label={st("statisticsAndReports", "ariaPage", staticLocale)}>
              <GlobalStatisticsSection statistics={statistics} csvData={csvData} />
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
