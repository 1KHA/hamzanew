/**
 * Latest News Page
 *
 * Fetches banner, news carousel, events, and latest news images
 * from Liferay using four content keys. Falls back to static data on error.
 */

import type { ReactElement } from "react";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { fetchContentWithKey } from "@/app/_lib/content-service";
import { extractFields, extractList, extractImageList } from "@/app/_lib/helper-service";
import { st } from "@/app/_lib/static-text-server";
import PageHero from "@/app/components/page-hero/PageHero";
import LatestNews from "./LatestNews";
import { getNewsData, latestCoverage } from "../_data/newsData";

/* ==========================================================================
   Metadata
   ========================================================================== */

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = cookieStore.get("lang")?.value.startsWith("en") ? "en" : "ar";
  return {
    title: st("latestNews", "metaTitle", locale),
    description: st("latestNews", "metaDescription", locale),
  };
}

export const dynamic = "force-dynamic";

/* ==========================================================================
   Types
   ========================================================================== */

interface CarouselNewsItem {
  id: number;
  title: string;
  content: string;
  image: string;
  date: string;
}

interface EventItem {
  text: string;
  image: string;
}

/* ==========================================================================
   Main Page Component
   ========================================================================== */

export default async function LatestNewsPage(): Promise<ReactElement> {
  const cookieStore = await cookies();
  const locale = cookieStore.get("lang")?.value || "ar-SA";
  const staticLocale = locale.startsWith("en") ? "en" : "ar";

  /* ── Fetch all 4 content keys in parallel ─────────────────────────────── */
  let bannerContent: any = null;
  let carouselContent: any = null;
  let eventsContent: any = null;
  let listContent: any = null;

  try {
    [
      bannerContent,
      carouselContent,
      eventsContent,
      listContent,
    ] = await Promise.all([
      fetchContentWithKey("NEWS_AND_ARTICLES_LATEST_NEWS_BANNER_CONTENT_KEY"),
      fetchContentWithKey("NEWS_AND_ARTICLES_LATEST_NEWS_CAROUSEL_CONTENT_KEY"),
      fetchContentWithKey("NEWS_AND_ARTICLES_EVENT_AND_ACTIVITIES_CONTENT_KEY"),
      fetchContentWithKey("NEWS_AND_ARTICLES_LIST_CONTENT_KEY"),
    ]);
  } catch (error) {
    console.error("[LatestNewsPage] Failed to fetch content:", error);
  }

  /* ── Extract banner fields ────────────────────────────────────────────── */
  const bannerFields = extractFields(bannerContent?.contentFields, [
    "titleText",
    "image",
  ]) as { titleText?: string; image?: string };

  /* ── Extract carousel fields ──────────────────────────────────────────── */
  const carouselFields = extractFields(carouselContent?.contentFields, [
    "headerText",
  ]) as { headerText?: string };

  const rawNewsList = extractList(carouselContent?.contentFields, "NewsGroupList", {
    titleText: "titleText",
    newsDescriptionText: "newsDescriptionText",
    dateText: "dateText",
    image: "image",
  }) as Array<{ titleText?: string; newsDescriptionText?: string; dateText?: string; image?: string }>;

  const carouselNews: CarouselNewsItem[] = rawNewsList.length
    ? rawNewsList.map((item, index) => ({
        id: index + 1,
        title: item.titleText || "",
        content: item.newsDescriptionText || "",
        image: item.image || "",
        date: item.dateText || "",
      }))
    : getNewsData(staticLocale).slice(0, 4).map((n: any, i: number) => ({
        id: n.id ?? i + 1,
        title: n.title,
        content: n.content,
        image: n.image,
        date: n.date,
      }));

  /* ── Extract events & activities fields ───────────────────────────────── */
  const eventsFields = extractFields(eventsContent?.contentFields, [
    "titleText",
  ]) as { titleText?: string };

  const rawEventsList = extractList(eventsContent?.contentFields, "EventsFieldset", {
    text: "text",
    image: "image",
  }) as Array<{ text?: string; image?: string }>;

  const events: EventItem[] = rawEventsList.length
    ? rawEventsList.map((item) => ({
        text: item.text || "",
        image: item.image || "",
      }))
    : latestCoverage.map((img) => ({ text: "", image: img }));

  /* ── Extract latest news list fields ──────────────────────────────────── */
  const listFields = extractFields(listContent?.contentFields, [
    "titleText",
    "viewAllBtnText",
  ]) as { titleText?: string; viewAllBtnText?: string };

  const newsImages = extractImageList(listContent?.contentFields, "image") as string[];

  /* ── Build hero config ────────────────────────────────────────────────── */
  const heroTitle = bannerFields?.titleText || st("latestNews", "heroTitle", staticLocale);
  const heroDescription = st("latestNews", "heroDescription", staticLocale);

  const heroConfig = {
    title: heroTitle,
    description: heroDescription,
    bgColor: "#FFF" as const,
    breadcrumbs: [
      { label: st("latestNews", "breadcrumbHome", staticLocale), path: "/" },
      { label: st("news", "breadcrumbLatestNews", staticLocale), disabled: true },
      { label: heroTitle, disabled: true },
    ],
  };

  return (
    <>
      <PageHero
        heroMap={{ "/news": heroConfig }}
        defaultRoute="/news"
        breadcrumbsMax={3}
      />

      <LatestNews
        carouselNews={carouselNews}
        carouselHeader={carouselFields?.headerText || st("latestNews", "breakingNewsHeader", staticLocale)}
        latestNewsTitle={listFields?.titleText || st("latestNews", "latestNewsTitle", staticLocale)}
        latestNewsImages={newsImages.length ? newsImages : ["/assets/image/photo4.jpg"]}
        viewAllBtnText={listFields?.viewAllBtnText || st("latestNews", "viewAllBtn", staticLocale)}
        coverageTitle={eventsFields?.titleText || st("latestNews", "latestCoverageTitle", staticLocale)}
        coverageEvents={events}
        fallbackNews={getNewsData(staticLocale)}
        fallbackCoverage={latestCoverage}
        locale={staticLocale}
      />
    </>
  );
}
