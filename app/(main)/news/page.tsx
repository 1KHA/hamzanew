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
import { getNewsData } from "./_data/newsData";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { fetchContentWithKey } from "@/app/_lib/content-service";
import { extractFields } from "@/app/_lib/helper-service";
import { getTranslations } from "@/app/_lib/getTranslations";
import { st } from "@/app/_lib/static-text-server";

/* ==========================================================================
   Metadata
   ========================================================================== */

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = cookieStore.get("lang")?.value.startsWith("en") ? "en" : "ar";
  return {
    title: st("news", "metaTitle", locale),
    description: st("news", "metaDescription", locale),
  };
}

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
  const cookieStore = await cookies();
  const locale = cookieStore.get("lang")?.value || "ar-SA";
  const staticLocale = locale.startsWith("en") ? "en" : "ar";

  let apiData = null;

  try {
    console.log("[NewsPage] Fetching banner + articles from Liferay...");

    const [translations, headerContent, articlesResponse] = await Promise.all([
      getTranslations().catch((err) => {
        console.error("[NewsPage] Failed to fetch translations:", err);
        return null;
      }),
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
        title: headerFields?.titleText ?? st("news", "heroTitle", staticLocale),
      },
      articles: mappedArticles.length ? mappedArticles : getNewsData(staticLocale),
      translations,
      locale,
    };
  } catch (error) {
    console.error("[NewsPage] FAILED —", error);
    console.log("[NewsPage] Using FALLBACK static data.");
  }

  const heroConfig = {
    title: apiData?.header?.title || st("news", "heroTitle", staticLocale),
    description: st("news", "heroDescription", staticLocale),
    bgColor: "#FFF",
    breadcrumbs: [
      { label: st("news", "breadcrumbHome", staticLocale), path: "/" },
      { label: st("news", "breadcrumbNews", staticLocale), disabled: true },
    ],
  };

  const articles = apiData?.articles ?? getNewsData(staticLocale);

  return (
    <>
      <PageHero
        heroMap={{ "/news": heroConfig }}
        defaultRoute="/news"
        breadcrumbsMax={2}
        translations={apiData?.translations || undefined}
      />

      <NewsListing initialArticles={articles} />
    </>
  );
}
