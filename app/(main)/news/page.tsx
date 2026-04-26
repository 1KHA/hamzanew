/**
 * News Page Component
 *
 * Displays a paginated list of news articles with search and filtering capabilities.
 * Allows users to browse platform updates, announcements, and articles.
 *
 * @accessibility
 * - Uses semantic HTML ( <section>, <article>)
 * - Implements ARIA live regions for search results updates
 * - Ensures keyboard navigability for all interactive elements
 * - Maintains proper focus management and heading hierarchy
 */

import type { ReactElement } from "react";
import PageHero from "@/app/components/page-hero/PageHero";
import NewsListing from "./NewsListing";
import { news } from "./_data/newsData";
import { Metadata } from "next";
import { cookies } from "next/headers";

/* ==========================================================================
   Metadata
   ========================================================================== */

export const metadata: Metadata = {
  title: "الاخبار",
  description:
    "نقدّم أحدث الأخبار والمقالات المتخصصة في اختبارات همزة وتطوير الاختبارات المعيارية للغة العربية",
};

/* ==========================================================================
   Static Configuration
   ========================================================================== */

const HERO_CONFIG = {
  title: "الاخبار",
  description:
    "نقدّم أحدث الأخبار والمقالات المتخصصة في اختبارات همزة وتطوير الاختبارات المعيارية للغة العربية",
  bgColor: "#FFF",
  breadcrumbs: [
    { label: "الرئيسة", path: "/" },
    { label: "الاخبار", disabled: true },
  ],
};

/* ==========================================================================
   Main Component
   ========================================================================== */

/**
 * NewsPage Component
 *
 * Component that renders the page hero and the news listing.
 */
export default async function NewsPage(): Promise<ReactElement> {
  let apiData = null;
  try {
    const cookieStore = await cookies();
    const langCookie = cookieStore.get("lang")?.value || "ar-SA";
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const response = await fetch(`${baseURL}/api/news`, {
      cache: "no-store",
      headers: { Cookie: `lang=${langCookie}` },
    });
    if (response.ok) apiData = await response.json();
  } catch (error) {
    console.error("Error fetching news data:", error);
  }

  const hero = apiData?.header?.title
    ? { ...HERO_CONFIG, title: apiData.header.title }
    : HERO_CONFIG;
  const articles = apiData?.articles ?? news;

  return (
    <>
      <PageHero
        heroMap={{ "/news": hero }}
        defaultRoute="/news"
        breadcrumbsMax={2}
      />

      <NewsListing initialArticles={articles} />
    </>
  );
}
