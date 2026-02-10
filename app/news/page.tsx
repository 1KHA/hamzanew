/**
 * News Page Component
 *
 * Displays a paginated list of news articles with search and filtering capabilities.
 * Allows users to browse platform updates, announcements, and articles.
 *
 * @accessibility
 * - Uses semantic HTML (<main>, <section>, <article>)
 * - Implements ARIA live regions for search results updates
 * - Ensures keyboard navigability for all interactive elements
 * - Maintains proper focus management and heading hierarchy
 */

import type { ReactElement } from "react";
import PageHero from "@/app/components/page-hero/PageHero";
import NewsListing from "./NewsListing";
import { news } from "./_data/newsData";

/* ==========================================================================
   Static Configuration
   ========================================================================== */

const HERO_CONFIG = {
  title: "الاخبار",
  content:
    "نقدّم أحدث الأخبار والمقالات المتخصصة في اختبارات همزة وتطوير الاختبارات المعيارية للغة العربية",
  bgColor: "#FFF",
  breadcrumbs: [
    { label: "الرئيسية", path: "/" },
    { label: "الاخبار", disabled: true },
  ],
};

/* ==========================================================================
   Main Component
   ========================================================================== */

/**
 * NewsPage Component
 *
 * Server Component that renders the page hero and the client-side news listing.
 */
export default function NewsPage(): ReactElement {
  return (
    <>
      <PageHero
        heroMap={{ "/news": HERO_CONFIG }}
        defaultRoute="/news"
        breadcrumbsMax={2}
      />

      <NewsListing initialArticles={news} />
    </>
  );
}
