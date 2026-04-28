/**
 * News Page Component
 *
 * Displays a paginated list of news articles with search and filtering capabilities.
 * Fetches banner and articles directly from Liferay.
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
import { fetchContentWithKey } from "@/app/_lib/content-service";
import { extractFields } from "@/app/_lib/helper-service";

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
   Helpers
   ========================================================================== */

function resolveImageUrl(imagePath: string | undefined): string {
  const baseURL = process.env.BASE_URL || "";
  if (!imagePath) return "";
  if (imagePath.startsWith("http")) return imagePath;
  return `${baseURL}${imagePath.startsWith("/") ? imagePath : "/" + imagePath}`;
}

async function fetchNewsArticlesDirectly(locale: string) {
  const baseURL = process.env.BASE_URL || "";
  const getArticlesURL = process.env.HAMZA_GET_ARTICLES_URL || "";
  const username = process.env.BASIC_AUTH_USERNAME || "";
  const password = process.env.BASIC_AUTH_PASSWORD || "";

  const serviceUrl = `${baseURL}${getArticlesURL}/NEWS_ARTICLES/News article types`;
  const authorization = "Basic " + btoa(`${username}:${password}`);

  const urlWithParam = new URL(serviceUrl);
  urlWithParam.searchParams.append("searchText", "");
  urlWithParam.searchParams.append("selectedYear", "");
  urlWithParam.searchParams.append("locale", locale);
  urlWithParam.searchParams.append("selectedArticleType", "0");
  urlWithParam.searchParams.append("page", "1");
  urlWithParam.searchParams.append("pageSize", "1000");

  return fetch(urlWithParam, {
    method: "POST",
    headers: { Authorization: authorization },
  });
}

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
    console.log("[NewsPage] Fetching banner + articles from Liferay...");

    const cookieStore = await cookies();
    const locale = cookieStore.get("lang")?.value || "ar-SA";

    const [headerContent, articlesResponse] = await Promise.all([
      fetchContentWithKey("NEWS_AND_ARTICLES_BANNER_CONTENT_KEY"),
      fetchNewsArticlesDirectly(locale),
    ]);

    // Banner
    const headerFields = extractFields(headerContent?.contentFields, [
      "titleText",
    ]) as { titleText?: string };

    if (headerFields?.titleText) {
      console.log(`[NewsPage] Banner SUCCESS — title: "${headerFields.titleText}"`);
    }

    // Articles
    if (!articlesResponse.ok) {
      console.error(`[NewsPage] Articles fetch failed: ${articlesResponse.status}`);
      throw new Error(`Articles API returned ${articlesResponse.status}`);
    }

    const articlesData = await articlesResponse.json();
    const rawArticles = articlesData?.articleList || [];

    const mappedArticles = rawArticles
      .map((raw: any) => ({
        id: Number(raw.entryClassPK ?? raw.id ?? raw.articleId ?? 0),
        title: raw.title ?? raw.titleText ?? raw.headline ?? "",
        excerpt:
          raw.excerpt ??
          raw.summary ??
          raw.description ??
          raw.newsDescriptionText ??
          "",
        content: raw.content ?? raw.fullContent ?? "",
        image: resolveImageUrl(
          raw.imageThumbnailUrl ??
            raw.image ??
            raw.thumbnailUrl ??
            raw.articleImageUrl ??
            raw.imageUrl ??
            ""
        ),
        date:
          raw.articleDate ?? raw.displayDate ?? raw.publishDate ?? raw.date ?? "",
      }))
      .filter((a: any) => a.id && a.title);

    console.log(`[NewsPage] Articles SUCCESS — ${mappedArticles.length} articles loaded`);

    apiData = {
      header: {
        title: headerFields?.titleText ?? "الاخبار",
      },
      articles: mappedArticles.length ? mappedArticles : news,
      locale,
    };
  } catch (error) {
    console.error("[NewsPage] FAILED —", error);
    console.log("[NewsPage] Using FALLBACK static data.");
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
