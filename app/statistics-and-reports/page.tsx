/**
 * Statistics and Reports Page
 *
 * Displays a searchable, filterable grid of reports and statistics
 * with pagination support.
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

/* ==========================================================================
   Metadata
   ========================================================================== */

export const metadata: Metadata = {
  title: "تقارير واحصائيات",
  description:
    'نقدم تقارير وإحصاءات موثوقة، قائمة على منهجيات علمية، تعكس بدقة نتائج اختبارات "همزة" ومؤشراتها. تدعم هذه البيانات الباحثين وصنّاع القرار في القطاعين الأكاديمي والمهني، وتُسهم في تطوير السياسات التعليمية، وإثراء الدراسات المقارنة، وبناء رؤى استراتيجية عالمية لقياس كفاءة اللغة العربية.',
};
/* =====================  =====================================================
   Hero Configuration
   ========================================================================== */

const HERO_CONFIG = {
  title: "تقارير واحصائيات",
  description:
    'نقدم تقارير وإحصاءات موثوقة، قائمة على منهجيات علمية، تعكس بدقة نتائج اختبارات "همزة" ومؤشراتها. تدعم هذه البيانات الباحثين وصنّاع القرار في القطاعين الأكاديمي والمهني، وتُسهم في تطوير السياسات التعليمية، وإثراء الدراسات المقارنة، وبناء رؤى استراتيجية عالمية لقياس كفاءة اللغة العربية.',
  bgColor: "#ffffff",
  breadcrumbs: [
    { label: "الرئيسة", path: "/" },
    { label: "الأبحاث", disabled: true },
    { label: "تقارير واحصائيات", disabled: true },
  ],
};

/* ==========================================================================
   Main Page Component
   ========================================================================== */

/**
 * StatisticsAndReportsPage Component
 *
 * Component that renders the page hero, reports listing and statistics section.
 */
export default function StatisticsAndReportsPage(): ReactElement {
  return (
    <>
      <PageHero
        heroMap={{ "/statistics-and-reports": HERO_CONFIG }}
        defaultRoute="/statistics-and-reports"
        breadcrumbsMax={3}
      />

      <main aria-label="صفحة التقارير والاحصائيات">
        <ReportsListing initialReports={reportsData} />

        {/* Statistics Section */}
        <div className="bg-neutral-50">
          <section
            className="section-spacing-5xl custom-container gap-[32px] !flex flex-col "
            aria-label="إحصائيات همزة"
          >
            <div aria-label="الإحصائيات العامة">
              <GlobalStatisticsSection />
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
