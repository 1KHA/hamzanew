/**
 * Research Library Page
 *
 * Displays a searchable, filterable grid of research papers and studies
 * with pagination support.
 *
 * @accessibility
 * - Search input has proper label and aria attributes
 * - Results are announced to screen readers via aria-live
 * - Filter controls are keyboard accessible
 * - Card grid uses proper semantic structure
 * - Pagination has proper navigation labels
 */

import type { ReactElement } from "react";
import PageHero from "../components/page-hero/PageHero";
import ResearchLibraryListing from "./ResearchLibraryListing";
import { researchData } from "./_data/researchData";

/* ==========================================================================
   Hero Configuration
   ========================================================================== */

const HERO_CONFIG = {
  title: "مكتبة الابحاث",
  description:
    "يمكنك هنا العثور على مجموعة من أحدث الأبحاث التي أجراها شركاء اختبار همزة وأكاديميون مدعومون من اختبار همزة من مختلف أنحاء العالم. ، يُمَوِّل اختبار همزة الأبحاث في ثلاثة مجالات رئيسية تتعلق بتعلم وتقييم اللغة العربية",
  bgColor: "#FFF",
  breadcrumbs: [
    { label: "الرئيسية", path: "/" },
    { label: "الابحاث", disabled: true },
    { label: "مكتبة الابحاث", disabled: true },
  ],
};

/* ==========================================================================
   Main Page Component
   ========================================================================== */

/**
 * ResearchLibraryPage Component
 *
 * Server Component that renders the page hero and the client-side research library listing.
 */
export default function ResearchLibraryPage(): ReactElement {
  return (
    <>
      <PageHero
        heroMap={{ "/research-library": HERO_CONFIG }}
        defaultRoute="/research-library"
        breadcrumbsMax={3}
      />

      <ResearchLibraryListing initialPapers={researchData} />
    </>
  );
}
