/**
 * Statistics and Reports Layout
 *
 * Provides the layout structure with PageHero for breadcrumbs and title.
 */

import type { ReactNode } from "react";
import { Metadata } from "next";
import PageHero from "../components/page-hero/PageHero";
import { heroMap } from "./_hero/heroMap";

/* ==========================================================================
   Metadata
   ========================================================================== */

export const metadata: Metadata = {
  title: "تقارير واحصائيات",
  description:
    "تقارير واحصائيات موثوقة قائمة على منهجيات علمية لاختبارات همزة",
};

/* ==========================================================================
   Layout Component
   ========================================================================== */

export default function StatisticsAndReportsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <PageHero
        heroMap={heroMap}
        defaultRoute="/statistics-and-reports"
        breadcrumbsMax={5}
      />
      <section>{children}</section>
    </>
  );
}
